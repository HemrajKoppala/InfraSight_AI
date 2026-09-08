from fastapi import FastAPI

from app.database import Base, engine
from app.models.project import Project
from app.api.projects import router as projects_router


# Create database tables
Base.metadata.create_all(bind=engine)


from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="InfraSight AI",
    description=(
        "Predictive Infrastructure Project Monitoring "
        "and Early Warning System"
    ),
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(projects_router)


@app.get("/")
def root():
    return {
        "message": "InfraSight AI Backend is running",
        "status": "online"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }