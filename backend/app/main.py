from fastapi import FastAPI
from app.api.projects import router as projects_router


app = FastAPI(
    title="InfraSight AI",
    description=(
        "Predictive Infrastructure Project Monitoring "
        "and Early Warning System"
    ),
    version="1.0.0"
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