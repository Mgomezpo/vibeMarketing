/**
 * Ontología Editorial para Miguel Gómez (Marca Personal)
 */

export const TOPICS = [
  {
    vertical: 'Fundadores y Builders',
    pillar: 'Build in Public y Arquitectura',
    hook: 'Mirá, me cansé de perder dos horas al día haciendo tareas repetitivas y preferí escribir código para no volver a tocarlas.',
    coreThesis: 'Construir en público significa mostrar la cocina: cómo resolver fricciones reales con software sin humo.',
    slides: [
      { title: 'La Fricción Invisible', body: 'Pasar horas subiendo archivos, ajustando formatos y persiguiendo links agota tu creatividad.', badge: 'EL DOLOR REAL', metric: '2 horas/día' },
      { title: 'El Error Común', body: 'Intentar solucionar el desorden con más herramientas solo añade más pestañas abiertas a tu navegador.', badge: 'EL ERROR', metric: '10 pestañas' },
      { title: 'El Experimento', body: 'Monté un motor en Node.js que compila el diseño en código y lo despacha directo a la red social.', badge: 'LA COCINA', metric: 'Playwright + APIs' },
      { title: 'El Resultado', body: 'Lo que antes tomaba una tarde entera ahora corre en 8 segundos en segundo plano.', badge: 'RESOLUCIÓN', metric: '8 segundos' },
      { title: 'La Lección', body: 'El mejor software no es el más complejo; es el que borra la fricción que nadie quiere hacer.', badge: 'TAKEAWAY', metric: 'Enfócate en crear' }
    ],
    caption: 'Mirá, me cansé de perder dos horas al día haciendo tareas repetitivas y preferí escribir código para no volver a tocarlas.\n\nDurante meses pensé que la solución era contratar más ayuda o probar otra herramienta SaaS. La realidad es que casi toda la fricción operativa se resuelve con buena arquitectura y procesos claros.\n\nConstruir software se trata de eso: de resolver tus propios cuellos de botella primero.\n\n¿Vos qué tarea repetitiva estás cansado de hacer a mano esta semana?',
    cta: 'Te leo en los comentarios.'
  },
  {
    vertical: 'Emprendedores Tech',
    pillar: 'Lecciones de Arquitectura y Producto',
    hook: 'El mayor error técnico que cometí fue intentar automatizar un proceso que ni siquiera estaba ordenado en papel.',
    coreThesis: 'Automatizar el caos no produce eficiencia; solo produce caos más rápido y más caro.',
    slides: [
      { title: 'La Trampa del Entusiasmo', body: 'Querer meterle código a todo antes de entender la fricción paso a paso.', badge: 'LA TRAMPA', metric: 'Error #1' },
      { title: 'El Caos Acelerado', body: 'Si tu proceso es desordenado, el software solo va a cometer errores a la velocidad de la luz.', badge: 'REALIDAD', metric: 'Falsa velocidad' },
      { title: 'El Paso Previo', body: 'Primero lo ordenás en una libreta o en Notion. Cuando funciona a mano, recién ahí lo programas.', badge: 'EL MÉTODO', metric: 'Papel primero' },
      { title: 'La Estabilidad', body: 'Sistemas que no se caen un domingo a la medianoche porque nacieron simples.', badge: 'RESULTADO', metric: 'Cero fricción' },
      { title: 'Conclusión', body: 'Menos scripts complicados, más claridad de fundamentos.', badge: 'LECCIÓN', metric: 'Simple > Complejo' }
    ],
    caption: 'El mayor error técnico que cometí fue intentar automatizar un proceso que ni siquiera estaba ordenado en papel.\n\nNos encanta la complejidad porque nos hace sentir productivos. Pero la verdad es que si un flujo no es claro en una servilleta, ninguna línea de código lo va a salvar.\n\nPrimero ordená el proceso. Después automatizá lo que sobra.\n\n¿Te ha pasado alguna vez?',
    cta: 'Dejame tu opinión abajo.'
  }
];

export function getScheduledTopic(index = 0) {
  return TOPICS[index % TOPICS.length];
}
