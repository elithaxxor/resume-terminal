from fastapi import FastAPI, UploadFile, File
from ..core.tracker import Tracker
from ..main import apply as apply_cli

app = FastAPI()
tracker = Tracker()

@app.post('/apply')
async def apply_endpoint(provider: str, job_id: str, resume: UploadFile = File(...)):
    content = (await resume.read()).decode()
    apply_cli(provider, job_id, resume_file=resume.filename)  # placeholder
    return {"status": "submitted"}

@app.get('/status')
async def status():
    return tracker.get_applications()

@app.get('/history')
async def history():
    return tracker.get_applications()

@app.post('/upload-resume')
async def upload_resume(file: UploadFile = File(...)):
    content = await file.read()
    with open('uploaded_resume.pdf', 'wb') as f:
        f.write(content)
    return {"status": "uploaded"}
