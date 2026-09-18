/**
 * Factoría Visual Headless Multi-Brand (Playwright Chromium)
 * Generación adaptativa 100% en código (CERO PLANTILLAS ESTÁTICAS).
 */

import path from 'node:path';
import fs from 'node:fs';
import { chromium } from '@playwright/test';
import { composeGenerativeCarousel } from './generative-composer.mjs';

export async function renderBrandCarousel(draft, brandConfig, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generar HTML y CSS de forma 100% dinámica y adaptativa según la narrativa de cada diapositiva
  const htmlContent = composeGenerativeCarousel(draft, brandConfig);

  const previewHtmlPath = path.join(outputDir, 'carousel-preview.html');
  fs.writeFileSync(previewHtmlPath, htmlContent, 'utf-8');

  // Lanzar Chromium headless
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1080, height: 1350 },
    deviceScaleFactor: 2 // 2x Retina para nitidez tipográfica
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
