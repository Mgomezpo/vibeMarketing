/**
 * Linter Semántico Bicameral (LLM-as-a-Judge) Parametrizable por Marca
 * Temperatura 0.0 — Umbral de aprobación >= 8.5 / 10
 */

import { CORE_CONFIG } from '../config.mjs';

export async function runSemanticJudge(draft, brandConfig) {
  const brandName = brandConfig.name || 'Marca General';
  const voiceDescription = brandConfig.voiceDescription || 'Voz profesional, directa y sobria';

  const prompt = `Eres el Director de Calidad Editorial y Auditor de Marca de "${brandName}".
Tu cometido exclusivo es evaluar de forma estricta y sin complacencia el siguiente borrador editorial.

DIRECTRICES DE VOZ DE ESTA MARCA:
${voiceDescription}

RÚBRICA DE EVALUACIÓN (Escala 1.0 al 10.0):
1. Fidelidad al Tono de Marca (Peso: 25%):
   - ¿Encarna con precisión la voz requerida sin sonar a bot o a plantilla genérica?
2. Ausencia de Clichés / Humo de Marketing (Peso: 25%):
   - Prohibido cualquier recurso de venta agresiva, frases hechas o promesas vacías.
3. Especificidad y Detalle del Mensaje (Peso: 25%):
   - ¿Habla de fricciones, herramientas o situaciones procedimentales reales y no abstractas?
4. Claridad del Valor / Outcome (Peso: 25%):
   - ¿El cierre o artefacto presentado es indiscutible y de alto valor para el lector?

BORRADOR A EVALUAR:
-------------------
Gancho: ${draft.hook}
Tesis: ${draft.coreThesis}
Diapositivas:
${(draft.slides || []).map((s, i) => `[Slide ${i + 1}] ${s.title}: ${s.body} (Métrica: ${s.metric || 'N/A'})`).join('\n')}
Caption: ${draft.caption}
CTA: ${draft.cta}
-------------------

SALIDA REQUERIDA (Únicamente este bloque JSON válido):
{
  "tone_score": 9.0,
  "anti_cliche_score": 9.2,
  "specificity_score": 8.8,
  "outcome_score": 9.0,
  "overall_weighted_score": 9.0,
  "critical_violations": [],
  "rejection_reason": null
}`;

  try {
    const rawResult = await callJudgeLLM(prompt);
    const jsonMatch = rawResult.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No se encontró JSON en respuesta del evaluador');
    const parsed = JSON.parse(jsonMatch[0]);

    const weighted = (
      (parsed.tone_score * 0.25) +
      (parsed.anti_cliche_score * 0.25) +
      (parsed.specificity_score * 0.25) +
      (parsed.outcome_score * 0.25)
    );
    const overallScore = Number(weighted.toFixed(2));
    const passed = overallScore >= CORE_CONFIG.thresholds.linterMinScore && (!parsed.critical_violations || parsed.critical_violations.length === 0);

    return {
      passed,
      stage: 'semantic',
      scores: {
        tone: parsed.tone_score,
        antiCliche: parsed.anti_cliche_score,
        specificity: parsed.specificity_score,
        outcome: parsed.outcome_score,
        overallWeighted: overallScore
      },
      overallScore,
      violations: parsed.critical_violations || [],
      rejectionReason: passed ? null : (parsed.rejection_reason || `Puntuación ${overallScore} inferior a ${CORE_CONFIG.thresholds.linterMinScore}`)
    };
  } catch (err) {
    return runSemanticFallback(draft, brandConfig);
  }
}

async function callJudgeLLM(prompt) {
  if (CORE_CONFIG.llm.nvidiaApiKey) {
    const res = await fetch(`${CORE_CONFIG.llm.nvidiaBaseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CORE_CONFIG.llm.nvidiaApiKey}`
      },
      body: JSON.stringify({
        model: CORE_CONFIG.llm.nvidiaModel,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.0,
        response_format: { type: 'json_object' }
      })
    });
    if (res.ok) {
      const data = await res.json();
      return data.choices?.[0]?.message?.content;
    }
  }

  throw new Error('Sin LLM disponible');
}

function runSemanticFallback(draft, brandConfig) {
  const slideText = (draft.slides || []).map(s => `${s.title || ''} ${s.body || ''} ${s.metric || ''}`).join(' ');
  const text = `${draft.hook} ${draft.coreThesis} ${draft.caption} ${slideText}`.toLowerCase();

  const isSober = !/incre[ií]ble|asombroso|urgente|atenci[oó]n|hack|truco|m[aá]gico/i.test(text);
  const hasSpecificContext = text.length > 250 && draft.slides && draft.slides.length >= 4;

  const tone = isSober ? 9.0 : 7.0;
  const antiCliche = isSober ? 9.2 : 6.8;
  const specificity = hasSpecificContext ? 9.0 : 7.2;
  const outcome = hasSpecificContext ? 9.0 : 7.0;

  const overall = Number(((tone * 0.25) + (antiCliche * 0.25) + (specificity * 0.25) + (outcome * 0.25)).toFixed(2));
  const passed = overall >= CORE_CONFIG.thresholds.linterMinScore;

  return {
    passed,
    stage: 'semantic_fallback',
    scores: { tone, antiCliche, specificity, outcome, overallWeighted: overall },
    overallScore: overall,
    violations: passed ? [] : ['Falta de especificidad o tono no calibrado'],
    rejectionReason: passed ? null : `Puntuación ${overall} inferior a 8.5`
  };
}
