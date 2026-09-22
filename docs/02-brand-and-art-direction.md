# 02. Dirección de Arte e Identidad Visual (Brand System)

Este documento establece las reglas canónicas de diseño visual y dirección de arte para **The Insightful Arrow (TIA)**, garantizando consistencia absoluta en todas las piezas de contenido.

---

## 1. El Personaje Central y la Filosofía Visual

### 1.1. El Sujeto Canónico
* **Sujeto:** Esculturas clásicas griegas en **mármol de Carrara** (bustos, templos, manos esculpidas y figuras heroicas como Apolo o Sagitario) combinadas con acentos de **oro líquido pulido** (*Kintsugi* y líneas láser de ingeniería).
* **Tratamiento del material:** Mármol real con vetas minerales sutiles, microtextura táctil, desgaste natural de la piedra, motas de polvo y acabado mate, nunca plástico ni apariencia de render 3D sintético.
* **Atmósfera:** La escultura emerge de una oscuridad absoluta de obsidiana (`#000000`).

### 1.2. Reglas Negativas (Lo que está ESTRICTAMENTE PROHIBIDO)
* ❌ **Cero Cajas de Código ni Tarjetas SaaS:** Queda terminantemente prohibido colocar `.split-card`, `.compare-box`, `.pipeline-node`, `.metric-card`, `.cta-hero-box`, `.s1-subtitle-box`, contenedores oscuros con bordes o `backdrop-filter: blur()`. La tipografía debe descansar **desnuda directamente sobre el fondo**.
* ❌ **Cero Grid Overlay:** Queda prohibido el uso de entramados de líneas CSS (`linear-gradient`) sobre el lienzo. El fondo debe ser cinematográfico y limpio.
* ❌ **Cero "AI-bro" / "Crypto-bro":** Cero hombres con traje moderno, corbata o en oficinas corporativas de vidrio mirando laptops.
* ❌ **Cero "Cyberpunk / Neón Cliché":** Nada de luces de neón moradas, hologramas flotantes o efectos de ciencia ficción de baja calidad.
* ❌ **Cero Overlays en Código:** El claroscuro y el espacio negativo para la tipografía deben generarse de forma 100% nativa con la IA en Nano Banana Pro.

---

## 2. Paleta Cromática Canónica (La Regla de los 3 Colores de Alex)

| Rol | Nombre | Hexadecimal | Uso en el Sistema |
| :--- | :--- | :--- | :--- |
| **Color de Fondo** | **Obsidian Void** | `#000000` | Fondo primario absoluto. Da el contraste cinematográfico y la profundidad. |
| **Color Primario (Texto)** | **Marble White / Cream** | `#FFFFFF` / `#E8E0D0` | Titulares principales (`#FFFFFF`) y cuerpos editoriales de lectura (`#E8E0D0`). |
| **Color de Acento** | **Liquid Gold** | `#F0B429` | Palabras clave en titulares, kintsugi, compuertas láser, indicadores y llamados a la acción (CTA). |
| *Metadata Muted* | *Stealth Gray* | `#666666` / `#888888` | Etiquetas de cabecera (`01 / 05`), pie técnico y separadores sutiles. |

---

## 3. Jerarquía Tipográfica (Swiss Brutalist + Luxury Editorial)

El sistema utiliza tres familias de Google Fonts con roles funcionales estrictos:

```
+-------------------------------------------------------------+
| 01 / 05  ·  ANÁLISIS OPERATIVO B2B    [Space Mono 12px]     |
|                                                             |
| CONTRATAR MÁS                         [Fraunces Serif 300i] |
| NO ARREGLA EL CAOS                    [Space Grotesk Bold]  |
|                                                             |
| El primer impulso al crecer suele ser [Inter 19px / 1.55]   |
| contratar asistentes o coordinadores...                     |
|                                                             |
| ARBITRAJE DE CAPITAL // TIA           [Space Mono 11px]     |
+-------------------------------------------------------------+
```

### 3.1. `Fraunces` (Display Serif Editorial)
* **Rol:** El impacto visual de revista de lujo (*Grow with Alex*, *Vogue*, *Kinfolk*).
* **Uso:** Primera línea de titulares (en cursiva itálica ligera, peso 300) y citas textuales.

### 3.2. `Space Grotesk` (Brutalist Geometric Sans)
* **Rol:** La contundencia y el peso conceptual.
* **Uso:** Segunda línea de titulares en mayúsculas (`uppercase`), métricas monumentales (`0 DÍAS`, `24/7`) y títulos de sección.
* **Pesos:** 700 (Bold) y 800 (Extrabold).

### 3.3. `Space Mono` (Engineering Monospace)
* **Rol:** Precisión técnica y telemetría de sistemas.
* **Uso:** Indicadores de paso (`01 / 05`), etiquetas de sección y pie de página. Tracking amplio (`letter-spacing: 0.2em`).

### 3.4. `Inter` (Editorial Body Sans)
* **Rol:** Lectura silenciosa, clara y fluida.
* **Uso:** Cuerpos de texto, descripciones y comparativas.

---

## 4. Retícula y Especificaciones Técnicas

* **Dimensiones del Lienzo:** 1080 × 1350 píxeles (Relación de aspecto 4:5 vertical).
* **Márgenes Exteriores:** `padding: 70px 60px`.
* **Disposición Tipográfica:** Texto desnudo alineado a la izquierda sobre el espacio negativo superior/lateral generado por la IA.
* **Formatos de Salida Obligatorios:**
  1. **5 archivos PNG individuales:** Para carruseles nativos en Instagram / Threads (`dist/slides/`).
  2. **1 archivo PDF multipágina:** Para documentos descargables y carruseles en LinkedIn (`dist/carrusel-linkedin.pdf`).
