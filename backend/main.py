import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from routers import auth, properties, inquiries, locations, admin

app = FastAPI(
    title="Aira Infra Real Estate API",
    description="Backend service for Aira Infra luxury real estate platform, providing Supabase synchronization, property portfolio management, leads CRM, and role-based access control.",
    version=settings.VERSION
)

# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for development & production frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(properties.router)
app.include_router(inquiries.router)
app.include_router(locations.router)
app.include_router(admin.router)

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": "Aira Infra Real Estate API",
        "version": settings.VERSION,
        "supabase_project": settings.SUPABASE_PROJECT_ID,
        "docs_url": "/docs"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)
