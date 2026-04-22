import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Info, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";

const sections = [
  { id: "definition", label: "1. What is Macroeconomics?" },
  { id: "actual-potential", label: "2. Actual and Potential Output" },
  { id: "scope", label: "3. Scope and Importance" },
  { id: "objectives", label: "4. Policy Objectives" },
  { id: "history", label: "5. Historical Development" },
  { id: "schools", label: "6. Schools of Thought" },
  { id: "new-classical", label: "7. The New Classical School" },
  { id: "new-keynesian", label: "8. The New Keynesians" },
  { id: "controversy", label: "9. Economic Controversy" },
  { id: "limitations", label: "10. Limitations" },
];

function ExplainerBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 flex gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4">
      <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" />
      <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
    </div>
  );
}

function ExampleBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 flex gap-3 rounded-lg border border-secondary/30 bg-secondary/5 p-4">
      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
      <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
    </div>
  );
}

function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 flex gap-3 rounded-lg border border-amber-400/30 bg-amber-50 dark:bg-amber-900/10 p-4">
      <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
      <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
    </div>
  );
}

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 flex gap-3 rounded-lg border border-red-300/40 bg-red-50 dark:bg-red-900/10 p-4">
      <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
      <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
    </div>
  );
}

function QuoteBlock({ text, author }: { text: string; author?: string }) {
  return (
    <blockquote className="my-6 border-l-4 border-primary/40 pl-6 py-2">
      <p className="font-serif text-lg italic text-foreground/75 leading-relaxed">"{text}"</p>
      {author && <footer className="mt-2 text-sm text-muted-foreground">— {author}</footer>}
    </blockquote>
  );
}

function SectionHeading({ id, number, title }: { id: string; number: string; title: string }) {
  return (
    <div id={id} className="scroll-mt-20 pt-12 pb-4 border-b border-border/60 mb-6">
      <p className="text-xs font-bold tracking-widest text-primary uppercase mb-1">{number}</p>
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{title}</h2>
    </div>
  );
}

export default function EconomicsTopic1() {
  const [activeSection, setActiveSection] = useState("definition");
  const [readProgress, setReadProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docH > 0 ? Math.min(100, Math.round((scrollY / docH) * 100)) : 0);
      setShowScrollTop(scrollY > 400);

      const current = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          return el ? { id: s.id, top: el.getBoundingClientRect().top } : null;
        })
        .filter(Boolean)
        .filter((s) => s!.top <= 120);

      if (current.length > 0) setActiveSection(current[current.length - 1]!.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionIndex = sections.findIndex((s) => s.id === activeSection);
  const progress = Math.round(((sectionIndex + 1) / sections.length) * 100);

  return (
    <Layout
      breadcrumbs={[
        { label: "Unit 2", href: "/unit/2" },
        { label: "Week 1: Introduction to Macroeconomics" },
      ]}
    >
      <Helmet>
        <title>Introduction to Macroeconomics — Economics Week 1 | Study Notes</title>
        <meta name="description" content="Basic macroeconomic concepts, objectives, scope and key indicators. Unit 2 Economics Week 1 study notes with worked examples." />
        <meta property="og:title" content="Introduction to Macroeconomics — Unit 2 Economics" />
        <meta property="og:description" content="Basic macroeconomic concepts, objectives, scope and key indicators. Richly explained with real-world examples." />
        <meta property="og:image" content="https://notes.xwolf.space/og-eco-week1.svg" />
        <meta property="og:url" content="https://notes.xwolf.space/economics/1" />
        <meta name="twitter:title" content="Introduction to Macroeconomics | Study Notes" />
        <meta name="twitter:image" content="https://notes.xwolf.space/og-eco-week1.svg" />
      </Helmet>
      {/* Reading progress bar */}
      <div
        className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10"
        data-testid="progress-bar"
      >
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>
          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 1</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
              Introduction to Macroeconomics
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Macroeconomics examines the economy as a whole — looking at total employment, national output, price levels, and growth. This topic introduces its definition, scope, policy goals, historical evolution, competing schools of thought, and known limitations.
            </p>
          </div>

          {/* ===== SECTION 1 ===== */}
          <SectionHeading id="definition" number="Section 1" title="What is Macroeconomics?" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Economics is broadly divided into two branches: <strong>microeconomics</strong> and <strong>macroeconomics</strong>. Understanding the difference between them is the first step.
          </p>

          <ExplainerBox>
            <strong>Microeconomics</strong> zooms in — it studies individual consumers, firms, and markets. It assumes that all resources are fully employed and focuses on how prices are set and how scarce resources are allocated among competing uses. Think of it as studying individual trees in a forest.
            <br /><br />
            <strong>Macroeconomics</strong> zooms out — it looks at the forest as a whole. It studies the overall economy: total employment, the general price level (inflation), national income, and economic growth. Rather than asking "why did the price of rice rise?", macroeconomics asks "why did all prices in the economy rise?"
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Macroeconomics</strong> is the study of aggregates or averages covering the entire economy, such as:
          </p>
          <ul className="list-disc list-inside space-y-1 text-foreground/80 mb-4 ml-2">
            <li>Total employment and unemployment</li>
            <li>National income and national output</li>
            <li>Total savings and aggregate supply</li>
            <li>Aggregate demand</li>
            <li>The general price level, wage level, interest rates, and cost structures</li>
          </ul>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            It is known as <strong>aggregative economics</strong> — it examines the interrelations among various economy-wide aggregates, their determination, and the causes of fluctuations in them.
          </p>

          <ExampleBox>
            <strong>Real-world example:</strong> When the government says "inflation is at 8%", that is a macroeconomic statement. It is not about any one product's price — it is about the average price level across the whole economy. Similarly, when we say "unemployment is at 5%", we are talking about a macroeconomic aggregate, not any one industry.
          </ExampleBox>

          <QuoteBlock
            text="Macroeconomics deals with economic affairs in the large; it concerns the overall dimensions of economic life."
            author="Gardner Ackley"
          />

          <p className="text-base text-foreground/80 leading-relaxed mb-3">
            Macroeconomics is also known as the <strong>theory of income analysis</strong>. It is concerned with major real-world economic problems including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-2 mb-4">
            <li><strong>Unemployment:</strong> What causes it? What are its determinants?</li>
            <li><strong>Business cycles:</strong> How does investment affect total output, income, and employment?</li>
            <li><strong>Monetary issues:</strong> How does the total quantity of money affect the general price level?</li>
            <li><strong>International trade:</strong> What are the problems of the balance of payments and foreign aid?</li>
            <li><strong>Economic growth:</strong> What factors hold back growth, and what puts a country on the path of development?</li>
          </ul>

          {/* ===== SECTION 2 ===== */}
          <SectionHeading id="actual-potential" number="Section 2" title="Actual and Potential Output" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Most macroeconomic theory revolves around two fundamental questions. These distinctions — between what an economy <em>can</em> produce and what it <em>actually</em> produces — are among the most important ideas in all of economics.
          </p>

          <ExplainerBox>
            <strong>Potential Output</strong> is the maximum level of goods and services an economy can produce when all its resources (labour, capital, land) are fully and efficiently employed. Think of it as the economy running at 100% capacity — no idle workers, no unused factories.
            <br /><br />
            <strong>Actual Output</strong> is what the economy really produces in a given period. In reality, economies almost never hit their potential — there are always some unemployed workers, idle machines, or underused resources.
            <br /><br />
            The <strong>gap between actual and potential output</strong> is called the <em>output gap</em>. A negative output gap means the economy is underperforming — people are unemployed, incomes are lower, and resources are wasted.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-3">
            The three central questions of macroeconomics are:
          </p>

          <div className="space-y-4 mb-6">
            <Card className="border-border/60 bg-card/50">
              <CardContent className="p-4">
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Question 1 — Growth Theory</p>
                <p className="font-semibold text-foreground mb-1">What determines the path of full employment (potential output)?</p>
                <p className="text-sm text-muted-foreground">
                  This is the question of <strong>growth theory</strong>. It asks: why does one country grow faster than another? Why has South Korea's economy grown dramatically since the 1960s while others have stagnated? Answers involve factors like investment in capital, technology, education, and population growth.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/50">
              <CardContent className="p-4">
                <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Question 2 — Income Determination</p>
                <p className="font-semibold text-foreground mb-1">What determines actual output relative to potential at any time?</p>
                <p className="text-sm text-muted-foreground">
                  This is the question of <strong>income determination</strong> or <strong>stabilization theory</strong>. Even if a country has high potential, its actual output can fall short — for example during a recession. Understanding this gap helps governments design policies to restore full employment.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/50">
              <CardContent className="p-4">
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">Question 3 — Inflation</p>
                <p className="font-semibold text-foreground mb-1">What determines the behavior of the price level (the rate of inflation)?</p>
                <p className="text-sm text-muted-foreground">
                  This is added to the second question. When an economy pushes too close to its potential output, prices tend to rise — this is inflation. Understanding what drives inflation, and how to control it without causing unnecessary unemployment, is one of the most debated topics in economics.
                </p>
              </CardContent>
            </Card>
          </div>

          <ExampleBox>
            <strong>Example:</strong> Imagine Kenya's potential GDP (what it could produce with full employment) is KSh 10 trillion. But in 2023, actual GDP was only KSh 8.5 trillion. That KSh 1.5 trillion gap represents unemployed workers, idle factories, and lost income. Macroeconomic policy — like government spending or interest rate cuts — aims to close this gap.
          </ExampleBox>

          {/* ===== SECTION 3 ===== */}
          <SectionHeading id="scope" number="Section 3" title="Scope and Importance of Macroeconomics" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Macroeconomics is of enormous theoretical and practical value. Here is why it matters:
          </p>

          <div className="space-y-6 mb-6">
            <div>
              <h3 className="font-semibold text-foreground text-lg mb-2">1. To Understand the Workings of the Economy</h3>
              <p className="text-base text-foreground/80 leading-relaxed mb-2">
                The study of macroeconomic variables is indispensable for understanding how an economy functions. Our main economic problems — fluctuating income, unemployment, and changing price levels — are all macro in nature. These variables are statistically measurable, which means they can be tracked over time and analyzed scientifically.
              </p>
              <p className="text-base text-foreground/80 leading-relaxed mb-2">
                As Tinbergen observed, macroeconomic concepts help in <em>"making the elimination process understandable and transparent."</em>
              </p>
              <ExampleBox>
                <strong>Example:</strong> You may not agree on the best method to measure every individual price (the price of maize vs. the price of medicine), but looking at the <em>general price level</em> (consumer price index) helps us understand whether the economy is experiencing inflation or deflation. Without this aggregate view, policymakers would be lost.
              </ExampleBox>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-lg mb-2">2. Usefulness in Economic Policy</h3>
              <p className="text-base text-foreground/80 leading-relaxed mb-2">
                Macroeconomics is extremely useful from the standpoint of economic policy. Modern governments — especially those of developing (underdeveloped) economies — face enormous national problems such as:
              </p>
              <ul className="list-disc list-inside space-y-1 text-foreground/80 ml-2 mb-3">
                <li>Overpopulation growing faster than job creation</li>
                <li>Persistent inflation eroding household purchasing power</li>
                <li>Chronic balance of payments deficits (spending more on imports than earning from exports)</li>
                <li>Underproduction — the economy not reaching its potential</li>
              </ul>
              <p className="text-base text-foreground/80 leading-relaxed mb-2">
                Governments regulate and control these problems through macroeconomic tools. As Tinbergen states: <em>"Working with macroeconomic concepts is a bare necessity in order to contribute to solutions of the great problems of our times."</em>
              </p>
              <p className="text-sm font-semibold text-foreground/80 mb-2 mt-3">Macroeconomics provides solutions in the following areas:</p>
              <ul className="list-disc list-inside space-y-1 text-foreground/80 ml-2 mb-3">
                <li>General employment — designing policies to reduce unemployment</li>
                <li>National income — measuring and growing the economy's total output</li>
                <li>Economic growth — identifying and nurturing drivers of long-term development</li>
                <li>Monetary problems — controlling inflation and managing money supply</li>
                <li>Business cycles — smoothing out the boom-and-bust swings in economic activity</li>
                <li>Understanding the behaviour of individual units (see point 3 below)</li>
              </ul>
              <ExampleBox>
                <strong>Example:</strong> During the COVID-19 pandemic, governments worldwide used macroeconomic tools — massive fiscal stimulus (government spending), near-zero interest rates, and quantitative easing — to prevent economies from collapsing. These decisions were guided by macroeconomic theory.
              </ExampleBox>
            </div>

            <div>
              <h3 className="font-semibold text-foreground text-lg mb-2">3. For Understanding the Behaviour of Individual Units</h3>
              <p className="text-base text-foreground/80 leading-relaxed mb-2">
                This is perhaps the most surprising insight: you cannot fully understand individual behaviour without first understanding the macroeconomy. This makes macroeconomics indispensable even to business managers and investors.
              </p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-2 mb-3">
                <li>
                  <strong>Demand for products</strong> depends on <em>aggregate demand</em> in the economy. Unless we understand why aggregate demand is falling, we cannot explain why demand for any specific product has declined.
                </li>
                <li>
                  <strong>Costs of a particular firm or industry</strong> cannot be properly analyzed without knowing the average cost conditions of the <em>whole economy</em> (e.g., if wages across the economy are rising, every firm's labour costs will rise).
                </li>
              </ul>
              <ExampleBox>
                <strong>Example:</strong> A restaurant owner notices that customers are spending less. Is it because her food quality dropped? Or is it because overall consumer spending in the economy has declined due to a recession? Without macroeconomic analysis, she cannot answer this question — or find the right solution.
              </ExampleBox>
            </div>
          </div>

          {/* ===== SECTION 4 ===== */}
          <SectionHeading id="objectives" number="Section 4" title="Macro-Economic Policy Objectives" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Governments do not manage the economy randomly — they pursue specific, well-defined policy objectives. These are the goals that every national government strives to achieve through its economic policies.
          </p>

          <div className="space-y-5 mb-4">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">i</span>
                Full Employment
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                One of the primary objectives of all governments is to achieve <strong>full employment</strong> — a situation in which everyone who wants to work and is capable of working can find a job. Economists acknowledge that there will always be some level of unemployment (due to people between jobs or changing careers), so "full employment" does not literally mean zero unemployment. In practice, many economists consider an unemployment rate of around 4–5% as consistent with "full employment."
              </p>
              <ExampleBox>
                <strong>Example:</strong> When unemployment rises sharply during a recession — as it did in many countries during the 2008 Global Financial Crisis — governments respond with stimulus packages and interest rate cuts to revive hiring and reduce joblessness.
              </ExampleBox>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">ii</span>
                Control of Inflation
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                Most monetarists believe that inflation has a negative effect on economic growth because it increases uncertainty and discourages savings and investment. When prices rise unpredictably, businesses cannot plan effectively, and citizens lose confidence in the currency. Maintaining <strong>stable prices</strong> is therefore a major objective of most governments and central banks.
              </p>
              <ExampleBox>
                <strong>Example:</strong> Zimbabwe's hyperinflation in 2008 is a textbook warning: prices doubled every day. The currency became worthless, savings were wiped out, and the economy collapsed. This shows why price stability is treated as a critical policy goal.
              </ExampleBox>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">iii</span>
                High Economic Growth Rates
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                For most people, <strong>economic growth</strong> remains the prime objective of policy, as it allows everyone to enjoy a better standard of living. Growth means more goods and services, higher incomes, better healthcare, and improved education. A growing economy can also afford better social services without raising tax rates.
              </p>
              <ExampleBox>
                <strong>Example:</strong> China's GDP grew at an average of 10% per year for three decades (1980–2010). This sustained growth lifted over 800 million people out of poverty — the largest poverty reduction in human history.
              </ExampleBox>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">iv</span>
                Balance of Payments Equilibrium
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                The <strong>balance of payments</strong> is a record of all economic transactions between a country and the rest of the world. Most governments aim for an equilibrium position — neither running large deficits (importing much more than exporting) nor large surpluses. Both extremes create problems:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80 ml-2 mb-2">
                <li>A persistent <strong>deficit</strong> means the country is borrowing from abroad, leading to debt and currency depreciation.</li>
                <li>A persistent <strong>surplus</strong> can cause trade tensions with other countries and overheating of the domestic economy.</li>
              </ul>
              <ExampleBox>
                <strong>Example:</strong> Many African countries run persistent balance of payments deficits because they import more oil, machinery, and manufactured goods than they export. This strains their foreign exchange reserves and weakens their currencies.
              </ExampleBox>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">v</span>
                Equitable Distribution of Income
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                Economic growth alone is not enough if the gains are concentrated in the hands of a few. Governments aim for <strong>equitable distribution of income</strong> — ensuring that the benefits of growth are shared broadly across society. This is pursued through progressive taxation (higher earners pay more), social welfare programmes, free public services, and minimum wage laws.
              </p>
              <ExampleBox>
                <strong>Example:</strong> South Africa has one of the highest levels of income inequality in the world (as measured by the Gini coefficient), despite having a relatively large economy. This shows that growth without redistribution leaves millions in poverty.
              </ExampleBox>
            </div>
          </div>

          {/* ===== SECTION 5 ===== */}
          <SectionHeading id="history" number="Section 5" title="Development of Macroeconomic Theory" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Modern macroeconomics did not emerge in a vacuum — it grew out of real crises and historical events. Understanding this timeline helps you appreciate why economists think the way they do today.
          </p>

          <ExplainerBox>
            Before the 1930s, most economists believed that markets were self-correcting — that if unemployment rose, wages would simply fall until firms hired everyone back. The economy would always return to full employment on its own. This "classical" view was shattered by the Great Depression.
          </ExplainerBox>

          <div className="space-y-6 mb-4">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">1</div>
                <div className="w-0.5 bg-border flex-1 mt-2" />
              </div>
              <div className="pb-6">
                <p className="font-semibold text-foreground mb-1">The Great Depression (1930s) — Birth of Modern Macroeconomics</p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Partly as a reaction to the Great Depression of the 1930s, and with the publication of John Maynard Keynes' landmark work <em>The General Theory of Employment, Interest and Money</em> in 1936, modern macroeconomics developed as an analytical framework for understanding large, prolonged fluctuations in employment.
                </p>
                <ExampleBox>
                  During the Great Depression, US unemployment reached 25%. Millions of capable workers wanted jobs but could not find them. Classical economics had no good explanation. Keynes argued that the problem was insufficient <em>aggregate demand</em> — people and businesses were not spending enough — and that governments needed to step in and spend to restore employment.
                </ExampleBox>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">2</div>
                <div className="w-0.5 bg-border flex-1 mt-2" />
              </div>
              <div className="pb-6">
                <p className="font-semibold text-foreground mb-1">1950 to Early 1970s — Demand-Side Dominance</p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  From 1950 to the early 1970s, post-Keynesian macroeconomic analysis focused almost exclusively on fluctuations in employment caused by changes in <strong>aggregate demand</strong>. Economists believed they had largely solved the problem of large-scale recessions. During this period — from World War II to 1972 — the US economy generally operated close to full employment. Any recessions (1949, 1954, 1958, 1961, 1970) were mild compared with the catastrophic unemployment of the 1930s.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">3</div>
                <div className="w-0.5 bg-border flex-1 mt-2" />
              </div>
              <div className="pb-6">
                <p className="font-semibold text-foreground mb-1">1974 — The Supply-Side Shock</p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  In 1974, a deep recession developed that had its origins not in falling demand but in a shift in <strong>aggregate supply</strong> — mainly from the first major oil price increase (OPEC's oil embargo). This caught mainstream economics largely off guard. By 1975, the unemployment rate reached 9% and the inflation rate hit 10%. This event forced macroeconomists to start studying the <strong>supply side</strong> of the economy, completing the story begun on the demand side.
                </p>
                <ExampleBox>
                  When oil prices quadrupled in 1973–74, production costs rose across every sector of the economy — transport, manufacturing, agriculture. Firms cut production and laid off workers while simultaneously raising prices. This combination of high unemployment AND high inflation — called "stagflation" — had been thought impossible under the Keynesian framework.
                </ExampleBox>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">4</div>
                <div className="w-0.5 bg-border flex-1 mt-2" />
              </div>
              <div className="pb-6">
                <p className="font-semibold text-foreground mb-1">1980 — Inflation Expectations Enter the Picture</p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  In 1980, demand expansion and the second oil price increase pushed inflation back above 10%. The deep recession of 1982 brought unemployment above 10%, but reduced inflation surprisingly quickly. This illustrated the crucial role of <strong>inflation expectations</strong>: when a central bank credibly commits to fighting inflation, people adjust their expectations and inflation falls faster than models predicted. Since the 1970s, macroeconomists have increasingly integrated <strong>expectations</strong> into their analysis of the economy.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">5</div>
              </div>
              <div className="pb-0">
                <p className="font-semibold text-foreground mb-1">The Neoclassical Synthesis</p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  One important result of the development of modern macroeconomics — which taught us how to maintain full employment — is that it restores the relevance of classical microeconomics. This is described by Paul Samuelson's term the <strong>neoclassical synthesis</strong>: once the economy is operating near full employment, the classical theory of optimal resource allocation becomes valid again. Increases in output under full employment conditions do have real opportunity costs.
                </p>
                <ExampleBox>
                  For example, a $25 billion increase in US defense spending from mid-1965 to mid-1967 — once the economy had already reached full employment in 1965 — had to come from reduced output somewhere else. It came mainly from reduced housing construction and consumer durable goods, at a time when family formation was soaring. Macroeconomics helped explain exactly what was sacrificed.
                </ExampleBox>
              </div>
            </div>
          </div>

          {/* ===== SECTION 6 ===== */}
          <SectionHeading id="schools" number="Section 6" title="Schools of Thought in Macroeconomics" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            There have long been two major intellectual traditions in macroeconomics. This debate goes to the heart of economics and politics: <strong>how much should governments intervene in the economy?</strong>
          </p>

          <ExplainerBox>
            Think of it this way: one group of economists believes that free markets, left largely alone, will naturally find the best outcomes for everyone — government interference usually makes things worse. The other group believes that markets sometimes fail, and that smart government policy can improve economic performance and reduce suffering.
          </ExplainerBox>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">1960s: Monetarists vs. Keynesians</h3>
              <ul className="text-sm text-foreground/80 space-y-2">
                <li><strong>Monetarists</strong> (led by Milton Friedman): Markets work best when left alone. The money supply is the key driver of economic activity and inflation. Government should follow fixed rules for money growth rather than discretionary intervention.</li>
                <li><strong>Keynesians</strong> (including Franco Modigliani, James Tobin): Government can and should use fiscal and monetary policy to stabilize the economy, especially during recessions when markets fail to self-correct.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">1970s onwards: New Classical vs. New Keynesians</h3>
              <ul className="text-sm text-foreground/80 space-y-2">
                <li><strong>New Classical macroeconomists</strong>: Replaced monetarists as the main critics of active government policy. They argue that markets clear quickly and that people are rational — so government intervention is largely ineffective or counterproductive.</li>
                <li><strong>New (third-generation) Keynesians</strong>: Moved beyond original Keynesian ideas but retained the core belief that government policy can help the economy perform better, especially because markets are not always perfectly efficient.</li>
              </ul>
            </div>
          </div>

          {/* ===== SECTION 7 ===== */}
          <SectionHeading id="new-classical" number="Section 7" title="The New Classical School" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The New Classical macroeconomics developed in the 1970s and remained highly influential through the 1980s. Its key leaders include <strong>Robert Lucas, Thomas Sargent, Robert Barro, Edward Prescott, and Neil Wallace</strong> — all associated with the University of Minnesota.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            This school sees the world as one in which individuals act rationally in their self-interest in markets that adjust rapidly to changing conditions. It argues that the government is likely to make things worse, not better, by intervening.
          </p>

          <NoteBox>
            The New Classical approach challenges traditional macroeconomics, which views the economy as adjusting <em>sluggishly</em> — with slowly responding prices, poor information, and social norms impeding the rapid clearing of markets. New Classical economists reject this view and assume markets work quickly and efficiently.
          </NoteBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-3 font-semibold">
            The three central working assumptions of the New Classical School:
          </p>

          <div className="space-y-4 mb-6">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">Assumption 1: Economic Agents Maximize</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Households and firms make <strong>optimal decisions</strong>. They use all available information and always choose the best possible option given their circumstances. There are no "mistakes" or irrational behaviour — everyone is doing the best they can with what they have.
              </p>
              <ExampleBox>
                A household decides how much to spend and save. A new classical economist assumes this household looks at its current income, expected future income, interest rates, and all other available information, then makes the mathematically optimal saving/spending decision.
              </ExampleBox>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">Assumption 2: Rational Expectations</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                Expectations are <strong>rational</strong> — meaning they are statistically the best predictions of the future possible using available information. People do not consistently make systematic errors in forecasting.
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                A critical implication: people will eventually come to understand whatever government policy is being used. It is not possible to "fool most of the people most of the time." If the government repeatedly expands the money supply to stimulate employment, people will anticipate this and adjust wages and prices accordingly — neutralizing the policy's intended effect.
              </p>
              <NoteBox>
                This is why the school is sometimes called the <strong>Rational Expectations School</strong>, even though rational expectations are only one part of its broader theoretical approach.
              </NoteBox>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">Assumption 3: Markets Clear</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                There is no reason why firms or workers would fail to adjust wages or prices if doing so would make them better off. Accordingly, <strong>prices and wages adjust to equate supply and demand</strong> — markets clear. There are no persistent surpluses or shortages.
              </p>
              <ExampleBox>
                If there are 1,000 job seekers and only 800 jobs available, wages will fall until employers are willing to hire all 1,000 — or until 200 workers voluntarily choose not to work at the lower wage. Either way, there is no involuntary unemployment. Any unemployed person who truly wants a job will offer to accept a lower wage until an employer hires them.
              </ExampleBox>
            </div>
          </div>

          <p className="text-base text-foreground/80 leading-relaxed mb-3 font-semibold">
            The dramatic implication of these three assumptions:
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            There is <strong>no possibility for involuntary unemployment</strong>. Any unemployed person who really wants a job will offer to cut their wage until it is low enough to attract an employer. Similarly, any firm with unsold goods will cut prices to sell them. Flexible wages and prices ensure everyone always works as much as they want and firms produce as much as they want.
          </p>

          <QuoteBlock
            text="There are no $50 bills lying on the sidewalk."
            author="Robert Lucas"
          />

          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            Lucas meant that if there were obvious ways for individuals to improve their situation, they would already have done so. There are no unexploited profit opportunities in a world of rational, maximizing agents. The essence of the New Classical approach is the assumption that markets are continuously in equilibrium.
          </p>

          <WarningBox>
            New Classical economists do not deny that the Great Depression happened or that unemployment sometimes exceeds 10%. They have developed alternative explanations — such as "real business cycle theory" — that try to account for high unemployment while still maintaining that markets work correctly. They argue high unemployment in a recession reflects workers <em>voluntarily</em> choosing to work less (due to temporarily low wages) rather than being involuntarily unemployed.
          </WarningBox>

          {/* ===== SECTION 8 ===== */}
          <SectionHeading id="new-keynesian" number="Section 8" title="The New Keynesians" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The New Classical group remains highly influential. But a new generation of scholars — the <strong>New Keynesians</strong>, mostly trained in the Keynesian tradition but moving beyond it — emerged in the 1980s.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-3">
            Key scholars include: <strong>George Akerlof, Janet Yellen, David Romer</strong> (UC Berkeley), <strong>Olivier Blanchard</strong> (MIT), <strong>Greg Mankiw, Lawrence Summers</strong> (Harvard), and <strong>Ben Bernanke</strong> (Princeton — later became Chairman of the US Federal Reserve and won the Nobel Prize in 2022).
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            New Keynesians <strong>do not believe that markets clear all the time</strong>. Instead, they seek to understand and explain exactly why markets sometimes fail — providing a rigorous, microeconomic foundation for why prices and wages can be "sticky."
          </p>

          <ExplainerBox>
            <strong>The core New Keynesian insight: Price and Wage Rigidities</strong>
            <br /><br />
            Both information problems and the costs of changing prices lead to "price rigidities" — situations where prices do not adjust as quickly as New Classical models assume. When prices are rigid (slow to change), markets do not clear quickly, and the economy can get stuck in a recession with high unemployment for an extended period.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-3">
            New Keynesians argue that markets sometimes fail to clear even when individuals are acting rationally in their own self-interest:
          </p>

          <ul className="space-y-4 mb-6">
            <li className="rounded-lg border border-border/60 bg-card/50 p-4">
              <p className="font-semibold text-foreground mb-1">Wage Rigidity (Efficiency Wages)</p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                In the labour market, firms that cut wages not only reduce their costs but also risk ending up with a lower-quality workforce. Workers who feel underpaid become less motivated, may shirk their duties, or leave for better opportunities. To maintain productivity, firms are reluctant to cut wages — even during a recession when lower wages would theoretically "clear" the labour market.
              </p>
              <ExampleBox>
                A software company's engineers are earning $5,000/month. During a downturn, the company considers cutting wages to $3,500. But they fear the best engineers — who have other options — will leave immediately, while mediocre workers stay. So the company is reluctant to cut wages even when facing losses.
              </ExampleBox>
            </li>
            <li className="rounded-lg border border-border/60 bg-card/50 p-4">
              <p className="font-semibold text-foreground mb-1">Price Rigidity (Menu Costs)</p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                It is costly for firms to change the prices they charge (think of a restaurant printing new menus, or a supermarket repricing every item). If all firms adjust prices infrequently, the economy-wide price level may not be flexible enough to avoid periods of high unemployment. Individual rationality (not wanting to bear the cost of repricing) leads to collective failure (the whole economy is stuck with inappropriate price levels).
              </p>
            </li>
          </ul>

          <NoteBox>
            New Keynesian economics forms the theoretical foundation of modern central bank policy. The idea that wages and prices are sticky — that markets do not clear instantly — justifies why central banks adjust interest rates to smooth out recessions and prevent unemployment from spiraling. Ben Bernanke's research on exactly this topic influenced how the US Federal Reserve responded to the 2008 financial crisis.
          </NoteBox>

          {/* ===== SECTION 9 ===== */}
          <SectionHeading id="controversy" number="Section 9" title="Economic Controversy" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            There is no denying that conflicts of opinion and even theory exist between the different camps in macroeconomics. Because macroeconomics deals with the real world — real people's jobs, savings, and livelihoods — these differences are inevitably highlighted in political and media discussions of economic policy.
          </p>

          <ExplainerBox>
            Think of it as two qualified doctors disagreeing on the best treatment for a patient. Both have evidence. Both want the patient to recover. But they prescribe different medicines. The difference is that in macroeconomics, the "patient" is the entire economy, and the "medicine" affects millions of people simultaneously.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Despite these disagreements, significant areas of consensus exist. The different groups — through ongoing discussion and research — continually evolve toward new shared understandings and identify more precisely where their true disagreements lie.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            For instance, there is now an emerging consensus on the <strong>importance of information problems for wage and price setting and economic fluctuations</strong>. Both camps increasingly agree that imperfect information — the fact that workers, firms, and governments do not always have all the information they need — is a major driver of economic instability. This represents real scientific progress.
          </p>

          {/* ===== SECTION 10 ===== */}
          <SectionHeading id="limitations" number="Section 10" title="Limitations of Macroeconomics" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            While macroeconomics is powerful, it has important limitations. Most of these arise when we try to draw conclusions about the whole economy from the behaviour of its parts — or vice versa. The economist Kenneth Boulding calls these the <strong>"macroeconomic paradoxes."</strong>
          </p>

          <div className="space-y-5 mb-4">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2 flex gap-2 items-start">
                <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                Fallacy of Composition
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                The <strong>fallacy of composition</strong> occurs when we assume that what is true for one individual must be true for all individuals collectively. Aggregate economic behaviour is more than just the sum of individual actions — and what benefits an individual can harm the whole economy.
              </p>
              <WarningBox>
                <strong>The Paradox of Thrift:</strong> Saving is a private virtue — if you save more, your personal financial security improves. But if everyone saves more simultaneously, total spending in the economy falls. Less spending means less income for businesses, which leads to layoffs, which reduces incomes further. A nation of savers can accidentally trigger a recession. This is precisely the situation Keynes described during the Great Depression.
                <br /><br />
                <strong>Bank Run Example:</strong> If one depositor withdraws money from a bank, no harm is done. But if all depositors simultaneously withdraw their money (a "bank run"), the banking system collapses — as happened repeatedly in the 1930s and dramatically in 2008 with Lehman Brothers.
              </WarningBox>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2 flex gap-2 items-start">
                <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                Treating Aggregates as Homogeneous
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                Macroeconomics often groups very different things into a single number, hiding important internal differences. The average wage, for instance, is the sum total of wages in all occupations — clerks, typists, teachers, nurses — bundled into one figure. But the real economic story may be in the composition of that average, not the average itself.
              </p>
              <ExampleBox>
                Suppose nurses' wages increase but typists' wages fall. The <em>average</em> wage across the economy remains unchanged. However, if the employment of nurses falls slightly while employment of typists rises substantially, <em>total employment in the economy increases</em> — even though the average wage is flat. Macroeconomic data showing a stable average wage would completely miss this important shift.
              </ExampleBox>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2 flex gap-2 items-start">
                <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
                Aggregate Variables May Not Be Meaningful
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                An increase in an aggregate variable does not automatically mean that all individuals have benefited. The aggregate may be rising for the wrong reasons.
              </p>
              <ExampleBox>
                <strong>National income example:</strong> Suppose national income rises by 10% in a year. This sounds like good news. But if this increase was entirely due to a doubling of income among the top 1% of wealthy citizens, while the bottom 50% experienced no improvement, then the "rise in national income" has little significance for the majority of the population. This is why economists complement GDP figures with inequality measures like the Gini coefficient.
              </ExampleBox>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2 flex gap-2 items-start">
                <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">4</span>
                Indiscriminate Use is Misleading
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                Macroeconomic tools and policy measures are designed for economy-wide problems. Applying them without discrimination to specific industries or firms can be irrelevant or even harmful.
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80 ml-2">
                <li>If the overall economy has full employment but a specific region or industry faces structural unemployment (e.g., coal miners losing jobs to automation), general macro stimulus will not help those workers retrain or relocate. Targeted policies are needed.</li>
                <li>Similarly, measures designed to control general inflation (like raising interest rates) cannot effectively control the price of a specific product (like petrol), which may be rising for supply-side reasons unrelated to overall demand.</li>
              </ul>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2 flex gap-2 items-start">
                <span className="w-6 h-6 rounded-full bg-destructive/10 text-destructive text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">5</span>
                Statistical and Conceptual Difficulties
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                The measurement of macroeconomic variables involves significant statistical and conceptual challenges. Problems arise particularly in the process of <strong>aggregation</strong> — combining many different things into a single number.
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-foreground/80 ml-2">
                <li>If the underlying individual units being aggregated are very similar, aggregation works reasonably well.</li>
                <li>But if the micro-level variables relate to highly diverse individual units — different industries, regions, types of workers — bundling them into one macroeconomic variable can produce a misleading or even meaningless number.</li>
              </ul>
              <ExampleBox>
                How do you aggregate the "output" of a nurse (a service that may save a life) with the output of a factory producing luxury handbags? Both are measured in monetary value, but they serve very different social purposes. The GDP figure that combines them may obscure as much as it reveals.
              </ExampleBox>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="mt-12 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 1: Introduction to Macroeconomics</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Macroeconomics</strong> studies the economy as a whole — total income, employment, price levels, and growth.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>Its three core questions concern <strong>potential output</strong> (growth theory), <strong>actual output</strong> (income determination), and <strong>inflation</strong>.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>It is critical for <strong>understanding the economy</strong>, formulating <strong>economic policy</strong>, and even understanding <strong>individual firms</strong>.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>The five main <strong>policy objectives</strong>: full employment, price stability, growth, balance of payments equilibrium, and equitable income distribution.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>Modern macroeconomics emerged from Keynes' response to the Great Depression (1936); it evolved through oil crises (1974), stagflation, and rational expectations debates.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>New Classical</strong>: markets clear, agents are rational, government intervention is ineffective.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>New Keynesian</strong>: markets sometimes fail due to price and wage rigidities — government policy can help.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>Key limitations: fallacy of composition, treating aggregates as homogeneous, misleading aggregates, indiscriminate application, and statistical difficulties.</span></li>
            </ul>
          </div>

          <div className="h-16" />
        </div>

        {/* Table of Contents (desktop) */}
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-24 space-y-1">
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">Contents</p>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`block text-xs py-1 px-2 rounded transition-colors ${
                  activeSection === s.id
                    ? "text-primary font-semibold border-l-2 border-primary pl-3"
                    : "text-muted-foreground hover:text-foreground border-l-2 border-transparent pl-3"
                }`}
                data-testid={`toc-${s.id}`}
              >
                {s.label}
              </a>
            ))}
            <div className="pt-6 border-t border-border mt-4">
              <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">Study Progress</p>
              <p className="text-xs text-muted-foreground mb-1">
                Section {sectionIndex + 1} of {sections.length}
                <span className="ml-1 text-primary font-semibold">{progress}%</span>
              </p>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
          data-testid="btn-scroll-top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </Layout>
  );
}
