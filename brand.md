# 📐 Brand Guidance & Strategic Brief (`brand.md`)

Este documento es el **núcleo semántico y estratégico** de The Insightful Arrow. Define la personalidad, el tono verbal, los límites conceptuales y la dirección de arte visual para la producción de carruseles de alta gama.

---

## 🏛️ 1. ¿Qué es The Insightful Arrow y qué estamos logrando?
* **Identidad:** The Insightful Arrow (TIA) es una firma boutique de **ingeniería operativa B2B y arquitectura de sistemas agénticos**.
* **Tesis Central:** El crecimiento de un negocio no se resuelve contratando más personas para tapar procesos manuales rotos; se resuelve con **arquitectura determinista, eliminación de fricción y arbitraje de capital**.
* **Objetivo de los Carruseles:** Posicionar a TIA como el referente de máxima autoridad técnica en LinkedIn, demostrando a fundadores y directores de operaciones (COOs) que la nómina operativa repetitiva es una fuga permanente de capital que debe reemplazarse por infraestructura de software.
* **Audiencia Objetivo:** Founders, COOs, Partners de agencias y Directores Generales de empresas de servicios profesionales B2B. Líderes experimentados, analíticos y alérgicos a la retórica vacía.

---

## 🎙️ 2. Lenguaje de Marca e Identidad Verbal (The Voice)

### 2.1. Tono y Personalidad
* **Clínico y Quirúrgico:** Frío, analítico y descriptivo. Diagnosticamos problemas reales de oficina sin dramatizar ni exagerar.
* **De Fundador a Fundador / COO a COO:** Hablamos de igual a igual, con sobriedad y madurez ejecutiva. Cero tono de "mentor", cero actitud de "coach".
* **Financieramente Preciso:** Hablamos de pasivos laborales, curvas de aprendizaje, costo de oportunidad, margen operativo y amortización de infraestructura.

### 2.2. Palabras de Poder (Lexicón Canónico)
Usa consistentemente términos como:
> *Arbitraje de capital, fricción operativa, arquitectura determinista, cluster agéntico, compuertas de validación, triage manual, pasivo laboral, costo invisible, gobernanza de sistemas, deuda técnica operativa.*

### 2.3. Líneas Rojas Verbales (Lo que NUNCA se usa)
* ❌ **Cero Hype de IA:** Prohibido usar *"revolución de la IA"*, *"la magia de los agentes"*, *"el futuro ya llegó"*, *"fórmulas milagrosas"*.
* ❌ **Cero Clichés de Marketing Digital:** Prohibido decir *"el embudo roto"*, *"desbloquea tu verdadero potencial"*, *"escala a 7 cifras"*, *"hackea tus ventas"*.
* ❌ **Cero Cifras Inventadas de Infocomercial:** Nada de *"pierdes $7,450 al mes"*; se usan métricas de tiempo y estructura (ej. *"60% del día en tareas mecánicas"*, *"90 días de curva de inducción"*).

---

## 🎨 3. Dirección de Arte Visual & Generación de Imágenes (The Art)

### 3.1. Filosofía Estética: *Lujo Brutalista Editorial*
* **Sujeto Canónico:** Esculturas clásicas grecorromanas en **mármol de Carrara mate**, con microtextura mineral auténtica, combinadas con acentos geométricos o líneas de **oro líquido pulido** (*Kintsugi* de ingeniería).
* **Atmósfera:** La escultura emerge de una oscuridad absoluta de **obsidiana pura (`#000000`)**.
* **Composición 60/40:** El sujeto debe estar anclado en el **40% inferior** de la lámina; el **60% superior debe ser un vacío oscuro y limpio** para alojar la tipografía desnuda.

### 3.2. Protocolo de Inyección Multimodal
Al llamar a la API de generación de imágenes (Nano Banana Pro, Midjourney, DALL-E, Gemini):
1. **Inyección obligatoria:** Adjuntar **TODOS** los archivos de la carpeta `moodboards/` como imágenes de referencia (*style / composition reference*).
2. **Fórmula Canónica de Prompt:**
   ```
   [Moodboard References] + 
   [Scene: Classical Greek Carrara marble sculpture emerging from pure obsidian darkness] + 
   [Accent: Subtle liquid gold veins and laser precision line] + 
   [Composition: Subject anchored in lower 40%, leaving top 60% as pure black negative space for typography] + 
   [Lighting: Single directional chiaroscuro key light, soft natural marble grain, tactile matte stone finish] + 
   [Quality: 8k photographic plate, zero 3D plastic render, zero digital illustration artifacts, uncropped, clean]
   ```

### 3.3. Líneas Rojas Visuales (Anti-Patterns)
* ❌ **Cero AI-Bro / Stock:** Nada de hombres en traje mirando pantallas ni oficinas modernas con cristales.
* ❌ **Cero Neón Barato:** Cero luces moradas o estéticas cyberpunk cliché.
* ❌ **Cero Cajas UI en el HTML:** La tipografía va flotando desnuda sobre el fondo. Cero tarjetas semitransparentes, cero `backdrop-filter: blur`, cero bordes gruesos.

---

## ⚙️ 4. El Puente Operativo del Motor (The Engine Bridge)

Para producir un carrusel, el flujo opera de forma estricta:

```
                  ┌──────────────┐
                  │   brand.md   │  (Cerebro Semántico: Tesis, Voz, Prompts)
                  └──────┬───────┘
                         │
           ┌─────────────┴─────────────┐
           ▼                           ▼
┌────────────────────┐       ┌───────────────────┐
│ design_tokens.json │       │   /moodboards/    │
│ (Variables CSS)    │       │ (ADN Visual API)  │
└──────────┬─────────┘       └─────────┬─────────┘
           │                           │
           └─────────────┬─────────────┘
                         ▼
             ┌───────────────────────┐
             │ config/carousels/*.json│  (Estructura y Textos del Guion)
             └───────────┬───────────┘
                         ▼
             ┌───────────────────────┐
             │  scripts/compiler.cjs │  (Compilador Chromium + Tokens)
             └───────────┬───────────┘
                         ▼
             ┌───────────────────────┐
             │   dist/carousels/     │  (PDF + PNGs Finales)
             └───────────────────────┘
```
