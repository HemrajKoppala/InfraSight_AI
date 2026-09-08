from fastapi import FastAPI

from app.database import Base, engine
from app.models.project import Project
from app.models.project_history import ProjectHistory

from app.api.projects import router as projects_router
from app.api.dashboard import router as dashboard_router

# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="InfraSight AI",
    description="Predictive Infrastructure Project Monitoring and Early Warning System",
    version="1.0.0",
)


app.include_router(projects_router)


@app.get("/")
def root():
    return {
        "message": "InfraSight AI Backend is running",
        "status": "online"
    }

@app.get("/health")
@app.get("/api/health")
def health():
    return {
        "status": "healthy"
    }