# Xenogenus 3D

A procedurally-generated dungeon crawler built in Godot 4, evolving the 2D
genetics-breeding sim in `../xenogen_v6.html` into a real 3D game where a
bred alien's Mendelian traits gate which rooms/paths are survivable —
aimed at working as an actual classroom genetics teaching tool, not just a
reskin.

## Status: Milestone 1 + title screen and more interactables

Milestone 1 proved the core feel: two hand-placed rooms (a chamber and a
straight corridor), the fixed-per-room camera system, 8-directional
movement, and the glow/material language. This pass adds a real entry
point and makes the existing space more legible before generation work
begins: a title screen with a functional Start button, and two more
interactive objects (three total now, one per color) so the "examine"
system is exercised more than once.

**No procedural generation and no genetics yet.** A full design for
Milestone 2 (procedural maze generation with per-biome material/color
skinning, ported from the 2D game's `BIOME_PALETTES`) exists but was
deliberately deferred rather than built this pass — milestone order is
staying flexible for now rather than locked to the original sequence.

## Requirements

Godot **4.3 or 4.4** (stable). Grab it free from godotengine.org if you
don't have it installed — this project was authored blind, without a local
Godot to test against (see "How this was built," below), so an exact
version match matters more than usual for a clean first open.

## How to run it

1. Open Godot, choose "Import," and select `project.godot` in this folder.
2. Press Play (F5) — it should boot into the title screen now, not
   straight into the game.
3. Click Start (or press Space/Enter, since the button holds focus) — it
   should fade to black and land you in the chamber, framed from a fixed
   high-angle three-quarter view.

## What to check

- **Does the project open without import/version errors?** Still the
  single biggest unknown, especially with new UI nodes — flag anything in
  the Output/Errors panel, even warnings, by pasting the exact text back.
- **Title screen:** boots first, shows "XENOGENUS 3D" and a styled cyan
  Start button (not a default gray button). Both a mouse click and
  keyboard confirm (Space/Enter) should trigger it exactly once — clicking
  repeatedly shouldn't restart the fade or double-fire the scene change.
- **Movement:** WASD or arrow keys should move the alien-token (the pink
  glowing cylinder) 8-directionally, relative to the screen — "up" always
  means away from the camera, regardless of which room you're in.
- **Camera:** walk from the chamber into the corridor (through the gap in
  the north wall). The camera should cut/snap to reframe the new room —
  it should never follow you continuously mid-room.
- **Examine (3 objects now):** the chamber has two pedestals in its south
  corners — purple and green — and the corridor has one amber pedestal on
  its west side. Walking up to any of them should show a "Press E to
  examine" prompt; E or Space reads its own flavor text, pressing again
  dismisses it. All three should read as clearly different colors, not
  just "glowing blobs."
- **Aesthetic:** near-black background, soft glow on the cyan/pink accent
  strips and purple/green/amber pedestals, dim ambient light on the
  walls/floor. Does it read as "handcrafted sci-fi biology," matching the
  sibling games' style guide?

Report back with a screenshot, a description, or (if anything looks
wrong or throws errors) the exact Output panel text — that's what drives
the next fix or the next milestone.

## How this was built

This project was authored in a sandboxed environment with no Godot binary
available — every `.tscn`/`.gd`/`.tres` file here was hand-written blind,
never opened in the actual editor. To keep that safe, some choices favor
robustness over polish:

- Input is bound in code (`autoload/InputSetup.gd`) rather than as a
  hand-serialized `[input]` section in `project.godot`.
- Camera framing is computed at runtime via `Transform3D.looking_at()`
  rather than hand-computed rotation matrices.
- All Milestone 1 room modules share one camera offset (both are the same
  4×4m footprint) — per-module-type presets (per the original plan) will
  matter once module shapes actually diverge in Milestone 2.
- The "examine" UI layout is a rough stub, not a tuned design pass.
- The title screen's Start button is styled by hand (`StyleBoxFlat`
  normal/hover/pressed states) rather than tuned live in the editor, same
  caveat as everything else here — colors and spacing may need a real pass
  once it's actually visible.

None of that is meant to be permanent — it's what let a first, untestable
pass be worth shipping. Once this runs cleanly locally, later milestones
can loosen these constraints.

## What's next (not built yet)

See the project plan for the full milestone sequence: procedural maze
generation with per-biome material/color skinning (Milestone 2), the
ported Punnett-square genetics engine (Milestone 3), a breeding UI
(Milestone 4), and biome-trait room gating — the actual pedagogical
payoff — in Milestone 5. Milestone order is being kept flexible for now,
so pieces of later milestones (like this pass's title screen) may land
out of sequence.
