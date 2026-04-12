import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Info, Lightbulb, AlertTriangle, CheckCircle2, Calculator } from "lucide-react";

const sections = [
  { id: "meaning", label: "1. Meaning of National Income" },
  { id: "concepts", label: "2. Key Concepts" },
  { id: "accounting", label: "3. National Income Accounting" },
  { id: "approaches", label: "4. Measurement Approaches" },
  { id: "difficulties", label: "5. Measurement Difficulties" },
  { id: "factors", label: "6. Factors Affecting Size" },
  { id: "uses", label: "7. Uses of NI Statistics" },
  { id: "real-nominal", label: "8. Real vs Nominal GNP" },
  { id: "percapita", label: "9. Per Capita Income" },
  { id: "welfare", label: "10. NI and Welfare" },
  { id: "standards", label: "11. NI and Living Standards" },
  { id: "calculations", label: "12. Worked Examples (20)" },
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

function SectionHeading({ id, number, title }: { id: string; number: string; title: string }) {
  return (
    <div id={id} className="scroll-mt-20 pt-12 pb-4 border-b border-border/60 mb-6">
      <p className="text-xs font-bold tracking-widest text-primary uppercase mb-1">{number}</p>
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{title}</h2>
    </div>
  );
}

function CalcBox({ number, title, difficulty, children }: {
  number: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  children: React.ReactNode;
}) {
  const colors = {
    Easy: "bg-green-50 dark:bg-green-900/10 border-green-300/40 text-green-700 dark:text-green-400",
    Medium: "bg-amber-50 dark:bg-amber-900/10 border-amber-300/40 text-amber-700 dark:text-amber-400",
    Hard: "bg-red-50 dark:bg-red-900/10 border-red-300/40 text-red-700 dark:text-red-400",
  };
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 overflow-hidden mb-6" data-testid={`calc-${number}`}>
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border/40 bg-muted/30">
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">
          {number}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground text-sm">{title}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colors[difficulty]}`}>
          {difficulty}
        </span>
      </div>
      <div className="px-5 py-4 text-sm text-foreground/80 leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

function MathLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-sm bg-muted/60 rounded px-4 py-2 border border-border/40 my-2 overflow-x-auto whitespace-pre">
      {children}
    </div>
  );
}

export default function EconomicsTopic2() {
  const [activeSection, setActiveSection] = useState("meaning");
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
        { label: "Week 2: National Income Analysis" },
      ]}
    >
      <Helmet>
        <title>National Income Analysis — Economics Week 2 | Study Notes</title>
        <meta name="description" content="GDP, GNP, NNP, circular flow, three measurement approaches, real vs nominal income and 20 worked examples." />
        <meta property="og:title" content="National Income Analysis — Unit 2 Economics Week 2" />
        <meta property="og:description" content="GDP, GNP, NNP, measurement approaches, real vs nominal income. Fully worked calculations with 20 examples." />
        <meta property="og:image" content="https://notes.xwolf.space/og-eco-week2.svg" />
        <meta property="og:url" content="https://notes.xwolf.space/economics/2" />
        <meta name="twitter:title" content="National Income Analysis | Study Notes" />
        <meta name="twitter:image" content="https://notes.xwolf.space/og-eco-week2.svg" />
      </Helmet>
      {/* Reading progress bar */}
      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10" data-testid="progress-bar">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 2</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
              National Income Analysis
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              How do we measure how wealthy a nation is? National Income Analysis gives us the tools to measure, compare, and interpret the total value of everything a country produces and earns. This week covers the key concepts, measurement methods, and worked calculations from simple to advanced.
            </p>
          </div>

          {/* ===== SECTION 1 ===== */}
          <SectionHeading id="meaning" number="Section 1" title="Meaning of National Income" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>National Income</strong> is a measure of the money value of goods and services becoming available to a nation from economic activities. More formally, it is defined as:
          </p>

          <blockquote className="my-6 border-l-4 border-primary/40 pl-6 py-2">
            <p className="font-serif text-lg italic text-foreground/75 leading-relaxed">
              "The total money value of all final goods and services produced by the nationals of a country during some specific period of time — usually a year — and the total of all incomes earned over the same period by the nationals."
            </p>
          </blockquote>

          <ExplainerBox>
            Think of national income as the country's annual paycheck. Just as your personal income tells you how much you earned in a year, national income tells us how much the entire country earned and produced. It answers the question: <strong>"How well did the whole economy perform this year?"</strong>
            <br /><br />
            Two things are measured simultaneously:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>The <strong>value of all goods and services produced</strong> (output side)</li>
              <li>The <strong>total income earned</strong> by all citizens in producing those goods and services (income side)</li>
            </ul>
            These two figures should always be equal — because every unit of output produced generates an equal amount of income for someone.
          </ExplainerBox>

          <ExampleBox>
            <strong>Simple analogy:</strong> A bakery produces 1,000 loaves of bread worth $5,000 in a year. The baker earns $2,000, the flour supplier earns $1,500, and the landlord earns $1,500. Total output = $5,000. Total incomes = $2,000 + $1,500 + $1,500 = $5,000. They are identical. National income works the same way — just at the scale of an entire country.
          </ExampleBox>

          {/* ===== SECTION 2 ===== */}
          <SectionHeading id="concepts" number="Section 2" title="Different Concepts of National Income" />

          <p className="text-base text-foreground/80 leading-relaxed mb-5">
            Economists use several related but distinct measures. Knowing the difference between them is essential — and a common source of exam errors. Here they are, in order from broadest to most refined:
          </p>

          <div className="space-y-4 mb-6">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 bg-primary/10 text-primary rounded">GDP</span>
                Gross Domestic Product
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                The money value of all goods and services produced <strong>within the country's borders</strong>, regardless of who produced them — but <strong>excluding net income from abroad</strong>.
              </p>
              <ExampleBox>
                A Japanese car factory operating in Kenya contributes to Kenya's GDP (it is producing inside Kenya's borders) but to Japan's GNP (the profits flow to Japan's nationals).
              </ExampleBox>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 bg-primary/10 text-primary rounded">GNP</span>
                Gross National Product
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                The sum of the values of all final goods and services produced by the <strong>nationals (citizens)</strong> of a country during the year, <strong>both within and outside the country</strong>.
              </p>
              <MathLine>GNP = GDP + Net Factor Income from Abroad
Net Factor Income from Abroad = Income earned by nationals abroad − Income earned by foreigners at home</MathLine>
              <ExampleBox>
                A Kenyan engineer working in the UK sends money home. This income is part of Kenya's GNP but not Kenya's GDP (it was not produced inside Kenya). Conversely, a British firm's profits from Kenya are part of Kenya's GDP but not Kenya's GNP.
              </ExampleBox>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 bg-primary/10 text-primary rounded">NNP</span>
                Net National Product
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                The money value of total production (GNP) <strong>after subtracting depreciation</strong> (also called capital consumption allowance). This is also known as <strong>National Income at market prices</strong>.
              </p>
              <MathLine>NNP = GNP − Depreciation (Capital Consumption)</MathLine>
              <ExampleBox>
                If a country's GNP is $500 billion but machinery and equipment wore out by $50 billion during the year, the NNP = $450 billion. This is the true net addition to national wealth.
              </ExampleBox>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 bg-secondary/10 text-secondary rounded">Nominal GNP</span>
                Nominal Gross National Product
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                The value, at <strong>current market prices</strong>, of all final goods and services produced within some period — <strong>without any correction for inflation or depreciation</strong>. This is the "face value" figure that has not been adjusted.
              </p>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 bg-secondary/10 text-secondary rounded">Real GNP</span>
                Real Gross National Product
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                National output valued at the prices of a <strong>base year</strong>, or nominal GNP corrected for inflation. This removes the distorting effect of price changes so you can measure genuine changes in the volume of output.
              </p>
              <MathLine>Real GNP = Nominal GNP ÷ GNP Deflator × 100
            OR
Real GNP = Value at Current Prices ÷ CPI × 100</MathLine>
              <NoteBox>
                <strong>Why Real GNP matters:</strong> Suppose nominal GNP rose from $100bn to $110bn. Did the economy actually produce 10% more? Not necessarily. If prices rose by 10%, the economy produced exactly the same amount — all the "growth" was just inflation. Real GNP corrects for this and tells you the true change in productive output.
              </NoteBox>
            </div>
          </div>

          {/* ===== SECTION 3 ===== */}
          <SectionHeading id="accounting" number="Section 3" title="National Income Accounting and Circular Flow" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>National Income Accounting</strong> refers to the measuring of the total flow of output (goods and services) and total flow of inputs (factors of production) that pass through all markets in the economy during the same period.
          </p>

          <ExplainerBox>
            To understand national income accounting, economists use <strong>economic models</strong> — simplified versions of reality that capture the essential mechanisms of how an economy works. The most important of these is the <strong>Circular Flow of Income and Expenditure</strong>.
            <br /><br />
            Think of the economy like a water cycle: money flows continuously around the economy, from households to firms and back again — just like water evaporates, forms clouds, and rains back down.
          </ExplainerBox>

          <div className="space-y-6 mb-6">
            <div className="rounded-xl border border-border/60 bg-card/50 p-5">
              <h3 className="font-semibold text-foreground mb-3">Two-Sector Economy (Households + Firms)</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                The simplest model. Households supply factor services (labour, land, capital) to firms. Firms pay factor incomes (wages, rent, interest, profit) in return. Households then spend these incomes on goods and services from firms. The cycle repeats continuously.
              </p>
              <MathLine>Y = C + I
Y = National Income
C = Consumption (household spending)
I = Investment (firm spending on capital)</MathLine>
              <p className="text-sm text-foreground/80 mt-3">
                The three <strong>critical points</strong> in the circular flow are:
              </p>
              <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1 mt-1 ml-2">
                <li><strong>Point A:</strong> Factor services flow from households → firms, generating factor incomes flowing back.</li>
                <li><strong>Point B:</strong> Factor incomes flow into households, generating consumer spending.</li>
                <li><strong>Point C:</strong> Consumer spending flows into firms, generating goods and services flowing back to households.</li>
              </ul>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/50 p-5">
              <h3 className="font-semibold text-foreground mb-3">Three-Sector Economy (Households + Firms + Government)</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                The government enters the picture. It collects taxes (a withdrawal from the circular flow) and spends on public goods and services like roads, hospitals, and education (an injection into the circular flow).
              </p>
              <MathLine>Y = C + I + G
G = Government Expenditure</MathLine>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/50 p-5">
              <h3 className="font-semibold text-foreground mb-3">Four-Sector Economy (Open Economy — the Complete Model)</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                The full model adds international trade. Exports (X) are an injection — foreigners buy our goods, bringing money into our circular flow. Imports (M) are a withdrawal — we buy foreign goods, taking money out.
              </p>
              <MathLine>Y = C + I + G + (X − M)
X = Exports (injections)
M = Imports (withdrawals)</MathLine>
              <ExampleBox>
                If a country's C = $200bn, I = $80bn, G = $60bn, X = $50bn, M = $40bn:
                Y = 200 + 80 + 60 + (50 − 40) = 200 + 80 + 60 + 10 = <strong>$390bn</strong>
              </ExampleBox>
            </div>
          </div>

          {/* ===== SECTION 4 ===== */}
          <SectionHeading id="approaches" number="Section 4" title="Approaches to Measuring National Income" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            National income statistics are compiled using three different methods. Each approaches the same question from a different angle — and in theory, all three should give the <strong>same answer</strong>. This triple cross-check is the hallmark of rigorous national accounting.
          </p>

          <MathLine>National Output ≡ National Income ≡ National Expenditure</MathLine>

          <div className="space-y-6 mb-4">
            <div className="rounded-xl border border-border/60 bg-card/50 p-5">
              <h3 className="font-semibold text-foreground text-lg mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">i</span>
                The Expenditure Approach
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                This approach measures GDP by adding up all spending on final goods and services in the economy. It centres on the components of final demand that generate production.
              </p>
              <p className="text-sm text-foreground/80 mb-2">The components are:</p>
              <ul className="space-y-2 text-sm text-foreground/80 ml-2">
                <li><strong>C — Consumer Expenditure:</strong> All household spending on goods and services (food, clothing, entertainment, healthcare). New houses are excluded (counted under investment).</li>
                <li><strong>G — Government Final Consumption:</strong> All current government spending on goods, services, and the wages of public employees.</li>
                <li><strong>I — Gross Fixed Capital Formation:</strong> Spending on fixed assets — buildings, machinery, vehicles — whether replacing old capital or adding new capacity. This is the main investment component.</li>
                <li><strong>Stock Changes:</strong> The value of physical increases in inventories (unsold stock) during the year.</li>
                <li><strong>X — Exports:</strong> Added to total domestic expenditure to capture foreign demand for our goods.</li>
                <li><strong>M — Imports:</strong> Subtracted because they represent spending on foreign-produced goods (not our national output).</li>
              </ul>
              <MathLine>
{`GDP at Market Price = C + I + G + (X − M)

To get GDP at Factor Cost:
  GDP at Factor Cost = GDP at Market Price − Indirect Taxes + Subsidies

To get GNP at Factor Cost:
  GNP at Factor Cost = GDP at Factor Cost + Net Property Income from Abroad

To get NNP (National Income):
  NNP = GNP at Factor Cost − Depreciation`}
              </MathLine>
              <NoteBox>
                <strong>Market Price vs. Factor Cost:</strong> GDP at market price includes indirect taxes (like VAT) and subsidies that distort the real value of production. Subtracting taxes and adding subsidies gives us GDP at factor cost — the actual income received by the factors of production (workers, landlords, capitalists). This is the truer measure of national income.
              </NoteBox>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/50 p-5">
              <h3 className="font-semibold text-foreground text-lg mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">ii</span>
                The Income Approach
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                This method sums all incomes earned by individuals in the form of <strong>wages, rent, interest, and profit</strong>. Every time something is produced and sold, someone earns an income from it — so summing all incomes equals total output.
              </p>
              <p className="text-sm text-foreground/80 mb-3 font-semibold">Critical rule: Only include incomes that reward production.</p>
              <p className="text-sm text-foreground/80 mb-2">The following must be <strong>excluded</strong> to avoid double counting:</p>
              <ul className="list-disc list-inside text-sm text-foreground/80 ml-2 space-y-1 mb-3">
                <li><strong>Transfer payments:</strong> Gifts, unemployment benefits, student grants, pensions, lottery winnings. These are not payment for production — they just transfer money from one person to another.</li>
                <li>The test: there must be a <em>"quid pro quo"</em> — a real flow of goods or services in the opposite direction to the money flow.</li>
              </ul>
              <p className="text-sm text-foreground/80 mb-2">The following must be <strong>included</strong> even without money changing hands:</p>
              <ul className="list-disc list-inside text-sm text-foreground/80 ml-2 space-y-1">
                <li><strong>Subsistence output:</strong> Farmers who eat their own produce. There is a real flow of goods, so an <em>imputed</em> value is assigned.</li>
                <li><strong>Income in kind:</strong> Workers given free housing — the market rent is imputed as part of their income.</li>
              </ul>
              <MathLine>
{`Gross Domestic Income (GDI)
  = Wages + Rents + Interest + Profits
  (includes income of foreigners in the country, excludes income of nationals abroad)

GNI (Gross National Income) = GDI + Net Property Income from Abroad
Net National Income (NNI) = GNI − Depreciation`}
              </MathLine>
            </div>

            <div className="rounded-xl border border-border/60 bg-card/50 p-5">
              <h3 className="font-semibold text-foreground text-lg mb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">iii</span>
                The Output Approach (Value Added Method)
              </h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                This is the most direct method. It adds up the total contributions — <strong>value added</strong> — made by each sector of the economy. The key concept is <strong>value added</strong>: the increase in value that each industry adds to its inputs before passing the product to the next stage.
              </p>
              <ExplainerBox>
                <strong>Why "value added" and not just "total sales"?</strong> To avoid double counting. If a wheat farmer sells $100 of wheat to a miller, and the miller sells $200 of flour to a baker, and the baker sells $400 of bread to consumers — the total sales are $700. But the actual value of final output is only $400 (the bread). The wheat and flour are intermediate goods that get counted again in the bread price.
                <br /><br />
                Value added at each stage: Farmer = $100, Miller = $100 ($200 − $100), Baker = $200 ($400 − $200). Total value added = $100 + $100 + $200 = <strong>$400</strong> = final output. Correct!
              </ExplainerBox>
              <p className="text-sm text-foreground/80 mb-2">Important inclusions in the output method:</p>
              <ul className="list-disc list-inside text-sm text-foreground/80 ml-2 space-y-1">
                <li><strong>Capital goods</strong> are counted as final output (they are not used up in the period).</li>
                <li><strong>Subsistence output</strong> — produce consumed by the household that produced it — is included at an imputed price.</li>
                <li><strong>Government services</strong> (education, health, administration) are valued at their cost — i.e., the wage bill of teachers, doctors, civil servants — since they are not sold on a market.</li>
              </ul>
            </div>
          </div>

          {/* ===== SECTION 5 ===== */}
          <SectionHeading id="difficulties" number="Section 5" title="Difficulties in Measuring National Income" />

          <div className="space-y-4 mb-4">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">a) What Goods and Services to Include</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                The general rule is to include only goods and services that change hands for money. But applying this leads to awkward judgement calls:
              </p>
              <ul className="list-disc list-inside text-sm text-foreground/80 ml-2 space-y-1">
                <li>A housewife's unpaid domestic work is <strong>excluded</strong>, but if she pays a housekeeper to do the same work, it is <strong>included</strong>. The output is identical; the treatment differs.</li>
                <li>Farmers who consume their own produce: an imputed value is assigned.</li>
                <li>Durable goods (cars, refrigerators) provide services over many years — only the initial purchase is counted; subsequent services are ignored.</li>
                <li>Government services (free education, healthcare) are included at cost.</li>
                <li>Illegal activities (drug trade, black market) produce real goods and services but are generally not counted, even though they generate real income.</li>
              </ul>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">b) Danger of Double Counting</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">
                Because industries are interconnected — the output of one is the input of another — carelessly adding all outputs would count some things multiple times, inflating the national income figure.
              </p>
              <ExampleBox>
                Steel is sold to a car manufacturer. If you count both the steel and the car in national income, you've counted the steel twice. The solution: either count only the <strong>final product</strong> (the car) or count the <strong>value added</strong> at each stage.
              </ExampleBox>
              <p className="text-sm text-foreground/80">
                Transfer payments (social security, pensions) must also be excluded — they are a redistribution of income already created, not new production.
              </p>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">c) Inadequate Information</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Data sources (tax returns, surveys) are not designed primarily for national income calculation. Issues include:
              </p>
              <ul className="list-disc list-inside text-sm text-foreground/80 ml-2 mt-1 space-y-1">
                <li>Income tax returns tend to <strong>understate</strong> true income (people hide income to pay less tax).</li>
                <li>Informal economy transactions (a plumber fixing a friend's pipes for cash) go <strong>unrecorded</strong>.</li>
                <li>International payments and receipts may not be fully documented.</li>
              </ul>
            </div>
          </div>

          {/* ===== SECTION 6 ===== */}
          <SectionHeading id="factors" number="Section 6" title="Factors Affecting the Size of National Income" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The size of a nation's income depends on the quantity and quality of the <strong>factor endowments</strong> at its disposal. A nation will be wealthy if its natural resources are large, its people are skilled, and it has a strong accumulation of capital.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {[
              {
                letter: "a",
                title: "Natural Resources",
                desc: "Minerals, timber, agricultural land (fertile soil, rainfall, climate), fish, energy sources (oil, gas, hydro-electric, geothermal, wind, wave). Countries rich in natural resources have a higher income base.",
                example: "Saudi Arabia's vast oil reserves make it one of the wealthiest nations per capita despite a relatively small population."
              },
              {
                letter: "b",
                title: "Human Resources",
                desc: "A large, literate, skilled, and entrepreneurial population creates more wealth. Education, health, and skills training directly raise a country's productive capacity.",
                example: "Singapore has few natural resources but a highly educated workforce — this human capital drove it from a developing country in the 1960s to one of the world's wealthiest nations today."
              },
              {
                letter: "c",
                title: "Capital Resources",
                desc: "Tools, machinery, factories, mines, infrastructure (roads, railways, airports, ports). Transport especially creates 'utility of space' — making remote resources accessible and cheap.",
                example: "China's massive investment in railways, roads, and ports in the 2000s opened up inland regions to trade, massively expanding its productive capacity."
              },
              {
                letter: "d",
                title: "Self-Sufficiency",
                desc: "A nation cannot sustain a high national income if most enterprises are foreign-owned. Foreign ownership leads to withdrawal of profits abroad, reducing net national income for the domestic population.",
                example: "Many African nations have significant natural resources but foreign companies extract most profits, limiting the growth of domestic national income."
              },
              {
                letter: "e",
                title: "Political Stability",
                desc: "A stable political environment attracts investment, enables long-term planning, and ensures the rule of law. Political instability — wars, coups, corruption — destroys capital, drives out investment, and depresses production.",
                example: "Venezuela's economic collapse after 2013 was driven largely by political instability and poor governance, which caused its GDP to shrink by over 70%."
              },
            ].map((item) => (
              <div key={item.letter} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <h3 className="font-semibold text-foreground mb-1">({item.letter}) {item.title}</h3>
                <p className="text-sm text-foreground/80 leading-relaxed mb-2">{item.desc}</p>
                <p className="text-xs text-muted-foreground italic border-t border-border/40 pt-2">{item.example}</p>
              </div>
            ))}
          </div>

          {/* ===== SECTION 7 ===== */}
          <SectionHeading id="uses" number="Section 7" title="Uses of National Income Statistics" />

          <ul className="space-y-3 mb-4">
            {[
              {
                use: "Measuring the size of the 'national cake'",
                detail: "NI statistics reveal the total pool of goods and services available for private consumption, government use, capital investment, and exports. This is essential for national budgeting and resource allocation."
              },
              {
                use: "Comparing standards of living over time",
                detail: "By tracking real GDP per capita over years, we can determine whether citizens are genuinely better off or worse off. This is the primary indicator of economic progress."
              },
              {
                use: "Comparing living standards between countries",
                detail: "International organisations like the World Bank and IMF use per capita income to classify countries and determine aid eligibility."
              },
              {
                use: "Assessing economic stability",
                detail: "A steadily increasing national income indicates economic health. Sharp drops signal recessions. NI statistics are the primary tool for tracking business cycles."
              },
              {
                use: "Identifying sector contributions",
                detail: "Disaggregated NI data shows which sectors (agriculture, industry, services) contribute most. This is crucial for development planning — identifying bottlenecks and where to invest."
              },
              {
                use: "Measuring trade dependence",
                detail: "By expressing exports and imports as a percentage of GNP, we can determine how dependent a country is on external trade — important for assessing vulnerability to global shocks."
              },
              {
                use: "Estimating saving and investment potential",
                detail: "NI statistics help estimate what proportion of national income is saved (and therefore available for investment), which determines the pace of capital accumulation and growth."
              },
            ].map((item, i) => (
              <li key={i} className="flex gap-3 rounded-lg border border-border/60 bg-card/50 p-3">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm text-foreground">{item.use}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* ===== SECTION 8 ===== */}
          <SectionHeading id="real-nominal" number="Section 8" title="Real vs Nominal GNP: Deflating by a Price Index" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            One of the most fundamental problems in measuring GNP is that economists must use money as their measuring rod — and that measuring rod changes size every year due to inflation. As prices rise, the same amount of real output appears as a larger nominal GNP figure.
          </p>

          <ExplainerBox>
            Imagine you use a rubber band as a ruler. Every year, the rubber stretches — so last year's 30cm looks like 35cm this year, even though the object hasn't grown. Nominal GNP is measured with this stretching ruler. Real GNP uses a fixed ruler — prices from a chosen base year — so you can actually compare apples to apples across time.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-3">
            The tool economists use to "deflate" nominal GNP into real GNP is the <strong>GNP deflator</strong> — a price index that reflects the average prices of all goods and services included in GNP.
          </p>

          <MathLine>
{`GNP Deflator = Nominal GNP ÷ Real GNP

Therefore:
Real GNP = Nominal GNP ÷ GNP Deflator

Using CPI (Consumer Price Index):
Real GNP = Nominal GNP ÷ CPI × 100`}
          </MathLine>

          <NoteBox>
            The GNP deflator is preferred over the CPI for deflating GNP because it covers all goods and services in GNP — not just the consumer goods basket used by the CPI. For GDP-related calculations, the GDP deflator is used similarly.
          </NoteBox>

          {/* ===== SECTION 9 ===== */}
          <SectionHeading id="percapita" number="Section 9" title="Per Capita Income" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Per capita income</strong> (income per head) is simply the national income divided by the population. It answers the question: <em>"If national income were shared equally, what would each person receive?"</em>
          </p>

          <MathLine>Per Capita Income = National Income ÷ Total Population</MathLine>

          <p className="text-base text-foreground/80 leading-relaxed mb-3">
            Per capita income shows the <strong>standard of living a country can afford</strong> for its people. The critical relationship:
          </p>
          <ul className="list-disc list-inside text-foreground/80 ml-2 space-y-1 mb-4 text-sm">
            <li>Higher population growth rate → lower per capita income growth rate (the national cake is shared among more people)</li>
            <li>Per capita income is a <strong>theoretical</strong> concept — it shows what each person's share <em>would</em> be if incomes were equal. In reality, incomes are very unequal.</li>
          </ul>

          <WarningBox>
            <strong>Key limitation:</strong> Per capita income gives no information about how income is actually <em>distributed</em>. A country with per capita income of $10,000 where the richest 10% earn 90% of all income is very different from a country with the same per capita income but equitable distribution — yet both look identical in per capita income statistics.
          </WarningBox>

          {/* ===== SECTION 10 ===== */}
          <SectionHeading id="welfare" number="Section 10" title="National Income and Welfare" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Economic growth means capacity expansion — and its effect is an increase in national income. This increase, assuming fair distribution, has several effects on citizens:
          </p>

          <ul className="list-disc list-inside text-foreground/80 ml-2 space-y-2 mb-4 text-sm">
            <li>The average citizen enjoys a <strong>higher standard of living</strong>.</li>
            <li>Ordinary households can afford <strong>luxury goods</strong> (note: what counts as "luxury" varies by country and income level — clothing is a luxury for some people).</li>
            <li>People can afford more <strong>leisure</strong> — reducing working hours while maintaining their standard of living.</li>
          </ul>

          <WarningBox>
            <strong>Critical warning: GNP is a deeply flawed welfare indicator.</strong> All three points above assume fair distribution of national income. In reality, this is rarely the case. It is dangerously misleading to use GNP, its growth rate, or GNP per capita as indicators of economic well-being without examining distribution.
          </WarningBox>

          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            GNP per capita gives no indication of who is benefiting from growth. A rising per capita GNP may camouflage the fact that the poor are no better off than before. In reality, GNP growth largely reflects the growth of incomes of the wealthiest 20%, who receive a disproportionately large share of national output.
          </p>

          <div className="rounded-lg border border-amber-400/30 bg-amber-50 dark:bg-amber-900/10 p-4 mb-4">
            <p className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase mb-2">Textbook Illustration from the Notes</p>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Assume a 10-person economy where 9 people have no income and the 10th person earns 100 units. GNP = 100; per capita income = 10.
              <br /><br />
              Now suppose everyone's income increases by 20%. GNP = 120; per capita income = 12. This looks like progress.
              <br /><br />
              But the 9 people who had no income still have no income. The entire gain went to the one rich individual. Yet GNP per capita rose from 10 to 12, suggesting the whole economy improved. <strong>This is the fundamental problem with using GNP as a welfare measure.</strong>
            </p>
          </div>

          {/* ===== SECTION 11 ===== */}
          <SectionHeading id="standards" number="Section 11" title="National Income and Standards of Living" />

          <p className="text-base text-foreground/80 leading-relaxed mb-3">
            <strong>Standard of living</strong> refers to the quantity of goods and services enjoyed by a person — whether publicly provided (healthcare, education) or privately purchased. It also includes non-quantifiable aspects: working conditions, environment, leisure time.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Per capita income is the main tool for measuring living standards, but there are serious problems with using it both for comparisons <strong>over time</strong> and between <strong>different countries</strong>.
          </p>

          <h3 className="font-semibold text-foreground text-lg mb-3">Problems of Using Per Capita Income to Compare Over Time</h3>
          <div className="space-y-2 mb-6">
            {[
              ["1", "Composition of output may change", "More defence goods and fewer consumer goods may be produced. Or more producer goods and fewer consumer goods. A higher GNP doesn't mean citizens are consuming more."],
              ["2", "Prices change over time", "Inflation makes nominal GNP rise even if real output is unchanged. A price index is needed to adjust, but price index construction itself has well-known flaws."],
              ["3", "Distribution of income", "NI may grow while only a small group benefits. Others may be static or worse off."],
              ["4", "Quality of life decline", "GNP growth may be accompanied by worsening working conditions, environmental pollution, and urban overcrowding — none of which are captured in GNP."],
              ["5", "Monetisation effects", "NI increases when people pay for services previously done for free. A housewife taking a job and paying a housekeeper increases national income — but real welfare may be unchanged."],
            ].map(([num, title, detail]) => (
              <div key={num} className="rounded-lg border border-border/60 bg-card/50 p-3 flex gap-3">
                <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{num}</span>
                <div>
                  <p className="font-semibold text-sm text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-lg mb-3">Problems of International Comparisons</h3>
          <div className="space-y-2 mb-4">
            {[
              ["i", "Inaccurate population estimates", "In less developed countries, population figures are often unreliable — making per capita calculations inaccurate."],
              ["ii", "Unreliable depreciation and net factor income data", "These are difficult to estimate precisely, so GDP (rather than the more meaningful NNP) is typically used."],
              ["iii", "Non-marketed subsistence output and government services", "Subsistence farming and government output are valued by input cost — but costs vary between countries independently of actual output quality."],
              ["iv", "Different income distributions", "A country with a higher per capita income but very unequal distribution may have lower living standards for most of its citizens than a poorer country with equal distribution."],
              ["v", "Different types of production", "A country that devotes resources to military production will show a high per capita income but not a correspondingly high standard of living."],
              ["vi", "Different forms of published NI figures", "Comparisons require both sets of data to be in the same form (real terms, not nominal). Inflation differences distort comparisons."],
              ["vii", "Exchange rates", "Converting national income to a common currency uses official exchange rates, which may not reflect actual purchasing power. The same nominal value of money buys very different quantities of goods in different countries."],
              ["viii", "Different price structures", "Basic goods are much cheaper in poor countries. Citizens may be less badly off than nominal per capita income suggests, because their staple foods cost very little."],
              ["ix", "Income vs effort", "Higher output may reflect harder work (longer hours, more stressful conditions) rather than genuine welfare improvement."],
              ["x", "Differences in size", "Larger countries spend more on transport and communication infrastructure — this inflates their GNP without necessarily raising living standards."],
              ["xi", "Differences in taste", "Some societies prefer leisure over consumption. A lower income with more leisure may represent equal or greater welfare than a higher income with less leisure."],
              ["xii", "Different climatic zones", "Cold countries spend heavily on heating — this shows up in GNP but doesn't mean citizens are better off than those in warm climates who need no heating."],
              ["xiii", "NI per head as welfare index", "We cannot measure material welfare on an arithmetic scale. A 10% increase in per capita income does not necessarily mean welfare increases by 10%."],
            ].map(([num, title, detail]) => (
              <div key={num} className="rounded-lg border border-border/60 bg-card/50 p-3 flex gap-3">
                <span className="text-xs font-bold text-muted-foreground shrink-0 mt-0.5 w-6 text-right">{num}.</span>
                <div>
                  <p className="font-semibold text-sm text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ===== SECTION 12 — 20 WORKED EXAMPLES ===== */}
          <SectionHeading id="calculations" number="Section 12" title="Worked Arithmetic Examples" />

          <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 mb-8">
            <Calculator className="h-6 w-6 text-primary shrink-0" />
            <div>
              <p className="font-semibold text-foreground text-sm">20 Worked Examples — Simple to Complex</p>
              <p className="text-xs text-muted-foreground mt-0.5">Each example is fully explained step by step. Colour coding: <span className="text-green-700 dark:text-green-400 font-medium">Easy</span> · <span className="text-amber-600 dark:text-amber-400 font-medium">Medium</span> · <span className="text-red-600 dark:text-red-400 font-medium">Hard</span></p>
            </div>
          </div>

          {/* EASY examples 1-7 */}

          <CalcBox number={1} title="Calculating Per Capita Income" difficulty="Easy">
            <p><strong>Question:</strong> A country has a National Income of $240 billion and a population of 40 million people. What is the per capita income?</p>
            <MathLine>
{`Per Capita Income = National Income ÷ Population
                  = $240,000,000,000 ÷ 40,000,000
                  = $6,000 per person`}
            </MathLine>
            <p><strong>Interpretation:</strong> On average, each citizen's share of national output is $6,000 per year. Remember: this is a theoretical average — actual incomes will be unequally distributed.</p>
          </CalcBox>

          <CalcBox number={2} title="Calculating NNP from GNP" difficulty="Easy">
            <p><strong>Question:</strong> A country has a GNP of $500 billion. Depreciation (capital consumption) during the year was $45 billion. Calculate the Net National Product.</p>
            <MathLine>
{`NNP = GNP − Depreciation
    = $500bn − $45bn
    = $455 billion`}
            </MathLine>
            <p><strong>Explanation:</strong> Depreciation represents the wearing out of capital equipment. The NNP ($455bn) is the true net addition to national wealth after replacing worn-out capital. It is the more accurate measure of what the nation actually gained.</p>
          </CalcBox>

          <CalcBox number={3} title="GDP from the Expenditure Approach — Basic" difficulty="Easy">
            <p><strong>Question:</strong> Given the following data, calculate GDP:</p>
            <ul className="list-disc list-inside ml-2 mb-2">
              <li>Consumer spending (C) = $300bn</li>
              <li>Government spending (G) = $80bn</li>
              <li>Investment (I) = $60bn</li>
              <li>Exports (X) = $50bn</li>
              <li>Imports (M) = $40bn</li>
            </ul>
            <MathLine>
{`GDP = C + I + G + (X − M)
    = 300 + 60 + 80 + (50 − 40)
    = 300 + 60 + 80 + 10
    = $450 billion`}
            </MathLine>
            <p><strong>Key point:</strong> We add exports (foreign demand for our goods) and subtract imports (our spending on foreign goods). The net trade balance here is +$10bn, meaning exports exceed imports — a trade surplus.</p>
          </CalcBox>

          <CalcBox number={4} title="Value Added in a Production Chain" difficulty="Easy">
            <p><strong>Question:</strong> Cotton passes through three stages before reaching the consumer. Calculate value added at each stage and confirm the final output:</p>
            <ul className="list-disc list-inside ml-2 mb-2">
              <li>Cotton farmer sells to textile mill: $80</li>
              <li>Textile mill sells fabric to clothing manufacturer: $200</li>
              <li>Clothing manufacturer sells shirt to retailer: $350</li>
              <li>Retailer sells shirt to consumer: $500</li>
            </ul>
            <MathLine>
{`Value Added at each stage:
  Cotton farmer:           $80  (no input cost; raw material)
  Textile mill:            $200 − $80  = $120
  Clothing manufacturer:   $350 − $200 = $150
  Retailer:                $500 − $350 = $150

Total Value Added = $80 + $120 + $150 + $150 = $500

Final product price (shirt) = $500 ✓`}
            </MathLine>
            <p><strong>Lesson:</strong> Total value added = price of the final product. This confirms that the value-added method and final-product method give the same result, and avoids double-counting the intermediate goods.</p>
          </CalcBox>

          <CalcBox number={5} title="Calculating Real GNP Using a Price Index" difficulty="Easy">
            <p><strong>Question:</strong> Nominal GNP is $660 billion. The CPI (base year = 100) is currently 120. Calculate Real GNP.</p>
            <MathLine>
{`Real GNP = Nominal GNP ÷ CPI × 100
         = $660bn ÷ 120 × 100
         = $660bn × (100/120)
         = $550 billion`}
            </MathLine>
            <p><strong>Explanation:</strong> Prices have risen 20% since the base year (CPI = 120 means prices are 20% higher than in the base year). So $660bn of nominal output is really only worth $550bn in base-year prices. The economy produced 20% less real output than the nominal figure suggests.</p>
          </CalcBox>

          <CalcBox number={6} title="Calculating the GNP Deflator" difficulty="Easy">
            <p><strong>Question:</strong> Nominal GNP = $800bn; Real GNP = $640bn. Calculate the GNP deflator and interpret it.</p>
            <MathLine>
{`GNP Deflator = Nominal GNP ÷ Real GNP
             = $800bn ÷ $640bn
             = 1.25  (or 125 as an index)`}
            </MathLine>
            <p><strong>Interpretation:</strong> The deflator of 1.25 (or 125) means that prices are 25% higher than in the base year. Out of the $800bn nominal GNP, $160bn is due purely to price increases ($800 − $640 = $160). Only $640bn represents actual real output growth.</p>
          </CalcBox>

          <CalcBox number={7} title="GNP from GDP — Adding Net Factor Income from Abroad" difficulty="Easy">
            <p><strong>Question:</strong> Country A's GDP = $400bn. Its nationals earned $30bn abroad. Foreigners earned $15bn inside Country A. Calculate GNP.</p>
            <MathLine>
{`Net Factor Income from Abroad = Income earned by nationals abroad
                               − Income earned by foreigners at home
                               = $30bn − $15bn
                               = $15bn

GNP = GDP + Net Factor Income from Abroad
    = $400bn + $15bn
    = $415 billion`}
            </MathLine>
            <p><strong>Note:</strong> GNP is greater than GDP here because nationals earn more abroad than foreigners earn at home. This is common in countries with large diaspora remittances, like the Philippines or Mexico.</p>
          </CalcBox>

          {/* MEDIUM examples 8-14 */}

          <CalcBox number={8} title="Full National Income Chain: GDP to National Income" difficulty="Medium">
            <p><strong>Question:</strong> Using the following data, calculate National Income step by step:</p>
            <ul className="list-disc list-inside ml-2 mb-2 text-sm">
              <li>GDP at market price = $600bn</li>
              <li>Indirect taxes = $50bn</li>
              <li>Subsidies = $10bn</li>
              <li>Net property income from abroad = +$20bn</li>
              <li>Depreciation = $35bn</li>
            </ul>
            <MathLine>
{`Step 1: GDP at Factor Cost
  = GDP at Market Price − Indirect Taxes + Subsidies
  = $600bn − $50bn + $10bn
  = $560 billion

Step 2: GNP at Factor Cost
  = GDP at Factor Cost + Net Property Income from Abroad
  = $560bn + $20bn
  = $580 billion

Step 3: National Income (NNP at Factor Cost)
  = GNP − Depreciation
  = $580bn − $35bn
  = $545 billion`}
            </MathLine>
            <p><strong>This is the complete chain</strong> from GDP at market prices to true National Income. Always follow these exact steps in this order.</p>
          </CalcBox>

          <CalcBox number={9} title="Identifying Transfer Payments — What to Include or Exclude" difficulty="Medium">
            <p><strong>Question:</strong> A country has the following income data. Identify which should be included in national income and calculate the total:</p>
            <ul className="list-disc list-inside ml-2 mb-2 text-sm">
              <li>Total wages and salaries: $180bn</li>
              <li>Rent from property: $40bn</li>
              <li>Interest income: $25bn</li>
              <li>Corporate profits: $55bn</li>
              <li>Unemployment benefits paid: $12bn</li>
              <li>Student grants: $3bn</li>
              <li>Pension payments: $8bn</li>
            </ul>
            <MathLine>
{`Include (productive incomes with quid pro quo):
  Wages and salaries:    $180bn
  Rent:                   $40bn
  Interest:               $25bn
  Corporate profits:      $55bn
  Total Included:        $300bn

Exclude (transfer payments — no real output produced):
  Unemployment benefits:  $12bn  ✗
  Student grants:          $3bn  ✗
  Pensions:                $8bn  ✗

Gross Domestic Income (GDI) = $300 billion`}
            </MathLine>
            <p><strong>Rule:</strong> If money flows without a corresponding real output flowing the other way, exclude it. Transfer payments redistribute existing income — they don't create new value.</p>
          </CalcBox>

          <CalcBox number={10} title="Comparing Nominal vs Real Growth — Was It Real?" difficulty="Medium">
            <p><strong>Question:</strong> Country B's nominal GNP grew from $500bn (Year 1) to $575bn (Year 2). The CPI rose from 100 to 115. Did the economy genuinely grow, and by how much?</p>
            <MathLine>
{`Year 1 Real GNP = $500bn ÷ 100 × 100 = $500bn (base year)

Year 2 Real GNP = $575bn ÷ 115 × 100 = $500bn

Nominal growth  = ($575 − $500) ÷ $500 × 100 = 15%
Real growth     = ($500 − $500) ÷ $500 × 100 = 0%`}
            </MathLine>
            <p><strong>Answer:</strong> Despite a 15% increase in nominal GNP, there was <strong>zero real growth</strong>. The entire increase was due to inflation (prices rose 15%). The economy produced exactly the same volume of output as the previous year. This is why real GNP is the correct measure of economic progress.</p>
          </CalcBox>

          <CalcBox number={11} title="Per Capita Income and Population Growth" difficulty="Medium">
            <p><strong>Question:</strong> A country's national income grows from $200bn to $230bn (+15%) while its population grows from 50 million to 57.5 million (+15%). What happens to per capita income?</p>
            <MathLine>
{`Year 1 Per Capita Income = $200bn ÷ 50m  = $4,000

Year 2 Per Capita Income = $230bn ÷ 57.5m = $4,000

Change in per capita income = $0 (unchanged)`}
            </MathLine>
            <p><strong>Key lesson:</strong> National income growth does not automatically mean citizens are better off. If the population grows at the same rate as income, per capita income stays flat. This is a major challenge for rapidly growing populations in developing countries — economic output must grow <em>faster</em> than population for living standards to rise.</p>
          </CalcBox>

          <CalcBox number={12} title="Trade Dependency Ratio" difficulty="Medium">
            <p><strong>Question:</strong> Country C has: GNP = $400bn, Exports = $80bn, Imports = $60bn. Calculate the trade dependency ratio and comment.</p>
            <MathLine>
{`Trade dependency ratio = (Exports + Imports) ÷ GNP × 100
                       = ($80bn + $60bn) ÷ $400bn × 100
                       = $140bn ÷ $400bn × 100
                       = 35%`}
            </MathLine>
            <p><strong>Interpretation:</strong> 35% of economic activity is trade-related. This means Country C is moderately dependent on foreign trade. Highly trade-dependent economies (e.g. Singapore at ~300%) are more vulnerable to global downturns but also benefit more from international specialisation.</p>
          </CalcBox>

          <CalcBox number={13} title="Welfare Paradox — GNP and Inequality" difficulty="Medium">
            <p><strong>Question:</strong> A 10-person economy has national income = $1,000. One person earns $820 and the other 9 share $180 equally. Then national income rises by 25% to $1,250. The rich person's income rises to $1,025; the other 9 each get $25 (total $225). Calculate per capita income before and after. Has welfare improved?</p>
            <MathLine>
{`Before:
  National Income = $1,000
  Per Capita Income = $1,000 ÷ 10 = $100

After:
  National Income = $1,250
  Per Capita Income = $1,250 ÷ 10 = $125

Rich person's income: $820 → $1,025 (up $205; +25%)
Each of the 9 others: $20 → $25 (up $5; +25%)

Per capita income rose from $100 to $125 (+25%)`}
            </MathLine>
            <p><strong>Analysis:</strong> The per capita figures look great — a 25% improvement. But the 9 poorer people only gained $5 each, while the wealthy person gained $205. The rich person captures 82% of all income ($1,025/$1,250 = 82%). GNP growth <strong>hides severe inequality</strong>. This is precisely why GNP alone is not a good welfare measure.</p>
          </CalcBox>

          <CalcBox number={14} title="Savings Rate from National Income" difficulty="Medium">
            <p><strong>Question:</strong> National Income = $500bn. Consumption = $425bn. Calculate: (a) Total savings, (b) Savings rate, (c) If the investment multiplier is 3, how much will national income increase if all savings are invested?</p>
            <MathLine>
{`(a) Total Savings = National Income − Consumption
               = $500bn − $425bn
               = $75 billion

(b) Savings Rate = Savings ÷ National Income × 100
              = $75bn ÷ $500bn × 100
              = 15%

(c) If all savings are invested:
  Investment = $75bn
  Increase in NI = Investment × Multiplier
              = $75bn × 3
              = $225 billion
  New National Income = $500bn + $225bn = $725 billion`}
            </MathLine>
            <p><strong>Interpretation:</strong> A 15% savings rate is healthy and provides fuel for investment. The multiplier effect ($225bn increase from $75bn investment) illustrates why encouraging savings and investment is central to growth policy.</p>
          </CalcBox>

          {/* HARD examples 15-20 */}

          <CalcBox number={15} title="Full Expenditure Method — Market Price to National Income" difficulty="Hard">
            <p><strong>Question:</strong> Using the following comprehensive data, calculate National Income:</p>
            <ul className="list-disc list-inside ml-2 mb-2 text-sm space-y-0.5">
              <li>Consumer expenditure: $350bn</li>
              <li>Government expenditure: $120bn</li>
              <li>Gross fixed capital formation: $90bn</li>
              <li>Physical stock increase: $10bn</li>
              <li>Exports: $70bn</li>
              <li>Imports: $55bn</li>
              <li>Indirect taxes: $40bn</li>
              <li>Subsidies: $8bn</li>
              <li>Net property income from abroad: +$18bn</li>
              <li>Depreciation: $42bn</li>
            </ul>
            <MathLine>
{`Step 1: Total Domestic Expenditure (TDE)
  = C + G + Gross Fixed Capital + Stock Changes
  = $350 + $120 + $90 + $10
  = $570bn

Step 2: Total Final Expenditure
  = TDE + Exports
  = $570 + $70
  = $640bn

Step 3: GDP at Market Prices
  = Total Final Expenditure − Imports
  = $640 − $55
  = $585bn

Step 4: GDP at Factor Cost
  = GDP at Market Price − Indirect Taxes + Subsidies
  = $585 − $40 + $8
  = $553bn

Step 5: GNP at Factor Cost
  = GDP at Factor Cost + Net Property Income from Abroad
  = $553 + $18
  = $571bn

Step 6: National Income (NNP at Factor Cost)
  = GNP − Depreciation
  = $571 − $42
  = $529 billion  ✓`}
            </MathLine>
            <p><strong>This is the complete six-step process.</strong> Exam questions often give you all this data and ask you to work through each step. Never skip a step — they build on each other sequentially.</p>
          </CalcBox>

          <CalcBox number={16} title="Deflating GNP and Calculating Real Growth Rate" difficulty="Hard">
            <p><strong>Question:</strong> Use the table below to calculate real GNP for each year and the annual real growth rate:</p>
            <div className="overflow-x-auto my-2">
              <table className="text-sm border border-border/40 w-full text-left">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="px-3 py-2 border-b border-border/40">Year</th>
                    <th className="px-3 py-2 border-b border-border/40">Nominal GNP ($bn)</th>
                    <th className="px-3 py-2 border-b border-border/40">CPI (Base = 100)</th>
                    <th className="px-3 py-2 border-b border-border/40">Real GNP ($bn)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="px-3 py-1.5 border-b border-border/20">2020</td><td className="px-3 py-1.5 border-b border-border/20">$500</td><td className="px-3 py-1.5 border-b border-border/20">100</td><td className="px-3 py-1.5 border-b border-border/20 text-primary font-medium">?</td></tr>
                  <tr><td className="px-3 py-1.5 border-b border-border/20">2021</td><td className="px-3 py-1.5 border-b border-border/20">$560</td><td className="px-3 py-1.5 border-b border-border/20">112</td><td className="px-3 py-1.5 border-b border-border/20 text-primary font-medium">?</td></tr>
                  <tr><td className="px-3 py-1.5">2022</td><td className="px-3 py-1.5">$630</td><td className="px-3 py-1.5">126</td><td className="px-3 py-1.5 text-primary font-medium">?</td></tr>
                </tbody>
              </table>
            </div>
            <MathLine>
{`Real GNP = Nominal GNP ÷ CPI × 100

2020: $500 ÷ 100 × 100 = $500.00bn (base year)
2021: $560 ÷ 112 × 100 = $500.00bn
2022: $630 ÷ 126 × 100 = $500.00bn

Real Growth Rate 2020→2021 = (500−500)÷500×100 = 0%
Real Growth Rate 2021→2022 = (500−500)÷500×100 = 0%
Nominal Growth Rate 2020→2022 = (630−500)÷500×100 = 26%`}
            </MathLine>
            <p><strong>Striking result:</strong> Despite nominal GNP growing by 26% over two years, real GNP did not grow at all. The economy's true output was completely stagnant. All the growth was driven by inflation (prices rose 26%). This shows the critical importance of using real rather than nominal figures when assessing economic performance.</p>
          </CalcBox>

          <CalcBox number={17} title="Income Approach: Imputing Subsistence and In-Kind Income" difficulty="Hard">
            <p><strong>Question:</strong> Calculate Gross Domestic Income from the following. Identify what to include, exclude, or impute:</p>
            <ul className="list-disc list-inside ml-2 mb-2 text-sm space-y-0.5">
              <li>Total wages paid in cash: $200bn</li>
              <li>Rent collected: $35bn</li>
              <li>Interest paid to lenders: $20bn</li>
              <li>Corporate profits before tax: $45bn</li>
              <li>Government pension payments: $15bn</li>
              <li>Lottery winnings: $2bn</li>
              <li>Food grown and consumed by farmers (subsistence): $8bn (market price)</li>
              <li>Free housing provided to employees (rental value): $5bn</li>
              <li>Bribes and corruption receipts: $3bn</li>
            </ul>
            <MathLine>
{`Decision for each item:

Wages:                     $200bn  ✓ Include (productive income)
Rent:                       $35bn  ✓ Include
Interest:                   $20bn  ✓ Include
Corporate profits:          $45bn  ✓ Include
Government pensions:        $15bn  ✗ Exclude (transfer payment)
Lottery winnings:            $2bn  ✗ Exclude (transfer payment)
Subsistence output:          $8bn  ✓ Include (imputed — real goods produced)
Free employee housing:       $5bn  ✓ Include (imputed — real service received)
Bribes/corruption:           $3bn  ✗ Exclude (no real output; illegal)

Gross Domestic Income (GDI):
  = $200 + $35 + $20 + $45 + $8 + $5
  = $313 billion`}
            </MathLine>
            <p><strong>Key rules applied:</strong> Transfer payments are excluded. Imputed values (subsistence output, in-kind income) are included because there IS a real flow of goods/services. Illegal/unrecorded transactions are excluded in standard national accounting.</p>
          </CalcBox>

          <CalcBox number={18} title="International Comparison — Exchange Rate vs Purchasing Power" difficulty="Hard">
            <p><strong>Question:</strong> Country X (high income) has per capita income of $30,000. Country Y (low income) has per capita income of $3,000 at official exchange rates. A basket of essential goods costs $800 in Country X and $200 in Country Y. Compare living standards using purchasing power.</p>
            <MathLine>
{`Nominal per capita income comparison:
  Country X / Country Y = $30,000 / $3,000 = 10x higher

Purchasing Power Adjustment:
  Baskets of essential goods affordable:
    Country X: $30,000 ÷ $800 = 37.5 baskets per year
    Country Y: $3,000 ÷ $200 = 15.0 baskets per year

PPP-adjusted ratio: 37.5 ÷ 15.0 = 2.5x

Alternatively, PPP-adjusted income for Country Y:
  = $3,000 × ($800/$200) = $3,000 × 4 = $12,000 (in Country X prices)`}
            </MathLine>
            <p><strong>Conclusion:</strong> At official exchange rates, Country X appears 10 times richer. But adjusting for purchasing power (what money actually buys), Country X is only 2.5 times better off. Country Y's citizens are much less badly off than nominal figures suggest, because basic goods are 4 times cheaper there. This is why the World Bank uses <strong>Purchasing Power Parity (PPP)</strong> for international comparisons.</p>
          </CalcBox>

          <CalcBox number={19} title="Sector Contribution Analysis" difficulty="Hard">
            <p><strong>Question:</strong> A country's GDP breakdown by sector is shown below. Calculate each sector's % contribution and identify which sector dominates:</p>
            <div className="overflow-x-auto my-2">
              <table className="text-sm border border-border/40 w-full text-left">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="px-3 py-2 border-b border-border/40">Sector</th>
                    <th className="px-3 py-2 border-b border-border/40">Value Added ($bn)</th>
                    <th className="px-3 py-2 border-b border-border/40">% of GDP</th>
                  </tr>
                </thead>
                <tbody>
                  {[["Agriculture", 60], ["Industry/Manufacturing", 110], ["Construction", 30], ["Services (Finance, Trade, etc.)", 180], ["Government Services", 70]].map(([s, v]) => (
                    <tr key={String(s)}>
                      <td className="px-3 py-1.5 border-b border-border/20">{s}</td>
                      <td className="px-3 py-1.5 border-b border-border/20">${v}bn</td>
                      <td className="px-3 py-1.5 border-b border-border/20 text-primary font-medium">?</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <MathLine>
{`Total GDP = 60 + 110 + 30 + 180 + 70 = $450bn

% Contributions:
  Agriculture:       60 ÷ 450 × 100 = 13.3%
  Industry:         110 ÷ 450 × 100 = 24.4%
  Construction:      30 ÷ 450 × 100 =  6.7%
  Services:         180 ÷ 450 × 100 = 40.0%
  Government:        70 ÷ 450 × 100 = 15.6%
                                       ─────
  Total:                              100.0% ✓`}
            </MathLine>
            <p><strong>Analysis:</strong> Services (40%) dominate this economy, followed by Industry (24.4%). This pattern — with services as the largest sector — is typical of a middle-income or developed economy. Planners use this data to identify which sectors need investment and which face constraints to growth.</p>
          </CalcBox>

          <CalcBox number={20} title="Complete National Income Problem — All Methods" difficulty="Hard">
            <p><strong>Question:</strong> A closed economy (no international trade) has the following data. Calculate GDP using all three approaches and verify they give the same answer:</p>
            <p className="font-semibold mt-2 mb-1">Expenditure Data:</p>
            <ul className="list-disc list-inside ml-2 mb-2 text-sm">
              <li>Consumption (C) = $400bn</li>
              <li>Government spending (G) = $100bn</li>
              <li>Investment (I) = $80bn</li>
            </ul>
            <p className="font-semibold mb-1">Income Data:</p>
            <ul className="list-disc list-inside ml-2 mb-2 text-sm">
              <li>Wages = $320bn</li>
              <li>Rent = $60bn</li>
              <li>Interest = $40bn</li>
              <li>Profit = $160bn</li>
            </ul>
            <p className="font-semibold mb-1">Output Data (Value Added by Sector):</p>
            <ul className="list-disc list-inside ml-2 mb-2 text-sm">
              <li>Agriculture = $95bn</li>
              <li>Manufacturing = $195bn</li>
              <li>Services = $240bn</li>
              <li>Government = $50bn</li>
            </ul>
            <MathLine>
{`METHOD 1 — EXPENDITURE APPROACH:
  GDP = C + I + G
      = $400 + $80 + $100
      = $580 billion

METHOD 2 — INCOME APPROACH:
  GDP = Wages + Rent + Interest + Profit
      = $320 + $60 + $40 + $160
      = $580 billion

METHOD 3 — OUTPUT/VALUE-ADDED APPROACH:
  GDP = Agriculture + Manufacturing + Services + Government
      = $95 + $195 + $240 + $50
      = $580 billion

All three methods give: GDP = $580 billion ✓

This confirms the fundamental national income identity:
  National Output ≡ National Income ≡ National Expenditure`}
            </MathLine>
            <p><strong>This is the most important result in national income accounting.</strong> No matter which angle you approach it from — what is produced, what is earned, or what is spent — in a consistent set of accounts, all three approaches arrive at the same GDP figure. Real-world discrepancies (statistical discrepancies) arise due to data collection gaps and timing differences.</p>
          </CalcBox>

          {/* Quick Summary */}
          <div className="mt-12 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 2: National Income Analysis</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>National Income</strong> = total money value of all final goods and services produced by a nation's citizens in a year.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Key measures:</strong> GDP (within borders) → GNP (nationals anywhere) → NNP (after depreciation) → Real GNP (inflation-adjusted).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Three measurement approaches</strong> — Expenditure (Y=C+I+G+X-M), Income (wages+rent+interest+profit), Output (value added) — all give the same answer.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Avoid double counting</strong> — use value added or final product only. Exclude transfer payments.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Real GNP</strong> = Nominal GNP ÷ Price Index × 100. Always use real GNP to compare over time.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Per capita income</strong> = NI ÷ Population. Shows average share — but hides inequality.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>GNP is a flawed welfare measure</strong> — it ignores distribution, environmental costs, and non-monetary welfare.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>International comparisons</strong> require PPP adjustments, identical definitions, and awareness of 13 major statistical and conceptual problems.</span></li>
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
