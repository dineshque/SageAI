'use server';

/**
 * @fileOverview AI-powered topic recommendation flow.
 *
 * - aiRecommendedTopics - A function that suggests topics for the student to study.
 * - AIRecommendedTopicsInput - The input type for the aiRecommendedTopics function.
 * - AIRecommendedTopicsOutput - The return type for the aiRecommendedTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIRecommendedTopicsInputSchema = z.object({
  studentProfile: z.object({
    name: z.string().describe('The name of the student.'),
    age: z.number().describe('The age of the student.'),
    schoolName: z.string().describe('The name of the school.'),
    schoolBoard: z.string().describe('The school board (e.g., CBSE, ICSE, IB, State).'),
    gradeClass: z.string().describe('The grade or class of the student.'),
    mbtiType: z.string().describe('The Myers-Briggs personality type of the student (e.g., INFP, ESTJ).'),
    subjects: z.array(z.string()).describe('The subjects the student is studying.'),
  }).describe('The profile of the student.'),
  learningData: z.string().describe('The learning data of the student, including performance and goals.'),
});
export type AIRecommendedTopicsInput = z.infer<typeof AIRecommendedTopicsInputSchema>;

const AIRecommendedTopicsOutputSchema = z.object({
  recommendedTopics: z.array(z.string()).describe('The list of recommended topics for the student to study next.'),
  reasoning: z.string().describe('The reasoning behind the recommendations.'),
});
export type AIRecommendedTopicsOutput = z.infer<typeof AIRecommendedTopicsOutputSchema>;

export async function aiRecommendedTopics(input: AIRecommendedTopicsInput): Promise<AIRecommendedTopicsOutput> {
  return aiRecommendedTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiRecommendedTopicsPrompt',
  input: {schema: AIRecommendedTopicsInputSchema},
  output: {schema: AIRecommendedTopicsOutputSchema},
  prompt: `You are an AI-powered personalized learning assistant. Your goal is to recommend topics for the student to study next, based on their profile and learning data.

Student Profile:
Name: {{{studentProfile.name}}}
Age: {{{studentProfile.age}}}
School: {{{studentProfile.schoolName}}}
Board: {{{studentProfile.schoolBoard}}}
Grade: {{{studentProfile.gradeClass}}}
MBTI Type: {{{studentProfile.mbtiType}}}
Subjects: {{#each studentProfile.subjects}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Learning Data: {{{learningData}}}

Based on this information, recommend a few topics for the student to study next and explain your reasoning. Format your response as JSON with "recommendedTopics" and "reasoning" fields, which are a string array and string respectively.
`,
});

const aiRecommendedTopicsFlow = ai.defineFlow(
  {
    name: 'aiRecommendedTopicsFlow',
    inputSchema: AIRecommendedTopicsInputSchema,
    outputSchema: AIRecommendedTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
