"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const learningData = [
  { name: "Mon", quizzes: 2, hours: 1 },
  { name: "Tue", quizzes: 3, hours: 1.5 },
  { name: "Wed", quizzes: 1, hours: 0.5 },
  { name: "Thu", quizzes: 4, hours: 2 },
  { name: "Fri", quizzes: 3, hours: 1.7 },
  { name: "Sat", quizzes: 5, hours: 2.5 },
  { name: "Sun", quizzes: 2, hours: 1 },
];

export function LearningChart() {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle className="font-headline">Learning Insights</CardTitle>
        <CardDescription>Your activity for the last 7 days.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={learningData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}h`}
            />
            <Bar
              dataKey="hours"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}