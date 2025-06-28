from typing import List
from ..core.provider import BaseProvider, JobPosting

class GreenhouseProvider(BaseProvider):
    def supports_easy_apply(self) -> bool:
        return True

    async def search_jobs(self, query: str) -> List[JobPosting]:
        # Placeholder for requests-based search
        return []

    async def apply_to_job(self, job_id: str, resume: str, cover_letter: str) -> bool:
        # Placeholder for form submission
        return True
