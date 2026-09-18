/**
 * Factoría Visual Headless Multi-Brand (Playwright Chromium)
 * Genera PDF multipágina (LinkedIn) y PNGs 1080x1350 (Instagram) según el template de la marca
 */

import path from 'node:path';
import fs from 'node:fs';
import { chromium } from '@playwright/test';

export async function renderBrandCarousel(draft, brandConfig, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Cargar template de la marca o el universal
  let htmlContent = '';
  const brandTemplatePath = path.join(brandConfig.brandDir, 'template.html');

  if (fs.existsSync(brandTemplatePath)) {
    const templateRaw = fs.readFileSync(brandTemplatePath, 'utf-8');
    htmlContent = injectDraftIntoTemplate(templateRaw, draft, brandConfig);
  } else {
    htmlContent = buildDefaultTemplate(draft, brandConfig);
  }

  const previewHtmlPath = path.join(outputDir, 'carousel-preview.html');
  fs.writeFileSync(previewHtmlPath, htmlContent, 'utf-8');

  // Lanzar Chromium headless
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 2
  });

  const page = await context.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle' });

  // 1. PDF Multipágina (LinkedIn)
  const pdfPath = path.join(outputDir, 'post-carousel.pdf');
  await page.pdf({
    path: pdfPath,
    width: '1080px',
    height: '1350px',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });

  // 2. PNGs individuales (Instagram 4:5)
  const pngPaths = [];
  const slideElements = await page.$$('.slide');

  for (let i = 0; i < slideElements.length; i++) {
    const slideNumber = String(i + 1).padStart(2, '0');
    const pngPath = path.join(outputDir, `slide-${slideNumber}.png`);
    await slideElements[i].screenshot({ path: pngPath, type: 'png' });
    pngPaths.push(pngPath);
  }

  await browser.close();

  return {
    previewHtmlPath,
    pdfPath,
    pngPaths,
    totalSlides: slideElements.length
  };
}

function injectDraftIntoTemplate(template, draft, brandConfig) {
  const totalSlides = draft.slides.length;
  const slidesHTML = draft.slides.map((slide, index) => {
    const slideNum = String(index + 1).padStart(2, '0');
    const totalNum = String(totalSlides).padStart(2, '0');
    const isFirst = index === 0;
    const isLast = index === totalSlides - 1;

    return `
    <div class="slide ${isFirst ? 'is-hook' : ''} ${isLast ? 'is-cta' : ''}" id="slide-${index + 1}">
      <div class="slide-inner">
        <header class="slide-header">
          <div class="brand-badge">
            <span class="brand-dot"></span>
            <span class="brand-name">${brandConfig.displayName || brandConfig.name}</span>
          </div>
          <div class="slide-counter">${slideNum} / ${totalNum}</div>
        </header>

        <main class="slide-main">
          ${slide.badge ? `<div class="tag">${slide.badge}</div>` : ''}
          <h1 class="slide-title">${slide.title}</h1>
          <div class="divider"></div>
          <p class="slide-body">${slide.body}</p>
          ${slide.metric ? `
          <div class="metric-box">
            <div class="metric-label">INDICADOR CLAVE</div>
            <div class="metric-value">${slide.metric}</div>
          </div>` : ''}
        </main>

        <footer class="slide-footer">
          <span class="footer-note">${brandConfig.footerNote || brandConfig.tagline || ''}</span>
          <span class="footer-hint">${isLast ? 'LINK EN PERFIL' : 'DESLIZA →'}</span>
        </footer>
      </div>
    </div>
    `;
  }).join('\n');

  return template
    .replace('{{SLIDES}}', slidesHTML)
    .replace('{{BRAND_NAME}}', brandConfig.displayName || brandConfig.name);
}

function buildDefaultTemplate(draft, brandConfig) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: 1080px 1350px; margin: 0; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { width: 1080px; font-family: sans-serif; background: #111; color: #eee; }
    .slide { width: 1080px; height: 1350px; page-break-after: always; break-after: page; padding: 80px; display: flex; flex-direction: column; justify-content: space-between; }
    .slide-title { font-size: 56px; margin: 30px 0; }
    .slide-body { font-size: 28px; line-height: 1.5; color: #bbb; }
  </style>
</head>
<body>
  ${draft.slides.map(s => `
  <div class="slide">
    <h2>${brandConfig.displayName || brandConfig.name}</h2>
    <div>
      <h1 class="slide-title">${s.title}</h1>
      <p class="slide-body">${s.body}</p>
    </div>
    <p>Desliza →</p>
  </div>`).join('')}
</body>
</html>`;
}
