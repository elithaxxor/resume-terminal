from __future__ import annotations
from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import List

@dataclass
class JobPosting:
    id: str
    title: str
    company: str
    url: str

class BaseProvider(ABC):
    @abstractmethod
    async def search_jobs(self, query: str) -> List[JobPosting]:
        """Return a list of JobPosting matching the query."""
        raise NotImplementedError

    @abstractmethod
    async def apply_to_job(self, job_id: str, resume: str, cover_letter: str) -> bool:
        """Apply to the job and return True if successful."""
        raise NotImplementedError

    @abstractmethod
    def supports_easy_apply(self) -> bool:
        """Whether the provider supports single-click apply."""
        raise NotImplementedError
