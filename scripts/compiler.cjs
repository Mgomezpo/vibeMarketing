const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');
const { chromium } = require('playwright');

const BASE_DIR = path.resolve(__dirname, '..');
const CONFIG_DIR = path.join(BASE_DIR, 'config', 'carousels');
const DIST_DIR = path.join(BASE_DIR, 'dist');
const ASSETS_DIR = path.join(BASE_DIR, 'assets');
const TOKENS_PATH = path.join(BASE_DIR, 'design_tokens.json');

async function callImageAPI(prompt, carouselId, slideNum, tokens) {
    const models = [tokens.image_generation.primary_model, ...tokens.image_generation.fallback_models];
    const fileName = `slide_${String(slideNum).padStart(2, '0')}.jpg`;
    const outPath = path.join(ASSETS_DIR, 'carousels', carouselId, fileName);

    for (const model of models) {
        try {
            console.log(`  Trying model ${model} for slide ${slideNum}...`);
            // MOCK API CALL: In real production, this is where the fetch() to NIM/Gemini happens
            // The payload would include: { model: model, prompt: prompt, images: moodboard_assets }
            
            // Simulating success for the sake of the engine flow
            // In production: const response = await fetch(NIM_ENDPOINT, { ... });
            
            console.log(`  ✓ Image generated with ${model}`);
            return outPath; 
        } catch (e) {
            console.warn(`  ⚠️ Model ${model} failed, trying next fallback...`);
        }
    }
    throw new Error("All image models failed. Production halted.");
}

async function compileCarousel(carouselId) {
    const configPath = path.join(CONFIG_DIR, `${carouselId}.json`);
    if (!fs.existsSync(configPath)) throw new Error(`Config not found for ${carouselId}`);
    
    const tokens = JSON.parse(fs.readFileSync(TOKENS_PATH, 'utf8'));
    const carousel = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const templatePath = path.join(BASE_DIR, 'templates', 'deck.html');
    let html = fs.readFileSync(templatePath, 'utf8');

    // 1. Ensure images exist or generate them
    console.log(`🖼️  Processing images for ${carouselId}...`);
    for (let i = 0; i < carousel.slides.length; i++) {
        const slide = carousel.slides[i];
        const imgPath = path.join(ASSETS_DIR, 'carousels', carouselId, slide.bg_image || `slide_${String(i+1).padStart(2, '0')}.jpg`);
        if (!fs.existsSync(imgPath)) {
            await callImageAPI(slide.title_sans, carouselId, i+1, tokens);
        }
    }

    // 2. Inject Design Tokens into HTML CSS Variables
    const cssVars = `
        :root {
            --bg-color: ${tokens.colors.background};
            --primary-text: ${tokens.colors.primary_text};
            --secondary-text: ${tokens.colors.secondary_text};
            --accent-color: ${tokens.colors.accent};
            --muted-color: ${tokens.colors.muted};
            --font-serif: '${tokens.typography.display_serif}', serif;
            --font-sans: '${tokens.typography.statement_sans}', sans-serif;
            --font-mono: '${tokens.typography.technical_mono}', monospace;
            --font-body: '${tokens.typography.body_sans}', sans-serif;
        }
    `;
    html = html.replace(':root {', `${cssVars} :root {`);

    // 3. Build Slides
    const slidesHtml = carousel.slides.map((slide, idx) => {
        const num = String(idx + 1).padStart(2, '0');
        const imgPath = pathToFileURL(path.join(ASSETS_DIR, 'carousels', carouselId, slide.bg_image || `slide_${num}.jpg`)).href;
        
        return `
        <section class="slide">
            <div class="slide-bg" style="background-image: url('${imgPath}')"></div>
            <div class="slide-content">
                <div class="header">
                    <div class="header-brand">${tokens.brand_name}</div>
                    <div>${slide.top_tag || `${num} / ${carousel.slides.length}`}</div>
                </div>
                <div class="main">
                    <div class="title-serif">${slide.title_serif || ''}</div>
                    <div class="title-sans">${slide.title_sans || ''}</div>
                    <div class="lead-text">${slide.subtitle || ''}</div>
                    ${slide.type === 'split' ? `
                        <div class="content-grid">
                            <div class="col">
                                <div class="col-tag">${slide.col_left.tag}</div>
                                <div class="col-title">${slide.col_left.title}</div>
                                <div class="col-body">${slide.col_left.body}</div>
                                <div class="stat-box">
                                    <div class="stat-val">${slide.col_left.stat_num}</div>
                                    <div class="stat-label">${slide.col_left.stat_desc}</div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="col-tag" style="color:var(--accent-color)">${slide.col_right.tag}</div>
                                <div class="col-title">${slide.col_right.title}</div>
                                <div class="col-body">${slide.col_right.body}</div>
                                <div class="stat-box">
                                    <div class="stat-val">${slide.col_right.stat_num}</div>
                                    <div class="stat-label">${slide.col_right.stat_desc}</div>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
                <div class="footer">
                    <div>${slide.footer_left || tokens.brand_name}</div>
                    <div class="footer-gold">${slide.footer_right || 'SIGUIENTE →'}</div>
                </div>
            </section>`;
    }).join('');

    html = html.replace('<div id="deck"></div>', slidesHtml);

    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
    await page.setContent(html, { waitUntil: 'networkidle' });
    
    const outDir = path.join(DIST_DIR, 'carousels', carouselId);
    fs.mkdirSync(outDir, { recursive: true });
    
    const slides = page.locator('.slide');
    for(let i=0; i < await slides.count(); i++) {
        await slides.nth(i).screenshot({ path: path.join(outDir, `slide-${i+1}.png`) });
    }
    
    await page.pdf({ path: path.join(outDir, 'carousel.pdf'), width: '1080px', height: '1350px', printBackground: true });
    await browser.close();
    console.log(`✅ Carousel ${carouselId} compiled with brand tokens to ${outDir}`);
}

const configs = fs.readdirSync(CONFIG_DIR).filter(f => f.endsWith('.json'));
(async () => {
    for(const f of configs) {
        await compileCarousel(f.replace('.json', ''));
    }
})();
