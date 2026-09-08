from sqlalchemy.orm import Session

from app.models.project_history import ProjectHistory


def get_project_history(
    db: Session,
    project_id: str
):
    return (
        db.query(ProjectHistory)
        .filter(
            ProjectHistory.project_id == project_id
        )
        .order_by(ProjectHistory.month.asc())
        .all()
    )