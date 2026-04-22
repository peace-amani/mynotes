import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Info, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";

const sections = [
  { id: "definition", label: "1. What is a Partnership?" },
  { id: "advantages", label: "2. Advantages & Disadvantages" },
  { id: "agreement", label: "3. The Partnership Agreement" },
  { id: "partnership-act", label: "4. The Partnership Act" },
  { id: "capital-accounts", label: "5. Partners' Capital Accounts" },
  { id: "current-accounts", label: "6. Partners' Current Accounts" },
  { id: "profit-share", label: "7. Profit Sharing" },
  { id: "drawings", label: "8. Drawing Rights & Interest on Drawings" },
  { id: "interest-capital", label: "9. Interest on Capital" },
  { id: "salaries", label: "10. Partners' Salaries" },
  { id: "goodwill", label: "11. Goodwill" },
  { id: "appropriation", label: "12. Appropriation of Profits" },
  { id: "guaranteed", label: "13. Guaranteed Share of Profits" },
  { id: "debit-balance", label: "14. Debit Balance on Current Accounts" },
  { id: "worked-examples", label: "15. Worked Examples" },
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

function LedgerTable({ title, headers, rows, totals }: {
  title?: string;
  headers: string[];
  rows: (string | number | null)[][];
  totals?: (string | number | null)[];
}) {
  return (
    <div className="my-4 overflow-x-auto">
      {title && <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{title}</p>}
      <table className="w-full text-sm border-collapse border border-border/60 font-mono">
        <thead>
          <tr className="bg-muted/50">
            {headers.map((h, i) => (
              <th key={i} className="border border-border/60 px-3 py-2 text-left text-xs font-bold text-foreground/70 uppercase">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="even:bg-muted/20">
              {row.map((cell, ci) => (
                <td key={ci} className="border border-border/60 px-3 py-1.5 text-foreground/80 whitespace-nowrap">{cell ?? ""}</td>
              ))}
            </tr>
          ))}
          {totals && (
            <tr className="bg-muted/50 font-bold border-t-2 border-border">
              {totals.map((cell, ci) => (
                <td key={ci} className="border border-border/60 px-3 py-2 text-foreground whitespace-nowrap">{cell ?? ""}</td>
              ))}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function AccountingTopic1() {
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

  return (
    <Layout breadcrumbs={[{ label: "Accounting", href: "/unit/accounting" }, { label: "Topic 1: Partnership Accounts" }]}>
      <Helmet>
        <title>Partnership Accounts — Accounting Topic 1 | Study Notes</title>
        <meta name="description" content="Complete study notes on Partnership Accounts — agreement, capital, current accounts, appropriation of profits, goodwill, and worked examples." />
      </Helmet>

      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>
          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase mb-3">Accounting — Topic 1</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Partnership Accounts</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A partnership arises when two or more people go into business together to share profits and losses. Unlike a sole trader, partners pool their capital, skills, and effort — but also share risk and liability. This topic covers how partnership accounts are structured, how profits are divided, and how to prepare appropriation accounts and partners' current accounts.
            </p>
          </div>

          {/* ===== SECTION 1 ===== */}
          <SectionHeading id="definition" number="Section 1" title="What is a Partnership?" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A <strong>partnership</strong> is created when a sole proprietor takes in one or more partners (co-proprietors) to carry on business together in common with a view to profit. In Kenya, a partnership is <em>not</em> a corporate entity — it is simply a collection of individuals jointly carrying on business. This distinction matters: the partnership itself cannot own property, sue or be sued in its own name; the partners do so personally.
          </p>
          <ExplainerBox>
            <strong>Simple analogy:</strong> Imagine two friends — Amina and Brian — each have unique strengths. Amina is great at marketing; Brian is great at production. Together, they start a furniture business. They pool their money, share the work, and split the profits. That arrangement, once formalised, is a partnership. The key feature is that they are co-owners of the same business — not employer and employee.
          </ExplainerBox>
          <ExampleBox>
            <strong>Real-world example:</strong> Many law firms, accounting firms (like the original partnerships that later became KPMG or PwC), and medical practices in Kenya start as partnerships. Doctors, for example, often form a partnership clinic where each partner contributes capital, sees their own patients, and shares overhead costs (rent, staff, equipment) proportionately.
          </ExampleBox>

          {/* ===== SECTION 2 ===== */}
          <SectionHeading id="advantages" number="Section 2" title="Advantages and Disadvantages of a Partnership" />
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg border border-green-300/40 bg-green-50 dark:bg-green-900/10 p-4">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3">Advantages</h3>
              <ul className="space-y-3 text-sm text-foreground/80">
                <li>
                  <strong>Risk is shared:</strong> Business risks are spread among more than one person. If the business suffers a loss, no single partner bears the full burden alone. This makes it easier to take reasonable business risks.
                </li>
                <li>
                  <strong>Specialist skills:</strong> Individual partners can develop specialist skills upon which the other partners can rely. One partner may handle finance, another handles operations, another handles client relations — giving the business greater depth than any one person could provide.
                </li>
                <li>
                  <strong>More capital:</strong> Certain partners may be able to inject more capital resources than a sole trader could raise alone. More capital means a bigger business, more inventory, better equipment, and more growth.
                </li>
                <li>
                  <strong>Less formal:</strong> A partnership is less formal to set up than a company, which requires the issue of shares, appointment of directors, and registration with the Registrar of Companies. Partners can start trading quickly and dissolve the business more easily if needed.
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-red-300/40 bg-red-50 dark:bg-red-900/10 p-4">
              <h3 className="font-semibold text-red-800 dark:text-red-300 mb-3">Disadvantages</h3>
              <ul className="space-y-3 text-sm text-foreground/80">
                <li>
                  <strong>Disputes between partners:</strong> Disagreements over business direction, profit sharing, or workload can destroy a partnership. One difficult partner can paralyse the whole business.
                </li>
                <li>
                  <strong>Joint and several liability:</strong> This is the most serious disadvantage. If the partnership incurs debts or is sued, <em>every partner</em> is personally liable — even if only one partner caused the problem. A creditor can pursue any one partner for the full amount owed, regardless of their profit share.
                </li>
                <li>
                  <strong>No limited liability:</strong> Unlike company shareholders, partners cannot limit their liability. If the business fails with large debts, partners may lose personal assets — their homes, cars, savings — to settle those debts.
                </li>
              </ul>
            </div>
          </div>
          <ExampleBox>
            <strong>Joint and several liability — example:</strong> Ali and Moi are partners in a transport business. Moi, without consulting Ali, takes a large loan from a supplier and then disappears. The supplier can pursue Ali for the full amount — even though Ali knew nothing about it. Ali would have to pay and then try to recover from Moi personally. This is the real danger of a partnership.
          </ExampleBox>

          {/* ===== SECTION 3 ===== */}
          <SectionHeading id="agreement" number="Section 3" title="The Partnership Agreement" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A <strong>partnership agreement</strong> (also called a partnership deed) is the governing document of the partnership. It need not necessarily be in written form — an oral agreement is legally valid — but a written deed is strongly recommended to avoid future disputes. The agreement governs the relationships between partners and typically includes the following terms:
          </p>
          <div className="space-y-3 mb-6">
            {[
              { num: "1", title: "Identity and Nature", desc: "The name of the firm, the type of business it carries on, and the duration of the partnership (whether fixed-term or continuing)." },
              { num: "2", title: "Capital Contributions", desc: "How much capital each partner will introduce at the start and any obligations to contribute additional capital in future." },
              { num: "3", title: "Division of Profits", desc: "The ratio in which profits and losses are shared. This may include salaries paid to partners — but note these are a device for calculating the division of profit, not a salary in the employment sense. They are paid out of profits, not before them." },
              { num: "4", title: "Drawing Rights", desc: "How much money each partner can withdraw for personal use, how often, and whether there are limits." },
              { num: "5", title: "Dissolution arrangements", desc: "What happens when the partnership ends — whether by mutual agreement, death of a partner, or retirement. How assets will be distributed and debts settled." },
              { num: "6", title: "Dispute resolution", desc: "The mechanism for settling disagreements between partners — whether through mediation, arbitration, or the courts." },
              { num: "7", title: "Accounts and audit", desc: "The preparation and audit of the partnership's financial accounts, including the frequency of accounting and who is responsible." },
            ].map(item => (
              <div key={item.num} className="flex gap-3 rounded-lg border border-border/60 bg-card/50 p-4">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{item.num}</span>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-foreground/75">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ===== SECTION 4 ===== */}
          <SectionHeading id="partnership-act" number="Section 4" title="The Partnership Act" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            In the absence of a partnership deed, or where the deed is silent on a particular matter, the <strong>Partnership Act</strong> provides the default rules. These are the rules that apply automatically unless the partners have agreed otherwise in their deed.
          </p>
          <NoteBox>
            <strong>The Partnership Act's default provisions — memorise these:</strong>
            <ol className="list-decimal list-inside space-y-2 mt-2">
              <li>Every partner has a right to take part in the conduct of the business.</li>
              <li>All profits and losses are to be shared <strong>equally</strong> by the partners — regardless of how much capital each contributed.</li>
              <li><strong>No interest</strong> is to be allowed to any partner on their capital.</li>
              <li><strong>No salary</strong>, commission, or other remuneration (except profit share) is to be allowed to any partner.</li>
              <li>If a partner extends a <strong>loan</strong> to the firm (in addition to their capital), that partner is entitled to interest at <strong>5% per annum</strong> on the amount lent.</li>
              <li>Every partner has the right to inspect the firm's books of accounts.</li>
            </ol>
          </NoteBox>
          <ExampleBox>
            <strong>Why this matters:</strong> Suppose Solo and Jaco start a business. Solo contributes Ksh 2,000,000 in capital and Jaco contributes Ksh 500,000. They never write a partnership deed. At the end of the year, profits are Ksh 600,000. Under the Partnership Act, they split this <em>equally</em> — Ksh 300,000 each — regardless of the fact that Solo put in four times as much money. This can be very unfair, which is exactly why a written partnership deed is so important.
          </ExampleBox>

          {/* ===== SECTION 5 ===== */}
          <SectionHeading id="capital-accounts" number="Section 5" title="Partners' Capital Accounts" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Partners contribute capital as specified in the partnership deed. When capital is introduced, the accounting entry is:
          </p>
          <div className="rounded-lg border border-border/60 bg-muted/30 p-4 mb-4 font-mono text-sm">
            <p className="text-foreground/70 mb-1"><strong>Dr:</strong> Cash Book / Bank Account</p>
            <p className="text-foreground/70"><strong>Cr:</strong> Individual Capital Account of each partner</p>
          </div>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Capital accounts are <strong>fixed accounts</strong> — their balances remain constant throughout the year. They are only changed in exceptional circumstances, such as when a new partner is admitted, a partner retires, or the partnership is dissolved and assets are revalued. Day-to-day movements like profit shares, drawings, and salaries are kept in a separate <strong>current account</strong>.
          </p>
          <ExplainerBox>
            <strong>Why keep capital and current accounts separate?</strong> The capital account shows how much each partner has permanently invested in the business — the stable foundation. The current account shows the running balance of what each partner is owed or owes on account of profits, drawings, and other adjustments. Keeping them separate makes it easy to see at a glance: (a) how much permanent capital each partner has contributed, and (b) whether each partner has been drawing more or less than their entitlement.
          </ExplainerBox>

          <p className="text-sm font-semibold text-foreground mb-2">Partners' Fixed Capital Accounts (T-Account format):</p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse border border-border/60 font-mono">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border/60 px-3 py-2 text-left text-xs font-bold text-foreground/70 w-1/4">Date / Details</th>
                  <th className="border border-border/60 px-3 py-2 text-right text-xs font-bold text-foreground/70">Ali (Sh)</th>
                  <th className="border border-border/60 px-3 py-2 text-right text-xs font-bold text-foreground/70">Moi (Sh)</th>
                  <th className="border border-border/60 px-2 py-2 text-center text-xs font-bold text-foreground/50 w-4">||</th>
                  <th className="border border-border/60 px-3 py-2 text-left text-xs font-bold text-foreground/70 w-1/4">Date / Details</th>
                  <th className="border border-border/60 px-3 py-2 text-right text-xs font-bold text-foreground/70">Ali (Sh)</th>
                  <th className="border border-border/60 px-3 py-2 text-right text-xs font-bold text-foreground/70">Moi (Sh)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border/60 px-3 py-2 text-foreground/80">Dec 31 — Bal c/f</td>
                  <td className="border border-border/60 px-3 py-2 text-right text-foreground/80">xxx</td>
                  <td className="border border-border/60 px-3 py-2 text-right text-foreground/80">xxx</td>
                  <td className="border border-border/60 px-2 py-2 text-center text-foreground/30">‖</td>
                  <td className="border border-border/60 px-3 py-2 text-foreground/80">Jan 1 — Bal b/f</td>
                  <td className="border border-border/60 px-3 py-2 text-right text-foreground/80">xxx</td>
                  <td className="border border-border/60 px-3 py-2 text-right text-foreground/80">xxx</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* ===== SECTION 6 ===== */}
          <SectionHeading id="current-accounts" number="Section 6" title="Partners' Current Accounts" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The <strong>current account</strong> (also called a fluctuating capital account) is a running account for each partner that records all transactions other than the permanent capital. It is adjusted with:
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            <div className="rounded-lg border border-green-300/40 bg-green-50 dark:bg-green-900/10 p-3">
              <p className="text-xs font-bold text-green-700 dark:text-green-400 mb-2 uppercase">Credits (amounts owed TO the partner)</p>
              <ul className="text-sm text-foreground/80 space-y-1">
                <li>• Opening balance brought forward (if credit)</li>
                <li>• Share of profit for the period</li>
                <li>• Partner's salary (from partnership deed)</li>
                <li>• Interest on capital</li>
              </ul>
            </div>
            <div className="rounded-lg border border-red-300/40 bg-red-50 dark:bg-red-900/10 p-3">
              <p className="text-xs font-bold text-red-700 dark:text-red-400 mb-2 uppercase">Debits (amounts owed BY the partner)</p>
              <ul className="text-sm text-foreground/80 space-y-1">
                <li>• Drawings taken during the year</li>
                <li>• Interest charged on drawings</li>
                <li>• Share of losses (if any)</li>
                <li>• Opening balance brought forward (if debit)</li>
              </ul>
            </div>
          </div>

          <p className="text-sm font-semibold text-foreground mb-2">Partners' Current Accounts (T-Account format):</p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse border border-border/60 font-mono">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border/60 px-2 py-2 text-left text-xs font-bold text-foreground/70 w-1/4">DR Side</th>
                  <th className="border border-border/60 px-2 py-2 text-right text-xs font-bold text-foreground/70">Ali</th>
                  <th className="border border-border/60 px-2 py-2 text-right text-xs font-bold text-foreground/70">Moi</th>
                  <th className="border border-border/60 px-1 py-2 text-center text-xs font-bold text-foreground/40 w-4">‖</th>
                  <th className="border border-border/60 px-2 py-2 text-left text-xs font-bold text-foreground/70 w-1/4">CR Side</th>
                  <th className="border border-border/60 px-2 py-2 text-right text-xs font-bold text-foreground/70">Ali</th>
                  <th className="border border-border/60 px-2 py-2 text-right text-xs font-bold text-foreground/70">Moi</th>
                </tr>
              </thead>
              <tbody className="text-foreground/75">
                <tr>
                  <td className="border border-border/60 px-2 py-1.5">Dec 31 — Drawings</td>
                  <td className="border border-border/60 px-2 py-1.5 text-right">xxx</td>
                  <td className="border border-border/60 px-2 py-1.5 text-right">xxx</td>
                  <td className="border border-border/60 px-1 py-1.5 text-center text-foreground/30">‖</td>
                  <td className="border border-border/60 px-2 py-1.5">Jan 1 — Bal b/f</td>
                  <td className="border border-border/60 px-2 py-1.5 text-right">xxx</td>
                  <td className="border border-border/60 px-2 py-1.5 text-right">xxx</td>
                </tr>
                <tr className="bg-muted/10">
                  <td className="border border-border/60 px-2 py-1.5">Dec 31 — Int on drawings</td>
                  <td className="border border-border/60 px-2 py-1.5 text-right">xxx</td>
                  <td className="border border-border/60 px-2 py-1.5 text-right">xxx</td>
                  <td className="border border-border/60 px-1 py-1.5 text-center text-foreground/30">‖</td>
                  <td className="border border-border/60 px-2 py-1.5">Dec 31 — Profit share</td>
                  <td className="border border-border/60 px-2 py-1.5 text-right">xxx</td>
                  <td className="border border-border/60 px-2 py-1.5 text-right">xxx</td>
                </tr>
                <tr>
                  <td className="border border-border/60 px-2 py-1.5">Dec 31 — Bal c/d</td>
                  <td className="border border-border/60 px-2 py-1.5 text-right">xxx</td>
                  <td className="border border-border/60 px-2 py-1.5 text-right">xxx</td>
                  <td className="border border-border/60 px-1 py-1.5 text-center text-foreground/30">‖</td>
                  <td className="border border-border/60 px-2 py-1.5">Dec 31 — Salaries</td>
                  <td className="border border-border/60 px-2 py-1.5 text-right">—</td>
                  <td className="border border-border/60 px-2 py-1.5 text-right">xxx</td>
                </tr>
                <tr className="bg-muted/10">
                  <td className="border border-border/60 px-2 py-1.5"></td>
                  <td className="border border-border/60 px-2 py-1.5 text-right"></td>
                  <td className="border border-border/60 px-2 py-1.5 text-right"></td>
                  <td className="border border-border/60 px-1 py-1.5 text-center text-foreground/30">‖</td>
                  <td className="border border-border/60 px-2 py-1.5">Dec 31 — Int on capital</td>
                  <td className="border border-border/60 px-2 py-1.5 text-right">xxx</td>
                  <td className="border border-border/60 px-2 py-1.5 text-right">xxx</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm font-semibold text-foreground mb-2 mt-4">Statement of Financial Position extract (Capital section):</p>
          <div className="rounded-lg border border-border/60 bg-muted/20 p-4 font-mono text-sm mb-6">
            <p className="font-bold text-foreground/80 mb-2">Financed by:</p>
            <div className="ml-4 space-y-1 text-foreground/75">
              <p>Capital Accounts</p>
              <p className="ml-4">Ali &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; xxx</p>
              <p className="ml-4">Moi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; xxx &nbsp;&nbsp; xxx</p>
              <p className="mt-2">Current Accounts</p>
              <p className="ml-4">Ali &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; xxx</p>
              <p className="ml-4">Moi &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; xxx &nbsp;&nbsp; xxx</p>
            </div>
          </div>

          {/* ===== SECTION 7 ===== */}
          <SectionHeading id="profit-share" number="Section 7" title="Profit Sharing" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Profits and losses are shared by partners as set out in the partnership deed. The ratio is usually fixed. In the absence of a partnership deed, profits and losses are shared <strong>equally</strong> amongst the partners (as per the Partnership Act).
          </p>
          <ExplainerBox>
            <strong>Profit sharing ratio explained:</strong> If the profit sharing ratio is 2:3 (Solo:Jaco), this means that for every Ksh 5 of profit, Solo gets Ksh 2 and Jaco gets Ksh 3. In percentage terms, Solo gets 40% and Jaco gets 60%. The ratio reflects the agreement between partners — it may mirror capital contribution, but it doesn't have to. One partner may receive a larger share because they work more hours or contribute special skills.
          </ExplainerBox>
          <NoteBox>
            <strong>Important:</strong> Partner salaries, interest on capital, and interest on drawings are all internal arrangements that affect how profit is divided — they are <em>not</em> business expenses. They do not appear in the Trading and Profit &amp; Loss Account. They only appear in the <strong>Appropriation Account</strong>, which shows how the net profit (after all real expenses) is distributed among the partners.
          </NoteBox>

          {/* ===== SECTION 8 ===== */}
          <SectionHeading id="drawings" number="Section 8" title="Drawing Rights and Interest on Drawings" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Partners may be entitled to withdraw money for their personal use throughout the year. These withdrawals are called <strong>drawings</strong>. Drawing rights are usually stated in the partnership deed and may limit how much can be drawn and when.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Interest on drawings</strong> may be charged against partners who make drawings during the year. The purpose is to <em>discourage partners from withdrawing money unnecessarily</em> — particularly early in the year — since early withdrawals deprive the business of working capital for a longer period.
          </p>
          <ExplainerBox>
            <strong>Logic behind interest on drawings:</strong> If you draw Ksh 100,000 on 1 January, the business has been deprived of that money for 12 full months. If you draw the same amount on 1 July, the business only loses it for 6 months. Charging interest (usually a percentage per annum) penalises early drawings proportionally. The interest on drawings is <em>added to the appropriation account</em> on the debit side — it increases the amount available for distribution rather than going to any one partner specifically.
          </ExplainerBox>
          <ExampleBox>
            <strong>Calculating interest on drawings:</strong> Jaco draws Ksh 300,000 on 1 January. Interest is charged at 5% p.a. for the full year.
            <br />Interest on drawings = Ksh 300,000 × 5% × 12/12 = <strong>Ksh 15,000</strong>
            <br /><br />
            If instead he draws Ksh 300,000 on 1 July (6 months remaining in the year):
            <br />Interest on drawings = Ksh 300,000 × 5% × 6/12 = <strong>Ksh 7,500</strong>
          </ExampleBox>

          {/* ===== SECTION 9 ===== */}
          <SectionHeading id="interest-capital" number="Section 9" title="Interest on Capital" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Sometimes the partnership agreement provides for payment of interest to partners at a specific percentage of their capital contributed. This is designed to reward partners who have contributed more capital — since a larger capital contribution is essentially a larger "loan" to the business that could otherwise be earning interest in a bank.
          </p>
          <WarningBox>
            <strong>Critical rule:</strong> Interest on capital is an <em>internal arrangement</em> among partners and must <strong>not</strong> be treated as a business expense. It does not appear in the Profit &amp; Loss Account. It is deducted from the net profit in the <strong>Appropriation Account</strong> and credited to each partner's current account. If there is no partnership deed, the Partnership Act states that <em>no</em> interest on capital is payable.
          </WarningBox>
          <ExampleBox>
            <strong>Calculating interest on capital:</strong> Solo has capital of Ksh 1,600,000 and Jaco has capital of Ksh 2,000,000. Interest on capital is at 5% p.a.
            <br /><br />
            Solo's interest on capital = Ksh 1,600,000 × 5% = <strong>Ksh 80,000</strong>
            <br />
            Jaco's interest on capital = Ksh 2,000,000 × 5% = <strong>Ksh 100,000</strong>
            <br /><br />
            Both amounts are deducted from the net profit in the appropriation account and credited to the respective partners' current accounts.
          </ExampleBox>

          {/* ===== SECTION 10 ===== */}
          <SectionHeading id="salaries" number="Section 10" title="Partners' Salaries" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Where one partner performs extra duties compared to others — for example, managing the day-to-day running of the business while other partners are silent or contribute less effort — the partnership deed may award that partner a salary. This is a way of compensating the more active partner before the remaining profit is split equally (or in the agreed ratio).
          </p>
          <ExplainerBox>
            <strong>Important distinction:</strong> A partner's salary is <em>not</em> a business expense. It is paid out of profits. The sequence in the appropriation account is:
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Start with net profit (from the P&amp;L account)</li>
              <li>Add: Interest on drawings (charged to partners)</li>
              <li>Less: Interest on capital (paid to partners)</li>
              <li>Less: Partners' salaries (paid to eligible partners)</li>
              <li>The remainder is split in the profit-sharing ratio</li>
            </ol>
            This is completely different from an employee's salary, which is a business expense deducted before net profit is calculated.
          </ExplainerBox>
          <ExampleBox>
            <strong>Why salaries matter:</strong> Jaco is entitled to a salary of Ksh 5,000 per month = Ksh 60,000 per year. This is because Jaco manages the shop daily while Solo works from home. Before Solo and Jaco split the remaining profit 2:3, Jaco receives his Ksh 60,000 salary. This ensures the division of profit is fair given the difference in effort.
          </ExampleBox>

          {/* ===== SECTION 11 ===== */}
          <SectionHeading id="goodwill" number="Section 11" title="Goodwill" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A business builds up a reputation after it has been operating for some time. If the reputation is good, it acquires a loyal customer base — people who automatically buy from that firm rather than a competitor. This reputation has real value, and it is called <strong>goodwill</strong>. Goodwill is defined as <em>the value of the reputation of a firm</em> that enables it to earn profits above what would be expected from its tangible assets alone.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Goodwill is an <strong>intangible asset</strong> — you cannot touch it or see it on a warehouse shelf — but it is not fictitious (made up). It has real monetary value because a buyer of the business would pay extra for it.
          </p>
          <p className="text-sm font-semibold text-foreground mb-2">Goodwill depends on:</p>
          <ul className="list-disc list-inside space-y-2 text-foreground/80 ml-2 mb-4">
            <li><strong>Personal reputation of owners and/or management</strong> — a business run by a well-known, trusted manager can charge premium prices because customers trust the brand.</li>
            <li><strong>Peculiar advantage of the site</strong> — a shop at a busy junction in Nairobi CBD attracts far more foot traffic than an identical shop in a quiet suburb. The location creates goodwill.</li>
            <li><strong>Patents, copyrights, or trademarks</strong> — exclusive legal rights to a product or brand mean no competitor can copy you, creating a persistent advantage.</li>
            <li><strong>Peculiar advantage in sales or supplies</strong> — exclusive supply agreements or long-standing contracts with major customers give the business a competitive edge that has value.</li>
          </ul>
          <ExampleBox>
            <strong>Real-world example:</strong> When Safaricom was being sold (hypothetically), a buyer would pay not just for the physical assets — towers, equipment, offices — but also for the value of the M-Pesa brand, the customer base, and the reputation for reliable service. That extra amount above the tangible asset value is goodwill. In accounting, goodwill is shown as an intangible non-current asset on the balance sheet.
          </ExampleBox>

          {/* ===== SECTION 12 ===== */}
          <SectionHeading id="appropriation" number="Section 12" title="Appropriation of Profits" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The <strong>Profit and Loss Appropriation Account</strong> is prepared after the main P&amp;L Account. It takes the net profit and shows how it is divided among the partners. The structure is:
          </p>
          <ul className="list-disc list-inside space-y-1 text-foreground/80 ml-2 mb-4">
            <li>Net profit (transferred from P&amp;L Account) — starts the appropriation</li>
            <li>Add: Interest on drawings (charged to partners — this reduces what they take)</li>
            <li>Less: Interest on capital (paid to partners for their capital investment)</li>
            <li>Less: Partners' salaries (paid to partners performing extra duties)</li>
            <li>Residual profit is then shared in the agreed profit-sharing ratio</li>
          </ul>

          <Card className="border-border/60 bg-card/50 mb-6">
            <CardContent className="p-5">
              <p className="font-bold text-foreground mb-4 text-center">Worked Example — Solo and Jaco</p>
              <p className="text-sm text-foreground/75 mb-3">
                Solo and Jaco share profits and losses in the ratio <strong>2:3</strong>. Net profit for year ended 31 December 2011: <strong>Ksh 1,500,000</strong>. Drawings: Solo Ksh 120,000; Jaco Ksh 300,000. Interest on capital: 5% p.a. No interest on drawings. Jaco's salary: Ksh 5,000/month. Capital: Solo Ksh 1,600,000; Jaco Ksh 2,000,000. Opening current accounts: Solo Ksh 89,000 Cr; Jaco Ksh 170,000 Cr.
              </p>

              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Step 1: Interest on Capital</p>
              <div className="font-mono text-sm bg-muted/30 rounded p-3 mb-4">
                <p>Solo: 1,600,000 × 5% = <strong>80,000</strong></p>
                <p>Jaco: 2,000,000 × 5% = <strong>100,000</strong></p>
              </div>

              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Step 2: Jaco's Salary</p>
              <div className="font-mono text-sm bg-muted/30 rounded p-3 mb-4">
                <p>Ksh 5,000 × 12 months = <strong>60,000</strong></p>
              </div>

              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Step 3: P&amp;L Appropriation Account</p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse border border-border/60 font-mono">
                  <thead><tr className="bg-muted/50">
                    <th className="border border-border/60 px-3 py-2 text-left text-xs font-bold text-foreground/70">Item</th>
                    <th className="border border-border/60 px-3 py-2 text-right text-xs font-bold text-foreground/70">Sh</th>
                    <th className="border border-border/60 px-3 py-2 text-right text-xs font-bold text-foreground/70">Sh</th>
                  </tr></thead>
                  <tbody className="text-foreground/80">
                    <tr><td className="border border-border/60 px-3 py-1.5">Net Profit b/d</td><td className="border border-border/60 px-3 py-1.5"></td><td className="border border-border/60 px-3 py-1.5 text-right">1,500,000</td></tr>
                    <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1.5">Less: Interest on capital — Solo</td><td className="border border-border/60 px-3 py-1.5 text-right">80,000</td><td className="border border-border/60 px-3 py-1.5"></td></tr>
                    <tr><td className="border border-border/60 px-3 py-1.5">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Jaco</td><td className="border border-border/60 px-3 py-1.5 text-right">100,000</td><td className="border border-border/60 px-3 py-1.5"></td></tr>
                    <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1.5">Less: Salary — Jaco</td><td className="border border-border/60 px-3 py-1.5 text-right">60,000</td><td className="border border-border/60 px-3 py-1.5 text-right">(240,000)</td></tr>
                    <tr><td className="border border-border/60 px-3 py-1.5 font-semibold">Residual profit to share 2:3</td><td className="border border-border/60 px-3 py-1.5"></td><td className="border border-border/60 px-3 py-1.5 text-right font-semibold">1,260,000</td></tr>
                    <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1.5">Solo (2/5 × 1,260,000)</td><td className="border border-border/60 px-3 py-1.5 text-right">504,000</td><td className="border border-border/60 px-3 py-1.5"></td></tr>
                    <tr><td className="border border-border/60 px-3 py-1.5">Jaco (3/5 × 1,260,000)</td><td className="border border-border/60 px-3 py-1.5 text-right">756,000</td><td className="border border-border/60 px-3 py-1.5 text-right">1,260,000</td></tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Step 4: Partners' Current Accounts</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-border/60 font-mono">
                  <thead><tr className="bg-muted/50">
                    <th className="border border-border/60 px-2 py-2 text-left text-xs font-bold text-foreground/70">DR</th>
                    <th className="border border-border/60 px-2 py-2 text-right text-xs font-bold text-foreground/70">Solo</th>
                    <th className="border border-border/60 px-2 py-2 text-right text-xs font-bold text-foreground/70">Jaco</th>
                    <th className="border border-border/60 px-1 py-2 text-center text-xs text-foreground/40">‖</th>
                    <th className="border border-border/60 px-2 py-2 text-left text-xs font-bold text-foreground/70">CR</th>
                    <th className="border border-border/60 px-2 py-2 text-right text-xs font-bold text-foreground/70">Solo</th>
                    <th className="border border-border/60 px-2 py-2 text-right text-xs font-bold text-foreground/70">Jaco</th>
                  </tr></thead>
                  <tbody className="text-foreground/75 text-xs">
                    <tr><td className="border border-border/60 px-2 py-1.5">Drawings</td><td className="border border-border/60 px-2 py-1.5 text-right">120,000</td><td className="border border-border/60 px-2 py-1.5 text-right">300,000</td><td className="border border-border/60 px-1 py-1.5 text-center text-foreground/30">‖</td><td className="border border-border/60 px-2 py-1.5">Bal b/f</td><td className="border border-border/60 px-2 py-1.5 text-right">89,000</td><td className="border border-border/60 px-2 py-1.5 text-right">170,000</td></tr>
                    <tr className="bg-muted/10"><td className="border border-border/60 px-2 py-1.5">Bal c/d</td><td className="border border-border/60 px-2 py-1.5 text-right">553,000</td><td className="border border-border/60 px-2 py-1.5 text-right">786,000</td><td className="border border-border/60 px-1 py-1.5 text-center text-foreground/30">‖</td><td className="border border-border/60 px-2 py-1.5">Interest on capital</td><td className="border border-border/60 px-2 py-1.5 text-right">80,000</td><td className="border border-border/60 px-2 py-1.5 text-right">100,000</td></tr>
                    <tr><td className="border border-border/60 px-2 py-1.5"></td><td className="border border-border/60 px-2 py-1.5"></td><td className="border border-border/60 px-2 py-1.5"></td><td className="border border-border/60 px-1 py-1.5 text-center text-foreground/30">‖</td><td className="border border-border/60 px-2 py-1.5">Salary</td><td className="border border-border/60 px-2 py-1.5 text-right">—</td><td className="border border-border/60 px-2 py-1.5 text-right">60,000</td></tr>
                    <tr className="bg-muted/10"><td className="border border-border/60 px-2 py-1.5"></td><td className="border border-border/60 px-2 py-1.5"></td><td className="border border-border/60 px-2 py-1.5"></td><td className="border border-border/60 px-1 py-1.5 text-center text-foreground/30">‖</td><td className="border border-border/60 px-2 py-1.5">Profit share</td><td className="border border-border/60 px-2 py-1.5 text-right">504,000</td><td className="border border-border/60 px-2 py-1.5 text-right">756,000</td></tr>
                    <tr className="font-bold border-t-2 border-border bg-muted/30"><td className="border border-border/60 px-2 py-1.5">Total</td><td className="border border-border/60 px-2 py-1.5 text-right">673,000</td><td className="border border-border/60 px-2 py-1.5 text-right">1,086,000</td><td className="border border-border/60 px-1 py-1.5 text-center text-foreground/30">‖</td><td className="border border-border/60 px-2 py-1.5">Total</td><td className="border border-border/60 px-2 py-1.5 text-right">673,000</td><td className="border border-border/60 px-2 py-1.5 text-right">1,086,000</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Closing balance c/d: Solo = Ksh 553,000 Cr; Jaco = Ksh 786,000 Cr</p>
            </CardContent>
          </Card>

          {/* ===== SECTION 13 ===== */}
          <SectionHeading id="guaranteed" number="Section 13" title="Guaranteed Share of Profits" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Sometimes, the amount of a partner's share of profit is <strong>guaranteed</strong> by the other partners. This happens when a new or junior partner is brought in and needs assurance of a minimum income to join the partnership. The guarantee means that if the business does poorly and that partner's calculated share falls below the guaranteed amount, the other partners will make up the shortfall from their own shares.
          </p>
          <p className="text-sm font-semibold text-foreground mb-2">Accounting treatment for a guaranteed profit:</p>
          <div className="space-y-2 mb-4">
            <div className="flex gap-3 rounded-lg border border-border/60 bg-card/50 p-3">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">i</span>
              <p className="text-sm text-foreground/80">Debit the Appropriation Account with the <strong>guaranteed amount</strong>; Credit the guaranteed partner's current account.</p>
            </div>
            <div className="flex gap-3 rounded-lg border border-border/60 bg-card/50 p-3">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">ii</span>
              <p className="text-sm text-foreground/80">The remaining profit is shared among the other partners in their agreed ratio. Those other partners bear the cost of the guarantee — their shares are reduced.</p>
            </div>
          </div>

          <Card className="border-border/60 bg-card/50 mb-6">
            <CardContent className="p-5">
              <p className="font-bold text-foreground mb-3 text-center">Worked Example — Kilome and Wandere</p>
              <p className="text-sm text-foreground/75 mb-4">
                Kilome and Wandere share profits and losses <strong>1:1</strong>. Kilome is guaranteed by Wandere a profit of <strong>Ksh 100,000</strong>. Net profit for the year: <strong>Ksh 190,000</strong>.
              </p>
              <p className="text-sm text-foreground/80 mb-2"><strong>Step 1:</strong> Calculate each partner's normal 1:1 share:</p>
              <div className="font-mono text-sm bg-muted/30 rounded p-3 mb-3">
                <p>Kilome: 190,000 × 1/2 = 95,000</p>
                <p>Wandere: 190,000 × 1/2 = 95,000</p>
              </div>
              <p className="text-sm text-foreground/80 mb-2"><strong>Step 2:</strong> Kilome's share (Ksh 95,000) is less than the guaranteed amount (Ksh 100,000). The shortfall of Ksh 5,000 must be borne by Wandere.</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse border border-border/60 font-mono">
                  <thead><tr className="bg-muted/50">
                    <th className="border border-border/60 px-3 py-2 text-left text-xs font-bold text-foreground/70">Appropriation Account</th>
                    <th className="border border-border/60 px-3 py-2 text-right text-xs font-bold text-foreground/70">Sh</th>
                    <th className="border border-border/60 px-3 py-2 text-right text-xs font-bold text-foreground/70">Sh</th>
                  </tr></thead>
                  <tbody className="text-foreground/80">
                    <tr><td className="border border-border/60 px-3 py-1.5">Net Profit</td><td className="border border-border/60 px-3 py-1.5"></td><td className="border border-border/60 px-3 py-1.5 text-right">190,000</td></tr>
                    <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1.5">Less: Guaranteed profit — Kilome</td><td className="border border-border/60 px-3 py-1.5 text-right">100,000</td><td className="border border-border/60 px-3 py-1.5"></td></tr>
                    <tr><td className="border border-border/60 px-3 py-1.5">Remaining profit to Wandere</td><td className="border border-border/60 px-3 py-1.5 text-right">90,000</td><td className="border border-border/60 px-3 py-1.5 text-right">190,000</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">Wandere receives only Ksh 90,000 instead of Ksh 95,000 because he bears the Ksh 5,000 shortfall from the guarantee he gave Kilome.</p>
            </CardContent>
          </Card>

          {/* ===== SECTION 14 ===== */}
          <SectionHeading id="debit-balance" number="Section 14" title="Debit Balance on Current Accounts" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A partner may <strong>overdraw their current account</strong> by taking out more drawings than their total entitlement (profit share + salary + interest on capital) for the year. In this case, their current account will show a <strong>debit balance</strong> — meaning that partner <em>owes money to the business</em>.
          </p>
          <ExplainerBox>
            <strong>Meaning of a debit balance in a current account:</strong> Normally, a current account has a credit balance — the business owes that amount to the partner. A debit balance is the reverse: the partner has taken more than they were entitled to, so they owe that amount back to the business. It is essentially an informal loan the business has given the partner, and should be treated as a receivable (debtor) from that partner's perspective.
          </ExplainerBox>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            In the Statement of Financial Position, the debit balance current account is shown as a <strong>deduction</strong> from the credit balances of the other partners' current accounts. The debit balance can be recovered in the following year, deducting it from that partner's profit share.
          </p>
          <ExampleBox>
            <strong>Example:</strong> Current account balances at 31 December 2011:
            <br />Lomrion: Ksh 395,000 Cr &nbsp;|&nbsp; Lonyangatepa: Ksh 275,000 Cr &nbsp;|&nbsp; Kaparsip: Ksh 130,000 Dr
            <br /><br />
            <strong>Statement of Financial Position — Current Accounts extract:</strong>
            <div className="font-mono text-xs mt-2 bg-white/50 dark:bg-black/20 rounded p-2">
              <p>Current Accounts:</p>
              <p className="ml-4">Lomrion &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 395,000</p>
              <p className="ml-4">Lonyangatepa &nbsp;&nbsp; 275,000</p>
              <p className="ml-4">Kaparsip &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (130,000) &nbsp;&nbsp;&nbsp; 540,000</p>
            </div>
            Kaparsip's debit balance is shown in brackets and deducted from the combined credit balances of the other two partners.
          </ExampleBox>

          {/* ===== SECTION 15 ===== */}
          <SectionHeading id="worked-examples" number="Section 15" title="Worked Examples from Past Papers" />
          <p className="text-base text-foreground/80 leading-relaxed mb-6">
            These are full exam-style questions from your notes, worked through step by step.
          </p>

          {/* Example 1 */}
          <div className="rounded-lg border border-border bg-card/50 p-5 mb-8">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Question 1 — Peter and James Partnership</p>
            <p className="text-sm text-foreground/75 mb-4">
              The balance sheet as at 31 December 2004 shows: Non-current assets Ksh 508,000; Current assets Ksh 392,000. Capital: Peter Ksh 395,000; James Ksh 245,000. Current accounts: Peter Ksh 84,000; James Ksh 60,000. Net profit for 2004: Ksh 264,800. Salaries: Peter Ksh 52,500; James Ksh 27,500. Interest on capital at 5%. Interest on drawings at 5%. Profit ratio 5:3. Drawings: Peter Ksh 122,000; James Ksh 76,400.
            </p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Step 1: Interest on Capital (on opening capital)</p>
            <div className="font-mono text-sm bg-muted/30 rounded p-3 mb-3">
              <p>Peter: 395,000 × 5% = 19,750</p>
              <p>James: 245,000 × 5% = 12,250</p>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Note: Interest on drawings is also at 5%, but without timing information we assume drawings were made mid-year. If no period is given, apply 5% × full year × half assumption or as specifically stated. For this example we treat interest on drawings as requiring specific timing data — the question says "charged at 5% p.a." which means full year unless otherwise stated. Peter: 122,000 × 5% = 6,100; James: 76,400 × 5% = 3,820.</p>

            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Step 2: P&amp;L Appropriation Account</p>
            <div className="overflow-x-auto mb-3">
              <table className="w-full text-sm border-collapse border border-border/60 font-mono">
                <thead><tr className="bg-muted/50">
                  <th className="border border-border/60 px-3 py-2 text-left text-xs font-bold text-foreground/70">Item</th>
                  <th className="border border-border/60 px-3 py-2 text-right text-xs font-bold text-foreground/70">Sh</th>
                  <th className="border border-border/60 px-3 py-2 text-right text-xs font-bold text-foreground/70">Sh</th>
                </tr></thead>
                <tbody className="text-foreground/80">
                  <tr><td className="border border-border/60 px-3 py-1">Net Profit b/d</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right">264,800</td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1">Add: Interest on drawings — Peter</td><td className="border border-border/60 px-3 py-1 text-right">6,100</td><td className="border border-border/60 px-3 py-1"></td></tr>
                  <tr><td className="border border-border/60 px-3 py-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;James</td><td className="border border-border/60 px-3 py-1 text-right">3,820</td><td className="border border-border/60 px-3 py-1 text-right">9,920</td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 font-semibold">Total available</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right font-semibold">274,720</td></tr>
                  <tr><td className="border border-border/60 px-3 py-1">Less: Interest on capital — Peter</td><td className="border border-border/60 px-3 py-1 text-right">19,750</td><td className="border border-border/60 px-3 py-1"></td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;James</td><td className="border border-border/60 px-3 py-1 text-right">12,250</td><td className="border border-border/60 px-3 py-1"></td></tr>
                  <tr><td className="border border-border/60 px-3 py-1">Less: Salary — Peter</td><td className="border border-border/60 px-3 py-1 text-right">52,500</td><td className="border border-border/60 px-3 py-1"></td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1">Less: Salary — James</td><td className="border border-border/60 px-3 py-1 text-right">27,500</td><td className="border border-border/60 px-3 py-1 text-right">(112,000)</td></tr>
                  <tr><td className="border border-border/60 px-3 py-1 font-semibold">Residual profit to share 5:3</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right font-semibold">162,720</td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1">Peter (5/8 × 162,720)</td><td className="border border-border/60 px-3 py-1 text-right">101,700</td><td className="border border-border/60 px-3 py-1"></td></tr>
                  <tr><td className="border border-border/60 px-3 py-1">James (3/8 × 162,720)</td><td className="border border-border/60 px-3 py-1 text-right">61,020</td><td className="border border-border/60 px-3 py-1 text-right">162,720</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Step 3: Partners' Current Accounts</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse border border-border/60 font-mono">
                <thead><tr className="bg-muted/50">
                  <th className="border border-border/60 px-2 py-2 text-left text-xs font-bold text-foreground/70">DR</th>
                  <th className="border border-border/60 px-2 py-2 text-right text-xs font-bold text-foreground/70">Peter</th>
                  <th className="border border-border/60 px-2 py-2 text-right text-xs font-bold text-foreground/70">James</th>
                  <th className="border border-border/60 px-1 py-2 text-center text-xs text-foreground/40">‖</th>
                  <th className="border border-border/60 px-2 py-2 text-left text-xs font-bold text-foreground/70">CR</th>
                  <th className="border border-border/60 px-2 py-2 text-right text-xs font-bold text-foreground/70">Peter</th>
                  <th className="border border-border/60 px-2 py-2 text-right text-xs font-bold text-foreground/70">James</th>
                </tr></thead>
                <tbody className="text-foreground/75">
                  <tr><td className="border border-border/60 px-2 py-1">Int on drawings</td><td className="border border-border/60 px-2 py-1 text-right">6,100</td><td className="border border-border/60 px-2 py-1 text-right">3,820</td><td className="border border-border/60 px-1 py-1 text-center text-foreground/30">‖</td><td className="border border-border/60 px-2 py-1">Bal b/f</td><td className="border border-border/60 px-2 py-1 text-right">84,000</td><td className="border border-border/60 px-2 py-1 text-right">60,000</td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-2 py-1">Drawings</td><td className="border border-border/60 px-2 py-1 text-right">122,000</td><td className="border border-border/60 px-2 py-1 text-right">76,400</td><td className="border border-border/60 px-1 py-1 text-center text-foreground/30">‖</td><td className="border border-border/60 px-2 py-1">Int on capital</td><td className="border border-border/60 px-2 py-1 text-right">19,750</td><td className="border border-border/60 px-2 py-1 text-right">12,250</td></tr>
                  <tr><td className="border border-border/60 px-2 py-1">Bal c/d</td><td className="border border-border/60 px-2 py-1 text-right">129,850</td><td className="border border-border/60 px-2 py-1 text-right">79,550</td><td className="border border-border/60 px-1 py-1 text-center text-foreground/30">‖</td><td className="border border-border/60 px-2 py-1">Salary</td><td className="border border-border/60 px-2 py-1 text-right">52,500</td><td className="border border-border/60 px-2 py-1 text-right">27,500</td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-2 py-1"></td><td className="border border-border/60 px-2 py-1"></td><td className="border border-border/60 px-2 py-1"></td><td className="border border-border/60 px-1 py-1 text-center text-foreground/30">‖</td><td className="border border-border/60 px-2 py-1">Profit share</td><td className="border border-border/60 px-2 py-1 text-right">101,700</td><td className="border border-border/60 px-2 py-1 text-right">61,020</td></tr>
                  <tr className="font-bold border-t-2 border-border bg-muted/30"><td className="border border-border/60 px-2 py-1.5">Total</td><td className="border border-border/60 px-2 py-1.5 text-right">257,950</td><td className="border border-border/60 px-2 py-1.5 text-right">159,770</td><td className="border border-border/60 px-1 py-1.5 text-center text-foreground/30">‖</td><td className="border border-border/60 px-2 py-1.5">Total</td><td className="border border-border/60 px-2 py-1.5 text-right">257,950</td><td className="border border-border/60 px-2 py-1.5 text-right">159,770</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Closing current account balances: Peter Ksh 129,850 Cr; James Ksh 79,550 Cr</p>
          </div>

        </div>

        {/* Sidebar nav */}
        <aside className="hidden xl:block w-64 shrink-0">
          <div className="sticky top-20">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">On this page</p>
            <nav className="space-y-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block text-sm py-1 px-2 rounded transition-colors ${activeSection === s.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors z-20"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </Layout>
  );
}
