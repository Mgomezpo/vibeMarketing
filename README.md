# vibeMarketing Multi-Brand OS

Sistema unificado de marketing y adquisición de contenidos automatizados para **The Insightful Arrow**, **IREAL** y **Miguel Gómez (Marca Personal)**.

---

## 🏛️ Arquitectura del Sistema

```
vibeMarketing/
├── core/                           # MOTOR COMPARTIDO (100% Reutilizable)
│   ├── config.mjs                  # Variables, rutas y credenciales
│   ├── linter/
│   │   ├── deterministic.mjs       # Blacklist de clichés, humo y jerga
│   │   └── semantic-judge.mjs      # LLM-as-a-Judge parametrizable por marca
│   ├── renderer/
│   │   └── playwright.mjs          # Factoría Chromium 1080x1350 (PDF + PNG)
│   ├── publisher/
│   │   └── zernio.mjs              # Subida a CDN y publicación vía Zernio
│   ├── memory/
│   │   └── vector-memory.mjs       # Deduplicación semántica a 90 días
│   └── repurposer/
│       └── cross-pollinate.mjs     # Adaptador: 1 hecho -> 3 contenidos
│
└── brands/                         # CARPETAS DE MARCA INDEPENDIENTES
    ├── tia/                        # The Insightful Arrow (100% Autónomo)
    ├── ireal/                      # IREAL App (100% Autónomo)
    └── miguel/                     # Miguel Gómez (Modo Copiloto / Revisión Humana)
```

---

## 🛡️ Niveles de Gobernanza

| Marca | Enfoque | Estética Visual | Modo de Operación |
| :--- | :--- | :--- | :--- |
| **TIA** | B2B Alto Ticket ($5,000/mes) | Suiza: Obsidiana `#090D14` + Bronce `#BFA175` | **100% Autónomo** (Zero-HITL) hacia `@insightful_arrow` y LinkedIn. |
| **IREAL** | Creadores / "De la idea al calendario" | Cuaderno analógico: Crimson `#9F1522` + Ink `#0B0B0B` + Grano | **100% Autónomo** (Zero-HITL) hacia canales de IREAL. |
| **MIGUEL** | Build in public / Lecciones de fundador | Minimalista tech oscuro `#0D1117` + Cyan `#38BDF8` | **Modo Copiloto**: NUNCA publica solo. Genera borradores para tu aprobación. |

---

## 🚀 Comandos Rápidos

```bash
# Ver estado del sistema y cuentas conectadas en Zernio
npm run status

# Probar la calidad visual y linters de las 3 marcas a la vez
npm run test:all

# Generar y enviar borrador a Zernio para una marca
npm run tia:draft
npm run ireal:draft
npm run miguel:draft

# Publicar en vivo (Autónomo para TIA e IREAL; Miguel siempre queda en borrador)
npm run tia:live
npm run ireal:live

# Repurposing: Convertir un hecho real en 3 piezas adaptadas
npm run repurpose -- --event "Ayer automatizamos la subida de carruseles a redes en 8 segundos"
```
