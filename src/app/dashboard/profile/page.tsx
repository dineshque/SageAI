"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { grades, schoolBoards, mbtiTypes } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const profileSchema = z.object({
  name: z.string().min(2, "Name is required"),
  age: z.coerce.number().min(10).max(20),
  schoolName: z.string().min(3, "School name is required"),
  schoolBoard: z.string(),
  grade: z.string(),
});

export default function ProfilePage() {
  const { studentProfile, updateUserProfile, loading } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    values: {
      name: studentProfile?.name || "",
      age: studentProfile?.age || 0,
      schoolName: studentProfile?.schoolName || "",
      schoolBoard: studentProfile?.schoolBoard || "",
      grade: studentProfile?.grade || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    try {
      await updateUserProfile(values);
      toast({ title: "Profile updated successfully!" });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update failed",
        description: error.message,
      });
    }
  };
  
  const mbtiInfo = studentProfile?.mbtiType ? mbtiTypes[studentProfile.mbtiType] : null;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">My Profile</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Personal Information</CardTitle>
            <CardDescription>Update your personal and school details here.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="age" render={({ field }) => (
                    <FormItem><FormLabel>Age</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="schoolName" render={({ field }) => (
                  <FormItem><FormLabel>School Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField control={form.control} name="schoolBoard" render={({ field }) => (
                    <FormItem><FormLabel>School Board</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>{schoolBoards.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="grade" render={({ field }) => (
                    <FormItem><FormLabel>Grade/Class</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                        <SelectContent>{grades.map(g => <SelectItem key={g} value={String(g)}>{g}</SelectItem>)}</SelectContent>
                      </Select>
                    </FormItem>
                  )} />
                </div>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {mbtiInfo && (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Your Personality Type</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
                <Badge variant="outline" className="text-3xl font-bold font-headline p-4 rounded-lg bg-primary/20 border-primary">
                    {studentProfile?.mbtiType}
                </Badge>
                <h3 className="text-xl font-semibold">{mbtiInfo.name}</h3>
                <p className="text-sm text-muted-foreground">{mbtiInfo.description}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
