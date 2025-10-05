# **App Name**: Sage AI

## Core Features:

- User Authentication: Allow users to register and log in using Firebase Authentication, storing user credentials securely.
- Profile Creation and Management: Enable students to create profiles with details such as name, age, school, board, and grade, saved to Firestore.
- MBTI Personality Quiz: Integrate a Myers-Briggs personality quiz and store the results in Firestore.
- Personalized Dashboard: Generate a dashboard that adapts to the student's syllabus and learning style, based on their profile data from Firestore.
- AI-Powered Recommendations: Provide personalized topic summaries, quizzes, and recommendations fetched from an AI microservice (DigitalOcean API endpoint `/api/ai/recommendations`). The system uses the student's profile and learning data as a tool to generate helpful insights.
- Subject Display: Dynamically show the student’s subjects based on their school board and class using data stored in Firestore or a JSON file.
- Syllabus Integration: Dynamically fetch syllabus data for students based on preloaded JSON or via an API.

## Style Guidelines:

- Primary color: Soft violet (#A099FF) to evoke feelings of intellect, future focus, and digital learning.
- Background color: Light blue (#E0F7FA) with low saturation, providing a clean and calming backdrop.
- Accent color: A slightly deeper blue (#79B4B7), used to highlight key CTAs and interactive elements, creating a good level of contrast.
- Body and headline font: 'Inter', a grotesque-style sans-serif known for its modern and neutral aesthetic, will provide a clean reading experience across the platform.
- Use smooth, animated icons for each subject to add a playful and engaging touch.
- Clean, minimal layout with a focus on readability and ease of navigation, suitable for users of all ages.
- Subtle animations to enhance user interaction and provide visual feedback.