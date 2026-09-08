from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.project import Project


router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("/summary")
def get_dashboard_summary(
    db: Session = Depends(get_db)
):
    total_projects = db.query(Project).count()

    total_original_cost = (
        db.query(
            func.coalesce(
                func.sum(Project.original_cost),
                0
            )
        ).scalar()
    )

    total_current_cost = (
        db.query(
            func.coalesce(
                func.sum(Project.current_cost),
                0
            )
        ).scalar()
    )

    total_expenditure = (
        db.query(
            func.coalesce(
                func.sum(Project.expenditure),
                0
            )
        ).scalar()
    )

    return {
        "total_projects": total_projects,
        "total_original_cost": total_original_cost,
        "total_current_cost": total_current_cost,
        "total_expenditure": total_expenditure
    }