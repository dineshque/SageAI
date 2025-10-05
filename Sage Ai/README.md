# 🧠 Sage AI - Personalized Learning Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-orange?logo=firebase)](https://firebase.google.com/)
[![DigitalOcean](https://img.shields.io/badge/DigitalOcean-Backend-0080FF?logo=digitalocean)](https://www.digitalocean.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)](https://fastapi.tiangolo.com/)

Sage AI is an intelligent, personalized learning platform that adapts to each student's unique learning style using MBTI personality assessments and AI-powered content generation. The platform provides customized quizzes, topic summaries, and learning recommendations tailored to individual learning preferences.

## ✨ Features

### 🎯 **Personalized Learning**
- **MBTI-Based Adaptation**: Learning content tailored to personality types
- **AI-Powered Recommendations**: Smart topic suggestions based on progress
- **Adaptive Quizzes**: Dynamic difficulty adjustment based on performance
- **Custom Learning Paths**: Personalized curriculum progression

### 🤖 **AI Integration**
- **Topic Summarization**: AI-generated summaries tailored to learning styles
- **Quiz Generation**: Intelligent question creation for any topic
- **Progress Analytics**: AI-driven insights into learning patterns
- **Real-time Recommendations**: Dynamic content suggestions

### 📊 **Analytics & Insights**
- **Learning Progress Tracking**: Visual progress charts and statistics
- **Performance Analytics**: Detailed quiz results and improvement areas
- **Study Time Optimization**: AI-recommended study schedules
- **Strength & Weakness Analysis**: Personalized feedback

### 🎨 **Modern UI/UX**
- **Responsive Design**: Seamless experience across all devices
- **Dark/Light Mode**: Customizable interface themes
- **Intuitive Navigation**: User-friendly dashboard and navigation
- **Accessibility**: WCAG compliant design

## 🏗️ Architecture

### Frontend (Next.js)
- **Framework**: Next.js 15.3.3 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API
- **Authentication**: Firebase Auth
- **Type Safety**: Full TypeScript implementation

### Backend (DigitalOcean)
- **API**: FastAPI with Python
- **AI Services**: OpenAI GPT-4, Google Gemini
- **Database**: PostgreSQL for analytics
- **Caching**: Redis for performance
- **Deployment**: DigitalOcean App Platform

### Data Flow
```
Frontend (Next.js) → Firebase Auth → DigitalOcean Backend → AI Services
                                  ↓
                              PostgreSQL Database
                                  ↓
                              Redis Cache
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+ (for backend)
- Firebase project
- DigitalOcean account
- OpenAI/Google AI API keys

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sage-ai.git
   cd sage-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Firebase and DigitalOcean configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   # Backend files are in the root directory
   ```

2. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure backend environment**
   ```bash
   cp backend.env.example .env
   # Edit .env with your API keys and database configuration
   ```

4. **Start backend server**
   ```bash
   ./start.sh
   # Or manually: uvicorn app.main:app --reload
   ```

5. **Verify backend**
   Visit [http://localhost:8000/docs](http://localhost:8000/docs) for API documentation

## 📁 Project Structure

```
sage-ai/
├── 📁 src/
│   ├── 📁 app/                    # Next.js App Router pages
│   │   ├── 📁 dashboard/          # Dashboard pages
│   │   ├── 📁 login/              # Authentication pages
│   │   └── 📁 onboarding/         # User onboarding flow
│   ├── 📁 components/             # React components
│   │   ├── 📁 ui/                 # shadcn/ui components
│   │   ├── ai-recommendations.tsx # AI-powered recommendations
│   │   ├── learning-chart.tsx     # Analytics visualization
│   │   └── quiz-client.tsx        # Interactive quiz component
│   ├── 📁 lib/                    # Utility libraries
│   │   ├── digitalocean-api.ts    # DigitalOcean backend client
│   │   ├── firebase/              # Firebase configuration
│   │   └── definitions.ts         # TypeScript types
│   ├── 📁 hooks/                  # Custom React hooks
│   └── 📁 contexts/               # React contexts
├── 📁 app/                        # Backend FastAPI application
│   └── main.py                    # FastAPI main application
├── 📄 requirements.txt            # Python dependencies
├── 📄 docker-compose.yml          # Development environment
├── 📄 Dockerfile                  # Container configuration
└── 📄 package.json                # Node.js dependencies
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env.local)
```bash
# Firebase Authentication
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id

# DigitalOcean Backend
NEXT_PUBLIC_DIGITALOCEAN_API_URL=https://your-backend.digitalocean.app
DIGITALOCEAN_API_KEY=your-api-key
```

#### Backend (.env)
```bash
# AI Services
OPENAI_API_KEY=your-openai-api-key
GOOGLE_API_KEY=your-google-api-key

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/sageai
REDIS_URL=redis://localhost:6379

# Security
SECRET_KEY=your-secret-key
API_KEY=your-frontend-api-key
```

## 🧪 Testing

### Frontend Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Backend Tests
```bash
# Install test dependencies
pip install -r requirements-dev.txt

# Run tests
pytest

# Run with coverage
pytest --cov=app
```

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to Netlify
netlify deploy --prod
```

### Backend Deployment (DigitalOcean)
See [BACKEND_DEPLOYMENT.md](./BACKEND_DEPLOYMENT.md) for detailed deployment instructions.

## 📊 Features in Detail

### MBTI Personality Assessment
- Comprehensive 16-type personality assessment
- Learning style adaptation based on cognitive preferences
- Personalized content delivery strategies

### AI-Powered Learning
- **Topic Recommendations**: ML-driven suggestions based on learning history
- **Adaptive Quizzes**: Dynamic difficulty and question selection
- **Content Summarization**: Personalized explanations and examples
- **Progress Prediction**: AI forecasting of learning outcomes

### Analytics Dashboard
- Real-time learning progress visualization
- Performance trends and insights
- Study time optimization recommendations
- Comparative analysis with peer groups

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Documentation](http://localhost:8000/docs) (when backend is running)
- [DigitalOcean Backend Guide](./DIGITALOCEAN_BACKEND.md)
- [Migration Summary](./MIGRATION_SUMMARY.md)

### Getting Help
- 📧 Email: support@sageai.com
- 💬 Discord: [Join our community](https://discord.gg/sageai)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/sage-ai/issues)

### FAQ

**Q: How does the MBTI assessment work?**
A: Our assessment uses validated psychological questions to determine learning preferences and adapts content delivery accordingly.

**Q: What AI models are supported?**
A: We support OpenAI GPT-4, Google Gemini, and Anthropic Claude. The backend can be configured to use any combination.

**Q: Is my data secure?**
A: Yes, we use Firebase Auth for secure authentication and follow GDPR compliance standards for data protection.

**Q: Can I self-host the platform?**
A: Absolutely! Both frontend and backend are designed for easy self-hosting with comprehensive deployment guides.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Firebase](https://firebase.google.com/) for authentication services
- [DigitalOcean](https://www.digitalocean.com/) for reliable cloud infrastructure
- [OpenAI](https://openai.com/) for powerful AI capabilities
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

---

<div align="center">
  <strong>Built with ❤️ for personalized learning</strong>
  <br>
  <sub>Empowering students through AI-driven education</sub>
</div>
