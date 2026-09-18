/**
 * Filtros Deterministas por Expresiones Regulares (Tier 1 Gate)
 * Inmutables y universales para todas las marcas
 */

export const UNIVERSAL_BLACKLIST = {
  snakeOilHype: [
    /\b(automatizaci[oó]n\s+m[aá]gica|ahorra\s+tiempo|horas\s+ahorradas|revoluciona|cambia\s+el\s+juego|game[\s-]changer|secreto|f[oó]rmula\s+m[aá]gica|despega\s+tu\s+negocio|sin\s+esfuerzo|ingresos\s+pasivos)\b/gi
  ],
  corporateAbstract: [
    /\b(sinergia|hol[ií]stico|innovaci[oó]n\s+disruptiva|paradigma|optimizaci[oó]n\s+360|valor\s+a[nñ]adido|excelencia\s+operacional)\b/gi
  ],
  vanityMetrics: [
    /\b(comenta\s+abajo|dale\s+like|s[ií]gueme\s+para\s+m[aá]s|comparte\s+este\s+post|etiqueta\s+a\s+un\s+amigo)\b/gi
  ]
};

export function runDeterministicFilter(draft, brandConfig = {}) {
  const violations = [];

  const allText = [
    draft.hook || '',
    draft.coreThesis || '',
    draft.caption || '',
    ...(draft.slides || []).map(s => `${s.title || ''} ${s.body || ''} ${s.metric || ''}`)
  ].join(' ');

  // 1. Blacklist Universal
  for (const [category, regexList] of Object.entries(UNIVERSAL_BLACKLIST)) {
    for (const regex of regexList) {
      const matches = allText.match(regex);
      if (matches) {
        violations.push({
          category,
          detected: [...new Set(matches.map(m => m.trim()))]
        });
      }
    }
  }

  // 2. Blacklist específica de Marca (ej. TIA censura jerga de IA)
  if (brandConfig.forbiddenTerms && Array.isArray(brandConfig.forbiddenTerms)) {
    for (const pattern of brandConfig.forbiddenTerms) {
      const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');
      const matches = allText.match(regex);
      if (matches) {
        violations.push({
          category: 'brandForbiddenTerms',
          detected: [...new Set(matches.map(m => m.trim()))]
        });
      }
    }
  }

  // 3. Prohibición de preguntas retóricas abiertas en el Gancho
  const rhetoricalRegex = /^\s*(¿|\?|sab[ií]as\s+que|te\s+has\s+preguntado|alguna\s+vez|quieres\s+saber)/i;
  if (rhetoricalRegex.test(draft.hook || '')) {
    violations.push({
      category: 'rhetoricalQuestionInHook',
      detected: ['El gancho no puede iniciar con una pregunta retórica amateur. Debe ser una afirmación con tensión.']
    });
  }

  // 4. Conteo de diapositivas
  if (!draft.slides || draft.slides.length < 4 || draft.slides.length > 8) {
    violations.push({
      category: 'invalidSlideCount',
      detected: [`El carrusel debe tener entre 4 y 8 láminas. Tiene: ${draft.slides?.length || 0}`]
    });
  }

  const passed = violations.length === 0;

  return {
    passed,
    stage: 'deterministic',
    violations,
    rejectionReason: passed ? null : `Violaciones deterministas: ${JSON.stringify(violations)}`
  };
}
