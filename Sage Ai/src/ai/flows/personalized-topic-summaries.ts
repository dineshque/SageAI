'use server';
/**
 * @fileOverview A Genkit flow that provides personalized summaries of topics tailored to a student's learning style and syllabus.
 *
 * - personalizedTopicSummaries - A function that generates personalized topic summaries.
 * - PersonalizedTopicSummariesInput - The input type for the personalizedTopicSummaries function.
 * - PersonalizedTopicSummariesOutput - The return type for the personalizedTopicSummaries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedTopicSummariesInputSchema = z.object({
  studentProfile: z.object({
    name: z.string().describe('The name of the student.'),
    age: z.number().describe('The age of the student.'),
    schoolName: z.string().describe('The name of the school.'),
    schoolBoard: z.string().describe('The school board (e.g., CBSE, ICSE, IB, State).'),
    gradeClass: z.string().describe('The grade or class of the student.'),
    mbtiType: z.string().describe('The MBTI personality type of the student (e.g., INFP, ESTJ).'),
    subjects: z.array(z.string()).describe('The subjects the student is studying.'),
  }).describe('The profile of the student.'),
  topic: z.string().describe('The specific topic for which a summary is requested.'),
  syllabus: z.string().describe('The syllabus or curriculum for the topic.'),
  learningStyle: z.string().describe('The learning style of the student (e.g., visual, auditory, kinesthetic).'),
});
export type PersonalizedTopicSummariesInput = z.infer<typeof PersonalizedTopicSummariesInputSchema>;

const PersonalizedTopicSummariesOutputSchema = z.object({
  summary: z.string().describe('A personalized summary of the topic tailored to the student.'),
});
export type PersonalizedTopicSummariesOutput = z.infer<typeof PersonalizedTopicSummariesOutputSchema>;

export async function personalizedTopicSummaries(input: PersonalizedTopicSummariesInput): Promise<PersonalizedTopicSummariesOutput> {
  return personalizedTopicSummariesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedTopicSummariesPrompt',
  input: {schema: PersonalizedTopicSummariesInputSchema},
  output: {schema: PersonalizedTopicSummariesOutputSchema},
  prompt: `You are an AI-powered personalized learning assistant. Your task is to provide a personalized summary of a given topic tailored to a student's learning style and syllabus.

  Student Profile:
  Name: {{{studentProfile.name}}}
  Age: {{{studentProfile.age}}}
  School: {{{studentProfile.schoolName}}} ({{studentProfile.schoolBoard}})
  Grade/Class: {{{studentProfile.gradeClass}}}
  MBTI Type: {{{studentProfile.mbtiType}}}
  Subjects: {{#each studentProfile.subjects}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Topic: {{{topic}}}
  Syllabus: {{{syllabus}}}
  Learning Style: {{{learningStyle}}}

  Based on the above information, provide a concise and personalized summary of the topic that caters to the student's learning style and syllabus. Focus on key concepts and tailor the language to be appropriate for their age and grade level.

  Summary:`,
});

const personalizedTopicSummariesFlow = ai.defineFlow(
  {
    name: 'personalizedTopicSummariesFlow',
    inputSchema: PersonalizedTopicSummariesInputSchema,
    outputSchema: PersonalizedTopicSummariesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
