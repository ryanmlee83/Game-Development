extends Node3D
## Boots the camera into the starting room. Explicit call rather than
## relying on the starting RoomZone's body_entered signal, since that signal
## only fires on the physics frame the player actually crosses into the
## area — not guaranteed to fire for a body already overlapping at scene
## start on every engine version.

func _ready() -> void:
	var rig := get_tree().get_first_node_in_group("camera_rig")
	if rig:
		rig.activate_room(Vector3(0, 0, 0))
