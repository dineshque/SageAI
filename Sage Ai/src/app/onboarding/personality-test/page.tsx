import MbtiQuiz from "@/components/mbti-quiz";
import { mbtiQuestions } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BrainCircuit } from "lucide-react";

export default function PersonalityTestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <BrainCircuit className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-headline">
                One Last Step: Discover Your Learning Style
            </CardTitle>
            <CardDescription>
                This short quiz helps us understand how you learn best. Answer honestly to personalize your Sage AI experience.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <MbtiQuiz questions={mbtiQuestions} />
        </CardContent>
      </Card>
    </div>
  );
}
