from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.project import Project


router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


# Dashboard summary
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


# Sector-wise dashboard summary
@router.get("/sector-summary")
def get_sector_summary(
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            Project.sector,
            func.count(Project.id).label("project_count"),
            func.coalesce(
                func.sum(Project.original_cost),
                0
            ).label("original_cost"),
            func.coalesce(
                func.sum(Project.current_cost),
                0
            ).label("current_cost"),
            func.coalesce(
                func.sum(Project.expenditure),
                0
            ).label("expenditure")
        )
        .group_by(Project.sector)
        .order_by(Project.sector)
        .all()
    )

    return [
        {
            "sector": row.sector,
            "project_count": row.project_count,
            "original_cost": row.original_cost,
            "current_cost": row.current_cost,
            "expenditure": row.expenditure
        }
        for row in results
    ]


# State-wise dashboard summary
@router.get("/state-summary")
def get_state_summary(
    db: Session = Depends(get_db)
):
    results = (
        db.query(
            Project.state,
            func.count(Project.id).label("project_count"),
            func.coalesce(
                func.sum(Project.original_cost),
                0
            ).label("original_cost"),
            func.coalesce(
                func.sum(Project.current_cost),
                0
            ).label("current_cost"),
            func.coalesce(
                func.sum(Project.expenditure),
                0
            ).label("expenditure")
        )
        .group_by(Project.state)
        .order_by(Project.state)
        .all()
    )

    return [
        {
            "state": row.state,
            "project_count": row.project_count,
            "original_cost": row.original_cost,
            "current_cost": row.current_cost,
            "expenditure": row.expenditure
        }
        for row in results
    ]