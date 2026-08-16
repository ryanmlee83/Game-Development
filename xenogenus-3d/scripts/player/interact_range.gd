extends Area3D
## Proximity trigger carried by the player. Tracks whichever "examinable"
## Area3D it currently overlaps and forwards an examine request to it —
## this is the stub inspection layer the trait-gate objects (Milestone 5)
## will reuse for "approach and examine" interactions.

var _current: Area3D = null

func _ready() -> void:
	add_to_group("interact_range")
	area_entered.connect(_on_area_entered)
	area_exited.connect(_on_area_exited)

func _on_area_entered(area: Area3D) -> void:
	if area.is_in_group("examinable"):
		_current = area
		ExaminePanel.show_prompt()

func _on_area_exited(area: Area3D) -> void:
	if area == _current:
		_current = null
		ExaminePanel.hide_prompt()

func try_examine() -> void:
	if _current:
		ExaminePanel.show_text(str(_current.get("flavor_text")))
