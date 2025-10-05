# DigitalOcean Backend Integration

This document outlines the integration between the Sage AI frontend and the DigitalOcean-hosted backend for AI processing and personalized learning.

## Architecture Overview

- **Frontend**: Next.js application (this repository)
- **Authentication**: Firebase Auth (unchanged)
- **User Data**: Firebase Firestore (for user profiles only)
- **AI Processing**: DigitalOcean-hosted backend microservice
- **Analytics**: DigitalOcean backend with data persistence

## Backend API Endpoints

The DigitalOcean backend should implement the following REST API endpoints:

### Health Check
```
GET /api/health
Response: { "status": "ok", "timestamp": "2024-01-01T00:00:00Z" }
```

### AI Recommendations
```
POST /api/ai/recommend-topics
Body: {
  "studentProfile": StudentProfile,
  "timestamp": "2024-01-01T00:00:00Z"
}
Response: {
  "recommendedTopics": ["Algebra", "Physics", "Biology"],
  "reasoning": "Based on your recent activity..."
}
```

### Quiz Generation
```
POST /api/ai/generate-quiz
Body: {
  "studentProfile": StudentProfile,
  "topic": "Algebra",
  "numberOfQuestions": 5,
  "difficulty": "medium",
  "timestamp": "2024-01-01T00:00:00Z"
}
Response: {
  "questions": [
    {
      "question": "What is 2 + 2?",
      "options": ["3", "4", "5", "6"],
      "correctAnswer": "4"
    }
  ]
}
```

### Topic Summarization
```
POST /api/ai/summarize-topic
Body: {
  "studentProfile": StudentProfile,
  "topic": "Photosynthesis",
  "syllabus": "Process by which plants...",
  "learningStyle": "Visual",
  "timestamp": "2024-01-01T00:00:00Z"
}
Response: {
  "summary": "Personalized summary tailored to the student's learning style..."
}
```

### Learning Analytics
```
POST /api/analytics/learning-progress
Body: {
  "studentProfile": StudentProfile,
  "timeRange": "7d",
  "timestamp": "2024-01-01T00:00:00Z"
}
Response: {
  "weeklyProgress": [
    { "day": "Mon", "quizzes": 2, "hours": 1.5 }
  ],
  "strengths": ["Mathematics", "Science"],
  "areasForImprovement": ["History", "Literature"],
  "recommendedStudyTime": 2.5
}
```

### Quiz Results Submission
```
POST /api/analytics/quiz-results
Body: {
  "studentProfile": StudentProfile,
  "topic": "Algebra",
  "score": 4,
  "totalQuestions": 5,
  "timeSpent": 120,
  "answers": [
    {
      "question": "What is 2 + 2?",
      "userAnswer": "4",
      "correctAnswer": "4",
      "isCorrect": true
    }
  ],
  "timestamp": "2024-01-01T00:00:00Z"
}
Response: {
  "success": true,
  "message": "Quiz results recorded successfully"
}
```

## Environment Configuration

Add these environment variables to your `.env.local` file:

```bash
# DigitalOcean Backend Configuration
NEXT_PUBLIC_DIGITALOCEAN_API_URL=https://your-backend.digitalocean.app
DIGITALOCEAN_API_KEY=your-api-key-here

# For development with local backend
# NEXT_PUBLIC_DIGITALOCEAN_API_URL=http://localhost:8000
```

## Frontend Implementation

### API Client
- `src/lib/digitalocean-api.ts` - Main API client with all backend communication
- Includes error handling and fallback to mock data when backend is unavailable
- Implements retry logic and proper TypeScript types

### Components
- `src/components/ai-recommendations.tsx` - Displays AI-powered topic recommendations
- `src/components/learning-chart.tsx` - Shows learning analytics from backend
- `src/components/api-status.tsx` - Displays backend connection status
- `src/components/quiz-client.tsx` - Enhanced to submit results to backend

### Features
- **Graceful Degradation**: App continues to work with mock data if backend is unavailable
- **Real-time Status**: API status indicator in header shows connection state
- **Analytics Integration**: Quiz results and learning progress tracked via backend
- **Personalized AI**: All AI features powered by DigitalOcean backend

## Backend Technology Recommendations

### Suggested Stack
- **Runtime**: Python with FastAPI or Node.js with Express
- **AI/ML**: OpenAI GPT-4, Google Gemini, or local models
- **Database**: PostgreSQL for analytics data
- **Caching**: Redis for frequently accessed data
- **Deployment**: DigitalOcean App Platform or Droplets with Docker

### Sample Backend Structure
```
backend/
├── app/
│   ├── api/
│   │   ├── ai/
│   │   │   ├── recommendations.py
│   │   │   ├── quiz_generation.py
│   │   │   └── topic_summary.py
│   │   └── analytics/
│   │       ├── learning_progress.py
│   │       └── quiz_results.py
│   ├── models/
│   │   ├── student.py
│   │   └── quiz.py
│   ├── services/
│   │   ├── ai_service.py
│   │   └── analytics_service.py
│   └── main.py
├── requirements.txt
└── Dockerfile
```

## Security Considerations

1. **API Authentication**: Use API keys or JWT tokens for backend authentication
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Input Validation**: Validate all incoming data on the backend
4. **CORS**: Configure CORS properly for your frontend domain
5. **Data Privacy**: Ensure student data is handled according to privacy regulations

## Monitoring and Logging

- Implement health checks for all services
- Log all API requests and responses
- Monitor AI model performance and costs
- Track user engagement and learning outcomes
- Set up alerts for system failures

## Deployment

1. Deploy backend to DigitalOcean App Platform or Droplets
2. Configure environment variables in DigitalOcean
3. Update frontend environment variables with backend URL
4. Test all API endpoints before going live
5. Monitor logs and performance after deployment

## Development Workflow

1. **Local Development**: Run backend locally on `http://localhost:8000`
2. **Testing**: Use mock data when backend is unavailable
3. **Staging**: Deploy to staging environment for testing
4. **Production**: Deploy to production with proper monitoring

## Fallback Strategy

The frontend is designed to gracefully handle backend unavailability:
- Mock data is used when API calls fail
- User experience remains functional
- Clear indicators show when operating in offline mode
- Automatic retry mechanisms attempt to reconnect

This ensures the application remains usable even during backend maintenance or outages.