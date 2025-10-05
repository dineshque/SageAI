# 🤝 Contributing to Sage AI

Thank you for your interest in contributing to Sage AI! We're excited to have you join our community of developers working to revolutionize personalized learning through AI.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [conduct@sageai.com](mailto:conduct@sageai.com).

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (18.0 or higher)
- **Python** (3.11 or higher)
- **Git**
- **npm** or **yarn**
- **pip** (Python package manager)

### Development Environment

1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/sage-ai.git
   cd sage-ai
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/original-owner/sage-ai.git
   ```

3. **Install dependencies**
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies
   pip install -r requirements.txt
   pip install -r requirements-dev.txt
   ```

4. **Set up environment variables**
   ```bash
   # Frontend
   cp .env.example .env.local
   
   # Backend
   cp backend.env.example .env
   ```

5. **Start development servers**
   ```bash
   # Terminal 1: Frontend
   npm run dev
   
   # Terminal 2: Backend
   ./start.sh
   ```

## 🛠️ Development Setup

### Frontend Development

The frontend is built with Next.js 15 and TypeScript. Key technologies:

- **Framework**: Next.js with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context API
- **Type Safety**: TypeScript
- **Authentication**: Firebase Auth

### Backend Development

The backend is built with FastAPI and Python. Key technologies:

- **Framework**: FastAPI
- **Database**: PostgreSQL
- **Caching**: Redis
- **AI Integration**: OpenAI, Google Gemini
- **Testing**: pytest

### Database Setup (Optional for Development)

```bash
# Using Docker for local development
docker-compose up -d db redis

# Or install locally
# PostgreSQL and Redis installation varies by OS
```

## 🎯 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- 🐛 **Bug fixes**
- ✨ **New features**
- 📚 **Documentation improvements**
- 🧪 **Tests**
- 🎨 **UI/UX improvements**
- 🔧 **Performance optimizations**
- 🌐 **Translations**

### Finding Issues to Work On

1. **Good First Issues**: Look for issues labeled `good first issue`
2. **Help Wanted**: Check issues labeled `help wanted`
3. **Feature Requests**: Browse issues labeled `enhancement`
4. **Bug Reports**: Find issues labeled `bug`

### Creating Issues

Before creating a new issue:

1. **Search existing issues** to avoid duplicates
2. **Use issue templates** when available
3. **Provide detailed information**:
   - Clear description of the problem/feature
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots/videos if applicable
   - Environment details (OS, browser, versions)

## 🔄 Pull Request Process

### Before You Start

1. **Create an issue** first (unless it's a minor fix)
2. **Get approval** from maintainers for significant changes
3. **Check existing PRs** to avoid duplicate work

### Development Workflow

1. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Follow our coding standards
   - Write/update tests
   - Update documentation

3. **Test your changes**
   ```bash
   # Frontend tests
   npm test
   npm run typecheck
   npm run lint
   
   # Backend tests
   pytest
   python -m mypy app/
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use the PR template
   - Link related issues
   - Provide clear description
   - Add screenshots for UI changes

### Pull Request Guidelines

#### Title Format
Use conventional commits format:
- `feat: add new learning analytics dashboard`
- `fix: resolve quiz submission error`
- `docs: update API documentation`
- `style: improve mobile responsiveness`
- `refactor: optimize database queries`
- `test: add unit tests for auth service`

#### Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### Review Process

1. **Automated Checks**: All PRs must pass CI/CD checks
2. **Code Review**: At least one maintainer review required
3. **Testing**: Manual testing for UI/UX changes
4. **Documentation**: Ensure docs are updated
5. **Approval**: Maintainer approval before merge

## 📝 Coding Standards

### TypeScript/JavaScript

```typescript
// Use TypeScript for type safety
interface StudentProfile {
  uid: string;
  name: string;
  email: string;
  mbtiType?: string;
}

// Use descriptive function names
async function generatePersonalizedQuiz(
  studentProfile: StudentProfile,
  topic: string
): Promise<Quiz> {
  // Implementation
}

// Use proper error handling
try {
  const result = await apiCall();
  return result;
} catch (error) {
  console.error('API call failed:', error);
  throw new Error('Failed to fetch data');
}
```

### Python

```python
# Follow PEP 8 style guide
from typing import List, Optional
from pydantic import BaseModel

class StudentProfile(BaseModel):
    uid: str
    name: str
    email: str
    mbti_type: Optional[str] = None

# Use type hints
async def generate_quiz(
    student_profile: StudentProfile,
    topic: str,
    num_questions: int = 5
) -> List[QuizQuestion]:
    """Generate personalized quiz questions."""
    # Implementation
    pass

# Use proper error handling
try:
    result = await ai_service.generate_content(prompt)
    return result
except Exception as e:
    logger.error(f"AI generation failed: {e}")
    raise HTTPException(status_code=500, detail="AI service unavailable")
```

### CSS/Styling

```css
/* Use Tailwind CSS classes */
<div className="flex items-center justify-between p-4 bg-card rounded-lg border">
  <h2 className="text-xl font-semibold font-headline">Title</h2>
</div>

/* For custom styles, use CSS modules or styled-components */
.custom-component {
  @apply bg-gradient-to-r from-primary to-secondary;
}
```

### File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `LearningChart.tsx`)
- **Pages**: `kebab-case.tsx` (e.g., `quiz-results.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `apiClient.ts`)
- **Types**: `definitions.ts`, `types.ts`
- **Constants**: `UPPER_SNAKE_CASE`

## 🧪 Testing Guidelines

### Frontend Testing

```typescript
// Component tests with React Testing Library
import { render, screen } from '@testing-library/react';
import { QuizClient } from './quiz-client';

describe('QuizClient', () => {
  it('renders quiz questions correctly', () => {
    const mockQuestions = [/* mock data */];
    render(<QuizClient questions={mockQuestions} />);
    
    expect(screen.getByText('Question 1/3')).toBeInTheDocument();
  });
});

// API tests
import { digitalOceanAPI } from '@/lib/digitalocean-api';

describe('DigitalOcean API', () => {
  it('fetches recommendations successfully', async () => {
    const mockProfile = { /* mock profile */ };
    const result = await digitalOceanAPI.getRecommendedTopics(mockProfile);
    
    expect(result.recommendedTopics).toHaveLength(3);
  });
});
```

### Backend Testing

```python
# API endpoint tests
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_generate_quiz():
    payload = {
        "studentProfile": {"uid": "test", "name": "Test User"},
        "topic": "Mathematics",
        "numberOfQuestions": 5
    }
    response = client.post("/api/ai/generate-quiz", json=payload)
    assert response.status_code == 200
    assert len(response.json()["questions"]) == 5

# Service tests
@pytest.mark.asyncio
async def test_ai_service():
    result = await ai_service.generate_summary("Photosynthesis", "Visual")
    assert isinstance(result, str)
    assert len(result) > 0
```

### Test Coverage

- **Minimum Coverage**: 80% for new code
- **Critical Paths**: 100% coverage for authentication, payment, data processing
- **Integration Tests**: Test API endpoints and database interactions
- **E2E Tests**: Test complete user workflows

## 📚 Documentation

### Code Documentation

```typescript
/**
 * Generates a personalized quiz based on student profile and topic
 * @param studentProfile - The student's learning profile
 * @param topic - The subject topic for the quiz
 * @param numberOfQuestions - Number of questions to generate (default: 5)
 * @returns Promise resolving to generated quiz
 * @throws {Error} When AI service is unavailable
 */
async function generateQuiz(
  studentProfile: StudentProfile,
  topic: string,
  numberOfQuestions: number = 5
): Promise<Quiz> {
  // Implementation
}
```

### API Documentation

- Use OpenAPI/Swagger for backend APIs
- Include request/response examples
- Document error codes and messages
- Provide usage examples

### README Updates

When adding new features:
- Update feature list
- Add configuration instructions
- Include usage examples
- Update deployment guides

## 🌟 Best Practices

### Performance

- **Frontend**: Use React.memo, useMemo, useCallback appropriately
- **Backend**: Implement caching, database indexing, connection pooling
- **Images**: Optimize images, use Next.js Image component
- **Bundle Size**: Monitor and optimize bundle size

### Security

- **Input Validation**: Validate all user inputs
- **Authentication**: Use Firebase Auth properly
- **API Keys**: Never commit API keys to version control
- **CORS**: Configure CORS appropriately
- **Rate Limiting**: Implement rate limiting for APIs

### Accessibility

- **Semantic HTML**: Use proper HTML elements
- **ARIA Labels**: Add ARIA labels for screen readers
- **Keyboard Navigation**: Ensure keyboard accessibility
- **Color Contrast**: Maintain WCAG AA compliance
- **Focus Management**: Proper focus handling

### Error Handling

```typescript
// Frontend error boundaries
class ErrorBoundary extends React.Component {
  // Implementation
}

// API error handling
try {
  const data = await apiCall();
  return data;
} catch (error) {
  if (error instanceof NetworkError) {
    // Handle network errors
  } else if (error instanceof ValidationError) {
    // Handle validation errors
  } else {
    // Handle unexpected errors
  }
}
```

## 🎨 UI/UX Guidelines

### Design System

- **Colors**: Use CSS custom properties for theming
- **Typography**: Follow established font hierarchy
- **Spacing**: Use consistent spacing scale (4px, 8px, 16px, 24px, 32px)
- **Components**: Use shadcn/ui components when possible

### Responsive Design

```css
/* Mobile-first approach */
.component {
  @apply text-sm p-2;
}

/* Tablet */
@media (min-width: 768px) {
  .component {
    @apply text-base p-4;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .component {
    @apply text-lg p-6;
  }
}
```

### Animation Guidelines

- **Performance**: Use CSS transforms and opacity
- **Duration**: 150ms for micro-interactions, 300ms for transitions
- **Easing**: Use CSS custom easing functions
- **Accessibility**: Respect `prefers-reduced-motion`

## 🌍 Internationalization

### Adding Translations

1. **Add translation keys** to language files
2. **Use translation hooks** in components
3. **Test with different languages**
4. **Consider RTL languages**

```typescript
// Translation usage
import { useTranslation } from 'next-i18next';

function Component() {
  const { t } = useTranslation('common');
  
  return <h1>{t('welcome_message')}</h1>;
}
```

## 🚀 Release Process

### Version Numbering

We follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version bumped
- [ ] Security review completed
- [ ] Performance testing done
- [ ] Deployment tested

## 💬 Community

### Communication Channels

- **GitHub Discussions**: For general questions and ideas
- **Discord**: Real-time chat and community support
- **Email**: For security issues and private matters

### Getting Help

1. **Check documentation** first
2. **Search existing issues** and discussions
3. **Ask in Discord** for quick help
4. **Create GitHub issue** for bugs/features

### Mentorship

New contributors can request mentorship:
- **Pair Programming**: Schedule sessions with maintainers
- **Code Reviews**: Get detailed feedback on contributions
- **Learning Path**: Guidance on areas to focus on

## 🏆 Recognition

We recognize contributors through:
- **Contributors Page**: Listed on our website
- **GitHub Achievements**: Badges and recognition
- **Community Highlights**: Featured in newsletters
- **Swag**: Stickers and merchandise for significant contributions

## 📞 Contact

- **Maintainers**: [@maintainer1](https://github.com/maintainer1), [@maintainer2](https://github.com/maintainer2)
- **Email**: [contributors@sageai.com](mailto:contributors@sageai.com)
- **Discord**: [Join our server](https://discord.gg/sageai)

---

Thank you for contributing to Sage AI! Together, we're building the future of personalized education. 🚀

<div align="center">
  <strong>Happy Coding! 🎉</strong>
</div>