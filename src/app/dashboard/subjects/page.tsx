import { getSubjectsForStudent } from "@/lib/data";
import { getStudentProfile } from "@/lib/firebase/firestore";
import { getCurrentUser } from "@/lib/firebase/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function SubjectsPage() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }

    const studentProfile = await getStudentProfile(user.uid);
    if (!studentProfile) {
        redirect("/signup");
    }
    
    const subjects = getSubjectsForStudent(studentProfile);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-headline">My Subjects</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {subjects.map((subject) => (
                    <Link href={`/dashboard/subjects/${subject.slug}`} key={subject.slug}>
                        <Card className="h-full flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <CardHeader>
                                <subject.icon className="h-12 w-12 text-primary mb-4" />
                                <CardTitle className="text-xl font-headline">{subject.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="line-clamp-3">{subject.description}</CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
