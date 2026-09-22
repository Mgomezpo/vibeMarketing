# 03. Flujo de Trabajo Híbrido y Motor de Compilación (Engine Architecture)

Este documento detalla la arquitectura técnica definitiva del motor de carruseles de **The Insightful Arrow (TIA)** tras la purga y unificación con los modelos de Grow with Alex, Chase H y Helder.

---

## 1. La Tesis del Sistema Híbrido TIA

```mermaid
flowchart TD
    subgraph Fallos ["ENFOQUES TRADICIONALES DEFICIENTES"]
        F1["Puro HTML / Código<br>(Sin activos visuales IA)"] -->|Produce| E1["'AI Slop' plano, aburrido,<br>cajas grises y dashboards web"]
        F2["Pura Imagen IA<br>(Texto incrustado por IA)"] -->|Produce| E2["Textos con erratas tipográficas,<br>sin control de fuentes, sin PDF nativo"]
    end

    subgraph Solucion ["EL SISTEMA HÍBRIDO DEFINITIVO TIA"]
        A["Nano Banana Pro (IA de Imagen)"] -->|Genera fondos cinemáticos con espacio negativo (#000000)| C["Lienzo HTML Editorial"]
        B["Sistema Tipográfico Suizo"] -->|Inyecta tipografía vectorial desnuda y nítida| C
        C -->|Compilador Chromium (Playwright)| D["1. PNGs 4:5 (Instagram / Threads)<br>2. PDF Multipágina (LinkedIn)"]
    end
```

---

## 2. Los Dos Principios Fundamentales del Sistema

### Principio 1: Las Imágenes se Diseñan Como Fondos Nativos (Background-First Composition)
* En lugar de generar una imagen centrada que llena todo el lienzo y luego intentar taparla con cajas de código, **cada imagen generada por IA debe estar conscientemente compuesta como fondo de carrusel**.
* **Regla de encuadre:**
  - El sujeto escultórico (estatua, manos, bustos, templo) se ancla estrictamente en el **tercio inferior (35% a 40%) o lateral derecho** de la imagen.
  - El **55% a 65% superior** de la imagen debe ser un **vacío negro absoluto de obsidiana (`#000000`) puro**, sin texturas ruidosas ni elementos flotantes.
  - Esto garantiza que el texto respire con total legibilidad sin necesidad de veladuras, sombras artificiales ni cajas de código.

### Principio 2: Tipografía Desnuda en Código (Naked Typography)
* El código (HTML/CSS) tiene una única responsabilidad: **renderizar tipografía vectorial con calidad sub-píxel**.
* **Queda terminantemente prohibido:**
  - `.split-card`, `.compare-box`, `.pipeline-node`, `.metric-card`, `.cta-hero-box`, `.s1-subtitle-box`.
  - `backdrop-filter: blur()`, sombras de contenedor o bordes alrededor de los párrafos.
  - `.grid-overlay` o gradientes lineales simulando cuadrículas.
* La tipografía descansa **desnuda y directa** sobre el vacío negro de la imagen de fondo.

---

## 3. Pipeline de Producción Paso a Paso

```
[1. Copywriting Canónico (docs/04-copywriting-pillars-and-pilar-d.md)]
   - Guion auditado de fundador a fundador ("cero reche")
        │
        ▼
[2. Generación de Fondos con Nano Banana Pro (docs/05-nanobanana-prompt-library.md)]
   - Proporción 3:4 vertical
   - Composición con anclaje inferior y vacío superior en #000000
   - Guardado en carousel-engine/assets/
        │
        ▼
[3. Ensamblado Editorial en HTML/CSS (templates/deck.html)]
   - Imagen de fondo limpia (background-size: cover; background-position: center bottom)
   - Tipografía vectorial pura: Fraunces (serif itálica) + Space Grotesk (bold) + Inter + Space Mono
        │
        ▼
[4. Compilación Automatizada (scripts/compiler.cjs)]
   - Renderizado con Playwright a 1080×1350px
   - Exportación de 5 PNGs a dist/slides/
   - Exportación de PDF multipágina a dist/carrusel-linkedin.pdf
```
