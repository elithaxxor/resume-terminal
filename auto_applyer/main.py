import asyncio
import typer
from .providers.linkedin import LinkedInProvider
from .providers.indeed import IndeedProvider
from .providers.greenhouse import GreenhouseProvider
from .core.tracker import Tracker
from .core.llm_utils import extract_keywords, tailor_resume, generate_cover_letter

app = typer.Typer()
tracker = Tracker()

providers = {
    'linkedin': LinkedInProvider(),
    'indeed': IndeedProvider(),
    'greenhouse': GreenhouseProvider(),
}

@app.command()
def search(provider: str, query: str):
    prov = providers[provider]
    typer.echo(f"Searching {provider} for '{query}' ...")
    results = asyncio.run(prov.search_jobs(query))
    typer.echo(str(results))

@app.command()
def apply(provider: str, job_id: str, resume_file: str):
    prov = providers[provider]
    with open(resume_file) as f:
        resume = f.read()
    keywords = extract_keywords(job_id)
    tailored = tailor_resume(resume, keywords)
    cover = generate_cover_letter(job_id, tailored)
    asyncio.run(prov.apply_to_job(job_id, tailored, cover))
    tracker.log_application(job_id, job_id, 'unknown', provider, 'today')
    typer.echo("Application submitted")

@app.command()
def status():
    apps = tracker.get_applications()
    for a in apps:
        typer.echo(a)

if __name__ == '__main__':
    app()
