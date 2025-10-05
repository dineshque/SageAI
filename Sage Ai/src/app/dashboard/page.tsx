import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSubjectsForStudent } from "@/lib/data";
import { StudentProfile } from "@/lib/definitions";
import { getStudentProfile } from "@/lib/firebase/firestore";
import { getCurrentUser } from "@/lib/firebase/auth";
import { redirect } from "next/navigation";
import { getAIRecommendedTopics } from "@/lib/api";
import { ArrowRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LearningChart } from "@/components/learning-chart";

async function getRecommendations(studentProfile: StudentProfile) {
  try {
    const recommendations = await getAIRecommendedTopics(studentProfile);
    return recommendations;
  } catch (error) {
    console.error("Failed to get AI recommendations:", error);
    return { recommendedTopics: [], reasoning: "Could not fetch recommendations at this time." };
  }
}

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  const studentProfile = await getStudentProfile(user.uid);
  if (!studentProfile) {
    redirect("/signup");
  }

  if (!studentProfile.mbtiType) {
    redirect("/onboarding/personality-test");
  }

  const subjects = getSubjectsForStudent(studentProfile);
  const recommendations = await getRecommendations(studentProfile);
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">
        Welcome back, {studentProfile.name.split(" ")[0]}!
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">My Subjects</CardTitle>
            <CardDescription>
              Continue your learning journey in your subjects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Carousel opts={{ align: "start", loop: true }} className="w-full">
              <CarouselContent>
                {subjects.map((subject) => (
                  <CarouselItem key={subject.slug} className="md:basis-1/2 lg:basis-1/3">
                    <Link href={`/dashboard/subjects/${subject.slug}`}>
                      <Card className="h-full flex flex-col justify-between hover:bg-muted transition-colors">
                        <CardHeader>
                          <subject.icon className="h-10 w-10 text-primary mb-2" />
                          <CardTitle className="text-lg font-headline">{subject.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground line-clamp-2">{subject.description}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">AI Recommended Topics</CardTitle>
            <CardDescription className="text-xs">{recommendations.reasoning}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {recommendations.recommendedTopics.length > 0 ? (
                recommendations.recommendedTopics.map((topic, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{topic}</span>
                     <Button variant="ghost" size="sm" asChild>
                       <Link href={`/dashboard/quiz/${encodeURIComponent(topic)}`}>
                         Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                       </Link>
                     </Button>
                  </li>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recommendations available right now.</p>
              )}
            </ul>
          </CardContent>
        </Card>

        <LearningChart />
      </div>
    </div>
  );
}
