from app.ai.llm_client import LLMClient
from app.ai.prompt_builder import PromptBuilder
from app.schemas.letter import LetterRequest
from app.ai.parser import ResponseParser

class AIService:

    def __init__(self):
        self.llm_client = LLMClient()

    def generate_letter(self, data: dict) -> str:
        """
        Generate a professional letter based on the provided input data.

        Args:
            data (dict): A dictionary containing the necessary information to build the letter.

        Returns:
            str: The generated professional letter.
        """
        prompt = PromptBuilder.build_letter_prompt(data.model_dump())
        response = self.llm_client.generate(prompt)
        return ResponseParser.parse(response)