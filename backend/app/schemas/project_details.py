from pydantic import BaseModel

from app.schemas.project import Project
from app.schemas.project_history import ProjectHistory


class ProjectMetrics(BaseModel):
    cost_escalation_percent: float
    progress_gap: float
    duration_used_percent: float


class ProjectDetails(BaseModel):
    project: Project
    metrics: ProjectMetrics
    history: list[ProjectHistory]