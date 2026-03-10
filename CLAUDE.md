# CLAUDE.md — Game-Development Repository Guide

## Project Overview

This repository contains a **Biology Education Game Suite**: three standalone HTML5 games designed to teach cell biology, genetics, and cell division concepts. Each game is a single, self-contained HTML file with embedded CSS and JavaScript — no build system, no package manager, no external dependencies beyond Google Fonts loaded via CDN.

---

## Repository Structure

```
Game-Development/
├── CLAUDE.md                                   # This file
├── README.md                                   # Minimal project title
├── Checkpoint_Runner_1.html                    # Cell cycle board game
├── mitosis_board_v14.html                      # Multiplayer mitosis board game
├── xenogen_v5 (1).html                         # Alien genetics simulation game
├── Board_black.png                             # Game board image asset
├── Board_black_16.png                          # Game board image asset (variant)
├── Board _black_road.png                       # Game board image asset (road variant)
└── ChatGPT Image Mar 9, 2026, 01_12_06 PM.png  # Reference concept image
```

---

## Games

### 1. `Checkpoint_Runner_1.html` — Checkpoint Runner
A board game where players race through the stages of the cell cycle (G0 → G1 → S → G2 → M → Cytokinesis). Players answer biology questions and complete checkpoint activities.

**Modes:**
- **Study Mode**: Single player, full educational board
- **Relaxed Mode**: Reduced timer pressure

**Checkpoint Activities (timed mini-games):**
- DNA base-pair matching (G1 phase)
- True/False rapid-fire questions (G2 phase)
- Vocabulary matching (M phase)

**Question Types:**
- Green cards: +1 space movement
- Violet cards: +2 spaces movement
- Event cards: Random positive/negative effects

**Key sections in the file:**
- `const GREEN_Q` / `const VIOLET_Q` — question data arrays
- `const EVENT_CARDS` — event card definitions
- `showScreen(name)` — main screen navigation function
- `renderBoard()` — draws the board and player tokens
- `movePlayer()` — handles player movement logic

---

### 2. `mitosis_board_v14.html` — Mitosis Challenge Board
An expanded multiplayer board game similar to Checkpoint Runner with additional UI features.

**Additions over Checkpoint Runner:**
- Multiple simultaneous players with individual score cards
- Right sidebar: player rankings + current phase display
- Bottom bar: question type selector
- SVG-based circular board visualization
- Enhanced animation and rendering system

**Key sections in the file:**
- Player state arrays for multiplayer tracking
- SVG board rendering logic
- `_placeLabel()` and related SVG helper functions

---

### 3. `xenogen_v5 (1).html` — XENOGEN: Alien Genetics Lab
A genetics breeding simulation game where players predict offspring phenotypes from alien parents.

**Game Flow:**
1. **Build**: Spin trait randomizers to create your alien (with genotype)
2. **Partner Select**: Choose a breeding partner from generated candidates
3. **Game Screen**: Predict offspring phenotype probability (25%, 50%, 75%, 100%)
4. **Fertilize**: Cross parents, reveal actual offspring
5. **End Screen**: Results, streak tracking, and lineage history

**Genetics Mechanics:**
- Dominant/recessive allele system
- Punnett square logic (hardcoded probability outcomes)
- Multiple trait slots with visual SVG alien representations

**Key sections in the file:**
- Trait definition constants with allele mappings
- `showScreen(name)` — screen navigation
- `buildAlien()` / `renderAlien()` — alien visualization
- `crossAliens()` — offspring calculation logic

---

## Architecture and Code Conventions

### File Architecture
Each game follows the same monolithic single-file pattern:
1. `<style>` block — all CSS including variables, animations, and layout
2. `<body>` block — HTML structure with `.screen` divs for each game state
3. `<script>` block — all game logic, data, and rendering

### Screen Navigation Pattern
All games use a `showScreen(screenName)` function pattern:
```javascript
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(name).classList.add('active');
}
```
Screen IDs used: `title`, `howtoplay`, `setup`, `game`, `win` (varies by game).

### Naming Conventions
| Type | Convention | Example |
|------|-----------|---------|
| Constants / Data | `UPPER_SNAKE_CASE` | `GREEN_Q`, `EVENT_CARDS`, `DNA_PAIRS` |
| Functions | `camelCase` | `startGame()`, `renderBoard()`, `movePlayer()` |
| Variables | `camelCase` | `playerTokens`, `savedNames`, `currentPhase` |
| CSS classes | `kebab-case` | `player-token`, `question-card`, `score-panel` |
| Private helpers | `_prefixedCamelCase` | `_placeLabel()`, `_drawArc()` |

### Graphics Patterns
- **SVG**: Static game boards, alien characters, complex shapes
- **HTML5 Canvas**: Animated backgrounds, particle/confetti effects, title animations
- **CSS**: Gradients, box-shadows, `clamp()` for responsive typography

### CSS Architecture
- Root-level CSS variables: `:root { --color-primary: ...; }` for theme colors
- `clamp()` for fluid typography: `font-size: clamp(0.8rem, 2vw, 1.2rem)`
- Screen-based layout: each `.screen` is `display: none` except `.screen.active`

### Data Storage Pattern
All game content (questions, events, traits) is stored as JavaScript constants at the top of each `<script>` block:
```javascript
const GREEN_Q = [
  { q: "Question text?", a: "Answer", options: ["A", "B", "C", "D"] },
  ...
];
```
No external data files, no localStorage, no server calls — data resets on page reload.

### State Management
Global variables maintain all runtime game state:
```javascript
let currentPlayer = 0;
let playerPositions = [];
let scores = {};
let currentQuestion = null;
```
No framework or reactive state system — DOM is updated imperatively.

---

## Development Workflow

### Running Games
Simply open any HTML file directly in a modern web browser. No server, build step, or installation required:
```bash
# Option 1: File protocol
open "Checkpoint_Runner_1.html"

# Option 2: Local dev server (optional, for stricter CORS environments)
python3 -m http.server 8080
# then navigate to http://localhost:8080
```

### Making Changes
1. Open the target HTML file in a text editor
2. Locate the relevant section (CSS in `<style>`, HTML in `<body>`, logic in `<script>`)
3. Edit and save
4. Refresh the browser — no build step needed

### Finding Content to Edit
Common locations within each HTML file:

| Task | Where to look |
|------|--------------|
| Add/edit questions | Top of `<script>` — constants like `GREEN_Q`, `VIOLET_Q` |
| Add/edit event cards | Top of `<script>` — `EVENT_CARDS` constant |
| Change board appearance | `<style>` block + SVG/Canvas drawing functions |
| Modify game rules | Core functions: `movePlayer()`, `checkAnswer()`, `applyEvent()` |
| Change screen layout | The corresponding `.screen` div in `<body>` |
| Adjust timers | Look for `setTimeout` / `setInterval` calls and `TIMER_DURATION` constants |

### Adding a New Question
Questions follow this structure (may vary slightly per game):
```javascript
{
  q: "What phase follows G1 in the cell cycle?",
  a: "S phase",
  options: ["G0 phase", "S phase", "G2 phase", "M phase"]
}
```
Add new entries to the appropriate array (`GREEN_Q` for 1-space, `VIOLET_Q` for 2-space).

---

## Key Constraints and Gotchas

1. **No build system**: Never introduce npm, webpack, or any bundler. The single-file approach is intentional for portability.

2. **No persistence**: Games do not use `localStorage`, cookies, or any backend. All state is in-memory and lost on page reload. If persistence is needed in the future, `localStorage` is the appropriate approach.

3. **File name with spaces**: `xenogen_v5 (1).html` contains spaces and parentheses in its name. Always quote it in shell commands: `"xenogen_v5 (1).html"`.

4. **Image assets have spaces**: `Board _black_road.png` has a space in the filename. Reference carefully.

5. **Self-contained**: Do not split HTML files into separate CSS/JS files unless specifically requested — this breaks portability.

6. **No test suite**: There are no automated tests. Manual browser testing is the only validation method.

7. **Canvas animations**: The title screen and background animations use `requestAnimationFrame` loops. Stopping these requires clearing the animation frame ID via `cancelAnimationFrame(animId)`.

8. **Font loading**: Google Fonts are loaded via `<link>` tags from `fonts.googleapis.com`. Games may look different if loaded offline.

---

## Browser Compatibility

Targets modern browsers supporting:
- ES6+ JavaScript (arrow functions, `const`/`let`, template literals, destructuring)
- HTML5 Canvas API
- CSS Grid and Flexbox
- CSS custom properties (`var()`)
- SVG inline rendering

No IE or legacy browser support is needed or expected.

---

## Git Workflow

**Primary branch**: `master` / `main`
**Feature branches**: `claude/claude-md-*` pattern for AI-assisted changes

```bash
# Standard workflow
git checkout -b feature/my-change
# ... make changes ...
git add <specific files>
git commit -m "descriptive message"
git push -u origin feature/my-change
```

Avoid `git add -A` or `git add .` to prevent accidentally committing large image assets that are already tracked.

---

## Future Development Notes

If extending these games, consider:
- **Saving scores**: `localStorage` for per-session high scores
- **New game phases**: Add entries to the board constants and update `renderBoard()`
- **Additional question sets**: Extend the question constant arrays
- **Sound effects**: HTML5 `<audio>` elements work without a build system
- **Mobile improvements**: Current games are desktop-first; touch events would need `touchstart`/`touchend` handlers
