# Xenogenus 3D

A procedurally-generated dungeon crawler built in Godot 4, evolving the 2D
genetics-breeding sim in `../xenogen_v6.html` into a real 3D game where a
bred alien's Mendelian traits gate which rooms/paths are survivable —
aimed at working as an actual classroom genetics teaching tool, not just a
reskin.

## Status: Milestone 1 — camera + movement + visual-feel proof

This is deliberately the smallest slice that can answer "does this feel
right": two hand-placed rooms (a chamber and a straight corridor), the
fixed-per-room camera system, 8-directional movement, the glow/material
language, and one stub "examine" interaction. **No procedural generation
and no genetics yet** — those are Milestones 2 and 3+, and won't start
until this slice has been run and reacted to.

## Requirements

Godot **4.3 or 4.4** (stable). Grab it free from godotengine.org if you
don't have it installed — this project was authored blind, without a local
Godot to test against (see "How this was built," below), so an exact
version match matters more than usual for a clean first open.

## How to run it

1. Open Godot, choose "Import," and select `project.godot` in this folder.
2. Press Play (F5) — it should boot straight into the scene, no menu yet.
3. You should see a small glowing chamber, framed from a fixed high-angle
   three-quarter view.

## What to check

- **Does the project open without import/version errors?** This is the
  single biggest unknown — flag anything in the Output/Errors panel,
  even warnings, by pasting the exact text back.
- **Movement:** WASD or arrow keys should move the alien-token (the pink
  glowing cylinder) 8-directionally, relative to the screen — "up" always
  means away from the camera, regardless of which room you're in.
- **Camera:** walk from the chamber into the corridor (through the gap in
  the north wall). The camera should cut/snap to reframe the new room —
  it should never follow you continuously mid-room.
- **Examine:** walk up to the small purple pedestal in the chamber's
  corner. A "Press E to examine" prompt should appear; press E (or Space)
  to read its flavor text, press again to dismiss.
- **Aesthetic:** near-black background, soft glow on the cyan/pink/purple
  accent objects, dim ambient light on the walls/floor. Does it read as
  "handcrafted sci-fi biology," matching the sibling games' style guide?

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

None of that is meant to be permanent — it's what let a first, untestable
pass be worth shipping. Once this runs cleanly locally, later milestones
can loosen these constraints.

## What's next (not built yet)

See the project plan for the full milestone sequence: procedural maze
generation (Milestone 2), the ported Punnett-square genetics engine
(Milestone 3), a breeding UI (Milestone 4), and biome-trait room gating —
the actual pedagogical payoff — in Milestone 5.
