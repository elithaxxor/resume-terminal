import os
from typing import List
import openai
from jinja2 import Template

TEMPLATE_DIR = os.path.join(os.path.dirname(__file__), '..', 'templates')

openai.api_key = os.getenv('OPENAI_API_KEY')


def _render_template(name: str, **kwargs) -> str:
    path = os.path.join(TEMPLATE_DIR, name)
    with open(path) as f:
        template = Template(f.read())
    return template.render(**kwargs)


def extract_keywords(job_description: str) -> List[str]:
    if not openai.api_key:
        return ['example', 'keywords']
    prompt = _render_template('resume_prompt.j2', job_description=job_description)
    resp = openai.ChatCompletion.create(model='gpt-4o', messages=[{'role': 'user', 'content': prompt}])
    text = resp.choices[0].message.content
    return [kw.strip() for kw in text.split(',')]


def tailor_resume(resume: str, keywords: List[str]) -> str:
    if not openai.api_key:
        return resume + '\n' + ','.join(keywords)
    prompt = f"Tailor this resume for the following keywords: {', '.join(keywords)}\n{resume}"
    resp = openai.ChatCompletion.create(model='gpt-4o', messages=[{'role': 'user', 'content': prompt}])
    return resp.choices[0].message.content


def generate_cover_letter(job_description: str, resume: str) -> str:
    if not openai.api_key:
        return 'Cover letter placeholder.'
    prompt = _render_template('cover_letter_prompt.j2', job_description=job_description, resume=resume)
    resp = openai.ChatCompletion.create(model='gpt-4o', messages=[{'role': 'user', 'content': prompt}])
    return resp.choices[0].message.content
