import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, CheckCircle2, AlertTriangle, Calculator } from "lucide-react";

const sections = [
  { id: "barter", label: "1. Barter System & Its Problems" },
  { id: "history", label: "2. Historical Development of Money" },
  { id: "characteristics", label: "3. Characteristics of Money" },
  { id: "functions", label: "4. Functions of Money" },
  { id: "value", label: "5. Value of Money" },
  { id: "qty-theory", label: "6. Quantity Theory (MV=PT)" },
  { id: "demand-supply", label: "7. Demand & Supply of Money" },
  { id: "central-bank", label: "8. Central Bank" },
  { id: "monetary-policy", label: "9. Monetary Policy Tools" },
  { id: "commercial-banks", label: "10. Commercial Banks" },
  { id: "credit-creation", label: "11. Credit Creation" },
];

function SectionHeading({ id, number, title }: { id: string; number: string; title: string }) {
  return (
    <div id={id} className="scroll-mt-20 pt-12 pb-4 border-b border-border/60 mb-6">
      <p className="text-xs font-bold tracking-widest text-primary uppercase mb-1">{number}</p>
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{title}</h2>
    </div>
  );
}
function ExplainerBox({ children }: { children: React.ReactNode }) {
  return <div className="my-4 flex gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4"><Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" /><div className="text-sm text-foreground/80 leading-relaxed">{children}</div></div>;
}
function ExampleBox({ children }: { children: React.ReactNode }) {
  return <div className="my-4 flex gap-3 rounded-lg border border-green-300/40 bg-green-50 dark:bg-green-900/10 p-4"><CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" /><div className="text-sm text-foreground/80 leading-relaxed">{children}</div></div>;
}
function NoteBox({ children }: { children: React.ReactNode }) {
  return <div className="my-4 flex gap-3 rounded-lg border border-amber-400/30 bg-amber-50 dark:bg-amber-900/10 p-4"><Info className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" /><div className="text-sm text-foreground/80 leading-relaxed">{children}</div></div>;
}
function CalcBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-xl border border-secondary/30 bg-secondary/5 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-secondary/20 bg-secondary/10">
        <Calculator className="h-4 w-4 text-secondary" />
        <p className="font-semibold text-foreground text-sm">{title}</p>
      </div>
      <div className="px-5 py-4 font-mono text-sm text-foreground/80 space-y-1">{children}</div>
    </div>
  );
}
function FormulaBlock({ children }: { children: React.ReactNode }) {
  return <div className="my-3 rounded-lg border border-secondary/30 bg-secondary/10 px-6 py-4 text-center font-mono font-bold text-xl text-foreground">{children}</div>;
}

export default function EconomicsTopic3() {
  const [activeSection, setActiveSection] = useState("barter");
  const [readProgress, setReadProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docH > 0 ? Math.min(100, Math.round((scrollY / docH) * 100)) : 0);
      setShowScrollTop(scrollY > 400);
      const current = sections.map(s => { const el = document.getElementById(s.id); return el ? { id: s.id, top: el.getBoundingClientRect().top } : null; }).filter(Boolean).filter(s => s!.top <= 120);
      if (current.length > 0) setActiveSection(current[current.length - 1]!.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionIndex = sections.findIndex(s => s.id === activeSection);
  const progress = Math.round(((sectionIndex + 1) / sections.length) * 100);

  return (
    <Layout breadcrumbs={[{ label: "Unit 2", href: "/" }, { label: "Week 3: Money and Banking" }]}>
      <Helmet>
        <title>Money and Banking | Economics Study Notes</title>
        <meta name="description" content="Barter trade, historical development of money, functions and characteristics of money, quantity theory (MV=PT), demand and supply of money, central bank, commercial banks, and credit creation." />
        <meta property="og:title" content="Money & Banking — Week 3 | Economics" />
        <meta property="og:image" content="https://notes.xwolf.space/og-home.svg" />
      </Helmet>

      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 3 · Economics</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Money and Banking</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Money is one of the most important inventions in human history — it solved the fundamental problems of barter and made complex, specialised economic life possible. This week covers the origin and evolution of money, its characteristics and functions, how its value is determined (including Irving Fisher's famous <strong>MV = PT</strong> equation), the demand and supply of money, and the roles of both the <strong>Central Bank</strong> and <strong>commercial banks</strong> in the modern economy.
            </p>
          </div>

          {/* ===== SECTION 1 ===== */}
          <SectionHeading id="barter" number="Section 1" title="The Barter System and Its Shortcomings" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Before money existed, people used a <strong>barter system</strong> — the direct exchange of goods and services for other goods and services without using money as an intermediary. A farmer who had excess maize would exchange it for cloth; a potter who needed grain would exchange pots for it. While simple in concept, the barter system had severe practical limitations that prevented the development of complex, specialised economies.
          </p>

          <div className="space-y-3 mb-5">
            {[
              ["Double coincidence of wants", "For a barter transaction to occur, A must have exactly what B wants, AND B must have exactly what A wants — simultaneously. This is called the 'double coincidence of wants' and is extremely difficult to achieve in practice. A teacher who wants maize must find a farmer who specifically wants teaching services. In a complex, diverse economy with millions of different goods, this requirement makes exchange almost impossible to organise efficiently."],
              ["Difficulty of establishing value", "Even when each party has what the other wants, agreeing on a fair exchange rate is extremely difficult. How many pots is a goat worth? How many hours of carpentry is worth a kilo of coffee? Enormous time can be wasted negotiating the 'equations of value' for every individual transaction, making commerce extremely inefficient."],
              ["Indivisibility of large items", "Some goods cannot be conveniently divided for exchange. If a cow is worth two sacks of maize, what happens when you only want one sack? You cannot cut the cow in half. This indivisibility problem makes it impossible to make change or to engage in partial transactions for high-value goods, creating a fundamental obstacle to fair exchange."],
              ["Confusion between use value and exchange value", "In a barter economy, it is easy to confuse what a good is worth for personal use with what it is worth in exchange. This confusion prevents the rational allocation of resources and makes economic efficiency impossible to achieve — you cannot properly price goods or services without a common unit of measurement."],
              ["Impossibility of storing wealth", "If a person produces perishable goods (fish, vegetables, milk), they cannot accumulate wealth over time because their goods will spoil before they can exchange them. This makes saving impossible in a barter economy, preventing capital accumulation and long-term investment."],
              ["Obstacle to specialisation", "A division of labour and specialisation — in which different people and regions do what they are best at — requires complex exchange networks. Without a common medium of exchange, specialisation breaks down because specialists cannot easily convert their specific output into the wide variety of goods they need for daily life."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <ExampleBox>
            <strong>Barter still exists in Kenya today:</strong> In parts of rural northern Kenya, pastoralist communities still engage in informal barter — exchanging livestock for grain during droughts when cash is scarce. The Turkana and Pokot communities sometimes exchange goats for sorghum with agricultural communities in neighbouring areas. These exchanges vividly demonstrate barter's limitations: the transactions only work because both parties happen to want exactly what the other has, and the negotiation of fair exchange rates (how many goats for a 90 kg bag of sorghum?) is complex and time-consuming. The introduction of mobile money (M-Pesa) has dramatically reduced reliance on barter even in these remote areas.
          </ExampleBox>

          {/* ===== SECTION 2 ===== */}
          <SectionHeading id="history" number="Section 2" title="Historical Development of Money" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">The evolution of money is the story of humanity progressively solving the problems of barter by developing increasingly sophisticated and efficient forms of exchange medium.</p>

          <div className="space-y-4 mb-5">
            {[
              { stage: "1. Commodity Money", detail: "The earliest forms of money were commodities that had practical value in their own right — corn, salt, tobacco, cloth, livestock. These were 'generally acceptable' because everyone needed them. Salt was used as currency in ancient Rome (giving us the word 'salary'), and tobacco was used as currency in colonial America. In East Africa, cattle, shells (especially cowrie shells), and cloth served as currency. The problem: commodity money was inconvenient — heavy to transport, perishable over time, variable in quality, and difficult to divide." },
              { stage: "2. Metallic/Precious Metal Money", detail: "As trade developed between cultures, gold and silver emerged as the dominant form of money. They had key advantages: easily recognisable, highly portable relative to their value, virtually indestructible, and scarce enough to maintain their value over time. Initially, metals were used by weight — each transaction required the metal to be weighed on a scale. This was inconvenient and time-consuming for everyday commerce." },
              { stage: "3. Coin Money", detail: "To overcome the inconvenience of weighing metal for every transaction, governments began minting coins — stamping pieces of metal with an official seal guaranteeing their weight and purity. This is the origin of the word 'currency' (from Latin currere, 'to run' — coins could run freely from hand to hand without verification). Coins were later given milled edges so that filing or shaving the edges (clipping) could be detected. Eventually, governments began 'debasing' currency — reducing the intrinsic metal content of coins below their face value. This worked as long as public confidence in the currency was maintained — an early lesson that the value of money rests on trust, not on intrinsic worth." },
              { stage: "4. Paper Money", detail: "As coin money became widespread, wealthy merchants and landowners faced the risk of theft when carrying gold. They began depositing their gold with goldsmiths — trustworthy craftsmen with secure vaults — who issued paper receipts. Initially, people withdrew their gold for each transaction. But they discovered that the paper receipt itself could be transferred as payment — the recipient could withdraw the gold themselves. Over time, receipts were made payable to 'the bearer' (anyone holding the paper, not just the original depositor) and began circulating as money in their own right. This was the origin of paper banknotes. Goldsmiths also discovered that not all depositors withdrew their gold simultaneously — so they could lend out more than they held in gold (fractional backing), earning interest on loans. This was the beginning of banking." },
              { stage: "5. Token Money (Modern Money)", detail: "Today's money is 'token money' — it has no intrinsic value (a Ksh 1,000 note costs almost nothing to print) and is not backed by gold. Its value rests entirely on public confidence and the authority of the state. Modern money supply is linked not to gold reserves but to the level of economic production — the higher the output of goods and services, the more money can circulate without causing inflation. The Central Bank of Kenya issues all notes and coins, and the government guarantees their value as legal tender." },
            ].map(({ stage, detail }) => (
              <div key={stage} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30"><p className="font-semibold text-foreground text-sm">{stage}</p></div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <NoteBox>
            <strong>Key insight — money is a social technology based on trust:</strong> The progression from commodity money to token money reveals that what makes something money is not its intrinsic value but the collective belief that others will accept it. A Ksh 1,000 note is worth 1,000 shillings because everyone believes it is — and that belief is self-fulfilling. When that belief collapses (as in hyperinflationary economies like Zimbabwe in 2008), money loses its value catastrophically, even if the printing presses work overtime.
          </NoteBox>

          {/* ===== SECTION 3 ===== */}
          <SectionHeading id="characteristics" number="Section 3" title="Characteristics of Money" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">For any commodity or asset to successfully function as money, it must possess the following characteristics:</p>

          <div className="grid md:grid-cols-2 gap-3 mb-5">
            {[
              ["Acceptability", "The most fundamental characteristic. Money must be widely accepted in exchange for goods and services by sellers, lenders, and the community at large. Acceptability of modern token money rests on legal tender status (the law requires its acceptance in settlement of debts) and public confidence in the issuing authority. Without acceptability, nothing can function as money."],
              ["Portability", "Money must be easy to carry in sufficient quantities for everyday transactions. Gold coin and paper notes are highly portable. Cattle and grain are not — this is why they eventually failed as money in complex economies. Modern digital money (M-Pesa balances, bank deposits) is even more portable than physical cash."],
              ["Scarcity / Limited Supply", "Money must be scarce enough to maintain its value. If money were unlimited in supply (like air or sand on a beach), it would be worthless — no one would accept unlimited quantities of it in exchange for scarce goods. This is why governments print money carefully and why the Central Bank controls the money supply."],
              ["Divisibility", "Money must be divisible into small units to enable transactions of any size — from buying a matchbox to purchasing a farm. Kenya's currency is highly divisible: 1 cent, 50 cents, 1 shilling, 5, 10, 20, 50 shillings in coins; 50, 100, 200, 500, 1000 shillings in notes."],
              ["Durability", "Money must withstand physical wear and tear through repeated use and many transactions. Precious metals, plastic-coated banknotes, and electronic records are highly durable. Grain, fish, and fruit — which rot — are not suitable as money because they cannot be stored or repeatedly exchanged."],
              ["Homogeneity (Uniformity)", "All units of money of the same denomination must be identical in value. One Ksh 1,000 note must be exactly equal to every other Ksh 1,000 note. This uniformity is essential for money to function as a reliable unit of account. Barter goods are never perfectly uniform (every cow is different), which makes them poor money."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <ExampleBox>
            <strong>Why M-Pesa satisfies all characteristics:</strong> M-Pesa mobile money demonstrates all six characteristics: it is accepted nationwide by millions of merchants and individuals (acceptability); it can be transferred anywhere from a basic phone (portability); the supply is controlled by Safaricom/CBK regulations (scarcity); amounts as small as Ksh 1 can be transferred (divisibility); digital records never wear out (durability); and every shilling is identical (homogeneity). This explains why M-Pesa has become a dominant form of money in Kenya — it fulfils all the characteristics better than cash in many contexts.
          </ExampleBox>

          {/* ===== SECTION 4 ===== */}
          <SectionHeading id="functions" number="Section 4" title="Functions of Money" />

          <div className="space-y-4 mb-5">
            {[
              { fn: "Medium of Exchange", icon: "💱", detail: "The primary and most fundamental function of money. Money acts as an intermediary in all transactions — instead of directly exchanging goods for goods (barter), people sell goods for money and use money to buy goods. This eliminates the need for a double coincidence of wants and makes complex, specialised economic life possible. A teacher in Nairobi receives salary in shillings and uses those shillings to buy food, housing, transport, and clothing from completely unrelated strangers — no barter double-coincidence required. Without money as medium of exchange, the world's complex economic system — based on specialisation and division of labour — would be impossible to sustain.", example: "A Kisumu fisherman sells tilapia to a fish trader for Ksh 5,000. He then uses Ksh 2,000 to buy maize flour, Ksh 1,500 to pay school fees, and Ksh 1,500 to buy diesel for his boat engine. Without money, he would need to find a school that accepts tilapia for fees, a flour miller who wants fish, and a petrol station that trades diesel for tilapia — simultaneously." },
              { fn: "Unit of Account", icon: "📏", detail: "Money provides a common measure of value — a standard unit in which prices are quoted and economic calculations are made. Just as a metre measures length and a kilogram measures mass, the shilling measures economic value. This enables us to compare the relative values of vastly different goods (is a textbook worth more than 5 kg of beef?), calculate profit and loss, prepare budgets, keep accounts, evaluate business performance, and make rational economic choices. It even enables 'window shopping' — comparing values without actually intending to buy.", example: "The Kenya National Bureau of Statistics measures the entire economy's output in shillings (GDP). Without a common unit of account, it would be impossible to add up cars, maize, haircuts, legal services, and iron sheets into a single meaningful economic total." },
              { fn: "Store of Value / Store of Wealth", icon: "🏦", detail: "Money allows people to separate the act of sale from the act of purchase — to earn income now and spend it later. Instead of immediately exchanging your labour for the goods you need, you receive money and store it until you need it. This makes saving, investment, and long-term planning possible. Money is the most liquid store of value — it can be converted into any good or service instantly and without cost. Less durable goods (fresh produce, seasonal crops) depreciate rapidly; owners avoid loss by converting them into money. However, inflation erodes money's store of value — if prices rise faster than your money earns interest, the real value of your savings falls.", example: "A Nairobi teacher saves Ksh 10,000 monthly in a savings account, accumulating funds over 3 years to pay school fees for her child's secondary school. Without money as a store of value, she would need to physically store 3 years' worth of barter goods — impossible for most goods that are perishable." },
              { fn: "Standard of Deferred Payment", icon: "📅", detail: "Many economic transactions involve obligations to pay in the future — mortgages, hire purchase agreements, long-term construction contracts, bank loans, government bonds. Money provides the unit in which these future obligations are denominated, making borrowing and lending possible. A bank lends you Ksh 2 million today for a mortgage, and you agree to repay Ksh 30,000 per month for 10 years. This only works because both parties know exactly what Ksh means and because the value of the shilling is reasonably predictable. When inflation is very high, money's function as a standard of deferred payment breaks down — lenders refuse to lend because the money they receive back will be worth much less in real terms.", example: "The Kenyan government issues Treasury Bonds — borrowing from investors now and promising to repay with interest in 5, 10, or 20 years. These instruments are essential for financing government investment in roads, schools, and hospitals." },
            ].map(({ fn, icon, detail, example }) => (
              <div key={fn} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30 flex items-center gap-3">
                  <span className="text-xl">{icon}</span>
                  <p className="font-semibold text-foreground">{fn}</p>
                </div>
                <div className="px-5 py-4 space-y-3">
                  <p className="text-sm text-foreground/80 leading-relaxed">{detail}</p>
                  <div className="pl-3 border-l-2 border-primary/30">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Kenyan Example</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ===== SECTION 5 ===== */}
          <SectionHeading id="value" number="Section 5" title="The Value of Money and Index Numbers" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The <strong>value of money</strong> refers to its purchasing power — what a given amount of money can buy. Since money is itself the unit of account, we cannot measure its value in money terms. Instead, we measure it indirectly through <strong>prices</strong>: if the prices of goods rise, money can buy less, so its value falls. If prices fall, money buys more, so its value rises.
          </p>

          <FormulaBlock>Value of Money ∝ 1 / Price Level</FormulaBlock>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The standard tool for measuring changes in the price level (and therefore changes in the value of money) is the <strong>Index Number of Prices</strong>. This is a statistical device that expresses price changes as a percentage of prices in a chosen <strong>base year</strong>, which is assigned the value of <strong>100</strong>.
          </p>

          <CalcBox title="How Index Numbers Work">
            <p className="not-italic text-xs text-muted-foreground mb-2">A basket of goods is selected. Their total price is noted in the base year = 100.</p>
            <p>Base year price of basket = Ksh 5,000 → Index = 100</p>
            <p>Next year price of basket = Ksh 5,250</p>
            <p className="text-secondary font-bold">Price Index = (5,250 ÷ 5,000) × 100 = 105</p>
            <p className="not-italic text-xs text-muted-foreground mt-2">→ Prices rose 5%, so the value of money fell by approximately 5% (you can buy 5% less with the same money).</p>
          </CalcBox>

          <div className="space-y-3 mb-4">
            {[
              ["Consumer Price Index (CPI)", "Measures changes in the prices of a 'basket' of goods and services typically purchased by households. In Kenya, the Kenya National Bureau of Statistics (KNBS) compiles the CPI monthly. It is the primary measure of inflation. When politicians and economists say 'inflation is at 6.9%', they mean the CPI rose 6.9% over the past 12 months."],
              ["Retail Price Index (RPI)", "Similar to CPI but may use a different basket composition. Measures retail-level price changes as experienced by consumers when shopping."],
              ["Wholesale Price Index (WPI)", "Measures price changes at the wholesale level — before goods reach retail consumers. Often a leading indicator of future CPI changes since rising wholesale prices tend to be passed on to consumers."],
              ["Export/Import Price Indices", "Measure changes in the prices of goods Kenya exports and imports. Important for assessing Kenya's terms of trade — whether the country is getting a better or worse deal in international commerce over time."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* ===== SECTION 6 ===== */}
          <SectionHeading id="qty-theory" number="Section 6" title="The Quantity Theory of Money — MV = PT" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The <strong>Quantity Theory of Money</strong> attempts to explain the relationship between the quantity of money in circulation and the general price level. It is one of the oldest and most debated theories in economics.
          </p>

          <h3 className="font-semibold text-foreground text-base mt-5 mb-3">The Original (Crude) Quantity Theory</h3>
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">The early version, observed in the 17th century, proposed a simple direct relationship: double the money supply and prices will double. Algebraically:</p>
          <FormulaBlock>P = aM</FormulaBlock>
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">Where P = price level, M = money supply, and a = a constant. If M doubles to 2M, then P doubles to 2aM = 2P.</p>

          <h3 className="font-semibold text-foreground text-base mt-5 mb-3">Irving Fisher's Equation of Exchange (MV = PT)</h3>
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">
            In the 1920s, Professor Irving Fisher revised the theory to include the <strong>velocity of circulation</strong> — the idea that money passes through many hands, so the same unit of money does multiple transactions over a period. His equation of exchange:
          </p>
          <FormulaBlock>MV = PT</FormulaBlock>

          <div className="overflow-x-auto mb-5">
            <table className="text-sm border border-border/40 w-full text-left">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-2 border-b border-border/40 font-bold text-secondary">Symbol</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">Variable</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">Meaning</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  ["M", "Money Supply", "Total amount of money in existence — banknotes, coins, and bank deposits", "Ksh 2 trillion in circulation"],
                  ["V", "Velocity of Circulation", "The average number of times each unit of money changes hands in a period — how hard money is 'working'", "Each shilling used 5 times per year on average"],
                  ["P", "Price Level", "The general average price of all goods and services transacted — a kind of economy-wide price index", "Average price level index = 120"],
                  ["T", "Total Transactions", "The total volume of all economic transactions completed for money during the period", "Total goods and services traded in a year"],
                ].map(([sym, v, m, ex]) => (
                  <tr key={String(sym)}>
                    <td className="px-4 py-3 font-bold text-secondary text-lg">{sym}</td>
                    <td className="px-4 py-3 font-semibold text-foreground text-sm">{v}</td>
                    <td className="px-4 py-3 text-muted-foreground text-sm">{m}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs italic">{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CalcBox title="Worked Example — Applying MV = PT">
            <p className="not-italic text-xs text-muted-foreground mb-3">Given: M = Ksh 1,000,000 | V = 5 | P = ? | T = 2,500,000 units</p>
            <p>MV = PT</p>
            <p>1,000,000 × 5 = P × 2,500,000</p>
            <p>5,000,000 = P × 2,500,000</p>
            <p className="text-secondary font-bold">P = 5,000,000 ÷ 2,500,000 = 2 (price level = 2)</p>
            <p className="not-italic text-xs text-muted-foreground mt-3">Now the money supply doubles to 2,000,000, with V and T unchanged:</p>
            <p>2,000,000 × 5 = P × 2,500,000</p>
            <p className="text-secondary font-bold">P = 10,000,000 ÷ 2,500,000 = 4 → Price level doubled (from 2 to 4)</p>
            <p className="not-italic text-xs text-muted-foreground mt-2">→ This confirms: doubling M doubles P (when V and T are constant).</p>
          </CalcBox>

          <CalcBox title="Key Implication — Prices can rise WITHOUT more money">
            <p className="not-italic text-xs text-muted-foreground mb-2">If V rises (money circulates faster) while M and T stay the same, P rises:</p>
            <p>M = 1,000,000 | V rises from 5 to 8 | T = 2,500,000</p>
            <p>1,000,000 × 8 = P × 2,500,000</p>
            <p className="text-secondary font-bold">P = 8,000,000 ÷ 2,500,000 = 3.2 (was 2 before — prices rose 60%)</p>
            <p className="not-italic text-xs text-muted-foreground mt-2">→ Inflation can be caused by faster circulation, not just more money printing!</p>
          </CalcBox>

          <h3 className="font-semibold text-foreground text-base mt-6 mb-3">Criticisms of the Quantity Theory</h3>
          <div className="space-y-2 mb-4">
            {[
              ["It is a tautology, not a theory", "MV = PT is an identity — it is true by definition, like saying 'money spent = money received.' The left side (MV) and right side (PT) are just two ways of looking at the same total transaction value. A tautology cannot explain causation — it cannot tell us WHY prices change, only that changes in one variable must be matched by changes in others."],
              ["The variables are not independent", "The equation treats M, V, P, and T as if they are separate, independently determined variables. In reality, they are deeply interconnected. An increase in M is likely to affect V (people spend faster when they have more money) and T (more spending drives more production). The equation oversimplifies these complex interactions."],
              ["There is no single 'general price level'", "The equation uses P to represent a single economy-wide price level. In reality, different prices move at different rates and in different directions. Food prices, housing prices, fuel prices, and medical costs all change differently. A single 'P' conceals enormous variation and complexity."],
              ["V is not constant", "The original theory assumed velocity of circulation was constant. In practice, V changes significantly — people may hoard money during recessions (low V) or spend rapidly during economic booms or when expecting inflation (high V). Changes in V can fully offset changes in M, making price predictions unreliable."],
              ["It ignores the demand for money", "The theory approaches money's value entirely from the supply side, ignoring the demand for money (liquidity preference). Keynes demonstrated that the demand for money — people's desire to hold cash — is a crucial determinant of spending, prices, and the velocity of circulation."],
              ["It does not explain how money gets its initial value", "The theory only addresses changes in money's value, not how that value was originally established in the first place."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-red-200/40 bg-red-50/20 dark:bg-red-900/10 p-3">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* ===== SECTION 7 ===== */}
          <SectionHeading id="demand-supply" number="Section 7" title="Demand for and Supply of Money" />

          <h3 className="font-semibold text-foreground text-base mb-3">Demand for Money (Liquidity Preference)</h3>
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            The <strong>demand for money</strong> is not the desire for more income — it is the desire to hold a portion of your wealth in the form of cash (liquid money) rather than in interest-earning assets (bonds, savings accounts, property). Holding money involves an <strong>opportunity cost</strong> — you forgo the interest you could have earned. Keynes identified three motives for holding money:
          </p>
          <div className="space-y-3 mb-5">
            {[
              ["Transactions motive", "People hold money to finance everyday purchases — food, transport, utilities, wages. The amount held for transactions depends primarily on income levels and payment frequency. Higher income → more transactions → more money needed. This is money needed to bridge the gap between when income is received and when it is spent."],
              ["Precautionary motive", "People hold money as a buffer against unexpected expenses — a car breakdown, sudden illness, a redundancy. The precautionary balance provides financial security and reduces vulnerability to financial shocks. The amount held depends on income, access to credit, and individual risk tolerance."],
              ["Speculative motive (Asset motive)", "Keynes argued that people hold money when they expect interest rates to rise (i.e., when they expect bond prices to fall — since bond prices and interest rates move in opposite directions). If you expect interest rates to rise, you hold cash rather than bonds, waiting to buy bonds at the lower price when rates peak. This speculative demand for money is interest-elastic — it falls when interest rates rise (bonds become more attractive) and rises when interest rates fall."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-base mt-5 mb-3">Supply of Money (Money Stock)</h3>
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">The <strong>supply of money</strong> (money stock) refers to the total amount of money available in the economy. Modern economies use multiple measures:</p>

          <div className="overflow-x-auto mb-4">
            <table className="text-sm border border-border/40 w-full text-left">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">Measure</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">Type</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">What It Includes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  ["M0 (Monetary Base)", "Narrow", "Notes and coins in circulation + commercial banks' deposits at the Central Bank. The most liquid — immediately spendable."],
                  ["M1", "Narrow", "M0 + demand deposits (current accounts) at commercial banks. Money that can be spent immediately by writing a cheque or using a card."],
                  ["M2", "Narrow-Broad", "M1 + savings accounts and time deposits at commercial banks. Includes money that can be quickly converted to spending power. Also includes non-interest-bearing deposits ('sight deposits')."],
                  ["M3 / Broad Money", "Broad", "M2 + large time deposits, certificates of deposit (CDs), money market deposits. Includes all bank and financial institution deposits. Slowest to convert to spending power."],
                ].map(([m, t, d]) => (
                  <tr key={String(m)}>
                    <td className="px-4 py-2 font-semibold text-secondary">{m}</td>
                    <td className="px-4 py-2 text-foreground text-sm">{t}</td>
                    <td className="px-4 py-2 text-muted-foreground text-xs">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <NoteBox>
            <strong>Exogenous vs. Endogenous Money Supply:</strong> The Central Bank can try to control the money supply (<strong>exogenous</strong> money — determined by the CBK from outside the economy). But commercial banks can create money through lending in response to business conditions (<strong>endogenous</strong> money — determined by conditions within the economy). In practice, the money supply is partly both: the CBK sets limits and controls, but commercial banks respond to economic incentives within those limits. This is why monetary policy is an imperfect science.
          </NoteBox>

          {/* ===== SECTION 8 ===== */}
          <SectionHeading id="central-bank" number="Section 8" title="The Central Bank" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The <strong>Central Bank</strong> is the apex institution of a country's banking system, typically owned and controlled by the government. In Kenya, this is the <strong>Central Bank of Kenya (CBK)</strong>, established under the Central Bank of Kenya Act. It is the 'banker's bank' and the government's bank — not a commercial institution that competes with ordinary banks.
          </p>

          <div className="space-y-3 mb-5">
            {[
              ["Government's Banker", "The government needs bank accounts into which it can deposit revenues (taxes, grants, borrowings) and from which it can make payments (salaries, infrastructure, debt service). These government accounts are held at the Central Bank. The CBK manages the government's cash flow, advises on financing government operations, and executes transactions on the government's behalf."],
              ["Banker's Bank (and Clearing House)", "Commercial banks deposit their reserves with the Central Bank and can borrow from it when short of cash. The CBK also acts as the clearing house for inter-bank transactions: when a KCB customer writes a cheque to an Equity Bank customer, the CBK facilitates the settlement between the two banks, either by transferring balances in their CBK accounts or by netting out transactions. This clearing function makes the whole inter-bank payment system work."],
              ["Issue of Notes and Coins", "The CBK has the sole legal authority to issue banknotes and coins in Kenya. This monopoly over currency issuance is essential for maintaining public confidence in the currency and for controlling the money supply. The CBK ensures that the physical currency in circulation is adequate, genuine (anti-counterfeiting), and in good condition — removing worn or damaged notes from circulation."],
              ["Lender of Last Resort", "When commercial banks face a sudden liquidity crisis — more withdrawals than they can immediately meet from their own reserves — they can borrow from the CBK as the 'lender of last resort'. The CBK charges a high 'penalty' interest rate (Central Bank Rate in Kenya) to discourage routine borrowing and encourage banks to manage their liquidity prudently. This function prevents bank runs from becoming systemic banking crises. During the 2008 global financial crisis, central banks worldwide served as lenders of last resort to prevent financial system collapse."],
              ["Managing the National Debt", "The CBK manages Kenya's domestic debt — issuing Treasury Bills (short-term, typically 91, 182, or 364 days) and Treasury Bonds (long-term, 2–30 years) on behalf of the government, paying interest, and redeeming them at maturity. It maintains the government securities register and organises regular auctions at which investors (banks, pension funds, insurance companies, individuals) bid to purchase government securities."],
              ["Banking Supervision and Regulation", "The CBK licences, supervises, and regulates all commercial banks and non-bank financial institutions operating in Kenya. It sets minimum capital requirements, examines banks' financial health, enforces prudential regulations, and has the power to intervene in — or close — banks that are mismanaged or insolvent. This supervisory role protects depositors and maintains public confidence in the banking system."],
              ["Operating Monetary Policy", "The CBK's most macroeconomically significant function. It uses monetary policy tools to control the money supply, influence interest rates, and manage inflation. The primary objective of Kenya's monetary policy is to maintain low, stable inflation while supporting economic growth and employment."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-2">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* ===== SECTION 9 ===== */}
          <SectionHeading id="monetary-policy" number="Section 9" title="Monetary Policy Tools" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Monetary policy</strong> is the Central Bank's regulation of the economy through control of the <strong>quantity of money</strong> and the <strong>price of money</strong> (interest rates). Expansionary monetary policy (more money, lower interest rates) stimulates spending and economic activity. Contractionary monetary policy (less money, higher interest rates) restrains spending and controls inflation.
          </p>

          <div className="space-y-4 mb-5">
            {[
              {
                tool: "a) Open Market Operations (OMO)",
                detail: "The CBK buys or sells government securities (Treasury Bills and Bonds) on the open market to adjust the money supply. This is the most commonly used monetary policy tool in developed economies.",
                expand: [
                  "To REDUCE money supply (contractionary): CBK sells government securities to banks and the public. Buyers pay with cheques drawn on commercial banks → reduces bank reserves → banks must reduce lending → money supply contracts. The process reverses through the credit multiplier.",
                  "To INCREASE money supply (expansionary): CBK buys government securities from banks and public. Sellers receive payment → deposit in commercial banks → increases bank reserves → banks can lend more → money supply expands.",
                ],
                example: "When the CBK conducts OMO in Kenya's money markets, it affects the money available for lending in the economy. Active buyers of T-Bills include commercial banks, pension funds like NSSF, and institutional investors — making it an effective channel for monetary transmission."
              },
              {
                tool: "b) Discount Rate / Central Bank Rate (CBR)",
                detail: "The CBR is the interest rate at which the CBK lends to commercial banks (as lender of last resort). When commercial banks need emergency liquidity, they borrow from the CBK at the CBR.",
                expand: [
                  "If CBK RAISES the CBR: Commercial banks face higher borrowing costs → they raise their own lending rates → businesses and consumers borrow less → money supply shrinks → inflation falls. But economic growth may also slow.",
                  "If CBK LOWERS the CBR: Commercial banks' borrowing costs fall → they lower their lending rates → businesses and consumers borrow more → money supply expands → economic activity is stimulated. But inflation risk rises.",
                ],
                example: "In 2023, the CBK raised the CBR from 8.75% to 13% in response to high inflation (driven by a weak shilling and food/fuel price rises). This made loans more expensive — reducing borrowing, cooling inflation, and strengthening the shilling. By 2025, as inflation fell, the CBR was progressively cut back to stimulate growth."
              },
              {
                tool: "c) Variable Reserve Requirements (Cash & Liquidity Ratios)",
                detail: "The CBK requires commercial banks to maintain a minimum fraction of their deposits as reserves — either as vault cash or as deposits at the CBK. The Cash Reserve Ratio (CRR) is the most direct tool of credit control.",
                expand: [
                  "Cash Ratio = Cash Reserves ÷ Total Deposits",
                  "If CBK sets CRR = 1/10 (10%), then: Deposits = 10 × Cash Reserves. A bank with Ksh 100M reserves can create up to Ksh 1 billion in deposits.",
                  "If CBK RAISES the CRR: Banks must hold more reserves → less available to lend → money supply contracts. Directly effective and immediate.",
                  "If CBK LOWERS the CRR: Banks can hold fewer reserves → more available to lend → money supply expands.",
                ],
                example: "In Kenya, the CBK requires commercial banks to maintain a Cash Reserve Ratio of 4.25% (as of 2024). This means for every Ksh 100 deposited, banks must keep Ksh 4.25 at the CBK and cannot lend it out, directly limiting the total lending capacity of the banking system."
              },
              {
                tool: "d) Special Deposits / Supplementary Reserve Requirements",
                detail: "If the CBK needs to drain excess liquidity from the banking system beyond normal reserve requirements, it can call upon commercial banks to place additional 'special deposits' at the CBK — deposits that do not count as part of the banks' required reserves and therefore reduce their lending capacity.",
                expand: [
                  "Special deposits are essentially a tool for soaking up excess liquidity quickly without changing the permanent reserve requirement.",
                  "They are an extraordinary tool used when normal monetary policy is insufficient to control inflation or credit growth.",
                ],
                example: "If Kenyan banks have accumulated excess liquidity (perhaps from large capital inflows) and credit is growing too fast, the CBK can call for special deposits to reduce lending capacity without permanently raising the CRR."
              },
              {
                tool: "e) Moral Suasion (Jawboning)",
                detail: "The CBK can influence commercial banks' behaviour through informal guidance, persuasion, and 'jawboning' — using its authority and relationships to encourage banks to behave in certain ways without formal legal requirements.",
                expand: [
                  "CBK can issue circulars, hold meetings, or make public statements signalling its concerns and expectations.",
                  "Effectiveness depends entirely on commercial banks' willingness to cooperate — it has no legal enforcement mechanism.",
                  "Often used in combination with other tools to guide the direction of credit (e.g., encouraging lending to agriculture or SMEs, or discouraging speculative lending).",
                ],
                example: "The CBK might informally advise Kenyan banks to increase lending to manufacturing SMEs and reduce exposure to real estate speculation — guiding credit allocation without formal regulation."
              },
              {
                tool: "f) General and Selective Credit Controls",
                detail: "The CBK can impose legally enforceable limits on the total amount of credit banks can extend (general controls) or direct credit toward specific sectors of the economy (selective controls).",
                expand: [
                  "General credit controls: Setting a ceiling on total deposits or loans — a hard limit on lending growth.",
                  "Selective credit controls: Requiring banks to allocate a certain proportion of loans to preferred sectors (agriculture, manufacturing, SMEs) or restricting lending to less productive sectors (commercial real estate speculation, consumer imports).",
                  "Particularly important in developing economies where capital markets are limited and the interest rate mechanism is less effective.",
                ],
                example: "The Kenyan government has at various times directed the banking sector to increase lending to agriculture and manufacturing through the CBK's sectoral credit guidelines, recognising that market interest rates alone would not direct enough credit to these strategic sectors."
              },
            ].map(({ tool, detail, expand, example }) => (
              <div key={tool} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-sm">{tool}</p>
                </div>
                <div className="px-5 py-4 space-y-3">
                  <p className="text-sm text-foreground/80 leading-relaxed">{detail}</p>
                  <ul className="space-y-1">
                    {expand.map((e, i) => (
                      <li key={i} className="flex gap-2 text-sm">
                        <span className="text-primary shrink-0 mt-0.5">→</span>
                        <span className="text-foreground/75 leading-relaxed">{e}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pl-3 border-l-2 border-secondary/40">
                    <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Kenya Example</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ===== SECTION 10 ===== */}
          <SectionHeading id="commercial-banks" number="Section 10" title="Commercial Banks" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A <strong>commercial bank</strong> is a financial institution that accepts deposits from the public, lends money to borrowers, and is a member of the clearing house (i.e., holds a current account with the Central Bank). Commercial banks are also called 'joint stock banks' because they are typically owned by shareholders. In Kenya, major commercial banks include Kenya Commercial Bank (KCB), Equity Bank, Co-operative Bank, NCBA, Stanbic, Standard Chartered, and about 40 others licensed by the CBK.
          </p>

          <div className="space-y-3 mb-4">
            {[
              ["Accepting deposits (safe custody)", "Commercial banks provide a safe, secure place for individuals, businesses, and institutions to deposit their money. Deposits can be in current accounts (for daily transactions, no interest), savings accounts (earn interest, some restrictions), or fixed/time deposit accounts (locked for a period, higher interest). This is the foundation of the banking business."],
              ["Lending (advancing loans)", "Banks lend deposited money to credit-worthy borrowers at interest rates higher than they pay on deposits. The difference (interest spread) is the bank's primary source of profit. Banks lend to individuals (mortgages, personal loans, car loans), businesses (working capital, project finance), and government. By channelling savings into productive investment, banks perform a crucial economic function — financial intermediation."],
              ["Providing payment services", "Banks provide current accounts from which cheques can be written, enabling large transactions without handling cash. Modern banks also provide debit cards, credit cards, electronic funds transfers (EFT), RTGS (Real Time Gross Settlement for large payments), mobile banking, and internet banking. These payment services are essential infrastructure for a modern market economy."],
              ["Foreign exchange services", "Commercial banks facilitate international trade and travel by buying and selling foreign currencies and processing international wire transfers. They also issue travellers' cheques and foreign currency accounts, and act as agents of the CBK in implementing Kenya's foreign exchange policy."],
              ["Advisory and other services", "Banks provide financial advice, particularly to business borrowers, to help ensure loans are well-used and repaid. They also offer insurance, investment services, pension administration, and wealth management. Some Kenyan banks have integrated bancassurance (banking + insurance) services, offering life and general insurance through the bank branch network."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* ===== SECTION 11 ===== */}
          <SectionHeading id="credit-creation" number="Section 11" title="Bank Deposits and Credit Creation" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            One of the most important and least understood features of modern banking is the ability of commercial banks to <strong>create money</strong> — not by printing notes, but by making loans. This process is called <strong>credit creation</strong> or the <strong>money multiplier effect</strong>.
          </p>

          <ExplainerBox>
            <strong>The key insight:</strong> When a bank receives a deposit, it does not keep 100% of it in its vault. It keeps only a fraction (the reserve ratio) and lends the rest. The borrower spends the loan, and the recipient deposits it at another bank, which again keeps only a fraction and lends the rest — and so on. Each deposit spawns more deposits throughout the system, multiplying the original deposit many times over.
          </ExplainerBox>

          <CalcBox title="Credit Creation — Step-by-Step Example (CRR = 10%)">
            <p className="not-italic text-xs text-muted-foreground mb-3">Assume Cash Reserve Ratio = 10% (banks must keep 10% of deposits in reserve)</p>
            <p>Initial deposit at Bank A = Ksh 100,000</p>
            <p>Bank A keeps 10% = Ksh 10,000 in reserve</p>
            <p>Bank A lends Ksh 90,000 → borrower spends → deposited at Bank B</p>
            <p className="mt-2">Bank B keeps 10% = Ksh 9,000 in reserve</p>
            <p>Bank B lends Ksh 81,000 → deposited at Bank C</p>
            <p className="mt-2">Bank C keeps Ksh 8,100, lends Ksh 72,900 → and so on...</p>
            <p className="mt-3 text-secondary font-bold">Total deposits created = 100,000 × (1/0.10) = Ksh 1,000,000</p>
            <p className="not-italic text-xs text-muted-foreground mt-1">An initial deposit of Ksh 100,000 creates Ksh 1,000,000 in total deposits — a money multiplier of 10.</p>
          </CalcBox>

          <CalcBox title="Money Multiplier Formula">
            <p>Money Multiplier = 1 ÷ Cash Reserve Ratio (CRR)</p>
            <p className="mt-1">If CRR = 10% (= 0.10): Multiplier = 1 ÷ 0.10 = <span className="text-secondary font-bold">10</span></p>
            <p className="mt-1">If CRR = 20% (= 0.20): Multiplier = 1 ÷ 0.20 = <span className="text-secondary font-bold">5</span></p>
            <p className="mt-1">If CRR = 25% (= 0.25): Multiplier = 1 ÷ 0.25 = <span className="text-secondary font-bold">4</span></p>
            <p className="not-italic text-xs text-muted-foreground mt-2">Higher CRR → smaller multiplier → less money created from each initial deposit → tighter money supply control.</p>
          </CalcBox>

          <CalcBox title="Exam Worked Example — Finding Maximum Credit Creation">
            <p className="not-italic text-xs text-muted-foreground mb-2">Q: A bank receives a deposit of Ksh 5,000,000. The CBK requires a cash reserve ratio of 12.5%. Calculate the maximum total credit that can be created in the banking system.</p>
            <p>Money Multiplier = 1 ÷ CRR = 1 ÷ 0.125 = 8</p>
            <p>Maximum total deposits = Initial deposit × Multiplier</p>
            <p>= 5,000,000 × 8</p>
            <p className="text-secondary font-bold">= Ksh 40,000,000</p>
            <p className="not-italic text-xs text-muted-foreground mt-2">Total new credit created = 40,000,000 − 5,000,000 = <span className="font-semibold">Ksh 35,000,000</span></p>
          </CalcBox>

          <NoteBox>
            <strong>Limits on credit creation in practice:</strong> The theoretical maximum rarely occurs in reality because: (1) borrowers hold some cash rather than depositing everything; (2) banks may voluntarily hold excess reserves beyond the minimum; (3) there may not be enough credit-worthy borrowers; (4) the CBK adjusts the CRR to control the multiplier. The actual money multiplier is always less than the theoretical maximum.
          </NoteBox>

          {/* Summary */}
          <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 3: Money and Banking</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Barter limitations:</strong> double coincidence of wants, value equations, indivisibility, perishability, no specialisation.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Money evolution:</strong> commodity → metallic → coin → paper (goldsmith receipts) → token (backed by output, not gold).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Characteristics:</strong> Acceptability, Portability, Scarcity, Divisibility, Durability, Homogeneity.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Functions:</strong> Medium of exchange, Unit of account, Store of value, Standard of deferred payment.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Quantity Theory:</strong> P = aM (crude); <strong>MV = PT</strong> (Fisher). M = money supply, V = velocity, P = price level, T = transactions. Criticised as tautology; V and T not constant.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Demand for money:</strong> Transactions + Precautionary + Speculative (Keynesian liquidity preference).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>CBK functions:</strong> Government's banker, Banker's bank/clearing house, Issues currency, Lender of last resort, Manages national debt, Supervises banks, Operates monetary policy.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Monetary policy tools:</strong> Open Market Operations, Discount Rate (CBR), Reserve Requirements (CRR), Special Deposits, Moral Suasion, Credit Controls.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Credit creation:</strong> Money Multiplier = 1 ÷ CRR. Example: CRR 10% → multiplier 10 → Ksh 100,000 deposit creates Ksh 1,000,000 total deposits.</span></li>
            </ul>
          </div>

          <div className="h-16" />
        </div>

        {/* Sidebar TOC */}
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-24 space-y-1">
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">Contents</p>
            {sections.map(s => (
              <a key={s.id} href={`#${s.id}`} onClick={e => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }); }}
                className={`block text-xs py-1 px-2 rounded transition-colors ${activeSection === s.id ? "text-primary font-semibold border-l-2 border-primary pl-3" : "text-muted-foreground hover:text-foreground border-l-2 border-transparent pl-3"}`}>{s.label}</a>
            ))}
            <div className="pt-6 border-t border-border mt-4">
              <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">Progress</p>
              <p className="text-xs text-muted-foreground mb-1">Section {sectionIndex + 1} of {sections.length} <span className="text-primary font-semibold">{progress}%</span></p>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </aside>
      </div>

      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90">
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </Layout>
  );
}
