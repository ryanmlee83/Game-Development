extends Area3D
## A single inspectable object. `flavor_text` is exported so each instance
## can be given its own content directly in the scene file — this is the
## same shape the ported EVENT_LIBRARY hazard/windfall text (Milestone 5)
## will eventually fill in per trait gate.

@export_multiline var flavor_text := "A curious specimen glows faintly in the dark."

func _ready() -> void:
	add_to_group("examinable")
	monitoring = false
	monitorable = true
