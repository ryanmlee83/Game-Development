'use strict';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const W = canvas.width;   // 1320
const H = canvas.height;  // 900

// Board oval geometry
const CX = W / 2;         // 660
const CY = H / 2;         // 450
const RX = 540;           // horizontal radius of outer board edge
const RY = 370;           // vertical radius of outer board edge

// Track: ring of game spaces sits along this oval
const TRACK_RX = RX - 52;
const TRACK_RY = RY - 52;

// Cytoplasm interior (visible area, inset from track)
const CYTO_RX = TRACK_RX - 48;
const CYTO_RY = TRACK_RY - 48;

// ─── Track spaces ────────────────────────────────────────────────────────────
const SPACE_COUNT = 36;
const SPACE_RADIUS = 22;
const RING_WIDTH = 5;

const RING_COLORS = ['#FFD700', '#7CFC00', '#00BFFF', '#FF69B4', '#FF8C00'];

function trackPoint(index) {
  // Start at top (−π/2), go clockwise
  const angle = -Math.PI / 2 + (2 * Math.PI * index) / SPACE_COUNT;
  return {
    x: CX + TRACK_RX * Math.cos(angle),
    y: CY + TRACK_RY * Math.sin(angle),
    angle,
  };
}

// ─── Cytoplasm bubble particles ───────────────────────────────────────────────
const BUBBLE_COUNT = 90;
const bubbles = [];

function initBubbles() {
  for (let i = 0; i < BUBBLE_COUNT; i++) {
    bubbles.push(createBubble(true));
  }
}

function createBubble(randomAge = false) {
  // Distribute within the cytoplasm oval using rejection sampling
  let bx, by;
  do {
    bx = CX + (Math.random() * 2 - 1) * CYTO_RX;
    by = CY + (Math.random() * 2 - 1) * CYTO_RY;
  } while (
    ((bx - CX) / CYTO_RX) ** 2 + ((by - CY) / CYTO_RY) ** 2 > 1
  );

  const r = 4 + Math.random() * 18;
  const maxLife = 120 + Math.random() * 180;
  return {
    x: bx,
    y: by,
    r,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -0.15 - Math.random() * 0.35,
    life: randomAge ? Math.random() * maxLife : 0,
    maxLife,
    hue: 260 + Math.random() * 60,   // purples→pinks
    alpha: 0.15 + Math.random() * 0.35,
  };
}

function updateBubbles() {
  for (let i = 0; i < bubbles.length; i++) {
    const b = bubbles[i];
    b.x += b.vx;
    b.y += b.vy;
    b.life++;

    // Clamp: keep bubble inside cytoplasm oval
    const nx = (b.x - CX) / CYTO_RX;
    const ny = (b.y - CY) / CYTO_RY;
    if (nx * nx + ny * ny > 0.92) {
      b.vx *= -0.6;
      b.vy *= -0.6;
      b.x += b.vx * 3;
      b.y += b.vy * 3;
    }

    if (b.life >= b.maxLife) {
      bubbles[i] = createBubble(false);
    }
  }
}

// ─── Cell cycle overlay ───────────────────────────────────────────────────────
// Four phases arranged as arcs just inside the track
const CELL_CYCLE_PHASES = [
  { label: 'G1',  color: '#FF6B6B', startAngle: -Math.PI / 2,           sweep: Math.PI * 0.55 },
  { label: 'S',   color: '#FFD93D', startAngle: -Math.PI / 2 + Math.PI * 0.55,  sweep: Math.PI * 0.45 },
  { label: 'G2',  color: '#6BCB77', startAngle: -Math.PI / 2 + Math.PI * 1.0,  sweep: Math.PI * 0.35 },
  { label: 'M',   color: '#4D96FF', startAngle: -Math.PI / 2 + Math.PI * 1.35, sweep: Math.PI * 0.65 },
];

// The overlay arc sits just inside the track spaces, close to the ring
const OVERLAY_OUTER_RX = TRACK_RX - 28;
const OVERLAY_OUTER_RY = TRACK_RY - 28;
const OVERLAY_THICKNESS = 26;   // arc band width
const OVERLAY_INNER_RX = OVERLAY_OUTER_RX - OVERLAY_THICKNESS;
const OVERLAY_INNER_RY = OVERLAY_OUTER_RY - OVERLAY_THICKNESS;

// ─── Organelle decorations ────────────────────────────────────────────────────
// Mitochondria: drawn as rounded rectangles with inner ridge lines
const ORGANELLES = [
  { type: 'mito', x: CX - 290, y: CY + 140, angle: -0.3, w: 90, h: 38 },
  { type: 'mito', x: CX - 240, y: CY - 160, angle:  0.4, w: 72, h: 30 },
  { type: 'mito', x: CX + 130, y: CY + 200, angle:  0.2, w: 80, h: 32 },
  { type: 'vesicle', x: CX + 220, y: CY - 130, r: 22 },
  { type: 'vesicle', x: CX - 150, y: CY + 220, r: 14 },
  { type: 'vesicle', x: CX + 280, y: CY + 60,  r: 18 },
];

// ─── Top gem ──────────────────────────────────────────────────────────────────
function drawGem(x, y) {
  // Outer glow
  const glow = ctx.createRadialGradient(x, y, 2, x, y, 28);
  glow.addColorStop(0, 'rgba(220,60,255,0.9)');
  glow.addColorStop(0.5, 'rgba(160,0,220,0.5)');
  glow.addColorStop(1, 'rgba(100,0,180,0)');
  ctx.beginPath();
  ctx.arc(x, y, 28, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();

  // Gem body
  const grad = ctx.createRadialGradient(x - 4, y - 5, 2, x, y, 16);
  grad.addColorStop(0, '#ff99ff');
  grad.addColorStop(0.4, '#cc00cc');
  grad.addColorStop(1, '#440055');
  ctx.beginPath();
  ctx.arc(x, y, 16, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = '#ff66ff';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// ─── Draw helpers ─────────────────────────────────────────────────────────────

/** Build a Path2D for the board oval (used for clipping). */
function buildOvalPath(rx, ry) {
  const p = new Path2D();
  p.ellipse(CX, CY, rx, ry, 0, 0, Math.PI * 2);
  return p;
}

/** Sample a point on the ellipse at parameter t (0..1 clockwise from top). */
function ellipsePoint(rx, ry, t) {
  const a = -Math.PI / 2 + 2 * Math.PI * t;
  return { x: CX + rx * Math.cos(a), y: CY + ry * Math.sin(a) };
}

// ─── Draw: background + cytoplasm (CLIPPED to board oval) ────────────────────

let time = 0;

function drawCytoplasm() {
  ctx.save();
  // Clip ALL cytoplasm rendering to the inner cytoplasm oval
  const clipPath = buildOvalPath(CYTO_RX, CYTO_RY);
  ctx.clip(clipPath);

  // Base gradient – rich purple centre fading to pink/magenta edge
  const bg = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(CYTO_RX, CYTO_RY));
  bg.addColorStop(0.0, '#e8c0ff');
  bg.addColorStop(0.25, '#c060e8');
  bg.addColorStop(0.55, '#8020b8');
  bg.addColorStop(0.80, '#aa30cc');
  bg.addColorStop(1.0, '#cc40dd');
  ctx.fillStyle = bg;
  ctx.fillRect(CX - CYTO_RX, CY - CYTO_RY, CYTO_RX * 2, CYTO_RY * 2);

  // Animated shimmer layer
  const shimmer = ctx.createRadialGradient(
    CX + Math.sin(time * 0.02) * 60,
    CY + Math.cos(time * 0.017) * 40,
    10,
    CX, CY,
    Math.max(CYTO_RX, CYTO_RY) * 0.7,
  );
  shimmer.addColorStop(0, 'rgba(255,220,255,0.22)');
  shimmer.addColorStop(0.4, 'rgba(200,100,240,0.10)');
  shimmer.addColorStop(1, 'rgba(100,0,160,0)');
  ctx.fillStyle = shimmer;
  ctx.fillRect(CX - CYTO_RX, CY - CYTO_RY, CYTO_RX * 2, CYTO_RY * 2);

  // Bubbles
  for (const b of bubbles) {
    const fade = b.life < 20 ? b.life / 20 :
                 b.life > b.maxLife - 20 ? (b.maxLife - b.life) / 20 : 1;
    const grad = ctx.createRadialGradient(
      b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.1,
      b.x, b.y, b.r,
    );
    grad.addColorStop(0, `hsla(${b.hue},80%,85%,${b.alpha * fade})`);
    grad.addColorStop(0.5, `hsla(${b.hue},70%,55%,${b.alpha * 0.5 * fade})`);
    grad.addColorStop(1, `hsla(${b.hue},60%,30%,0)`);
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  ctx.restore();
}

// ─── Draw: cell-cycle overlay (arc band near track) ──────────────────────────

function drawCellCycleOverlay() {
  ctx.save();

  for (const phase of CELL_CYCLE_PHASES) {
    const { label, color, startAngle, sweep } = phase;
    const endAngle = startAngle + sweep;
    const steps = 80;

    // Build filled arc-band path between outer and inner ellipses
    ctx.beginPath();

    // Outer edge: startAngle → endAngle
    for (let s = 0; s <= steps; s++) {
      const a = startAngle + (sweep * s) / steps;
      const px = CX + OVERLAY_OUTER_RX * Math.cos(a);
      const py = CY + OVERLAY_OUTER_RY * Math.sin(a);
      s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    // Inner edge: endAngle → startAngle
    for (let s = steps; s >= 0; s--) {
      const a = startAngle + (sweep * s) / steps;
      const px = CX + OVERLAY_INNER_RX * Math.cos(a);
      const py = CY + OVERLAY_INNER_RY * Math.sin(a);
      ctx.lineTo(px, py);
    }
    ctx.closePath();

    // Semi-transparent fill
    ctx.fillStyle = color + '55';   // ~33% opacity
    ctx.fill();

    // Bright stroke along outer edge
    ctx.beginPath();
    for (let s = 0; s <= steps; s++) {
      const a = startAngle + (sweep * s) / steps;
      const px = CX + OVERLAY_OUTER_RX * Math.cos(a);
      const py = CY + OVERLAY_OUTER_RY * Math.sin(a);
      s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.strokeStyle = color + 'cc';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Phase label at arc midpoint
    const midA = startAngle + sweep / 2;
    const labelRX = (OVERLAY_OUTER_RX + OVERLAY_INNER_RX) / 2;
    const labelRY = (OVERLAY_OUTER_RY + OVERLAY_INNER_RY) / 2;
    const lx = CX + labelRX * Math.cos(midA);
    const ly = CY + labelRY * Math.sin(midA);

    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(midA + Math.PI / 2);   // tangent orientation
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px Segoe UI';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.7)';
    ctx.shadowBlur = 4;
    ctx.fillText(label, 0, 0);
    ctx.restore();
  }

  ctx.restore();
}

// ─── Draw: organelles ─────────────────────────────────────────────────────────

function drawOrganelles() {
  ctx.save();
  // Clip organelles to cytoplasm region
  ctx.clip(buildOvalPath(CYTO_RX + 30, CYTO_RY + 30));

  for (const o of ORGANELLES) {
    if (o.type === 'mito') {
      drawMitochondrion(o.x, o.y, o.angle, o.w, o.h);
    } else if (o.type === 'vesicle') {
      drawVesicle(o.x, o.y, o.r);
    }
  }

  ctx.restore();
}

function drawMitochondrion(x, y, angle, w, h) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const r = h / 2;
  // Outer body
  const grad = ctx.createLinearGradient(-w / 2, -h / 2, -w / 2, h / 2);
  grad.addColorStop(0, '#ff9900');
  grad.addColorStop(0.5, '#cc6600');
  grad.addColorStop(1, '#ff9900');

  ctx.beginPath();
  ctx.moveTo(-w / 2 + r, -h / 2);
  ctx.lineTo(w / 2 - r, -h / 2);
  ctx.quadraticCurveTo(w / 2, -h / 2, w / 2, 0);
  ctx.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  ctx.lineTo(-w / 2 + r, h / 2);
  ctx.quadraticCurveTo(-w / 2, h / 2, -w / 2, 0);
  ctx.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = '#ffbb44';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Inner cristae ridges
  ctx.strokeStyle = 'rgba(255,200,80,0.5)';
  ctx.lineWidth = 1.2;
  for (let i = -2; i <= 2; i++) {
    const lx = (w * 0.12) * i;
    ctx.beginPath();
    ctx.moveTo(lx, -h * 0.3);
    ctx.bezierCurveTo(lx + 6, -h * 0.1, lx - 6, h * 0.1, lx, h * 0.3);
    ctx.stroke();
  }

  ctx.restore();
}

function drawVesicle(x, y, r) {
  const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r);
  grad.addColorStop(0, 'rgba(120,240,200,0.8)');
  grad.addColorStop(0.6, 'rgba(60,160,180,0.5)');
  grad.addColorStop(1, 'rgba(20,80,120,0.2)');
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = 'rgba(100,220,240,0.7)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// ─── Draw: outer board ring ───────────────────────────────────────────────────

function drawBoardRing() {
  // Outermost board rim – segmented bronze/metallic oval
  const SEGS = 72;
  for (let i = 0; i < SEGS; i++) {
    const a0 = -Math.PI / 2 + (2 * Math.PI * i) / SEGS;
    const a1 = -Math.PI / 2 + (2 * Math.PI * (i + 0.85)) / SEGS;

    const rimW = 28;
    const outerRX = RX, outerRY = RY;
    const innerRX = RX - rimW, innerRY = RY - rimW;

    ctx.beginPath();
    // outer arc segment
    for (let s = 0; s <= 6; s++) {
      const a = a0 + (a1 - a0) * s / 6;
      const px = CX + outerRX * Math.cos(a);
      const py = CY + outerRY * Math.sin(a);
      s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    // inner arc segment reversed
    for (let s = 6; s >= 0; s--) {
      const a = a0 + (a1 - a0) * s / 6;
      const px = CX + innerRX * Math.cos(a);
      const py = CY + innerRY * Math.sin(a);
      ctx.lineTo(px, py);
    }
    ctx.closePath();

    const lightness = 40 + (i % 2) * 15;
    ctx.fillStyle = `hsl(30,50%,${lightness}%)`;
    ctx.strokeStyle = `hsl(30,40%,${lightness + 10}%)`;
    ctx.lineWidth = 0.5;
    ctx.fill();
    ctx.stroke();
  }

  // Outer border glow
  ctx.beginPath();
  ctx.ellipse(CX, CY, RX + 4, RY + 4, 0, 0, Math.PI * 2);
  ctx.strokeStyle = '#cc44cc';
  ctx.lineWidth = 4;
  ctx.shadowColor = '#cc00cc';
  ctx.shadowBlur = 18;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Inner rim edge
  ctx.beginPath();
  ctx.ellipse(CX, CY, RX - 28, RY - 28, 0, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(200,100,220,0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// ─── Draw: track spaces ───────────────────────────────────────────────────────

function drawTrackSpaces() {
  for (let i = 0; i < SPACE_COUNT; i++) {
    const { x, y } = trackPoint(i);
    const ringColor = RING_COLORS[i % RING_COLORS.length];

    // Shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;

    // White filled circle
    ctx.beginPath();
    ctx.arc(x, y, SPACE_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    ctx.restore();

    // Coloured ring
    ctx.beginPath();
    ctx.arc(x, y, SPACE_RADIUS, 0, Math.PI * 2);
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = RING_WIDTH;
    ctx.stroke();
  }
}

// ─── Draw: nucleus crescent (top-right of board interior) ────────────────────

function drawNucleus() {
  const nx = CX + 210, ny = CY - 130, nr = 55;
  ctx.save();
  ctx.clip(buildOvalPath(CYTO_RX, CYTO_RY));

  // Main nucleus body
  const grad = ctx.createRadialGradient(nx - 10, ny - 10, 5, nx, ny, nr);
  grad.addColorStop(0, '#88ccff');
  grad.addColorStop(0.5, '#4488dd');
  grad.addColorStop(1, '#224499');
  ctx.beginPath();
  ctx.arc(nx, ny, nr, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = '#66aaff';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Crescent overlay
  ctx.save();
  ctx.clip();   // clip to nucleus circle
  ctx.beginPath();
  ctx.arc(nx + 15, ny - 10, nr * 0.85, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(20,40,120,0.55)';
  ctx.fill();
  ctx.restore();

  // Pink nucleolus dot
  ctx.beginPath();
  ctx.arc(nx - 10, ny + 8, 14, 0, Math.PI * 2);
  ctx.fillStyle = '#ff66aa';
  ctx.fill();

  ctx.restore();
}

// ─── Main render loop ─────────────────────────────────────────────────────────

function render() {
  ctx.clearRect(0, 0, W, H);

  time++;
  updateBubbles();

  // 1. Cytoplasm background + bubbles — CLIPPED to inner oval
  drawCytoplasm();

  // 2. Organelle decorations (clipped to cytoplasm region)
  drawOrganelles();

  // 3. Nucleus
  drawNucleus();

  // 4. Cell-cycle overlay arcs (just inside track, visible over cytoplasm)
  drawCellCycleOverlay();

  // 5. Board outer rim (drawn on top so rim covers overflow)
  drawBoardRing();

  // 6. Track spaces (on top of rim)
  drawTrackSpaces();

  // 7. Top gem
  drawGem(CX, CY - RY + 8);

  requestAnimationFrame(render);
}

// ─── Boot ─────────────────────────────────────────────────────────────────────
initBubbles();
render();
