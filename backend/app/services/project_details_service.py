from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.project_history import ProjectHistory


def get_project_details(
    db: Session,
    project_id: str
):
    project = (
        db.query(Project)
        .filter(Project.project_id == project_id)
        .first()
    )

    if project is None:
        return None

    history = (
        db.query(ProjectHistory)
        .filter(
            ProjectHistory.project_id == project_id
        )
        .order_by(ProjectHistory.month.asc())
        .all()
    )

    if project.original_cost > 0:
        cost_escalation_percent = (
            (
                project.current_cost
                - project.original_cost
            )
            / project.original_cost
        ) * 100
    else:
        cost_escalation_percent = 0

    progress_gap = (
        project.financial_progress
        - project.physical_progress
    )

    if project.planned_duration_months > 0:
        duration_used_percent = (
            project.elapsed_duration_months
            / project.planned_duration_months
        ) * 100
    else:
        duration_used_percent = 0

    return {
        "project": project,
        "metrics": {
            "cost_escalation_percent": round(
                cost_escalation_percent,
                2
            ),
            "progress_gap": round(
                progress_gap,
                2
            ),
            "duration_used_percent": round(
                duration_used_percent,
                2
            )
        },
        "history": history
    }