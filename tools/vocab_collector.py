"""
vocab_collector.py
Safe Word Collector for JAP_BONG Project
"""

import os
import re
import json
import time
import random
import google.generativeai as genai
from typing import Set, List, Dict

# Configuration
GOOGLE_API_KEY = "AIzaSyAOE6oG4UfcHvCwBuL7-OJbBkDMxFwfJGo"  # Reuse key
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
EXISTING_DATA_PATH = os.path.join(PROJECT_ROOT, 'js', 'learning', 'words_data.js')
STAGING_FILE_PATH = os.path.join(PROJECT_ROOT, 'js', 'learning', 'words_data_staging.json')

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

def load_existing_words() -> Set[str]:
    """Parses js/learning/words_data.js to find existing japanese words."""
    if not os.path.exists(EXISTING_DATA_PATH):
        print(f"Warning: {EXISTING_DATA_PATH} not found.")
        return set()
    
    with open(EXISTING_DATA_PATH, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Regex to find 'japanese_word': "..."
    # Matches: japanese_word: "父"  or  japanese_word: '父'
    pattern = r"japanese_word:\s*[\"'](.+?)[\"']"
    matches = re.findall(pattern, content)
    
    unique_words = set(matches)
    print(f"Loaded {len(unique_words)} existing words from words_data.js")
    return unique_words

def generate_word_candidates(existing_words: Set[str], count: int = 10) -> List[str]:
    """Asks Gemini to suggest words that are NOT in the existing list."""
    # We can't send all 1000 words in prompt, so we ask for common words and filter locally,
    # or ask for specific levels/topics.
    
    prompt = f"""
    Generate a JSON list of {count + 5} common Japanese vocabulary words (JLPT N5, N4, or N3 level).
    Output ONLY a JSON array of strings. Example: ["猫", "食べる"]
    Do NOT include these words if possible (Sample of existing): {list(existing_words)[:20]}...
    """
    
    try:
        response = model.generate_content(prompt)
        text = response.text.replace('```json', '').replace('```', '').strip()
        candidates = json.loads(text)
        
        # Filter duplicates locally
        new_words = [w for w in candidates if w not in existing_words]
        return new_words[:count]
    except Exception as e:
        print(f"Error generating candidates: {e}")
        return []

def fetch_word_details(word: str) -> Dict:
    """Fetches comprehensive details for a word using Gemini (Simulating Dictionary)."""
    prompt = f"""
    Provide detailed dictionary data for the Japanese word: "{word}".
    Output JSON format ONLY:
    {{
        "japanese_word": "{word}",
        "reading": "(hiragana)",
        "pronunciation": "[Korean pronunciation like 한글발음]",
        "korean_meaning": "(meaning)",
        "english_meaning": "(meaning)",
        "level": "(JLPT Level e.g. N5)",
        "example_sentence": {{
            "jp": "(Japanese sentence)",
            "kr": "(Korean translation)",
            "romaji": "(romaji)"
        }}
    }}
    """
    try:
        response = model.generate_content(prompt)
        text = response.text.replace('```json', '').replace('```', '').strip()
        data = json.loads(text)
        # Ensure fields exist
        data['category'] = "Auto-Collected" 
        return data
    except Exception as e:
        print(f"Error details for {word}: {e}")
        return None

def main():
    print("--- Starting Safe Vocab Collector ---")
    existing_words = load_existing_words()
    
    # In a real run, user wanted 1000, we'll do a small batch for verification first
    TARGET_BATCH_SIZE = 5 
    print(f"Targeting {TARGET_BATCH_SIZE} new words...")
    
    candidates = generate_word_candidates(existing_words, count=TARGET_BATCH_SIZE)
    print(f"Candidates generated: {candidates}")
    
    collected_data = []
    
    # Load existing staging if exists to append
    if os.path.exists(STAGING_FILE_PATH):
         with open(STAGING_FILE_PATH, 'r', encoding='utf-8') as f:
            try:
                collected_data = json.load(f)
                print(f"Loaded {len(collected_data)} items from existing staging.")
            except:
                pass

    for word in candidates:
        if word in existing_words: 
            continue
            
        # Double check if already in staging
        if any(item.get('japanese_word') == word for item in collected_data):
            continue

        print(f"Fetching details for: {word}")
        details = fetch_word_details(word)
        if details:
            # Assign a temp ID (will be re-assigned during merge)
            details['word_id'] = -1 
            collected_data.append(details)
            print("Saved.")
            time.sleep(1)
            
    # Save to staging
    with open(STAGING_FILE_PATH, 'w', encoding='utf-8') as f:
        json.dump(collected_data, f, ensure_ascii=False, indent=2)
        
    print(f"--- Collection Complete. Saved {len(collected_data)} items to {STAGING_FILE_PATH} ---")

if __name__ == "__main__":
    main()
