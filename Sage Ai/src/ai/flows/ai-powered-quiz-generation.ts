'use server';

/**
 * @fileOverview AI-powered quiz generation flow.
 *
 * - generateQuiz - A function that generates a quiz based on student data.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  studentProfile: z
    .string()
    .describe("Student's profile, including subjects, learning style, and completed topics."),
  topic: z.string().describe('The specific topic for which to generate the quiz.'),
  numberOfQuestions: z
    .number()
    .default(5)
    .describe('The number of questions to generate for the quiz.'),
});
export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.object({
  quiz: z.string().describe('The generated quiz in JSON format.'),
});
export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an expert quiz generator for school students.

  Based on the student's profile and the specified topic, generate a quiz with the specified number of questions.
  The quiz should be tailored to the student's learning style and should cover the completed topics.

  Student Profile: {{{studentProfile}}}
  Topic: {{{topic}}}
  Number of Questions: {{{numberOfQuestions}}}

  Please provide the quiz in JSON format with the following structure:
  {
    "questions": [
      {
        "question": "Question text",
        "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
        "correctAnswer": "Correct option"
      }
    ]
  }
  `,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
