from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.project import Project
from app.services.project_service import (
    get_all_projects,
    get_project_by_id
)


router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"]
)


@router.get("/", response_model=list[Project])
def get_projects(
    db: Session = Depends(get_db)
):
    return get_all_projects(db)


@router.get("/{project_id}", response_model=Project)
def get_project(
    project_id: str,
    db: Session = Depends(get_db)
):

    project = get_project_by_id(
        db,
        project_id
    )

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return project