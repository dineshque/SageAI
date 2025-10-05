#!/bin/bash

# Sage AI Backend Startup Script

echo "🚀 Starting Sage AI Backend..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11 or higher."
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "❌ Failed to create virtual environment. Please check your Python installation."
        exit 1
    fi
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Check if activation was successful
if [ "$VIRTUAL_ENV" = "" ]; then
    echo "❌ Failed to activate virtual environment."
    exit 1
fi

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "📚 Installing dependencies..."
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies. Please check requirements.txt"
        exit 1
    fi
else
    echo "❌ requirements.txt not found. Please ensure you're in the correct directory."
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Copying from backend.env.example..."
    if [ -f "backend.env.example" ]; then
        cp backend.env.example .env
        echo "📝 Please edit .env file with your actual configuration values"
    else
        echo "⚠️  backend.env.example not found. Creating basic .env file..."
        cat > .env << EOF
# Basic environment configuration
ENVIRONMENT=development
DEBUG=true
SECRET_KEY=dev-secret-key-change-in-production
API_KEY=dev-api-key

# Database (SQLite for development)
DATABASE_URL=sqlite:///./sageai.db

# AI Services (add your API keys)
# OPENAI_API_KEY=your-openai-api-key
# GOOGLE_API_KEY=your-google-api-key

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:9002
EOF
        echo "📝 Created basic .env file. Please add your API keys."
    fi
fi

# Check if uvicorn is installed
if ! command -v uvicorn &> /dev/null; then
    echo "❌ uvicorn not found. Installing uvicorn..."
    pip install uvicorn[standard]
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install uvicorn. Please check your internet connection."
        exit 1
    fi
fi

# Check if app directory exists
if [ ! -d "app" ]; then
    echo "❌ app directory not found. Please ensure you're in the correct directory."
    echo "📁 Expected structure:"
    echo "   ├── app/"
    echo "   │   └── main.py"
    echo "   ├── requirements.txt"
    echo "   └── start.sh"
    exit 1
fi

# Check if main.py exists
if [ ! -f "app/main.py" ]; then
    echo "❌ app/main.py not found. Creating basic FastAPI app..."
    mkdir -p app
    cat > app/main.py << 'EOF'
from fastapi import FastAPI
from datetime import datetime

app = FastAPI(title="Sage AI Backend", version="1.0.0")

@app.get("/")
async def root():
    return {"message": "Sage AI Backend", "status": "running"}

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "sage-ai-backend"
    }
EOF
    echo "✅ Created basic FastAPI app in app/main.py"
fi

# Run database migrations (if using Alembic)
# echo "🗄️  Running database migrations..."
# alembic upgrade head

# Start the server
echo ""
echo "🌟 Starting FastAPI server..."
echo "📖 API Documentation will be available at: http://localhost:8000/docs"
echo "🔍 Health check available at: http://localhost:8000/api/health"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

# Start uvicorn with error handling
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# Check if uvicorn started successfully
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Failed to start the server. Common issues:"
    echo "   1. Port 8000 might be in use. Try: lsof -i :8000"
    echo "   2. Check if app/main.py has syntax errors"
    echo "   3. Ensure all dependencies are installed correctly"
    echo ""
    echo "🔧 Troubleshooting:"
    echo "   - Check the error message above"
    echo "   - Verify your .env configuration"
    echo "   - Try running: python -m uvicorn app.main:app --reload"
    exit 1
fi