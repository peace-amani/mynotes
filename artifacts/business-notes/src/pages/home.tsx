import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, TrendingUp, Globe } from "lucide-react";

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

  const unit3Topics = [
    { id: 1, week: 1, title: "Introduction to Sociology", description: "Definition (Comte, Durkheim, Weber, Mills), nature and scope, relationship with other social sciences, importance, and founding figures.", status: "Available", href: "/society/1" },
    { id: 2, week: 2, title: "Society", description: "Meaning and definitions of society, theories of origin (Divine, Force, Social Contract), 10 characteristics, and community vs. society.", status: "Available", href: "/society/2" },
    { id: 3, week: 3, title: "Urban & Rural Community", description: "Characteristics of rural vs urban, push/pull factors of migration, problems of rural-urban migration, and environmental management.", status: "Available", href: "/society/3" },
    { id: 4, week: 4, title: "Socialization", description: "Daniella's story, definitions, factors (imitation, suggestion, identification, language), agencies, types, and characteristics.", status: "Available", href: "/society/4" },
    { id: 5, week: 5, title: "Culture", description: "E.B. Taylor's definition, 7 characteristics, and elements: symbols, language, values, norms, folkways, mores, and taboos.", status: "Available", href: "/society/5" },
    { id: 6, week: 6, title: "Social Change", description: "Meaning, characteristics, traditional vs modernity vs westernisation, factors, social movements, themes of change, and consequences.", status: "Available", href: "/society/6" },
    { id: 8, week: 8, title: "Leadership & Group Dynamics", description: "Attitude formation and change, leadership theories and styles (autocratic, democratic, transformational), and Tuckman's 5 group stages.", status: "Available", href: "/society/8" },
    { id: 9, week: 9, title: "Social Processes", description: "Competition, Conflict, Cooperation, Accommodation and Negotiation — meaning, characteristics, importance, and using each to solve social problems.", status: "Available", href: "/society/9" },
    { id: 10, week: 10, title: "Human Rights", description: "Individual rights, citizen rights, sex vs gender concept, types of gender-based violence, and gender mainstreaming strategies.", status: "Available", href: "/society/10" },
    { id: 11, week: 11, title: "Civil Education", description: "Kenya's 3 arms of government, devolution (national vs county), constitutionalism, and the history of constitution-making in Kenya.", status: "Available", href: "/society/11" },
    { id: 12, week: 12, title: "Emerging Issues", description: "Corruption, marriage and its challenges, individual and workplace stress, alcohol abuse, and suicide — causes, effects, and responses.", status: "Available", href: "/society/12" },
  ];

  return (
    <Layout breadcrumbs={[{ label: "Course Overview" }]}>
      <Helmet>
        <title>Study Notes — Business Management, Economics &amp; Society</title>
        <meta name="description" content="Interactive, richly explained study notes for Business Management, Economics, and Society & Culture. Covers theory, real-world examples and fully worked calculations." />
        <meta property="og:title" content="Study Notes — Business Management, Economics &amp; Society" />
        <meta property="og:description" content="Interactive, richly explained study notes for Business Management, Economics, and Society & Culture." />
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

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Unit 3 */}
        <section>
          <div className="mb-8">
            <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-3" data-testid="label-unit3">Unit 3</h2>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight text-foreground mb-4">
              Society &amp; Culture
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              An exploration of how human societies are formed, how individuals are shaped by socialization, and how culture — its symbols, language, values, and norms — defines what it means to be human. (UCCC 1103)
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {unit3Topics.map((topic) => (
              <Link
                key={topic.id}
                href={topic.href}
                className={`block transition-transform hover:-translate-y-1 duration-200 ${topic.status !== "Available" ? "opacity-60 cursor-not-allowed pointer-events-none" : ""}`}
                data-testid={`card-unit3-topic-${topic.id}`}
              >
                <Card className="h-full border-border/60 shadow-sm hover:shadow-md transition-shadow bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                        Week {topic.week}
                      </span>
                      {topic.status === "Available" ? (
                        <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
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
