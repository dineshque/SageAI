"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MBTIQuestion } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { mbtiTypes } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "./ui/badge";

type Answers = { [key: number]: 'A' | 'B' };

export default function MbtiQuiz({ questions }: { questions: MBTIQuestion[] }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const router = useRouter();
  const { updateUserProfile } = useAuth();
  const { toast } = useToast();

  const handleAnswer = (value: 'A' | 'B') => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (answers[currentQuestion]) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResult();
      }
    } else {
      toast({
        variant: "destructive",
        title: "Please select an answer",
      });
    }
  };

  const calculateResult = () => {
    setLoading(true);
    let e = 0, i = 0, s = 0, n = 0, t = 0, f = 0, j = 0, p = 0;
    
    questions.forEach((q, index) => {
        const answer = answers[index];
        if (answer === 'A') {
            if (q.dimension === 'EI') e++; else if (q.dimension === 'SN') s++;
            else if (q.dimension === 'TF') t++; else if (q.dimension === 'JP') j++;
        } else {
            if (q.dimension === 'EI') i++; else if (q.dimension === 'SN') n++;
            else if (q.dimension === 'TF') f++; else if (q.dimension === 'JP') p++;
        }
    });

    const mbtiResult = `${e > i ? 'E' : 'I'}${s > n ? 'S' : 'N'}${t > f ? 'T' : 'F'}${j > p ? 'J' : 'P'}`;
    setResult(mbtiResult);
    setLoading(false);
  };
  
  const handleFinish = async () => {
    if(!result) return;
    setLoading(true);
    try {
        await updateUserProfile({ mbtiType: result });
        toast({
            title: "Success!",
            description: "Your learning profile is complete. Welcome to Sage AI!",
        });
        router.push("/dashboard");
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "An error occurred",
            description: "Could not save your result. Please try again.",
        });
        setLoading(false);
    }
  };

  const progress = (currentQuestion / questions.length) * 100;
  
  if(result) {
    const mbtiInfo = mbtiTypes[result];
    return (
        <div className="text-center space-y-6 animate-in fade-in-50 duration-500">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Your Personality Type</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Badge variant="outline" className="text-4xl font-bold font-headline p-4 rounded-lg bg-primary/20 border-primary">
                        {result}
                    </Badge>
                    <h3 className="text-2xl font-semibold">{mbtiInfo.name}</h3>
                    <p className="text-muted-foreground">{mbtiInfo.description}</p>
                </CardContent>
            </Card>
             <Button onClick={handleFinish} disabled={loading} size="lg">
                {loading ? "Saving..." : "Go to Dashboard"}
            </Button>
        </div>
    )
  }

  return (
    <div className="space-y-8">
      <Progress value={progress} className="w-full" />
      <div>
        <h2 className="text-xl font-semibold text-center mb-6">{questions[currentQuestion].question}</h2>
        <RadioGroup onValueChange={handleAnswer} value={answers[currentQuestion]} className="space-y-4">
          <Label htmlFor="option-a" className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/20 has-[input:checked]:border-primary">
            <RadioGroupItem value="A" id="option-a" className="mr-4" />
            {questions[currentQuestion].optionA}
          </Label>
          <Label htmlFor="option-b" className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-muted has-[input:checked]:bg-primary/20 has-[input:checked]:border-primary">
            <RadioGroupItem value="B" id="option-b" className="mr-4" />
            {questions[currentQuestion].optionB}
          </Label>
        </RadioGroup>
      </div>
      <div className="flex justify-end">
        <Button onClick={handleNext} disabled={!answers[currentQuestion] || loading}>
          {loading ? "Calculating..." : (currentQuestion === questions.length - 1 ? 'Finish & See Result' : 'Next')}
        </Button>
      </div>
    </div>
  );
}
