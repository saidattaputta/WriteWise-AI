from typing import Dict

class PromptBuilder:

    # Builds a prompt for the AI model based on the provided input data.
    
    @staticmethod
    def build_letter_prompt(data: Dict) -> str:
        """
        Constructs a prompt for generating a letter based on the provided data.

        Args:
            data (Dict): A dictionary containing the necessary information to build the prompt.

        Returns:
            str: The constructed prompt for generating a letter.
        """
        # Implementation for building the letter prompt
        
        prompt = f"""
You are an expert professional writing assistant. 

Generate a high-quality professional letter.

Recipient: {data['recipient']}
Purpose: {data['purpose']}
Tone: {data['tone']}
Content: {data['content']}

Requirements:

- Use a professional and formal tone.
- Maintain the required tone throughout the letter.
- Do not invent unnecessary details; only use the information provided.
- Return only the final letter without any additional explanations or commentary.
- Return only one version of the letter, not multiple versions.
"""
        return prompt.strip()