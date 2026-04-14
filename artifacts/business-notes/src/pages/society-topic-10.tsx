import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, CheckCircle2, AlertTriangle } from "lucide-react";

const sections = [
  { id: "definition", label: "1. What Are Human Rights?" },
  { id: "individual", label: "2. Individual Rights" },
  { id: "citizen", label: "3. Citizen Rights" },
  { id: "gender", label: "4. Gender Issues" },
  { id: "mainstreaming", label: "5. Gender Mainstreaming" },
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
function WarningBox({ children }: { children: React.ReactNode }) {
  return <div className="my-4 flex gap-3 rounded-lg border border-red-300/40 bg-red-50 dark:bg-red-900/10 p-4"><AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" /><div className="text-sm text-foreground/80 leading-relaxed">{children}</div></div>;
}

export default function SocietyTopic10() {
  const [activeSection, setActiveSection] = useState("definition");
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
    <Layout breadcrumbs={[{ label: "Unit 3", href: "/" }, { label: "Week 10: Human Rights" }]}>
      <Helmet><title>Human Rights, Gender Issues & Mainstreaming | Study Notes</title></Helmet>
      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10"><div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} /></div>
      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 10 · Society &amp; Culture</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Human Rights</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Human rights are the fundamental rights and freedoms to which all human beings are entitled — regardless of their race, sex, nationality, ethnicity, language, religion, or any other status. They are not granted by governments; they are inherent in human dignity and can only be protected or violated, never truly given or taken away. This week examines individual rights, citizen rights, and the critical issue of gender.</p>
          </div>

          <SectionHeading id="definition" number="Section 1" title="What Are Human Rights?" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">Human rights are rights inherent to all human beings. The foundation of human rights is the principle of human dignity — the recognition that every person has intrinsic worth that must be respected. The <strong>Universal Declaration of Human Rights (UDHR)</strong>, adopted by the United Nations in 1948 following the atrocities of World War II, is the foundational international human rights document.</p>
          <div className="space-y-3 mb-5">
            {[
              ["Universal", "Human rights apply to every person everywhere — regardless of nationality, race, sex, religion, or any other status. They cannot be lost by being born in a particular country or belonging to a particular group."],
              ["Inalienable", "Human rights cannot be taken away. A government may violate them, but it cannot strip a person of the right itself. Even a person in prison retains fundamental human rights (to life, to be free from torture, to a fair trial)."],
              ["Indivisible and interdependent", "Human rights form an integrated system. Civil and political rights (right to vote, free speech) cannot be separated from economic, social, and cultural rights (right to food, education, healthcare). Violation of one category undermines all others."],
              ["Non-discriminatory", "Human rights must be applied to everyone without discrimination. States are prohibited from denying rights on grounds of race, sex, religion, ethnicity, language, or other status."],
            ].map(([t, d]) => <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4"><p className="font-semibold text-foreground text-sm mb-1">{t}</p><p className="text-sm text-muted-foreground leading-relaxed">{d}</p></div>)}
          </div>
          <h3 className="font-semibold text-foreground text-base mt-5 mb-3">Three Generations of Human Rights</h3>
          <div className="overflow-x-auto mb-4">
            <table className="text-sm border border-border/40 w-full text-left">
              <thead className="bg-muted/40"><tr><th className="px-4 py-2 border-b border-border/40 font-semibold">Generation</th><th className="px-4 py-2 border-b border-border/40 font-semibold">Type</th><th className="px-4 py-2 border-b border-border/40 font-semibold">Examples</th></tr></thead>
              <tbody className="divide-y divide-border/20">
                <tr><td className="px-4 py-2 font-semibold text-foreground">First Generation</td><td className="px-4 py-2 text-muted-foreground">Civil and political rights — freedom from state interference</td><td className="px-4 py-2 text-muted-foreground">Right to life, free speech, fair trial, vote, privacy, religion, assembly</td></tr>
                <tr><td className="px-4 py-2 font-semibold text-foreground">Second Generation</td><td className="px-4 py-2 text-muted-foreground">Economic, social, and cultural rights — rights to state provision</td><td className="px-4 py-2 text-muted-foreground">Right to education, healthcare, housing, food, work, social security</td></tr>
                <tr><td className="px-4 py-2 font-semibold text-foreground">Third Generation</td><td className="px-4 py-2 text-muted-foreground">Collective/solidarity rights — rights of peoples and communities</td><td className="px-4 py-2 text-muted-foreground">Right to development, peace, clean environment, self-determination</td></tr>
              </tbody>
            </table>
          </div>

          <SectionHeading id="individual" number="Section 2" title="Individual Rights" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">Individual rights are rights held by every person by virtue of being human. They protect individuals from arbitrary interference by the state and by other individuals. Kenya's 2010 Constitution contains a comprehensive Bill of Rights (Chapter 4) that protects a wide range of individual rights.</p>
          <div className="space-y-3 mb-5">
            {[
              ["Right to life", "Every person has the inherent right to life. The state shall not deprive any person of life intentionally. This right includes the right to freedom from extrajudicial killings and arbitrary execution. In Kenya, the Constitution provides: 'Every person has the right to life.' (Article 26). Debates continue about the death penalty, which is provided for in law but rarely applied."],
              ["Right to dignity", "Every person has inherent dignity and the right to have that dignity respected and protected. This means the state must protect people from torture, degrading treatment, and conditions that strip away their humanity — including in prisons and detention facilities."],
              ["Right to freedom from slavery and forced labour", "No person shall be held in slavery or servitude. This right is foundational to the abolition of traditional slavery and to the prohibition of modern forms of forced labour, human trafficking, and debt bondage."],
              ["Right to privacy", "Every person has the right to privacy — of their home, correspondence, communications, and personal information. This right is increasingly important in the digital age, where states and corporations collect vast amounts of personal data. Kenya's Data Protection Act (2019) operationalises this right in the digital context."],
              ["Right to freedom of expression", "Every person has the right to freedom of expression — to seek, receive, and share information and ideas of all kinds. This right includes freedom of the press and the media. It is not absolute — incitement to violence, hate speech, and defamation are restricted. Kenya's media enjoys significant freedom, though journalists sometimes face intimidation."],
              ["Right to education", "Every person has the right to education. In Kenya, the Constitution provides for free and compulsory basic education (Article 53 for children). Education enables individuals to develop their potential, participate in civic life, and access economic opportunities."],
              ["Right to freedom of religion and belief", "Every person has the right to freedom of thought, conscience, religion, and belief. This includes the right to change one's religion and to manifest it in practice. No one may be coerced to adopt a particular religion."],
              ["Right to equality and freedom from discrimination", "Every person is equal before the law and has the right to equal protection and benefit of the law. Discrimination on grounds of race, sex, pregnancy, marital status, health status, disability, religion, ethnicity, and other grounds is prohibited."],
            ].map(([t, d]) => <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4"><p className="font-semibold text-foreground text-sm mb-1">{t}</p><p className="text-sm text-muted-foreground leading-relaxed">{d}</p></div>)}
          </div>

          <SectionHeading id="citizen" number="Section 3" title="Citizen Rights" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">Citizen rights are rights specifically associated with citizenship — membership in a political community (nation). While all human beings have human rights, citizen rights depend on being a citizen of a particular state. They define the relationship between the individual and their government.</p>
          <div className="space-y-3 mb-5">
            {[
              ["Right to vote", "Citizens have the right to participate in free and fair elections — to choose their representatives and the government that will exercise power over them. In Kenya, citizens 18 years and above have the right to vote in national and county elections. This is the foundational political right in a democracy."],
              ["Right to hold public office", "Citizens who meet the relevant qualifications have the right to stand for election and serve in public office — as Members of Parliament, county assembly representatives, governors, or other public officials. This right ensures that public power is genuinely accountable to the citizenry."],
              ["Right to government services", "Citizens have the right to access government services — education, healthcare, infrastructure, security, justice — to which they are entitled by law. In Kenya, devolution has brought government services closer to citizens through 47 county governments, improving access to basic services in previously marginalised areas."],
              ["Right to a nationality and passport", "Every citizen has the right to a national identity document and passport that enables them to be recognised as a citizen, to travel internationally, and to access rights dependent on citizenship. Statelessness — having no nationality — is one of the most vulnerable conditions a person can be in."],
              ["Right to protection abroad", "Citizens abroad have the right to diplomatic protection by their government — including consular assistance in emergencies, protection from unlawful treatment by foreign governments, and assistance in repatriation."],
              ["Right to petition government", "Citizens have the right to approach government institutions — Parliament, the Judiciary, regulatory bodies — with complaints, concerns, and requests for information. This right enables citizens to hold government accountable without necessarily going through formal legal proceedings."],
            ].map(([t, d]) => <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4"><p className="font-semibold text-foreground text-sm mb-1">{t}</p><p className="text-sm text-muted-foreground leading-relaxed">{d}</p></div>)}
          </div>

          <SectionHeading id="gender" number="Section 4" title="Gender Issues" />
          <h3 className="font-semibold text-foreground text-base mt-2 mb-3">The Gender Concept</h3>
          <ExplainerBox><strong>Sex vs. Gender — a critical distinction:</strong> <strong>Sex</strong> is biological — the physical characteristics (chromosomes, hormones, reproductive organs) that differentiate males and females. <strong>Gender</strong> is social and cultural — the roles, behaviours, identities, and expectations that societies assign to people on the basis of their perceived sex. Sex is (mostly) given by nature; gender is constructed by culture. This distinction explains why gender roles vary enormously across cultures and over time: what it means to be a 'man' or a 'woman' differs significantly between Turkana and Nairobi, between Kenya in 1950 and Kenya in 2024, and between Kenya and Japan.</ExplainerBox>
          <div className="space-y-3 mb-5">
            {[
              ["Gender roles", "The specific behaviours, activities, and responsibilities that a society considers appropriate for men and women. Traditional Kenyan gender roles often assigned farming, childcare, and domestic labour to women, and herding, warfare, and political leadership to men. These roles are changing but remain influential."],
              ["Gender identity", "A person's deeply held sense of their own gender — who they feel themselves to be, which may or may not correspond to the sex they were assigned at birth. Gender identity is distinct from sexual orientation."],
              ["Gender inequality", "The systematic differences in power, opportunity, status, and reward between men and women. In Kenya, gender inequality manifests in: lower wages for women in the same jobs; underrepresentation of women in political leadership (though the two-thirds gender rule requires at least one-third of elected officials to be of either gender); higher rates of school dropout for girls; and concentration of women in unpaid domestic and agricultural labour."],
            ].map(([t, d]) => <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4"><p className="font-semibold text-foreground text-sm mb-1">{t}</p><p className="text-sm text-muted-foreground leading-relaxed">{d}</p></div>)}
          </div>
          <h3 className="font-semibold text-foreground text-base mt-5 mb-3">Gender-Based Violence (GBV)</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-3"><strong>Gender-based violence</strong> is violence directed at a person because of their gender — or that disproportionately affects people of a particular gender. It is one of the most pervasive human rights violations globally and in Kenya.</p>
          <WarningBox><strong>GBV affects 1 in 3 women globally</strong> and is linked to deep-seated gender inequality, patriarchal power structures, and cultural norms that condone violence against women. It is not a private matter — it is a human rights violation and a public health emergency.</WarningBox>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {[
              ["Physical violence", "Beating, slapping, kicking, burning, use of weapons. The most visible form of GBV. In Kenya, physical violence by an intimate partner affects approximately 35% of women who have been in a relationship."],
              ["Sexual violence", "Rape, sexual assault, forced marriage, sexual harassment. Sexual violence is dramatically underreported due to stigma, fear of further harm, distrust of legal institutions, and victim-blaming cultural norms."],
              ["Psychological/emotional violence", "Threatening, insulting, controlling, isolating, humiliating. Often accompanies physical violence and can be as damaging to mental health. May be less visible but equally harmful."],
              ["Economic violence", "Controlling access to financial resources; preventing employment; denying inheritance rights. Economic abuse creates dependency that traps survivors in abusive situations. In Kenya, women's land and inheritance rights remain significantly restricted in practice despite legal protections."],
              ["Female Genital Mutilation (FGM)", "A specific form of gender-based violence practiced in parts of Kenya (particularly among the Somali, Maasai, Kisii, and some communities in the Rift Valley). It violates the bodily integrity of girls and women. Kenya's Prohibition of FGM Act (2011) criminalises the practice."],
              ["Child marriage", "Marriage before age 18. In Kenya, 23% of girls are married before age 18. Child marriage violates girls' rights to education, health, and self-determination, and often leads to cycles of poverty and domestic violence."],
            ].map(([t, d]) => <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-3"><p className="font-semibold text-foreground text-sm mb-1">{t}</p><p className="text-xs text-muted-foreground leading-relaxed">{d}</p></div>)}
          </div>

          <SectionHeading id="mainstreaming" number="Section 5" title="Gender Mainstreaming" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4"><strong>Gender mainstreaming</strong> is the strategy of integrating gender equality considerations into all policies, programmes, and institutional practices — so that gender equity is not treated as a separate 'women's issue' but as a central concern of all decision-making in every sector.</p>
          <ExplainerBox><strong>Definition (UN, 1997):</strong> Gender mainstreaming is "the process of assessing the implications for women and men of any planned action, including legislation, policies, or programmes, in any area and at all levels... [so that] women and men benefit equally and inequality is not perpetuated."</ExplainerBox>
          <div className="space-y-3 mb-5">
            {[
              ["Kenya's two-thirds gender rule", "Article 81(b) of Kenya's 2010 Constitution provides that not more than two-thirds of elective or appointive members of any state body shall be of the same gender. This requires that women hold at least one-third of positions in Parliament, county assemblies, and government bodies. Implementation has been contested and incomplete, but the constitutional principle is firmly established."],
              ["Gender budgeting", "Gender budgeting involves analysing government budgets to identify their differential impacts on men and women, and restructuring them to promote gender equality. Kenya has adopted gender budgeting guidelines requiring that all government budgets assess their gender impact."],
              ["Women's economic empowerment", "Programmes designed to increase women's access to finance (e.g., the Women Enterprise Fund), land (e.g., land registration reform), skills training, and market access. Economic empowerment reduces women's vulnerability to GBV and enhances their household and community decision-making power."],
              ["Legal reforms", "Kenya has enacted numerous laws protecting women's rights: the Sexual Offences Act (2006), the Protection Against Domestic Violence Act (2015), the Matrimonial Property Act (2013), the Employment Act provisions on maternity leave and sexual harassment, and the Prohibition of FGM Act (2011). Implementation remains uneven but the legal framework is significantly stronger than a decade ago."],
              ["Education for girls", "Ensuring girls' equal access to education — including through cash transfers for girls' school fees, sanitary towel provision, safe school programmes, and gender-sensitive teaching practices — is one of the most powerful interventions for long-term gender equality."],
            ].map(([t, d]) => <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4"><p className="font-semibold text-foreground text-sm mb-1">{t}</p><p className="text-sm text-muted-foreground leading-relaxed">{d}</p></div>)}
          </div>

          <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 10: Human Rights</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Human rights:</strong> universal, inalienable, indivisible, non-discriminatory. Three generations: civil/political, economic/social/cultural, solidarity rights.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Individual rights:</strong> life, dignity, freedom from slavery, privacy, expression, education, religion, equality.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Citizen rights:</strong> vote, hold office, access government services, nationality, protection abroad, petition government.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Sex vs. Gender:</strong> sex = biological; gender = social/cultural construction.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>GBV types:</strong> physical, sexual, psychological, economic, FGM, child marriage.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Gender mainstreaming:</strong> integrating gender equality into all policies. Kenya tools: two-thirds gender rule, gender budgeting, women's economic empowerment, legal reforms, girls' education.</span></li>
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
