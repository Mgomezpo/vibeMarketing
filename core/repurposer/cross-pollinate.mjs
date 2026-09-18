/**
 * Motor de Repurposing Cruzado (Cross-Pollination)
 * Toma un hecho operativo o semilla y lo transforma en los 3 registros de marca
 */

import { CORE_CONFIG } from '../config.mjs';

export async function repurposeEvent(rawEvent, brandConfigs) {
  const prompt = `Actúa como Director Editorial en Jefe del ecosistema multi-marca:
1. The Insightful Arrow (TIA): B2B Agencia de Alto Ticket ($5,000/mes). Tono: COO frío, financiero, de par a par, sin jerga de IA.
2. IREAL: App mágica para creadores hispanohablantes ("De la idea al calendario en minutos"). Tono: Creador, inspirador, empático, sin clichés.
3. Miguel Gómez: Marca personal de fundador/builder. Tono: Español con 'vos', casual, calmado, build-in-public real.

HECHO OPERATIVO O SEMILLA REAL:
"${rawEvent}"

Genera 3 borradores completos con sus diapositivas y ganchos adaptados al ADN de cada marca.

SALIDA REQUERIDA (Únicamente este JSON válido):
{
  "tia": {
    "hook": "Sentencia de tensión financiera...",
    "coreThesis": "Explicación del costo operativo...",
    "slides": [
      { "title": "...", "body": "...", "badge": "DIAGNÓSTICO", "metric": "$3,800/mes" },
      { "title": "...", "body": "...", "badge": "ANATOMÍA", "metric": "14 horas" },
      { "title": "...", "body": "...", "badge": "INFRAESTRUCTURA", "metric": "8 segundos" },
      { "title": "...", "body": "...", "badge": "OUTCOME", "metric": "100% verificado" }
    ],
    "caption": "...",
    "cta": "Diagnóstico operativo en bio."
  },
  "ireal": {
    "hook": "Gancho empático para creadores...",
    "coreThesis": "Cómo romper el bloqueo de la idea al calendario...",
    "slides": [
      { "title": "...", "body": "...", "badge": "BLOQUEO", "metric": "Ideas perdidas" },
      { "title": "...", "body": "...", "badge": "EL CUADERNO", "metric": "1 solo lugar" },
      { "title": "...", "body": "...", "badge": "ESTRATEGIA", "metric": "En minutos" },
      { "title": "...", "body": "...", "badge": "CALENDARIO", "metric": "Listo" }
    ],
    "caption": "...",
    "cta": "Prueba IREAL en el enlace de la bio."
  },
  "miguel": {
    "hook": "Gancho con vos y build-in-public...",
    "coreThesis": "Aprendizaje de fundador...",
    "slides": [
      { "title": "...", "body": "...", "badge": "DETRÁS DE CÁMARAS", "metric": "Semana 12" },
      { "title": "...", "body": "...", "badge": "EL ERROR", "metric": "Lo que falló" },
      { "title": "...", "body": "...", "badge": "LA ARQUITECTURA", "metric": "Solución" },
      { "title": "...", "body": "...", "badge": "LECCIÓN", "metric": "Takeaway" }
    ],
    "caption": "...",
    "cta": "¿Vos cómo gestionás esto en tu proyecto? Te leo."
  }
}`;

  if (CORE_CONFIG.llm.nvidiaApiKey) {
    try {
      const res = await fetch(`${CORE_CONFIG.llm.nvidiaBaseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CORE_CONFIG.llm.nvidiaApiKey}`
        },
        body: JSON.stringify({
          model: CORE_CONFIG.llm.nvidiaModel,
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.3,
          response_format: { type: 'json_object' }
        }),
        signal: AbortSignal.timeout(10000)
      });
      if (res.ok) {
        const d = await res.json();
        const jsonMatch = d.choices?.[0]?.message?.content.match(/\{[\s\S]*\}/);
        if (jsonMatch) return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {}
  }

  // Fallback curado determinista si no hay conexión
  return generateDeterministicRepurposing(rawEvent);
}

function generateDeterministicRepurposing(rawEvent) {
  return {
    tia: {
      hook: 'Automatizar la entrega de activos ahorra $4,200 mensuales a una agencia de 10 personas.',
      coreThesis: 'El triage manual de archivos drena el 30% del margen de contratos de tarifa plana.',
      slides: [
        { title: 'Fuga de Margen', body: 'Horas no facturables en tareas mecánicas.', badge: 'DIAGNÓSTICO', metric: '$4,200/mes' },
        { title: 'El Desorden', body: 'Archivos dispersos y entregas no validadas.', badge: 'ANATOMÍA', metric: '42 horas' },
        { title: 'Infraestructura', body: 'Enrutamiento determinista en segundos.', badge: 'SISTEMA', metric: '8 segundos' },
        { title: 'Outcome', body: 'Producción 100% blindada sin directores de tráfico.', badge: 'RESULTADO', metric: '0 horas triage' }
      ],
      caption: 'Una agencia de servicios pierde miles de dólares cada mes cuando su equipo senior gestiona activos a mano. La infraestructura fija erradica ese pasivo.',
      cta: 'Evaluación técnica en el enlace del perfil.'
    },
    ireal: {
      hook: 'De nada sirve tener 50 ideas brillantes en las notas del teléfono si ninguna llega al calendario.',
      coreThesis: 'El abismo entre pensar una idea y publicarla se resuelve ordenando el flujo creativo en un cuaderno mágico.',
      slides: [
        { title: 'El Caos Creativo', body: 'Ideas anotadas a medias en cinco apps diferentes.', badge: 'EL PROBLEMA', metric: '50 notas' },
        { title: 'El Cuaderno Mágico', body: 'Un solo lugar donde capturar sin interrupciones.', badge: 'IREAL', metric: '1 lugar' },
        { title: 'Nudges con IA', body: 'Preguntas contextuales para profundizar el concepto.', badge: 'FEATURE', metric: 'Sin bloqueo' },
        { title: 'Al Calendario', body: 'Estrategia completa distribuida en tu mes.', badge: 'OUTCOME', metric: 'En 3 minutos' }
      ],
      caption: 'La creatividad no necesita más disciplina; necesita menos fricción. Con IREAL, conviertes tus ideas desordenadas en un calendario editorial listo para ejecutar.',
      cta: 'Crea tu cuaderno gratis en el link de la bio.'
    },
    miguel: {
      hook: 'Mirá, me cansé de perder dos horas al día haciendo tareas repetitivas y armé esto.',
      coreThesis: 'Construir en público significa mostrar la cocina: cómo resolver fricciones reales con software.',
      slides: [
        { title: 'La Fricción', body: 'Peleando con procesos manuales que no escalan.', badge: 'BUILD IN PUBLIC', metric: 'Día a día' },
        { title: 'El Experimento', body: 'Diseñando una arquitectura autónoma con Playwright.', badge: 'CÓDIGO', metric: 'Node 22' },
        { title: 'El Resultado', body: 'Lo que antes tomaba una tarde ahora corre en segundos.', badge: 'SOLUCIÓN', metric: '8s' },
        { title: 'La Conclusión', body: 'El mejor software es el que quita fricción invisible.', badge: 'LECCIÓN', metric: 'Aprendizaje' }
      ],
      caption: 'Construir productos implica cansarse de los problemas propios y convertirlos en soluciones. Aquí te muestro cómo estructuramos este sistema.',
      cta: '¿Vos qué proceso repetitivo estás buscando automatizar este mes?'
    }
  };
}
