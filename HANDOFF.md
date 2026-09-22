# 🚩 TIA Carousel Engine — Handoff & State Log

This file is the living memory of the carousel engine. It tracks the current operational state, active decisions, and the "delta" between the current version and the ideal state.

## 🎯 Current North Star
**"Lujo Brutalista Editorial"**. Transition from "SaaS-style web slides" to "High-end magazine layout". 
- **Zero Slop:** No blurs, no boxes, no borders.
- **Multimodal:** Moodboard-driven generation via API.
- **Naked Typography:** Vector text floating on pure obsidian voids.

---

## 🛠️ System Architecture (v2.0)
- **DNA:** `agents.md` (The only source of truth for rules).
- **Visual Anchor:** `moodboards/` (Referential images for API injection).
- **Knowledge:** `knowledge_base/` (Markdown-based context and research).
- **Engine:** `config/*.json` $\rightarrow$ `scripts/compiler.cjs` $\rightarrow$ `templates/deck.html` $\rightarrow$ `dist/`.

---

## 📈 Current Status & Progress
- [x] **Design Contract:** Defined and productized in `agents.md`.
- [x] **Slop Removal:** `deck.html` stripped of all UI "mulets" (boxes/blurs).
- [x] **Multimodal Pipeline:** API protocol established for moodboard injection.
- [x] **Structure:** Folders & Files architecture implemented (Knowledge Base separated from Execution).
- [x] **Dynamic Compiler:** `scripts/compiler.cjs` unified and clean; injects `design_tokens.json` dynamically into `templates/deck.html` CSS custom properties.
- [x] **Brand Guidance Layer:** Created `brand.md` containing brand brief, lexicon, banned words, and multimodal prompt formula.
- [x] **Nano Banana Pro Integration:** Created `scripts/generate-images.cjs` connecting to Gemini Image Engine (`nano-banana-pro-preview`) with multimodal moodboard injection, and added `--generate-images` one-shot flag to `scripts/compiler.cjs`.
- [x] **Sanitized Workspace:** Removed residual files with typo names and verified test carousel 04 compilation.

---

## 🚧 Active Blockers & Next Steps
- [ ] **Google AI Studio Billing:** Ensure `GEMINI_API_KEY` has pay-as-you-go quota enabled on Google AI Studio to unlock full concurrent image generation on `nano-banana-pro-preview`.

---

## 📝 Decision Log
- **Decision 2026-09-21:** Moved from "Description-based prompting" to "Reference-based multimodal prompting" to eliminate AI slop.
- **Decision 2026-09-21:** Removed all UI containers from HTML to achieve the "Naked Typography" look.
- **Decision 2026-09-21:** Reorganized documentation into `knowledge_base/` to prevent agent cognitive overload.
- **Decision 2026-09-22:** Replaced monolithic compiler with simple, unified `scripts/compiler.cjs` consuming `design_tokens.json` directly into `templates/deck.html`.
- **Decision 2026-09-22:** Created `brand.md` as the guidance layer for copy and prompts.
- **Decision 2026-09-22:** Integrated Nano Banana Pro via `scripts/generate-images.cjs` and `scripts/compiler.cjs --generate-images` for full autonomous agent execution.

---

## 💡 Agent Instructions for Next Session
1. **Symmetry Check:** Ensure every new slide follows the "60% Void / 40% Subject" rule.
2. **Tone Check:** Audit copy for "marketing fluff". If it sounds like a guru, delete it. Use "Founder-to-Founder" clinical tone.
3. **Reference Check:** Always inject ALL assets in `moodboards/` before calling the image API.
