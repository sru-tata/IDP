import yaml
from jinja2 import Template


class PromptEngine:
    def __init__(self, yaml_path: str):
        with open(yaml_path, "r", encoding="utf-8") as f:
            self.prompts = yaml.safe_load(f)["prompt_templates"]

    def _render_string(self, text: str, context: dict):
        """Helper: Render a string with Jinja2."""
        return Template(text).render(**context)

    def render(self, template_name: str, template_key: str, runtime_inputs: dict = None):
        template_data = self.prompts[template_name]
        system_prompt = template_data.get("system", "")
        inputs = template_data.get("inputs", {})

        # Merge all inputs
        merged_inputs = {**inputs, **(runtime_inputs or {}), "system": system_prompt}

        # Pass 1: render all inputs themselves (resolve {{ }} inside inputs)
        resolved_inputs = {}
        for key, val in merged_inputs.items():
            if isinstance(val, str):
                resolved_inputs[key] = self._render_string(val, merged_inputs)
            else:
                resolved_inputs[key] = val

        # Fetch template string
        template_str = template_data["templates"][template_key]

        # Pass 2: render final template with resolved inputs
        final_prompt = self._render_string(template_str, resolved_inputs)

        return final_prompt, resolved_inputs
