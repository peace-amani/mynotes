import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, TrendingUp } from "lucide-react";

export default function Home() {
  const unit1Topics = [
    {
      id: 1,
      title: "Introduction to Management",
      description: "Definition, characteristics, functions, levels, and roles of management.",
      status: "Available",
      href: "/topic/1"
    },
    {
      id: 2,
      title: "Evolution of Management Thought",
      description: "Classical, behavioral, quantitative, and contemporary approaches.",
      status: "Upcoming",
      href: "#"
    },
    {
      id: 3,
      title: "Planning",
      description: "Goal setting, strategy formulation, and decision making.",
      status: "Upcoming",
      href: "#"
    },
    {
      id: 4,
      title: "Organizing",
      description: "Organizational structure, design, and human resource management.",
      status: "Upcoming",
      href: "#"
    }
  ];

  const unit2Topics = [
    {
      id: 1,
      title: "Introduction to Macroeconomics",
      description: "Scope, importance, policy objectives, schools of thought, and limitations.",
      status: "Available",
      href: "/economics/1"
    },
    {
      id: 2,
      title: "National Income",
      description: "GDP, GNP, NNP, measurement methods, per capita income, and 20 worked examples.",
      status: "Available",
      href: "/economics/2"
    },
    {
      id: 3,
      title: "Money and Banking",
      description: "Functions of money, commercial banking, and central banking.",
      status: "Upcoming",
      href: "#"
    },
    {
      id: 4,
      title: "Fiscal Policy",
      description: "Government spending, taxation, and budget management.",
      status: "Upcoming",
      href: "#"
    },
    {
      id: 5,
      title: "Classical & Keynesian Theories",
      description: "Say's Law, consumption function, MPC, APC, APS, the multiplier, equilibrium income, and 20 worked examples.",
      status: "Available",
      href: "/economics/5"
    }
  ];

  return (
    <Layout breadcrumbs={[{ label: "Course Overview" }]}>
      <Helmet>
        <title>Study Notes — Business Management &amp; Economics</title>
        <meta name="description" content="Interactive, richly explained study notes for Business Management and Economics. Covers theory, real-world examples and fully worked calculations." />
        <meta property="og:title" content="Study Notes — Business Management &amp; Economics" />
        <meta property="og:description" content="Interactive, richly explained study notes for Business Management and Economics." />
        <meta property="og:image" content="https://notes.xwolf.space/og-home.svg" />
        <meta property="og:url" content="https://notes.xwolf.space/" />
        <meta name="twitter:title" content="Study Notes — Business Management &amp; Economics" />
        <meta name="twitter:image" content="https://notes.xwolf.space/og-home.svg" />
      </Helmet>
      <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16 space-y-16">

        {/* Unit 1 */}
        <section>
          <div className="mb-8">
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-3" data-testid="label-unit1">Unit 1</h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-foreground mb-4">
              Business Management
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A comprehensive study guide covering the fundamental principles, theories, and practices of modern business management.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {unit1Topics.map((topic) => (
              <Link
                key={topic.id}
                href={topic.href}
                className={`block transition-transform hover:-translate-y-1 duration-200 ${topic.status !== "Available" ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}`}
                data-testid={`card-unit1-topic-${topic.id}`}
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
        </section>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Unit 2 */}
        <section>
          <div className="mb-8">
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-3" data-testid="label-unit2">Unit 2</h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-foreground mb-4">
              Economics
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              An in-depth study of macroeconomic theory, policy, national income, money, and fiscal systems that govern modern economies.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {unit2Topics.map((topic) => (
              <Link
                key={topic.id}
                href={topic.href}
                className={`block transition-transform hover:-translate-y-1 duration-200 ${topic.status !== "Available" ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}`}
                data-testid={`card-unit2-topic-${topic.id}`}
              >
                <Card className="h-full border-border/60 shadow-sm hover:shadow-md transition-shadow bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold px-2 py-1 bg-secondary/10 text-secondary rounded-full">
                        Week {topic.id}
                      </span>
                      {topic.status === "Available" ? (
                        <TrendingUp className="h-4 w-4 text-primary" />
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
        </section>

      </div>
    </Layout>
  );
}
