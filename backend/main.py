from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from schemas import GeoJSONResponse, IntelligenceSchema
from data_adapters import get_rare_earth_data, get_intelligence_context

app = FastAPI(title="Rare Earth Dependency Map API")

# Allow CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev purposes
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Real Rails: Rare Earth Dependency API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/api/data", response_model=GeoJSONResponse)
def get_data():
    return get_rare_earth_data()

@app.get("/api/intelligence", response_model=IntelligenceSchema)
def get_intelligence():
    return get_intelligence_context()

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
