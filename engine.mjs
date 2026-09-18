#!/usr/bin/env node

/**
 * vibeMarketing Multi-Brand OS — Master CLI Orchestrator
 * Soporta TIA (Agencia B2B), IREAL (App Creadores) y Miguel Gómez (Marca Personal)
 */

import path from 'node:path';
import fs from 'node:fs';
import { CORE_CONFIG, loadBrandConfig } from './core/config.mjs';
import { runDeterministicFilter } from './core/linter/deterministic.mjs';
import { runSemanticJudge } from './core/linter/semantic-judge.mjs';
import { renderBrandCarousel } from './core/renderer/playwright.mjs';
import { publishToZernio } from './core/publisher/zernio.mjs';
import { checkDeduplication, saveToMemory } from './core/memory/vector-memory.mjs';
import { repurposeEvent } from './core/repurposer/cross-pollinate.mjs';

const args = process.argv.slice(2);
const command = args[0] || 'help';

function getParam(name) {
  const idx = args.indexOf(`--${name}`);
  if (idx !== -1 && args[idx + 1]) return args[idx + 1];
  return null;
}

async function main() {
  const brandId = getParam('brand') || 'tia';

  switch (command) {
    case 'test':
      await runBrandTest(brandId);
      break;

    case 'test-all':
      for (const b of ['tia', 'ireal', 'miguel']) {
        await runBrandTest(b);
      }
      break;

    case 'draft':
      await runBrandPipeline(brandId, { draftOnly: true });
      break;

    case 'run':
      await runBrandPipeline(brandId, { draftOnly: false });
      break;

    case 'repurpose':
      await runRepurposing();
      break;

    case 'status':
      await showStatus();
      break;

    case 'help':
    default:
      printHelp();
      break;
  }
}

async function runBrandTest(brandId) {
  console.log(`\n=============================================================`);
  console.log(`🧪 PROBANDO MARCA: ${brandId.toUpperCase()}`);
  console.log(`=============================================================`);

  const brand = await loadBrandConfig(brandId);
  const topic = brand.getScheduledTopic ? brand.getScheduledTopic(0) : (brand.topics ? brand.topics[0] : null);

  if (!topic) {
    throw new Error(`No se encontraron temas para la marca '${brandId}'`);
  }

  console.log(`📌 Gancho de Prueba: "${topic.hook.slice(0, 75)}..."`);

  // 1. Linter Determinista
  const detResult = runDeterministicFilter(topic, brand);
  if (!detResult.passed) {
    console.error('❌ Falló filtro determinista:', detResult.violations);
    return;
  }
  console.log('✅ Tier 1 Determinista: APROBADO');

  // 2. Linter Semántico
  const semResult = await runSemanticJudge(topic, brand);
  console.log(`⚖️  Tier 2 Linter Semántico: ${semResult.overallScore}/10 (${semResult.passed ? 'APROBADO' : 'RECHAZADO'})`);
  console.log(`   • Tono: ${semResult.scores.tone} | Anti-cliché: ${semResult.scores.antiCliche} | Detalle: ${semResult.scores.specificity} | Outcome: ${semResult.scores.outcome}`);

  // 3. Renderizado Visual Playwright
  console.log('🎨 Compilando activos visuales con Playwright...');
  const testDir = path.join(CORE_CONFIG.paths.dist, 'tests', brandId);
  const render = await renderBrandCarousel(topic, brand, testDir);

  console.log(`📄 PDF Generado:   ${render.pdfPath}`);
  console.log(`🖼️  PNGs Generados: ${render.pngPaths.length} láminas`);
  console.log(`🌐 Vista Previa:   ${render.previewHtmlPath}`);
  console.log(`🎉 TEST PARA ${brandId.toUpperCase()} COMPLETADO CON ÉXITO.\n`);
}

async function runBrandPipeline(brandId, options = {}) {
  console.log(`\n=============================================================`);
  console.log(`🚀 EJECUTANDO PIPELINE: ${brandId.toUpperCase()}`);
  console.log(`=============================================================`);

  const brand = await loadBrandConfig(brandId);

  // REGLA DE ORO DE GOBERNANZA:
  // Si la marca es Miguel Gómez (COPILOT_ONLY), nunca publica en vivo sin --approve
  if (brand.governance === 'COPILOT_ONLY' && !options.draftOnly && !args.includes('--approve')) {
    console.log(`🛑 GOBERNANZA ACTIVADA: La marca '${brand.name}' opera en MODO COPILOTO.`);
    console.log(`   Se generará el borrador para tu revisión en Zernio y en disco.`);
    console.log(`   (Para forzar publicación en vivo usa: node engine.mjs run --brand miguel --approve)\n`);
    options.draftOnly = true;
  }

  const topic = brand.getScheduledTopic ? brand.getScheduledTopic(0) : brand.topics[0];

  // 1. Memoria Semántica (Deduplicación)
  const memCheck = checkDeduplication(topic, brandId);
  if (memCheck.isDuplicate) {
    console.warn(`⚠️  Aviso: Similitud temática de ${memCheck.highestSimilarity} >= ${CORE_CONFIG.thresholds.maxCosineSimilarity}`);
  } else {
    console.log(`🧠 Memoria Semántica: Inédito (Similitud: ${memCheck.highestSimilarity})`);
  }

  // 2. Linters
  const detResult = runDeterministicFilter(topic, brand);
  if (!detResult.passed) {
    console.error('❌ Abortado por violaciones deterministas:', detResult.violations);
    return;
  }

  const semResult = await runSemanticJudge(topic, brand);
  if (!semResult.passed) {
    console.error(`❌ Abortado: Linter semántico ${semResult.overallScore}/10 < ${CORE_CONFIG.thresholds.linterMinScore}`);
    return;
  }
  console.log(`✅ Calidad Verificada: ${semResult.overallScore}/10`);

  // 3. Renderizado Visual
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const postFolder = path.join(CORE_CONFIG.paths.dist, brandId, timestamp);
  const render = await renderBrandCarousel(topic, brand, postFolder);

  // 4. Manifiesto
  const manifest = {
    brand: brandId,
    name: brand.name,
    timestamp: new Date().toISOString(),
    hook: topic.hook,
    caption: `${topic.caption}\n\n${topic.cta}`,
    assets: render
  };
  fs.writeFileSync(path.join(postFolder, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf-8');

  // 5. Despacho a Zernio
  console.log(`📡 Conectando con Zernio API (Modo: ${options.draftOnly ? 'Borrador' : 'Publicación en Vivo'})...`);
  const pubResult = await publishToZernio(manifest, render.pngPaths, brand, options);
  console.log(`📊 Resultado Zernio:`, pubResult);

  // 6. Guardar en memoria
  saveToMemory(topic, brandId, memCheck.candidateVec);

  console.log(`\n🎉 PIPELINE FINALIZADO.`);
  console.log(`📁 Carpeta: ${postFolder}\n`);
}

async function runRepurposing() {
  const event = getParam('event') || 'Hoy conectamos una arquitectura en Node.js que genera carruseles en Playwright y los despacha a redes en 8 segundos.';
  console.log(`\n🔄 REPURPOSING DE EVENTO OPERATIVO:`);
  console.log(`"${event}"\n`);

  const brandConfigs = {
    tia: await loadBrandConfig('tia'),
    ireal: await loadBrandConfig('ireal'),
    miguel: await loadBrandConfig('miguel')
  };

  const results = await repurposeEvent(event, brandConfigs);

  console.log('--------------------------------------------------');
  console.log('1. THE INSIGHTFUL ARROW (B2B COO):');
  console.log(`Gancho:  ${results.tia.hook}`);
  console.log(`Caption: ${results.tia.caption.slice(0, 120)}...`);

  console.log('\n--------------------------------------------------');
  console.log('2. IREAL (CREADORES & CUADERNO MÁGICO):');
  console.log(`Gancho:  ${results.ireal.hook}`);
  console.log(`Caption: ${results.ireal.caption.slice(0, 120)}...`);

  console.log('\n--------------------------------------------------');
  console.log('3. MIGUEL GÓMEZ (BUILD IN PUBLIC CON VOS):');
  console.log(`Gancho:  ${results.miguel.hook}`);
  console.log(`Caption: ${results.miguel.caption.slice(0, 120)}...`);
  console.log('--------------------------------------------------\n');
}

async function showStatus() {
  console.log('\n=============================================');
  console.log('📊 ESTADO DEL SISTEMA: vibeMarketing Multi-Brand OS');
  console.log('=============================================');

  // Zernio
  if (CORE_CONFIG.social.zernioApiKey) {
    try {
      const res = await fetch(`${CORE_CONFIG.social.zernioBaseUrl}/accounts`, {
        headers: { Authorization: `Bearer ${CORE_CONFIG.social.zernioApiKey}` }
      });
      if (res.ok) {
        const d = await res.json();
        console.log(`Zernio API:         🟢 Conectado`);
        console.log(`Cuentas vinculadas: ${d.accounts?.map(a => `${a.platform}:${a.username}`).join(', ')}`);
      } else {
        console.log(`Zernio API:         ⚠️ Error HTTP ${res.status}`);
      }
    } catch (e) {
      console.log(`Zernio API:         🔴 Error de conexión: ${e.message}`);
    }
  } else {
    console.log(`Zernio API:         ⚪ Sin API Key`);
  }

  // Marcas
  console.log('\nMarcas Configuradas:');
  for (const b of ['tia', 'ireal', 'miguel']) {
    try {
      const brand = await loadBrandConfig(b);
      console.log(`  • ${brand.displayName} (${b})`);
      console.log(`    - Gobernanza: ${brand.governance}`);
      console.log(`    - Cuenta IG:  @${brand.targetAccount?.instagram || 'N/A'}`);
    } catch (e) {}
  }
  console.log('=============================================\n');
}

function printHelp() {
  console.log(`
vibeMarketing Multi-Brand OS

Comandos:
  test --brand [tia|ireal|miguel]      Prueba calidad visual y linters de una marca
  test-all                             Prueba las 3 marcas simultáneamente
  draft --brand [tia|ireal|miguel]     Genera y envía como borrador a Zernio
  run --brand [tia|ireal|miguel]       Ejecuta pipeline completo (live para TIA/IREAL, copilot para Miguel)
  repurpose --event "Tu hecho real"    Convierte 1 hecho en 3 contenidos adaptados
  status                               Muestra estado de Zernio y cuentas
`);
}

main().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
