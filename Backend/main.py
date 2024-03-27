from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient

app = FastAPI()

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["user_database"]
collection = db["users"]

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

class User(BaseModel):
    username: str
    password: str
    email: str
    phone_number: str

@app.post("/register/")
async def register(user: User):
    # Check if username is unique and has more than five characters
    if len(user.username) <= 5:
        raise HTTPException(status_code=400, detail="Username must be more than 5 characters long.")

    existing_user = collection.find_one({"username": user.username})
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists.")

    # Perform other validations here if necessary

    # Save user data to MongoDB
    user_dict = user.dict()
    result = collection.insert_one(user_dict)

    if result.inserted_id:
        return {"message": "User registered successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to register user")

# For testing purposes only
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
