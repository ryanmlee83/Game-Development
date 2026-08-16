extends Area3D
## Covers one room module's floor footprint. When the player enters, it
## tells the camera rig to reframe on this room's center — this is the
## "doorway threshold" transition trigger from the plan, implemented as
## the boundary between adjacent rooms' own zones rather than a separate
## trigger object.

func _ready() -> void:
	body_entered.connect(_on_body_entered)

func _on_body_entered(body: Node3D) -> void:
	if body.is_in_group("player"):
		var rig := get_tree().get_first_node_in_group("camera_rig")
		if rig:
			rig.activate_room(global_position)
