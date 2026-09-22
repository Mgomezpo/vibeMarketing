const path = require('node:path');
const fs = require('node:fs');

const BASE_DIR = path.resolve(__dirname, '..');
const CONFIG_DIR = path.join(BASE_DIR, 'config', 'carousels');
const ASSETS_DIR = path.join(BASE_DIR, 'assets', 'carousels');
const MOODBOARDS_DIR = path.join(BASE_DIR, 'moodboards');

// 1. Obtener API Key de Gemini / Nano Banana Pro
function resolveApiKey() {
  if (process.env.NANOBANANA_GEMINI_API_KEY) return process.env.NANOBANANA_GEMINI_API_KEY;
  if (process.env.GEMINI_API_KEY) return process.env.GEMINI_API_KEY;

  // Buscar en .env local
  const localEnv = path.join(BASE_DIR, '.env');
  if (fs.existsSync(localEnv)) {
    const match = fs.readFileSync(localEnv, 'utf8').match(/^GEMINI_API_KEY=(.+)$/m);
    if (match) return match[1].trim();
  }

  // Buscar en AI Content Manager .env
  const fallbackEnv = 'C:/Users/mgome/OneDrive/Documents/MIGUELGOMEZAI (Marca Personal)/AI Content Manager/.env';
  if (fs.existsSync(fallbackEnv)) {
    const match = fs.readFileSync(fallbackEnv, 'utf8').match(/^GEMINI_API_KEY=(.+)$/m);
    if (match) return match[1].trim();
  }

  // Fallback configurado en extensión Nano Banana
  return 'AIzaSyCYPagB9xwMTbG3ZXXyfcbBlbByRIyIBZ8';
}

// 2. Cargar referencias del Moodboard como inlineData Base64
function loadMoodboardParts() {
  const parts = [];
  if (!fs.existsSync(MOODBOARDS_DIR)) return parts;

  const files = fs.readdirSync(MOODBOARDS_DIR).filter(f => /\.(png|jpg|jpeg|webp)$/i.test(f));
  for (const file of files) {
    const filePath = path.join(MOODBOARDS_DIR, file);
    const ext = path.extname(file).toLowerCase();
    const mimeType = ext === '.png' ? 'image/png' : 'image/jpeg';
    const base64Data = fs.readFileSync(filePath).toString('base64');
    parts.push({
      inlineData: {
        mimeType,
        data: base64Data
      }
    });
  }
  return parts;
}

// 3. Generador de Prompts Canónicos según posición de lámina (TIA DNA)
function getCanonicalPrompt(slide, index, totalSlides) {
  if (slide.image_prompt) return slide.image_prompt;

  const baseSpecs = 'Cinematic luxury brutalist editorial background, 4:5 vertical aspect ratio. Real tactile Carrara marble texture with subtle mineral veins and matte finish. Pure pitch-black obsidian void (#000000) dominating the top 60% of the canvas as clean negative space for typography. Dramatic chiaroscuro lighting, subtle liquid gold accents, high-end magazine art direction, zero 3D plastic render, zero text, zero UI boxes.';

  switch (index) {
    case 0:
      return `${baseSpecs} Scene: Classical Greek Carrara marble statue of an archer hero (Apollo/Sagittarius) holding a solid glowing liquid gold bow, strictly anchored in the lower-right third of the frame. Pure empty black void in the upper 60%.`;
    case 1:
      return `${baseSpecs} Scene: Macro close-up on classical sculpted Carrara marble hands tangled in thin matte black cords and chipped stone fragments, strictly anchored in the bottom 35% of the frame. Pure deep black void in the upper 65%.`;
    case 2:
      return `${baseSpecs} Scene: Conceptual split comparison. On bottom-left, an ancient cracked and eroded stone bust. On bottom-right, an immaculate Carrara marble bust with glowing liquid gold kintsugi seams. Both busts anchored strictly in the lower 35% of the canvas. Upper 65% is pure pitch-black negative space.`;
    case 3:
      return `${baseSpecs} Scene: Classical Greek Carrara marble columns and temple archway floating in the lower 40% of the frame, sliced by razor-sharp glowing golden laser geometric validation lines. Upper 60% is pure immaculate obsidian darkness.`;
    case 4:
      return `${baseSpecs} Scene: Dynamic low-angle view of the Carrara marble archer statue in the lower-right quadrant releasing a glowing solid gold arrow soaring into the darkness. Upper area and left 60% of the canvas is pure deep black void.`;
    default:
      return `${baseSpecs} Scene: Sculptural Carrara marble element with liquid gold kintsugi seams anchored in the bottom 40% of the canvas. Upper 60% is pure black space.`;
  }
}

// 4. Ejecución de generación de imágenes con Nano Banana Pro
async function generateImagesForCarousel(carouselId) {
  const configFile = path.join(CONFIG_DIR, `${carouselId}.json`);
  if (!fs.existsSync(configFile)) {
    throw new Error(`Archivo de configuración no encontrado: ${configFile}`);
  }

  const carousel = JSON.parse(fs.readFileSync(configFile, 'utf8'));
  const slides = carousel.slides || [];
  const targetDir = path.join(ASSETS_DIR, carouselId);
  fs.mkdirSync(targetDir, { recursive: true });

  const apiKey = resolveApiKey();
  console.log(`\n🍌 Conectando con Nano Banana Pro (Gemini Image Engine)...`);
  console.log(`🔑 API Key resuelta (prefijo: ${apiKey.slice(0, 8)}...)`);

  // Importar GoogleGenAI desde la extensión oficial nanobanana
  const genAiPath = 'C:/Users/mgome/.gemini/extensions/nanobanana/mcp-server/node_modules/@google/genai/dist/node/index.mjs';
  const { GoogleGenAI } = await import(`file:///${genAiPath}`);
  const ai = new GoogleGenAI({ apiKey });

  const moodboardParts = loadMoodboardParts();
  console.log(`🖼️ Inyectando ${moodboardParts.length} referencia(s) visual(es) desde moodboards/`);

  // Modelos soportados por Nano Banana Pro
  const modelCandidate = process.env.NANOBANANA_MODEL || 'nano-banana-pro-preview';
  console.log(`🎯 Modelo objetivo: ${modelCandidate}`);

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const num = String(i + 1).padStart(2, '0');
    const outFilename = slide.bg_image || `slide_${num}.jpg`;
    const outPath = path.join(targetDir, outFilename);

    console.log(`\n------------------------------------------------------`);
    console.log(`🎨 Generando Lámina ${num}/${slides.length}: "${slide.title_sans || slide.type || ''}"`);

    const promptText = getCanonicalPrompt(slide, i, slides.length);
    console.log(`📝 Prompt: ${promptText.slice(0, 110)}...`);

    const contents = [
      {
        role: 'user',
        parts: [
          ...moodboardParts,
          { text: promptText }
        ]
      }
    ];

    try {
      const response = await ai.models.generateContent({
        model: modelCandidate,
        contents
      });

      let imageSaved = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData?.data) {
            const buffer = Buffer.from(part.inlineData.data, 'base64');
            fs.writeFileSync(outPath, buffer);
            console.log(`  ✓ Imagen generada y guardada en: ${outPath} (${buffer.length} bytes)`);
            imageSaved = true;
            break;
          }
        }
      }

      if (!imageSaved) {
        console.warn(`  ⚠️ La API no devolvió bytes de imagen en la respuesta para la lámina ${num}.`);
      }
    } catch (err) {
      console.error(`  ❌ Error generando imagen para slide ${num}:`, err.message || err);
      if (String(err).includes('429') || String(err).includes('RESOURCE_EXHAUSTED')) {
        console.warn(`  ⚠️ Nota: Quota agotada en Gemini API (Free Tier). Para generación masiva sin límites, activa Pay-as-you-go en Google AI Studio.`);
      }
    }
  }

  console.log(`\n✨ Proceso de generación de imágenes para [${carouselId}] completado.`);
}

// CLI Execution
if (require.main === module) {
  const carouselId = process.argv[2];
  if (!carouselId) {
    console.error('Uso: node scripts/generate-images.cjs <carousel-id>');
    process.exit(1);
  }
  generateImagesForCarousel(carouselId).catch(err => {
    console.error('Fallo en la ejecución:', err);
    process.exit(1);
  });
}

module.exports = { generateImagesForCarousel, getCanonicalPrompt };
