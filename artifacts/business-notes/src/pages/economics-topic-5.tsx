import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, AlertTriangle, CheckCircle2, Calculator } from "lucide-react";

const sections = [
  { id: "classical", label: "1. Classical Theory of Employment" },
  { id: "keynesian-revolution", label: "2. The Keynesian Revolution" },
  { id: "consumption-function", label: "3. The Consumption Function" },
  { id: "mpc-mps", label: "4. MPC and MPS" },
  { id: "apc-aps", label: "5. APC and APS" },
  { id: "table", label: "6. C&S Schedule Table" },
  { id: "investment", label: "7. Investment and the Multiplier" },
  { id: "equilibrium", label: "8. Equilibrium Income" },
  { id: "limitations", label: "9. Limitations of the Keynesian Model" },
  { id: "calculations", label: "10. Worked Examples (20)" },
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

function MathLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-sm bg-muted/60 rounded px-4 py-2 border border-border/40 my-2 overflow-x-auto whitespace-pre">
      {children}
    </div>
  );
}

function CalcBox({ number, title, difficulty, children }: {
  number: number; title: string; difficulty: "Easy" | "Medium" | "Hard"; children: React.ReactNode;
}) {
  const colors = {
    Easy: "bg-green-50 dark:bg-green-900/10 border-green-300/40 text-green-700 dark:text-green-400",
    Medium: "bg-amber-50 dark:bg-amber-900/10 border-amber-300/40 text-amber-700 dark:text-amber-400",
    Hard: "bg-red-50 dark:bg-red-900/10 border-red-300/40 text-red-700 dark:text-red-400",
  };
  return (
    <div className="rounded-xl border border-border/60 bg-card/60 overflow-hidden mb-6" data-testid={`calc-${number}`}>
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border/40 bg-muted/30">
        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">{number}</div>
        <div className="flex-1"><p className="font-semibold text-foreground text-sm">{title}</p></div>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colors[difficulty]}`}>{difficulty}</span>
      </div>
      <div className="px-5 py-4 text-sm text-foreground/80 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function EconomicsTopic5() {
  const [activeSection, setActiveSection] = useState("classical");
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
        .map((s) => { const el = document.getElementById(s.id); return el ? { id: s.id, top: el.getBoundingClientRect().top } : null; })
        .filter(Boolean).filter((s) => s!.top <= 120);
      if (current.length > 0) setActiveSection(current[current.length - 1]!.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionIndex = sections.findIndex((s) => s.id === activeSection);
  const progress = Math.round(((sectionIndex + 1) / sections.length) * 100);

  /* ── Full consumption/savings schedule data ── */
  const csData = [
    { row: 1,  y: 370, c: 375, s: -5  },
    { row: 2,  y: 390, c: 390, s:  0  },
    { row: 3,  y: 410, c: 405, s:  5  },
    { row: 4,  y: 430, c: 420, s: 10  },
    { row: 5,  y: 450, c: 435, s: 15  },
    { row: 6,  y: 470, c: 450, s: 20  },
    { row: 7,  y: 490, c: 465, s: 25  },
    { row: 8,  y: 510, c: 480, s: 30  },
    { row: 9,  y: 530, c: 495, s: 35  },
    { row: 10, y: 550, c: 510, s: 40  },
  ];

  return (
    <Layout breadcrumbs={[
      { label: "Unit 2", href: "/unit/2" },
      { label: "Week 5: Classical & Keynesian Theories" },
    ]}>
      <Helmet>
        <title>Classical &amp; Keynesian Theories — Economics Week 5 | Study Notes</title>
        <meta name="description" content="Say's Law, consumption function, MPC, MPS, APC, APS, investment multiplier, equilibrium income and 20 worked examples." />
        <meta property="og:title" content="Classical &amp; Keynesian Theories — Unit 2 Economics Week 5" />
        <meta property="og:description" content="Say's Law, consumption function, MPC/APC, multiplier and equilibrium income. 20 fully worked calculations." />
        <meta property="og:image" content="https://notes.xwolf.space/og-eco-week5.svg" />
        <meta property="og:url" content="https://notes.xwolf.space/economics/5" />
        <meta name="twitter:title" content="Classical &amp; Keynesian Theories | Study Notes" />
        <meta name="twitter:image" content="https://notes.xwolf.space/og-eco-week5.svg" />
      </Helmet>
      {/* Reading progress bar */}
      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 5</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
              Classical & Keynesian Theories of Employment and Income
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              What determines how many people are employed and how much income the economy generates? This week contrasts the classical "self-correcting market" view with Keynes's revolutionary insight that economies can get trapped in unemployment — and examines the consumption function, propensities to consume and save, the multiplier, and equilibrium output.
            </p>
          </div>

          {/* ===== SECTION 1 ===== */}
          <SectionHeading id="classical" number="Section 1" title="The Classical Theory of Employment" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The <strong>Classical school of economics</strong> — dominant before the 1930s and represented by economists like Adam Smith, David Ricardo, John Stuart Mill, and Alfred Marshall — held an optimistic and elegant view of how market economies work. At the heart of their thinking was <strong>Say's Law</strong>.
          </p>

          <blockquote className="my-6 border-l-4 border-primary/40 pl-6 py-2">
            <p className="font-serif text-lg italic text-foreground/75 leading-relaxed">"Supply creates its own demand."</p>
            <footer className="mt-2 text-sm text-muted-foreground">— Jean-Baptiste Say (1803)</footer>
          </blockquote>

          <ExplainerBox>
            <strong>What does Say's Law mean?</strong> When a firm produces goods, it must pay workers wages, landlords rent, and investors profit. All of these income payments flow back into the economy as spending. So the very act of producing something simultaneously creates enough income to buy that something. Total supply always creates its own total demand — there can never be a general shortage of demand in the economy.
            <br /><br />
            Under Say's Law, recessions with widespread unemployment simply cannot persist. If some workers are unemployed (supply of labour exceeds demand), wages will fall until employers hire them all back. The economy always returns to full employment automatically.
          </ExplainerBox>

          <h3 className="font-semibold text-foreground text-lg mt-6 mb-3">Key Assumptions of Classical Theory</h3>
          <div className="space-y-3 mb-5">
            {[
              ["Perfectly flexible wages and prices", "If unemployment emerges, wages fall until all workers are re-employed. If unsold goods accumulate, prices fall until all goods are sold. Markets always clear."],
              ["Full employment is the normal state", "Since markets always clear, the economy naturally gravitates toward full employment of all resources. Unemployment is either voluntary (workers choosing not to accept lower wages) or temporary (between jobs)."],
              ["Money is a veil", "Money is only used as a medium of exchange — it does not affect real output or employment. What matters are real quantities of goods, services, and factors of production, not money values."],
              ["Investment equals savings automatically", "If people save more and spend less, the interest rate falls, which stimulates borrowing and investment. Savings automatically become investment. There can be no deficiency in aggregate demand."],
              ["The economy is self-regulating", "Government intervention is unnecessary and counterproductive. Markets left alone produce the best outcome. Fiscal stimulus is crowded out by private sector reductions."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground">{detail}</p>
              </div>
            ))}
          </div>

          <ExampleBox>
            <strong>Classical reasoning in action:</strong> Suppose 10% of workers suddenly lose their jobs. Classical economists say: no problem — these unemployed workers will compete for jobs by offering to work for lower wages. Wages fall. Firms, now facing lower labour costs, hire more workers. Full employment is restored. The process is automatic and requires no government intervention.
          </ExampleBox>

          <WarningBox>
            <strong>The problem:</strong> This theory was destroyed by the Great Depression of the 1930s. Unemployment in the USA reached 25% and stayed there for years. Wages and prices did fall — but unemployment did not disappear. The classical automatic self-correction mechanism simply failed to operate. A new theory was needed.
          </WarningBox>

          {/* ===== SECTION 2 ===== */}
          <SectionHeading id="keynesian-revolution" number="Section 2" title="The Keynesian Revolution" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            In 1936, John Maynard Keynes published <em>The General Theory of Employment, Interest and Money</em> — arguably the most influential economics book of the 20th century. Keynes directly challenged Say's Law and the classical framework.
          </p>

          <ExplainerBox>
            <strong>Keynes's core insight:</strong> Say's Law is wrong. People do NOT spend all of their income. They save some of it — and those savings do not automatically become investment. If everyone saves more simultaneously, total spending falls, firms sell less, reduce production, and lay off workers. The economy falls into a recession — and it may stay there, because lower incomes cause even less spending, which causes further layoffs in a downward spiral.
            <br /><br />
            This is Keynes's concept of <strong>effective demand</strong>: it is not potential supply or theoretical purchasing power that drives the economy, but <em>actual spending decisions</em> by households, firms, and governments.
          </ExplainerBox>

          <h3 className="font-semibold text-foreground text-lg mt-6 mb-3">Keynesian vs. Classical — Key Contrasts</h3>
          <div className="overflow-x-auto mb-5">
            <table className="text-sm border border-border/40 w-full text-left">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">Issue</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold text-blue-700 dark:text-blue-400">Classical View</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold text-green-700 dark:text-green-400">Keynesian View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  ["Full employment", "Natural, automatic state", "Not guaranteed; economies can stagnate"],
                  ["Say's Law", "Supply creates its own demand", "Wrong — demand can be deficient"],
                  ["Wage/price flexibility", "Wages & prices adjust quickly", "Wages are sticky (resist downward pressure)"],
                  ["Savings & investment", "Equal via interest rate changes", "Can differ; savings gap causes recessions"],
                  ["Government role", "Minimal; interference is harmful", "Essential; fiscal policy stabilises the economy"],
                  ["Unemployment", "Voluntary or temporary", "Involuntary; can persist for years"],
                  ["Short vs. long run", "Focus on long run equilibrium", "'In the long run we are all dead' — short run matters"],
                ].map(([issue, cls, kyn]) => (
                  <tr key={String(issue)}>
                    <td className="px-4 py-2 font-medium text-foreground">{issue}</td>
                    <td className="px-4 py-2 text-muted-foreground">{cls}</td>
                    <td className="px-4 py-2 text-muted-foreground">{kyn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The Keynesian model identifies <strong>three components of aggregate demand</strong> in a simple closed economy:
          </p>
          <MathLine>{`Aggregate Demand (AD) = C + I + G
C = Consumption (households)
I = Investment (firms)
G = Government spending`}</MathLine>

          <p className="text-base text-foreground/80 leading-relaxed mt-3 mb-4">
            Keynes argued that the <strong>level of national income is determined by the level of aggregate demand</strong>. If AD is low, output is low and unemployment is high. To escape a recession, governments must increase AD — through higher spending (G) or lower taxes (which raise C).
          </p>

          {/* ===== SECTION 3 ===== */}
          <SectionHeading id="consumption-function" number="Section 3" title="The Consumption Function" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Consumption (C) is the largest component of aggregate demand — in most economies it accounts for 60–70% of GDP. Understanding what determines consumption is therefore central to Keynesian analysis.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Keynes proposed a <strong>consumption function</strong> — a relationship between consumption and income. His key behavioural assumption, known as the <strong>fundamental psychological law of consumption</strong>, states:
          </p>

          <blockquote className="my-6 border-l-4 border-primary/40 pl-6 py-2">
            <p className="font-serif text-lg italic text-foreground/75 leading-relaxed">"Men are disposed, as a rule and on average, to increase their consumption as their income increases, but not by as much as the increase in their income."</p>
            <footer className="mt-2 text-sm text-muted-foreground">— John Maynard Keynes, <em>General Theory</em> (1936)</footer>
          </blockquote>

          <p className="text-base text-foreground/80 leading-relaxed mb-3">In mathematical form, the consumption function is:</p>

          <MathLine>{`C = a + bY

Where:
  C = Total consumption expenditure
  a = Autonomous consumption (consumption when income Y = 0)
  b = Marginal Propensity to Consume (MPC) — the slope of the function
  Y = Disposable income (GDP = DI in a simple model)`}</MathLine>

          <ExplainerBox>
            <strong>Autonomous consumption (a)</strong> is the baseline level of consumption that occurs even when income is zero. Even if a household earns nothing, it must still eat, pay rent, and buy necessities — drawing down savings or borrowing. This is why in the table below, at very low incomes, consumption exceeds income and savings are <em>negative</em> (households are <em>dissaving</em>).
            <br /><br />
            <strong>Induced consumption (bY)</strong> is the portion of consumption that depends on income. As income rises, consumption rises by b times the increase in income. If b = 0.75, for every $1 of extra income, households spend $0.75 and save $0.25.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-3">
            From the data in the consumption/savings schedule (see Section 6), we can derive the consumption function:
          </p>
          <MathLine>{`MPC (b) = ΔC/ΔY = 15/20 = 0.75

When Y = 390, C = 390 (break-even: no saving or dissaving)
390 = a + 0.75(390)
390 = a + 292.5
a = 97.5

∴ Consumption Function: C = 97.5 + 0.75Y

Savings Function:       S = −97.5 + 0.25Y
  (since S = Y − C = Y − 97.5 − 0.75Y = −97.5 + 0.25Y)`}</MathLine>

          <NoteBox>
            The savings function is simply <strong>S = Y − C</strong>. If you know the consumption function, you automatically know the savings function. The MPS (marginal propensity to save) is always equal to 1 − MPC. Here: MPS = 1 − 0.75 = 0.25.
          </NoteBox>

          {/* ===== SECTION 4 ===== */}
          <SectionHeading id="mpc-mps" number="Section 4" title="Marginal Propensity to Consume (MPC) and Save (MPS)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The <strong>Marginal Propensity to Consume (MPC)</strong> and <strong>Marginal Propensity to Save (MPS)</strong> measure what happens at the <em>margin</em> — when income changes by one unit. They are the most important parameters in the Keynesian framework.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">MPC — Marginal Propensity to Consume</h3>
              <MathLine>{`MPC = ΔC / ΔY
Change in Consumption
─────────────────────
Change in Income`}</MathLine>
              <p className="text-sm text-foreground/80 mt-2">If income rises by $20bn and consumption rises by $15bn: MPC = 15/20 = <strong>0.75</strong></p>
              <p className="text-sm text-muted-foreground mt-1">MPC is always between 0 and 1 (you can't spend more than 100% of a marginal dollar on consumption while also saving some).</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">MPS — Marginal Propensity to Save</h3>
              <MathLine>{`MPS = ΔS / ΔY
Change in Savings
─────────────────
Change in Income`}</MathLine>
              <p className="text-sm text-foreground/80 mt-2">If income rises by $20bn and savings rise by $5bn: MPS = 5/20 = <strong>0.25</strong></p>
              <p className="text-sm text-muted-foreground mt-1">MPS is always between 0 and 1. Every dollar of extra income is either consumed or saved.</p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 mb-5">
            <p className="font-semibold text-foreground mb-1">The Fundamental Identity</p>
            <MathLine>{`MPC + MPS = 1   (at all times, for any level of income)

Proof: ΔC + ΔS = ΔY  (extra income is either consumed or saved)
Divide both sides by ΔY:
ΔC/ΔY + ΔS/ΔY = 1
    MPC + MPS  = 1  ✓`}</MathLine>
          </div>

          <ExampleBox>
            <strong>Economic policy implication of MPC:</strong> If MPC = 0.75 and the government gives every household a $1,000 tax rebate:
            <ul className="list-disc list-inside mt-1 space-y-0.5">
              <li>$750 will be spent (0.75 × $1,000) — going back into the economy as demand</li>
              <li>$250 will be saved (0.25 × $1,000) — withdrawn from the circular flow</li>
            </ul>
            Higher MPC = more "bang for the buck" from fiscal stimulus. Countries with poorer households (who must spend most of their income) have higher MPCs, making fiscal policy more effective there.
          </ExampleBox>

          <h3 className="font-semibold text-foreground text-lg mt-5 mb-3">Determinants of MPC</h3>
          <ul className="space-y-2 mb-4 text-sm text-foreground/80">
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Income level:</strong> Lower-income households have a higher MPC — they must spend most of what they earn. Wealthy households save a greater proportion.</span></li>
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Wealth:</strong> Wealthier households feel more financially secure and can afford to save more of any income increase (lower MPC).</span></li>
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Consumer confidence:</strong> When people feel confident about the future, they spend more (higher MPC). During uncertainty, they save as a precaution.</span></li>
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Interest rates:</strong> Higher interest rates reward saving, reducing MPC. Lower rates make saving less attractive, raising MPC.</span></li>
            <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Credit availability:</strong> Easy access to credit allows households to consume more than their current income (raising effective MPC).</span></li>
          </ul>

          {/* ===== SECTION 5 ===== */}
          <SectionHeading id="apc-aps" number="Section 5" title="Average Propensity to Consume (APC) and Save (APS)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            While MPC and MPS measure what happens at the <em>margin</em> (when income changes), the <strong>APC and APS</strong> measure the <em>average</em> — what fraction of <em>total</em> income is consumed or saved at a given income level.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">APC — Average Propensity to Consume</h3>
              <MathLine>{`APC = C / Y
  = Total Consumption
    ─────────────────
      Total Income`}</MathLine>
              <p className="text-sm text-foreground/80 mt-2">The fraction (or percentage) of total income that is consumed.</p>
              <p className="text-sm text-muted-foreground mt-1 italic">At row 6 (Y=470, C=450): APC = 450/470 = 45/47 ≈ 0.957 = <strong>96%</strong></p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">APS — Average Propensity to Save</h3>
              <MathLine>{`APS = S / Y
  = Total Savings
    ─────────────
     Total Income`}</MathLine>
              <p className="text-sm text-foreground/80 mt-2">The fraction (or percentage) of total income that is saved.</p>
              <p className="text-sm text-muted-foreground mt-1 italic">At row 6 (Y=470, S=20): APS = 20/470 = 2/47 ≈ 0.043 = <strong>4%</strong></p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-4 mb-5">
            <p className="font-semibold text-foreground mb-1">The APC + APS Identity</p>
            <MathLine>{`APC + APS = 1   (at every income level)

Proof: C + S = Y  (income is either consumed or saved)
Divide both sides by Y:
C/Y + S/Y = 1
APC + APS = 1  ✓

This is because disposable income (DI) is exhausted — it must
be entirely either consumed or saved. There is no third option.`}</MathLine>
          </div>

          <h3 className="font-semibold text-foreground text-lg mb-3">APC Falls and APS Rises as Income Increases</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-3">
            This is one of the key empirical observations in Keynesian economics. As income rises:
          </p>
          <ul className="list-disc list-inside text-foreground/80 ml-2 space-y-2 mb-4 text-sm">
            <li><strong>APC falls</strong> — rich people consume a smaller <em>fraction</em> of their income than poor people. A person earning $10,000/year may spend 98% of it; a person earning $1,000,000/year may spend only 30%.</li>
            <li><strong>APS rises</strong> — as people become wealthier, they save a larger fraction of income. Luxury goods and savings both rise, but savings rise proportionally faster.</li>
          </ul>

          <ExplainerBox>
            <strong>Why does APC fall as income rises?</strong> Remember the consumption function: C = a + bY.
            <br /><br />
            APC = C/Y = (a + bY)/Y = a/Y + b
            <br /><br />
            As Y increases, the term a/Y gets smaller (a fixed number divided by a growing income). So APC = a/Y + b falls as Y rises, approaching b (the MPC) from above. APC is always greater than MPC (because APC includes the autonomous consumption term), and APC declines toward MPC as income rises toward infinity.
          </ExplainerBox>

          <NoteBox>
            <strong>Important distinction:</strong> MPC is a constant in the simple Keynesian model (the slope of the consumption function is fixed). APC varies with income level. At the break-even income level (where C = Y), APC = 1. Below break-even, APC &gt; 1 (households are dissaving). Above break-even, APC &lt; 1 (households are saving).
          </NoteBox>

          {/* ===== SECTION 6 — THE TABLE ===== */}
          <SectionHeading id="table" number="Section 6" title="Consumption and Savings Schedule" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The table below shows a <strong>consumption and savings schedule</strong> — a systematic listing of consumption, savings, APC and APS at each income level. This is the complete table from your lecture slides, with all columns fully calculated.
          </p>

          <div className="overflow-x-auto mb-4">
            <table className="text-sm border border-border/40 w-full text-left">
              <thead className="bg-primary/10">
                <tr>
                  <th className="px-3 py-2 border-b border-border/40 font-semibold text-center">Row</th>
                  <th className="px-3 py-2 border-b border-border/40 font-semibold">Col 1: Income Y<br/><span className="text-xs font-normal text-muted-foreground">(GDP = DI, $bn)</span></th>
                  <th className="px-3 py-2 border-b border-border/40 font-semibold">Col 2: C<br/><span className="text-xs font-normal text-muted-foreground">($bn)</span></th>
                  <th className="px-3 py-2 border-b border-border/40 font-semibold">Col 3: S<br/><span className="text-xs font-normal text-muted-foreground">(1)−(2)</span></th>
                  <th className="px-3 py-2 border-b border-border/40 font-semibold">Col 4: APC<br/><span className="text-xs font-normal text-muted-foreground">(2)÷(1)</span></th>
                  <th className="px-3 py-2 border-b border-border/40 font-semibold">Col 5: APS<br/><span className="text-xs font-normal text-muted-foreground">(3)÷(1)</span></th>
                </tr>
              </thead>
              <tbody>
                {csData.map((r) => {
                  const apc = (r.c / r.y);
                  const aps = (r.s / r.y);
                  const isBreakEven = r.s === 0;
                  const isDissaving = r.s < 0;
                  return (
                    <tr key={r.row} className={`border-b border-border/20 ${isBreakEven ? "bg-green-50/50 dark:bg-green-900/10 font-semibold" : isDissaving ? "bg-red-50/30 dark:bg-red-900/5" : ""}`}>
                      <td className="px-3 py-2 text-center text-muted-foreground">{r.row}</td>
                      <td className="px-3 py-2 font-mono">${r.y}</td>
                      <td className="px-3 py-2 font-mono">${r.c}</td>
                      <td className={`px-3 py-2 font-mono ${isDissaving ? "text-red-600 dark:text-red-400" : ""}`}>
                        {r.s >= 0 ? `$${r.s}` : `−$${Math.abs(r.s)}`}
                        {isDissaving && <span className="ml-1 text-xs">(dissaving)</span>}
                        {isBreakEven && <span className="ml-1 text-xs text-green-700 dark:text-green-400">(break-even)</span>}
                      </td>
                      <td className="px-3 py-2 font-mono">{apc.toFixed(3)} = <span className="text-primary font-semibold">{(apc * 100).toFixed(1)}%</span></td>
                      <td className="px-3 py-2 font-mono">{aps >= 0 ? aps.toFixed(3) : aps.toFixed(3)} = <span className={`font-semibold ${aps < 0 ? "text-red-600 dark:text-red-400" : "text-primary"}`}>{(aps * 100).toFixed(1)}%</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <ExplainerBox>
            <strong>Reading the table:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li><strong>Row 1 (Y=$370):</strong> Consumption ($375) exceeds income ($370) → negative savings (−$5). The household is <em>dissaving</em> — drawing down past savings or borrowing to maintain consumption. APC = 1.014 (consuming 101.4% of income). APS = −0.014.</li>
              <li><strong>Row 2 (Y=$390):</strong> Break-even point — consumption exactly equals income. Savings = 0. APC = 1.000. APS = 0.</li>
              <li><strong>Row 6 (Y=$470):</strong> From the lecture slide — APC = 450/470 = 45/47 ≈ 96%. APS = 20/470 = 2/47 ≈ 4%. Note APC + APS = 96% + 4% = 100% ✓</li>
              <li><strong>MPC throughout:</strong> Every time income rises by $20, consumption rises by $15. MPC = 15/20 = 0.75. MPS = 5/20 = 0.25. These are constant throughout (a property of the linear consumption function).</li>
              <li><strong>APC falls, APS rises</strong> as income increases — confirming the Keynesian fundamental law.</li>
            </ul>
          </ExplainerBox>

          {/* ===== SECTION 7 ===== */}
          <SectionHeading id="investment" number="Section 7" title="Investment and the Keynesian Multiplier" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Investment (I) is the second major component of aggregate demand. Unlike consumption, Keynes treated investment as largely <strong>autonomous</strong> — determined by business expectations and the interest rate, not by current income. This is why it is sometimes called <em>exogenous</em> investment.
          </p>

          <h3 className="font-semibold text-foreground text-lg mb-3">The Investment Multiplier</h3>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            One of Keynes's most powerful insights is the <strong>multiplier effect</strong>: an initial increase in spending (investment, government expenditure) leads to a <em>larger</em> total increase in national income. This happens because one person's spending becomes another person's income, which leads to further spending, and so on.
          </p>

          <ExplainerBox>
            <strong>Multiplier example — step by step:</strong>
            <br />Suppose MPC = 0.75 and the government injects $100m into the economy by building a road.
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Construction workers receive $100m income → spend $75m (MPC=0.75), save $25m</li>
              <li>Those who receive $75m → spend $56.25m, save $18.75m</li>
              <li>Those who receive $56.25m → spend $42.19m, save $14.06m</li>
              <li>…and so on, each round smaller than the last</li>
            </ol>
            <br />
            Total income generated = $100m + $75m + $56.25m + $42.19m + … = <strong>$400m</strong>
            <br />
            The $100m injection multiplied into $400m of total income.
          </ExplainerBox>

          <MathLine>{`The Multiplier Formula:

Multiplier (k) = 1 / (1 − MPC)  =  1 / MPS

If MPC = 0.75:  k = 1/(1−0.75) = 1/0.25 = 4
If MPC = 0.80:  k = 1/(1−0.80) = 1/0.20 = 5
If MPC = 0.50:  k = 1/(1−0.50) = 1/0.50 = 2

Change in National Income = Multiplier × Change in Spending
ΔY = k × ΔI  (or ΔG, or ΔC)`}</MathLine>

          <NoteBox>
            <strong>Key relationship:</strong> The higher the MPC, the larger the multiplier, and the more powerful fiscal policy is. A country where people spend 90% of extra income (MPC=0.9) has a multiplier of 10 — government spending is very effective. A country where people save 50% (MPC=0.5) has a multiplier of only 2 — much less effective.
          </NoteBox>

          {/* ===== SECTION 8 ===== */}
          <SectionHeading id="equilibrium" number="Section 8" title="Equilibrium Income Determination" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Equilibrium national income</strong> is the level of income at which the total output produced equals total aggregate demand — the economy is in balance, with no tendency to expand or contract. There are two equivalent ways to find equilibrium:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">Method 1: AD = AS Approach</h3>
              <p className="text-sm text-foreground/80 mb-2">Equilibrium occurs where Aggregate Demand equals Aggregate Supply (output):</p>
              <MathLine>{`Y = C + I  (two-sector)
Y = C + I + G  (three-sector)
Y = C + I + G + (X−M)  (open economy)`}</MathLine>
              <p className="text-sm text-muted-foreground">In equilibrium, what is produced (Y) equals what is demanded (C+I+G+...).</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">Method 2: Injections = Withdrawals</h3>
              <p className="text-sm text-foreground/80 mb-2">Equilibrium also occurs where injections into the circular flow equal withdrawals:</p>
              <MathLine>{`I + G + X = S + T + M
Injections = Withdrawals
I = Investment
G = Government spending
X = Exports
S = Savings
T = Taxes
M = Imports`}</MathLine>
            </div>
          </div>

          <ExampleBox>
            <strong>Finding equilibrium — example:</strong>
            <br />Given: C = 97.5 + 0.75Y and autonomous Investment I = $52.5bn
            <br /><br />
            Equilibrium: Y = C + I<br />
            Y = (97.5 + 0.75Y) + 52.5<br />
            Y = 150 + 0.75Y<br />
            Y − 0.75Y = 150<br />
            0.25Y = 150<br />
            <strong>Y = $600bn</strong>
            <br /><br />
            Check: C = 97.5 + 0.75(600) = 97.5 + 450 = $547.5bn; S = 600 − 547.5 = $52.5bn = I ✓
          </ExampleBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>What happens when the economy is NOT in equilibrium?</strong>
          </p>
          <ul className="space-y-2 mb-4 text-sm text-foreground/80">
            <li className="flex gap-2"><span className="text-green-600 dark:text-green-400 font-bold shrink-0">▲</span><span>If AD &gt; Y (demand exceeds output): firms are selling more than they produce → inventories fall → firms hire more workers and increase production → income rises until Y = AD.</span></li>
            <li className="flex gap-2"><span className="text-red-600 dark:text-red-400 font-bold shrink-0">▼</span><span>If AD &lt; Y (output exceeds demand): firms are producing more than they sell → inventories accumulate → firms cut production and lay off workers → income falls until Y = AD.</span></li>
          </ul>

          {/* ===== SECTION 9 ===== */}
          <SectionHeading id="limitations" number="Section 9" title="Limitations of the Simple Keynesian Model" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            While the Keynesian model revolutionised economic thinking and remains immensely influential, the <strong>simple Keynesian model</strong> has important limitations. Recognising these helps you understand why economists have developed more sophisticated models.
          </p>

          <div className="space-y-3 mb-4">
            {[
              ["1. Assumes Fixed Prices and Wages (No Inflation Impact)",
               "The model treats the price level as fixed — it only determines the volume of output, not prices. In reality, when aggregate demand rises, prices and wages also rise (inflation). The model cannot explain stagflation (high unemployment AND high inflation simultaneously) or any price-level effects of spending changes.",
               "During the 1970s oil crisis, both unemployment and inflation rose together. The simple Keynesian model predicted they couldn't coexist."],
              ["2. Ignores Supply-Side Factors",
               "The model assumes output is entirely demand-determined — it ignores productivity, technology, resource availability, and labour quality. In reality, the productive capacity of the economy (aggregate supply) also matters enormously. Supply-side shocks (like oil price increases) can cause recessions without any change in demand.",
               "Sub-Saharan African countries often face supply-side constraints — poor infrastructure, skill shortages — that limit output growth even when demand is high."],
              ["3. Assumes Excess Capacity",
               "The model assumes that whenever demand rises, firms can simply produce more by hiring unused workers with idle capital. This is only true in a recession. Near full employment, rising demand mainly raises prices, not output. The model is most applicable in deep recessions, not normal or boom times.",
               ""],
              ["4. No Role for Interest Rates or Monetary Policy",
               "In the simplest version, money and interest rates play no role. In reality, investment (I) is highly sensitive to interest rates. Central banks lower interest rates to stimulate investment and raise them to cool inflation. The IS-LM model extends Keynes by adding money markets and interest rates.",
               "The 2008 financial crisis required aggressive monetary policy (near-zero interest rates, quantitative easing) alongside fiscal stimulus — the simple Keynesian model captures only the fiscal part."],
              ["5. Based on a Closed Economy (Excludes Trade and Exchange Rates)",
               "The basic model ignores imports and exports. In open economies (which includes virtually all modern countries), fiscal stimulus leaks out through imports — some of the spending goes to foreign producers rather than domestic ones. The 'open economy multiplier' is therefore smaller than the closed economy formula suggests.",
               ""],
              ["6. Uses a Simplistic Consumption Function (Constant MPC)",
               "The model assumes MPC is constant at all income levels. In reality, MPC varies over time, between income groups, and in response to expectations about the future. The permanent income hypothesis (Friedman) argues consumption depends on expected long-run income, not current income — which fundamentally alters how fiscal policy works.",
               "A temporary tax rebate has less effect on consumption than a permanent income increase, because people know it won't last."],
              ["7. Does Not Consider Expectations or Future Outlook",
               "Firms and households make decisions based on expectations about the future, not just current conditions. If households expect a recession, they reduce spending today (raising savings) even while current income is stable — worsening the very recession they fear. The model ignores this 'animal spirits' dimension of investment and consumption.",
               ""],
              ["8. Lacks Long-Run Growth Perspective",
               "The Keynesian model is strictly a short-run theory of output fluctuations. It says nothing about long-term economic growth — what determines potential output and how it expands over time. Growth theory (Solow model, endogenous growth) addresses questions the Keynesian model was never designed to answer.",
               ""],
              ["9. Assumes Government Spending Always Increases Output Effectively",
               "The model implicitly assumes that all government spending is productive and directly stimulates demand. In reality, some government spending is wasteful, displaces private investment ('crowding out'), or is slow to inject into the economy due to implementation lags (decision lag, legislative lag, implementation lag).",
               "A government deciding to build a dam to fight a recession must plan, procure, and build — by the time workers are hired, the recession may be over and spending becomes inflationary."],
            ].map(([title, detail, example]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-2">{title}</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{detail}</p>
                {example && <p className="text-xs text-muted-foreground border-t border-border/40 mt-2 pt-2 italic">{example}</p>}
              </div>
            ))}
          </div>

          {/* ===== SECTION 10 — 20 EXAMPLES ===== */}
          <SectionHeading id="calculations" number="Section 10" title="Worked Arithmetic Examples" />

          <div className="flex items-center gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 mb-8">
            <Calculator className="h-6 w-6 text-primary shrink-0" />
            <div>
              <p className="font-semibold text-foreground text-sm">20 Fully Worked Examples — Simple to Complex</p>
              <p className="text-xs text-muted-foreground mt-0.5">Covering APC, APS, MPC, MPS, the consumption function, savings function, equilibrium income, and the multiplier.</p>
            </div>
          </div>

          {/* ── EASY 1-7 ── */}

          <CalcBox number={1} title="Calculating APC and APS from the Table" difficulty="Easy">
            <p><strong>Question:</strong> Using the consumption schedule, at an income of $450bn (Row 5), calculate APC, APS, and verify that APC + APS = 1.</p>
            <MathLine>{`Given: Y = $450bn, C = $435bn, S = $15bn

APC = C / Y = 435 / 450 = 0.9667 = 96.67%

APS = S / Y = 15 / 450  = 0.0333 =  3.33%

Check: APC + APS = 96.67% + 3.33% = 100% ✓`}</MathLine>
            <p><strong>Interpretation:</strong> At income $450bn, households spend 96.67% of their income and save only 3.33%. Notice that APC is less than 100% (unlike at very low incomes where dissaving occurs) — confirming we are above the break-even point.</p>
          </CalcBox>

          <CalcBox number={2} title="Identifying the Break-Even Income Level" difficulty="Easy">
            <p><strong>Question:</strong> At what income level does consumption exactly equal income (break-even point)? What are APC and APS at this point?</p>
            <MathLine>{`Break-even: C = Y (savings = 0)
From the table: Row 2 — Y = $390bn, C = $390bn, S = $0

APC = C/Y = 390/390 = 1.000 = 100%
APS = S/Y = 0/390   = 0.000 = 0%

APC + APS = 100% + 0% = 100% ✓`}</MathLine>
            <p><strong>Interpretation:</strong> At $390bn income, every dollar earned is consumed. There is no saving. Below this point, households dissave (consume more than they earn). Above it, households save a positive amount.</p>
          </CalcBox>

          <CalcBox number={3} title="Calculating MPC from Consecutive Rows" difficulty="Easy">
            <p><strong>Question:</strong> Using any two consecutive rows from the schedule, calculate the MPC and MPS.</p>
            <MathLine>{`Using Row 4 → Row 5:
  ΔY = $450 − $430 = $20bn
  ΔC = $435 − $420 = $15bn
  ΔS = $15  − $10  = $5bn

MPC = ΔC/ΔY = 15/20 = 0.75 = 75%
MPS = ΔS/ΔY = 5/20  = 0.25 = 25%

Verify: MPC + MPS = 0.75 + 0.25 = 1.00 ✓

(This gives the same result using any two consecutive rows
— MPC is constant throughout the linear schedule.)`}</MathLine>
            <p><strong>Key point:</strong> The constant MPC of 0.75 is the slope of the consumption function. For every $20bn rise in income, $15bn is consumed and $5bn is saved — consistently across all income levels.</p>
          </CalcBox>

          <CalcBox number={4} title="Deriving the Consumption Function" difficulty="Easy">
            <p><strong>Question:</strong> Using the MPC and the break-even point from the schedule, derive the consumption function C = a + bY.</p>
            <MathLine>{`We know: MPC = b = 0.75
At break-even: C = Y, so: Y = a + 0.75Y
Rearranging:   Y − 0.75Y = a
               0.25Y = a

At break-even: Y = $390bn
a = 0.25 × 390 = $97.5bn

∴ Consumption Function: C = 97.5 + 0.75Y

Verification (Row 1: Y = 370):
C = 97.5 + 0.75(370) = 97.5 + 277.5 = $375bn ✓

Verification (Row 7: Y = 490):
C = 97.5 + 0.75(490) = 97.5 + 367.5 = $465bn ✓`}</MathLine>
            <p><strong>Autonomous consumption = $97.5bn:</strong> Even if income fell to zero, households would still consume $97.5bn — financed by past savings, borrowing, or government support.</p>
          </CalcBox>

          <CalcBox number={5} title="Deriving the Savings Function" difficulty="Easy">
            <p><strong>Question:</strong> Derive the savings function from the consumption function C = 97.5 + 0.75Y.</p>
            <MathLine>{`Since S = Y − C:
S = Y − (97.5 + 0.75Y)
S = Y − 97.5 − 0.75Y
S = −97.5 + 0.25Y

∴ Savings Function: S = −97.5 + 0.25Y

Verification (Row 1: Y=370):   S = −97.5 + 0.25(370) = −97.5 + 92.5 = −$5bn ✓
Verification (Row 2: Y=390):   S = −97.5 + 0.25(390) = −97.5 + 97.5 =  $0bn ✓
Verification (Row 6: Y=470):   S = −97.5 + 0.25(470) = −97.5 + 117.5 = $20bn ✓`}</MathLine>
            <p><strong>MPS = 0.25</strong> is the slope of the savings function. For every $1 of additional income, $0.25 is saved. The −97.5 is negative autonomous saving (autonomous dissaving) — reflecting the need to borrow/dissave when income is zero.</p>
          </CalcBox>

          <CalcBox number={6} title="Calculating the Multiplier" difficulty="Easy">
            <p><strong>Question:</strong> Given MPC = 0.75, calculate the multiplier. Then calculate the multipliers for MPC = 0.8 and MPC = 0.6.</p>
            <MathLine>{`Multiplier formula: k = 1 / (1 − MPC) = 1 / MPS

If MPC = 0.75:  k = 1/(1−0.75) = 1/0.25 = 4
If MPC = 0.80:  k = 1/(1−0.80) = 1/0.20 = 5
If MPC = 0.60:  k = 1/(1−0.60) = 1/0.40 = 2.5`}</MathLine>
            <p><strong>Implication:</strong> With MPC = 0.75 (multiplier = 4), every $1 of additional government spending raises national income by $4. A higher MPC means a more powerful multiplier — fiscal stimulus is more effective when people spend a larger fraction of extra income.</p>
          </CalcBox>

          <CalcBox number={7} title="Change in Income from Investment — Using the Multiplier" difficulty="Easy">
            <p><strong>Question:</strong> MPC = 0.75. Autonomous investment increases by $50bn. By how much does national income increase?</p>
            <MathLine>{`Multiplier k = 1 / (1 − MPC) = 1 / 0.25 = 4

ΔY = k × ΔI = 4 × $50bn = $200bn

National income rises by $200 billion.

Step-by-step spending rounds to see why:
Round 1: $50bn invested → $50bn income created
Round 2: $50×0.75 = $37.5bn spent → $37.5bn more income
Round 3: $37.5×0.75 = $28.125bn more income
...
Total = 50 × (1 + 0.75 + 0.75² + 0.75³ + ...)
     = 50 × 1/(1−0.75) = 50 × 4 = $200bn ✓`}</MathLine>
            <p>The geometric series of spending rounds converges to exactly 4 times the initial injection. This is the mathematical underpinning of the multiplier formula.</p>
          </CalcBox>

          {/* ── MEDIUM 8-14 ── */}

          <CalcBox number={8} title="Full APC and APS for All Rows" difficulty="Medium">
            <p><strong>Question:</strong> Complete the APC and APS columns for all 10 rows in the consumption/savings schedule. Verify APC + APS = 1 for each.</p>
            <MathLine>{`Row 1:  Y=370, C=375, S=−5
  APC = 375/370 = 1.014 = 101.4%  (dissaving — APC > 1)
  APS = −5/370  = −0.014 = −1.4%
  Sum = 101.4% + (−1.4%) = 100% ✓

Row 2:  Y=390, C=390, S=0
  APC = 390/390 = 1.000 = 100%   (break-even)
  APS = 0/390   = 0.000 = 0.0%
  Sum = 100% + 0% = 100% ✓

Row 3:  Y=410, C=405, S=5
  APC = 405/410 = 0.988 = 98.8%
  APS = 5/410   = 0.012 = 1.2%
  Sum = 98.8% + 1.2% = 100% ✓

Row 4:  Y=430, C=420, S=10
  APC = 420/430 = 0.977 = 97.7%
  APS = 10/430  = 0.023 = 2.3%

Row 5:  Y=450, C=435, S=15
  APC = 435/450 = 0.967 = 96.7%
  APS = 15/450  = 0.033 = 3.3%

Row 6:  Y=470, C=450, S=20
  APC = 450/470 = 0.957 = 95.7%  (≈96% as in the lecture slide)
  APS = 20/470  = 0.043 = 4.3%   (≈4%  as in the lecture slide)

Row 7:  Y=490, C=465, S=25
  APC = 465/490 = 0.949 = 94.9%
  APS = 25/490  = 0.051 = 5.1%

Row 8:  Y=510, C=480, S=30
  APC = 480/510 = 0.941 = 94.1%
  APS = 30/510  = 0.059 = 5.9%

Row 9:  Y=530, C=495, S=35
  APC = 495/530 = 0.934 = 93.4%
  APS = 35/530  = 0.066 = 6.6%

Row 10: Y=550, C=510, S=40
  APC = 510/550 = 0.927 = 92.7%
  APS = 40/550  = 0.073 = 7.3%

Pattern confirmed: APC falls from 101.4% → 92.7% as income rises
                   APS rises from −1.4% → 7.3% as income rises`}</MathLine>
            <p><strong>Key observation:</strong> APC consistently falls and APS consistently rises — confirming Keynes's fundamental psychological law. The transition from dissaving (negative APS) to saving (positive APS) occurs at the break-even income of $390bn.</p>
          </CalcBox>

          <CalcBox number={9} title="Finding Equilibrium Income — Two-Sector Model" difficulty="Medium">
            <p><strong>Question:</strong> Given C = 97.5 + 0.75Y and autonomous investment I = $52.5bn, find equilibrium national income algebraically.</p>
            <MathLine>{`Equilibrium condition: Y = C + I

Y = (97.5 + 0.75Y) + 52.5
Y = 150 + 0.75Y
Y − 0.75Y = 150
0.25Y = 150
Y = 150/0.25
Y = $600bn

Verify:
  C = 97.5 + 0.75(600) = 97.5 + 450 = $547.5bn
  I = $52.5bn
  C + I = 547.5 + 52.5 = $600bn = Y ✓

Also check S = I (injections = withdrawals):
  S = Y − C = 600 − 547.5 = $52.5bn = I ✓`}</MathLine>
            <p><strong>Both equilibrium conditions are satisfied:</strong> AD = AS (Y = C + I) AND S = I (withdrawals = injections). These are two equivalent ways to express the same equilibrium.</p>
          </CalcBox>

          <CalcBox number={10} title="Effect of Government Spending — Three-Sector Equilibrium" difficulty="Medium">
            <p><strong>Question:</strong> From the same economy (C = 97.5 + 0.75Y, I = $52.5bn), the government adds autonomous spending G = $50bn. Find the new equilibrium income and the change from the previous equilibrium.</p>
            <MathLine>{`Previous equilibrium: Y* = $600bn (from Example 9)

New equilibrium condition: Y = C + I + G

Y = (97.5 + 0.75Y) + 52.5 + 50
Y = 200 + 0.75Y
0.25Y = 200
Y = 200/0.25
Y = $800bn

Change in income: ΔY = $800 − $600 = $200bn

Using the multiplier as a check:
  k = 1/0.25 = 4
  ΔY = k × ΔG = 4 × $50bn = $200bn ✓`}</MathLine>
            <p><strong>Government spending of $50bn raises national income by $200bn</strong> — four times the initial injection, due to the multiplier effect. Each round of re-spending amplifies the original impact.</p>
          </CalcBox>

          <CalcBox number={11} title="Tax Cut vs Government Spending — Which is More Effective?" difficulty="Medium">
            <p><strong>Question:</strong> Government has $30bn to inject. Option A: Spend $30bn directly (G↑$30bn). Option B: Cut taxes by $30bn (disposable income rises by $30bn). Which generates more national income? Assume MPC = 0.75.</p>
            <MathLine>{`Option A — Direct Government Spending ($30bn):
  Spending Multiplier = 1/MPS = 1/0.25 = 4
  ΔY = 4 × $30bn = $120bn

Option B — Tax Cut ($30bn):
  Tax cut increases disposable income by $30bn
  BUT households only spend MPC of extra income:
  Initial consumption increase = MPC × $30bn = 0.75 × $30bn = $22.5bn
  (The rest $7.5bn is saved immediately — MPS × $30bn)

  Then the multiplier kicks in on the spending portion:
  ΔY = k × (MPC × Tax Cut)
     = 4 × $22.5bn = $90bn

  Alternatively: Tax Multiplier = −MPC/MPS = −0.75/0.25 = −3
  (Negative because tax cut is opposite of tax increase)
  |ΔY| = 3 × $30bn = $90bn

Comparison:
  Option A (G spending): ΔY = $120bn
  Option B (Tax cut):    ΔY = $90bn

Government spending is MORE effective by $30bn.`}</MathLine>
            <p><strong>Why?</strong> Every dollar of government spending directly adds to aggregate demand. Every dollar of tax cuts only adds MPC × $1 to demand — because households save the rest. Government spending is the more powerful demand-side tool.</p>
          </CalcBox>

          <CalcBox number={12} title="Using MPC to Determine Unknown Income" difficulty="Medium">
            <p><strong>Question:</strong> A household's consumption rises from $320bn to $335bn when income rises from an unknown level Y₁ to $420bn. Calculate MPC, MPS, and find Y₁.</p>
            <MathLine>{`Given: ΔC = 335 − 320 = $15bn, Y₂ = $420bn

Step 1 — We know MPC = ΔC/ΔY, but we need ΔY.
From the standard schedule, ΔC = $15bn corresponds to ΔY = $20bn:
  MPC = 15/20 = 0.75 ✓ (matches our schedule)
  MPS = 1 − 0.75 = 0.25

Step 2 — Find Y₁:
  ΔY = ΔC/MPC = 15/0.75 = $20bn
  Y₁ = Y₂ − ΔY = $420 − $20 = $400bn

Step 3 — Verify using consumption function C = 97.5 + 0.75Y:
  At Y₁=400: C = 97.5 + 0.75(400) = 97.5 + 300 = $397.5bn
  At Y₂=420: C = 97.5 + 0.75(420) = 97.5 + 315 = $412.5bn
  ΔC = 412.5 − 397.5 = $15bn ✓`}</MathLine>
            <p>This type of "reverse engineering" question is common in exams — you are given the change in consumption and an income level, and must find the other income level using the MPC.</p>
          </CalcBox>

          <CalcBox number={13} title="The Paradox of Thrift" difficulty="Medium">
            <p><strong>Question:</strong> An economy has C = 97.5 + 0.75Y, I = $52.5bn. Equilibrium Y = $600bn. Now suppose households decide to save an extra $20bn at every income level (thriftiness increases). Find the new equilibrium. Does total saving increase?</p>
            <MathLine>{`Shift in savings function: S rises by $20bn at every income level.
Equivalently, APC falls — the new consumption function shifts DOWN by $20bn:

New consumption function: C' = (97.5 − 20) + 0.75Y = 77.5 + 0.75Y

New equilibrium: Y = C' + I
Y = (77.5 + 0.75Y) + 52.5
Y = 130 + 0.75Y
0.25Y = 130
Y = $520bn

Change in income: ΔY = $520 − $600 = −$80bn
(Multiplier: −$20bn × 4 = −$80bn ✓)

PARADOX — What happened to total savings?
  Old equilibrium: S = I = $52.5bn
  New equilibrium: S = I = $52.5bn

Total savings are UNCHANGED despite households trying to save more!`}</MathLine>
            <p><strong>The Paradox of Thrift:</strong> When ALL households simultaneously try to save more, national income falls (via the multiplier in reverse). Lower income means less actual saving. The attempt to save more collectively ends in no more saving — but with a lower national income and more unemployment. Individual virtue (saving) creates collective harm.</p>
          </CalcBox>

          <CalcBox number={14} title="Balanced Budget Multiplier" difficulty="Medium">
            <p><strong>Question:</strong> The government simultaneously raises spending G by $60bn AND raises taxes T by $60bn (a balanced budget — deficit unchanged). What is the net effect on national income? MPC = 0.75.</p>
            <MathLine>{`Effect of G increase (+$60bn):
  ΔY from G = k × ΔG = 4 × $60bn = +$240bn

Effect of T increase (+$60bn):
  ΔY from T = −(MPC/MPS) × ΔT = −(0.75/0.25) × $60bn
            = −3 × $60bn = −$180bn
  (Tax increase is contractionary; the negative tax multiplier = −3)

Net effect:
  ΔY = +$240bn − $180bn = +$60bn

This equals exactly the amount of the spending increase!`}</MathLine>
            <p><strong>Balanced Budget Multiplier = 1:</strong> A balanced budget increase (equal rise in G and T) raises national income by exactly the amount of the spending increase — regardless of MPC. This is a famous result in Keynesian economics. Government can stimulate the economy even without increasing the deficit.</p>
          </CalcBox>

          {/* ── HARD 15-20 ── */}

          <CalcBox number={15} title="Full Equilibrium with Trade — Open Economy" difficulty="Hard">
            <p><strong>Question:</strong> In an open economy with MPC = 0.75 and MPS = 0.25, the following data apply: Autonomous consumption a = $100bn, I = $60bn, G = $80bn, Exports X = $40bn, Imports M = $30bn. Find equilibrium income and the open economy multiplier.</p>
            <MathLine>{`Consumption function: C = 100 + 0.75Y

Equilibrium: Y = C + I + G + (X − M)

Y = (100 + 0.75Y) + 60 + 80 + (40 − 30)
Y = (100 + 0.75Y) + 60 + 80 + 10
Y = 250 + 0.75Y
0.25Y = 250
Y = $1,000bn

For open economy multiplier, imports are a withdrawal like savings.
Suppose MPI (marginal propensity to import) = 0.10

Open economy multiplier = 1 / (MPS + MPI)
                       = 1 / (0.25 + 0.10)
                       = 1 / 0.35 = 2.86

Compare: Closed economy multiplier = 1/0.25 = 4

Open economy multiplier (2.86) < Closed economy multiplier (4)
because trade "leaks" some demand abroad.`}</MathLine>
            <p><strong>Policy implication:</strong> In open economies, fiscal policy "leaks" through imports — a portion of every dollar spent ends up buying foreign goods, not domestic ones. Countries with high import propensities (small open economies) get less benefit from fiscal stimulus than large, relatively closed economies like the USA.</p>
          </CalcBox>

          <CalcBox number={16} title="Finding Autonomous Investment from Equilibrium" difficulty="Hard">
            <p><strong>Question:</strong> An economy has C = 120 + 0.8Y. Equilibrium national income is $800bn. Find: (a) autonomous investment I, (b) the multiplier, (c) equilibrium consumption and savings.</p>
            <MathLine>{`(a) Finding autonomous investment I:
At equilibrium: Y = C + I
800 = (120 + 0.8 × 800) + I
800 = (120 + 640) + I
800 = 760 + I
I = $40bn

(b) Multiplier:
MPS = 1 − MPC = 1 − 0.8 = 0.2
k = 1/MPS = 1/0.2 = 5

(c) Equilibrium C and S:
C = 120 + 0.8(800) = 120 + 640 = $760bn
S = Y − C = 800 − 760 = $40bn

Verify S = I: $40bn = $40bn ✓`}</MathLine>
            <p>With MPC = 0.8, the multiplier is 5 — very powerful. A $1 change in autonomous spending generates $5 of income change. This is why countries with high consumer spending propensities (high MPC) often experience more volatile business cycles.</p>
          </CalcBox>

          <CalcBox number={17} title="Recessionary Gap — How Much Stimulus is Needed?" difficulty="Hard">
            <p><strong>Question:</strong> Full employment output (potential GDP) = $800bn. Current equilibrium Y = $680bn. MPC = 0.75. (a) Calculate the recessionary gap. (b) How much government spending is needed to close the gap?</p>
            <MathLine>{`(a) Recessionary gap:
  Output gap = Potential GDP − Actual GDP
             = $800bn − $680bn = $120bn

  The economy is producing $120bn below potential.
  This represents unemployment and wasted productive capacity.

(b) Required government spending to close the gap:
  Multiplier k = 1/MPS = 1/0.25 = 4

  ΔY = k × ΔG
  120 = 4 × ΔG
  ΔG = 120/4 = $30bn

  The government only needs to spend $30bn
  — the multiplier does the rest, generating
  $30bn × 4 = $120bn of additional income.

Verify new equilibrium:
  Old: Y = $680bn
  Rise: ΔY = 4 × $30bn = $120bn
  New: Y = 680 + 120 = $800bn = Full employment ✓`}</MathLine>
            <p>This is the core Keynesian policy prescription: governments don't need to spend the full output gap — only 1/multiplier of it. The multiplier amplifies the initial injection to close the entire gap. This is why Keynes advocated targeted fiscal spending over allowing the economy to remain depressed.</p>
          </CalcBox>

          <CalcBox number={18} title="Inflationary Gap and Reducing Demand" difficulty="Hard">
            <p><strong>Question:</strong> Full employment output = $600bn. Current equilibrium Y = $660bn (the economy is overheating — demand exceeds potential supply, causing inflation). MPC = 0.75. (a) Calculate the inflationary gap. (b) By how much should the government raise taxes to eliminate the inflationary gap?</p>
            <MathLine>{`(a) Inflationary gap:
  Gap = Current Y − Full Employment Y
      = $660bn − $600bn = $60bn

  Aggregate demand is $60bn above what the economy
  can produce at full employment → prices rise (inflation).

(b) Required tax increase to close gap:
  Tax Multiplier = MPC/MPS = 0.75/0.25 = 3
  (tax increases reduce income by 3× the tax increase)

  ΔY = Tax Multiplier × ΔT
  60  = 3 × ΔT
  ΔT = 60/3 = $20bn

  A tax increase of $20bn will reduce national income
  by $20bn × 3 = $60bn, closing the inflationary gap.

New equilibrium: Y = 660 − 60 = $600bn = Full employment ✓

Alternative: Reduce G by ΔG:
  Spending multiplier = 4
  60 = 4 × ΔG → ΔG = $15bn
  Cutting spending by only $15bn closes the same gap!
  (Tax cuts/increases require more action than spending
   changes because of the "first-round savings leakage".)`}</MathLine>
            <p><strong>Policy asymmetry:</strong> To close a $60bn inflationary gap: cut spending by $15bn OR raise taxes by $20bn. Government spending changes are more powerful per dollar than tax changes — because tax changes lose some effect in the first round (people save part of the tax change).</p>
          </CalcBox>

          <CalcBox number={19} title="Complete Consumption Schedule — Missing Values" difficulty="Hard">
            <p><strong>Question:</strong> An economy has autonomous consumption a = $50bn and MPC = 0.8. Complete the consumption and savings schedule for incomes from $100bn to $600bn (in $100bn steps). Calculate APC and APS for each row.</p>
            <MathLine>{`Consumption function: C = 50 + 0.8Y
Savings function:    S = −50 + 0.2Y
Break-even: C=Y → Y = 50 + 0.8Y → 0.2Y=50 → Y=$250bn

Y=$100:  C=50+0.8(100)=$130   S=100−130=−$30  APC=1.30 APS=−0.30
Y=$200:  C=50+0.8(200)=$210   S=200−210=−$10  APC=1.05 APS=−0.05
Y=$250:  C=50+0.8(250)=$250   S=250−250=  $0  APC=1.00 APS= 0.00 ← break-even
Y=$300:  C=50+0.8(300)=$290   S=300−290= $10  APC=0.967 APS=0.033
Y=$400:  C=50+0.8(400)=$370   S=400−370= $30  APC=0.925 APS=0.075
Y=$500:  C=50+0.8(500)=$450   S=500−450= $50  APC=0.900 APS=0.100
Y=$600:  C=50+0.8(600)=$530   S=600−530= $70  APC=0.883 APS=0.117

Multiplier: k = 1/MPS = 1/0.2 = 5

APC falls from 1.30 to 0.883 as income rises.
APS rises from −0.30 to 0.117 as income rises.
APC + APS = 1 at every level. ✓`}</MathLine>
            <p>With MPC = 0.8 (higher than our original 0.75), more income is consumed at every level — APC is higher, APS is lower, and the multiplier (5) is larger. This economy would respond more strongly to both fiscal stimulus and fiscal contraction.</p>
          </CalcBox>

          <CalcBox number={20} title="Full Multi-Step Equilibrium Problem" difficulty="Hard">
            <p><strong>Question:</strong> An economy has the following: C = 97.5 + 0.75Y, I = $60bn, G = $40bn. (a) Find equilibrium income. (b) Government reduces G by $20bn due to austerity. Find new equilibrium and change in income. (c) How large must I increase to offset the austerity cut? (d) What is the budget multiplier if G falls by $20bn and T also falls by $20bn?</p>
            <MathLine>{`(a) Initial equilibrium:
  Y = C + I + G
  Y = (97.5 + 0.75Y) + 60 + 40
  Y = 197.5 + 0.75Y
  0.25Y = 197.5
  Y = $790bn

(b) G falls by $20bn (austerity):
  New Y = C + I + G'
  Y = (97.5 + 0.75Y) + 60 + 20
  Y = 177.5 + 0.75Y
  0.25Y = 177.5
  Y = $710bn

  ΔY = 710 − 790 = −$80bn
  Check: ΔY = k × ΔG = 4 × (−$20bn) = −$80bn ✓
  Austerity shrinks the economy by $80bn.

(c) Required ΔI to offset the austerity cut:
  Need ΔY = +$80bn (to restore original equilibrium)
  ΔI = ΔY/k = $80bn/4 = $20bn
  Investment must rise by $20bn to exactly offset the cut in G.

(d) Simultaneous G cut + T cut (each $20bn):
  Effect of G cut: ΔY = 4 × (−$20bn) = −$80bn
  Effect of T cut: ΔY = Tax Multiplier × ΔT
                      = (MPC/MPS) × (−$20bn)
                      = 3 × (−$20bn) = −$60bn
                      
  Wait — T is cut (reduced), so ΔT = −$20bn:
  ΔY from tax cut = −(MPC/MPS) × ΔT
                  = −3 × (−$20bn) = +$60bn

  Net ΔY = −$80bn (from G cut) + $60bn (from T cut) = −$20bn

  A balanced-budget CUT (reducing both G and T equally)
  REDUCES income by exactly the amount of the cuts ($20bn).
  Balanced Budget Multiplier = −1 (for cuts).`}</MathLine>
            <p><strong>Austerity lesson:</strong> Cutting government spending causes a larger income reduction than the spending cut itself (multiplied by 4×). Simultaneously cutting taxes partially offsets this — but the net effect is still negative (−$20bn). This is why many economists argued that the austerity policies implemented in Europe after 2010 deepened and prolonged recessions in countries like Greece, Spain, and Portugal.</p>
          </CalcBox>

          {/* Summary */}
          <div className="mt-12 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 5</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Classical theory:</strong> Say's Law — supply creates its own demand; full employment is natural; markets self-correct. Destroyed by the Great Depression.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Keynesian revolution:</strong> Demand can be deficient; economies can stagnate; government must intervene via fiscal policy.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Consumption function:</strong> C = a + bY, where a = autonomous consumption, b = MPC.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>MPC + MPS = 1</strong> always; <strong>APC + APS = 1</strong> always. APC falls and APS rises as income increases.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Multiplier k = 1/MPS = 1/(1−MPC).</strong> Initial spending injection is amplified through rounds of re-spending.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Equilibrium:</strong> Y = C + I + G (AD = AS) or equivalently S + T + M = I + G + X (withdrawals = injections).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Recessionary gap:</strong> Required ΔG = Gap/k. <strong>Inflationary gap:</strong> Required ΔT = Gap/(MPC/MPS).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>9 Limitations</strong> of the simple Keynesian model: fixed prices, ignores supply side, no interest rates, closed economy, constant MPC, no expectations, no long-run growth, and lags in government spending effectiveness.</span></li>
            </ul>
          </div>

          <div className="h-16" />
        </div>

        {/* Table of Contents */}
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-24 space-y-1">
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">Contents</p>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }); }}
                className={`block text-xs py-1 px-2 rounded transition-colors ${activeSection === s.id ? "text-primary font-semibold border-l-2 border-primary pl-3" : "text-muted-foreground hover:text-foreground border-l-2 border-transparent pl-3"}`}
              >{s.label}</a>
            ))}
            <div className="pt-6 border-t border-border mt-4">
              <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">Study Progress</p>
              <p className="text-xs text-muted-foreground mb-1">
                Section {sectionIndex + 1} of {sections.length}
                <span className="ml-1 text-primary font-semibold">{progress}%</span>
              </p>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-opacity hover:opacity-90"
          aria-label="Scroll to top">
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </Layout>
  );
}
