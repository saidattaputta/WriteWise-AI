from app.services.ai_service import AIService

service = AIService()

sample = {
    'recipient': 'HR Manager',
    'purpose': 'Job Application',
    'tone': 'Professional',
    'content': 'I am applying for the AI Engineer position at your esteemed organization. I have a strong background in machine learning and natural language processing, and I am excited about the opportunity to contribute to your team.'
}

response = service.generate_letter(sample)
print(response)
