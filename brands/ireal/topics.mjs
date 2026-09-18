/**
 * Ontología Editorial y Pilares de Contenido para IREAL
 */

export const TOPICS = [
  {
    vertical: 'Creadores de Contenido',
    pillar: 'Deconstrucción del Caos Creativo',
    hook: 'Tener 40 ideas brillantes en las notas del teléfono no sirve de nada si ninguna termina en tu calendario editorial.',
    coreThesis: 'El mayor cementerio de contenido no es la falta de creatividad, sino la fricción entre tener una idea y estructurar un plan.',
    slides: [
      { title: 'El Cementerio de Notas', body: 'Capturas de pantalla, audios de 3 minutos y frases sueltas dispersas en 5 aplicaciones.', badge: 'EL SÍNTOMA', metric: '40 notas huérfanas' },
      { title: 'La Parálisis del Domingo', body: 'Sentarte frente a una hoja en blanco a decidir qué vas a publicar esta semana agota tu energía.', badge: 'LA FRICCIÓN', metric: '3 horas perdidas' },
      { title: 'El Cuaderno Mágico', body: 'Un solo espacio donde tus notas desordenadas se transforman en estrategias completas con IA.', badge: 'LA HERRAMIENTA', metric: '1 solo flujo' },
      { title: 'Al Calendario en Minutos', body: 'La IA distribuye tus ideas en una grilla mensual con ganchos, desarrollos y llamadas a la acción.', badge: 'EL OUTCOME', metric: '3 minutos' },
      { title: 'Empieza Hoy', body: 'Entra a IREAL y transforma tu primera idea en un plan completo en el enlace de la bio.', badge: 'CUADERNO IREAL', metric: 'ireal.app' }
    ],
    caption: 'Tener 40 ideas brillantes en las notas del teléfono no sirve de nada si ninguna termina en tu calendario editorial.\n\nEl mayor enemigo del creador no es la falta de inspiración; es la fricción de pasar de una nota rápida a un post listo para grabar.\n\nEn IREAL unificamos todo el ciclo creativo: desde tu cuaderno de notas hasta la estrategia mensual en streaming.\n\nDe la idea al calendario en minutos, no en horas.',
    cta: 'Crea tu cuaderno gratis en el enlace del perfil.'
  },
  {
    vertical: 'Creadores Independientes',
    pillar: 'Nudges con IA y Foco Creativo',
    hook: 'Bloquearte al escribir no se cura con más fuerza de voluntad; se cura haciéndote la pregunta correcta en el momento exacto.',
    coreThesis: 'Mientras escribes, los Nudges de IREAL detectan pausas naturales y lanzan preguntas provocadoras inspiradas en Rick Rubin.',
    slides: [
      { title: 'La Pared Creativa', body: 'Arrancas una idea con entusiasmo y a los dos párrafos te quedas sin saber cómo rematarla.', badge: 'BLOQUEO', metric: 'El muro mental' },
      { title: 'El Nudge Contextual', body: 'Una burbuja sutil aparece: "¿Qué es lo que no estás diciendo por miedo al qué dirán?".', badge: 'PROVOCACIÓN', metric: 'Profundidad' },
      { title: 'Destrabar la Esencia', body: 'La pregunta desbloquea el ángulo que vuelve tu historia magnética y personal.', badge: 'RESOLUCIÓN', metric: '1 click' },
      { title: 'Contenido Memorable', body: 'Tus publicaciones dejan de sonar a información repetida y empiezan a sonar a ti.', badge: 'RESULTADO', metric: 'Voz propia' },
      { title: 'Escribe en IREAL', body: 'Prueba la experiencia de escribir con un copiloto que desafía tu pensamiento en el link de la bio.', badge: 'CREA CON MAGIA', metric: 'ireal.app' }
    ],
    caption: 'Bloquearte al escribir no se cura con más fuerza de voluntad; se cura haciéndote la pregunta correcta en el momento exacto.\n\nLos AI Nudges de IREAL funcionan como un mentor silencioso mientras escribes tus notas, profundizando tus reflexiones sin interrumpir tu flujo.\n\nMenos fórmulas vacías, más autenticidad.',
    cta: 'Accede a IREAL desde el enlace de nuestro perfil.'
  }
];

export function getScheduledTopic(index = 0) {
  return TOPICS[index % TOPICS.length];
}
