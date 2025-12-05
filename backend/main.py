from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from typing import Optional, Dict, Any

app = FastAPI(title="JapBong Learning API", version="1.0.0")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper to load data
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")

def load_json(filename: str) -> Dict[str, Any]:
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        # Fallback if file doesn't exist (e.g. before migration runs properly)
        return {}
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

# Cache data in memory for now (since it's read-only mostly)
# In a real dynamic app, we might want to read from DB or reload on change.
conversations_db = {}
words_db = {}

@app.on_event("startup")
async def startup_event():
    global conversations_db, words_db
    try:
        conversations_db = load_json("conversations.json")
        words_db = load_json("words.json")
        print(f"Loaded {len(conversations_db)} conversation categories")
        print(f"Loaded {len(words_db)} word categories")
    except Exception as e:
        print(f"Error loading data: {e}")

@app.get("/")
def read_root():
    return {"status": "ok", "message": "JapBong API is running"}

# --- Conversation Endpoints ---

@app.get("/api/conversations")
def get_conversation_categories():
    """Returns metadata for all conversation categories."""
    return {
        key: {
            "title": val.get("title"),
            "icon": val.get("icon"),
            "color": val.get("color"),
            "count": len(val.get("conversations", []))
        }
        for key, val in conversations_db.items()
    }

@app.get("/api/conversations/{category_id}")
def get_conversation_detail(category_id: str):
    """Returns full conversation data for a specific category."""
    if category_id not in conversations_db:
        raise HTTPException(status_code=404, detail="Category not found")
    return conversations_db[category_id]

# --- Word Study Endpoints ---

@app.get("/api/words")
def get_word_categories():
    """Returns metadata for all word categories."""
    return {
        key: {
            "title": val.get("title"),
            "icon": val.get("icon"),
            "color": val.get("color"),
            "count": len(val.get("words", []))
        }
        for key, val in words_db.items()
    }

@app.get("/api/words/{category_id}")
def get_word_detail(category_id: str):
    """Returns full word list for a specific category."""
    if category_id not in words_db:
        raise HTTPException(status_code=404, detail="Category not found")
    return words_db[category_id]

# --- Dynamic & User Features (Stub) ---

@app.post("/api/learning/progress")
def save_progress(data: Dict[str, Any]):
    """
    Saves user learning progress.
    Expects JSON body with 'userId' and other data.
    """
    user_id = data.get("userId")
    if not user_id:
        raise HTTPException(status_code=400, detail="userId is required in the body")

    try:
        filename = f"user_{user_id}.json"
        filepath = os.path.join(DATA_DIR, filename)
        
        current_data = {}
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                try:
                    current_data = json.load(f)
                except json.JSONDecodeError:
                    current_data = {}
        
        # Merge incoming data
        current_data.update(data)

        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(current_data, f, indent=4, ensure_ascii=False)
            
        print(f"Successfully saved progress for {user_id} to {filename}")
        return {"status": "saved", "user_id": user_id}
        
    except Exception as e:
        print(f"Error saving progress for {user_id}: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# --- Routers ---
from routers import scraper
app.include_router(scraper.router, prefix="/api")

# --- Dynamic Content Generation (Stub) ---
@app.post("/api/generate/conversation")
def generate_conversation_stub(topic: str, level: str):
    """
    Stub for AI-generated conversations.
    In the future, this will call an LLM.
    """
    return {
        "topic": topic,
        "level": level,
        "generated_content": [
            {
                "speaker": "AI",
                "text": f"This is a generated conversation about {topic} at {level} level."
            }
        ]
    }
