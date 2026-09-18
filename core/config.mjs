import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Helper para cargar .env de forma limpia
function loadEnv() {
  const envPaths = [
    path.join(projectRoot, '.env'),
    path.join(projectRoot, '.env.local')
  ];

  for (const p of envPaths) {
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const idx = trimmed.indexOf('=');
          const key = trimmed.slice(0, idx).trim();
          const val = trimmed.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
          if (!process.env[key] && val) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

loadEnv();

export const CORE_CONFIG = {
  paths: {
    root: projectRoot,
    core: __dirname,
    brands: path.join(projectRoot, 'brands'),
    dist: path.join(projectRoot, 'dist'),
    memory: path.join(projectRoot, 'dist', 'memory')
  },

  llm: {
    nvidiaApiKey: process.env.NVIDIA_API_KEY || '',
    nvidiaBaseUrl: process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1',
    nvidiaModel: 'deepseek-ai/deepseek-v4-flash-0731',
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
    openaiApiKey: process.env.OPENAI_API_KEY || ''
  },

  social: {
    zernioApiKey: process.env.ZERNIO_API_KEY || '',
    zernioBaseUrl: 'https://api.zernio.com/v1'
  },

  thresholds: {
    linterMinScore: 8.5,
    maxCosineSimilarity: 0.82,
    memoryWindowDays: 90
  }
};

/**
 * Carga el perfil y temas de una marca específica
 */
export async function loadBrandConfig(brandId) {
  const brandDir = path.join(CORE_CONFIG.paths.brands, brandId);
  if (!fs.existsSync(brandDir)) {
    throw new Error(`La marca '${brandId}' no existe en ${CORE_CONFIG.paths.brands}`);
  }

  const brandJsonPath = path.join(brandDir, 'brand.json');
  if (!fs.existsSync(brandJsonPath)) {
    throw new Error(`Falta brand.json para la marca '${brandId}'`);
  }

  const brandData = JSON.parse(fs.readFileSync(brandJsonPath, 'utf-8'));
  const topicsPath = path.join(brandDir, 'topics.mjs');
  let topicsModule = null;

  if (fs.existsSync(topicsPath)) {
    topicsModule = await import(`file://${topicsPath}`);
  }

  return {
    ...brandData,
    brandDir,
    topics: topicsModule?.TOPICS || null,
    pillars: topicsModule?.PILLARS || null,
    getScheduledTopic: topicsModule?.getScheduledTopic || null
  };
}
