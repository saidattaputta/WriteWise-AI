import time

from google import genai

from app.core.config import settings


class LLMClient:
    """
    Client responsible for communicating with the Gemini API.
    """

    def __init__(self):
        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

        # Use a specific stable model instead of a moving "latest" alias.
        self.model = "gemini-3.5-flash"

    def generate(self, prompt: str) -> str:
        """
        Generate text using the Gemini API.

        Retries transient Gemini service errors before failing.
        """

        max_attempts = 3

        for attempt in range(max_attempts):
            try:
                response = self.client.models.generate_content(
                    model=self.model,
                    contents=prompt,
                )

                if not response.text:
                    raise RuntimeError(
                        "Gemini returned an empty response."
                    )

                return response.text

            except Exception as e:
                error_message = str(e)

                # Retry temporary Gemini availability/rate-limit errors.
                is_transient_error = (
                    "503" in error_message
                    or "UNAVAILABLE" in error_message
                    or "429" in error_message
                    or "RESOURCE_EXHAUSTED" in error_message
                )

                if not is_transient_error:
                    raise

                if attempt == max_attempts - 1:
                    raise RuntimeError(
                        "Gemini service is temporarily unavailable. "
                        "Please try again later."
                    ) from e

                # Exponential backoff:
                # attempt 1 -> 2 seconds
                # attempt 2 -> 4 seconds
                wait_time = 2 ** (attempt + 1)

                time.sleep(wait_time)

        raise RuntimeError("Gemini generation failed.")