import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, CheckCircle2 } from "lucide-react";

const sections = [
  { id: "intro", label: "1. Introduction to Civic Education" },
  { id: "structure", label: "2. Structure of Kenya Government" },
  { id: "national-county", label: "3. National vs County Government" },
  { id: "constitutionalism", label: "4. Constitutionalism" },
  { id: "constitution-making", label: "5. Constitution Making in Kenya" },
];

function SectionHeading({ id, number, title }: { id: string; number: string; title: string }) {
  return <div id={id} className="scroll-mt-20 pt-12 pb-4 border-b border-border/60 mb-6"><p className="text-xs font-bold tracking-widest text-primary uppercase mb-1">{number}</p><h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{title}</h2></div>;
}
function ExplainerBox({ children }: { children: React.ReactNode }) {
  return <div className="my-4 flex gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4"><Lightbulb className="h-5 w-5 text-primary shrink-0 mt-0.5" /><div className="text-sm text-foreground/80 leading-relaxed">{children}</div></div>;
}
function ExampleBox({ children }: { children: React.ReactNode }) {
  return <div className="my-4 flex gap-3 rounded-lg border border-green-300/40 bg-green-50 dark:bg-green-900/10 p-4"><CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" /><div className="text-sm text-foreground/80 leading-relaxed">{children}</div></div>;
}

export default function SocietyTopic11() {
  const [activeSection, setActiveSection] = useState("intro");
  const [readProgress, setReadProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY; const docH = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docH > 0 ? Math.min(100, Math.round((scrollY / docH) * 100)) : 0); setShowScrollTop(scrollY > 400);
      const current = sections.map(s => { const el = document.getElementById(s.id); return el ? { id: s.id, top: el.getBoundingClientRect().top } : null; }).filter(Boolean).filter(s => s!.top <= 120);
      if (current.length > 0) setActiveSection(current[current.length - 1]!.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true }); return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const sectionIndex = sections.findIndex(s => s.id === activeSection);
  const progress = Math.round(((sectionIndex + 1) / sections.length) * 100);

  return (
    <Layout breadcrumbs={[{ label: "Unit 3", href: "/" }, { label: "Week 11: Civil Education" }]}>
      <Helmet><title>Civil Education — Kenya Government & Constitutionalism | Study Notes</title></Helmet>
      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10"><div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} /></div>
      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 11 · Society &amp; Culture</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Civil Education</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Civil (or civic) education is the foundation of informed, active citizenship. It equips Kenyans to understand the structure of their government, know their rights and responsibilities, participate meaningfully in democratic processes, and hold their leaders accountable. This week covers Kenya's governmental structure, the division between national and county government, and the nature and history of constitutionalism in Kenya.</p>
          </div>

          <SectionHeading id="intro" number="Section 1" title="Introduction to Civic Education" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4"><strong>Civic education</strong> is the study of the rights and duties of citizenship and the workings of government. It aims to produce informed, engaged, and responsible citizens who can participate effectively in democratic life.</p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">A democratic society depends on an informed citizenry. Citizens who do not understand how their government works, what their rights are, or how to participate in public processes are vulnerable to manipulation by politicians, unable to hold leaders accountable, and excluded from decisions that directly affect their lives. Civic education is therefore not a luxury — it is a prerequisite for genuine democracy.</p>
          <ExplainerBox><strong>Key civic values in Kenya:</strong> The Preamble of Kenya's 2010 Constitution commits to: national values of peace, national unity and the rule of law; human rights and democracy; sustainable development; good governance; social justice; and transparency and accountability. These values define what responsible citizenship means in Kenya today.</ExplainerBox>

          <SectionHeading id="structure" number="Section 2" title="Structure of Kenya's Government" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">Kenya operates a presidential, representative democratic republic with a devolved system of government. The national government is organised into three arms, each with distinct functions and powers, with checks and balances to prevent any one arm from dominating.</p>
          <div className="space-y-5 mb-5">
            <div className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
              <div className="px-5 py-3 border-b border-border/30 bg-primary/10"><p className="font-semibold text-foreground">1. The Executive</p></div>
              <div className="px-5 py-4 text-sm text-foreground/80 leading-relaxed space-y-2">
                <p>The Executive is responsible for implementing laws and policies and for the day-to-day administration of the country. It is headed by the <strong>President</strong>, who is both Head of State and Head of Government, elected directly by Kenyan voters in a presidential election held every five years. The President is supported by the <strong>Deputy President</strong> and a <strong>Cabinet</strong> of Cabinet Secretaries who head the various government ministries.</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>The President implements laws passed by Parliament</li>
                  <li>Appoints Cabinet Secretaries (subject to Parliamentary approval)</li>
                  <li>Represents Kenya in international relations</li>
                  <li>Commands the Kenya Defence Forces</li>
                  <li>Has power to assent to or withhold assent from Bills passed by Parliament</li>
                  <li>Can pardon offenders and commute sentences</li>
                </ul>
                <p className="mt-2"><strong>Check on Executive power:</strong> The President cannot dissolve Parliament; Parliament can pass a vote of no confidence; the President's appointments require Parliamentary approval; the Judiciary can strike down Presidential actions as unconstitutional.</p>
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
              <div className="px-5 py-3 border-b border-border/30 bg-secondary/10"><p className="font-semibold text-foreground">2. The Legislature (Parliament)</p></div>
              <div className="px-5 py-4 text-sm text-foreground/80 leading-relaxed space-y-2">
                <p>Parliament is the legislative branch — it makes laws, represents citizens, and oversees the Executive. Kenya has a <strong>bicameral Parliament</strong> (two chambers):</p>
                <div className="grid md:grid-cols-2 gap-3 mt-2">
                  <div className="rounded-lg border border-border/40 bg-muted/20 p-3">
                    <p className="font-semibold text-foreground text-sm mb-1">National Assembly</p>
                    <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                      <li>350 members (290 constituency MPs, 47 women representatives, 12 nominated, Speaker)</li>
                      <li>Primary legislative chamber</li>
                      <li>Allocates revenue between national and county governments</li>
                      <li>Can impeach the President</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border border-border/40 bg-muted/20 p-3">
                    <p className="font-semibold text-foreground text-sm mb-1">Senate</p>
                    <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                      <li>67 members (47 elected senators, 16 women, 2 youth, 2 disabled persons, Speaker)</li>
                      <li>Focuses on county interests and legislation affecting counties</li>
                      <li>Reviews money bills affecting counties</li>
                      <li>Can impeach a Governor</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
              <div className="px-5 py-3 border-b border-border/30 bg-amber-500/10"><p className="font-semibold text-foreground">3. The Judiciary</p></div>
              <div className="px-5 py-4 text-sm text-foreground/80 leading-relaxed space-y-2">
                <p>The Judiciary interprets laws, resolves disputes, and protects constitutional rights. It is headed by the <strong>Chief Justice</strong>, who also heads the Supreme Court. The Judiciary includes:</p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li><strong>Supreme Court:</strong> Highest court; handles presidential election petitions and constitutional matters of great public importance. 7 justices including Chief Justice and Deputy Chief Justice.</li>
                  <li><strong>Court of Appeal:</strong> Hears appeals from High Court decisions. Sits in various cities across Kenya.</li>
                  <li><strong>High Court:</strong> Handles serious criminal and civil cases; has unlimited jurisdiction; also has a Constitutional Division (constitutional matters) and an Environment and Land Court.</li>
                  <li><strong>Magistrates Courts:</strong> Handle the majority of criminal and civil cases at the local level. Most Kenyans who interact with the formal justice system do so through magistrate's courts.</li>
                  <li><strong>Kadhi Courts:</strong> Handle personal status matters (marriage, divorce, inheritance) for Muslims according to Islamic law in areas where they are resident.</li>
                </ul>
                <p className="mt-2"><strong>Judicial independence:</strong> Guaranteed by the Constitution. Judges are appointed by the Judicial Service Commission, not by the President alone. They can only be removed through a formal process. An independent judiciary is essential for the rule of law — the guarantee that even the most powerful must obey the law.</p>
              </div>
            </div>
          </div>
          <ExplainerBox><strong>Separation of Powers and Checks and Balances:</strong> Each arm of government has its own distinct powers that cannot be usurped by the others (separation of powers). Each arm also has mechanisms to limit the powers of the others (checks and balances): Parliament passes laws but the President can decline to sign them; the President appoints judges but they can strike down Presidential actions; Parliament can remove the President through impeachment. This architecture prevents tyranny by ensuring that power is distributed and mutually constrained.</ExplainerBox>

          <SectionHeading id="national-county" number="Section 3" title="National and County Government — Devolution" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">Kenya's 2010 Constitution created a <strong>devolved system of government</strong> with two levels: the national government and 47 county governments. Devolution transferred significant powers, functions, and resources from the centralised national government to the counties, bringing government closer to the people and enabling more locally responsive governance.</p>
          <div className="overflow-x-auto mb-5">
            <table className="text-sm border border-border/40 w-full text-left">
              <thead className="bg-muted/40"><tr><th className="px-4 py-2 border-b border-border/40 font-semibold">Feature</th><th className="px-4 py-2 border-b border-border/40 font-semibold text-blue-700 dark:text-blue-400">National Government</th><th className="px-4 py-2 border-b border-border/40 font-semibold text-green-700 dark:text-green-400">County Government</th></tr></thead>
              <tbody className="divide-y divide-border/20">
                {[
                  ["Executive head", "President", "Governor (directly elected)"],
                  ["Legislature", "Parliament (Senate + National Assembly)", "County Assembly"],
                  ["Exclusive functions", "Defence, foreign affairs, immigration, national security, currency, monetary policy, national courts, income tax", "County health services, early education, county roads, agriculture, trade licences, local markets"],
                  ["Revenue", "National taxes, international borrowing", "Equitable share from national revenue (currently ≥15%) + own-source revenue"],
                  ["Oversight", "EACC, Auditor-General, Parliament, courts", "County Assembly, Senate, Controller of Budget, Auditor-General"],
                ].map(([feat, nat, cty]) => <tr key={String(feat)}><td className="px-4 py-2 font-semibold text-foreground text-xs">{feat}</td><td className="px-4 py-2 text-muted-foreground text-xs">{nat}</td><td className="px-4 py-2 text-muted-foreground text-xs">{cty}</td></tr>)}
              </tbody>
            </table>
          </div>
          <ExampleBox><strong>Why devolution matters:</strong> Before 2010, virtually all government resources and decision-making were concentrated in Nairobi. Counties in arid and semi-arid regions — Turkana, Mandera, Wajir, Marsabit — received negligible government investment. Devolution has delivered county hospitals, bursaries for students, county roads, and agricultural support to communities that previously had almost no government presence. While challenges of corruption and capacity remain, devolution has fundamentally transformed the geography of government in Kenya.</ExampleBox>

          <SectionHeading id="constitutionalism" number="Section 4" title="Constitutionalism" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4"><strong>Constitutionalism</strong> is the principle that government authority must be derived from, defined by, and limited by a constitution — and that even the most powerful government officials are subject to the law. It is the institutional embodiment of the idea that "no man is above the law."</p>
          <div className="space-y-3 mb-5">
            {[
              ["The supremacy of the Constitution", "The Constitution is the highest law of the land. All other laws, government actions, and executive decisions must conform to it. Any law or action that violates the Constitution is unconstitutional and has no legal force. Kenya's 2010 Constitution explicitly states: 'This Constitution is the supreme law of the Republic and binds all persons and all State organs at both levels of government.' (Article 2)"],
              ["Rule of law", "Everyone — citizens, government officials, corporations, and even the state itself — is subject to the law and accountable under it. No person or institution is above the law. The rule of law requires that laws be publicly known, consistently applied, and enforced impartially. It protects against arbitrariness and the abuse of power."],
              ["Separation of powers", "Government powers are divided among the Executive, Legislature, and Judiciary to prevent any single entity from accumulating too much power. Each arm performs different functions, preventing tyranny."],
              ["Checks and balances", "Each arm of government has mechanisms to limit the powers of the others — ensuring that power is distributed and mutually constrained. This prevents any one arm from becoming dominant."],
              ["Protection of fundamental rights", "A constitution that merely establishes government structures without protecting fundamental rights is insufficient for constitutionalism. A constitutional order must include enforceable rights that protect individuals and minorities from majority tyranny."],
              ["Independent judiciary", "Constitutionalism requires courts that can strike down unconstitutional government actions without fear of retaliation. Without judicial independence, constitutional guarantees become empty promises."],
              ["Periodic elections", "Democratic constitutionalism requires regular, free, and fair elections that enable citizens to change their government peacefully. Elections are the primary mechanism through which citizens exercise ultimate sovereignty."],
            ].map(([t, d]) => <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4"><p className="font-semibold text-foreground text-sm mb-1">{t}</p><p className="text-sm text-muted-foreground leading-relaxed">{d}</p></div>)}
          </div>

          <SectionHeading id="constitution-making" number="Section 5" title="Constitution Making in Kenya" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">Kenya's constitutional history reflects the country's political journey from colonial rule to independence and through multiple phases of authoritarian consolidation and democratic reform, culminating in the landmark 2010 Constitution.</p>
          <div className="space-y-4 mb-5">
            {[
              { period: "Independence Constitution (1963)", content: "Kenya gained independence from Britain on 12 December 1963 with a constitution negotiated at Lancaster House in London. It established a parliamentary system (Westminster model) with a bicameral Parliament, a bill of rights, and federal-style regional governments (majimbo). Jomo Kenyatta became Prime Minister and then President. This constitution was progressively amended in the 1960s to centralise power in the Presidency and abolish the regional governments." },
              { period: "One-Party State and Constitutional Erosion (1969–1991)", content: "Through a series of constitutional amendments, Kenya became a de facto one-party state (KANU) in 1969 and de jure in 1982. Key rights and institutional independence were progressively stripped away. The 'section 2A' amendment making Kenya formally a single-party state was one of the most significant. This period saw presidential power expand unchecked, the judiciary subordinated to executive power, and Parliament reduced to rubber-stamping presidential decisions." },
              { period: "Return to Multi-Party Politics (1991) and the Bomas Process", content: "International pressure and internal civil society activism led to the repeal of Section 2A in 1991, restoring multi-party democracy. The 1990s and early 2000s saw numerous attempts at constitutional reform through review commissions (including the Constitution of Kenya Review Commission under Prof. Yash Pal Ghai). The National Constitutional Conference at Bomas of Kenya in 2003–2004 produced a draft constitution ('Bomas draft') but this was controversially revised and rejected in a 2005 referendum by 58% of voters." },
              { period: "Post-Election Violence and the Kofi Annan Process (2007–2008)", content: "The disputed December 2007 elections triggered devastating violence in which over 1,300 people were killed and 600,000 displaced. The Kofi Annan-led mediation produced the National Accord and Reconciliation Act (2008) and a power-sharing government. Critically, constitutional reform was made a condition of the political settlement — creating the political will that had previously been lacking." },
              { period: "The 2010 Constitution", content: "A new constitution was drafted through an extensive participatory process and approved by 67% of Kenyan voters in a referendum on 4 August 2010. The 2010 Constitution is widely regarded as one of the most progressive constitutions in Africa. Key features include: devolution to 47 county governments; a comprehensive Bill of Rights; the two-thirds gender rule; an independent judiciary; an independent electoral commission; anti-corruption institutions (Ethics and Anti-Corruption Commission); protection of land rights; environmental rights; and strengthened checks and balances on Executive power. It came into force on 27 August 2010." },
            ].map(({ period, content }) => (
              <div key={period} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30"><p className="font-semibold text-foreground text-sm">{period}</p></div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{content}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 11: Civil Education</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>3 arms of government:</strong> Executive (President + Cabinet), Legislature (National Assembly + Senate), Judiciary (Supreme Court down to Magistrates).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Devolution:</strong> 47 counties with Governors and County Assemblies. Counties handle health, local roads, early education, markets. Funded by equitable share (≥15% of national revenue).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Constitutionalism:</strong> constitutional supremacy, rule of law, separation of powers, checks and balances, rights protection, judicial independence, periodic elections.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Constitution-making:</strong> 1963 (Independence) → erosion/one-party state → 1991 multi-party → Bomas process (2003–04) → 2007/08 PEV → 2010 Constitution (67% referendum approval).</span></li>
            </ul>
          </div>
          <div className="h-16" />
        </div>
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-24 space-y-1">
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">Contents</p>
            {sections.map(s => (<a key={s.id} href={`#${s.id}`} onClick={e => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }); }} className={`block text-xs py-1 px-2 rounded transition-colors ${activeSection === s.id ? "text-primary font-semibold border-l-2 border-primary pl-3" : "text-muted-foreground hover:text-foreground border-l-2 border-transparent pl-3"}`}>{s.label}</a>))}
            <div className="pt-6 border-t border-border mt-4">
              <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">Progress</p>
              <p className="text-xs text-muted-foreground mb-1">Section {sectionIndex + 1} of {sections.length} <span className="text-primary font-semibold">{progress}%</span></p>
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} /></div>
            </div>
          </div>
        </aside>
      </div>
      {showScrollTop && <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90"><ArrowUp className="h-5 w-5" /></button>}
    </Layout>
  );
}
