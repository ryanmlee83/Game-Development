extends CharacterBody3D
## 8-directional, screen-relative movement: input is read as plain
## forward/back/left/right presses and projected onto the active camera's
## flattened basis, so "up" always means "away from camera" regardless of
## which room's framing is active. No gravity — locomotion is confined to
## the XZ plane, matching the constrained-plane dungeon-crawler brief.

const SPEED := 4.0

@onready var camera_rig: Node3D = get_tree().get_first_node_in_group("camera_rig")
@onready var interact_range: Area3D = $InteractRange

func _ready() -> void:
	add_to_group("player")

func _physics_process(_delta: float) -> void:
	if Input.is_action_just_pressed("interact"):
		interact_range.try_examine()

	var forward := camera_rig.get_flat_forward() if camera_rig else Vector3.FORWARD
	var right := camera_rig.get_flat_right() if camera_rig else Vector3.RIGHT

	var move_dir := Vector3.ZERO
	if Input.is_action_pressed("move_forward"):
		move_dir += forward
	if Input.is_action_pressed("move_back"):
		move_dir -= forward
	if Input.is_action_pressed("move_left"):
		move_dir -= right
	if Input.is_action_pressed("move_right"):
		move_dir += right

	if move_dir.length() > 0.001:
		move_dir = move_dir.normalized()
		velocity = move_dir * SPEED
		rotation.y = atan2(move_dir.x, move_dir.z)
	else:
		velocity = Vector3.ZERO

	move_and_slide()
