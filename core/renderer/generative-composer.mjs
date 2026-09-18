/**
 * Generative Layout Composer (Zero-Template Architecture)
 * Genera el HTML y CSS de forma totalmente dinámica y adaptativa según el contenido de cada diapositiva.
 * Sin plantillas estáticas: cada lámina se diseña programáticamente según su función narrativa.
 */

export function composeGenerativeCarousel(draft, brandConfig) {
  const theme = getBrandTheme(brandConfig);
  const totalSlides = draft.slides.length;

  const slidesHTML = draft.slides.map((slide, index) => {
    const isFirst = index === 0;
    const isLast = index === totalSlides - 1;
    const slideNumber = String(index + 1).padStart(2, '0');
    const totalNumber = String(totalSlides).padStart(2, '0');

    let layoutType = 'editorial';
    if (isFirst) layoutType = 'hook';
    else if (isLast) layoutType = 'cta';
    else if (slide.metric && (slide.metric.includes('$') || slide.metric.includes('%') || slide.metric.includes('segundos') || slide.metric.includes('horas'))) {
      layoutType = 'metric';
    } else if (slide.body && slide.body.includes(' vs ') || slide.title.toLowerCase().includes('vs')) {
      layoutType = 'comparison';
    } else if (slide.badge && (slide.badge.includes('INFRAESTRUCTURA') || slide.badge.includes('SISTEMA') || slide.badge.includes('CÓDIGO'))) {
      layoutType = 'procedural';
    }

    return composeSlide(slide, layoutType, slideNumber, totalNumber, theme, brandConfig);
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    @page { size: 1080px 1350px; margin: 0; }
    body {
      background-color: ${theme.bg};
      color: ${theme.text};
      font-family: ${theme.fontBody};
      width: 1080px;
    }
    .slide {
      width: 1080px;
      height: 1350px;
      page-break-after: always;
      break-after: page;
      position: relative;
      background: ${theme.backgroundGradient};
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    ${theme.extraCss || ''}

    .slide-inner {
      width: 1080px;
      height: 1350px;
      padding: 95px 85px 85px 85px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      z-index: 2;
    }
    .slide-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid ${theme.border};
      padding-bottom: 24px;
    }
    .brand-box {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.12em;
    }
    .brand-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background-color: ${theme.accent};
      box-shadow: 0 0 12px ${theme.accentGlow};
    }
    .slide-counter {
      font-family: ${theme.fontMono};
      font-size: 17px;
      font-weight: 600;
      color: ${theme.accent};
    }
    .slide-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid ${theme.border};
      padding-top: 24px;
      font-size: 13px;
      letter-spacing: 0.12em;
      color: ${theme.subtext};
    }
    .footer-action {
      color: ${theme.accent};
      font-weight: 600;
    }
  </style>
</head>
<body>
  ${slidesHTML}
</body>
</html>`;
}

function composeSlide(slide, layoutType, slideNumber, totalNumber, theme, brand) {
  let mainBody = '';

  switch (layoutType) {
    case 'hook':
      mainBody = `
      <div style="display: flex; flex-direction: column; justify-content: center; flex-grow: 1;">
        <span style="display: inline-block; align-self: flex-start; padding: 8px 18px; background: ${theme.badgeBg}; border: 1px solid ${theme.badgeBorder}; border-radius: 4px; color: ${theme.badgeText}; font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 34px;">
          ${slide.badge || 'DIAGNÓSTICO CRÍTICO'}
        </span>
        <h1 style="font-family: ${theme.fontHeader}; font-size: 66px; line-height: 1.08; font-weight: 700; color: ${theme.text}; letter-spacing: -0.03em; margin-bottom: 32px;">
          ${slide.title}
        </h1>
        <div style="width: 120px; height: 3px; background: ${theme.accent}; margin-bottom: 34px;"></div>
        <p style="font-size: 27px; line-height: 1.55; color: ${theme.subtext}; font-weight: 300; max-width: 900px;">
          ${slide.body}
        </p>
      </div>`;
      break;

    case 'metric':
      mainBody = `
      <div style="display: flex; flex-direction: column; justify-content: center; flex-grow: 1;">
        <span style="display: inline-block; align-self: flex-start; padding: 7px 16px; background: ${theme.badgeBg}; border: 1px solid ${theme.badgeBorder}; border-radius: 4px; color: ${theme.badgeText}; font-size: 13px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 28px;">
          ${slide.badge || 'ANÁLISIS CUANTITATIVO'}
        </span>
        <h2 style="font-family: ${theme.fontHeader}; font-size: 52px; line-height: 1.15; font-weight: 700; color: ${theme.text}; margin-bottom: 24px;">
          ${slide.title}
        </h2>
        <p style="font-size: 25px; line-height: 1.5; color: ${theme.subtext}; margin-bottom: 36px;">
          ${slide.body}
        </p>
        <div style="background: ${theme.cardBg}; border: 1px solid ${theme.cardBorder}; border-left: 5px solid ${theme.accent}; border-radius: 8px; padding: 32px 38px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-family: ${theme.fontMono}; font-size: 13px; letter-spacing: 0.18em; color: ${theme.subtext}; text-transform: uppercase; margin-bottom: 6px;">
              MÉTRICA / OUTCOME
            </div>
            <div style="font-family: ${theme.fontHeader}; font-size: 42px; font-weight: 700; color: ${theme.text};">
              ${slide.metric}
            </div>
          </div>
          <div style="font-family: ${theme.fontMono}; font-size: 14px; color: ${theme.accent}; font-weight: 600; border: 1px dashed ${theme.accent}; padding: 8px 16px; border-radius: 4px;">
            VERIFICADO
          </div>
        </div>
      </div>`;
      break;

    case 'procedural':
      mainBody = `
      <div style="display: flex; flex-direction: column; justify-content: center; flex-grow: 1;">
        <span style="display: inline-block; align-self: flex-start; padding: 7px 16px; background: ${theme.badgeBg}; border: 1px solid ${theme.badgeBorder}; border-radius: 4px; color: ${theme.badgeText}; font-size: 13px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 28px;">
          ${slide.badge || 'ARQUITECTURA DEL SISTEMA'}
        </span>
        <h2 style="font-family: ${theme.fontHeader}; font-size: 54px; line-height: 1.15; font-weight: 700; color: ${theme.text}; margin-bottom: 26px;">
          ${slide.title}
        </h2>
        <div style="background: ${theme.cardBg}; border: 1px solid ${theme.cardBorder}; border-radius: 8px; padding: 28px 32px; margin-bottom: 28px;">
          <div style="font-family: ${theme.fontMono}; font-size: 13px; color: ${theme.accent}; margin-bottom: 12px;">
            // PIPELINE EN EJECUCIÓN
          </div>
          <p style="font-size: 24px; line-height: 1.5; color: ${theme.text};">
            ${slide.body}
          </p>
        </div>
        ${slide.metric ? `
        <div style="display: flex; align-items: center; gap: 14px; font-family: ${theme.fontMono}; font-size: 16px; color: ${theme.accent};">
          <span style="width: 8px; height: 8px; background: ${theme.accent}; border-radius: 50%;"></span>
          <span>LATENCIA / RESULTADO: ${slide.metric}</span>
        </div>` : ''}
      </div>`;
      break;

    case 'cta':
      mainBody = `
      <div style="display: flex; flex-direction: column; justify-content: center; flex-grow: 1; text-align: left;">
        <span style="display: inline-block; align-self: flex-start; padding: 8px 18px; background: ${theme.badgeBg}; border: 1px solid ${theme.badgeBorder}; border-radius: 4px; color: ${theme.badgeText}; font-size: 13px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; margin-bottom: 34px;">
          ${slide.badge || 'PRÓXIMO PASO'}
        </span>
        <h2 style="font-family: ${theme.fontHeader}; font-size: 58px; line-height: 1.12; font-weight: 700; color: ${theme.text}; margin-bottom: 28px;">
          ${slide.title}
        </h2>
        <p style="font-size: 27px; line-height: 1.55; color: ${theme.subtext}; margin-bottom: 40px; max-width: 880px;">
          ${slide.body}
        </p>
        <div style="background: ${theme.cardBg}; border: 1px solid ${theme.accent}; border-radius: 8px; padding: 30px 36px; display: inline-flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 20px; font-weight: 600; color: ${theme.text};">
            ${slide.metric || 'Enlace disponible en la biografía'}
          </span>
          <span style="font-size: 26px; color: ${theme.accent}; font-weight: 700;">→</span>
        </div>
      </div>`;
      break;

    default: // editorial
      mainBody = `
      <div style="display: flex; flex-direction: column; justify-content: center; flex-grow: 1;">
        <span style="display: inline-block; align-self: flex-start; padding: 7px 16px; background: ${theme.badgeBg}; border: 1px solid ${theme.badgeBorder}; border-radius: 4px; color: ${theme.badgeText}; font-size: 13px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 28px;">
          ${slide.badge || 'ANÁLISIS'}
        </span>
        <h2 style="font-family: ${theme.fontHeader}; font-size: 54px; line-height: 1.15; font-weight: 700; color: ${theme.text}; margin-bottom: 26px;">
          ${slide.title}
        </h2>
        <div style="width: 80px; height: 3px; background: ${theme.accent}; margin-bottom: 30px;"></div>
        <p style="font-size: 26px; line-height: 1.55; color: ${theme.subtext}; max-width: 900px; margin-bottom: 32px;">
          ${slide.body}
        </p>
        ${slide.metric ? `
        <div style="display: inline-block; font-family: ${theme.fontMono}; font-size: 16px; color: ${theme.accent}; background: ${theme.cardBg}; padding: 12px 20px; border-radius: 4px; border: 1px solid ${theme.cardBorder};">
          ${slide.metric}
        </div>` : ''}
      </div>`;
      break;
  }

  return `
  <div class="slide" id="slide-${slideNumber}">
    <div class="slide-inner">
      <header class="slide-header">
        <div class="brand-box">
          <span class="brand-dot"></span>
          <span style="color: ${theme.text}; font-family: ${theme.fontHeader};">${brand.displayName || brand.name}</span>
        </div>
        <div class="slide-counter">${slideNumber} / ${totalNumber}</div>
      </header>

      <main style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
        ${mainBody}
      </main>

      <footer class="slide-footer">
        <span>${brand.tagline || ''}</span>
        <span class="footer-action">${layoutType === 'cta' ? 'LINK EN BIO' : 'DESLIZA →'}</span>
      </footer>
    </div>
  </div>`;
}

function getBrandTheme(brand) {
  const id = brand.id || 'general';

  if (id === 'tia') {
    return {
      bg: '#090D14',
      text: '#F9FAFB',
      subtext: '#9CA3AF',
      accent: '#BFA175',
      accentGlow: 'rgba(191, 161, 117, 0.6)',
      border: 'rgba(255, 255, 255, 0.08)',
      badgeBg: 'rgba(191, 161, 117, 0.12)',
      badgeBorder: 'rgba(191, 161, 117, 0.35)',
      badgeText: '#D1B892',
      cardBg: '#161D2B',
      cardBorder: 'rgba(255, 255, 255, 0.09)',
      fontHeader: "'Fraunces', serif",
      fontBody: "'Inter', sans-serif",
      fontMono: "'Space Grotesk', monospace",
      backgroundGradient: 'radial-gradient(circle at 85% 15%, rgba(191, 161, 117, 0.09) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(37, 99, 235, 0.06) 0%, transparent 50%), #090D14'
    };
  }

  if (id === 'ireal') {
    return {
      bg: '#0B0B0B',
      text: '#F8F6F1',
      subtext: '#D6D3CD',
      accent: '#9F1522',
      accentGlow: 'rgba(159, 21, 34, 0.7)',
      border: 'rgba(255, 255, 255, 0.09)',
      badgeBg: 'rgba(159, 21, 34, 0.15)',
      badgeBorder: 'rgba(159, 21, 34, 0.4)',
      badgeText: '#E27B86',
      cardBg: 'rgba(22, 13, 15, 0.85)',
      cardBorder: 'rgba(159, 21, 34, 0.3)',
      fontHeader: "'Fraunces', serif",
      fontBody: "'Outfit', sans-serif",
      fontMono: "'JetBrains Mono', monospace",
      backgroundGradient: 'radial-gradient(circle at 90% 10%, rgba(159, 21, 34, 0.18) 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(110, 11, 20, 0.12) 0%, transparent 60%), #0B0B0B',
      extraCss: `
      .slide::before {
        content: '';
        position: absolute;
        inset: 0;
        opacity: 0.04;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        pointer-events: none;
      }`
    };
  }

  // miguel (Personal brand)
  return {
    bg: '#0D1117',
    text: '#F0F6FC',
    subtext: '#8B949E',
    accent: '#38BDF8',
    accentGlow: 'rgba(56, 189, 248, 0.6)',
    border: 'rgba(255, 255, 255, 0.08)',
    badgeBg: 'rgba(56, 189, 248, 0.1)',
    badgeBorder: 'rgba(56, 189, 248, 0.3)',
    badgeText: '#38BDF8',
    cardBg: '#161B22',
    cardBorder: 'rgba(255, 255, 255, 0.08)',
    fontHeader: "'Inter', sans-serif",
    fontBody: "'Inter', sans-serif",
    fontMono: "'JetBrains Mono', monospace",
    backgroundGradient: 'radial-gradient(circle at 85% 15%, rgba(56, 189, 248, 0.08) 0%, transparent 50%), #0D1117'
  };
}
