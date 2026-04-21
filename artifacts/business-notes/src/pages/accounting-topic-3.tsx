import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Lightbulb, Info, AlertTriangle, CheckCircle2 } from "lucide-react";

const sections = [
  { id: "overview", label: "1. Introduction" },
  { id: "control-purpose", label: "2. Purpose of Control Accounts" },
  { id: "slca-format", label: "3. Sales Ledger Control A/c" },
  { id: "slca-entries", label: "4. SLCA — Every Entry Explained" },
  { id: "plca-format", label: "5. Purchases Ledger Control A/c" },
  { id: "plca-entries", label: "6. PLCA — Every Entry Explained" },
  { id: "special-entries", label: "7. Special Entries" },
  { id: "important-notes", label: "8. Key Rules to Remember" },
  { id: "worked-slca", label: "9. Worked Example — SLCA" },
  { id: "worked-plca", label: "10. Worked Example — PLCA" },
  { id: "incomplete-intro", label: "11. Incomplete Records — Intro" },
  { id: "statement-affairs", label: "12. Statement of Affairs" },
  { id: "turnover-method", label: "13. Finding Missing Figures" },
  { id: "worked-mwangi", label: "14. Worked Example — G. Mwangi" },
  { id: "exam-questions", label: "15. Exam Practice Questions" },
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

function LedgerTable({ title, rows, headers }: { title?: string; rows: string[][]; headers?: string[] }) {
  return (
    <div className="my-4">
      {title && <p className="text-sm font-bold text-center text-foreground mb-1 underline">{title}</p>}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm border-collapse font-mono">
          {headers && (
            <thead>
              <tr className="bg-muted/40">
                {headers.map((h, i) => (
                  <th key={i} className="p-2 border border-border text-xs font-semibold text-foreground text-left">{h}</th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className={ri % 2 === 0 ? "" : "bg-muted/10"}>
                {row.map((cell, ci) => (
                  <td key={ci} className={`p-2 border border-border text-xs leading-snug ${cell.startsWith("__") ? "border-t-2 border-t-foreground/50 font-bold" : ""}`}>
                    {cell.startsWith("__") ? cell.slice(2) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function AccountingTopic3() {
  const [activeSection, setActiveSection] = useState("overview");
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
        { label: "Unit 6 — Accounting", href: "/" },
        { label: "Control Accounts & Incomplete Records" },
      ]}
    >
      <Helmet>
        <title>Control Accounts & Incomplete Records | Accounting | Study Notes</title>
        <meta name="description" content="Control accounts (SLCA, PLCA), purpose, format, all entries explained with worked examples. Incomplete records theory, statement of affairs, net worth method. BCom TUK notes." />
      </Helmet>

      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase mb-3">Accounting (ACC 211)</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
              Control Accounts &amp; Incomplete Records
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Two of the most examined topics in financial accounting. Control accounts are the summarising mechanism that keeps the entire ledger system in check. Incomplete records is the technique accountants use when a business owner has not kept proper double-entry books — a very common situation in small Kenyan businesses.
            </p>
          </div>

          {/* ── SECTION 1 ── */}
          <SectionHeading id="overview" number="Section 1" title="What Are Control Accounts?" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            In a business with many customers and suppliers, there can be hundreds or thousands of individual debtor and creditor accounts in the ledger. Checking every single account individually to ensure nothing has been missed or mis-posted would take forever. <strong>Control accounts</strong> solve this problem by maintaining a running total that should always agree with the sum of all the individual accounts it controls.
          </p>

          <ExplainerBox>
            <strong>The Principle in Plain English:</strong><br /><br />
            Think of a school with 500 students. Each student has a personal fee account. The bursar maintains a <em>control account</em> — a single summary account that records the total fees billed to all students, total payments received, and total outstanding balance. If the control account shows KES 2,400,000 owing, then the sum of all 500 individual student accounts must also add up to KES 2,400,000. If they don't match, something has been posted incorrectly — the control account has found the error.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            There are <strong>two main control accounts</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="border-border">
              <CardContent className="p-5">
                <p className="font-bold text-foreground mb-2">Sales Ledger Control Account (SLCA)</p>
                <p className="text-sm text-foreground/75 mb-3">Also called: <em>Total Debtors Account</em></p>
                <p className="text-sm text-foreground/75">Summarises all transactions with credit customers (debtors). The closing balance should equal the sum of all individual debtor balances in the Sales Ledger.</p>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-5">
                <p className="font-bold text-foreground mb-2">Purchases Ledger Control Account (PLCA)</p>
                <p className="text-sm text-foreground/75 mb-3">Also called: <em>Total Creditors Account</em></p>
                <p className="text-sm text-foreground/75">Summarises all transactions with credit suppliers (creditors). The closing balance should equal the sum of all individual creditor balances in the Purchases Ledger.</p>
              </CardContent>
            </Card>
          </div>

          <ExampleBox>
            <strong>Real-World Kenya Example:</strong><br /><br />
            Kamau Hardware in Nakuru sells goods on credit to 80 contractors. Each contractor has their own debtor account in the Sales Ledger. At month end, the bookkeeper adds up all 80 balances — KES 1,240,000. Independently, the accountant checks the Sales Ledger Control Account (which records totals from day-books, not individual accounts) — it shows KES 1,240,000. They match. The posting is confirmed correct.<br /><br />
            If the SLCA showed KES 1,260,000 and the individual accounts totalled KES 1,240,000, a KES 20,000 posting error exists somewhere — the control account has detected it.
          </ExampleBox>

          {/* ── SECTION 2 ── */}
          <SectionHeading id="control-purpose" number="Section 2" title="Purpose of Control Accounts" />

          <div className="space-y-3 mb-6">
            {[
              {
                num: "1",
                title: "Arithmetical Check on Postings",
                body: "Every transaction is posted twice — once to the individual account in the Sales/Purchases Ledger, and once (as a total) to the Control Account. If the totals agree, the individual postings are arithmetically correct. If they disagree, an error or omission exists and must be found.",
              },
              {
                num: "2",
                title: "Quick Balance for the Trial Balance",
                body: "The Trial Balance needs a single figure for total debtors and a single figure for total creditors. Without control accounts, you would have to add up every individual debtor and creditor balance. The control account provides these totals instantly — saving time especially in large businesses.",
              },
              {
                num: "3",
                title: "Detection and Prevention of Errors and Fraud",
                body: "Because the control account is maintained independently of the individual accounts (often by a different person), it is much harder for a dishonest clerk to manipulate both records without being detected. Any discrepancy between the control account and the ledger total is immediately visible.",
              },
              {
                num: "4",
                title: "Delegation of Duties",
                body: "Control accounts allow the work of maintaining debtor and creditor records to be split among different clerks (one for Debtor A–M, another for Debtor N–Z, etc.) while the total is still controlled centrally. This enables larger businesses to manage high volumes of transactions across multiple staff.",
              },
            ].map((p) => (
              <Card key={p.num} className="border-border">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <span className="text-xl font-serif font-bold text-primary/30 shrink-0 w-6">{p.num}.</span>
                    <div>
                      <p className="font-semibold text-foreground mb-1">{p.title}</p>
                      <p className="text-sm text-foreground/75 leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ── SECTION 3 ── */}
          <SectionHeading id="slca-format" number="Section 3" title="Format of the Sales Ledger Control Account" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The SLCA is a T-account. The <strong>debit side</strong> records everything that <em>increases</em> what debtors owe us. The <strong>credit side</strong> records everything that <em>reduces</em> what debtors owe us.
          </p>

          <LedgerTable
            title="Sales Ledger Control Account"
            headers={["Dr Side — Increases Debtors", "£/Sh", "Cr Side — Reduces Debtors", "£/Sh"]}
            rows={[
              ["Balance b/d (debit balances from previous period)", "×", "Balance b/d (credit balances b/f from previous period)", "×"],
              ["Total credit sales (from Sales Journal)", "×", "Cash received from debtors (from Cash Book)", "×"],
              ["Refunds to customers (from Cash Book)", "×", "Cheques received from debtors (from Cash Book)", "×"],
              ["Dishonoured cheques (from Cash Book)", "×", "Returns inwards — goods returned by customers (Returns Inwards Journal)", "×"],
              ["Bad debts recovered (from General Journal)", "×", "Discount allowed to customers (from Cash Book)", "×"],
              ["Interest charged on overdue accounts", "×", "Bad debts written off (from General Journal)", "×"],
              ["Credit balances c/f (closing credit balances)", "×", "Contra — Purchases Ledger set-off", "×"],
              ["", "", "Allowances to customers (price reductions beyond discount)", "×"],
              ["", "", "Debit balances c/d (closing debit balance — what debtors still owe)", "×"],
            ]}
          />

          <NoteBox>
            The closing <strong>debit balance c/d</strong> on the SLCA is the figure that appears as <em>Trade Receivables (Debtors)</em> on the Balance Sheet / Statement of Financial Position.
          </NoteBox>

          {/* ── SECTION 4 ── */}
          <SectionHeading id="slca-entries" number="Section 4" title="Every SLCA Entry — Explained" />

          <div className="space-y-4 mb-6">
            {[
              {
                entry: "Balance b/d (debit) — Opening debtors",
                side: "DEBIT",
                why: "At the start of the period, debtors already owe us money from the previous period. This is a debit balance because debtors owe US — they are our asset.",
                example: "On 1 May, customers owe KES 64,200 from April. This opens the SLCA on the debit side.",
              },
              {
                entry: "Total Credit Sales (from Sales Journal)",
                side: "DEBIT",
                why: "When we sell on credit, the debtor now owes us more. More owed to us = debit. The total of ALL credit sales invoices raised during the period is entered here as one total (taken from the Sales Day Book / Journal).",
                example: "During May, credit sales totalled KES 128,000. This increases total debtors — debit SLCA.",
              },
              {
                entry: "Dishonoured Cheques",
                side: "DEBIT",
                why: "A customer pays by cheque (we initially credit the SLCA). The cheque bounces — the bank reverses it. The debt is restored. We must put it back on the debit side to reinstate what is owed.",
                example: "Mwenda's KES 5,000 cheque bounces. We debit SLCA KES 5,000 to restore his debt.",
              },
              {
                entry: "Refunds to Customers",
                side: "DEBIT",
                why: "A customer has overpaid (their account has a credit balance). We refund them cash. We debit their account (removing the credit balance) — this appears as a debit in the SLCA.",
                example: "Wanjiku paid KES 1,000 for goods costing KES 900. We refund KES 100 by cash — Dr Debtor, Cr Cash Book.",
              },
              {
                entry: "Bad Debts Recovered",
                side: "DEBIT",
                why: "A bad debt previously written off is now partially or fully paid. The debt is first reinstated (debit the debtor's account), then the cash receipt is recorded. The reinstatement goes on the debit side of SLCA.",
                example: "Omondi owed KES 3,000 written off in 2022. He pays in 2023. Reinstate: Dr SLCA 3,000.",
              },
              {
                entry: "Cash / Cheques Received from Debtors",
                side: "CREDIT",
                why: "When a debtor pays us, the amount they owe falls. Reducing an asset (debtors) = credit. The totals of all cash and cheque receipts from credit customers are entered from the Cash Book.",
                example: "During May, KES 103,700 received from debtors (cash and cheques). Credit SLCA.",
              },
              {
                entry: "Discount Allowed to Customers",
                side: "CREDIT",
                why: "We allow a customer a cash discount for paying early (e.g., 2% if paid within 14 days). This reduces the amount they owe us. Reducing debtors = credit. Taken from the discount column in the Cash Book.",
                example: "KES 3,950 discount allowed to customers during May. Reduces total debtors — credit SLCA.",
              },
              {
                entry: "Returns Inwards (Sales Returns)",
                side: "CREDIT",
                why: "Customers return goods — they no longer owe us for those goods. The debt is reduced. Reducing debtors = credit. Taken from the Returns Inwards Journal.",
                example: "Kamau returns goods worth KES 800. His debt is reduced — credit SLCA KES 800.",
              },
              {
                entry: "Bad Debts Written Off",
                side: "CREDIT",
                why: "A customer cannot pay — we give up trying to collect. We remove (write off) the debt from the accounts. Removing a debtor balance = credit SLCA. This is NOT the same as provision for bad debts (which does NOT appear in the SLCA).",
                example: "Otieno owes KES 12,000 which is irrecoverable. Write off: Cr SLCA 12,000, Dr Bad Debts Expense.",
              },
              {
                entry: "Contra — Purchases Ledger Set-off",
                side: "CREDIT",
                why: "A customer is also our supplier. They owe us KES 10,000 as a debtor; we owe them KES 6,000 as a creditor. We set these off: their creditor balance (KES 6,000) is transferred to reduce their debtor balance. Reduces debtors = credit SLCA. The same amount debits the PLCA.",
                example: "Achieng owes us KES 10,000 (debtor) and we owe her KES 6,000 (creditor). Set-off KES 6,000: Cr SLCA 6,000, Dr PLCA 6,000. She now only owes us a net KES 4,000.",
              },
            ].map((e) => (
              <Card key={e.entry} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5 ${e.side === "DEBIT" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"}`}>{e.side}</span>
                    <div>
                      <p className="font-semibold text-foreground mb-1">{e.entry}</p>
                      <p className="text-sm text-foreground/75 mb-2">{e.why}</p>
                      <p className="text-xs italic text-muted-foreground border-l-2 border-primary/20 pl-2">{e.example}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ── SECTION 5 ── */}
          <SectionHeading id="plca-format" number="Section 5" title="Format of the Purchases Ledger Control Account" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The PLCA mirrors the SLCA but from the creditors' perspective. The <strong>credit side</strong> records everything that <em>increases</em> what we owe suppliers. The <strong>debit side</strong> records everything that <em>reduces</em> what we owe them.
          </p>

          <LedgerTable
            title="Purchases Ledger Control Account"
            headers={["Dr Side — Reduces Creditors", "£/Sh", "Cr Side — Increases Creditors", "£/Sh"]}
            rows={[
              ["Balance b/d (debit balances from previous period)", "×", "Balance b/d (credit balances — what we owe suppliers b/f)", "×"],
              ["Cash paid to suppliers (from Cash Book)", "×", "Total credit purchases (from Purchases Journal)", "×"],
              ["Cheques paid to suppliers (from Cash Book)", "×", "Refunds received from suppliers (from Cash Book)", "×"],
              ["Discount received from suppliers (from Cash Book)", "×", "", ""],
              ["Returns outwards — goods we returned (Returns Outwards Journal)", "×", "", ""],
              ["Allowances received from suppliers", "×", "", ""],
              ["Contra — Sales Ledger set-off", "×", "", ""],
              ["Credit balances c/d (closing credit balance — what we still owe)", "×", "Debit balances c/f (closing debit balances b/f)", "×"],
            ]}
          />

          <NoteBox>
            The closing <strong>credit balance c/d</strong> on the PLCA is the figure that appears as <em>Trade Payables (Creditors)</em> on the Balance Sheet.
          </NoteBox>

          {/* ── SECTION 6 ── */}
          <SectionHeading id="plca-entries" number="Section 6" title="Every PLCA Entry — Explained" />

          <div className="space-y-4 mb-6">
            {[
              {
                entry: "Balance b/d (credit) — Opening creditors",
                side: "CREDIT",
                why: "At the start of the period, we already owe suppliers money from the previous period. This is a credit balance because we OWE them — it is our liability.",
                example: "On 1 June, we owe suppliers KES 36,760 from May. Opens on the credit side.",
              },
              {
                entry: "Total Credit Purchases (from Purchases Journal)",
                side: "CREDIT",
                why: "When we buy on credit, we owe the supplier more. More owed = credit. Taken from the Purchases Day Book (the total of all purchase invoices received).",
                example: "June credit purchases total KES 422,570. Increases creditors — credit PLCA.",
              },
              {
                entry: "Refunds from Suppliers",
                side: "CREDIT",
                why: "We have overpaid a supplier (their account shows a debit balance on our PLCA). They refund us in cash. This increases their credit balance — credit PLCA.",
                example: "Supplier refunds KES 2,000 due to overpayment — credit PLCA.",
              },
              {
                entry: "Cash / Cheques Paid to Suppliers",
                side: "DEBIT",
                why: "When we pay a supplier, the amount we owe them decreases. Reducing a liability = debit. Taken from the payments side of the Cash Book.",
                example: "KES 387,650 paid to suppliers by cheque in June. Reduces creditors — debit PLCA.",
              },
              {
                entry: "Discount Received from Suppliers",
                side: "DEBIT",
                why: "A supplier allows us a cash discount for early payment. This reduces what we owe them. Reducing a liability = debit. Taken from the discount received column of the Cash Book.",
                example: "KES 8,870 discount received from suppliers. Reduces creditors — debit PLCA.",
              },
              {
                entry: "Returns Outwards (Purchases Returns)",
                side: "DEBIT",
                why: "We return goods to a supplier — we no longer owe them for those goods. Reduces our liability to them = debit. Taken from the Returns Outwards Journal.",
                example: "We return defective goods worth KES 10,980 to suppliers. Debit PLCA KES 10,980.",
              },
              {
                entry: "Contra — Sales Ledger set-off",
                side: "DEBIT",
                why: "We owe Supplier X KES 6,000 and Supplier X also owes us KES 6,000 (they are also our customer). We set off the amounts. Reduces our creditor balance = debit PLCA. Same amount credits the SLCA.",
                example: "We owe Supplier Korir KES 4,000 and Korir owes us KES 4,000. Contra: Dr PLCA 4,000, Cr SLCA 4,000. Both balances are eliminated.",
              },
            ].map((e) => (
              <Card key={e.entry} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5 ${e.side === "DEBIT" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300" : "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"}`}>{e.side}</span>
                    <div>
                      <p className="font-semibold text-foreground mb-1">{e.entry}</p>
                      <p className="text-sm text-foreground/75 mb-2">{e.why}</p>
                      <p className="text-xs italic text-muted-foreground border-l-2 border-primary/20 pl-2">{e.example}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ── SECTION 7 ── */}
          <SectionHeading id="special-entries" number="Section 7" title="Special Entries You Must Know" />

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-4">Refunds to Customers (SLCA)</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-3">
            Sometimes a customer's account ends up with a credit balance — meaning we owe <em>them</em> money. This happens when a customer overpays, or returns more goods than they currently owe. If we then pay them back in cash, we debit their account (removing the credit balance) and credit the Cash Book.
          </p>

          <LedgerTable
            title="Debtor A — Example of Refund"
            headers={["Dr", "£", "Cr", "£"]}
            rows={[
              ["Sales", "1,000", "Cash Book (payments received)", "950"],
              ["Cash Book (Refund paid to A)", "100", "Discount Allowed", "50"],
              ["", "", "Returns Inwards", "100"],
              ["__Total", "__1,100", "__Total", "__1,100"],
            ]}
          />

          <ExplainerBox>
            <strong>Why does the refund appear on the DEBIT side of Debtor A's account?</strong><br /><br />
            Normally cash received FROM a debtor goes on the credit side (reducing what they owe). But here, we are paying cash TO the debtor (refunding them). This is the reverse — it is like a new sale of sorts, increasing the customer's position. We debit Debtor A's account, and credit the Cash Book. In the SLCA, this refund appears on the debit side as "Refunds to Customers."
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">Contra / Set-off Entry</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-3">
            When the same person is both your customer (debtor) AND your supplier (creditor), you can set the two balances off against each other rather than both parties paying each other. The smaller balance is transferred to cancel it.
          </p>

          <LedgerTable
            title="Contra Example: Debtor A is also Creditor A"
            headers={["Debtor A (in Sales Ledger)", "£", "", "Creditor A (in Purchases Ledger)", "£", ""]}
            rows={[
              ["Sales", "2,000", "Dr", "Contra – Debtor (set-off)", "1,000", "Dr"],
              ["", "", "", "Purchases", "1,000", "Cr"],
              ["Contra – Purchases", "1,000", "Cr", "", "", ""],
              ["Balance c/d (net owed by A)", "1,000", "Cr", "", "", ""],
              ["__Total", "__2,000", "", "__Total", "__1,000", ""],
            ]}
          />

          <ExplainerBox>
            <strong>How to Record the Contra in the Control Accounts:</strong><br />
            Debit the PLCA (reducing what we owe the creditor by KES 1,000) AND Credit the SLCA (reducing what the debtor owes us by KES 1,000). The two entries must be the same amount — this is the contra.
          </ExplainerBox>

          {/* ── SECTION 8 ── */}
          <SectionHeading id="important-notes" number="Section 8" title="Critical Rules — What Belongs and What Doesn't" />

          <div className="space-y-3 mb-6">
            {[
              {
                rule: "Cash Sales — NOT included in SLCA",
                detail: "Only credit sales go through the SLCA. Cash sales bypass the Sales Ledger entirely — there is no debtor involved. Cash sales go straight to the Cash Book and Income Statement. Including them in the SLCA would inflate the debtor balance.",
                badge: "EXCLUDE",
                color: "red",
              },
              {
                rule: "Only Cash Discounts — NOT Trade Discounts",
                detail: "A trade discount is a reduction in the invoice price given at the time of sale (e.g., 20% off for bulk purchase). It is deducted before the invoice is raised, so it is never recorded as a separate entry — the invoice already shows the net amount. A cash discount is a prompt-payment discount recorded in the Cash Book. Only cash discounts appear in control accounts.",
                badge: "CASH DISC ONLY",
                color: "amber",
              },
              {
                rule: "Provision for Doubtful Debts — NOT in SLCA",
                detail: "The provision for doubtful debts is an accounting estimate (a contra-asset on the Balance Sheet). It does NOT reduce the actual debtor balance — it just adjusts the balance sheet presentation. Increasing or decreasing the provision has no effect on the SLCA. Only ACTUAL bad debt write-offs appear in the SLCA.",
                badge: "EXCLUDE",
                color: "red",
              },
              {
                rule: "Cash Purchases — NOT in PLCA",
                detail: "Only credit purchases go through the PLCA. Cash purchases are paid immediately — no creditor is created. They go straight from Cash Book to the Purchases account. Exception: in incomplete records questions, cash purchases may be derived via a working and included in total purchases.",
                badge: "EXCLUDE",
                color: "red",
              },
              {
                rule: "Interest Charged on Overdue Accounts",
                detail: "If a business charges customers interest on overdue balances, this interest increases the debtor balance — debit SLCA. However, when working backwards to find total sales under incomplete records, it is wise to separate interest from trading sales.",
                badge: "INCLUDE",
                color: "green",
              },
            ].map((r) => (
              <Card key={r.rule} className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded shrink-0 mt-0.5 ${r.color === "red" ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300" : r.color === "green" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"}`}>{r.badge}</span>
                    <div>
                      <p className="font-semibold text-foreground mb-1">{r.rule}</p>
                      <p className="text-sm text-foreground/75 leading-relaxed">{r.detail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ── SECTION 9 ── */}
          <SectionHeading id="worked-slca" number="Section 9" title="Worked Example — Sales Ledger Control Account" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Example 5.2 from your notes:</strong> Prepare a Sales Ledger Control Account for May 2003 from the following:
          </p>

          <div className="my-4 overflow-x-auto rounded-lg border border-border bg-muted/20">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["May 1", "Debit balances (opening debtors)", "£64,200"],
                  ["During May", "Sales Journal (total credit sales)", "£128,000"],
                  ["During May", "Cash and cheques received from debtors", "£103,700"],
                  ["During May", "Discounts allowed to customers", "£3,950"],
                  ["During May", "Debit balances in sales ledger set off against credit balances in purchases ledger (contra)", "£1,450"],
                  ["May 31", "Credit balances (closing credit balances)", "£500"],
                  ["May 31", "Debit balances (closing debit balance) — to find", "?"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "" : "bg-muted/30"}>
                    <td className="p-2 pl-4 text-xs text-muted-foreground w-24">{row[0]}</td>
                    <td className="p-2 text-xs">{row[1]}</td>
                    <td className="p-2 pr-4 text-xs font-mono font-semibold text-right w-28">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="text-base font-semibold text-foreground mb-3 mt-4">Step-by-Step Solution</h3>
          <p className="text-sm text-foreground/75 mb-3">
            <strong>Step 1 — Identify which side each item goes:</strong><br />
            • Opening debit balances → <span className="text-blue-600 font-semibold">DEBIT</span><br />
            • Credit sales → <span className="text-blue-600 font-semibold">DEBIT</span><br />
            • Cash/cheques received → <span className="text-green-600 font-semibold">CREDIT</span><br />
            • Discounts allowed → <span className="text-green-600 font-semibold">CREDIT</span><br />
            • Contra (set-off against purchases ledger) → <span className="text-green-600 font-semibold">CREDIT</span><br />
            • Closing credit balances → <span className="text-blue-600 font-semibold">DEBIT</span> (carried forward from credit side)<br />
            • Closing debit balances → <span className="text-green-600 font-semibold">CREDIT</span> (the balancing figure)
          </p>

          <p className="text-sm text-foreground/75 mb-3">
            <strong>Step 2 — Total the debit side first:</strong><br />
            £64,200 (opening debtors) + £128,000 (credit sales) = <strong>£192,200</strong><br />
            (The closing credit balance of £500 is added to the debit side to make both sides equal — it's carried forward)
          </p>

          <p className="text-sm text-foreground/75 mb-4">
            <strong>Step 3 — Find the closing debit balance (balancing figure):</strong><br />
            Total debit side must equal total credit side.<br />
            Credit side so far: £103,700 + £3,950 + £1,450 + £500 (bal c/d credit) = £109,600<br />
            Balancing figure = £192,700 − £109,600 = <strong>£83,100 (closing debtors)</strong>
          </p>

          <LedgerTable
            title="Sales Ledger Control Account — May 2003"
            headers={["Dr", "£", "Cr", "£"]}
            rows={[
              ["1/5 Balance b/d (debtors)", "64,200", "Cash Book (cash & cheques received)", "103,700"],
              ["Sales Journal (credit sales)", "128,000", "Discount Allowed", "3,950"],
              ["31/5 Balance c/d (credit balances)", "500", "Purchases Ledger Contra", "1,450"],
              ["", "", "31/5 Balance c/d (debit balances — closing debtors)", "83,600"],
              ["__Total", "__192,700", "__Total", "__192,700"],
            ]}
          />

          <ExplainerBox>
            <strong>Reading the answer:</strong> At 31 May 2003, total debtors outstanding = <strong>£83,600</strong>. There are also £500 worth of customers with credit balances on their accounts (they have overpaid). Both figures appear on the Balance Sheet — the £83,600 as a current asset, and the £500 as a current liability (we owe them a refund).
          </ExplainerBox>

          {/* ── SECTION 10 ── */}
          <SectionHeading id="worked-plca" number="Section 10" title="Worked Example — Purchases Ledger Control Account" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Example 5.1 from your notes:</strong> Prepare a Purchases Ledger Control Account for June 2003. Balance represents creditors at 30 June.
          </p>

          <div className="my-4 overflow-x-auto rounded-lg border border-border bg-muted/20">
            <table className="w-full text-sm">
              <tbody>
                {[
                  ["June 1", "Opening credit balances (creditors b/f)", "£36,760"],
                  ["During June", "Purchases Journal (total credit purchases)", "£422,570"],
                  ["During June", "Returns Outwards Journal", "£10,980"],
                  ["During June", "Cheques paid to suppliers", "£387,650"],
                  ["During June", "Discounts received from suppliers", "£8,870"],
                  ["June 30", "Closing balance (creditors — to find)", "?"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "" : "bg-muted/30"}>
                    <td className="p-2 pl-4 text-xs text-muted-foreground w-24">{row[0]}</td>
                    <td className="p-2 text-xs">{row[1]}</td>
                    <td className="p-2 pr-4 text-xs font-mono font-semibold text-right w-28">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <LedgerTable
            title="Purchases Ledger Control Account — June 2003"
            headers={["Dr", "£", "Cr", "£"]}
            rows={[
              ["Returns Outwards", "10,980", "1/6 Balance b/d (creditors)", "36,760"],
              ["Bank (cheques paid)", "387,650", "Purchases Journal", "422,570"],
              ["Discounts Received", "8,870", "", ""],
              ["30/6 Balance c/d (closing creditors)", "51,830", "", ""],
              ["__Total", "__459,330", "__Total", "__459,330"],
            ]}
          />

          <ExplainerBox>
            <strong>Workings for balance c/d:</strong><br /><br />
            Credit side total = £36,760 + £422,570 = <strong>£459,330</strong><br />
            Debit side (excluding balance) = £10,980 + £387,650 + £8,870 = £407,500<br />
            Closing balance = £459,330 − £407,500 = <strong>£51,830</strong><br /><br />
            This £51,830 is what the business still owes its suppliers on 30 June 2003 — appears as Trade Payables on the Balance Sheet.
          </ExplainerBox>

          {/* ── SECTION 11 ── */}
          <SectionHeading id="incomplete-intro" number="Section 11" title="Incomplete Records — Introduction" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Not every business keeps a full set of double-entry accounting records. This is particularly common among:
          </p>
          <ul className="space-y-1 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span>Small sole traders and market vendors</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span>Family-run businesses in Kenya, Uganda, Tanzania</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span>Businesses that have suffered a fire, flood, or burglary destroying their books</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span>Businesses where the owner has limited accounting knowledge</span></li>
          </ul>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            When asked to prepare accounts for such a business, an accountant must reconstruct the financial statements from whatever partial records are available — bank statements, invoices, asset valuations, and the owner's memory. This is called <strong>incomplete records accounting</strong>.
          </p>

          <ExplainerBox>
            <strong>Two Main Approaches:</strong><br /><br />
            <strong>1. Statement of Affairs / Net Worth Method:</strong> When very little information is available. Compare opening and closing net assets (assets minus liabilities) to estimate profit. Adjusted for drawings and capital introduced.<br /><br />
            <strong>2. Reconstructing the Accounts:</strong> When partial records exist (bank statements, cashbooks, invoices). Use control accounts, mark-up/margin percentages, and working notes to reconstruct the missing figures — then prepare a full Income Statement and Balance Sheet.
          </ExplainerBox>

          {/* ── SECTION 12 ── */}
          <SectionHeading id="statement-affairs" number="Section 12" title="Statement of Affairs — Finding Opening Capital and Profit" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A <strong>Statement of Affairs</strong> is simply a Balance Sheet prepared from available information — listing all known assets and liabilities, with the capital being the balancing figure (Assets − Liabilities = Capital / Net Worth).
          </p>

          <ExplainerBox>
            <strong>The Accounting Equation at the Heart of Incomplete Records:</strong><br /><br />
            <code className="text-base font-mono">Capital = Assets − Liabilities</code><br /><br />
            If you know all assets and all liabilities, you can calculate capital even without a full set of books. This is the Statement of Affairs — and it is the starting point for almost every incomplete records question.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-4">Finding Profit Using the Net Worth Method</h3>

          <div className="my-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-bold text-primary mb-3">The Net Worth Formula</p>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between border-b border-border pb-1">
                <span>Closing Capital (Assets − Liabilities at year end)</span>
                <span>X</span>
              </div>
              <div className="flex justify-between">
                <span>Add: Drawings during the year</span>
                <span>X</span>
              </div>
              <div className="flex justify-between border-b border-border pb-1">
                <span>Less: Capital introduced during the year</span>
                <span>(X)</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>= Adjusted closing capital</span>
                <span>X</span>
              </div>
              <div className="flex justify-between border-b border-border pb-1">
                <span>Less: Opening Capital (from opening Statement of Affairs)</span>
                <span>(X)</span>
              </div>
              <div className="flex justify-between text-primary font-bold text-base border-t-2 border-primary/40 pt-1">
                <span>= NET PROFIT for the year</span>
                <span>X</span>
              </div>
            </div>
          </div>

          <NoteBox>
            <strong>Why do we add back drawings?</strong><br /><br />
            Drawings reduce the closing capital — so if we want to measure profit independently of the owner's withdrawals, we must add them back. If a business made a profit of KES 200,000 but the owner withdrew KES 80,000, the closing capital only increased by KES 120,000. The formula reverses this to find the true profit figure.
          </NoteBox>

          {/* ── SECTION 13 ── */}
          <SectionHeading id="turnover-method" number="Section 13" title="Reconstructing Missing Figures" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            When partial records exist, you reconstruct missing figures using T-accounts and the information available. The most important reconstructions are:
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-4">Finding Total Credit Sales (from SLCA)</h3>
          <p className="text-sm text-foreground/75 mb-3">
            If you know opening debtors, cash received from debtors, discounts allowed, and closing debtors — you can find the missing credit sales figure:
          </p>
          <div className="my-4 rounded-lg border border-border bg-muted/20 p-4 font-mono text-sm">
            <p>Credit Sales = Closing Debtors + Cash Received + Discounts Allowed + Bad Debts Written Off + Returns Inwards − Opening Debtors</p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Finding Total Credit Purchases (from PLCA)</h3>
          <p className="text-sm text-foreground/75 mb-3">
            If you know opening creditors, cash paid to creditors, discounts received, and closing creditors — you can find the missing credit purchases figure:
          </p>
          <div className="my-4 rounded-lg border border-border bg-muted/20 p-4 font-mono text-sm">
            <p>Credit Purchases = Closing Creditors + Cash Paid + Discounts Received + Returns Outwards − Opening Creditors</p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Finding Sales Using Gross Profit Percentage</h3>
          <p className="text-sm text-foreground/75 mb-3">
            If a business maintains a consistent gross profit margin (e.g., 40% on selling price), you can use the cost of goods sold to work back to sales:
          </p>

          <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary/10">
                  <th className="p-3 border border-border font-semibold text-left">Given</th>
                  <th className="p-3 border border-border font-semibold text-left">Formula</th>
                  <th className="p-3 border border-border font-semibold text-left">Example (40% GP on sales)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border">GP% on Sales</td>
                  <td className="p-3 border border-border font-mono">Sales = Cost of Sales × 100/(100−GP%)</td>
                  <td className="p-3 border border-border">COGS = KES 600,000 → Sales = 600,000 × 100/60 = KES 1,000,000</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="p-3 border border-border">Mark-up % on Cost</td>
                  <td className="p-3 border border-border font-mono">Sales = Cost of Sales × (100+Mark-up%)/100</td>
                  <td className="p-3 border border-border">COGS = KES 600,000, mark-up 25% → Sales = 600,000 × 125/100 = KES 750,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <WarningBox>
            <strong>Mark-up vs Margin — A Common Exam Trap:</strong><br /><br />
            <strong>Gross profit margin</strong> = Gross Profit / Sales × 100 (profit as % of selling price)<br />
            <strong>Mark-up</strong> = Gross Profit / Cost × 100 (profit as % of cost)<br /><br />
            If GP is 40% on <em>selling price</em>: a KES 100 item costs KES 60, sells for KES 100<br />
            If GP is 40% <em>mark-up on cost</em>: a KES 100 item costs KES 100, sells for KES 140<br /><br />
            Read the question carefully — "40% on selling price" and "40% mark-up" are completely different calculations.
          </WarningBox>

          {/* ── SECTION 14 ── */}
          <SectionHeading id="worked-mwangi" number="Section 14" title="Worked Example — G. Mwangi (Incomplete Records)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            G. Mwangi had the following assets and liabilities. He kept a cashbook and invoices but no double-entry records. Required: Income Statement and Balance Sheet for year ended 31 March 2012.
          </p>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Given Data Summary</h3>
          <LedgerTable
            headers={["", "01.04.2011 (Opening) Sh.", "31.03.2012 (Closing) Sh."]}
            rows={[
              ["Premises", "3,150,000", "3,150,000"],
              ["Furniture", "540,000", "540,000"],
              ["Motor Car", "162,000", "— (sold during year)"],
              ["Stock in Trade", "565,200", "668,700"],
              ["Trade Debtors", "355,500", "366,300"],
              ["Trade Creditors", "716,400", "837,000"],
              ["Loan from Industrial Bank", "1,080,000", "— (repaid)"],
              ["Wages & Salaries Due", "82,800", "67,500"],
              ["Prepaid Rates", "22,500", "32,400"],
              ["Rent Received in Advance", "36,000", "61,200"],
              ["Opening Capital", "3,274,200", "?"],
            ]}
          />

          <h3 className="text-base font-semibold text-foreground mb-2 mt-6">Cash Summary</h3>
          <LedgerTable
            headers={["Receipts (Dr)", "Sh.", "Payments (Cr)", "Sh."]}
            rows={[
              ["Balance b/f", "394,200", "Trade Creditors", "4,523,400"],
              ["Trade Debtors", "5,517,900", "Cash Purchases", "732,600"],
              ["Cash Sales", "1,922,400", "Wages & Salaries", "748,800"],
              ["Rent Received", "558,000", "Rates & Insurance", "147,600"],
              ["Capital introduced (G. Mwangi)", "450,000", "Transport", "253,800"],
              ["", "", "Bank Charges", "13,500"],
              ["", "", "General Expenses", "654,300"],
              ["", "", "Loan Interest", "54,000"],
              ["", "", "Loan Repayment", "900,000"],
              ["", "", "New Motor Car", "270,000"],
              ["", "", "Drawings", "324,000"],
              ["__Total", "__8,842,500", "Balance c/f", "220,500"],
              ["", "", "__Total", "__8,842,500"],
            ]}
          />

          <h3 className="text-base font-semibold text-foreground mb-2 mt-6">Step 1 — Find Total Credit Sales (SLCA Working)</h3>

          <LedgerTable
            title="Sales Ledger Control Account (Working)"
            headers={["Dr", "Sh.", "Cr", "Sh."]}
            rows={[
              ["Balance b/d (opening debtors)", "355,500", "Cash received from debtors", "5,517,900"],
              ["Credit Sales (balancing figure)", "5,638,500", "Discounts Allowed", "110,700"],
              ["", "", "Balance c/d (closing debtors)", "366,300"],
              ["__Total", "__5,994,000", "__Total", "__5,994,000"],
            ]}
          />

          <p className="text-xs text-muted-foreground italic mb-4">Credit Sales = 5,517,900 + 110,700 + 366,300 − 355,500 = <strong>Sh. 5,638,500</strong></p>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Step 2 — Find Total Credit Purchases (PLCA Working)</h3>

          <LedgerTable
            title="Purchases Ledger Control Account (Working)"
            headers={["Dr", "Sh.", "Cr", "Sh."]}
            rows={[
              ["Cash paid to creditors", "4,523,400", "Balance b/d (opening creditors)", "716,400"],
              ["Discounts Received", "122,400", "Credit Purchases (balancing figure)", "4,766,400"],
              ["Balance c/d (closing creditors)", "837,000", "", ""],
              ["__Total", "__5,482,800", "__Total", "__5,482,800"],
            ]}
          />

          <p className="text-xs text-muted-foreground italic mb-4">Credit Purchases = 4,523,400 + 122,400 + 837,000 − 716,400 = <strong>Sh. 4,766,400</strong></p>
          <p className="text-xs text-muted-foreground italic mb-4">Total Purchases = Credit Purchases + Cash Purchases = 4,766,400 + 732,600 = <strong>Sh. 5,499,000</strong></p>
          <p className="text-xs text-muted-foreground italic mb-4">Total Sales = Credit Sales + Cash Sales = 5,638,500 + 1,922,400 = <strong>Sh. 7,560,900</strong></p>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Step 3 — Depreciation Workings</h3>
          <p className="text-sm text-foreground/75 mb-3">
            <strong>Old Motor Car:</strong> Fully disposed of during the year (no depreciation on old car as it was disposed of; depends on policy — assume no depreciation on disposal year).<br />
            <strong>New Motor Car (Sh. 270,000):</strong> Purchased 1 January 2012 (3 months before year end, 31 March 2012).<br />
            Annual depreciation at 20% on book value = 270,000 × 20% = 54,000 per year.<br />
            For 3 months = 54,000 × 3/12 = <strong>Sh. 13,500</strong>
          </p>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Step 4 — Wages Expense</h3>
          <div className="my-3 rounded-lg border border-border bg-muted/20 p-3 font-mono text-xs">
            <p>Wages Paid (cash book): 748,800</p>
            <p>Add: Closing accrual (due but not yet paid): 67,500</p>
            <p>Less: Opening accrual (paid this year but belongs to last year): (82,800)</p>
            <p className="font-bold border-t border-border mt-1 pt-1">Wages Expense = 748,800 + 67,500 − 82,800 = Sh. 733,500</p>
          </div>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Step 5 — Rates Expense</h3>
          <div className="my-3 rounded-lg border border-border bg-muted/20 p-3 font-mono text-xs">
            <p>Rates Paid (cash book): included in 147,600 (rates & insurance)</p>
            <p>Add: Opening prepaid (belongs to this year): 22,500</p>
            <p>Less: Closing prepaid (paid for next year): (32,400)</p>
            <p className="text-xs text-muted-foreground italic mt-1">Rates expense = Paid + Opening Prepaid − Closing Prepaid</p>
          </div>

          <h3 className="text-base font-semibold text-foreground mb-2 mt-4">Step 6 — Rent Received Income</h3>
          <div className="my-3 rounded-lg border border-border bg-muted/20 p-3 font-mono text-xs">
            <p>Rent received (cash): 558,000</p>
            <p>Add: Closing advance (received but earned next year — belongs to next period): 61,200</p>
            <p>Less: Opening advance (received last year but earned this year): (36,000)</p>
            <p className="font-bold border-t border-border mt-1 pt-1">Rent Income = 558,000 + 61,200 − 36,000 = Sh. 583,200</p>
          </div>

          <h3 className="text-base font-semibold text-foreground mb-3 mt-6">Income Statement for Year Ended 31 March 2012</h3>

          <LedgerTable
            title="Income Statement — G. Mwangi"
            headers={["", "Sh.", "Sh."]}
            rows={[
              ["Sales (7,560,900)", "", "7,560,900"],
              ["Less: Cost of Sales", "", ""],
              ["Opening Stock", "565,200", ""],
              ["Purchases (5,499,000)", "5,499,000", ""],
              ["Less: Drawings in Goods", "(45,000)", ""],
              ["", "6,019,200", ""],
              ["Less: Closing Stock", "(668,700)", ""],
              ["Cost of Sales", "", "5,350,500"],
              ["__GROSS PROFIT", "", "__2,210,400"],
              ["Add: Rent Income", "", "583,200"],
              ["Discount Received", "", "122,400"],
              ["", "", "2,916,000"],
              ["Less Expenses:", "", ""],
              ["Wages & Salaries", "733,500", ""],
              ["Rates & Insurance", "137,700", ""],
              ["Transport", "253,800", ""],
              ["Bank Charges", "13,500", ""],
              ["General Expenses", "654,300", ""],
              ["Loan Interest", "54,000", ""],
              ["Discount Allowed", "110,700", ""],
              ["Depreciation — Motor Car", "13,500", ""],
              ["Total Expenses", "", "(1,971,000)"],
              ["__NET PROFIT", "", "__945,000"],
            ]}
          />

          <NoteBox>
            In an exam, always show all your <strong>workings clearly</strong> and label each working note (e.g., "W1 — SLCA", "W2 — PLCA"). Even if your final answer is wrong, you earn marks for correct workings. Never just write a number in the accounts without showing where it came from.
          </NoteBox>

          {/* ── SECTION 15 ── */}
          <SectionHeading id="exam-questions" number="Section 15" title="Exam Practice Questions" />

          <p className="text-base text-foreground/80 leading-relaxed mb-6">
            The following questions are from past papers and your notes. Attempt each fully before checking the approach. Each requires a combination of control accounts, statement of affairs, and/or reconstructing accounts from incomplete records.
          </p>

          {[
            {
              qnum: "Question 1 — Joyce Njeri",
              context: "Joyce Njeri runs a Nairobi City Market curio stall. Most sales are cash; some credit. No double-entry records. The year end is 31 March 2000 (52-week year).",
              keydata: [
                "Opening net assets (Statement of Affairs): Sh. 3,795,000",
                "Bought new motor van Jan 2000 — Sh. 3,200,000; part-exchange allowance on old van Sh. 1,800,000; depreciate new van 20% on cost (full year)",
                "Personal drawings: Sh. 50,000/week (52 weeks) = Sh. 2,600,000",
                "Petrol paid cash: Sh. 10,000/week = Sh. 520,000",
                "Other cash expenses: Sundry Sh. 24,000 + Stall repairs Sh. 201,000",
                "Gross profit = 40% on selling price (i.e., cost = 60% of sales)",
                "Goods given free: wedding gift Sh. 100,000 (at selling price) + fundraiser Sh. 200,000 (at SP) — both at selling price so cost = 60% of each",
                "Cash banked (cash sales): Sh. 7,521,000; Cheques banked (credit sales): Sh. 1,500,000; Dividend income: Sh. 210,000",
                "Bank payments: van Sh. 3,200,000; road licence Sh. 80,000; insurance Sh. 323,000; creditors Sh. 7,777,000; rent Sh. 970,000; sundry Sh. 31,000; accountancy Sh. 75,000; bank interest Sh. 20,000; bad cheque (bad debt) Sh. 29,000",
                "Closing: debtors Sh. 320,000; creditors Sh. 233,000; cash in hand Sh. 39,000",
                "Accrued bank interest Sh. 27,000 (debited 1 April — accrue it)",
              ],
              required: "Trading & Profit/Loss Account for year to 31 March 2000 + Balance Sheet",
              hints: [
                "Step 1: Reconstruct total sales using the debtors control account (opening Sh. 170,000 + credit sales invoiced − cash received from debtors − bad debt − closing Sh. 320,000)",
                "Step 2: Use GP% on sales (40%) to find cost of sales: Cost = Sales × 60%",
                "Step 3: Reconstruct purchases using creditors control account",
                "Step 4: Work out closing stock: Opening Stock + Purchases − Goods given away (at cost) − Cost of Sales = Closing Stock",
                "Step 5: Depreciate new van (20% × Sh. 3,200,000 = Sh. 640,000)",
                "Step 6: Accrue bank interest Sh. 27,000",
              ],
            },
            {
              qnum: "Question 2 — Nzioka the Grocer",
              context: "Nzioka runs a grocery business. Year ended 31 October 2000. Bank summary and additional information provided. Part (a) requires Statement of Capital at 1 November 1999; Part (b) requires full P&L and Balance Sheet.",
              keydata: [
                "Opening balances (1 Nov 1999): Stocks 900,000 | Debtors 560,000 | Rates prepaid 8,000 | Fixtures 560,000 | Creditors 360,000 | Lighting accrual 16,000 | Bank 178,400 (credit, so overdraft?)",
                "Bank credits: Sh. 7,034,000 (includes cash sales banked, cheque receipts, dishonoured cheques re-presented)",
                "Cheques outstanding 1 Nov 1999: Sh. 56,000; 31 Oct 2000: Sh. 64,000",
                "Cash paid from takings: Wages Sh. 590,000; Sundry Sh. 28,000; Pocket money Sh. 600/week × 52 = Sh. 31,200; Till float maintained Sh. 4,000",
                "Discounts allowed: Sh. 104,000; Discounts received: Sh. 96,000",
                "Closing (31 Oct 2000): Stocks 1,600,000 | Debtors 640,000 (incl. bad debt Sh. 40,000) | Rates prepaid 10,000 | Fixtures 510,000 | Creditors 440,000 | Lighting accrual 14,000",
                "Loan: Sh. 800,000 at 3% p.a., interest paid half-yearly (31 Jan and 31 July)",
              ],
              required: "(a) Statement of Capital at 1 November 1999. (b) P&L for year ended 31 October 2000 + Balance Sheet.",
              hints: [
                "Part (a): Statement of Affairs = Assets − Liabilities = Capital. Assets: Stocks + Debtors + Rates prepaid + Fixtures + Cash. Liabilities: Creditors + Lighting accrual + Bank overdraft. Capital is the plug.",
                "Part (b): First reconstruct total cash takings. Bank credits adjusted for outstanding cheques and cash paid out of till = total cash sales + credit receipts. Then use SLCA to find credit sales.",
                "Unpresented cheques: add opening outstanding (Sh. 56,000) to payments — those cheques cleared. Deduct closing outstanding (Sh. 64,000) — those haven't cleared yet.",
                "Fixtures depreciation = opening (560,000) − closing (510,000) = Sh. 50,000 depreciation charged.",
              ],
            },
            {
              qnum: "Question 3 — Kimeu (New Business from 1 April 2000)",
              context: "Kimeu started a furniture-making business on 1 April 2000. He deposited Sh. 1,200,000 plus contributed a pickup. Limited records kept. Year ended 31 March 2001.",
              keydata: [
                "Opening: Bank Sh. 1,200,000 + Pickup Sh. 660,000 (3-year life from 1 April 2000)",
                "Loan from sister: Sh. 400,000 at 15% p.a. from 1 July 2000 (no interest paid yet — accrue 9 months)",
                "Salary for Sally (clerk): Sh. 720,000 p.a. (paid by cheque)",
                "Drawings: Sh. 18,000/week × 52 weeks = Sh. 936,000",
                "Timber purchased: Sh. 1,960,000; Closing timber stock Sh. 158,000",
                "Equipment: Sh. 960,000 (5-year life from 1 April 2000)",
                "Electricity: Sh. 240,000 paid + estimated Sh. 48,000 accrual for last 2 months",
                "Motor vehicle expenses: Sh. 182,000; General expenses: Sh. 270,000",
                "Insurance Sh. 160,000 (year to 30 June 2001 — prepaid 3 months = 160,000 × 3/12 = Sh. 40,000)",
                "Rates Sh. 36,000 (not paid — accrued in full)",
                "Sales invoiced: Sh. 6,178,000; Collected: Sh. 5,080,000; Closing debtors = Sh. 6,178,000 − 5,080,000 − 17,000 (bad debts) = Sh. 1,081,000",
                "Small cash sales (not invoiced): Sh. 726,000 received; Sh. 560,000 banked; Sh. 75,000 drawings; Sh. 24,000 lottery; Sh. 30,100 cash in drawer; remainder = general expenses by Sally",
                "Accountancy fee: Sh. 55,000 (not yet paid — accrue)",
              ],
              required: "(a) P&L for year ended 31 March 2001. (b) Balance Sheet as at 31 March 2001.",
              hints: [
                "Total Sales = Invoiced sales + Cash sales = 6,178,000 + 726,000 = 6,904,000",
                "Depreciation — Pickup: 660,000/3 = Sh. 220,000. Equipment: 960,000/5 = Sh. 192,000",
                "Loan interest accrued: 400,000 × 15% × 9/12 = Sh. 45,000",
                "Insurance prepaid: 160,000 × 3/12 = Sh. 40,000; Expense = Sh. 120,000",
                "Cash account — Sally's general expenses: 726,000 − 560,000 − 75,000 − 24,000 − 30,100 = Sh. 36,900",
                "Lottery tickets are drawings (personal expense) — not a business expense",
              ],
            },
            {
              qnum: "Question 4 — Muthusi (Retail Business)",
              context: "Muthusi runs a retail business. Year ended 31 October 2003. Partial double-entry records — some figures must be reconstructed. GP rate = 25% on selling price.",
              keydata: [
                "Opening (31 Oct 2002): Freehold property 600,000 | Motor vehicles NBV 750,000 | Furniture NBV 240,000 | Stock 390,000 | Trade debtors 500,000 | Bank overdraft 60,000 | Trade creditors 380,000 | Accruals (lighting) 15,000 | 10% Loan 600,000 | Provision for doubtful debts 25,000",
                "Credit sales: Sh. 2,080,000; Credit purchases: Sh. 1,900,000",
                "Bank transactions: Cash sales Sh. 720,000; Cash purchases Sh. 240,000; Payments to creditors Sh. 1,940,000; Furniture purchase Sh. 200,000; Salaries Sh. 160,000; Lighting Sh. 65,000; General exp Sh. 35,000; Loan interest Sh. 30,000; Drawings Sh. 60,000; Loan repayment Sh. 100,000 (30 April 2003); Collections from debtors Sh. 1,890,000; Motor vehicle sale proceeds Sh. 120,000",
                "Motor vehicles: 20% reducing balance, full year on acquisitions, none on disposals. Vehicle sold: cost Sh. 250,000, accumulated depreciation Sh. 122,000",
                "Furniture: 10% on cost, pro-rata. New furniture Sh. 200,000 bought 1 May 2003 (cost of existing furniture = Sh. 400,000)",
                "Loan interest: paid for half year to 30 April 2003 only. Remaining 6 months unpaid = Sh. 25,000 (or calculate: 500,000 × 10% × 6/12)",
                "Discounts received Sh. 40,000; Discounts allowed Sh. 70,000; Bad debts written off Sh. 20,000",
                "Provision for doubtful debts: 5% of closing debtors",
                "Closing lighting accrual: Sh. 19,000",
              ],
              required: "(a) Trading & P&L for year ended 31 October 2003. (b) Balance Sheet as at 31 October 2003.",
              hints: [
                "Use SLCA to find closing debtors: Opening 500,000 + Credit sales 2,080,000 − Cash from debtors 1,890,000 − Discounts allowed 70,000 − Bad debts 20,000 = Sh. 600,000",
                "Use PLCA to find closing creditors: Opening 380,000 + Credit purchases 1,900,000 − Paid 1,940,000 − Discounts received 40,000 = Sh. 300,000",
                "Motor vehicle NBV before disposal: 750,000. Sold vehicle book value: 250,000 − 122,000 = 128,000. Loss on disposal = 128,000 − 120,000 = Sh. 8,000. Remaining MV for depreciation: 750,000 − 128,000 = 622,000 × 20% = Sh. 124,400",
                "Furniture depreciation: Existing 400,000 × 10% = 40,000 (full year). New 200,000 × 10% × 6/12 = 10,000 (6 months, May to Oct). Total = Sh. 50,000",
                "Loan interest accrual: Loan after repayment = 600,000 − 100,000 = 500,000. Paid for 6 months (Nov 2002 – Apr 2003) = Sh. 30,000. Accrued for 6 months (May – Oct 2003) = 500,000 × 10% × 6/12 = Sh. 25,000",
                "Bad debt provision: 5% × Sh. 600,000 = Sh. 30,000. Increase in provision = 30,000 − 25,000 = Sh. 5,000 (charge to P&L)",
              ],
            },
          ].map((q) => (
            <Card key={q.qnum} className="border-border mb-5">
              <CardContent className="p-5">
                <p className="font-bold text-foreground text-base mb-2">{q.qnum}</p>
                <p className="text-sm text-muted-foreground mb-4 italic">{q.context}</p>

                <p className="text-xs font-bold text-primary uppercase tracking-wide mb-2">Key Data</p>
                <ul className="space-y-1 mb-4">
                  {q.keydata.map((d, i) => (
                    <li key={i} className="flex gap-2 text-sm text-foreground/75">
                      <span className="text-primary shrink-0">•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <div className="rounded bg-muted/30 border border-border p-3 mb-4">
                  <p className="text-xs font-bold text-foreground mb-1">Required</p>
                  <p className="text-sm text-foreground/80">{q.required}</p>
                </div>

                <details className="mt-2">
                  <summary className="cursor-pointer text-sm font-semibold text-primary hover:text-primary/80">Show Approach Hints ▶</summary>
                  <ul className="mt-3 space-y-2">
                    {q.hints.map((h, i) => (
                      <li key={i} className="flex gap-2 text-sm text-foreground/75">
                        <span className="font-bold text-primary shrink-0">{i + 1}.</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              </CardContent>
            </Card>
          ))}

          <NoteBox>
            <strong>General Exam Strategy for Incomplete Records Questions:</strong><br /><br />
            1. Start with the <strong>Statement of Affairs</strong> if opening capital is unknown<br />
            2. Reconstruct the <strong>SLCA</strong> to find total credit sales<br />
            3. Reconstruct the <strong>PLCA</strong> to find total credit purchases<br />
            4. Prepare a <strong>Cash / Bank Account</strong> to verify the cash flow and find any missing cash figures<br />
            5. Calculate <strong>depreciation</strong> for each asset class<br />
            6. Adjust expenses for <strong>accruals and prepayments</strong> (don't use cash paid — use expense incurred)<br />
            7. <strong>Only then</strong> draft the Income Statement and Balance Sheet<br /><br />
            Never attempt to build the final accounts first. The workings ARE the marks.
          </NoteBox>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <Link href="/accounting/2" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors">
                ← Topic 2: Company Final Accounts
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Back to Home →
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky sidebar TOC */}
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-20">
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">On this page</p>
            <div className="flex flex-col gap-0.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`text-xs px-3 py-1.5 rounded transition-colors ${activeSection === s.id ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:text-foreground"}`}
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
