# 🤖 TIA Carousel Agent Protocol (The Operational Blueprint)

This document is the **sole instructional source of truth** for any AI agent producing carousels for The Insightful Arrow. When the user says "I need a carousel for [Topic]", the agent must execute this blueprint without asking for aesthetic preferences or layout guidance.

## 🎯 1. The Mission
Transform a raw business thesis into a high-end, luxury editorial carousel. The goal is **"Clinical Precision"**: no marketing fluff, no "AI slop", and absolute visual consistency.

---

## 🛠️ 2. The Execution Pipeline (Step-by-Step)

The agent must follow this exact sequence. **Do not skip steps. Do not ask for stylistic confirmation.**

### Step 1: Strategic Copywriting (The Script)
- **Input:** The topic/thesis provided by the user.
- **Tono:** "Founder-to-Founder" / "COO-to-COO". Cold, clinical, sober, direct.
- **Action:** Create a 5-slide structure.
- **Constraint:** Zero "reche" (no "unlock your potential", no "magic formulas"). Use operational reality (costs, friction, architecture).
- **Output:** Populate `config/carousels/[id].json`.

### Step 2: Multimodal Visual Generation (The Art)
- **Input:** The JSON slides + `/moodboards/` folder.
- **Action:** Call the Image API for each slide.
- **Injection Rule:** **Mandatory** injection of ALL assets in `/moodboards/` as reference images.
- **Prompt Formula:** `[Moodboard Refs] + [Scene Description] + [Composition: Subject Bottom 40% / Obsidian Void Top 60%] + [Materials: Carrara Marble / Liquid Gold]`.
- **Output:** Save images to `assets/carousels/[id]/`.

### Step 3: System Compilation (The Render)
- **Action:** Execute `node scripts/compiler.cjs`.
- **Validation:** Ensure the script reads the JSON and uses the generated images.
- **Output:** PDF and PNGs in `dist/carousels/[id]/`.

### Step 4: State Update (The Memory)
- **Action:** Update `HANDOFF.md`.
- **Log:** Mark the project as completed, note any specific design tweaks made, and update the "Current Status" checklist.

---

## 🎨 3. The "No-Ask" Design Contract
The agent already knows the style. **Do not ask the user about these; simply apply them:**

- **Visuals:** Brutalist Luxury. Marble and Gold emerging from an obsidian void (`#000000`).
- **Typography:** 
  - `Fraunces` (Italic Serif) for impact.
  - `Space Grotesk` (Bold Sans) for statements.
  - `Space Mono` for technical data.
  - `Inter` for body text.
- **Layout:** "Naked Typography". **Zero containers, zero blurs, zero borders.** Text floats directly on the black void.
- **Composition:** Background-First. The top 60% of the canvas must be empty to accommodate the text.

---

## 🚫 4. Absolute Red Lines (Anti-Patterns)
- **NO** asking "What style do you want?". (The style is defined here).
- **NO** asking "What colors should I use?". (Tokens: `#000000`, `#FFFFFF`, `#F0B429`).
- **NO** adding "marketing-speak" to the copy.
- **NO** using boxes, grids, or semi-transparent backgrounds in the HTML.

---

## ✅ 5. Definition of Done
A task is only "Done" when:
1. The JSON is saved in `config/`.
2. The Images are saved in `assets/`.
3. The PDF is generated in `dist/`.
4. The `HANDOFF.md` is updated.
