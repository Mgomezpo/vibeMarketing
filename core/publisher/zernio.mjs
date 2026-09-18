/**
 * Gateway de Publicación Zernio Multi-Brand
 * Despacha publicaciones a Instagram y LinkedIn según las cuentas conectadas
 */

import path from 'node:path';
import fs from 'node:fs';
import { CORE_CONFIG } from '../config.mjs';

export async function publishToZernio(manifest, pngPaths, brandConfig, options = {}) {
  const apiKey = CORE_CONFIG.social.zernioApiKey;
  if (!apiKey) {
    throw new Error('ZERNIO_API_KEY no encontrada en variables de entorno');
  }

  // 1. Obtener cuentas conectadas
  const accountsRes = await fetch(`${CORE_CONFIG.social.zernioBaseUrl}/accounts`, {
    headers: { Authorization: `Bearer ${apiKey}` }
  });
  if (!accountsRes.ok) {
    throw new Error(`Error Zernio al listar cuentas (${accountsRes.status})`);
  }
  const accountsData = await accountsRes.json();
  const accounts = accountsData.accounts || [];

  // 2. Mapear cuenta según la configuración de la marca
  const targetUsername = brandConfig.targetAccount?.instagram;
  let igAccount = accounts.find(a => a.platform === 'instagram' && a.username === targetUsername);
  
  // Fallback si no encuentra el username exacto
  if (!igAccount && accounts.length > 0) {
    igAccount = accounts.find(a => a.platform === 'instagram');
  }

  const platforms = [];
  if (igAccount) {
    platforms.push({ platform: 'instagram', accountId: igAccount._id });
  }

  // LinkedIn si está disponible
  const liAccount = accounts.find(a => a.platform === 'linkedin');
  if (liAccount && brandConfig.platforms?.includes('linkedin')) {
    platforms.push({ platform: 'linkedin', accountId: liAccount._id });
  }

  if (platforms.length === 0) {
    return {
      status: 'STAGED_NO_CONNECTED_ACCOUNT',
      message: `No se encontró cuenta conectada en Zernio para '${targetUsername}'. Activos guardados localmente.`
    };
  }

  // 3. Subir imágenes a Zernio Media
  const uploadedUrls = [];
  for (const pngPath of pngPaths) {
    if (fs.existsSync(pngPath)) {
      const fileBuffer = fs.readFileSync(pngPath);
      const filename = path.basename(pngPath);
      const formData = new FormData();
      const blob = new Blob([fileBuffer], { type: 'image/png' });
      formData.append('files', blob, filename);

      const upRes = await fetch(`${CORE_CONFIG.social.zernioBaseUrl}/media`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
        body: formData
      });

      if (upRes.ok) {
        const upData = await upRes.json();
        if (upData.files?.[0]?.url) {
          uploadedUrls.push(upData.files[0].url);
        }
      }
    }
  }

  // 4. Determinar si se publica en vivo o como borrador
  // Regla de oro: Miguel Gómez NUNCA publica en vivo automáticamente.
  const isDraftOnly = options.draftOnly === true || brandConfig.governance === 'COPILOT_ONLY';

  const payload = {
    title: manifest.hook.slice(0, 80),
    content: manifest.caption,
    mediaItems: uploadedUrls.map(u => ({ type: 'image', url: u })),
    platforms,
    status: isDraftOnly ? 'draft' : 'published',
    publishNow: !isDraftOnly
  };

  const postRes = await fetch(`${CORE_CONFIG.social.zernioBaseUrl}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!postRes.ok) {
    const err = await postRes.text();
    throw new Error(`Error Zernio al crear post (${postRes.status}): ${err}`);
  }

  const resultData = await postRes.json();
  return {
    provider: 'zernio',
    postId: resultData.post?._id,
    status: isDraftOnly ? 'DRAFT_SAVED' : 'PUBLISHED_LIVE',
    targetAccount: igAccount?.username,
    uploadedMediaCount: uploadedUrls.length
  };
}
