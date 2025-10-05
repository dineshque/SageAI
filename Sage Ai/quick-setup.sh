#!/bin/bash

# Quick Setup Script for Sage AI Backend
# Handles common "module not found" errors

echo "🔧 Quick Setup for Sage AI Backend"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "requirements.txt" ]; then
    echo "❌ requirements.txt not found. Are you in the correct directory?"
    echo "📁 Expected files: requirements.txt, app/main.py"
    exit 1
fi

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed."
    echo "📥 Please install Python 3.11+ from https://python.org"
    exit 1
fi

echo "✅ Python found: $(python3 --version)"

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "❌ Failed to create virtual environment"
        exit 1
    fi
    echo "✅ Virtual environment created"
else
    echo "✅ Virtual environment already exists"
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

if [ "$VIRTUAL_ENV" = "" ]; then
    echo "❌ Failed to activate virtual environment"
    exit 1
fi

echo "✅ Virtual environment activated"

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip --quiet

# Install essential packages first
echo "📦 Installing essential packages..."
pip install fastapi uvicorn[standard] --quiet

if [ $? -ne 0 ]; then
    echo "❌ Failed to install FastAPI and uvicorn"
    echo "🌐 Check your internet connection and try again"
    exit 1
fi

echo "✅ FastAPI and uvicorn installed"

# Install remaining requirements
echo "📚 Installing remaining dependencies..."
pip install -r requirements-minimal.txt --quiet

if [ $? -ne 0 ]; then
    echo "⚠️  Some dependencies failed to install, but core packages are ready"
    echo "💡 You can continue with basic functionality"
else
    echo "✅ All dependencies installed successfully"
fi

# Create basic .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating basic .env file..."
    cat > .env << 'EOF'
# Development environment
ENVIRONMENT=development
DEBUG=true
SECRET_KEY=dev-secret-key-change-in-production

# Database (SQLite for development)
DATABASE_URL=sqlite:///./sageai.db

# CORS settings
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:9002

# AI Services (add your API keys here)
# OPENAI_API_KEY=your-openai-api-key
# GOOGLE_API_KEY=your-google-api-key
EOF
    echo "✅ Basic .env file created"
fi

# Test FastAPI installation
echo "🧪 Testing FastAPI installation..."
python3 -c "import fastapi; print('✅ FastAPI import successful')" 2>/dev/null

if [ $? -ne 0 ]; then
    echo "❌ FastAPI import failed"
    echo "🔄 Trying to reinstall..."
    pip install --force-reinstall fastapi uvicorn[standard]
else
    echo "✅ FastAPI is working correctly"
fi

echo ""
echo "🎉 Setup complete!"
echo "=================================="
echo "📖 API docs: http://localhost:8000/docs"
echo "🔍 Health check: http://localhost:8000/api/health"
echo ""
echo "🚀 To start the server:"
echo "   source venv/bin/activate"
echo "   uvicorn app.main:app --reload"
echo ""
echo "Or use: ./start-simple.sh"