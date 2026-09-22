# 05. Biblioteca de Prompts Canónicos (Nano Banana Pro)

Este documento contiene la librería de prompts estandarizados para generar los fondos cinemáticos del carrusel en **Nano Banana Pro**, garantizando la continuidad narrativa y la composición orientada a fondos.

---

## 1. Parámetros Técnicos Globales

* **Motor:** Nano Banana Pro (Imagen 3 / Gemini Image Generation Engine).
* **Relación de Aspecto:** `3:4` vertical (o `4:5` / 1080×1350 píxeles).
* **Fondo:** `#000000` vacío de obsidiana puro (*pure pitch-black void*).
* **Iluminación:** Claroscuro dramático (*chiaroscuro*), luz de recorte dorada cálida (*golden rim light*), microtextura de mármol de Carrara auténtico.
* **Composición de Fondo Obligatoria:** En todas las generaciones, el sujeto debe estar anclado en el **tercio inferior (35-40%) o lateral derecho**, garantizando que el **55% a 65% superior del lienzo sea negro absoluto puro (#000000)** para la tipografía editorial.

### Prompt Negativo Canónico (Lo que NUNCA debe aparecer):
```text
modern suit, business suit, tie, corporate office, glass skyscraper, laptop, smartphone, plastic 3D render, cartoon, anime, saturated neon purple, neon blue, cyberpunk gradients, crypto-bro, distorted anatomy, extra fingers, text, letters, watermarks, UI boxes, borders.
```

---

## 2. Prompts de la Secuencia Narrativa Continua (Pilar D)

### Lámina 01 — Portada (Hero Cover: El Gancho)
* **Archivo de salida:** `carousel-engine/assets/slide_01_hero_bg.jpg`
* **Narrativa:** Presentación del héroe clásico (Apolo/Sagitario) en mármol de Carrara con arco de oro macizo.
* **Composición de Fondo:** Anclado en el tercio inferior derecho, mirando hacia arriba. El tercio superior e izquierdo (60% del lienzo) es un vacío negro de obsidiana puro (#000000).
```text
A cinematic editorial background, 3:4 vertical aspect ratio. An ancient Greek Carrara marble statue of an archer hero (Apollo / Sagittarius) holding a glowing solid gold bow, anchored strictly in the lower-right third of the frame. The upper 60% and entire left side of the frame is a pure, spotless pitch-black obsidian void (#000000) with natural volumetric shadow, specifically composed as a clean editorial carousel background. Dramatic chiaroscuro lighting, soft warm golden rim light defining the sculpted marble silhouette and draped fabric, realistic fine stone texture with subtle mineral veins, high art direction, brutalist luxury editorial mood, zero background clutter, no smoke, no text.
```

---

### Lámina 02 — El Síntoma (Macro Manos: Triage Manual)
* **Archivo de salida:** `carousel-engine/assets/slide_02_hands_bg.jpg`
* **Narrativa:** Zoom a las manos de la escultura, enredadas en cables negros y fragmentos de piedra rotos (la fricción del trabajo manual repetitivo).
* **Composición de Fondo:** Ancladas estrictamente en el tercio inferior (35% inferior de la imagen). El 65% superior es vacío negro absoluto (#000000).
```text
A cinematic macro editorial background shot, 3:4 vertical aspect ratio. Close-up on the classical Carrara marble hands of the Greek statue tangled with thin matte black cables and chipped marble stone fragments, anchored strictly in the bottom 35% of the frame. The entire upper 65% of the frame is an immaculate, pure pitch-black obsidian void (#000000) with deep natural shadow, composed specifically as clean negative space for two editorial text columns. Moody chiaroscuro rim lighting in warm tungsten and amber, highlighting the tactile texture of carved marble and stone dust. Brutalist art direction, fine film grain, zero background clutter, no text.
```

---

### Lámina 03 — El Arbitraje (Contraste de Bustos Kintsugi)
* **Archivo de salida:** `carousel-engine/assets/slide_03_contrast_bg.jpg`
* **Narrativa:** La encrucijada de capital. A la izquierda, busto erosionado y agrietado (nómina tradicional desgastada); a la derecha, busto de mármol blanco con costuras Kintsugi de oro líquido pulido (infraestructura agéntica).
* **Composición de Fondo:** Ambos bustos están anclados estrictamente en el 35% inferior del lienzo sobre pedestales oscuros que se desvanecen en negro. El 65% superior es negro absoluto puro (#000000).
```text
A cinematic split concept background, 3:4 vertical aspect ratio, pure pitch-black background (#000000). On the bottom-left, an ancient weathered stone bust, deeply cracked and burdened by erosion. On the bottom-right, an immaculate Carrara marble sculpture with precise, glowing liquid gold kintsugi seams. Both busts are anchored strictly in the lower 35% of the frame, emerging from darkness. The entire upper 65% of the canvas is completely empty, clean, pure pitch-black negative space (#000000) designed for large editorial typography. High contrast chiaroscuro spotlight, brutalist luxury editorial aesthetic, zero background noise, no text.
```

---

### Lámina 04 — La Transición (Compuertas de Oro y Columnas)
* **Archivo de salida:** `carousel-engine/assets/slide_04_gates_bg.jpg`
* **Narrativa:** La arquitectura de sistemas. Columnas clásicas de mármol estructuradas por compuertas geométricas de luz dorada láser (validación determinista).
* **Composición de Fondo:** Columnas y portal anclados en el 40% inferior del lienzo. El 60% superior es vacío negro puro (#000000).
```text
A cinematic architectural background, 3:4 vertical aspect ratio. Classical Greek Carrara marble columns and archway floating in the lower 40% of the frame against a pure pitch-black void (#000000), sliced horizontally by thin, laser-sharp glowing golden geometric lines. The entire upper 60% of the canvas is completely pristine obsidian darkness (#000000) providing ample clean negative space for an editorial three-step process layout. Atmospheric chiaroscuro lighting, luxury editorial contrast between timeless stone and sharp golden precision engineering, zero clutter, no text.
```

---

### Lámina 05 — Outcome & CTA (La Flecha Liberada)
* **Archivo de salida:** `carousel-engine/assets/slide_05_release_bg.jpg`
* **Narrativa:** La liberación del sistema. El arquero de mármol soltando la flecha dorada con estela luminosa hacia el futuro.
* **Composición de Fondo:** Escultura y arco posicionados en el cuadrante inferior derecho. El lateral izquierdo y zona superior (60% del lienzo) en negro puro (#000000).
```text
A dynamic cinematic editorial background, 3:4 vertical aspect ratio. Low-angle close view of the Carrara marble archer statue positioned in the lower-right quadrant, releasing a luminous solid gold arrow blazing forward into the void. A subtle streak of golden sparks trails the arrow. The upper area and entire left 60% of the frame is a deep, pure pitch-black obsidian void (#000000) specifically composed for large floating metric typography and call-to-action copy. Decisive heroic momentum, luxury brutalist lighting, 35mm film grain, zero background clutter, no text.
```
