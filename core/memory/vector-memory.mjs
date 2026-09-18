/**
 * Memoria Semántica y Deduplicación Vectorial por Marca (90 Días)
 */

import path from 'node:path';
import fs from 'node:fs';
import { CORE_CONFIG } from '../config.mjs';

export function cosineSimilarity(vecA, vecB) {
  if (!vecA || !vecB || vecA.length !== vecB.length) return 0;
  let dotProduct = 0, normA = 0, normB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function generateEmbedding(text, dimensions = 1536) {
  const vector = new Float32Array(dimensions);
  const words = text.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(Boolean);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let hash = 0;
    for (let c = 0; c < word.length; c++) {
      hash = ((hash << 5) - hash) + word.charCodeAt(c);
      hash |= 0;
    }
    vector[Math.abs(hash) % dimensions] += 1.0;
  }

  let norm = 0;
  for (let i = 0; i < dimensions; i++) norm += vector[i] * vector[i];
  norm = Math.sqrt(norm);
  if (norm > 0) {
    for (let i = 0; i < dimensions; i++) vector[i] /= norm;
  }
  return Array.from(vector);
}

function getMemoryFile(brandId) {
  if (!fs.existsSync(CORE_CONFIG.paths.memory)) {
    fs.mkdirSync(CORE_CONFIG.paths.memory, { recursive: true });
  }
  return path.join(CORE_CONFIG.paths.memory, `${brandId}-memory.json`);
}

export function checkDeduplication(draft, brandId) {
  const memFile = getMemoryFile(brandId);
  let memory = [];
  if (fs.existsSync(memFile)) {
    try { memory = JSON.parse(fs.readFileSync(memFile, 'utf-8')); } catch (e) {}
  }

  const text = `${draft.hook} ${draft.coreThesis}`;
  const candidateVec = generateEmbedding(text);

  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - CORE_CONFIG.thresholds.memoryWindowDays);

  let highestSim = 0;
  let matched = null;

  for (const item of memory) {
    if (new Date(item.date) >= cutoff) {
      const sim = cosineSimilarity(candidateVec, item.embedding);
      if (sim > highestSim) {
        highestSim = sim;
        matched = item;
      }
    }
  }

  return {
    isDuplicate: highestSim >= CORE_CONFIG.thresholds.maxCosineSimilarity,
    highestSimilarity: Number(highestSim.toFixed(4)),
    matchedItem: matched,
    candidateVec
  };
}

export function saveToMemory(draft, brandId, vec = null) {
  const memFile = getMemoryFile(brandId);
  let memory = [];
  if (fs.existsSync(memFile)) {
    try { memory = JSON.parse(fs.readFileSync(memFile, 'utf-8')); } catch (e) {}
  }

  const text = `${draft.hook} ${draft.coreThesis}`;
  const embedding = vec || generateEmbedding(text);

  memory.unshift({
    id: `mem_${Date.now()}`,
    date: new Date().toISOString(),
    hook: draft.hook,
    coreThesis: draft.coreThesis,
    embedding
  });

  fs.writeFileSync(memFile, JSON.stringify(memory, null, 2), 'utf-8');
}
