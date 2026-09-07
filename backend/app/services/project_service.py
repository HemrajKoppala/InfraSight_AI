from sqlalchemy.orm import Session

from app.models.project import Project


def get_all_projects(db: Session):
    return db.query(Project).all()


def get_project_by_id(db: Session, project_id: str):
    return (
        db.query(Project)
        .filter(Project.project_id == project_id)
        .first()
    )