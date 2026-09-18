/**
 * Motor de Video y Motion con HyperFrames (Reemplazo de Remotion)
 * Genera composiciones cinéticas en HTML/CSS/GSAP y compila a MP4 determinista
 */

import path from 'node:path';
import fs from 'node:fs';
import { execSync } from 'node:child_process';

export async function renderHyperframeVideo(draft, brandConfig, outputDir) {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const compositionHtml = buildHyperframeComposition(draft, brandConfig);
  const htmlPath = path.join(outputDir, 'video-composition.html');
  fs.writeFileSync(htmlPath, compositionHtml, 'utf-8');

  const mp4Path = path.join(outputDir, 'video-motion.mp4');

  // Ejecutar HyperFrames CLI si está disponible
  try {
    execSync(`npx hyperframes render "${htmlPath}" -o "${mp4Path}" --fps 30`, {
      cwd: outputDir,
      stdio: 'pipe',
      timeout: 60000
    });
    return {
      success: true,
      mp4Path,
      htmlPath
    };
  } catch (err) {
    // Si FFmpeg local no está en el PATH del sistema, dejamos la composición HTML viva para preview
    return {
      success: false,
      htmlPath,
      mp4Path: null,
      message: 'Composición HyperFrames generada. Requiere ffmpeg en sistema para renderizar a MP4 binario.'
    };
  }
}

function buildHyperframeComposition(draft, brandConfig) {
  const brandName = brandConfig.displayName || brandConfig.name;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1080, height=1920, initial-scale=1.0">
  <title>${brandName} — HyperFrames Video</title>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700&family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@600&display=swap" rel="stylesheet">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1080px;
      height: 1920px;
      background: #090D14;
      color: #F9FAFB;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 120px 100px;
    }
    .header {
      font-size: 20px;
      letter-spacing: 0.18em;
      color: #BFA175;
      font-weight: 700;
      opacity: 0;
    }
    .main {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .hook {
      font-family: 'Fraunces', serif;
      font-size: 72px;
      line-height: 1.1;
      color: #F9FAFB;
      margin-bottom: 40px;
      opacity: 0;
      transform: translateY(30px);
    }
    .metric-card {
      background: #161D2B;
      border-left: 6px solid #BFA175;
      padding: 40px;
      border-radius: 12px;
      opacity: 0;
      transform: scale(0.95);
    }
    .metric-val {
      font-size: 54px;
      font-weight: 700;
      color: #F9FAFB;
      font-family: 'JetBrains Mono', monospace;
    }
    .footer {
      font-size: 18px;
      color: #6B7280;
      opacity: 0;
    }
  </style>
</head>
<body>
  <div class="header">${brandName}</div>
  <div class="main">
    <div class="hook">${draft.hook}</div>
    <div class="metric-card">
      <div style="color: #9CA3AF; font-size: 16px; margin-bottom: 8px;">IMPACTO OPERATIVO</div>
      <div class="metric-val">${draft.slides[0]?.metric || '$6,200 / mes'}</div>
    </div>
  </div>
  <div class="footer">${brandConfig.tagline || 'THE INSIGHTFUL ARROW'}</div>

  <script>
    // Animación cinética controlada por HyperFrames playhead
    const tl = gsap.timeline();
    tl.to(".header", { opacity: 1, duration: 0.8, ease: "power2.out" })
      .to(".hook", { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }, "-=0.4")
      .to(".metric-card", { opacity: 1, scale: 1, duration: 1.0, ease: "back.out(1.7)" }, "-=0.6")
      .to(".footer", { opacity: 1, duration: 0.8 }, "-=0.4");
  </script>
</body>
</html>`;
}
