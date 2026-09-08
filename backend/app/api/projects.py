from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.schemas.project import Project
from app.schemas.project_history import ProjectHistory
from app.schemas.project_details import ProjectDetails

from app.services.project_service import (
    get_all_projects,
    get_project_by_id
)

from app.services.project_history_service import (
    get_project_history
)

from app.services.project_details_service import (
    get_project_details
)


router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"]
)


# Get all projects
@router.get(
    "/",
    response_model=list[Project]
)
def get_projects(
    db: Session = Depends(get_db)
):
    return get_all_projects(db)


# Get project history
@router.get(
    "/{project_id}/history",
    response_model=list[ProjectHistory]
)
def get_project_history_endpoint(
    project_id: str,
    db: Session = Depends(get_db)
):

    history = get_project_history(
        db,
        project_id
    )

    return history


# Get complete project details
@router.get(
    "/{project_id}/details",
    response_model=ProjectDetails
)
def get_project_details_endpoint(
    project_id: str,
    db: Session = Depends(get_db)
):

    details = get_project_details(
        db,
        project_id
    )

    if details is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return details


# Get project by ID
@router.get(
    "/{project_id}",
    response_model=Project
)
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