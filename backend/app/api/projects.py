from fastapi import APIRouter, HTTPException

router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"]
)

projects = [
    {
        "project_id": "INF-001",
        "project_name": "National Highway Project",
        "sector": "Transport",
        "ministry": "Ministry of Road Transport",
        "state": "Karnataka",
        "original_cost": 500,
        "current_cost": 560,
        "expenditure": 320,
        "physical_progress": 58,
        "financial_progress": 64
    },
    {
        "project_id": "INF-002",
        "project_name": "Metro Rail Project",
        "sector": "Railways",
        "ministry": "Ministry of Railways",
        "state": "Telangana",
        "original_cost": 800,
        "current_cost": 920,
        "expenditure": 610,
        "physical_progress": 67,
        "financial_progress": 72
    },
    {
        "project_id": "INF-003",
        "project_name": "Irrigation Development Project",
        "sector": "Water Resources",
        "ministry": "Ministry of Jal Shakti",
        "state": "Maharashtra",
        "original_cost": 350,
        "current_cost": 390,
        "expenditure": 210,
        "physical_progress": 52,
        "financial_progress": 60
    }
]


@router.get("/")
def get_projects():
    return projects


@router.get("/{project_id}")
def get_project(project_id: str):

    for project in projects:
        if project["project_id"] == project_id:
            return project

    raise HTTPException(
        status_code=404,
        detail="Project not found"
    )