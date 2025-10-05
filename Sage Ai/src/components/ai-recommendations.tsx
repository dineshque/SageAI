"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, BookOpen, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { digitalOceanAPI, type AIRecommendedTopicsResponse } from "@/lib/digitalocean-api";
import Link from "next/link";

export function AIRecommendations() {
  const { studentProfile } = useAuth();
  const [recommendations, setRecommendations] = useState<AIRecommendedTopicsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      if (!studentProfile) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const result = await digitalOceanAPI.getRecommendedTopics(studentProfile);
        setRecommendations(result);
      } catch (err) {
        console.warn("Failed to fetch AI recommendations:", err);
        setError("Unable to load recommendations");
        // Fallback recommendations
        setRecommendations({
          recommendedTopics: ["Algebra", "Physics", "Biology"],
          reasoning: "Based on your learning profile, these topics would help strengthen your foundation. (Offline mode)"
        });
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [studentProfile]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Brain className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
          <CardDescription>Personalized learning suggestions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-18" />
          </div>
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error && !recommendations) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Brain className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
          <CardDescription>Personalized learning suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Unable to load recommendations at this time.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Brain className="h-5 w-5" />
          AI Recommendations
          {error && <Badge variant="outline" className="text-xs">Offline</Badge>}
        </CardTitle>
        <CardDescription>Personalized learning suggestions powered by AI</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {recommendations?.recommendedTopics.map((topic, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {topic}
            </Badge>
          ))}
        </div>
        
        {recommendations?.reasoning && (
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 mt-0.5 text-primary" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Why these topics?</h4>
                <p className="text-sm text-muted-foreground">{recommendations.reasoning}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button asChild size="sm">
            <Link href="/dashboard/subjects">Explore Subjects</Link>
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            Refresh Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}