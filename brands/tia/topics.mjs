/**
 * Ontología Temática y Pilares B2B para The Insightful Arrow
 */

export const TOPICS = [
  {
    vertical: 'Agencias de Branding y Diseño',
    pillar: 'Deconstrucción de Operaciones Rotas',
    hook: 'Una agencia de diseño con 12 creativos pierde en promedio $6,200 al mes simplemente porque producción no tiene una barrera técnica para rechazar briefs incompletos.',
    coreThesis: 'El 35% de las horas senior se fuga en triage administrativo persiguiendo información desestructurada.',
    slides: [
      { title: 'Fuga de Margen', body: 'El 35% del tiempo de creativos senior se pierde en descifrar notas de voz y pedir archivos.', badge: 'DIAGNÓSTICO', metric: '$6,200 / mes' },
      { title: 'Anatomía del Fallo', body: '3 rondas de corrección adicionales por briefs no validados drenan la rentabilidad.', badge: 'EL CUELLO DE BOTELLA', metric: '42 horas extra' },
      { title: 'Infraestructura Inmutable', body: 'El Empleado Digital intercepta requerimientos y bloquea asignaciones incompletas en 3 segundos.', badge: 'SOLUCIÓN TIA', metric: '3 segundos' },
      { title: 'Outcome Final', body: 'Cero tareas abiertas en el gestor de proyectos sin activos 100% verificados.', badge: 'ESTADO RESUELTO', metric: '0h de triage' },
      { title: 'Sesión Técnica', body: 'Auditoría de recepción operativa agendable vía Calendly en el perfil.', badge: 'DIAGNÓSTICO', metric: 'The Insightful Arrow' }
    ],
    caption: 'Una agencia de diseño con 12 creativos pierde en promedio $6,200 al mes simplemente porque producción no tiene una barrera técnica para rechazar briefs incompletos.\n\nCuando los requerimientos llegan dispersos en notas de voz y correos, los diseñadores senior dedican hasta el 35% de su tiempo a triage administrativo.\n\nLa solución no es contratar coordinadores; es implementar una compuerta técnica inmutable que valide cada archivo en segundos.',
    cta: 'El protocolo operativo está documentado en el perfil. Sesión de diagnóstico técnico agendable vía Calendly.'
  },
  {
    vertical: 'Sector Automotriz',
    pillar: 'Deconstrucción de Operaciones Rotas',
    hook: 'A las 8:30 PM del sábado, un cliente con presupuesto aprobado escribe al canal de tres concesionarios. El primero que entrega la corrida formal se queda con la venta.',
    coreThesis: 'Demorar más de 30 minutos en entregar una cotización vehicular reduce la tasa de cierre en un 68%.',
    slides: [
      { title: 'Ventana de Venta', body: 'El 42% de los prospectos calificados solicitan cotizaciones fuera del horario de oficina.', badge: 'LATENCIA', metric: '68% pérdida' },
      { title: 'Demora Humana', body: 'Un mensaje el viernes en la noche suele responderse el lunes al mediodía.', badge: 'EL PROBLEMA', metric: '14 horas' },
      { title: 'Atención en 8s', body: 'El Empleado Digital consulta el inventario en tiempo real y calcula la corrida en segundos.', badge: 'INFRAESTRUCTURA', metric: '8 segundos' },
      { title: 'Citas Agendadas', body: 'El cliente recibe su cotización formal en PDF y su enlace de prueba de manejo al instante.', badge: 'OUTCOME', metric: '92% retención' },
      { title: 'Evaluación Técnica', body: 'Evaluamos la latencia comercial de su concesionario vía Calendly en bio.', badge: 'DIAGNÓSTICO', metric: 'The Insightful Arrow' }
    ],
    caption: 'A las 8:30 PM del sábado, un cliente con presupuesto aprobado escribe al canal de tres concesionarios. El primero que entrega la corrida financiera formal se queda con la venta.\n\nLa latencia humana en canales digitales drena más del 60% del retorno de inversión en pauta.\n\nImplementar un Empleado Digital conectado a su inventario liquida los tiempos muertos, garantizando atención formal en 8 segundos las 24 horas del día.',
    cta: 'Para concesionarios y talleres con más de 600 leads mensuales, evaluación agendable vía Calendly en perfil.'
  }
];

export function getScheduledTopic(index = 0) {
  return TOPICS[index % TOPICS.length];
}
