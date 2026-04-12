import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

export default function Home() {
  const topics = [
    { 
      id: 1, 
      title: "Introduction to Management", 
      description: "Definition, characteristics, functions, levels, and roles of management.",
      status: "Available"
    },
    { 
      id: 2, 
      title: "Evolution of Management Thought", 
      description: "Classical, behavioral, quantitative, and contemporary approaches.",
      status: "Upcoming"
    },
    { 
      id: 3, 
      title: "Planning", 
      description: "Goal setting, strategy formulation, and decision making.",
      status: "Upcoming"
    },
    { 
      id: 4, 
      title: "Organizing", 
      description: "Organizational structure, design, and human resource management.",
      status: "Upcoming"
    }
  ];

  return (
    <Layout breadcrumbs={[{ label: "Course Overview" }]}>
      <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-3">Unit 1</h2>
          <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-foreground mb-4">
            Business Management
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A comprehensive study guide covering the fundamental principles, theories, and practices of modern business management.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {topics.map((topic) => (
            <Link 
              key={topic.id} 
              href={topic.status === "Available" ? `/topic/${topic.id}` : "#"}
              className={`block transition-transform hover:-translate-y-1 duration-200 ${topic.status !== "Available" ? "opacity-60 cursor-not-allowed" : ""}`}
              data-testid={`card-topic-${topic.id}`}
            >
              <Card className="h-full border-border/60 shadow-sm hover:shadow-md transition-shadow bg-card/50 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-primary/10 text-primary rounded-full">
                      Topic {topic.id}
                    </span>
                    {topic.status === "Available" ? (
                      <BookOpen className="h-4 w-4 text-secondary" />
                    ) : (
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{topic.status}</span>
                    )}
                  </div>
                  <CardTitle className="font-serif text-xl leading-tight">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {topic.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
