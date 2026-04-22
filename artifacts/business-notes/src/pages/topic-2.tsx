import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Info, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";

const sections = [
  { id: "overview", label: "1. Overview" },
  { id: "sole-proprietorship", label: "2. Sole Proprietorship" },
  { id: "partnership", label: "3. Partnership" },
  { id: "ordinary-partnership", label: "4. Ordinary Partnership" },
  { id: "limited-partnership", label: "5. Limited Partnership" },
  { id: "companies", label: "6. Companies" },
  { id: "private-ltd", label: "7. Private Limited Companies" },
  { id: "public-ltd", label: "8. Public Limited Companies" },
  { id: "cooperatives", label: "9. Co-operatives" },
  { id: "coop-types", label: "10. Types of Co-operatives" },
  { id: "govt-departments", label: "11. Government Departments" },
  { id: "state-corporations", label: "12. State Corporations" },
  { id: "ppps", label: "13. Public-Private Partnerships" },
  { id: "ngos", label: "14. NGOs" },
  { id: "multinationals", label: "15. Multinational Corporations" },
  { id: "comparison", label: "16. Comparison Table" },
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

function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
      <Card className="border-green-300/50 dark:border-green-800/50">
        <CardContent className="p-4">
          <p className="font-bold text-green-700 dark:text-green-400 mb-3 text-sm">Advantages</p>
          <ul className="space-y-2">
            {pros.map((p, i) => (
              <li key={i} className="flex gap-2 text-sm text-foreground/80">
                <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card className="border-red-300/50 dark:border-red-800/50">
        <CardContent className="p-4">
          <p className="font-bold text-red-600 dark:text-red-400 mb-3 text-sm">Disadvantages</p>
          <ul className="space-y-2">
            {cons.map((c, i) => (
              <li key={i} className="flex gap-2 text-sm text-foreground/80">
                <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Topic2() {
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
        { label: "Unit 1 — Business Management", href: "/" },
        { label: "Forms of Business Organizations" },
      ]}
    >
      <Helmet>
        <title>Forms of Business Organizations | Unit 1 Business Management | Study Notes</title>
        <meta name="description" content="Comprehensive study notes on forms of business organizations — sole proprietorship, partnerships, companies, co-operatives, state corporations, NGOs, and multinationals." />
      </Helmet>

      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>
          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Unit 1 — Business Management</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
              Forms of Business Organizations
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every business that exists — from a roadside kiosk to a multinational corporation — operates within a legal and organizational framework. This topic explores all major forms of business organizations: how they are formed, who owns and controls them, what their legal status is, and the real-world implications of each form. Understanding this is fundamental to business management.
            </p>
          </div>

          {/* SECTION 1 */}
          <SectionHeading id="overview" number="Section 1" title="Overview and Classification" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Business organizations can be broadly classified into three major groups based on who owns, controls, and funds them:
          </p>

          <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary/10">
                  <th className="p-3 border border-border font-semibold text-left">Sector</th>
                  <th className="p-3 border border-border font-semibold text-left">Ownership</th>
                  <th className="p-3 border border-border font-semibold text-left">Primary Goal</th>
                  <th className="p-3 border border-border font-semibold text-left">Examples</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-medium">Private Sector</td>
                  <td className="p-3 border border-border">Individuals or private groups</td>
                  <td className="p-3 border border-border">Profit maximization</td>
                  <td className="p-3 border border-border">Sole traders, partnerships, companies, co-operatives</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="p-3 border border-border font-medium">Public Sector</td>
                  <td className="p-3 border border-border">Government (on behalf of citizens)</td>
                  <td className="p-3 border border-border">Public service delivery &amp; development</td>
                  <td className="p-3 border border-border">Govt departments, state corporations, PPPs</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-medium">Other Institutions</td>
                  <td className="p-3 border border-border">Members / international bodies</td>
                  <td className="p-3 border border-border">Social mission / global operations</td>
                  <td className="p-3 border border-border">NGOs, multinational corporations</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ExplainerBox>
            A simple way to remember the difference: ask yourself <em>"Who owns it, and why does it exist?"</em> A private business is owned by individuals and exists to make a profit. A public enterprise is owned by the government and exists to serve the public. An NGO is typically funded by donors and exists to address a social problem. A multinational operates across many countries to earn global profits.
          </ExplainerBox>

          {/* SECTION 2 */}
          <SectionHeading id="sole-proprietorship" number="Section 2" title="Sole Proprietorship" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A <strong>sole proprietorship</strong> (also called a sole trader) is the simplest and most common form of business ownership — a business owned, managed, and controlled by a single individual. It is so common that most people encounter sole proprietorships every day without thinking about it.
          </p>

          <ExplainerBox>
            Think of the mama mboga (vegetable seller) outside your gate, the local barbershop owner, a freelance graphic designer, or a plumber who runs their own one-person business. All of these are sole proprietors. They started their business themselves, they make all the decisions, they keep all the profits, and they bear all the risks personally.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Characteristics of a Sole Proprietorship</h3>
          <ul className="space-y-3 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="font-bold text-primary shrink-0">1.</span><span><strong>Single ownership:</strong> One person owns the entire business — there are no co-owners or shareholders. The business is an extension of the owner.</span></li>
            <li className="flex gap-2"><span className="font-bold text-primary shrink-0">2.</span><span><strong>Owner provides capital:</strong> The startup and operating funds come from the owner's personal savings or personal loans. There is no external investor.</span></li>
            <li className="flex gap-2"><span className="font-bold text-primary shrink-0">3.</span><span><strong>Full control of decision-making:</strong> The owner decides everything — what to sell, what to charge, who to hire, when to open or close. No board meetings or partner approvals needed.</span></li>
            <li className="flex gap-2"><span className="font-bold text-primary shrink-0">4.</span><span><strong>Unlimited liability:</strong> This is the most critical and dangerous characteristic. The law does NOT treat the business as a separate person from the owner — they are legally one and the same. If the business incurs debts it cannot pay, creditors can seize the owner's personal assets: their car, home, land, savings account — everything.</span></li>
          </ul>

          <WarningBox>
            <strong>Understanding Unlimited Liability — A Real Scenario:</strong><br /><br />
            James runs a hardware shop as a sole proprietor. He borrows KES 500,000 from a supplier to stock goods. The business fails and he cannot repay. The supplier goes to court. Because James has unlimited liability, the court can order the auction of James's personal car (worth KES 400,000) and his household furniture (worth KES 100,000) to recover the debt. His business life and personal life are financially inseparable. This is the single biggest risk of sole proprietorship.
          </WarningBox>

          <ProsCons
            pros={[
              "Easy and cheap to start — no legal registration formalities in many cases",
              "Quick decision-making — no need to consult partners or a board",
              "Owner keeps ALL profits — no sharing with partners or shareholders",
              "Privacy — no requirement to publish financial accounts",
              "Flexible — can easily change business direction or close",
              "Strong personal motivation — the owner works for themselves",
            ]}
            cons={[
              "Unlimited liability — personal assets are at risk if the business fails",
              "Limited capital — constrained to the owner's personal savings and borrowing capacity",
              "Limited managerial skills — one person cannot be expert in all areas (accounting, marketing, operations)",
              "No continuity — the business often dies when the owner dies or becomes incapacitated",
              "High personal workload — the owner must manage everything alone",
              "Difficulty expanding — hard to grow beyond a certain size without more capital",
            ]}
          />

          <ExampleBox>
            <strong>Kenya Example:</strong> Wanjiru runs a salon in Kiambu. She started it with KES 80,000 from her savings, buys her own products, handles all appointments herself, and at the end of each month keeps whatever profit remains after expenses. She is a classic sole proprietor — single ownership, full control, all profits, but also all risks.
          </ExampleBox>

          {/* SECTION 3 */}
          <SectionHeading id="partnership" number="Section 3" title="Partnership — Introduction" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A <strong>partnership</strong> is a business owned and operated by two or more people who agree to share the responsibilities, capital, profits, and losses of the business. In Kenya, partnerships are governed by the <strong>Partnership Act (Cap 29)</strong>.
          </p>

          <ExplainerBox>
            Why form a partnership instead of going alone? Imagine you are a skilled architect but have no money, and your friend has money but no technical skills. A partnership lets you combine your skills with their capital. Neither of you alone could run the architectural firm as effectively — together, you cover each other's gaps. This pooling of resources and skills is the core logic behind a partnership.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Features of All Partnerships</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Minimum 2 partners; maximum 20</strong> (except for professional partnerships such as law firms and accountancy firms, which may have more)</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>A partnership agreement</strong> (deed of partnership) typically governs how profits are shared, roles, and what happens if a partner leaves</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Mutual agency:</strong> any partner can legally bind the entire partnership — their actions in the business are treated as the actions of all partners</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Not a separate legal entity</strong> — unlike a company, a partnership is not a distinct legal person. The partners ARE the business.</span></li>
          </ul>

          <NoteBox>
            The principle of <strong>mutual agency</strong> is one of the most important — and most dangerous — aspects of partnership. If one partner signs a contract on behalf of the firm (even without the others' knowledge), all partners are legally bound by it. This is why choosing business partners carefully is so critical.
          </NoteBox>

          {/* SECTION 4 */}
          <SectionHeading id="ordinary-partnership" number="Section 4" title="Ordinary (General) Partnership" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            An <strong>ordinary partnership</strong>, also called a <strong>general partnership</strong>, is the most common type. All partners actively participate in the management and operation of the business, and all share the same level of liability.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Characteristics</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>All partners contribute capital to the business</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>All partners participate in the day-to-day management</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>Profits and losses are shared among all partners (according to the partnership agreement, or equally if no agreement exists)</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Unlimited liability for all partners</strong> — every partner's personal assets are at risk for the total debts of the business</span></li>
          </ul>

          <WarningBox>
            <strong>Joint and Several Liability — A Critical Implication:</strong><br /><br />
            In a general partnership, liability is <em>joint and several</em>. This means a creditor can pursue ANY one partner for the FULL amount owed, regardless of that partner's share in the business. If the partnership owes KES 2 million and one partner has no assets but another has a house worth KES 2 million, the creditor can sue that one wealthy partner for the entire debt — even if that partner only owned 20% of the business. The wealthy partner would then have to seek recovery from the others — which may be impossible if they are insolvent.
          </WarningBox>

          <ProsCons
            pros={[
              "Easy to form — a simple partnership agreement is enough (can even be verbal, though written is better)",
              "Shared responsibility and workload — tasks can be divided based on each partner's strengths",
              "Pooling of skills and resources — more capital and diverse expertise than a sole trader",
              "More management talent than a sole proprietorship",
              "Flexible management structure — partners can agree on any arrangement that works for them",
            ]}
            cons={[
              "Unlimited liability — all partners face personal financial ruin if the business fails",
              "Potential for serious conflicts between partners over decisions, profit sharing, or work contributions",
              "Decisions may be slow due to need for consultation among partners",
              "Lack of continuity — death, bankruptcy, or resignation of any partner can dissolve the partnership",
              "Mutual agency risk — one partner's bad decision binds all others legally",
            ]}
          />

          <ExampleBox>
            <strong>Kenya Example:</strong> Three lawyers — Kamau, Otieno, and Wambua — form a general partnership called Kamau Otieno &amp; Wambua Advocates. Each contributes KES 500,000. They share profits equally and all participate in client work. One day, Otieno signs a property lease on behalf of the firm for KES 3 million without consulting the others. All three are legally bound by that lease — that is mutual agency and unlimited liability in action.
          </ExampleBox>

          {/* SECTION 5 */}
          <SectionHeading id="limited-partnership" number="Section 5" title="Limited Partnership" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A <strong>limited partnership</strong> is a more sophisticated structure that includes two classes of partners with very different roles and levels of liability. It was designed specifically to allow investors to put money into a business without taking on the unlimited liability risk of being an active manager.
          </p>

          <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary/10">
                  <th className="p-3 border border-border font-semibold text-left">Feature</th>
                  <th className="p-3 border border-border font-semibold text-left">General Partner</th>
                  <th className="p-3 border border-border font-semibold text-left">Limited Partner</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-medium">Role</td>
                  <td className="p-3 border border-border">Manages the business day-to-day</td>
                  <td className="p-3 border border-border">Investor only — does not manage</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="p-3 border border-border font-medium">Liability</td>
                  <td className="p-3 border border-border">Unlimited — personal assets at risk</td>
                  <td className="p-3 border border-border">Limited to capital contributed only</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-medium">Decision-making</td>
                  <td className="p-3 border border-border">Full control over operations</td>
                  <td className="p-3 border border-border">No say in daily operations</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="p-3 border border-border font-medium">Profit sharing</td>
                  <td className="p-3 border border-border">Share of profits as agreed</td>
                  <td className="p-3 border border-border">Return on investment as agreed</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-medium">Required?</td>
                  <td className="p-3 border border-border">At least one required</td>
                  <td className="p-3 border border-border">At least one required</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ExplainerBox>
            The limited partnership solves a real problem: many people are willing to invest money in a business but are not willing to risk losing everything beyond what they invest. A limited partner is like a silent investor — they put in their capital, receive a share of profits, but if the business fails, they only lose what they put in. Their home, car, and savings are safe. This makes it much easier to attract investors.
          </ExplainerBox>

          <ProsCons
            pros={[
              "Ability to attract investors (limited partners) who would not join a general partnership due to unlimited liability",
              "Reduced risk for limited partners — they risk only their capital contribution",
              "More capital available compared to ordinary partnership",
              "General partners retain full management control",
            ]}
            cons={[
              "Limited partners have no say in management — they must trust the general partners completely",
              "Legal formalities are required to register the limited partnership",
              "General partners still face unlimited liability — the risk does not disappear, it stays with them",
              "Can create tension if limited partners disagree with management decisions but have no power to change them",
            ]}
          />

          <ExampleBox>
            <strong>Example:</strong> A real estate development firm is formed as a limited partnership. The general partner — a construction expert — manages all projects. Three investors who each contributed KES 5 million are limited partners. If the firm fails with debts of KES 20 million, the general partner faces unlimited liability and may lose personal property, but each limited partner can lose at most their KES 5 million investment — nothing more.
          </ExampleBox>

          {/* SECTION 6 */}
          <SectionHeading id="companies" number="Section 6" title="Companies — The Legal Person" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A <strong>company</strong> is a fundamentally different kind of business organization from sole proprietorships and partnerships. It is a <strong>legal entity</strong> — created under law (in Kenya, the <strong>Companies Act, 2015</strong>) — that exists as a "person" in its own right, completely separate from its owners (shareholders).
          </p>

          <ExplainerBox>
            <strong>What does "separate legal entity" really mean?</strong><br /><br />
            Imagine a company as an artificial person — one that lives in legal documents rather than in a body. This artificial person can:<br />
            — <strong>Own property</strong> — land, buildings, and equipment belong to the company, not the shareholders<br />
            — <strong>Enter contracts</strong> — sign lease agreements, employment contracts, supplier deals<br />
            — <strong>Sue and be sued</strong> — go to court as a party in its own name<br />
            — <strong>Open bank accounts</strong> — the company account is separate from any individual's account<br />
            — <strong>Continue to exist</strong> — even if every shareholder dies or sells their shares, the company keeps existing<br /><br />
            This concept — established by the landmark UK case <em>Salomon v Salomon &amp; Co Ltd (1897)</em> — is the foundation of company law worldwide.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Characteristics of Companies</h3>

          <div className="space-y-4 mb-6">
            {[
              {
                title: "1. Separate Legal Identity",
                body: "The company is legally distinct from its shareholders. Shareholders own the company, but they are not the company. A shareholder cannot use company property as their own, and company creditors cannot pursue shareholders' personal property (beyond their investment).",
              },
              {
                title: "2. Limited Liability",
                body: "Shareholders are only financially liable up to the amount they paid (or agreed to pay) for their shares. If a shareholder bought shares worth KES 100,000, the maximum they can lose is KES 100,000 — regardless of how large the company's debts grow. This protection is called the 'veil of incorporation' — the company shields its owners from personal loss.",
              },
              {
                title: "3. Perpetual Succession",
                body: "The company has an indefinite life. It continues to exist regardless of changes in ownership. Shareholders can die, sell their shares, or go bankrupt — the company survives. This provides long-term stability and is why companies can plan 50-year infrastructure projects, take on long-term loans, and build lasting brands.",
              },
              {
                title: "4. Ownership Through Shares",
                body: "The company's capital is divided into units called shares. Each shareholder owns a portion of the company proportional to their shareholding. A shareholder owning 30% of shares owns 30% of the company and typically receives 30% of dividends declared.",
              },
            ].map((item) => (
              <Card key={item.title} className="border-border">
                <CardContent className="p-4">
                  <p className="font-semibold text-foreground mb-2">{item.title}</p>
                  <p className="text-sm text-foreground/75 leading-relaxed">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SECTION 7 */}
          <SectionHeading id="private-ltd" number="Section 7" title="Private Limited Companies (Ltd)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A <strong>private limited company</strong> is a company whose shares are NOT offered to the general public. It is typically owned by a small, known group of shareholders — often founders, family members, or a small group of investors.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Features</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>Shares cannot be offered to or traded by the general public — no stock exchange listing</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>Transfer of shares is restricted — a shareholder cannot freely sell shares to a stranger; other shareholders usually have the right of first refusal</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>Minimum 1 shareholder, maximum 50 shareholders (excluding employees)</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>The company name ends with <strong>"Ltd"</strong> or <strong>"Limited"</strong></span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>Less regulatory disclosure required compared to public companies — financial accounts are less publicly accessible</span></li>
          </ul>

          <ExampleBox>
            <strong>Kenya Examples of Private Limited Companies:</strong><br /><br />
            <strong>Bidco Africa Ltd</strong> — one of East Africa's largest manufacturers of cooking oil, soaps, and personal care products. Though enormous in scale, it remains privately held by the Vimal Shah family and is not listed on the Nairobi Securities Exchange.<br /><br />
            <strong>Chandaria Industries Ltd</strong> — another major manufacturing group (tissue paper, packaging) that is family-owned and privately held despite its large size.<br /><br />
            These companies show that a business can be very large and yet remain private — protecting ownership from outside investors while benefiting from the company structure's liability protection.
          </ExampleBox>

          {/* SECTION 8 */}
          <SectionHeading id="public-ltd" number="Section 8" title="Public Limited Companies (Plc)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A <strong>public limited company</strong> is a company that can offer its shares to the general public, typically by listing on a <strong>stock exchange</strong>. Anyone can buy or sell its shares on the open market. This is the form used by the largest corporations in the world.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Features</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>Shares are offered to the public through an <strong>Initial Public Offering (IPO)</strong> and traded on a stock exchange (e.g., Nairobi Securities Exchange)</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>Can have thousands or millions of shareholders</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>Strictly regulated by law and the Capital Markets Authority (CMA) in Kenya</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>Must publish audited annual financial statements — the public has the right to see the company's accounts</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>Managed by a board of directors elected by shareholders</span></li>
          </ul>

          <ExampleBox>
            <strong>Kenya Examples of Public Limited Companies (listed on NSE):</strong><br /><br />
            <strong>Equity Group Holdings Plc</strong> — one of Africa's largest banks by customer numbers. It went public and listed on the NSE, allowing millions of ordinary Kenyans to buy shares and own a piece of the bank.<br /><br />
            <strong>Kenya Commercial Bank (KCB) Group Plc</strong> — Kenya's largest bank by assets, listed on the NSE. Its share price changes daily based on market demand. Any person with a CDS account can buy or sell KCB shares.
          </ExampleBox>

          <ProsCons
            pros={[
              "Can raise very large amounts of capital by selling shares to millions of investors",
              "Limited liability protects all shareholders' personal assets",
              "Perpetual succession — the company outlasts its founders",
              "Professional management by qualified directors and executives",
              "Shares can be transferred freely on the stock exchange",
              "Enhanced credibility — listed companies enjoy trust from banks, suppliers, and the public",
            ]}
            cons={[
              "Complex and expensive formation — legal registration, memorandum and articles of association, regulatory approvals",
              "Strict ongoing regulations — annual audits, regulatory filings, CMA compliance",
              "Separation of ownership and control — shareholders own the company but directors run it, creating potential 'agency problems' where managers act in their own interest, not shareholders'",
              "High operational and compliance costs",
              "Mandatory public disclosure of financial information — competitors and the public can see your accounts",
              "Vulnerable to hostile takeovers — anyone can accumulate shares and take control",
            ]}
          />

          <NoteBox>
            <strong>The Agency Problem:</strong> In large public companies, the people who own the company (shareholders) are not the same people who run it (directors and managers). This separation creates a risk that managers may pursue their own interests — paying themselves high salaries, avoiding difficult decisions to protect their jobs, or focusing on short-term profits to boost bonuses — rather than maximizing long-term value for shareholders. This is called the <strong>principal-agent problem</strong> and is one of the central challenges in corporate governance.
          </NoteBox>

          {/* SECTION 9 */}
          <SectionHeading id="cooperatives" number="Section 9" title="Co-operatives" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A <strong>co-operative</strong> is an autonomous association of persons who voluntarily come together to meet their common economic, social, or cultural needs through a jointly owned and democratically controlled enterprise.
          </p>

          <ExplainerBox>
            Co-operatives operate on a fundamentally different logic from profit-oriented businesses. The purpose is to <strong>serve the members</strong>, not to maximize profit for investors. In a company, a billionaire shareholder has more voting power than a small shareholder. In a co-operative, every member has exactly one vote — regardless of how much capital they contributed. This is called the <strong>"one member, one vote"</strong> principle — pure democracy in business.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Characteristics of Co-operatives</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Voluntary membership:</strong> Anyone with a common interest can join or leave freely</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Democratic control:</strong> One member, one vote — regardless of capital contribution</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Member ownership:</strong> Members collectively own the co-operative</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Service-oriented:</strong> Primary goal is member welfare, not profit maximization</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Surplus sharing:</strong> Any profits (called "surplus") are distributed among members proportionally, or reinvested</span></li>
          </ul>

          <ProsCons
            pros={[
              "Promotes economic empowerment — members collectively have more power than they do individually",
              "Shared benefits — all members benefit from the co-operative's activities",
              "Democratic — all members have an equal voice regardless of wealth",
              "Lower costs — bulk purchasing, shared infrastructure, and collective bargaining reduce individual costs",
              "Strong social bonds and community cohesion among members",
            ]}
            cons={[
              "Limited capital — raising large funds is difficult since shares are not freely tradable and membership is restricted",
              "Poor management in some cases — elected officials may lack professional management skills",
              "Slow decision-making — democratic processes require consultation and consensus",
              "Low motivation — some members may be passive and not contribute equally",
              "Potential conflict of interest between member welfare and financial sustainability",
            ]}
          />

          {/* SECTION 10 */}
          <SectionHeading id="coop-types" number="Section 10" title="Types of Co-operatives in Kenya" />

          <div className="space-y-5 mb-6">
            {[
              {
                letter: "a",
                name: "Savings and Credit Co-operative Societies (SACCOs)",
                purpose: "Provide financial services — savings accounts and affordable loans — to members. SACCOs fill the gap left by commercial banks, which often require collateral and charge high interest. A SACCO gives members access to credit at rates far lower than commercial banks, using members' pooled savings as security.",
                examples: ["Mwalimu National SACCO (for teachers)", "Stima SACCO (for energy sector employees)", "Metropolitan National SACCO", "Kenya Police SACCO"],
                note: "SACCOs are regulated by the SACCO Societies Regulatory Authority (SASRA) in Kenya.",
              },
              {
                letter: "b",
                name: "Housing Co-operative Societies",
                purpose: "Help members pool resources to buy land, develop housing estates, or access affordable home loans. They exist because housing is prohibitively expensive for individuals but affordable when a large group pools resources together.",
                examples: ["Kenya Union of Savings and Credit Co-operatives Housing Fund", "Various estate development co-operatives"],
                note: "Housing co-operatives have been instrumental in developing many residential estates in Kenya's urban centres.",
              },
              {
                letter: "c",
                name: "Consumer Co-operative Societies",
                purpose: "Protect consumers by purchasing goods in bulk directly from manufacturers and selling to members at fair prices, eliminating middlemen who inflate prices. The savings are passed on to members.",
                examples: ["Uchumi Co-operative Supermarket (historical example)", "Staff co-operative shops in large organizations"],
                note: "The core advantage is eliminating intermediaries — every middleman in a supply chain adds a markup. By buying directly, consumer co-operatives reduce that markup.",
              },
              {
                letter: "d",
                name: "Agricultural / Farmers Co-operative Societies",
                purpose: "Bring farmers together to increase their collective bargaining power, share farm inputs (seeds, fertilizer, equipment), improve production through knowledge sharing, and access better markets for their produce.",
                examples: ["Kenya Planters Cooperative Union (KPCU — coffee)", "Kenya Tea Development Agency (KTDA)", "Dairy co-operatives supplying Brookside and KCC"],
                note: "Individual smallholder farmers have little bargaining power against large buyers. But when 10,000 farmers sell together through a co-operative, they can negotiate much better prices — this is collective bargaining.",
              },
              {
                letter: "e",
                name: "Producer Co-operative Societies",
                purpose: "Support small-scale producers (artisans, craftspeople, small manufacturers) by giving them access to raw materials, shared production equipment, and collective marketing — things they could not afford individually.",
                examples: ["Jua Kali artisan co-operatives (metalwork, carpentry, leatherwork in informal sector)", "Women's handicraft co-operatives"],
                note: "The Jua Kali sector — Kenya's informal small-scale manufacturing — employs millions. Producer co-operatives help these small producers improve quality and access formal markets.",
              },
              {
                letter: "f",
                name: "Marketing Co-operative Societies",
                purpose: "Help producers market and sell their products collectively — including processing, packaging, grading, and distribution. They improve market access and ensure fairer prices by eliminating exploitation by middlemen.",
                examples: ["New Kenya Co-operative Creameries (KCC — dairy products)", "Coffee marketing co-operatives"],
                note: "A single farmer selling milk has no negotiating power. A co-operative representing thousands of dairy farmers can negotiate supply contracts with major processors and supermarket chains.",
              },
              {
                letter: "g",
                name: "Investment Co-operative Societies",
                purpose: "Pool members' funds to invest in profitable ventures — real estate, the stock market, government securities, or private businesses — and grow members' collective wealth over time.",
                examples: ["CIC Insurance Group (grew from a co-operative foundation)", "Investment clubs formally registered as co-operatives", "Co-operative real estate ventures"],
                note: "Investment clubs are very popular in Kenya. When formalized as investment co-operatives, they gain legal status and can make larger investments collectively.",
              },
            ].map((coop) => (
              <Card key={coop.letter} className="border-border">
                <CardContent className="p-5">
                  <p className="font-bold text-primary mb-1 text-sm uppercase tracking-wide">Type {coop.letter.toUpperCase()}</p>
                  <p className="font-semibold text-foreground text-base mb-2">{coop.name}</p>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-3">{coop.purpose}</p>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Examples in Kenya:</p>
                  <ul className="text-sm text-foreground/75 space-y-1 mb-3 ml-3">
                    {coop.examples.map((ex) => <li key={ex}>• {ex}</li>)}
                  </ul>
                  <div className="rounded bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 px-3 py-2">
                    <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">{coop.note}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SECTION 11 */}
          <SectionHeading id="govt-departments" number="Section 11" title="Government Departments" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Government departments are the most direct form of public enterprise — they operate as an integral part of government ministries, funded entirely from the national budget and staffed by civil servants. They exist to provide essential public services that the private sector either cannot or will not provide adequately.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Characteristics</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Funded entirely by the government</strong> through the national budget (taxpayer money)</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Managed by civil servants</strong> under a government ministry</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Not profit-oriented</strong> — the goal is service delivery, not financial return</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>Subject to full government accountability — parliamentary scrutiny, auditing by the Auditor General</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>No separate legal identity — part of the government itself</span></li>
          </ul>

          <ExampleBox>
            <strong>Examples in Kenya:</strong><br />
            — <strong>Public health services</strong> — government hospitals (Kenyatta National Hospital under the Ministry of Health), public health clinics<br />
            — <strong>Public education</strong> — primary and secondary schools funded through the Ministry of Education<br />
            — <strong>National Registration Bureau</strong> — issuing ID cards and passports<br />
            — <strong>Kenya Revenue Authority (KRA)</strong> — though now a semi-autonomous authority, it began as a pure government department<br />
            — <strong>Kenya Prisons Service</strong> — directly under the government
          </ExampleBox>

          <ProsCons
            pros={[
              "Ensures provision of essential services to all citizens, including those who cannot afford to pay market prices",
              "Public accountability — subject to parliamentary oversight and audit",
              "Nationwide reach — can serve remote areas where private businesses find it unprofitable to operate",
              "Services are provided based on need, not ability to pay",
            ]}
            cons={[
              "Bureaucracy — heavy layers of administration slow decision-making and service delivery",
              "Inefficiency — without competition or profit motive, there is little incentive to perform well or innovate",
              "Corruption — civil servants may misuse public resources with weak consequences",
              "Political interference — staffing and operations can be influenced by political considerations rather than merit",
              "Limited capacity to raise capital for expansion",
            ]}
          />

          {/* SECTION 12 */}
          <SectionHeading id="state-corporations" number="Section 12" title="Public / State Corporations" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Public or State Corporations</strong> are government-owned enterprises created through an <strong>Act of Parliament</strong> or the Companies Act. Unlike government departments, they have a <strong>separate legal identity</strong> — they can own property, enter contracts, sue, and be sued independently of the government. They combine <strong>public accountability</strong> with <strong>business efficiency objectives</strong>.
          </p>

          <ExplainerBox>
            The difference between a government department and a state corporation is like the difference between a government office and a government-owned company. A department is just a part of the government — it has no independent existence. A state corporation is a distinct legal entity — it has its own board of directors, its own balance sheet, its own staff (not civil servants), and it can operate more like a business while still being owned by the state.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Characteristics</h3>
          <div className="space-y-3 mb-6">
            {[
              { title: "Separate Legal Entity", body: "Can sue and be sued, own property, and enter contracts independently. The government does not directly bear liability for the corporation's debts." },
              { title: "Government Ownership", body: "Fully or majority owned by the state — the government holds the shares on behalf of citizens." },
              { title: "Commercial Orientation", body: "Expected to generate revenue (and sometimes profit) while delivering public services. Unlike government departments, they must be financially viable." },
              { title: "Managerial Autonomy", body: "Managed by a board of directors and professional managers — not civil servants — providing a layer of independence from day-to-day government interference." },
              { title: "Public Accountability", body: "Subject to audits, parliamentary oversight, and regulatory frameworks. The Auditor General audits their accounts, and Parliament can summon their CEOs to account." },
            ].map((item) => (
              <Card key={item.title} className="border-border">
                <CardContent className="p-3">
                  <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
                  <p className="text-sm text-foreground/75 leading-relaxed">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <ExampleBox>
            <strong>Kenya Examples:</strong><br />
            — <strong>Kenya Airways (KQ)</strong> — state corporation in commercial aviation (though also publicly listed)<br />
            — <strong>Kenya Ports Authority (KPA)</strong> — manages the Port of Mombasa<br />
            — <strong>Kenya Railways Corporation (KRC)</strong> — manages railway infrastructure<br />
            — <strong>Kenya Power and Lighting Company (KPLC)</strong> — electricity distribution<br />
            — <strong>National Water Pipeline Company</strong> — water infrastructure
          </ExampleBox>

          <ProsCons
            pros={[
              "Operational flexibility — less bureaucratic than government departments, allowing faster decisions",
              "Revenue generation — can charge for services and reduce reliance on government budgetary allocations",
              "Provision of essential services — ensures delivery of critical infrastructure (energy, water, transport)",
              "Support for strategic national development goals",
              "Employment creation at scale",
              "Professional management by qualified personnel",
              "Can partner with private sector and access external financing",
            ]}
            cons={[
              "Political interference — CEO appointments, major contracts, and key decisions are often politically influenced",
              "Inefficiency — without genuine competition, there is reduced pressure to perform",
              "Corruption and mismanagement — weak governance in some corporations has led to massive financial scandals (e.g., Kenya Airways losses, Kenya Railways mismanagement)",
              "Financial burden — loss-making corporations require government bailouts funded by taxpayers",
              "Conflicting objectives — balancing profit-making with public service obligations is genuinely difficult",
              "Low practical accountability despite oversight mechanisms",
            ]}
          />

          {/* SECTION 13 */}
          <SectionHeading id="ppps" number="Section 13" title="Mixed Ownership Corporations (Public-Private Partnerships)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Public-Private Partnerships (PPPs)</strong> are business arrangements where the government and private sector jointly invest, own, and manage projects or enterprises to deliver public services or infrastructure. They combine <strong>public sector oversight</strong> with <strong>private sector efficiency, innovation, and capital</strong>.
          </p>

          <ExplainerBox>
            The government faces a constant dilemma: it needs to build expensive infrastructure (roads, bridges, airports, hospitals) but often lacks the funds or technical capacity to build and manage them efficiently. The private sector has the funds and expertise but needs a return on investment. PPPs solve this by saying: "Let's build it together — the government brings regulation and public interest oversight; the private sector brings capital and management efficiency." Both parties share the costs, risks, and returns.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Characteristics of PPPs</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Shared ownership:</strong> Equity is held by both government and private investors</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Profit-oriented with public interest:</strong> Designed to generate returns while delivering essential services</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Risk sharing:</strong> Financial, operational, and market risks are distributed between partners</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Long-term contracts:</strong> Often involve 20–30 year agreements, especially for infrastructure</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Performance-based management:</strong> Private partners are incentivized to deliver quality and efficiency</span></li>
          </ul>

          <ExampleBox>
            <strong>Kenya PPP Examples:</strong><br /><br />
            <strong>Nairobi Expressway:</strong> The 27km Nairobi Expressway (Mlolongo to Westlands) was developed through a PPP between the Government of Kenya and China Road and Bridge Corporation (CRBC). CRBC financed construction and will collect tolls for 27 years to recover its investment. After 27 years, ownership transfers fully to Kenya.<br /><br />
            <strong>Kenya Electricity Generating Company (KenGen):</strong> Majority owned by the government but with private shareholders. Private investors bring capital and corporate governance discipline while the government retains strategic control of electricity generation.<br /><br />
            <strong>Standard Gauge Railway (SGR):</strong> A form of PPP involving Chinese government financing and construction expertise, with Kenya's government owning the infrastructure.
          </ExampleBox>

          <ProsCons
            pros={[
              "Access to private sector efficiency, innovation, and technology",
              "Reduced government financial burden — private capital funds large projects, reducing public debt pressure",
              "Improved service delivery — private sector efficiency and accountability often lead to better quality",
              "Faster project implementation — reduced bureaucracy speeds execution",
              "Risk sharing — government does not bear all financial and operational risks alone",
              "Technology transfer — local capacity improves through collaboration",
            ]}
            cons={[
              "Conflicts of interest — private sector prioritizes profit; government prioritizes public welfare; these can clash",
              "High cost to users — private investors may raise prices to recover costs and earn profit (e.g., expressway tolls)",
              "Complex management structures — coordination between partners can be difficult",
              "Lack of transparency — PPP contracts can be opaque and not easily understood by the public",
              "Risk of exploitation — poorly negotiated agreements may heavily favor private partners",
              "Long-term government obligations — locked into costly contracts that may be difficult to exit",
            ]}
          />

          {/* SECTION 14 */}
          <SectionHeading id="ngos" number="Section 14" title="Non-Governmental Organizations (NGOs)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Non-Governmental Organizations (NGOs)</strong> are independent, non-profit organizations that operate outside the government and private sector, driven by a social, humanitarian, environmental, or advocacy mission rather than profit. They are primarily funded by donations, grants from governments, multilateral agencies, or public fundraising.
          </p>

          <ExplainerBox>
            NGOs exist because markets fail to solve many social problems and governments alone cannot reach everyone. An NGO asks: <em>"What problem exists in society that no one else is adequately solving?"</em> and then organizes people and resources to address it. Whether it is ending hunger, fighting disease, protecting human rights, empowering women, conserving wildlife, or providing clean water — NGOs step in where markets and governments fall short.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Characteristics of NGOs</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Non-profit:</strong> Any surplus funds are reinvested into the mission — not distributed to owners or shareholders</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Independent:</strong> Operate independently of the government, though they may receive government funding</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Mission-driven:</strong> Exist to achieve a specific social purpose, not to make money</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Volunteer involvement:</strong> Often involve voluntary work alongside paid staff</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Accountability to donors and beneficiaries:</strong> Must report on how funds are used and what impact has been achieved</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span>In Kenya, registered and regulated under the <strong>NGO Coordination Act</strong> and the NGO Coordination Board</span></li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Types of NGOs</h3>
          <div className="space-y-3 mb-6">
            {[
              { type: "Operational NGOs", desc: "Directly implement programs and projects on the ground. E.g., running schools, clinics, or water projects. Examples: Médecins Sans Frontières (MSF), World Vision Kenya." },
              { type: "Advocacy NGOs", desc: "Focus on lobbying, policy change, and raising public awareness around specific issues. Examples: Amnesty International, Kenya Human Rights Commission." },
              { type: "Community-Based Organizations (CBOs)", desc: "Small, locally formed NGOs that serve a specific community. Often formed by community members themselves to address local issues." },
              { type: "International NGOs (INGOs)", desc: "Operate across multiple countries. Examples: Oxfam, Save the Children, International Committee of the Red Cross (ICRC)." },
            ].map((item) => (
              <Card key={item.type} className="border-border">
                <CardContent className="p-3">
                  <p className="font-semibold text-foreground text-sm mb-1">{item.type}</p>
                  <p className="text-sm text-foreground/75 leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <ExampleBox>
            <strong>Notable NGOs Operating in Kenya:</strong><br />
            — <strong>Kenya Red Cross Society</strong> — disaster response, blood donation, community health<br />
            — <strong>Transparency International Kenya</strong> — anti-corruption advocacy<br />
            — <strong>African Wildlife Foundation (AWF)</strong> — wildlife conservation<br />
            — <strong>Aga Khan Foundation</strong> — health, education, and rural development programs<br />
            — <strong>Amref Health Africa</strong> — public health programs across East Africa
          </ExampleBox>

          <ProsCons
            pros={[
              "Fill critical gaps in service delivery that governments and markets cannot or will not address",
              "Often more agile than governments — can respond quickly to emerging crises",
              "Build community trust and work closely with beneficiaries",
              "Advocate for policy change that protects vulnerable groups",
              "Create employment and build local capacity",
            ]}
            cons={[
              "Dependent on donor funding — operations can collapse if funding is withdrawn",
              "Limited financial sustainability — no commercial revenue stream",
              "Risk of mission drift — chasing donor funding may lead organizations away from their core purpose",
              "Accountability challenges — some NGOs have been criticized for lack of transparency in how funds are used",
              "Political vulnerability — can be restricted or shut down by hostile governments",
            ]}
          />

          {/* SECTION 15 */}
          <SectionHeading id="multinationals" number="Section 15" title="Multinational Corporations (MNCs)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A <strong>Multinational Corporation (MNC)</strong> — also called a Transnational Corporation (TNC) — is a large company that operates in multiple countries simultaneously. It has its <strong>headquarters</strong> in one country (the home country) and establishes subsidiaries, branches, or joint ventures in other countries (host countries).
          </p>

          <ExplainerBox>
            The defining feature of an MNC is that it does not just <em>sell</em> in other countries — it actually <em>operates</em> in them. It hires local staff, builds local factories, pays local taxes, and integrates itself into local economies. When you buy a Coca-Cola in Nairobi, it was likely produced in a Kenyan bottling plant operated by Century Bottling Company, which is a Coca-Cola franchise — this is how MNCs operate through local subsidiaries while maintaining global control.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Characteristics of MNCs</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Large scale of operations:</strong> MNCs are typically massive — some have revenues larger than the GDP of small countries</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Global strategy:</strong> Key decisions on branding, pricing, research, and technology are made at headquarters and applied globally</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Access to global resources:</strong> Can source raw materials from the cheapest country, manufacture where labour is cheapest, and sell where prices are highest</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Advanced technology:</strong> Typically possess proprietary technology, processes, and brands that give them competitive advantages</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold">•</span><span><strong>Local adaptation:</strong> Adapt products to local tastes while maintaining global brand standards</span></li>
          </ul>

          <ExampleBox>
            <strong>Major MNCs Operating in Kenya:</strong><br />
            — <strong>Safaricom Plc</strong> — originally a subsidiary of Vodafone (UK); now majority Kenyan-owned but still a strategic partner of Vodacom/Vodafone<br />
            — <strong>Unilever Kenya</strong> — manufactures and sells Omo, Sunlight, Royco, Blue Band, and Vaseline in Kenya<br />
            — <strong>Coca-Cola (Century Bottling Co.)</strong> — produces and distributes Coca-Cola beverages in Kenya<br />
            — <strong>Standard Chartered Bank Kenya</strong> — branch of the UK-headquartered Standard Chartered Group<br />
            — <strong>Toyota Kenya</strong> — subsidiary of Toyota Motor Corporation (Japan)<br />
            — <strong>Google and Meta (Facebook)</strong> — maintain Africa offices in Nairobi
          </ExampleBox>

          <ProsCons
            pros={[
              "Bring foreign direct investment (FDI) — inject capital into host country economies",
              "Create employment — hire local workers at scale",
              "Transfer technology and management skills to local employees and partner firms",
              "Pay taxes that fund government services",
              "Introduce global quality standards and best practices",
              "Develop local supply chains — buying from local suppliers",
            ]}
            cons={[
              "Profit repatriation — profits flow back to the home country, reducing host country income",
              "Tax avoidance — MNCs use transfer pricing and tax havens to minimize tax paid in host countries",
              "Crowding out local businesses — their scale and resources can crush small local competitors",
              "Cultural erosion — global brands can displace local culture and products",
              "Environmental damage — some MNCs exploit weaker environmental regulations in developing countries",
              "Political influence — large MNCs can lobby governments and influence policy in their favor, sometimes against the public interest",
              "Vulnerability to sudden withdrawal — if an MNC leaves, it can cause significant local unemployment",
            ]}
          />

          <NoteBox>
            <strong>Transfer Pricing and Tax Avoidance:</strong> One of the most controversial issues with MNCs in developing countries is transfer pricing. An MNC can artificially set prices for transactions between its subsidiaries in different countries to shift profits to low-tax jurisdictions (tax havens). For example, a Kenyan subsidiary might pay an artificially high "royalty fee" to the parent company — reducing its taxable profit in Kenya and transferring the income to a country with near-zero corporate tax. Developing countries lose billions in tax revenue this way annually.
          </NoteBox>

          {/* SECTION 16 */}
          <SectionHeading id="comparison" number="Section 16" title="Comprehensive Comparison Table" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Use this table as a quick revision reference — comparing all major forms of business organization across the key dimensions you need to know for your exam.
          </p>

          <div className="my-6 overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-primary/10">
                  <th className="p-2 border border-border font-semibold text-left">Form</th>
                  <th className="p-2 border border-border font-semibold text-left">Ownership</th>
                  <th className="p-2 border border-border font-semibold text-left">Liability</th>
                  <th className="p-2 border border-border font-semibold text-left">Legal Status</th>
                  <th className="p-2 border border-border font-semibold text-left">Capital</th>
                  <th className="p-2 border border-border font-semibold text-left">Goal</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Sole Proprietorship", "One person", "Unlimited", "Not separate", "Owner's savings/loans", "Profit"],
                  ["General Partnership", "2–20 partners", "Unlimited (all)", "Not separate", "Partners' contributions", "Profit"],
                  ["Limited Partnership", "General + limited partners", "Unlimited (general) / Limited (limited)", "Not separate", "Partners' contributions", "Profit"],
                  ["Private Ltd Company", "1–50 shareholders", "Limited", "Separate legal entity", "Share capital", "Profit"],
                  ["Public Ltd Company", "Unlimited shareholders", "Limited", "Separate legal entity", "Share capital (public)", "Profit"],
                  ["Co-operative", "Members", "Limited", "Separate legal entity", "Member contributions", "Member welfare"],
                  ["Govt Department", "Government", "Government", "Part of government", "Government budget", "Public service"],
                  ["State Corporation", "Government", "Limited", "Separate legal entity", "Govt + own revenue", "Service + revenue"],
                  ["PPP", "Govt + private", "Shared", "Separate legal entity", "Govt + private capital", "Service + profit"],
                  ["NGO", "Members/trustees", "Limited", "Separate legal entity", "Donor funding + grants", "Social mission"],
                  ["Multinational (MNC)", "International shareholders", "Limited", "Multiple entities globally", "Global capital markets", "Global profit"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                    {row.map((cell, j) => (
                      <td key={j} className={`p-2 border border-border leading-snug ${j === 0 ? "font-medium" : ""}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <NoteBox>
            <strong>Exam Tip — The Three Critical Concepts:</strong><br /><br />
            The examiner will often test three concepts across all business forms:<br />
            1. <strong>Liability</strong> — is it unlimited (sole trader, general partner) or limited (company shareholders, co-op members)? This determines what personal financial risk the owners face.<br />
            2. <strong>Legal personality</strong> — is the business a separate legal entity (company, state corporation, co-op, NGO) or is it the owner/partners themselves (sole proprietor, partnership)? This determines whether the business can sue, own property, and continue beyond any individual.<br />
            3. <strong>Continuity</strong> — a company, state corporation, and NGO have perpetual succession. A sole proprietorship or partnership may dissolve when the owner dies or a partner leaves.
          </NoteBox>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <Link href="/topic/1" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors">
                ← Topic 1: Introduction to Management
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Back to Home →
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky sidebar nav */}
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
