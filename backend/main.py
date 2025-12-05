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
# ... existing code ...
import google.generativeai as genai

# ... existing code ...

# Gemini API Setup
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    model = genai.GenerativeModel('gemini-pro')
else:
    model = None
    print("⚠️ GEMINI_API_KEY not found. AI features will be disabled.")

# ... existing code ...

class SentenceRequest(BaseModel):
    sentence: str
    target_form: str # e.g., "negative", "past", "polite", "question"

class CheckRequest(BaseModel):
    words: List[str]
    user_sentence: str

@app.post("/api/practice/transform")
def transform_sentence(req: SentenceRequest):
    if not model:
        raise HTTPException(status_code=503, detail="AI Service Unavailable (Missing Key)")
    
    prompt = f"""
    You are a Japanese language teacher.
    Task:
    1. If the input is a word (e.g., 'apple', 'eat'), create a natural, simple Japanese sentence using that word in the '{req.target_form}' form.
    2. If the input is a sentence (e.g., 'I eat apple'), transform it into the '{req.target_form}' form.
    
    Input: {req.sentence}
    Target Form: {req.target_form}
    
    Output JSON format:
    {{
        "result": "The Japanese sentence (in Kanji/Kana)",
        "romaji": "The reading in Romaji",
        "explanation": "A brief explanation in Korean (e.g., 'Past tense of eat')"
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        # Simple cleanup to ensure JSON parsing if model adds backticks
        text = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(text)
    except Exception as e:
        print(f"AI Error: {e}")
        raise HTTPException(status_code=500, detail="AI Processing Failed")

@app.post("/api/practice/check")
def check_sentence(req: CheckRequest):
    if not model:
        raise HTTPException(status_code=503, detail="AI Service Unavailable (Missing Key)")
        
    prompt = f"""
    Check if the user constructed a natural Japanese sentence using the provided words.
    Words: {', '.join(req.words)}
    User Sentence: {req.user_sentence}
    
    Output JSON format:
    {{
        "is_correct": true/false,
        "feedback": "feedback in Korean",
        "better_version": "optional better version"
    }}
    """
    
    try:
        response = model.generate_content(prompt)
        text = response.text.replace("```json", "").replace("```", "").strip()
        return json.loads(text)
    except Exception as e:
        print(f"AI Error: {e}")
        raise HTTPException(status_code=500, detail="AI Processing Failed")

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
