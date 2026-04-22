import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Info, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";

const sections = [
  { id: "circular-flow-intro", label: "1. What is the Circular Flow?" },
  { id: "two-sector", label: "2. Two-Sector Economy" },
  { id: "three-sector", label: "3. Three-Sector Economy" },
  { id: "four-sector", label: "4. Four-Sector Economy" },
  { id: "expanded-diagram", label: "5. The Expanded Circular-Flow Diagram" },
  { id: "leakages-injections", label: "6. Leakages and Injections" },
  { id: "macro-history", label: "7. Development of Macroeconomic Theory" },
  { id: "great-depression", label: "8. The Great Depression & Keynes" },
  { id: "post-keynesian", label: "9. Post-Keynesian Era (1950–1974)" },
  { id: "supply-side", label: "10. The Supply-Side Revolution" },
  { id: "expectations", label: "11. Inflation Expectations" },
  { id: "neoclassical-synthesis", label: "12. The Neoclassical Synthesis" },
  { id: "schools", label: "13. Schools of Thought" },
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

export default function EconomicsTopic6() {
  const [activeSection, setActiveSection] = useState("circular-flow-intro");
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
        { label: "Unit 2 — Economics", href: "/" },
        { label: "Circular Flow & Development of Macroeconomic Theory" },
      ]}
    >
      <Helmet>
        <title>Circular Flow & Development of Macroeconomic Theory | Study Notes</title>
        <meta name="description" content="Circular flow of income (two, three, four-sector economies), leakages and injections, development of macroeconomic theory from the Great Depression to modern schools of thought." />
      </Helmet>

      {/* Reading progress bar */}
      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>
          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Unit 2 — Economics</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
              Circular Flow of Income &amp; Development of Macroeconomic Theory
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              How does money move through an economy? Who are the players, what are the flows, and how has our understanding of the macroeconomy evolved since the 1930s? This topic answers those questions in full — from the simple two-sector model to the full four-sector economy and from Keynes to modern schools of thought.
            </p>
          </div>

          {/* ===== SECTION 1 ===== */}
          <SectionHeading id="circular-flow-intro" number="Section 1" title="What is the Circular Flow of Income?" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The <strong>circular flow of income</strong> is a model of the economy that shows how money, goods and services, and factors of production flow continuously between different sectors of the economy. It is one of the most fundamental diagrams in macroeconomics.
          </p>

          <ExplainerBox>
            Think of the economy like blood circulation in the human body. Just as blood circulates continuously through arteries and veins, money and resources circulate continuously between households, firms, the government, financial markets, and the rest of the world. If the flow is interrupted — for example, by a recession or a financial crisis — the entire system is affected, just like a clot in a blood vessel affects the whole body.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The circular flow model helps us understand:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4 ml-2">
            <li>How national income is generated and distributed</li>
            <li>The relationship between households and firms</li>
            <li>The role of the government in the economy</li>
            <li>How international trade affects the domestic economy</li>
            <li>Where leakages (withdrawals) and injections occur</li>
          </ul>

          <NoteBox>
            The circular flow model exists in several versions of increasing complexity — starting with the simple two-sector model (households and firms only), moving to the three-sector model (adding government), and finally the four-sector model (adding the rest of the world).
          </NoteBox>

          {/* ===== SECTION 2 ===== */}
          <SectionHeading id="two-sector" number="Section 2" title="The Two-Sector Economy (Households and Firms)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The simplest version of the circular flow involves only two sectors: <strong>households</strong> and <strong>firms</strong>. This model assumes no government, no saving, no investment, and no foreign trade — a highly simplified "closed" economy.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">What Households Do</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Households own all the factors of production — land, labour, capital, and entrepreneurship. They supply these factors to firms through the <strong>factor market</strong>. In return, firms pay households:
          </p>
          <ul className="list-disc list-inside space-y-1 text-foreground/80 mb-4 ml-2">
            <li><strong>Wages</strong> — payment for labour</li>
            <li><strong>Rent</strong> — payment for land</li>
            <li><strong>Interest</strong> — payment for capital</li>
            <li><strong>Profit</strong> — payment for entrepreneurship</li>
          </ul>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            These payments together form the household's <strong>income</strong>. Households then spend this income buying goods and services from firms through the <strong>goods and services market</strong>. This spending flows back to firms as <strong>revenue</strong>.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">What Firms Do</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Firms use the factors of production supplied by households to produce goods and services. They sell these goods and services in the goods market, and the revenue they earn is used to pay for the factors of production — completing the circle.
          </p>

          <div className="my-6 rounded-lg border border-border bg-muted/30 p-5">
            <p className="text-sm font-semibold text-foreground mb-3 text-center">Two-Sector Circular Flow — Summary</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-center border-collapse">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="p-2 border border-border font-semibold">Flow</th>
                    <th className="p-2 border border-border font-semibold">Direction</th>
                    <th className="p-2 border border-border font-semibold">Market</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-border">Factors of production (labour, land, capital)</td>
                    <td className="p-2 border border-border">Households → Firms</td>
                    <td className="p-2 border border-border">Factor Market</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="p-2 border border-border">Wages, rent, interest, profit (income)</td>
                    <td className="p-2 border border-border">Firms → Households</td>
                    <td className="p-2 border border-border">Factor Market</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-border">Consumer spending (expenditure)</td>
                    <td className="p-2 border border-border">Households → Firms</td>
                    <td className="p-2 border border-border">Goods &amp; Services Market</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="p-2 border border-border">Goods and services (output)</td>
                    <td className="p-2 border border-border">Firms → Households</td>
                    <td className="p-2 border border-border">Goods &amp; Services Market</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <ExplainerBox>
            In the two-sector model, <strong>national income = national expenditure = national output</strong>. This is because every shilling of income earned by households comes from firms, and every shilling households spend flows back to firms. There are no leakages (no savings, no taxes, no imports) and no injections (no investment, no government spending, no exports).
          </ExplainerBox>

          <ExampleBox>
            <strong>Example:</strong> Jane works at a bakery (a firm). The bakery pays her a wage of KES 30,000/month. Jane uses this money to buy bread, clothes, and food — all from firms. Those firms use that revenue to pay their own workers' wages. The money keeps circulating. In this simple model, every shilling stays inside the loop between households and firms indefinitely.
          </ExampleBox>

          {/* ===== SECTION 3 ===== */}
          <SectionHeading id="three-sector" number="Section 3" title="The Three-Sector Economy (Adding Government)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The real economy includes a third major player — the <strong>government</strong>. When we add the government, two new flows enter the model:
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Government as a Leakage: Taxation</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The government collects <strong>taxes</strong> from both households and firms. Taxes represent a <strong>leakage</strong> — they withdraw money from the circular flow. When households pay income tax and firms pay corporate tax, less money is available to circulate between them.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Government as an Injection: Government Spending</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The government re-injects money back into the circular flow through:
          </p>
          <ul className="list-disc list-inside space-y-1 text-foreground/80 mb-4 ml-2">
            <li><strong>Government purchases of goods and services</strong> — buying roads, hospitals, military equipment</li>
            <li><strong>Government transfers</strong> — social welfare payments, pensions, subsidies that go directly to households</li>
          </ul>

          <ExplainerBox>
            The three-sector formula for national income (Y) becomes:<br /><br />
            <strong>Y = C + I + G</strong><br /><br />
            Where:<br />
            <strong>C</strong> = Consumer spending (consumption)<br />
            <strong>I</strong> = Investment spending (by firms)<br />
            <strong>G</strong> = Government spending<br /><br />
            If the government collects more in taxes than it spends, it runs a <strong>budget surplus</strong>. If it spends more than it collects, it runs a <strong>budget deficit</strong> and must borrow — which takes us to financial markets.
          </ExplainerBox>

          <NoteBox>
            Government spending (G) is an injection because it puts money into the circular flow. Taxation (T) is a leakage because it takes money out. When G = T, the budget is <strong>balanced</strong>. When G &gt; T, the government borrows — usually by issuing government bonds, which are purchased through financial markets.
          </NoteBox>

          {/* ===== SECTION 4 ===== */}
          <SectionHeading id="four-sector" number="Section 4" title="The Four-Sector Economy (Adding the Rest of the World)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The most realistic and complete model adds a fourth sector: the <strong>rest of the world</strong> (foreign sector). This converts the model from a closed economy to an <strong>open economy</strong>.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Exports — An Injection from Abroad</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            When domestic firms sell goods and services to foreign buyers, the money flowing into the domestic economy from abroad is called <strong>exports (X)</strong>. Exports are an <strong>injection</strong> — they bring new money into the circular flow from outside.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Imports — A Leakage to Abroad</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            When domestic households and firms buy goods and services from foreign countries, money flows out of the domestic economy. This is called <strong>imports (M)</strong>. Imports are a <strong>leakage</strong> — they remove money from the circular flow.
          </p>

          <div className="my-6 rounded-lg border border-border bg-muted/30 p-5">
            <p className="text-sm font-semibold text-foreground mb-3 text-center">The Four-Sector National Income Formula</p>
            <div className="text-center py-4">
              <p className="text-2xl font-mono font-bold text-primary">Y = C + I + G + (X − M)</p>
            </div>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="p-2 border border-border font-semibold text-left">Component</th>
                    <th className="p-2 border border-border font-semibold text-left">What it represents</th>
                    <th className="p-2 border border-border font-semibold text-center">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-border font-medium">C — Consumption</td>
                    <td className="p-2 border border-border">Household spending on goods and services</td>
                    <td className="p-2 border border-border text-center">Domestic flow</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="p-2 border border-border font-medium">I — Investment</td>
                    <td className="p-2 border border-border">Firm spending on capital goods (machines, buildings)</td>
                    <td className="p-2 border border-border text-center text-green-700 dark:text-green-400">Injection</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-border font-medium">G — Government Spending</td>
                    <td className="p-2 border border-border">Government purchases of goods, services, and transfers</td>
                    <td className="p-2 border border-border text-center text-green-700 dark:text-green-400">Injection</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="p-2 border border-border font-medium">X — Exports</td>
                    <td className="p-2 border border-border">Spending by foreigners on domestic goods and services</td>
                    <td className="p-2 border border-border text-center text-green-700 dark:text-green-400">Injection</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-border font-medium">M — Imports</td>
                    <td className="p-2 border border-border">Domestic spending on foreign goods and services</td>
                    <td className="p-2 border border-border text-center text-red-600 dark:text-red-400">Leakage</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <ExplainerBox>
            The term <strong>(X − M)</strong> is called the <strong>net exports</strong> or <strong>trade balance</strong>:<br /><br />
            — If X &gt; M: the country has a <strong>trade surplus</strong> (more money flows in than out from trade). This is a <em>net injection</em>.<br />
            — If M &gt; X: the country has a <strong>trade deficit</strong> (more money flows out than in from trade). This is a <em>net leakage</em>.<br /><br />
            Kenya, for example, typically runs a trade deficit because it imports more manufactured goods than it exports.
          </ExplainerBox>

          <ExampleBox>
            <strong>Kenya example:</strong> Suppose Kenya's economy in a given year has:<br />
            C = KES 4 trillion (household spending)<br />
            I = KES 1.2 trillion (firm investment in machinery, buildings)<br />
            G = KES 1.8 trillion (government spending on roads, hospitals, salaries)<br />
            X = KES 0.9 trillion (tea, coffee, horticulture exports)<br />
            M = KES 1.4 trillion (oil, electronics, machinery imports)<br /><br />
            Then: <strong>Y = 4 + 1.2 + 1.8 + (0.9 − 1.4) = 4 + 1.2 + 1.8 − 0.5 = KES 6.5 trillion</strong><br /><br />
            Kenya has a trade deficit of KES 0.5 trillion (M &gt; X), which reduces national income.
          </ExampleBox>

          {/* ===== SECTION 5 ===== */}
          <SectionHeading id="expanded-diagram" number="Section 5" title="The Expanded Circular-Flow Diagram" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The <strong>expanded circular-flow diagram</strong> is a detailed visual representation of the four-sector economy. It includes five key participants and shows all the major flows of money, goods, and resources between them.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">The Five Participants</h3>

          <div className="my-4 space-y-3">
            {[
              { actor: "Households", role: "Own factors of production; earn income (wages, profit, interest, rent); spend on goods and services; save through financial markets; pay taxes to government." },
              { actor: "Firms", role: "Hire factors of production; produce goods and services; sell in goods market; borrow and issue stock in financial markets; pay taxes; sell exports to rest of world; buy inputs (including imports)." },
              { actor: "Government", role: "Collects taxes from households and firms; provides government transfers to households; purchases goods and services from firms; borrows from financial markets when running a deficit." },
              { actor: "Financial Markets", role: "Channel private savings from households to firms (through loans and stock purchases); enable government borrowing; facilitate foreign borrowing and foreign lending and purchases of stock." },
              { actor: "Rest of World", role: "Buys exports from domestic firms (injection); sells imports to domestic households and firms (leakage); borrows and lends through financial markets; buys and sells stocks of domestic companies." },
            ].map((item) => (
              <Card key={item.actor} className="border-border">
                <CardContent className="p-4">
                  <p className="font-semibold text-foreground text-sm mb-1">{item.actor}</p>
                  <p className="text-sm text-foreground/75 leading-relaxed">{item.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">Key Flows in the Expanded Diagram</h3>

          <div className="my-6 rounded-lg border border-border bg-muted/30 p-5">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="p-2 border border-border font-semibold text-left">Flow</th>
                    <th className="p-2 border border-border font-semibold text-left">From</th>
                    <th className="p-2 border border-border font-semibold text-left">To</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { flow: "Taxes", from: "Households & Firms", to: "Government" },
                    { flow: "Government transfers (pensions, subsidies)", from: "Government", to: "Households" },
                    { flow: "Government purchases of goods & services", from: "Government", to: "Markets for goods and services" },
                    { flow: "Government borrowing", from: "Financial markets", to: "Government" },
                    { flow: "Private savings", from: "Households", to: "Financial markets" },
                    { flow: "Wages, profit, interest, rent (income)", from: "Factor markets", to: "Households" },
                    { flow: "Wages, profit, interest, rent (cost)", from: "Firms", to: "Factor markets" },
                    { flow: "Consumer spending", from: "Households", to: "Markets for goods & services" },
                    { flow: "GDP (revenue)", from: "Markets for goods & services", to: "Firms" },
                    { flow: "Investment spending", from: "Firms", to: "Markets for goods & services" },
                    { flow: "Borrowing and stock issues by firms", from: "Financial markets", to: "Firms" },
                    { flow: "Exports", from: "Firms", to: "Rest of world" },
                    { flow: "Imports", from: "Rest of world", to: "Markets for goods & services" },
                    { flow: "Foreign borrowing and sales of stock", from: "Rest of world", to: "Financial markets" },
                    { flow: "Foreign lending and purchases of stock", from: "Financial markets", to: "Rest of world" },
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                      <td className="p-2 border border-border font-medium">{row.flow}</td>
                      <td className="p-2 border border-border">{row.from}</td>
                      <td className="p-2 border border-border">{row.to}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <NoteBox>
            Notice that financial markets act as an intermediary throughout the expanded diagram — they connect private savings to firm investment, they fund government deficits, and they channel foreign funds into and out of the domestic economy. This is why disruptions in financial markets (like a banking crisis) send shockwaves through every other sector.
          </NoteBox>

          {/* ===== SECTION 6 ===== */}
          <SectionHeading id="leakages-injections" number="Section 6" title="Leakages and Injections" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            For the economy to remain in <strong>equilibrium</strong>, total injections must equal total leakages. This is a fundamental condition of macroeconomic balance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-green-300/50 dark:border-green-800/50">
              <CardContent className="p-4">
                <p className="font-bold text-green-700 dark:text-green-400 mb-3">Injections (Add to circular flow)</p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li><strong>Investment (I)</strong> — firms spend on capital goods</li>
                  <li><strong>Government Spending (G)</strong> — purchases &amp; transfers</li>
                  <li><strong>Exports (X)</strong> — foreign spending on domestic output</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">Total injections = I + G + X</p>
              </CardContent>
            </Card>
            <Card className="border-red-300/50 dark:border-red-800/50">
              <CardContent className="p-4">
                <p className="font-bold text-red-600 dark:text-red-400 mb-3">Leakages (Withdrawn from circular flow)</p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li><strong>Saving (S)</strong> — households save instead of spend</li>
                  <li><strong>Taxation (T)</strong> — government collects from households &amp; firms</li>
                  <li><strong>Imports (M)</strong> — domestic spending on foreign goods</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3">Total leakages = S + T + M</p>
              </CardContent>
            </Card>
          </div>

          <ExplainerBox>
            <strong>Equilibrium condition:</strong><br /><br />
            Total Injections = Total Leakages<br />
            <strong>I + G + X = S + T + M</strong><br /><br />
            This does NOT mean each pair must balance individually (investment doesn't have to equal saving, or exports equal imports). What matters is that the <em>total</em> injections equal the <em>total</em> leakages for the economy to be in equilibrium.<br /><br />
            If injections exceed leakages → national income rises (economy expands).<br />
            If leakages exceed injections → national income falls (economy contracts or enters recession).
          </ExplainerBox>

          <ExampleBox>
            <strong>Example:</strong> Suppose in Kenya's economy:<br />
            Investment (I) = 120 billion, Government spending (G) = 180 billion, Exports (X) = 90 billion<br />
            Saving (S) = 100 billion, Taxes (T) = 150 billion, Imports (M) = 140 billion<br /><br />
            Total injections = 120 + 180 + 90 = <strong>390 billion</strong><br />
            Total leakages = 100 + 150 + 140 = <strong>390 billion</strong><br /><br />
            The economy is in equilibrium. National income is stable. Notice that I ≠ S and G ≠ T and X ≠ M — but the totals balance.
          </ExampleBox>

          {/* ===== SECTION 7 ===== */}
          <SectionHeading id="macro-history" number="Section 7" title="Development of Macroeconomic Theory" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Macroeconomics as a formal discipline is relatively young — it developed primarily in the 20th century, largely in response to real-world economic crises that existing theory could not explain. Understanding the historical development of macroeconomic thought is essential for understanding why economists think the way they do today.
          </p>

          <ExplainerBox>
            Before macroeconomics existed as a separate field, economists relied on <strong>classical economics</strong> — the tradition of Adam Smith, David Ricardo, and Alfred Marshall. Classical economists believed that free markets were self-correcting: prices and wages would adjust automatically to clear markets, and the economy would always return to full employment on its own. Government intervention was seen as unnecessary and even harmful.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            This classical view held reasonably well during the 19th century, when recessions were short and recovery was relatively quick. But it was completely shattered by an event that classical theory could not explain — the Great Depression.
          </p>

          {/* ===== SECTION 8 ===== */}
          <SectionHeading id="great-depression" number="Section 8" title="The Great Depression and the Birth of Keynesian Economics" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The <strong>Great Depression</strong> of the 1930s was the most severe and prolonged economic downturn in modern history. It began in the United States in 1929 and quickly spread to the rest of the world.
          </p>

          <div className="my-6 rounded-lg border border-border bg-muted/30 p-5">
            <p className="text-sm font-semibold text-foreground mb-3">The Scale of the Great Depression</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="p-2 border border-border font-semibold text-left">Indicator</th>
                    <th className="p-2 border border-border font-semibold text-left">What Happened</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-border">Unemployment</td>
                    <td className="p-2 border border-border">Rose to 15–25% in the 1930s in developed economies</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="p-2 border border-border">Duration</td>
                    <td className="p-2 border border-border">Lasted throughout most of the 1930s — over a decade</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-border">Classical explanation</td>
                    <td className="p-2 border border-border">None — classical theory said this should be self-correcting. It wasn't.</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="p-2 border border-border">Policy response (initially)</td>
                    <td className="p-2 border border-border">Governments cut spending and raised taxes — worsening the depression</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Partly as a reaction to the Great Depression, and with the publication of <strong>John Maynard Keynes</strong>'s landmark work <em>The General Theory of Employment, Interest and Money</em> in <strong>1936</strong>, modern macroeconomics was born.
          </p>

          <ExplainerBox>
            Keynes's central insight was this: <strong>aggregate demand matters</strong>. The economy does not automatically return to full employment because prices and wages do not fall fast enough to clear markets during a recession. When people are afraid of losing their jobs, they save more and spend less — which reduces aggregate demand, causing more unemployment. This is the <strong>paradox of thrift</strong>: what seems rational for each individual (saving more) is destructive for the economy as a whole when everyone does it simultaneously.<br /><br />
            Keynes's solution: the government should intervene — increasing its own spending (G) to compensate for the fall in private demand. This is called <strong>fiscal stimulus</strong>.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Keynes's General Theory gave economists and governments a framework for understanding what causes large and sometimes prolonged fluctuations in the level of employment — and, crucially, what to do about them.
          </p>

          <WarningBox>
            Note: The text notes in your assignment refer to "modern microeconomics" being developed — this is almost certainly a typo or printing error in the source material. The correct term is <strong>macroeconomics</strong>. The Great Depression gave birth to modern <em>macroeconomic</em> analysis, not microeconomics, since the Depression was a problem of the whole economy (aggregate demand collapse), not of individual markets.
          </WarningBox>

          {/* ===== SECTION 9 ===== */}
          <SectionHeading id="post-keynesian" number="Section 9" title="The Post-Keynesian Era: 1950–1974 — Demand-Side Focus" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            From <strong>1950 to the early 1970s</strong>, post-Keynesian macroeconomic analysis focused <em>almost exclusively</em> on those fluctuations in employment that had their origins in fluctuations in <strong>aggregate demand</strong>.
          </p>

          <ExplainerBox>
            This demand-oriented analysis, and soon made explicit, was the explanation of how to prevent such fluctuations — that is, how to keep the economy operating near <strong>full employment</strong>. The goal was clear: if the government monitored aggregate demand and used fiscal and monetary policy to keep it at the right level, the economy would stay near full employment.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            And remarkably, it worked — for a while. In the period from <strong>World War II to 1972</strong>, the economy kept operating reasonably close to its full-employment level. There were recessions — in 1949, 1954, 1958, 1961, and 1970 — but these were <strong>mild</strong> compared with the catastrophic unemployment rates of 15 to 25 percent seen in the 1930s.
          </p>

          <NoteBox>
            The recessions of the 1950s and 1960s were shallow and short-lived precisely because governments now had Keynesian tools — they could cut taxes, increase spending, or lower interest rates to boost aggregate demand and pull the economy back toward full employment. The post-war period became known as the "Golden Age" of economic growth in many developed countries.
          </NoteBox>

          <ExampleBox>
            <strong>Example — The 1958 Recession:</strong> The United States economy contracted in 1958, with unemployment rising to about 7.5%. The government responded with tax cuts and increased government spending. Within two years, the economy had recovered and unemployment had fallen back to around 5%. This was seen as a vindication of Keynesian demand management.
          </ExampleBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            However, the success of demand management carried within it a dangerous assumption: that all recessions had <strong>demand-side causes</strong>. Economists and policymakers began to believe they had solved the business cycle. They were wrong.
          </p>

          {/* ===== SECTION 10 ===== */}
          <SectionHeading id="supply-side" number="Section 10" title="The Supply-Side Revolution: 1974 and the Oil Crisis" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            In <strong>1974</strong>, a deep recession developed that had its origins in a <strong>shift in aggregate supply</strong>, mainly from the <strong>first oil price increase</strong> (the OPEC oil embargo of 1973–74).
          </p>

          <ExplainerBox>
            <strong>What happened:</strong> The Organisation of Arab Petroleum Exporting Countries (OAPEC) imposed an oil embargo on nations that had supported Israel during the 1973 Arab-Israeli War. This cut off oil supplies to the United States and Western Europe. Oil prices quadrupled almost overnight.<br /><br />
            Oil is an input in virtually every industry — it powers factories, fuels transport, heats buildings, and is used to make plastics and chemicals. When oil prices quadrupled, production costs rose across the entire economy. This caused a <strong>leftward shift in aggregate supply</strong> — less output at every price level.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            This possibility — that a recession could originate from a supply shock rather than a demand collapse — had been <strong>largely ignored</strong> by previous macroeconomic analysis. Keynesian tools were designed to manage demand; they were ineffective against a supply shock.
          </p>

          <div className="my-6 rounded-lg border border-border bg-muted/30 p-5">
            <p className="text-sm font-semibold text-foreground mb-3">The 1974–75 Stagflation Crisis</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="p-2 border border-border font-semibold text-left">Indicator</th>
                    <th className="p-2 border border-border font-semibold text-left">What Happened</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border border-border">Unemployment</td>
                    <td className="p-2 border border-border">Rose to approximately 9% by 1975</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="p-2 border border-border">Inflation</td>
                    <td className="p-2 border border-border">Reached 10% by 1975</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-border">The Keynesian policy dilemma</td>
                    <td className="p-2 border border-border">Boosting demand to fight unemployment would worsen inflation; reducing inflation would worsen unemployment</td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="p-2 border border-border">Term coined</td>
                    <td className="p-2 border border-border"><strong>Stagflation</strong> — simultaneous stagnation (high unemployment) + inflation (rising prices)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <WarningBox>
            <strong>Stagflation destroyed the Phillips Curve consensus.</strong> Economists had believed there was a stable trade-off between unemployment and inflation — you could have low unemployment at the cost of higher inflation, or low inflation at the cost of higher unemployment. Stagflation — high unemployment AND high inflation at the same time — showed that this trade-off was not stable.
          </WarningBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            This shift in the source of fluctuations moved macroeconomics on to the study of the <strong>supply side</strong>, completing the earlier story begun on the demand side. From this point, macroeconomic analysis had to integrate both demand disturbances and supply disturbances into the analysis of fluctuations in employment.
          </p>

          {/* ===== SECTION 11 ===== */}
          <SectionHeading id="expectations" number="Section 11" title="The Role of Inflation Expectations" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            In <strong>1980</strong>, demand expansion and the <strong>second oil price increase</strong> (following the 1979 Iranian Revolution) pushed inflation back above 10 percent. The deep recession of <strong>1982</strong> brought unemployment above 10 percent, but reduced inflation surprisingly quickly.
          </p>

          <ExplainerBox>
            <strong>Why did inflation fall so quickly?</strong> This illustrated the important role of <strong>inflation expectations</strong> in the economy. When the Federal Reserve (US central bank) under Paul Volcker raised interest rates sharply in the early 1980s, it sent a clear signal that it was committed to reducing inflation. As a result, workers and firms began to <em>expect</em> lower inflation — so wage demands fell, and firms stopped raising prices as rapidly. Inflation fell faster than most economists predicted.<br /><br />
            This showed that expectations are not just a side effect of economic policy — they <em>are</em> economic policy. If people expect inflation to be low, it tends to be low; if they expect it to be high, it tends to be high. This is why central bank <strong>credibility</strong> matters enormously.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Since the 1970s, macroeconomists have increasingly integrated <strong>expectations</strong> into their analysis of the economy. This led to two important theoretical developments:
          </p>

          <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4 ml-2">
            <li><strong>Adaptive expectations</strong> — people form expectations about the future based on what happened in the past (looking backward)</li>
            <li><strong>Rational expectations</strong> — people use all available information to form the best possible forecast of the future (looking forward)</li>
          </ul>

          <NoteBox>
            The rational expectations hypothesis, developed by economists Robert Lucas and Thomas Sargent in the 1970s, had revolutionary implications. It suggested that systematic government policy could be anticipated and offset by rational economic agents — making policy much harder to use effectively. This became the cornerstone of the "New Classical" school.
          </NoteBox>

          {/* ===== SECTION 12 ===== */}
          <SectionHeading id="neoclassical-synthesis" number="Section 12" title="The Neoclassical Synthesis and Full Employment" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            One important consequence of the development of modern macroeconomics — which taught us reasonably well <strong>how to maintain full employment</strong> — is that it restores the importance of <strong>classical microeconomics</strong>, as suggested by Paul Samuelson's term the <strong>neoclassical synthesis</strong>.
          </p>

          <ExplainerBox>
            <strong>The Neoclassical Synthesis</strong> is the idea that macroeconomics and microeconomics are complementary, not contradictory:<br /><br />
            — Macroeconomics is needed to explain and correct situations where the economy is <em>not</em> at full employment — where resources are idle and output is below potential.<br />
            — But once the economy is <em>at</em> full employment (which macroeconomic policy can achieve), classical microeconomics — with its theory of optimum allocation of scarce resources — becomes valid and crucially important again.<br /><br />
            In other words: use macroeconomics to get to full employment; then use microeconomics to allocate resources efficiently at that full-employment level.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            If the economy is operating near full employment, the theory of <strong>optimum allocation of scarce resources</strong> is once again valid and crucially important. Increases in output under these conditions <em>do</em> have opportunity costs.
          </p>

          <ExampleBox>
            <strong>The US Defence Spending Example (1965–1967):</strong> Once the US economy had reached roughly full employment by 1965, a $25 billion increase in defence spending (driven by the Vietnam War) had to come from somewhere — from reduced output elsewhere. In that case, it came mainly from reduced output of <strong>housing</strong> and <strong>consumer durables</strong> (cars, appliances), at a time when family formation (and therefore demand for housing) was soaring. This was the opportunity cost — an example of why microeconomic resource allocation becomes critically important at full employment.
          </ExampleBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Another result of approximate mastery of the theory of income determination was the turn of macroeconomists' attention to <strong>dynamic questions of growth</strong> in the 1960s, and to the medium-term dynamics that move the economy from an initial equilibrium towards a <strong>long-run growth path</strong> in the 1970s.
          </p>

          {/* ===== SECTION 13 ===== */}
          <SectionHeading id="schools" number="Section 13" title="Schools of Thought in Macroeconomics" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            There have long been <strong>two main intellectual traditions</strong> in macroeconomics. These two schools represent fundamentally different views about how the economy works and what, if anything, the government should do about it.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-primary/30">
              <CardContent className="p-5">
                <p className="font-bold text-primary mb-3 text-base">School 1: The Free-Market School</p>
                <p className="text-sm font-medium text-foreground mb-2">Core belief: "Markets work best if left to themselves."</p>
                <ul className="space-y-2 text-sm text-foreground/80 mt-3">
                  <li>Markets are inherently efficient and self-correcting</li>
                  <li>Prices and wages adjust quickly to restore equilibrium</li>
                  <li>Government intervention distorts price signals and reduces efficiency</li>
                  <li>Monetary policy should follow rules (e.g., fixed money growth), not discretion</li>
                  <li>Fiscal policy crowds out private investment and is largely ineffective</li>
                  <li>Recessions are temporary; the market will self-correct if left alone</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4 font-medium">Key thinkers: Adam Smith, Milton Friedman (Monetarists), Robert Lucas, Thomas Sargent (New Classicals)</p>
              </CardContent>
            </Card>
            <Card className="border-secondary/30">
              <CardContent className="p-5">
                <p className="font-bold text-secondary mb-3 text-base">School 2: The Interventionist School</p>
                <p className="text-sm font-medium text-foreground mb-2">Core belief: "Government intervention is necessary."</p>
                <ul className="space-y-2 text-sm text-foreground/80 mt-3">
                  <li>Markets have failures — monopoly power, externalities, information asymmetries</li>
                  <li>Prices and wages are "sticky" — they do not adjust quickly enough to prevent prolonged unemployment</li>
                  <li>Active fiscal policy (government spending and taxation) is needed to stabilise the economy</li>
                  <li>Monetary policy should be used flexibly to respond to economic conditions</li>
                  <li>Left to themselves, economies can remain stuck in recession for years (as in the 1930s)</li>
                  <li>Government has a responsibility to maintain full employment</li>
                </ul>
                <p className="text-xs text-muted-foreground mt-4 font-medium">Key thinkers: John Maynard Keynes, Paul Samuelson, Joseph Stiglitz (New Keynesians)</p>
              </CardContent>
            </Card>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">The New Classical School</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The New Classical school, which rose to prominence in the 1970s and 1980s, combines the free-market tradition with rational expectations. Its key claims are:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4 ml-2">
            <li>Economic agents (households, firms) have <strong>rational expectations</strong> — they use all available information to anticipate government policy and adjust their behaviour accordingly</li>
            <li>Because agents anticipate policy, <strong>systematic government policy is ineffective</strong> — it is already priced into decisions before it takes effect</li>
            <li>Only <strong>unexpected</strong> policy changes can affect real output, and even then only temporarily</li>
            <li>Fluctuations in employment are the result of workers making <strong>optimal choices</strong> given the information available to them — unemployment is largely voluntary</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">The New Keynesian School</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            New Keynesian economists accept some insights from the New Classicals (especially rational expectations) but argue that market imperfections mean the economy does not self-correct quickly. Their key claims are:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80 mb-4 ml-2">
            <li><strong>Prices and wages are sticky</strong> — due to menu costs, long-term contracts, and efficiency wages, they do not adjust instantly to clear markets</li>
            <li>Because of price stickiness, demand shocks can cause prolonged periods of unemployment that the market will not quickly correct</li>
            <li><strong>Active monetary and fiscal policy can be effective</strong>, especially when price stickiness means markets don't self-correct</li>
            <li>Market failures — information asymmetries, credit market imperfections, coordination failures — justify a role for government intervention</li>
          </ul>

          <NoteBox>
            Today, most mainstream central banks and governments operate broadly within a New Keynesian framework — using monetary policy (interest rate changes) as the primary tool to stabilise output and inflation, while using fiscal policy in severe downturns (as happened during the 2008 Global Financial Crisis and the 2020 COVID-19 pandemic). The debate between the two schools continues — and is never far from the headlines whenever a new economic crisis strikes.
          </NoteBox>

          <ExampleBox>
            <strong>The 2020 COVID-19 Pandemic Response:</strong> When the pandemic hit, governments worldwide embraced massive fiscal stimulus — helicopter money, furlough schemes, direct cash transfers. This was firmly Keynesian: use government spending to support aggregate demand when private demand collapses. Free-market economists cautioned about long-term debt and inflation risks. Both concerns turned out to be partly right: the stimulus prevented a deep depression, but inflation surged in 2021–2022 as supply chains were disrupted and demand recovered faster than supply.
          </ExampleBox>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <Link href="/economics/5">
                <a className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors">
                  ← Classical &amp; Keynesian Theories
                </a>
              </Link>
              <Link href="/">
                <a className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                  Back to Home →
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky Sidebar Nav */}
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-20">
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">On this page</p>
            <div className="flex flex-col gap-0.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`text-xs px-3 py-1.5 rounded transition-colors ${
                    activeSection === s.id
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Section progress</p>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{progress}% through sections</p>
            </div>
          </div>
        </aside>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-2.5 text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </Layout>
  );
}
