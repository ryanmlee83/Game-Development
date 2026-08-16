extends CanvasLayer
## Minimal stub UI for the inspection layer: a small "press E" prompt while
## in range, and a centered text panel on examine. Press interact again to
## dismiss. Autoloaded by name so any script can call ExaminePanel.* directly
## without a group lookup.

@onready var prompt_label: Control = $PromptLabel
@onready var text_panel: Control = $TextPanel
@onready var text_label: RichTextLabel = $TextPanel/TextLabel

func _ready() -> void:
	prompt_label.visible = false
	text_panel.visible = false

func show_prompt() -> void:
	prompt_label.visible = true

func hide_prompt() -> void:
	prompt_label.visible = false

func show_text(text: String) -> void:
	text_label.text = text
	text_panel.visible = true

func _unhandled_input(event: InputEvent) -> void:
	if text_panel.visible and event.is_action_pressed("interact"):
		text_panel.visible = false
