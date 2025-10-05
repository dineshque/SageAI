import { getSubjectBySlug, getSyllabusForSubject } from "@/lib/data";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getPersonalizedTopicSummary } from "@/lib/api";
import { getCurrentUser } from "@/lib/firebase/auth";
import { getStudentProfile } from "@/lib/firebase/firestore";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StudentProfile } from "@/lib/definitions";

async function getSummary(topic: string, studentProfile: StudentProfile, syllabus: string, learningStyle: string) {
    try {
        const result = await getPersonalizedTopicSummary(studentProfile, topic, syllabus, learningStyle);
        return result.summary;
    } catch(e) {
        console.error(e);
        return "Could not generate summary for this topic.";
    }
}

export default async function SubjectDetailPage({ params }: { params: { slug: string } }) {
  const subject = getSubjectBySlug(params.slug);
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  
  const studentProfile = await getStudentProfile(user.uid);
  if (!studentProfile) redirect("/signup");

  if (!subject) {
    redirect("/dashboard/subjects");
  }

  const syllabus = getSyllabusForSubject(subject.slug);

  // Simplified mapping from MBTI to learning style
  const learningStyle = studentProfile.mbtiType?.includes('S') ? 'Kinesthetic' : 'Visual';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <subject.icon className="h-12 w-12 text-primary" />
        <div>
            <h1 className="text-3xl font-bold font-headline">{subject.name}</h1>
            <p className="text-muted-foreground">{subject.description}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Syllabus & AI Summaries</CardTitle>
          <CardDescription>
            Explore the topics for {subject.name}. Click on a topic to reveal an AI-generated summary tailored for you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {syllabus.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {syllabus.map((topic) => (
                <AccordionItem value={topic.title} key={topic.title}>
                  <AccordionTrigger className="text-lg font-semibold">{topic.title}</AccordionTrigger>
                  <AccordionContent className="space-y-4">
                    <p className="text-muted-foreground">{topic.description}</p>
                    <Card className="bg-muted/50">
                        <CardHeader>
                            <CardTitle className="text-md font-headline">AI-Powered Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none text-foreground">
                            <p>{await getSummary(topic.title, studentProfile, topic.description, learningStyle)}</p>
                        </CardContent>
                    </Card>
                    <Button asChild>
                        <Link href={`/dashboard/quiz/${encodeURIComponent(topic.title)}`}>Test your knowledge</Link>
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="text-muted-foreground text-center py-8">Syllabus for this subject is not available yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
