import type { LucideIcon } from 'lucide-react';

export type StudentProfile = {
  uid: string;
  name: string;
  email: string;
  age: number;
  schoolName: string;
  schoolBoard: "CBSE" | "ICSE" | "IB" | "State" | string;
  grade: string;
  mbtiType?: string;
};

export type Subject = {
  name: string;
  slug: string;
  icon: LucideIcon;
  description: string;
  boards: string[];
  grades: number[];
};

export type SyllabusTopic = {
    title: string;
    description: string;
}

export type MBTIQuestion = {
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  question: string;
  optionA: string;
  optionB: string;
};

export type MbtiTypes = {
  [key: string]: {
    name: string;
    description: string;
  };
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export type Quiz = {
  questions: QuizQuestion[];
};
