# 🔧 Troubleshooting Guide

This guide helps you resolve common issues when setting up and running Sage AI.

## 🚀 Quick Fixes

### Backend Issues

#### ❌ "uvicorn: command not found"

**Problem**: The `uvicorn` command is not available in your environment.

**Solutions**:

1. **Use the updated start script**:
   ```bash
   ./start.sh  # This will install uvicorn automatically
   ```

2. **Manual installation**:
   ```bash
   # Activate virtual environment first
   source venv/bin/activate
   
   # Install uvicorn
   pip install uvicorn[standard]
   
   # Then start the server
   uvicorn app.main:app --reload
   ```

3. **Use the simple start script**:
   ```bash
   ./start-simple.sh  # Handles uvicorn installation
   ```

#### ❌ "No module named 'app'"

**Problem**: The app directory or main.py file is missing.

**Solutions**:

1. **Check directory structure**:
   ```bash
   ls -la  # Should show app/ directory
   ls -la app/  # Should show main.py file
   ```

2. **Create missing files**:
   ```bash
   # The start.sh script will create these automatically
   ./start.sh
   ```

3. **Manual creation**:
   ```bash
   mkdir -p app
   # Copy the main.py content from the repository
   ```

#### ❌ "Port 8000 already in use"

**Problem**: Another process is using port 8000.

**Solutions**:

1. **Find and kill the process**:
   ```bash
   # Find process using port 8000
   lsof -i :8000
   
   # Kill the process (replace PID with actual process ID)
   kill -9 <PID>
   ```

2. **Use a different port**:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8001 --reload
   ```

3. **Update frontend configuration**:
   ```bash
   # In .env.local, change:
   NEXT_PUBLIC_DIGITALOCEAN_API_URL=http://localhost:8001
   ```

### Frontend Issues

#### ❌ "Module not found" errors

**Problem**: Dependencies are not installed or outdated.

**Solutions**:

1. **Clean install**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node.js version**:
   ```bash
   node --version  # Should be 18.0 or higher
   npm --version
   ```

3. **Clear Next.js cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

#### ❌ "Firebase configuration error"

**Problem**: Firebase environment variables are missing or incorrect.

**Solutions**:

1. **Check environment file**:
   ```bash
   # Ensure .env.local exists and has Firebase config
   cat .env.local
   ```

2. **Copy from example**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase credentials
   ```

3. **Verify Firebase project**:
   - Check Firebase console
   - Ensure project is active
   - Verify API keys are correct

#### ❌ "API connection failed"

**Problem**: Frontend can't connect to backend API.

**Solutions**:

1. **Check backend is running**:
   ```bash
   curl http://localhost:8000/api/health
   ```

2. **Verify API URL**:
   ```bash
   # In .env.local
   NEXT_PUBLIC_DIGITALOCEAN_API_URL=http://localhost:8000
   ```

3. **Check CORS configuration**:
   - Ensure backend allows frontend origin
   - Check browser console for CORS errors

## 🐛 Common Error Messages

### "Failed to fetch"

**Cause**: Network connectivity or API endpoint issues.

**Debug steps**:
1. Check if backend is running: `curl http://localhost:8000/api/health`
2. Verify API URL in environment variables
3. Check browser network tab for failed requests
4. Ensure CORS is properly configured

### "Authentication failed"

**Cause**: Firebase authentication issues.

**Debug steps**:
1. Check Firebase console for project status
2. Verify API keys in environment variables
3. Check browser console for auth errors
4. Ensure Firebase rules allow the operation

### "Database connection failed"

**Cause**: Database configuration or connectivity issues.

**Debug steps**:
1. Check DATABASE_URL in .env file
2. Verify database server is running
3. Test connection manually
4. Check database credentials

## 🔍 Debugging Tools

### Backend Debugging

1. **Enable debug logging**:
   ```python
   # In app/main.py
   import logging
   logging.basicConfig(level=logging.DEBUG)
   ```

2. **Use Python debugger**:
   ```python
   import pdb; pdb.set_trace()
   ```

3. **Check logs**:
   ```bash
   # View uvicorn logs
   uvicorn app.main:app --log-level debug
   ```

### Frontend Debugging

1. **Browser Developer Tools**:
   - Console tab for JavaScript errors
   - Network tab for API requests
   - Application tab for localStorage/cookies

2. **Next.js debugging**:
   ```bash
   # Enable debug mode
   DEBUG=* npm run dev
   ```

3. **React Developer Tools**:
   - Install browser extension
   - Inspect component state and props

## 🛠️ Environment Setup

### Python Environment

1. **Check Python version**:
   ```bash
   python3 --version  # Should be 3.11+
   ```

2. **Virtual environment issues**:
   ```bash
   # Remove and recreate
   rm -rf venv
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. **Permission issues**:
   ```bash
   # On macOS/Linux
   chmod +x start.sh start-simple.sh
   
   # If still issues, run with bash
   bash start.sh
   ```

### Node.js Environment

1. **Check Node.js version**:
   ```bash
   node --version  # Should be 18.0+
   npm --version
   ```

2. **Update Node.js**:
   ```bash
   # Using nvm (recommended)
   nvm install 18
   nvm use 18
   
   # Or download from nodejs.org
   ```

3. **Clear npm cache**:
   ```bash
   npm cache clean --force
   ```

## 🔧 Development Tools

### Recommended VS Code Extensions

- Python
- Pylance
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- GitLens
- Thunder Client (for API testing)

### Useful Commands

```bash
# Backend
pip list  # Show installed packages
pip freeze > requirements.txt  # Update requirements
python -m pytest  # Run tests
python -m mypy app/  # Type checking

# Frontend
npm list  # Show installed packages
npm audit  # Security audit
npm run build  # Production build
npm run typecheck  # TypeScript checking
```

## 📊 Performance Issues

### Slow API Responses

1. **Check AI service limits**:
   - OpenAI rate limits
   - API key quotas
   - Network latency

2. **Database optimization**:
   - Add indexes
   - Optimize queries
   - Use connection pooling

3. **Caching**:
   - Implement Redis caching
   - Use HTTP caching headers
   - Cache AI responses

### High Memory Usage

1. **Backend**:
   - Monitor with `htop` or `top`
   - Use memory profiling tools
   - Optimize database connections

2. **Frontend**:
   - Check for memory leaks
   - Optimize images and assets
   - Use React.memo for expensive components

## 🆘 Getting Help

### Before Asking for Help

1. **Check this troubleshooting guide**
2. **Search existing GitHub issues**
3. **Check the documentation**
4. **Try the suggested solutions**

### How to Report Issues

1. **Provide system information**:
   ```bash
   # System info
   uname -a
   python3 --version
   node --version
   npm --version
   ```

2. **Include error messages**:
   - Full error output
   - Stack traces
   - Browser console errors

3. **Steps to reproduce**:
   - What you were trying to do
   - What you expected to happen
   - What actually happened

### Contact Channels

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and help
- **Discord**: For real-time community support
- **Email**: For security issues

## 🔄 Reset Everything

If all else fails, here's how to completely reset your development environment:

### Backend Reset

```bash
# Remove virtual environment
rm -rf venv

# Remove cache files
rm -rf __pycache__ .pytest_cache

# Remove database (if using SQLite)
rm -f *.db

# Start fresh
./start.sh
```

### Frontend Reset

```bash
# Remove dependencies and cache
rm -rf node_modules package-lock.json .next

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
npm run dev
```

### Complete Reset

```bash
# Backend
rm -rf venv __pycache__ .pytest_cache *.db

# Frontend
rm -rf node_modules package-lock.json .next

# Environment
rm -f .env .env.local

# Start over
cp .env.example .env.local
cp backend.env.example .env
./start.sh
```

---

## 📞 Still Need Help?

If you're still experiencing issues after trying these solutions:

1. **Create a GitHub issue** with:
   - Your system information
   - Complete error messages
   - Steps you've already tried

2. **Join our Discord** for real-time help

3. **Check our FAQ** in the main README

Remember: The community is here to help! Don't hesitate to ask questions. 🤝