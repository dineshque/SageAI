import { getQuiz } from "@/lib/api";
import { getCurrentUser } from "@/lib/firebase/auth";
import { getStudentProfile } from "@/lib/firebase/firestore";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizClient } from "@/components/quiz-client";

export default async function QuizPage({ params }: { params: { topic: string } }) {
  const topic = decodeURIComponent(params.topic);
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const studentProfile = await getStudentProfile(user.uid);
  if (!studentProfile) redirect("/signup");

  let quizData;
  try {
    quizData = await getQuiz(studentProfile, topic, 5);
  } catch (error) {
    console.error("Failed to generate or parse quiz:", error);
    quizData = { questions: [] };
  }

  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold font-headline">Quiz: {topic}</h1>
        {quizData.questions && quizData.questions.length > 0 ? (
            <QuizClient questions={quizData.questions} />
        ) : (
            <Card>
                <CardHeader>
                    <CardTitle>Quiz Not Available</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>
                        We couldn't generate a quiz for this topic right now. Please try again later or choose a different topic.
                    </CardDescription>
                </CardContent>
            </Card>
        )}
    </div>
  );
}
