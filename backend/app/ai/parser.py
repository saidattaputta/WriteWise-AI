import re

from matplotlib import text

class ResponseParser:

    """ 
    A utility class for parsing responses from the AI model. This class provides methods to clean and extract relevant information from the raw response string.
    """
    @staticmethod
    def parse(text: str) -> str:
        """
        Parses the response from the AI model to extract the generated letter content.
        This method assumes that the response is a string and may contain unwanted characters or formatting.
        """
        if not text:
            return ""

        #  Remove Markdown code fences

        text = re.sub(r"```.*?```", "", text)
        text = text.replace("```", "")

        #  Normalize whitespace
        text = re.sub(r"\n{3,}", "\n\n", text)

        return text.strip()