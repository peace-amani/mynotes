import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Info, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";

const sections = [
  { id: "intro", label: "1. Companies vs. Other Businesses" },
  { id: "pl-format", label: "2. Format of the P&L Account" },
  { id: "appropriation", label: "3. The Appropriation Account" },
  { id: "sfp-format", label: "4. Statement of Financial Position" },
  { id: "directors", label: "5. Directors' Salaries & Fees" },
  { id: "audit", label: "6. Audit Fees" },
  { id: "debenture-interest", label: "7. Debenture Interest" },
  { id: "corporation-tax", label: "8. Corporation Tax" },
  { id: "dividends", label: "9. Dividends" },
  { id: "capital-reserves", label: "10. Capital Reserves" },
  { id: "revenue-reserves", label: "11. Revenue Reserves" },
  { id: "debenture-loans", label: "12. Debenture Loans" },
  { id: "bonus-shares", label: "13. Bonus Shares & Scrip Issue" },
  { id: "worked-examples", label: "14. Worked Examples" },
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

export default function AccountingTopic2() {
  const [activeSection, setActiveSection] = useState("intro");
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
    <Layout breadcrumbs={[{ label: "Accounting", href: "/unit/accounting" }, { label: "Topic 2: Company Final Accounts" }]}>
      <Helmet>
        <title>Company Final Accounts — Accounting Topic 2 | Study Notes</title>
        <meta name="description" content="Full study notes on company final accounts — P&L, appropriation account, SFP, dividends, reserves, debentures, corporation tax, and worked examples." />
      </Helmet>

      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>
          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase mb-3">Accounting — Topic 2</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Company Final Accounts</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A limited company is a legal entity separate from its owners (shareholders). Its final accounts follow the same basic structure as a sole trader — Trading Account, Profit &amp; Loss Account — but include additional items unique to companies: directors' fees, audit fees, debenture interest, corporation tax, dividends, and an appropriation account showing how profit is distributed. The balance sheet also includes share capital and reserves.
            </p>
          </div>

          {/* ===== SECTION 1 ===== */}
          <SectionHeading id="intro" number="Section 1" title="Companies vs. Other Business Structures" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Understanding why company accounts are different from those of a sole trader or partnership starts with understanding the legal nature of a company.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2 text-sm">Sole Trader</h3>
              <ul className="text-xs text-foreground/75 space-y-1.5">
                <li>• Owner and business are the <em>same</em> legal person</li>
                <li>• Owner's personal assets at risk for all debts</li>
                <li>• No requirement for audit</li>
                <li>• Owner pays personal income tax — shown as drawings</li>
                <li>• Drawings are appropriations, not expenses</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2 text-sm">Partnership</h3>
              <ul className="text-xs text-foreground/75 space-y-1.5">
                <li>• Partners share ownership</li>
                <li>• Joint and several liability — all partners liable for all debts</li>
                <li>• Partners' salaries are appropriations, not expenses</li>
                <li>• Separate appropriation account shows profit division</li>
                <li>• Partners pay personal tax shown as drawings</li>
              </ul>
            </div>
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
              <h3 className="font-semibold text-primary mb-2 text-sm">Limited Company</h3>
              <ul className="text-xs text-foreground/75 space-y-1.5">
                <li>• Separate legal entity — the company can own, sue, be sued</li>
                <li>• Shareholders have <strong>limited liability</strong> — only lose what they invested</li>
                <li>• All companies must prepare and <strong>audit</strong> their accounts</li>
                <li>• Directors' salaries are genuine <strong>business expenses</strong></li>
                <li>• Company pays <strong>corporation tax</strong> on profits</li>
                <li>• Shareholders receive <strong>dividends</strong> instead of drawings</li>
              </ul>
            </div>
          </div>
          <ExplainerBox>
            <strong>Why the separate legal entity matters for accounting:</strong> Because the company is legally separate from its owners, every transaction between the company and its shareholders must be accounted for formally. Directors cannot just take money out — they receive a salary (an expense) or dividends (an appropriation). The company pays its own tax. This is fundamentally different from a sole trader who can simply withdraw cash.
          </ExplainerBox>

          {/* ===== SECTION 2 ===== */}
          <SectionHeading id="pl-format" number="Section 2" title="Format of the Trading, Profit and Loss Account" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The Trading, P&amp;L Account of a company follows the same format as that of a sole trader — it starts with sales, deducts the cost of goods sold to arrive at gross profit, then deducts operating expenses to arrive at the operating profit. The key differences are the additional expenses unique to companies.
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse border border-border/60 font-mono">
              <thead>
                <tr className="bg-muted/50">
                  <th colSpan={4} className="border border-border/60 px-3 py-2 text-center text-sm font-bold text-foreground">B Limited — Trading, Profit and Loss Account for the year ended 31.12.____</th>
                </tr>
                <tr className="bg-muted/30">
                  <th className="border border-border/60 px-3 py-1 text-left text-xs font-bold text-foreground/70">Item</th>
                  <th className="border border-border/60 px-3 py-1 text-right text-xs font-bold text-foreground/70">Sh</th>
                  <th className="border border-border/60 px-3 py-1 text-right text-xs font-bold text-foreground/70">Sh</th>
                  <th className="border border-border/60 px-3 py-1 text-right text-xs font-bold text-foreground/70">Sh</th>
                </tr>
              </thead>
              <tbody className="text-foreground/80 text-xs">
                <tr><td className="border border-border/60 px-3 py-1">Sales</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1">Less: Returns inwards</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right">(xx)</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 font-semibold">Net Sales</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right font-semibold">xxx</td></tr>
                <tr className="bg-muted/20"><td className="border border-border/60 px-3 py-1 font-semibold" colSpan={4}>Less: Cost of Sales</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Opening Stock</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Add: Purchases</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-9">Add: Carriage inwards</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Less: Purchase returns</td><td className="border border-border/60 px-3 py-1 text-right">(xxx)</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Less: Closing stock</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right">(xxx)</td><td className="border border-border/60 px-3 py-1 text-right">(xxx)</td></tr>
                <tr className="bg-muted/20"><td className="border border-border/60 px-3 py-1 font-bold">GROSS PROFIT</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right font-bold">xxx</td></tr>
                <tr><td className="border border-border/60 px-3 py-1" colSpan={4}><em>Add: Other incomes</em></td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Discount received</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Profit on disposal of assets</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Income from investments</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr><td className="border border-border/60 px-3 py-1" colSpan={4}><em>Less: Expenses</em></td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">General/other expenses</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6 text-primary font-semibold">Directors' salaries/fees ★</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6 text-primary font-semibold">Audit fees ★</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6 text-primary font-semibold">Debenture interest ★</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6 text-primary font-semibold">Amortisation of goodwill ★</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right">(xxx)</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 font-bold">OPERATING PROFIT</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right font-bold">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1">Add: Investment income (if shown below)</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 font-bold">PROFIT BEFORE TAX</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right font-bold">xxx</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mb-4">★ Items unique to company accounts — not found in sole trader or partnership P&amp;L.</p>

          {/* ===== SECTION 3 ===== */}
          <SectionHeading id="appropriation" number="Section 3" title="The Appropriation Account" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Just as a partnership has an appropriation account to show how profit is divided among partners, a company has an <strong>appropriation account</strong> to show how profit after tax is distributed. It follows directly after the Profit Before Tax section and shows:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse border border-border/60 font-mono">
              <thead><tr className="bg-muted/50">
                <th className="border border-border/60 px-3 py-2 text-left text-xs font-bold text-foreground/70">Item</th>
                <th className="border border-border/60 px-3 py-2 text-right text-xs font-bold text-foreground/70">Sh</th>
                <th className="border border-border/60 px-3 py-2 text-right text-xs font-bold text-foreground/70">Sh</th>
              </tr></thead>
              <tbody className="text-foreground/80 text-xs">
                <tr><td className="border border-border/60 px-3 py-1 font-bold">Profit before tax</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right font-bold">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 font-semibold">Less: Taxation</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Corporation tax for the year</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Transfer to deferred tax</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Under/over provision (prior year)</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1 text-right">(xxx)</td></tr>
                <tr className="bg-muted/20"><td className="border border-border/60 px-3 py-1 font-bold">PROFIT AFTER TAX</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right font-bold">xxx</td></tr>
                <tr><td className="border border-border/60 px-3 py-1">Less: Transfer to general reserve</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right">(xxx)</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 font-semibold">Less: Dividends</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Preference dividend: Interim paid</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-9">Final proposed</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Ordinary dividend: Interim paid</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1"></td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-9">Final proposed</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1 text-right">(xxx)</td></tr>
                <tr className="bg-muted/20"><td className="border border-border/60 px-3 py-1 font-bold">Retained profit for the year</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right font-bold">xxx</td></tr>
                <tr><td className="border border-border/60 px-3 py-1">Add: Retained profit b/f (opening)</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/30"><td className="border border-border/60 px-3 py-1 font-bold">Retained profit c/d (closing)</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right font-bold">xxx</td></tr>
              </tbody>
            </table>
          </div>

          {/* ===== SECTION 4 ===== */}
          <SectionHeading id="sfp-format" number="Section 4" title="Statement of Financial Position (Balance Sheet)" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The company's Statement of Financial Position follows the same principle as any other — assets equal liabilities plus equity. What is unique to companies is the equity section, which contains <strong>share capital</strong> and <strong>reserves</strong> instead of just a capital account.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-xs border-collapse border border-border/60 font-mono">
              <thead><tr className="bg-muted/50">
                <th colSpan={4} className="border border-border/60 px-3 py-2 text-center text-sm font-bold text-foreground">B Limited — Statement of Financial Position as at 31.12.____</th>
              </tr></thead>
              <tbody className="text-foreground/80">
                <tr className="bg-muted/20"><td colSpan={4} className="border border-border/60 px-3 py-1.5 font-bold">NON-CURRENT ASSETS</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 text-foreground/60 text-xs" colSpan={4}>(Cost) &nbsp;&nbsp; (Acc. Dep.) &nbsp;&nbsp; (Net Book Value)</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Land &amp; Building</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1 text-right">(xxx)</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Plant and Machinery</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1 text-right">(xxx)</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Motor Vehicles</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1 text-right">(xxx)</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/20"><td colSpan={4} className="border border-border/60 px-3 py-1.5 font-semibold">Intangible Assets</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Goodwill</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1 text-right">(xxx)</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Copyrights, Patents</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td><td className="border border-border/60 px-3 py-1 text-right">(xxx)</td><td className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Long-term Investments</td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1"></td><td className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/20"><td colSpan={4} className="border border-border/60 px-3 py-1.5 font-bold">CURRENT ASSETS</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Stock / Inventory</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Debtors less provision for bad debts</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Prepayments</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Short-term Investments</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Cash at Bank</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Cash in Hand</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/20"><td colSpan={4} className="border border-border/60 px-3 py-1.5 font-bold">CURRENT LIABILITIES</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Bank Overdraft</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Creditors</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Accruals</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6 text-primary font-semibold">Debenture interest payable ★</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6 text-primary font-semibold">Tax payable (corporation tax) ★</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6 text-primary font-semibold">Dividends payable (proposed) ★</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/20"><td colSpan={4} className="border border-border/60 px-3 py-1.5 font-bold">FINANCED BY — Shareholders' Funds</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 font-semibold" colSpan={4}>Authorised Share Capital</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">100,000 ordinary shares of £1 each</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">100,000 preference shares of £1 each</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 font-semibold" colSpan={4}>Issued and Fully Paid</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">80,000 ordinary shares of £1 each</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">80,000</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">50,000 10% preference shares of £1 each</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">50,000</td></tr>
                <tr className="bg-muted/20"><td className="border border-border/60 px-3 py-1 font-semibold" colSpan={4}>Capital Reserves (cannot be distributed as dividends)</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Share Premium</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Revaluation Reserve</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">Capital Redemption Reserve</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/20"><td className="border border-border/60 px-3 py-1 font-semibold" colSpan={4}>Revenue Reserves (can be distributed)</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6">General Reserve</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Retained Profit (P&amp;L Account balance)</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/20"><td className="border border-border/60 px-3 py-1 font-semibold" colSpan={4}>Non-Current Liabilities</td></tr>
                <tr><td className="border border-border/60 px-3 py-1 pl-6 text-primary font-semibold">10% Debentures (long-term loans) ★</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
                <tr className="bg-muted/10"><td className="border border-border/60 px-3 py-1 pl-6">Deferred Tax</td><td colSpan={3} className="border border-border/60 px-3 py-1 text-right">xxx</td></tr>
              </tbody>
            </table>
          </div>

          {/* ===== SECTION 5 ===== */}
          <SectionHeading id="directors" number="Section 5" title="Directors' Salaries and Fees" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Salaries, fees, and other remuneration paid to directors in relation to their services to the company are treated as <strong>business expenses</strong> in the Profit and Loss Account. This is one of the fundamental differences between a company and a sole trader or partnership.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="rounded-lg border border-green-300/40 bg-green-50 dark:bg-green-900/10 p-4">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2 text-sm">Company — Directors' Salaries</h3>
              <p className="text-sm text-foreground/80">Treated as an <strong>expense</strong> in the P&amp;L Account. Deducted before arriving at operating profit. Directors are legally employees of the company — they provide a service to the company and are paid for it, just like any other employee.</p>
            </div>
            <div className="rounded-lg border border-amber-300/40 bg-amber-50 dark:bg-amber-900/10 p-4">
              <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2 text-sm">Partnership/Sole Trader — "Salaries"</h3>
              <p className="text-sm text-foreground/80">Partners' salaries are treated as <strong>appropriations</strong> — shown in the appropriation account after net profit has been calculated. They are not expenses. A sole trader cannot have a salary at all — any withdrawals are drawings.</p>
            </div>
          </div>
          <ExampleBox>
            <strong>Example:</strong> Jaribu Trading Company pays its two directors a combined salary of Ksh 704,000 per year. This amount is listed as an expense in the P&amp;L Account, reducing the operating profit just like any other staff salary. The directors happen to be shareholders too, but in their capacity as directors (running the company), they are employees and their pay is a business cost.
          </ExampleBox>

          {/* ===== SECTION 6 ===== */}
          <SectionHeading id="audit" number="Section 6" title="Audit Fees" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            All companies are required by law to have their accounts independently audited. An <strong>auditor</strong> is a qualified accountant (or firm of accountants) who reviews the company's financial records and confirms that the accounts show a true and fair view of the company's financial position.
          </p>
          <ExplainerBox>
            <strong>Why is audit mandatory for companies?</strong> Shareholders invest money in a company but often have no day-to-day involvement in running it. They depend on the financial accounts to understand how their investment is performing. Without an independent audit, the directors (who prepare the accounts) could manipulate the figures to their own advantage. The law mandates an external audit to protect shareholders and the public from fraudulent or misleading accounts.
          </ExplainerBox>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Any fees paid in relation to audit and accountancy services are charged as an <strong>expense</strong> in the P&amp;L Account. If the audit fee has not yet been paid at the year-end, it is shown as an <strong>accrual</strong> (current liability) and still charged to the P&amp;L.
          </p>
          <ExampleBox>
            <strong>Example:</strong> Ahadi Ltd has been instructed to provide Ksh 480,000 for audit fees. Even if this has not yet been invoiced or paid at 30 April 2003, the amount is:
            <br />— <strong>Added</strong> to expenses in the P&amp;L Account (reducing profit)
            <br />— <strong>Accrued</strong> as a current liability in the Statement of Financial Position (added to accruals or accounts payable)
          </ExampleBox>

          {/* ===== SECTION 7 ===== */}
          <SectionHeading id="debenture-interest" number="Section 7" title="Debenture Interest" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Loans taken up by limited companies are called <strong>debentures</strong> (see Section 12 for the full explanation of debenture loans). The interest paid on these loans is charged as an <strong>expense</strong> in the Profit and Loss Account.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            If the debenture interest has not been paid at the year-end — i.e., it is outstanding — it is shown as a <strong>current liability</strong> in the balance sheet under "Interest payable." This is because the company owes the interest to the debenture holders, even though it has not yet been paid.
          </p>
          <NoteBox>
            <strong>Key rule:</strong> Debenture interest <em>must</em> be paid whether the company makes a profit or not. Unlike a dividend (which is only paid from profits), interest on a debenture is a contractual obligation. Failure to pay debenture interest can allow the debenture holders to appoint a receiver and take control of company assets as security.
          </NoteBox>
          <ExampleBox>
            <strong>Example:</strong> Ahadi Ltd has 10% debentures of Ksh 6,400,000. The total annual interest = 6,400,000 × 10% = <strong>Ksh 640,000</strong>. Of this, Ksh 320,000 has been paid and charged during the year. The remaining Ksh 320,000 is outstanding (note iv in the question says to provide for the outstanding debenture interest). This means:
            <br />— Total Ksh 640,000 is expensed in the P&amp;L
            <br />— Ksh 320,000 outstanding is shown as a current liability (accrual) in the balance sheet
          </ExampleBox>

          {/* ===== SECTION 8 ===== */}
          <SectionHeading id="corporation-tax" number="Section 8" title="Corporation Tax" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Companies pay <strong>corporation tax</strong> on the profits they earn. This is fundamentally different from sole traders and partnerships, where the tax is personal income tax on the owners — shown as drawings, not an expense.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Because a company is a <strong>separate legal entity</strong>, it pays its own tax. Corporation tax is calculated as a percentage of the company's taxable profit and is shown in the appropriation account.
          </p>
          <p className="text-sm font-semibold text-foreground mb-2">The three tax items in the appropriation account:</p>
          <div className="space-y-3 mb-6">
            <div className="flex gap-3 rounded-lg border border-border/60 bg-card/50 p-4">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">Corporation Tax for the Year</p>
                <p className="text-sm text-foreground/75">The estimated tax liability on the current year's profits. This is a direct obligation to the government and is deducted from profit before calculating retained earnings. It appears as "tax payable" in current liabilities on the balance sheet until paid.</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg border border-border/60 bg-card/50 p-4">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">Transfer to Deferred Tax</p>
                <p className="text-sm text-foreground/75">A provision set aside for <em>future</em> possible tax liabilities. This arises because accounting profit and taxable profit are often different — for example, depreciation rates used in accounts may differ from those allowed by the tax authority. Deferred tax recognises that there may be additional tax to pay in future years. It appears as a non-current liability on the balance sheet.</p>
              </div>
            </div>
            <div className="flex gap-3 rounded-lg border border-border/60 bg-card/50 p-4">
              <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">Under or Over Provision (Prior Year Adjustment)</p>
                <p className="text-sm text-foreground/75">At year-end, the tax charge is an <em>estimate</em> — the exact amount is only confirmed when HMRC/KRA assesses the company. If the prior year's estimated tax was too low (under-provision), the shortfall is charged in the current year. If it was too high (over-provision), the excess is credited back. This adjustment is also a direct government obligation.</p>
              </div>
            </div>
          </div>
          <ExampleBox>
            <strong>Example:</strong> A company has profit before tax of Ksh 500,000. Corporation tax for the year is estimated at Ksh 150,000. Transfer to deferred tax: Ksh 20,000. Under-provision from last year: Ksh 5,000.
            <br /><br />
            Total tax charge = 150,000 + 20,000 + 5,000 = <strong>Ksh 175,000</strong>
            <br />Profit after tax = 500,000 − 175,000 = <strong>Ksh 325,000</strong>
          </ExampleBox>

          {/* ===== SECTION 9 ===== */}
          <SectionHeading id="dividends" number="Section 9" title="Dividends" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Shareholders are entitled to a share of the profits made by the company — this is called a <strong>dividend</strong>. Shareholders do not make drawings (like a sole trader or partner) — they receive dividends declared by the board of directors. A company may pay dividends in two stages during the financial year:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">Interim Dividend</h3>
              <p className="text-sm text-foreground/80 mb-2">Paid part way through the financial year — often after the first six months, once the company is confident it is profitable. The board declares and pays this dividend without waiting for the final accounts.</p>
              <p className="text-sm text-foreground/80">Since it has already been paid, interim dividends are shown in the appropriation account as <strong>paid</strong>. The cash has already left the company.</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">Final Proposed Dividend</h3>
              <p className="text-sm text-foreground/80 mb-2">Paid after the year-end, once the final accounts have been completed and approved. The board <em>recommends</em> a final dividend, which shareholders then vote on at the Annual General Meeting (AGM).</p>
              <p className="text-sm text-foreground/80">Since it has not yet been paid at year-end, the final proposed dividend is shown as a <strong>current liability</strong> (dividends payable) in the balance sheet.</p>
            </div>
          </div>
          <NoteBox>
            <strong>Types of shares and their dividends:</strong>
            <br /><br />
            <strong>Preference shares</strong> receive a <em>fixed</em> dividend first, before ordinary shareholders get anything. For example, "10% preference shares" receive 10% of their face value every year, regardless of how well the company did. This fixed return makes preference shares less risky — but also means preference shareholders don't benefit if the company does exceptionally well.
            <br /><br />
            <strong>Ordinary shares</strong> receive dividends only after preference shareholders have been paid. The dividend is not fixed — it depends on how much profit is left and what the directors decide to pay out. If the company does very well, ordinary shareholders may receive a large dividend. If the company struggles, ordinary shareholders may receive nothing.
          </NoteBox>
          <ExampleBox>
            <strong>Calculating dividends:</strong> A company has 80,000 ordinary shares of £1 each. Directors propose a final ordinary dividend of 5%. How much is the dividend?
            <br /><br />
            Total issued ordinary share capital = 80,000 × £1 = £80,000
            <br />Dividend = £80,000 × 5% = <strong>£4,000</strong>
            <br /><br />
            This means each share receives 5p (5% of £1) in dividends.
          </ExampleBox>

          {/* ===== SECTION 10 ===== */}
          <SectionHeading id="capital-reserves" number="Section 10" title="Capital Reserves" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Capital reserves</strong> are amounts that <em>cannot</em> be paid out or distributed to shareholders as dividends. They arise from capital transactions — transactions that change the structure of the business rather than its normal trading activity. There are three main types:
          </p>
          <div className="space-y-5 mb-6">
            <div className="rounded-lg border border-border/60 bg-card/50 p-5">
              <h3 className="font-semibold text-foreground mb-2">1. Share Premium</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                A <strong>share premium</strong> arises when a company issues shares at a price higher than their par (face/nominal) value. The par value is the value printed on the share certificate. The extra amount above par is the share premium.
              </p>
              <ExampleBox>
                <strong>Example:</strong> A company issues 10,000 shares with a par value of Ksh 10 each, but issues them at Ksh 15 each. Total proceeds = Ksh 150,000.
                <br />Credited to Share Capital: 10,000 × Ksh 10 = Ksh 100,000
                <br />Credited to Share Premium Account: 10,000 × Ksh 5 = <strong>Ksh 50,000</strong>
                <br /><br />
                The company sells shares at a premium because it is already established and profitable — investors are willing to pay more than face value for the shares.
              </ExampleBox>
              <p className="text-sm text-foreground/80 leading-relaxed">The share premium may be applied to: (i) paying up unissued shares (issuing bonus shares); (ii) writing off preliminary expenses (costs of forming the company); (iii) writing off discounts on shares (if shares were ever issued at a discount).</p>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-5">
              <h3 className="font-semibold text-foreground mb-2">2. Revaluation Reserve</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                When a company revalues its non-current assets upward — most commonly land and buildings, which tend to increase in value over time — the gain cannot be taken to the P&amp;L Account (it is not a "realised" profit). Instead, it is credited to a <strong>Revaluation Reserve</strong> account.
              </p>
              <ExampleBox>
                <strong>Example:</strong> Plastics Ltd has a building with a net book value of Ksh 5 million. It is revalued to Ksh 9 million — a gain of Ksh 4 million.
                <br /><br />
                Dr: Land &amp; Buildings Account &nbsp;&nbsp;&nbsp; Ksh 4,000,000
                <br />Cr: Revaluation Reserve &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Ksh 4,000,000
                <br /><br />
                The Revaluation Reserve appears under Capital Reserves in the balance sheet. When the company eventually <em>sells</em> that property and realises the gain in cash, the amount is transferred from the Revaluation Reserve to the P&amp;L Account.
              </ExampleBox>
            </div>

            <div className="rounded-lg border border-border/60 bg-card/50 p-5">
              <h3 className="font-semibold text-foreground mb-2">3. Capital Redemption Reserve</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                When a company buys back or <em>redeems</em> its own preference shares without issuing new shares to replace them, it must create a <strong>Capital Redemption Reserve</strong>. This reserve is created to protect the company's creditors — it maintains the overall "capital base" of the company even though shares have been cancelled.
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed">
                The transfer to the Capital Redemption Reserve is made from either the Share Premium account or the Profit and Loss account. The amount equals the nominal value of the shares redeemed.
              </p>
            </div>
          </div>
          <WarningBox>
            <strong>Critical exam point:</strong> Capital reserves can <em>never</em> be distributed as dividends. They can only be used for specific capital purposes — such as issuing bonus shares (using the Share Premium) or writing off preliminary expenses. If you see "can this reserve be paid as a dividend?", the answer for any capital reserve is always <strong>No</strong>.
          </WarningBox>

          {/* ===== SECTION 11 ===== */}
          <SectionHeading id="revenue-reserves" number="Section 11" title="Revenue Reserves" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Revenue reserves</strong> are profits that have been retained in the business rather than distributed as dividends. Unlike capital reserves, revenue reserves <em>can</em> be distributed to shareholders. They include:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">General Reserve</h3>
              <p className="text-sm text-foreground/80">Transfers made from the Profit and Loss Account to the General Reserve are discretionary — the directors decide how much to transfer. The purpose is to provide retained funds for business expansion, purchase of new non-current assets, or to act as a buffer against future losses. The General Reserve can also be used to issue bonus shares.</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">Retained Profit (P&amp;L Account Balance)</h3>
              <p className="text-sm text-foreground/80">This is the accumulated profit that has not been transferred to the General Reserve and has not been paid out as dividends. It is the closing balance on the Appropriation Account (retained profit c/d). It builds up year after year as the company earns profits and retains some of them. This is the "profit and loss account" balance you see in the balance sheet.</p>
            </div>
          </div>
          <ExampleBox>
            <strong>Why retain profits instead of paying dividends?</strong> Consider a company that earns Ksh 2 million in profit. If it distributes all of it as dividends, it has nothing left to invest in new machinery, expand premises, or weather a difficult year. By transferring Ksh 500,000 to the General Reserve, the company keeps those funds available for future investment — growing the business, which ultimately benefits shareholders through higher future profits and dividends.
          </ExampleBox>

          {/* ===== SECTION 12 ===== */}
          <SectionHeading id="debenture-loans" number="Section 12" title="Debenture Loans" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            When a limited company borrows money over a long period, it issues <strong>debenture certificates</strong> to the lenders. The debenture is the formal document recording the loan. These loans are also called <strong>loan stock</strong> or <strong>loan capital</strong>.
          </p>
          <ExplainerBox>
            <strong>Debenture vs. share — key difference:</strong> A shareholder is an <em>owner</em> of the company and receives dividends (only if profits allow). A debenture holder is a <em>lender</em> to the company and receives interest (which must be paid regardless of profit). Debentures carry a fixed interest rate — e.g., "10% debentures" pay 10% of the loan amount as interest every year, no matter what.
          </ExplainerBox>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">Redeemable Debentures</h3>
              <p className="text-sm text-foreground/80">Repayable at a specified date or by a particular date. For example, "10% Debentures 2028" means the company must repay the loan in 2028. The repayment date is specified when the debenture is issued.</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">Irredeemable Debentures</h3>
              <p className="text-sm text-foreground/80">Only repayable when the company is officially wound up (dissolved). These are permanent loans for the life of the company. They are sometimes called perpetual debentures.</p>
            </div>
          </div>
          <p className="text-base text-foreground/80 leading-relaxed mb-3">
            In the balance sheet, debentures appear as <strong>non-current liabilities</strong> (long-term debt). Any interest accrued but not yet paid at year-end appears as a <strong>current liability</strong>.
          </p>

          {/* ===== SECTION 13 ===== */}
          <SectionHeading id="bonus-shares" number="Section 13" title="Bonus Shares and Scrip Issue" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Bonus shares</strong> (also called a capitalisation issue or scrip issue) are shares issued to existing shareholders <em>free of charge</em>. No cash payment is required from shareholders — instead, the shares are paid for out of existing reserves.
          </p>
          <ExplainerBox>
            <strong>Why issue bonus shares?</strong> A company with large accumulated reserves may decide to "capitalise" those reserves — converting them into permanent share capital. This sends a signal that the company is financially strong. Shareholders receive more shares without paying anything. However, since the total value of the company doesn't change, the price per share falls proportionally — so overall shareholder wealth remains the same. The benefit is mainly psychological and related to the marketability of the shares.
          </ExplainerBox>
          <p className="text-sm font-semibold text-foreground mb-2">Sources for bonus shares:</p>
          <ul className="list-disc list-inside space-y-1 text-foreground/80 ml-2 mb-4">
            <li>Share Premium account</li>
            <li>Balance of retained profits (P&amp;L account)</li>
            <li>General Reserve</li>
          </ul>
          <ExampleBox>
            <strong>Example:</strong> A company has 500,000 ordinary shares of Ksh 10 each and a General Reserve of Ksh 2,500,000. It declares a 1-for-2 bonus issue (for every 2 shares held, you receive 1 new share).
            <br /><br />
            New shares issued = 500,000 ÷ 2 = 250,000 shares
            <br />Value of new shares = 250,000 × Ksh 10 = Ksh 2,500,000
            <br /><br />
            Entry: Dr General Reserve Ksh 2,500,000 / Cr Share Capital Ksh 2,500,000
            <br /><br />
            After the issue, the company has 750,000 shares but the General Reserve is now zero. Total equity is unchanged.
          </ExampleBox>
          <div className="rounded-lg border border-border/60 bg-card/50 p-4 mb-6">
            <h3 className="font-semibold text-foreground mb-2">Bonus Issue vs. Scrip Issue</h3>
            <p className="text-sm text-foreground/80 mb-2">
              These terms are often used interchangeably, but there is a subtle difference:
            </p>
            <ul className="text-sm text-foreground/80 space-y-2">
              <li>
                <strong>Bonus issue:</strong> The shareholder has <em>no choice</em> — they must take the new shares. They cannot opt for cash instead.
              </li>
              <li>
                <strong>Scrip issue:</strong> Similar to a bonus issue, but the shareholder has a <em>choice</em> — they can either take the new shares (stock dividend) or receive the equivalent value in cash. This gives shareholders flexibility depending on their individual needs.
              </li>
            </ul>
          </div>

          {/* ===== SECTION 14 ===== */}
          <SectionHeading id="worked-examples" number="Section 14" title="Worked Examples from Past Papers" />

          {/* Example 1 — Jaribu Trading Company */}
          <div className="rounded-lg border border-border bg-card/50 p-5 mb-8">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Question 1 — Jaribu Trading Company</p>
            <p className="text-sm text-foreground/75 mb-1">Authorised capital: Sh 5,000,000 (25,000 ordinary shares of Sh 200 each). Year ended 31 December 2011.</p>
            <p className="text-xs text-muted-foreground mb-4">Key additional info: Closing stock Sh 900,000; depreciation on fixtures 10% on cost (cost = Sh 340,000); transfer to general reserve Sh 200,000; rates prepaid Sh 8,000; rent receivable accrued Sh 10,000; advertising prepaid Sh 20,000; final dividend 5%.</p>

            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Step 1: Adjustments</p>
            <div className="font-mono text-xs bg-muted/30 rounded p-3 mb-3 space-y-1">
              <p>Depreciation: Sh 340,000 × 10% = <strong>Sh 34,000</strong></p>
              <p>Rates expense: 48,000 − 8,000 prepaid = <strong>Sh 40,000</strong></p>
              <p>Rent receivable: 80,000 + 10,000 accrued = <strong>Sh 90,000</strong> income</p>
              <p>Advertising expense: 60,000 − 20,000 prepaid = <strong>Sh 40,000</strong></p>
              <p>Final dividend: Issued share capital (11,250 shares × Sh 200 = Sh 2,250,000). 5% × Sh 2,250,000 = <strong>Sh 112,500</strong></p>
              <p className="text-muted-foreground text-xs">Note: 11,250 ordinary shares issued (Sh 2,250,000 ÷ Sh 200 = 11,250 shares). Authorised was 25,000 but issued is shown in trial balance as Sh 2,250,000.</p>
            </div>

            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Step 2: Trading, P&amp;L Account</p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs border-collapse border border-border/60 font-mono">
                <thead><tr className="bg-muted/50">
                  <th className="border border-border/60 px-2 py-2 text-left text-xs font-bold text-foreground/70">Item</th>
                  <th className="border border-border/60 px-2 py-2 text-right text-xs font-bold text-foreground/70">Sh</th>
                  <th className="border border-border/60 px-2 py-2 text-right text-xs font-bold text-foreground/70">Sh</th>
                </tr></thead>
                <tbody className="text-foreground/80">
                  <tr><td className="border border-border/60 px-2 py-1">Sales (7,000,000 − 130,000)</td><td className="border border-border/60 px-2 py-1"></td><td className="border border-border/60 px-2 py-1 text-right">6,870,000</td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-2 py-1">Opening Stock</td><td className="border border-border/60 px-2 py-1 text-right">600,000</td><td className="border border-border/60 px-2 py-1"></td></tr>
                  <tr><td className="border border-border/60 px-2 py-1">Add: Purchases (5,700,000 − 30,000)</td><td className="border border-border/60 px-2 py-1 text-right">5,670,000</td><td className="border border-border/60 px-2 py-1"></td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-2 py-1">Less: Closing Stock</td><td className="border border-border/60 px-2 py-1 text-right">(900,000)</td><td className="border border-border/60 px-2 py-1 text-right">(5,370,000)</td></tr>
                  <tr><td className="border border-border/60 px-2 py-1 font-bold">GROSS PROFIT</td><td className="border border-border/60 px-2 py-1"></td><td className="border border-border/60 px-2 py-1 text-right font-bold">1,500,000</td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-2 py-1">Add: Rent received</td><td className="border border-border/60 px-2 py-1"></td><td className="border border-border/60 px-2 py-1 text-right">90,000</td></tr>
                  <tr><td className="border border-border/60 px-2 py-1">Add: Discount received</td><td className="border border-border/60 px-2 py-1"></td><td className="border border-border/60 px-2 py-1 text-right">40,000</td></tr>
                  <tr className="bg-muted/20"><td className="border border-border/60 px-2 py-1" colSpan={3}><em>Less Expenses:</em></td></tr>
                  <tr><td className="border border-border/60 px-2 py-1 pl-4">Bad debts written off</td><td className="border border-border/60 px-2 py-1 text-right">80,000</td><td className="border border-border/60 px-2 py-1"></td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-2 py-1 pl-4">Rates (adjusted)</td><td className="border border-border/60 px-2 py-1 text-right">40,000</td><td className="border border-border/60 px-2 py-1"></td></tr>
                  <tr><td className="border border-border/60 px-2 py-1 pl-4">Salaries (directors')</td><td className="border border-border/60 px-2 py-1 text-right">704,000</td><td className="border border-border/60 px-2 py-1"></td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-2 py-1 pl-4">Advertising (adjusted)</td><td className="border border-border/60 px-2 py-1 text-right">40,000</td><td className="border border-border/60 px-2 py-1"></td></tr>
                  <tr><td className="border border-border/60 px-2 py-1 pl-4">General expenses</td><td className="border border-border/60 px-2 py-1 text-right">50,000</td><td className="border border-border/60 px-2 py-1"></td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-2 py-1 pl-4">Depreciation — Fixtures</td><td className="border border-border/60 px-2 py-1 text-right">34,000</td><td className="border border-border/60 px-2 py-1 text-right">(948,000)</td></tr>
                  <tr><td className="border border-border/60 px-2 py-1 font-bold">OPERATING PROFIT</td><td className="border border-border/60 px-2 py-1"></td><td className="border border-border/60 px-2 py-1 text-right font-bold">642,000</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Step 3: Appropriation Account</p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs border-collapse border border-border/60 font-mono">
                <tbody className="text-foreground/80">
                  <tr><td className="border border-border/60 px-2 py-1 font-bold">Operating Profit</td><td className="border border-border/60 px-2 py-1 text-right font-bold">642,000</td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-2 py-1">Less: Transfer to General Reserve</td><td className="border border-border/60 px-2 py-1 text-right">(200,000)</td></tr>
                  <tr><td className="border border-border/60 px-2 py-1">Less: Interim dividend paid</td><td className="border border-border/60 px-2 py-1 text-right">(150,000)</td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-2 py-1">Less: Final dividend proposed (5% × 2,250,000)</td><td className="border border-border/60 px-2 py-1 text-right">(112,500)</td></tr>
                  <tr><td className="border border-border/60 px-2 py-1 font-semibold">Retained profit for the year</td><td className="border border-border/60 px-2 py-1 text-right font-semibold">179,500</td></tr>
                  <tr className="bg-muted/10"><td className="border border-border/60 px-2 py-1">Add: Retained profit b/f (P&amp;L a/c 1.1.11)</td><td className="border border-border/60 px-2 py-1 text-right">1,030,000</td></tr>
                  <tr className="bg-muted/30"><td className="border border-border/60 px-2 py-1 font-bold">Retained profit c/d</td><td className="border border-border/60 px-2 py-1 text-right font-bold">1,209,500</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Step 4: Statement of Financial Position (extract — Financed By)</p>
            <div className="font-mono text-xs bg-muted/30 rounded p-3">
              <p className="font-bold mb-1">Financed by:</p>
              <p>Authorised Share Capital</p>
              <p className="ml-4">25,000 ordinary shares of Sh 200 each &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5,000,000</p>
              <p className="mt-1">Issued and Fully Paid</p>
              <p className="ml-4">11,250 ordinary shares of Sh 200 each &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2,250,000</p>
              <p className="mt-1">Revenue Reserves</p>
              <p className="ml-4">General Reserve &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 200,000</p>
              <p className="ml-4">Profit and Loss Account &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1,209,500</p>
              <p className="mt-1">Current Liabilities</p>
              <p className="ml-4">Final Dividend Payable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 112,500</p>
              <p className="ml-4">Creditors &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 430,000</p>
            </div>
          </div>

        </div>

        {/* Sidebar */}
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
