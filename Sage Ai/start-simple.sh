#!/bin/bash

# Simple Sage AI Backend Startup Script
# Use this if you already have Python dependencies installed

echo "🚀 Starting Sage AI Backend (Simple Mode)..."

# Check if we're in a virtual environment
if [ "$VIRTUAL_ENV" = "" ]; then
    echo "⚠️  No virtual environment detected. Activating venv..."
    if [ -d "venv" ]; then
        source venv/bin/activate
    else
        echo "❌ No venv directory found. Please run ./start.sh first to set up the environment."
        exit 1
    fi
fi

# Check if uvicorn is available
if ! command -v uvicorn &> /dev/null; then
    echo "❌ uvicorn not found. Installing..."
    pip install uvicorn[standard]
fi

# Create basic app if it doesn't exist
if [ ! -f "app/main.py" ]; then
    echo "📁 Creating basic FastAPI app..."
    mkdir -p app
    cat > app/main.py << 'EOF'
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os

app = FastAPI(
    title="Sage AI Backend",
    description="AI-powered personalized learning backend",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:9002"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "Sage AI Backend API",
        "status": "running",
        "docs": "/docs",
        "health": "/api/health"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "sage-ai-backend",
        "version": "1.0.0"
    }

# Mock AI endpoints for testing
@app.post("/api/ai/recommend-topics")
async def recommend_topics(request: dict):
    return {
        "recommendedTopics": ["Mathematics", "Physics", "Chemistry"],
        "reasoning": "Based on your learning profile, these topics will help build a strong foundation."
    }

@app.post("/api/ai/generate-quiz")
async def generate_quiz(request: dict):
    topic = request.get("topic", "General Knowledge")
    return {
        "questions": [
            {
                "question": f"What is a key concept in {topic}?",
                "options": ["Option A", "Option B", "Option C", "Option D"],
                "correctAnswer": "Option A"
            }
        ]
    }

@app.post("/api/ai/summarize-topic")
async def summarize_topic(request: dict):
    topic = request.get("topic", "Unknown Topic")
    return {
        "summary": f"This is an AI-generated summary for {topic}. The content is tailored to your learning style and includes practical examples to help you understand the core concepts."
    }

@app.post("/api/analytics/learning-progress")
async def learning_progress(request: dict):
    return {
        "weeklyProgress": [
            {"day": "Mon", "quizzes": 2, "hours": 1.5},
            {"day": "Tue", "quizzes": 3, "hours": 2.0},
            {"day": "Wed", "quizzes": 1, "hours": 0.5},
            {"day": "Thu", "quizzes": 4, "hours": 2.5},
            {"day": "Fri", "quizzes": 2, "hours": 1.0},
            {"day": "Sat", "quizzes": 3, "hours": 2.0},
            {"day": "Sun", "quizzes": 1, "hours": 1.0}
        ]
    }

@app.post("/api/analytics/quiz-results")
async def submit_quiz_results(request: dict):
    return {"success": True, "message": "Quiz results recorded successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
EOF
fi

echo "🌟 Starting server..."
echo "📖 API docs: http://localhost:8000/docs"
echo "🔍 Health check: http://localhost:8000/api/health"
echo ""

uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload