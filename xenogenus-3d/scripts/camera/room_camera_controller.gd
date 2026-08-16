extends Node3D
## Drives the single shared Camera3D into a fixed, high-angle three-quarter
## framing of whichever room the player is currently in. Framing is computed
## from the room's floor-center world position, not hand-placed per room —
## this is what lets a fixed-per-room feel scale to procedurally generated
## rooms later (Milestone 2+) instead of only working for hand-placed ones.
##
## All rooms currently share one offset/look-target pair (every Milestone 1
## module uses the same 4x4 footprint). When module footprints start to vary
## in size, swap this for a per-module-type preset instead of one constant.

const ROOM_OFFSET := Vector3(0, 5.5, -5.0)
const LOOK_OFFSET := Vector3(0, 0.8, 0)

@onready var camera: Camera3D = $Camera3D

func _ready() -> void:
	add_to_group("camera_rig")

func activate_room(room_center: Vector3) -> void:
	var cam_pos := room_center + ROOM_OFFSET
	var look_target := room_center + LOOK_OFFSET
	camera.global_transform = Transform3D(Basis(), cam_pos).looking_at(look_target, Vector3.UP)

func get_flat_forward() -> Vector3:
	var f := -camera.global_transform.basis.z
	f.y = 0.0
	return f.normalized() if f.length() > 0.001 else Vector3.FORWARD

func get_flat_right() -> Vector3:
	var r := camera.global_transform.basis.x
	r.y = 0.0
	return r.normalized() if r.length() > 0.001 else Vector3.RIGHT
