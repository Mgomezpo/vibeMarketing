# 06. Guía de Traspaso y Checklist de Ejecución

Este documento resume el estado operativo actual de **The Insightful Arrow (TIA)** tras el relanzamiento del sistema de carruseles.

---

## 1. Estado Actual del Sistema

* **Purga ejecutada:** Activos obsoletos archivados en `carousel-engine/assets/_archive/`.
* **Directrices actualizadas:** Incorporadas las transcripciones y fórmulas de Grow with Alex (`uhbeDrdmCoI`), Chase H (`7taGazHQkMg`) y Helder (@ohneis652).
* **Regla Inviolable:** Fondos generados por IA con anclaje inferior (35-40%) y vacío negro puro (`#000000`) superior (60%). Tipografía vectorial suiza desnuda en HTML, **cero cajas de código, cero bordes y cero `.grid-overlay`**.

---

## 2. Checklist de Ejecución Activo

- [x] **Paso 1:** Purga de activos viejos y limpieza de `dist/slides/`.
- [x] **Paso 2:** Actualización canónica de los 5 documentos en `carousel-engine/docs/`.
- [ ] **Paso 3:** Generación de los 5 fondos cinemáticos con Nano Banana Pro (`generate_image`).
- [ ] **Paso 4:** Rediseño editorial puro de `templates/deck.html` (tipografía desnuda, cero tarjetas).
- [ ] **Paso 5:** Compilación con Playwright (`node scripts/compiler.cjs`).
- [ ] **Paso 6:** Validación visual de los 5 PNGs y el PDF.
