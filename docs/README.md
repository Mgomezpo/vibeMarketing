# The Insightful Arrow — Sistema de Carruseles B2B (Documentación Maestra)

Este repositorio contiene la arquitectura completa, la dirección de arte, los pilares de redacción y la base técnica para generar carruseles editoriales de alto impacto para **The Insightful Arrow (TIA)**, basados en el flujo de **Grow with Alex ([Video: `uhbeDrdmCoI`](https://www.youtube.com/watch?v=uhbeDrdmCoI))**, **Chase H ([Video: `7taGazHQkMg`](https://www.youtube.com/watch?v=7taGazHQkMg))** y la dirección de arte clásica brutalista de **Helder ([@ohneis652](https://www.instagram.com/ohneis652/))**.

---

## 🗂️ Índice de Documentación del Sistema

Para consultar o continuar con el desarrollo en cualquier sesión, consulta los siguientes módulos:

| Archivo | Contenido y Propósito |
| :--- | :--- |
| [**`01-references-and-analysis.md`**](./01-references-and-analysis.md) | **Referencias, Transcripciones y Análisis:** Deconstrucción técnica de Alex (3 colores, 2 fuentes, base images), Chase H (el mito del híbrido y la trampa del HTML puro) y Helder (mármol Carrara, kintsugi, claroscuro). |
| [**`02-brand-and-art-direction.md`**](./02-brand-and-art-direction.md) | **Dirección de Arte e Identidad Visual:** Sujeto clásico en mármol de Carrara y oro líquido, paleta cromática estricta de 3 colores (`#000000`, `#FFFFFF`/`#E8E0D0`, `#F0B429`), tipografía de revista (*Vogue* / Grow with Alex) y principio de **tipografía desnuda sobre el vacío de obsidiana** (cero tarjetas, cajas o bordes). |
| [**`03-hybrid-workflow-and-engine.md`**](./03-hybrid-workflow-and-engine.md) | **Arquitectura del Sistema Híbrido:** Principio de fondos nativos (background-first composition: sujeto anclado en tercio inferior/lateral y 60% de vacío superior) y tipografía vectorial limpia sin contenedores web. |
| [**`04-copywriting-pillars-and-pilar-d.md`**](./04-copywriting-pillars-and-pilar-d.md) | **Pilares de Contenido y Guion Aprobado:** Directrices de redacción ("cero reche"), los 4 pilares estratégicos, guion completo slide por slide de **Pilar D** y texto de publicación (*caption*). |
| [**`05-nanobanana-prompt-library.md`**](./05-nanobanana-prompt-library.md) | **Biblioteca de Prompts para Nano Banana Pro:** Secuencia narrativa continua (Estatua heroica -> Macro manos atadas -> Bustos kintsugi -> Compuertas láser -> Flecha liberada) con anclaje espacial específico para fondos. |
| [**`06-next-session-handover.md`**](./06-next-session-handover.md) | **Guía de Traspaso y Checklist Activo:** Estado del proyecto tras la purga de activos y checklist paso a paso. |

---

## ⚠️ Reglas Inviolables del Sistema

1. **Continuidad Narrativa (No repetir siempre el arquero):** Las 5 láminas no son imágenes desconectadas ni la misma pose estática repetida. Cuentan una historia visual coherente que evoluciona desde la tensión del trabajo manual hasta la arquitectura de validación y la liberación operativa.
2. **Fondos Diseñados con Espacio Negativo:** La IA genera escenas específicamente compuestas como *fondos* (sujeto en tercio inferior 35-40% o lateral, con 60% de negro absoluto `#000000` en la parte superior).
3. **Tipografía Desnuda en el Vacío:** Queda terminantemente prohibido colocar `.split-card`, `.compare-box`, `.grid-overlay`, fondos grises translúcidos o `backdrop-filter: blur()`. La tipografía de revista descansa directamente sobre el fondo oscuro.

---

## 🚀 Estado de la Infraestructura

* **Ruta del motor:** `c:\Users\mgome\OneDrive\Documents\The Insightful Arrow\carousel-engine`
* **Plantilla de maquetación:** `templates/deck.html`
* **Compilador automatizado:** `scripts/compiler.cjs` (Playwright / Chromium)
* **Formatos de exportación:**
  - PNGs individuales (1080×1350) en `dist/slides/`
  - PDF multipágina para LinkedIn en `dist/carrusel-linkedin.pdf`
