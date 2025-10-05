"use client";

import { useState } from "react";
import { QuizQuestion } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Award, RotateCw } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { digitalOceanAPI } from "@/lib/digitalocean-api";

interface QuizClientProps {
  questions: QuizQuestion[];
  topic?: string;
}

export function QuizClient({ questions, topic = "General Knowledge" }: QuizClientProps) {
  const { studentProfile } = useAuth();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [startTime] = useState(Date.now());
  const [answers, setAnswers] = useState<Array<{ question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }>>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleNext = () => {
    if (selectedAnswer) {
      // Record the answer
      const answerRecord = {
        question: currentQuestion.question,
        userAnswer: selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect: isCorrect
      };
      setAnswers([...answers, answerRecord]);

      if (isCorrect) {
        setScore(score + 1);
      }
    }

    setIsAnswered(false);
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
      submitQuizResults();
    }
  };

  const submitQuizResults = async () => {
    if (!studentProfile) {
      console.warn("No student profile available for quiz submission");
      return;
    }

    try {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
      
      await digitalOceanAPI.submitQuizResults(
        studentProfile,
        topic,
        score,
        questions.length,
        timeSpent,
        answers
      );
      
      console.log("Quiz results successfully submitted to DigitalOcean API");
    } catch (error) {
      console.warn("Failed to submit quiz results:", error);
      // Continue with the quiz completion even if submission fails
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer) {
      setIsAnswered(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsAnswered(false);
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Award className="w-16 h-16 text-yellow-500"/>
          </div>
          <CardTitle className="text-3xl font-bold font-headline">Quiz Complete!</CardTitle>
          <CardDescription>You've finished the quiz.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xl">
            You scored <span className="font-bold text-primary">{score}</span> out of <span className="font-bold">{questions.length}</span>
          </p>
          <div className="w-full bg-muted rounded-full h-4 dark:bg-gray-700">
            <div className="bg-primary h-4 rounded-full" style={{ width: `${percentage}%` }}></div>
          </div>
          <p className="text-2xl font-bold">{percentage}%</p>
          <div className="flex justify-center gap-4">
            <Button onClick={restartQuiz} variant="outline">
              <RotateCw className="mr-2 h-4 w-4"/>
              Try Again
            </Button>
            <Button asChild>
              <Link href="/dashboard">Back to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <Progress value={(currentQuestionIndex / questions.length) * 100} className="mb-4"/>
        <CardTitle className="font-headline">Question {currentQuestionIndex + 1}/{questions.length}</CardTitle>
        <CardDescription className="text-lg pt-2">{currentQuestion.question}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={selectedAnswer || ""}
          onValueChange={(value) => !isAnswered && setSelectedAnswer(value)}
          className="space-y-4"
        >
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = currentQuestion.correctAnswer === option;
            return (
              <Label
                key={index}
                className={cn(
                  "flex items-center p-4 border rounded-lg cursor-pointer transition-colors",
                  isAnswered && isCorrectOption && "bg-green-100 border-green-400 text-green-800",
                  isAnswered && isSelected && !isCorrectOption && "bg-red-100 border-red-400 text-red-800",
                  !isAnswered && "hover:bg-muted"
                )}
              >
                <RadioGroupItem value={option} disabled={isAnswered} className="mr-4" />
                <span>{option}</span>
                {isAnswered && isSelected && (isCorrect ? <CheckCircle className="ml-auto h-5 w-5 text-green-600"/> : <XCircle className="ml-auto h-5 w-5 text-red-600"/>)}
                {isAnswered && !isSelected && isCorrectOption && <CheckCircle className="ml-auto h-5 w-5 text-green-600"/>}
              </Label>
            );
          })}
        </RadioGroup>
        
        {isAnswered ? (
             <div className="text-center">
                <p className={cn("font-semibold mb-4", isCorrect ? "text-green-600" : "text-red-600")}>
                    {isCorrect ? "Correct!" : `Not quite! The correct answer is: ${currentQuestion.correctAnswer}`}
                </p>
                <Button onClick={handleNext} className="w-full">
                    {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
            </div>
        ) : (
             <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer} className="w-full">
                Submit Answer
             </Button>
        )}
      </CardContent>
    </Card>
  );
}
