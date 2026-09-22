const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');

// Use existing Playwright module
const playwrightPath = 'C:/Users/mgome/OneDrive/Documents/MIGUELGOMEZAI (Marca Personal)/AI Content Manager/node_modules/playwright';
const { chromium } = require(playwrightPath);

const ARTIFACTS_DIR = 'C:/Users/mgome/.gemini/antigravity/brain/4029eca7-08b0-4639-b649-e8362bd8cbf4';
const BASE_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(BASE_DIR, 'dist');
const SLIDES_DIR = path.join(DIST_DIR, 'slides');

fs.mkdirSync(SLIDES_DIR, { recursive: true });

(async () => {
  console.log('🚀 Iniciando compilación de activos con Chromium...');
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({
      viewport: { width: 1080, height: 1350 },
      deviceScaleFactor: 2,
    });

    // 1. Renderizar Moodboard Referencial
    const moodboardPath = path.join(BASE_DIR, 'templates', 'moodboard.html');
    if (fs.existsSync(moodboardPath)) {
      console.log('📐 Renderizando Moodboard Referencial...');
      await page.goto(pathToFileURL(moodboardPath).href, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      
      const moodboardEl = page.locator('.canvas');
      const outMoodboard = path.join(DIST_DIR, 'moodboard-referencial.png');
      await moodboardEl.screenshot({ path: outMoodboard });
      console.log(`✓ Moodboard generado: ${outMoodboard}`);

      // Copiar a artefactos para preview
      if (fs.existsSync(ARTIFACTS_DIR)) {
        fs.copyFileSync(outMoodboard, path.join(ARTIFACTS_DIR, 'moodboard-referencial.png'));
      }
    }

    // 2. Renderizar Slides del Carrusel
    const deckPath = path.join(BASE_DIR, 'templates', 'deck.html');
    if (fs.existsSync(deckPath)) {
      console.log('📑 Renderizando las 5 Láminas del Carrusel TIA...');
      await page.goto(pathToFileURL(deckPath).href, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);

      const slides = page.locator('.slide');
      const count = await slides.count();
      console.log(`Encontradas ${count} láminas en deck.html`);

      for (let i = 0; i < count; i++) {
        const num = String(i + 1).padStart(2, '0');
        const filename = `tia-engine-slide-${num}.png`;
        const outPath = path.join(SLIDES_DIR, filename);

        await slides.nth(i).screenshot({ path: outPath });
        console.log(`✓ Lámina ${num} renderizada: ${filename}`);


        // Copiar a artefactos
        if (fs.existsSync(ARTIFACTS_DIR)) {
          fs.copyFileSync(outPath, path.join(ARTIFACTS_DIR, filename));
        }
      }

      // 3. Exportar PDF Multipágina para LinkedIn
      console.log('📄 Exportando PDF multipágina para LinkedIn Document Carousel...');
      const outPdf = path.join(DIST_DIR, 'carrusel-linkedin.pdf');
      await page.pdf({
        path: outPdf,
        width: '1080px',
        height: '1350px',
        printBackground: true,
        preferCSSPageSize: true
      });
      console.log(`✓ PDF generado con éxito: ${outPdf}`);
      if (fs.existsSync(ARTIFACTS_DIR)) {
        fs.copyFileSync(outPdf, path.join(ARTIFACTS_DIR, 'carrusel-linkedin.pdf'));
      }

    }

    console.log('\n🎉 ¡Compilación completada exitosamente al 100%!');
  } catch (err) {
    console.error('Error durante la compilación:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
