from google import genai
from app.core.config import settings

class LLMClient:

    "Generate text using the Gemini API."

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

    def generate(self, prompt: str) -> str:
        """
        Generate text based on the provided prompt using the Gemini API.

        Args:
            prompt (str): The input prompt for text generation.

        Returns:
            str: The generated text from the Gemini API.
        """
        response = self.client.models.generate_content(
            model="gemini-flash-latest",
            contents=prompt,
        )
        return response.text