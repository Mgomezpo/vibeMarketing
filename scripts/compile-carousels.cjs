const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');

// Use existing Playwright module
const playwrightPath = 'C:/Users/mgome/OneDrive/Documents/MIGUELGOMEZAI (Marca Personal)/AI Content Manager/node_modules/playwright';
const { chromium } = require(playwrightPath);

const BASE_DIR = path.resolve(__dirname, '..');
const CONFIG_DIR = path.join(BASE_DIR, 'config', 'carousels');
const DIST_DIR = path.join(BASE_DIR, 'dist', 'carousels');
const ASSETS_DIR = path.join(BASE_DIR, 'assets');
const ARTIFACTS_DIR = 'C:/Users/mgome/.gemini/antigravity/brain/ec5702d8-3ea3-45ff-8d94-c74c831b61a7';

function renderSlideHtml(slide, index, total, carouselId, assetsDirRel) {
  const num = String(index + 1).padStart(2, '0');
  const imageName = slide.bg_image || `slide_${num}.jpg`;
  const absoluteImgPath = path.join(ASSETS_DIR, 'carousels', carouselId, imageName);
  const bgImgPath = fs.existsSync(absoluteImgPath) 
    ? pathToFileURL(absoluteImgPath).href 
    : `${assetsDirRel}/carousels/${carouselId}/${imageName}`;

  if (!fs.existsSync(absoluteImgPath)) {
    console.warn(`  ⚠️ Alerta: Imagen no encontrada en ${absoluteImgPath}`);
  }

  let bodyContent = '';

  if (slide.type === 'cover') {
    bodyContent = `
      <div class="masthead-group">
        <div class="masthead">
          <div class="masthead-tag">${slide.top_tag || 'ANÁLISIS OPERATIVO B2B'}</div>
          <div class="masthead-serif">${slide.title_serif}</div>
          <div class="masthead-sans">${slide.title_sans}</div>
        </div>
        <div class="cover-subtitle">${slide.subtitle}</div>
      </div>
      <div></div>
    `;
  } else if (slide.type === 'split') {
    bodyContent = `
      <div>
        <div class="section-title-wrap">
          <div class="headline-serif">${slide.title_serif}</div>
          <div class="headline-sans">${slide.title_sans}</div>
        </div>
        <p class="section-lead">${slide.subtitle || ''}</p>
      </div>

      <div class="split-columns">
        <div class="split-col">
          <div>
            <div class="col-tag">${slide.col_left.tag}</div>
            <div class="col-title">${slide.col_left.title}</div>
            <div class="col-body">${slide.col_left.body}</div>
          </div>
          <div class="col-stat">
            <div class="stat-num ${slide.col_left.stat_type === 'negative' ? 'negative' : ''}">${slide.col_left.stat_num}</div>
            <div class="stat-desc">${slide.col_left.stat_desc}</div>
          </div>
        </div>

        <div class="split-col right-col">
          <div>
            <div class="col-tag gold">${slide.col_right.tag}</div>
            <div class="col-title">${slide.col_right.title}</div>
            <div class="col-body">${slide.col_right.body}</div>
          </div>
          <div class="col-stat">
            <div class="stat-num ${slide.col_right.stat_type === 'negative' ? 'negative' : ''}">${slide.col_right.stat_num}</div>
            <div class="stat-desc">${slide.col_right.stat_desc}</div>
          </div>
        </div>
      </div>
    `;
  } else if (slide.type === 'compare') {
    const leftItems = (slide.col_left.items || []).map(item => `<div class="compare-item">${item}</div>`).join('');
    const rightItems = (slide.col_right.items || []).map(item => `<div class="compare-item">${item}</div>`).join('');

    bodyContent = `
      <div>
        <div class="section-title-wrap">
          <div class="headline-serif">${slide.title_serif}</div>
          <div class="headline-sans">${slide.title_sans}</div>
        </div>
        ${slide.quote ? `
          <div class="quote-container">
            <div class="quote-text">${slide.quote}</div>
          </div>
        ` : ''}
      </div>

      <div class="compare-columns">
        <div class="compare-col">
          <div class="compare-header">
            <span>${slide.col_left.title}</span>
            <span class="compare-badge">${slide.col_left.badge || ''}</span>
          </div>
          ${leftItems}
        </div>

        <div class="compare-col pro">
          <div class="compare-header">
            <span class="gold-text">${slide.col_right.title}</span>
            <span class="compare-badge">${slide.col_right.badge || ''}</span>
          </div>
          ${rightItems}
        </div>
      </div>
    `;
  } else if (slide.type === 'steps') {
    const stepsHtml = (slide.steps || []).map(step => `
      <div class="step-row ${step.highlight ? 'highlight' : ''}">
        <div class="step-number">${step.num}</div>
        <div class="step-details">
          <div class="step-title">${step.title}</div>
          <div class="step-body">${step.body}</div>
        </div>
      </div>
    `).join('');

    bodyContent = `
      <div>
        <div class="section-title-wrap">
          <div class="headline-serif">${slide.title_serif}</div>
          <div class="headline-sans">${slide.title_sans}</div>
        </div>
        <p class="section-lead">${slide.subtitle || ''}</p>
      </div>

      <div class="steps-list">
        ${stepsHtml}
      </div>
    `;
  } else if (slide.type === 'cta') {
    const metricsHtml = (slide.metrics || []).map(m => `
      <div class="cta-metric-item">
        <div class="cta-metric-val">${m.num}</div>
        <div class="cta-metric-desc">${m.desc}</div>
      </div>
    `).join('');

    bodyContent = `
      <div>
        <div class="section-title-wrap">
          <div class="headline-serif">${slide.title_serif}</div>
          <div class="headline-sans">${slide.title_sans}</div>
        </div>
      </div>

      <div class="cta-metrics">
        ${metricsHtml}
      </div>

      <div class="cta-action-wrap">
        <div class="cta-tag-badge">${slide.cta_badge || 'DIAGNÓSTICO OPERATIVO'}</div>
        <div class="cta-main-title">${slide.cta_title}</div>
        <div class="cta-main-desc">${slide.cta_desc}</div>
      </div>
    `;
  }

  return `
  <!-- SLIDE ${num} -->
  <section class="slide" id="slide-${num}">
    <div class="slide-bg" style="background-image: url('${bgImgPath}');"></div>
    <div class="slide-content">
      <div class="header-row">
        <div class="header-brand">THE INSIGHTFUL ARROW</div>
        <div class="header-step">${slide.top_tag || `${num} / 05`}</div>
      </div>

      <div class="slide-main-content">
        ${bodyContent}
      </div>

      <div class="footer-row">
        <span>${slide.footer_left || 'THE INSIGHTFUL ARROW // B2B'}</span>
        <span class="footer-cta">${slide.footer_right || 'SIGUIENTE →'}</span>
      </div>
    </div>
  </section>
  `;
}

function generateDeckHtml(carousel, assetsDirRel) {
  const carouselId = carousel.id || 'default';
  const slidesHtml = carousel.slides.map((slide, idx) => 
    renderSlideHtml(slide, idx, carousel.slides.length, carouselId, assetsDirRel)
  ).join('\n');

  return `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>TIA — ${carousel.title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..800;1,9..144,300..800&family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #000000;
    color: #E8E0D0;
    font-family: 'Inter', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    padding: 40px 0;
    -webkit-font-smoothing: antialiased;
  }

  /* CANVAS SLIDE NATIVO 4:5 */
  .slide {
    width: 1080px;
    height: 1350px;
    background-color: #000000;
    position: relative;
    overflow: hidden;
    padding: 70px 64px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #141414;
  }

  /* IMAGEN DE FONDO CINEMÁTICA CON ANCLAJE INFERIOR */
  .slide-bg {
    position: absolute;
    inset: 0;
    background-size: 78% auto;
    background-position: center bottom;
    background-repeat: no-repeat;
    z-index: 1;
    pointer-events: none;
  }

  .slide-content {
    position: relative;
    z-index: 5;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .slide-main-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch;
  }

  /* CABECERA EDITORIAL SUIZA */
  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 22px;
  }
  .header-brand {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #F0B429;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .header-brand::before {
    content: "";
    width: 8px;
    height: 8px;
    background: #F0B429;
    display: inline-block;
  }
  .header-step {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.16em;
    color: #888888;
    text-transform: uppercase;
  }

  /* PIE TÉCNICO */
  .footer-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding-top: 22px;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    color: #777777;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-top: auto;
  }
  .footer-cta {
    color: #F0B429;
    font-weight: 700;
  }

  /* TIPOGRAFÍA PURA / COLORES */
  .gold-text { color: #F0B429; }
  .section-title-wrap { margin-top: 20px; }
  .headline-serif {
    font-family: 'Fraunces', serif;
    font-weight: 300;
    font-style: italic;
    font-size: 40px;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: #FFFFFF;
  }
  .headline-sans {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 800;
    font-size: 44px;
    line-height: 1.05;
    letter-spacing: -0.03em;
    color: #F0B429;
    text-transform: uppercase;
    margin-top: 4px;
  }
  .section-lead {
    font-size: 18px;
    line-height: 1.45;
    color: #A09A90;
    margin-top: 10px;
    max-width: 850px;
  }

  /* SLIDE 01: COVER */
  .masthead { margin-top: 24px; }
  .masthead-tag {
    font-family: 'Space Mono', monospace;
    font-size: 14px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #888888;
    margin-bottom: 16px;
  }
  .masthead-serif {
    font-family: 'Fraunces', serif;
    font-weight: 300;
    font-style: italic;
    font-size: 72px;
    line-height: 0.95;
    letter-spacing: -0.03em;
    color: #FFFFFF;
    max-width: 620px;
  }
  .masthead-sans {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 800;
    font-size: 50px;
    line-height: 1.0;
    letter-spacing: -0.03em;
    color: #F0B429;
    text-transform: uppercase;
    margin-top: 8px;
    max-width: 620px;
  }
  .cover-subtitle {
    font-size: 20px;
    line-height: 1.45;
    color: #D0C8B8;
    max-width: 520px;
    margin-top: 32px;
  }

  /* SLIDE 02: SPLIT */
  .split-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    margin-top: 24px;
    max-width: 960px;
  }
  .split-col {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .split-col.right-col {
    border-left: 1px solid rgba(240, 180, 41, 0.25);
    padding-left: 36px;
  }
  .col-tag {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #888888;
    margin-bottom: 10px;
  }
  .col-tag.gold { color: #F0B429; }
  .col-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 24px;
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.2;
    margin-bottom: 10px;
  }
  .col-body {
    font-size: 16px;
    line-height: 1.45;
    color: #C0BCB4;
  }
  .col-stat {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  .stat-num {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 800;
    font-size: 46px;
    line-height: 1;
    color: #F0B429;
  }
  .stat-num.negative { color: #E05252; }
  .stat-desc {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: #888888;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-top: 6px;
  }

  /* SLIDE 03: COMPARE */
  .quote-container {
    border-left: 3px solid #F0B429;
    padding-left: 18px;
    margin: 14px 0 18px;
  }
  .quote-text {
    font-family: 'Fraunces', serif;
    font-style: italic;
    font-weight: 300;
    font-size: 18px;
    line-height: 1.35;
    color: #FFFFFF;
    max-width: 840px;
  }
  .compare-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
  }
  .compare-col {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .compare-col.pro {
    border-left: 1px solid rgba(240, 180, 41, 0.25);
    padding-left: 36px;
  }
  .compare-header {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 19px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 6px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .compare-badge {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #777777;
  }
  .compare-col.pro .compare-badge { color: #F0B429; }
  .compare-item {
    font-size: 14px;
    line-height: 1.35;
    color: #B0ABA0;
    position: relative;
    padding-left: 22px;
  }
  .compare-item::before {
    content: "—";
    position: absolute;
    left: 0;
    color: #E05252;
    font-weight: 700;
  }
  .compare-col.pro .compare-item { color: #E8E0D0; }
  .compare-col.pro .compare-item::before {
    content: "✓";
    color: #F0B429;
  }

  /* SLIDE 04: STEPS */
  .steps-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 20px;
  }
  .step-row {
    display: grid;
    grid-template-columns: 65px 1fr;
    gap: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .step-row:last-child { border-bottom: none; }
  .step-number {
    font-family: 'Space Mono', monospace;
    font-size: 28px;
    font-weight: 700;
    color: #555555;
    line-height: 1;
  }
  .step-row.highlight .step-number { color: #F0B429; }
  .step-title {
    font-family: 'Space Grotesk', sans-serif;
    font-size: 19px;
    font-weight: 700;
    color: #FFFFFF;
    margin-bottom: 4px;
  }
  .step-row.highlight .step-title { color: #F0B429; }
  .step-body {
    font-size: 14px;
    line-height: 1.4;
    color: #A09A90;
  }
  .step-row.highlight .step-body { color: #E8E0D0; }

  /* SLIDE 05: CTA */
  .cta-metrics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    margin: 36px 0 44px;
    padding-bottom: 36px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .cta-metric-item { display: flex; flex-direction: column; }
  .cta-metric-val {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 800;
    font-size: 64px;
    line-height: 1;
    color: #F0B429;
    margin-bottom: 8px;
  }
  .cta-metric-desc {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #888888;
    line-height: 1.4;
  }
  .cta-action-wrap { max-width: 820px; }
  .cta-tag-badge {
    display: inline-block;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #F0B429;
    margin-bottom: 12px;
  }
  .cta-main-title {
    font-family: 'Space Grotesk', sans-serif;
    font-weight: 800;
    font-size: 46px;
    color: #FFFFFF;
    margin-bottom: 14px;
    letter-spacing: -0.02em;
  }
  .cta-main-desc {
    font-size: 19px;
    line-height: 1.5;
    color: #B8B2A6;
  }

  @page {
    size: 1080px 1350px;
    margin: 0;
  }
  @media print {
    body {
      padding: 0 !important;
      margin: 0 !important;
      gap: 0 !important;
      background: #000000 !important;
    }
    .slide {
      border: none !important;
      page-break-after: always !important;
      break-after: page !important;
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
  }
</style>
</head>
<body>

${slidesHtml}

</body>
</html>
`;
}

(async () => {
  console.log('🚀 Iniciando compilación de los 3 Carruseles con el Sistema del Engine...\n');

  const configFiles = fs.readdirSync(CONFIG_DIR).filter(f => f.endsWith('.json')).sort();
  if (configFiles.length === 0) {
    console.error('No se encontraron configuraciones en config/carousels/');
    process.exit(1);
  }

  console.log(`Encontrados ${configFiles.length} carruseles para procesar:`);
  configFiles.forEach(f => console.log(` - ${f}`));

  const browser = await chromium.launch();

  try {
    const page = await browser.newPage({
      viewport: { width: 1080, height: 1350 },
      deviceScaleFactor: 2,
    });

    for (const file of configFiles) {
      const configPath = path.join(CONFIG_DIR, file);
      const carousel = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const carouselId = carousel.id || path.basename(file, '.json');

      console.log(`\n======================================================`);
      console.log(`📌 Procesando Carrusel: ${carousel.title} (${carouselId})`);
      console.log(`======================================================`);

      const carouselDistDir = path.join(DIST_DIR, carouselId);
      const carouselSlidesDir = path.join(carouselDistDir, 'slides');
      fs.mkdirSync(carouselSlidesDir, { recursive: true });

      // Generar deck.html para este carrusel
      // La ruta relativa hacia assets/ desde dist/carousels/<id>/ es ../../../assets
      const assetsDirRel = '../../../assets';
      const deckHtml = generateDeckHtml(carousel, assetsDirRel);
      const deckHtmlPath = path.join(carouselDistDir, 'deck.html');
      fs.writeFileSync(deckHtmlPath, deckHtml, 'utf8');

      // Guardar caption.txt
      if (carousel.caption) {
        fs.writeFileSync(path.join(carouselDistDir, 'caption.txt'), carousel.caption, 'utf8');
      }

      // Renderizar con Playwright
      await page.goto(pathToFileURL(deckHtmlPath).href, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);

      const slides = page.locator('.slide');
      const count = await slides.count();
      console.log(`📑 Renderizando ${count} láminas...`);

      // Carpeta de artefactos para previsualización directa
      const artifactCarouselDir = path.join(ARTIFACTS_DIR, carouselId);
      if (fs.existsSync(ARTIFACTS_DIR)) {
        fs.mkdirSync(artifactCarouselDir, { recursive: true });
        if (carousel.caption) {
          fs.writeFileSync(path.join(artifactCarouselDir, 'caption.txt'), carousel.caption, 'utf8');
        }
      }

      for (let i = 0; i < count; i++) {
        const num = String(i + 1).padStart(2, '0');
        const filename = `slide-${num}.png`;
        const outPath = path.join(carouselSlidesDir, filename);

        await slides.nth(i).screenshot({ path: outPath });
        console.log(`  ✓ Lámina ${num} exportada: ${filename}`);

        if (fs.existsSync(artifactCarouselDir)) {
          fs.copyFileSync(outPath, path.join(artifactCarouselDir, filename));
        }
      }

      // Exportar PDF LinkedIn
      const outPdf = path.join(carouselDistDir, 'carrusel-linkedin.pdf');
      await page.pdf({
        path: outPdf,
        width: '1080px',
        height: '1350px',
        printBackground: true,
        preferCSSPageSize: true
      });
      console.log(`  📄 PDF multipágina generado: carrusel-linkedin.pdf`);

      if (fs.existsSync(artifactCarouselDir)) {
        fs.copyFileSync(outPdf, path.join(artifactCarouselDir, 'carrusel-linkedin.pdf'));
      }
    }

    console.log('\n🎉 ¡Compilación de los 3 Carruseles completada con éxito al 100%!');
  } catch (err) {
    console.error('Error durante la compilación:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
