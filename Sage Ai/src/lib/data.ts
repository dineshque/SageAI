import { Subject, MBTIQuestion, SyllabusTopic, StudentProfile, MbtiTypes } from './definitions';
import { Book, Calculator, FlaskConical, Globe, Languages, Palette, Landmark, Scale } from 'lucide-react';

export const schoolBoards = ["CBSE", "ICSE", "IB", "State"];
export const grades = [6, 7, 8, 9, 10, 11, 12];

export const subjects: Subject[] = [
  {
    name: "Mathematics",
    slug: "mathematics",
    icon: Calculator,
    description: "Explore the world of numbers, shapes, and patterns, from basic arithmetic to advanced calculus.",
    boards: ["CBSE", "ICSE", "IB", "State"],
    grades: [6, 7, 8, 9, 10, 11, 12],
  },
  {
    name: "Physics",
    slug: "physics",
    icon: Scale,
    description: "Understand the fundamental principles of the universe, from motion and energy to light and electricity.",
    boards: ["CBSE", "ICSE", "IB", "State"],
    grades: [9, 10, 11, 12],
  },
  {
    name: "Chemistry",
    slug: "chemistry",
    icon: FlaskConical,
    description: "Delve into the study of matter, its properties, and how substances combine or separate.",
    boards: ["CBSE", "ICSE", "IB", "State"],
    grades: [9, 10, 11, 12],
  },
  {
    name: "Biology",
    slug: "biology",
    icon: Globe,
    description: "Learn about living organisms, their life cycles, adaptations, and the environment they live in.",
    boards: ["CBSE", "ICSE", "IB", "State"],
    grades: [9, 10, 11, 12],
  },
  {
    name: "History",
    slug: "history",
    icon: Landmark,
    description: "Journey through time to discover the events and people that shaped our world.",
    boards: ["CBSE", "ICSE", "IB", "State"],
    grades: [6, 7, 8, 9, 10, 11, 12],
  },
  {
    name: "English",
    slug: "english",
    icon: Book,
    description: "Master the art of language, from grammar and composition to literature and creative writing.",
    boards: ["CBSE", "ICSE", "IB", "State"],
    grades: [6, 7, 8, 9, 10, 11, 12],
  },
  {
    name: "Art",
    slug: "art",
    icon: Palette,
    description: "Unleash your creativity and explore various forms of visual expression.",
    boards: ["CBSE", "ICSE", "IB", "State"],
    grades: [6, 7, 8, 9, 10],
  },
  {
    name: "Languages",
    slug: "languages",
    icon: Languages,
    description: "Learn new languages and explore different cultures from around the world.",
    boards: ["CBSE", "ICSE", "IB", "State"],
    grades: [6, 7, 8, 9, 10],
  },
];

export const getSubjectsForStudent = (student: StudentProfile): Subject[] => {
    return subjects.filter(subject => 
        subject.boards.includes(student.schoolBoard) && subject.grades.includes(Number(student.grade))
    );
};

export const getSubjectBySlug = (slug: string): Subject | undefined => {
    return subjects.find(s => s.slug === slug);
}

const syllabus: Record<string, SyllabusTopic[]> = {
    "mathematics": [
        { title: "Algebra", description: "Basics of variables, expressions, and equations." },
        { title: "Geometry", description: "Study of shapes, sizes, positions of figures, and properties of space." },
        { title: "Trigonometry", description: "Relationships between side lengths and angles of triangles." },
        { title: "Calculus", description: "The mathematical study of continuous change." },
    ],
    "physics": [
        { title: "Mechanics", description: "Study of motion, forces, and energy." },
        { title: "Thermodynamics", description: "Heat, work, and temperature, and their relation to energy." },
        { title: "Electromagnetism", description: "Interaction between electric currents and magnetic fields." },
    ],
    "chemistry": [
        { title: "Organic Chemistry", description: "Study of carbon compounds." },
        { title: "Inorganic Chemistry", description: "Properties and behavior of inorganic compounds." },
        { title: "Physical Chemistry", description: "How matter behaves on a molecular and atomic level." },
    ],
    "biology": [
        { title: "Cell Biology", description: "The study of cell structure and function." },
        { title: "Genetics", description: "The study of genes, genetic variation, and heredity." },
        { title: "Ecology", description: "Interactions among organisms and their environment." },
    ],
    "history": [
        { title: "Ancient Civilizations", description: "A look at the earliest societies." },
        { title: "The World Wars", description: "A comprehensive study of WWI and WWII." },
        { title: "Modern History", description: "Events from the post-World War II era to the present." },
    ],
    "english": [
        { title: "Grammar and Punctuation", description: "The rules of English language structure." },
        { title: "Shakespearean Literature", description: "An analysis of Shakespeare's major works." },
        { title: "Modern Poetry", description: "Exploring poems from the 20th and 21st centuries." },
    ],
    "art": [
        { title: "Color Theory", description: "The science and art of using color." },
        { title: "Sketching and Drawing", description: "Fundamental techniques for creating images on a surface." },
    ],
    "languages": [
        { title: "Basic Conversation", description: "Learning essential phrases for everyday communication." },
        { title: "Verb Conjugation", description: "Understanding how verbs change based on tense and subject." },
    ]
};

export const getSyllabusForSubject = (subjectSlug: string): SyllabusTopic[] => {
    return syllabus[subjectSlug] || [];
}

export const mbtiQuestions: MBTIQuestion[] = [
  {
    dimension: 'EI',
    question: 'At a party, do you:',
    optionA: 'Interact with many, including strangers',
    optionB: 'Interact with a few, known to you',
  },
  {
    dimension: 'SN',
    question: 'Are you more:',
    optionA: 'Realistic than speculative',
    optionB: 'Speculative than realistic',
  },
  {
    dimension: 'TF',
    question: 'Which appeals to you more:',
    optionA: 'Consistency of thought',
    optionB: 'Harmonious human relationships',
  },
  {
    dimension: 'JP',
    question: 'Do you prefer to:',
    optionA: 'Make decisions quickly',
    optionB: 'Keep your options open',
  },
  {
    dimension: 'EI',
    question: 'When the phone rings, do you:',
    optionA: 'Hasten to get to it first',
    optionB: 'Hope someone else will answer',
  },
  {
    dimension: 'SN',
    question: 'Do you tend to be more interested in:',
    optionA: 'What is actual',
    optionB: 'What is possible',
  },
  {
    dimension: 'TF',
    question: 'Are you more often a:',
    optionA: 'Cool-headed person',
    optionB: 'Warm-hearted person',
  },
  {
    dimension: 'JP',
    question: 'In your daily work, do you:',
    optionA: 'Prefer to plan your work, so you can be sure of the result',
    optionB: 'Like to do things as they come along',
  },
];

export const mbtiTypes: MbtiTypes = {
  'ISTJ': { name: 'The Inspector', description: 'Practical and fact-minded individuals, whose reliability cannot be doubted.' },
  'ISFJ': { name: 'The Protector', description: 'Very dedicated and warm protectors, always ready to defend their loved ones.' },
  'INFJ': { name: 'The Advocate', description: 'Quiet and mystical, yet very inspiring and tireless idealists.' },
  'INTJ': { name: 'The Architect', description: 'Imaginative and strategic thinkers, with a plan for everything.' },
  'ISTP': { name: 'The Crafter', description: 'Bold and practical experimenters, masters of all kinds of tools.' },
  'ISFP': { name: 'The Artist', description: 'Flexible and charming artists, always ready to explore and experience something new.' },
  'INFP': { name: 'The Mediator', description: 'Poetic, kind, and altruistic people, always eager to help a good cause.' },
  'INTP': { name: 'The Thinker', description: 'Innovative inventors with an unquenchable thirst for knowledge.' },
  'ESTP': { name: 'The Dynamo', description: 'Smart, energetic, and very perceptive people, who truly enjoy living on the edge.' },
  'ESFP': { name: 'The Performer', description: 'Spontaneous, energetic, and enthusiastic people – life is never boring around them.' },
  'ENFP': { name: 'The Champion', description: 'Enthusiastic, creative, and sociable free spirits, who can always find a reason to smile.' },
  'ENTP': { name: 'The Debater', description: 'Smart and curious thinkers who cannot resist an intellectual challenge.' },
  'ESTJ': { name: 'The Executive', description: 'Excellent administrators, unsurpassed at managing things – or people.' },
  'ESFJ': { name: 'The Consul', description: 'Extraordinarily caring, social, and popular people, always eager to help.' },
  'ENFJ': { name: 'The Protagonist', description: 'Charismatic and inspiring leaders, able to mesmerize their listeners.' },
  'ENTJ': { name: 'The Commander', description: 'Bold, imaginative, and strong-willed leaders, always finding a way – or making one.' },
};
