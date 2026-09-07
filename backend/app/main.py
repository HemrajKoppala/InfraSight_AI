from fastapi import FastAPI

app = FastAPI(
    title="InfraSight AI API",
    description="Predictive Infrastructure Project Monitoring & Early Warning System",
    version="1.0.0"
)


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