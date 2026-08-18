extends Control
## Title screen: boots first (project.godot's main scene), shows branding and
## a Start button, then hands off into Main.tscn. Start responds to mouse
## click and keyboard/gamepad confirm alike (the button holds focus), and a
## short fade covers the scene-change beat rather than cutting instantly.

const GAME_SCENE := "res://scenes/main/Main.tscn"
const FADE_DURATION := 0.4

@onready var start_button: Button = $CenterContainer/VBoxContainer/StartButton
@onready var fade: ColorRect = $Fade

var _starting := false

func _ready() -> void:
	start_button.pressed.connect(_on_start_pressed)
	start_button.grab_focus()
	fade.modulate.a = 0.0

func _on_start_pressed() -> void:
	if _starting:
		return
	_starting = true
	start_button.disabled = true

	var tween := create_tween()
	tween.tween_property(fade, "modulate:a", 1.0, FADE_DURATION)
	tween.tween_callback(_change_scene)

func _change_scene() -> void:
	get_tree().change_scene_to_file(GAME_SCENE)
