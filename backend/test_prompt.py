from app.ai.prompt_builder import PromptBuilder

sample = {
    'recipient': 'HR Manager',
    'purpose': 'Job Application',
    'tone': 'Professional',
    'content': 'I am applying for the AI Engineer position at your esteemed organization. I have a strong background in machine learning and natural language processing, and I am excited about the opportunity to contribute to your team.'
}

prompt = PromptBuilder.build_letter_prompt(sample)
print(prompt)