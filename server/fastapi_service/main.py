from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Set up CORS
origins = [
    "http://localhost:3000",  # Allow local development originy
    # "https://yourfrontend.com",  # Add production origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # This is very permissive; you should adjust this in production!
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/fastapi-endpoint")
def read_root():
    return {"Hello": "from FastAPI"}

@app.get("/status")
def get_status():
    return {"status": "FastAPI is up and running!"}

# set up routes below