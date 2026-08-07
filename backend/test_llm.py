from app.ai.llm_client import LLMClient

client = LLMClient()

prompt = """
Write a professional leave application for 2 days.
"""

response = client.generate(prompt)
print(response)