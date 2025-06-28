import yaml
import os
from .llm_utils import generate_cover_letter

QA_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'questions.yml')

class QAEngine:
    def __init__(self, threshold: float = 0.7):
        self.threshold = threshold
        if os.path.exists(QA_PATH):
            with open(QA_PATH) as f:
                self.qa = yaml.safe_load(f) or {}
        else:
            self.qa = {}

    def answer(self, question: str) -> str:
        if question in self.qa:
            return self.qa[question]
        # fallback using LLM
        return generate_cover_letter(question, '')  # use cover letter generator as fallback
