extends Node
## Run-state singleton. Empty for now — will hold the current bred alien
## and dungeon seed once the genetics engine (Milestone 3) and the
## procedural generator (Milestone 2) exist. Present as an autoload from
## the start so later milestones don't need to restructure how scenes
## reach shared state.
