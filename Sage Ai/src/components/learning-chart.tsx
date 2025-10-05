"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { digitalOceanAPI, type LearningAnalyticsResponse } from "@/lib/digitalocean-api";
import { Skeleton } from "@/components/ui/skeleton";

// Fallback data for when API is unavailable
const fallbackLearningData = [
  { day: "Mon", quizzes: 2, hours: 1 },
  { day: "Tue", quizzes: 3, hours: 1.5 },
  { day: "Wed", quizzes: 1, hours: 0.5 },
  { day: "Thu", quizzes: 4, hours: 2 },
  { day: "Fri", quizzes: 3, hours: 1.7 },
  { day: "Sat", quizzes: 5, hours: 2.5 },
  { day: "Sun", quizzes: 2, hours: 1 },
];

export function LearningChart() {
  const { studentProfile } = useAuth();
  const [learningData, setLearningData] = useState(fallbackLearningData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLearningAnalytics() {
      if (!studentProfile) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const analytics = await digitalOceanAPI.getLearningAnalytics(studentProfile);
        setLearningData(analytics.weeklyProgress.map(item => ({
          day: item.day,
          quizzes: item.quizzes,
          hours: item.hours
        })));
      } catch (err) {
        console.warn("Failed to fetch learning analytics, using fallback data:", err);
        setError("Using offline data");
        setLearningData(fallbackLearningData);
      } finally {
        setLoading(false);
      }
    }

    fetchLearningAnalytics();
  }, [studentProfile]);

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle className="font-headline">Learning Insights</CardTitle>
        <CardDescription>
          Your activity for the last 7 days.
          {error && <span className="text-muted-foreground ml-2">({error})</span>}
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={learningData}>
              <XAxis
                dataKey="day"
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
        )}
      </CardContent>
    </Card>
  );
}