# Checkpoint Runner — Visual Style Guide
*Reference document for generating graphics consistent with the game's aesthetic.*

---

## 1. Concept & Mood

**Checkpoint Runner** is a biology-themed board game about the cell cycle. The visual language sits at the intersection of:

- **Dark bioluminescence** — living systems glowing from within against near-black backgrounds
- **Arcane academia** — classical serif typography, gold ornamentation, parchment card faces
- **Sci-fi microscopy** — the feeling of looking at a cell under a UV fluorescence microscope
- **Board game grandeur** — ornate frames, corner flourishes, deliberate symmetry

The overall tone is **serious but inviting**: a laboratory notebook written in illuminated manuscript style. Nothing is flat or sterile. Everything glows slightly.

---

## 2. Color Palette

### Backgrounds
| Role | Hex | Usage |
|---|---|---|
| Deep background | `#0e0e1a` | Page/screen background |
| Deeper black | `#080812` | Gradient terminus, darkest shadows |
| Surface | `#13132a` | Card/panel backgrounds |
| Surface raised | `#1e1e3a` | Slightly elevated surfaces |
| Title canvas | `#0d0618` | Animated particle background (slightly more purple) |

### Accent Colors
| Name | Hex | Used for |
|---|---|---|
| Gold (primary) | `#ffd166` | UI chrome, dividers, frame accents, active states |
| Gold light | `#ffe599` | Logo text, headings, highlights |
| Gold dark | `#b8860b` | Borders, gradient base, shadows |
| Green | `#06d6a0` | Green trivia deck, regular board spaces, correct answers, tRNA tokens |
| Green dim | `#04a07a` | Green borders, node strokes |
| Green bg | `#001a12` | Green-tinted dark fill |
| Violet | `#c77dff` | Violet trivia deck, G0 (Resting) start space |
| Violet light | `#e0aaff` | Violet text on dark backgrounds |
| Violet dim | `#7b2fbe` | Violet borders |
| Violet bg | `#1a0030` | Violet-tinted dark fill |
| Cyan | `#00d4ff` | Event deck (blue), event board spaces, checkpoint type labels |
| Pink | `#ff6b9d` | Decorative particles, gradient accents |
| Orange | `#ff9f1c` | Checkpoint barrier icons |
| Gold/Finish | `#ffd166` | Cytokinesis (finish) space |
| Red (checkpoint) | `#ff3355` / `#ff0066` | Checkpoint board spaces (G1, G2, M) |
| Crimson | `#ff4466` | Error states |
| Text primary | `#f0f0ff` | Body copy (slight cool-white) |
| Text dim | `#8888aa` | Secondary labels, muted UI |

### DNA Base-Pair Colors (for molecular graphics)
| Base | Fill | Dark stroke |
|---|---|---|
| Adenine (A) | `#ff7070` | `#cc0000` |
| Thymine (T) | `#70b8ff` | `#0044cc` |
| Guanine (G) | `#70dd70` | `#007700` |
| Cytosine (C) | `#ffd060` | `#aa7700` |

### Parchment (question card faces)
| Role | Value |
|---|---|
| Background | `linear-gradient(160deg, #f5e6c8, #edd8a8)` |
| Text | `#1a0e00` |
| Border | `#b8860b` (gold-dark) |

---

## 3. Typography

| Font | Weight | Usage |
|---|---|---|
| **Cinzel Decorative** | 700 | Game logo/title only — maximum grandeur |
| **Cinzel** | 400, 600 | All UI labels, button text, section headings, card backs, space names, letter-spacing 0.1–0.3em |
| **EB Garamond** | 400 italic/regular | Question body text, answer options, narrative copy — warm and readable on parchment |

**Rules:**
- Logo: Cinzel Decorative, gold-light (`#ffe599`), wide glow `text-shadow: 0 0 40px rgba(201,162,39,0.45)`
- UI labels: Cinzel, ALL CAPS, letter-spacing 0.15–0.3em
- Question text: EB Garamond, set on the warm parchment background
- Card backs: Cinzel, small (deck sprites use ~2.4 SVG units), widely letter-spaced, matching deck color, opacity 0.85

---

## 4. Glow & Lighting System

All colored elements glow. Glows are **radially soft** and color-matched — no hard halos.

| Type | CSS / SVG |
|---|---|
| Standard teal glow | `feGaussianBlur stdDeviation="1.6"` merged with source |
| Gold glow | `feGaussianBlur stdDeviation="2.4"` — slightly wider, more diffuse |
| Pink glow | same as teal, pink fill |
| Purple glow | same as teal, purple fill |
| Text/icon drop-shadow | `filter: drop-shadow(0 0 2–4px <color>)` |
| Board node active halo | Pulsing SVG circle, stroke=player color, radius 8→16px, opacity 0.9→0, 1.6s infinite |
| Popup backdrop | `background: rgba(4,2,14,0.78)`, `backdrop-filter: blur(3px)` |

**Key rule:** Glows should feel like biological luminescence — soft, internal, not neon signage. The glow color always matches the element color exactly.

---

## 5. Frames & Borders

The game uses a single consistent **"arcane frame"** motif everywhere (panels, cards, the board surround):

- **Border:** 2px solid `#b8860b` (gold-dark), border-radius 4px
- **Background:** `linear-gradient(160deg, #13132a 0%, #080812 100%)`
- **Drop shadow:** `0 4px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(201,162,39,0.15)`
- **Corner flourishes:** Four L-shaped 2px gold brackets (`#ffd166`, opacity 0.7) at each corner, 16×16px, inset 5px — like a manuscript border

Dividers between sections are **gold fade rules**: gradient from transparent → `#b8860b` → transparent, with a small centered label in `#ffd166`.

---

## 6. Board Space Node Colors

The game board is an elliptical track viewed at ~60° from above (pseudo-3D). Each space type has a signature color:

| Space type | Color | Icon file |
|---|---|---|
| G0 — Resting (start) | Purple `#c77dff` | `icon_1_purple_arrow.png` — purple arrow |
| Regular phase spaces | Teal `#06d6a0` | `icon_2_green_dna.png` — green DNA helix |
| Cell Event spaces | Cyan `#00d4ff` | `icon_3_blue_lightning.png` — blue lightning bolt |
| Checkpoint spaces (G1, G2, M) | Hot pink/red `#ff3355` | `icon_4_orange_barrier.png` — orange barrier |
| Cytokinesis (finish) | Gold `#ffd166` | `icon_5_gold_circles.png` — gold concentric circles |

Nodes use depth-scaling: spaces at the top of the ellipse (far) render at 0.85× size; spaces at the bottom (near) at 1.15×, creating perspective.

---

## 7. Card Deck Design

Three decks sit in the center of the board. Each deck is a stack of cards with the same back design in different accent colors:

| Deck | Accent color | Icon |
|---|---|---|
| Green trivia | `#06d6a0` | `?` |
| Violet trivia | `#c77dff` | `?` |
| Blue events | `#00d4ff` | `⚡` |

**Card back layout (top → bottom):**
1. "CHECKPOINT" — small Cinzel, widely letter-spaced, 0.85 opacity
2. Central icon (`?` or `⚡`) — large, bold, color-matched drop shadow glow
3. "RUNNER" — same as header

**Card face materials:** Dark fill `rgba(5,5,18,0.92)`, colored border (0.9px), outer drop-shadow glow in matching color.

**Question card face:** Warm parchment (`#f5e6c8→#edd8a8`), EB Garamond body text, gold border.

---

## 8. Player Tokens

Six token types, each representing a cell biology molecule. Tokens are rendered as small SVG illustrations in a ~10×10 unit space, with a **circular colored disc** behind them for identification. When active (current turn), the token's disc inverts (white background, colored icon) and a soft pulse ring radiates outward.

| Token | Biology reference |
|---|---|
| tRNA | Transfer RNA — clover-leaf shape |
| Ribosome | Two subunit spheres |
| Mitochondria | Bean shape with inner cristae lines |
| Helix | DNA double helix |
| Polymerase | Enzyme gripping a DNA strand (two lobe "hand" shape) |
| Chloroplast | Oval with stacked thylakoid discs |

Token colors are player-chosen from: Teal, Violet, Cyan, Pink, Orange, Lemon, White — all bright, high-saturation hues that stand out against the dark board.

---

## 9. Ambient Particle System

Both the title screen and the game background use a **floating particle field**:

- 60 soft circles, radius 1–3.5px
- Very slow drift (velocity ±0.3px/frame), wrapping at edges
- Hues drawn from: `120` (green), `200` (cyan), `280` (violet), `60` (gold), `320` (pink)
- Saturation 70%, lightness 65%, alpha 0.2–0.6
- Title screen: particles on opaque `#0d0618` fill
- Game board background: particles on transparent canvas layered over the dark surface

The effect suggests a cytoplasm — small organelles suspended in fluid, slowly drifting.

---

## 10. Event Cards

Event cards come in two polarities:

| Type | Background | Border | Glow |
|---|---|---|---|
| Positive | `linear-gradient(160deg, #001a08, #000f04)` | `#06d6a0` (green) | `rgba(0,200,80,0.25)` |
| Negative | `linear-gradient(160deg, #1a0000, #0f0000)` | `#ff4466` (red) | `rgba(200,0,0,0.25)` |

Cards fly in from the right with a rotateY spin (`cardFlyIn`: translateX(120%) + rotateY(-90deg) → 0).

---

## 11. Generation Prompts & Keywords

When prompting an image model for assets consistent with this game, use combinations of:

**Style keywords:**
`bioluminescent`, `dark sci-fi`, `fluorescence microscopy aesthetic`, `illuminated manuscript`, `arcane academia`, `deep space biology`, `glowing neon on near-black`, `cell biology`, `mitosis`, `softly glowing`, `inner light source`

**Background:** `deep navy-black #0e0e1a`, `near-black with subtle purple undertone`, `#080812`

**Glow type:** `soft radial bloom`, `color-matched inner glow`, `no hard edges`, `diffuse luminescence`

**Do not use:** harsh neon outlines, flat colors, white or light backgrounds, cartoon style, heavy black outlines, primary-color schemes

**Iconography vocabulary:** DNA helices, cell membranes, mitochondria, ribosomes, chromosomes, spindle fibers, centrosomes, tRNA molecules, cell cycle checkpoints, fluorescent microscopy slides

---

## 12. Quick Reference Card

```
BACKGROUNDS    #0e0e1a  #080812  #13132a  #1e1e3a
GOLD           #ffd166  #ffe599  #b8860b
GREEN          #06d6a0  #04a07a  #001a12
VIOLET         #c77dff  #e0aaff  #7b2fbe  #1a0030
CYAN/EVENTS    #00d4ff
PINK           #ff6b9d
CHECKPOINT     #ff3355  #ff0066
PARCHMENT      #f5e6c8  #edd8a8  #1a0e00

FONTS          Cinzel Decorative (logo)
               Cinzel (UI, labels, caps)
               EB Garamond (body, questions)

FEEL           Dark. Biological. Glowing from within.
               Classical typography on deep-space backgrounds.
               Science as ritual.
```
