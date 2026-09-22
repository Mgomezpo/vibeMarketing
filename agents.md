# 🤖 TIA Carousel Agent Protocol (Productizable Edition)

This document is the **Operational Blueprint** for the Carousel Engine. It is designed to be agnostic and productizable, allowing the system to be deployed for any brand by simply swapping the design tokens and moodboard.

## 🎯 1. The Mission
Transform a business thesis into a high-end, editorial carousel. The agent must act as a production bridge between a strategic thesis and a final render, ensuring absolute consistency with the provided brand identity.

---

## 🛠️ 2. The Execution Pipeline (Step-by-Step)

The agent must follow this sequence without asking for stylistic or aesthetic confirmation.

### Step 1: Strategic Copywriting (The Script)
- **Input:** Topic/Thesis + Brand Tone (defined in knowledge base).
- **Action:** Create a 5-slide structure.
- **Constraint:** Zero marketing fluff. Use a professional, sober, and clinical tone.
- **Output:** Populate `config/carousels/[id].json`.

### Step 2: Multimodal Visual Generation (The Art)
- **Input:** The JSON slides + `moodboards/` folder + `design_tokens.json`.
- **Action:** Call the Image API for each slide.
- **Injection Rule:** Inject **ALL** assets found in the `/moodboards` folder as reference images.
- **Prompt Formula:** `[Moodboard Refs] + [Scene Description] + [Composition: Subject Position as per design_tokens] + [Material/Style Tokens]`.
- **Resilience:** The system uses a fallback chain (Primary $\rightarrow$ Fallback 1 $\rightarrow$ Fallback 2) to ensure delivery regardless of API limits.
- **Output:** Save images to `assets/carousels/[id]/`.

### Step 3: System Compilation (The Render)
- **Action:** Execute `node scripts/compiler.cjs`.
- **Logic:** The compiler injects `design_tokens.json` into the CSS variables of the template.
- **Output:** PDF and PNGs in `dist/carousels/[id]/`.

### Step 4: State Update (The Memory)
- **Action:** Update `HANDOFF.md`.
- **Log:** Mark completion, note specific iterations, and update the current status.

---

## 🎨 3. Design Implementation (Agnostic)
The agent does not "decide" the style; it **implements** the configuration:

1. **Colors & Fonts:** Always pull from `design_tokens.json`.
2. **Visual Vibe:** Derived entirely from the images in the `/moodboards` folder.
3. **Layout:** "Naked Typography". No containers, no blurs, no borders. Text floats on the background.
4. **Composition:** Follow the `composition` rules in `design_tokens.json` (e.g., subject anchor and void percentage).

---

## 🚫 4. Absolute Red Lines
- **NO** asking "What style/colors do you prefer?". (Use the tokens and moodboard).
- **NO** adding UI elements (cards, boxes, shadows) to the HTML.
- **NO** using generic AI-generated text/descriptions inside the images.
- **NO** skipping the reference injection in API calls.

---

## ✅ 5. Definition of Done
A task is "Done" only when:
1. JSON is saved in `config/`.
2. Images are saved in `assets/`.
3. PDF is generated in `dist/`.
4. `HANDOFF.md` is updated.
