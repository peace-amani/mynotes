import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, CheckCircle2, AlertTriangle } from "lucide-react";

const sections = [
  { id: "corruption", label: "1. Corruption" },
  { id: "marriage", label: "2. Marriage" },
  { id: "stress", label: "3. Stress" },
  { id: "alcohol", label: "4. Alcohol Abuse" },
  { id: "suicide", label: "5. Suicide" },
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
function IssueCard({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="rounded-lg border border-border/60 bg-card/50 p-4 mb-3"><p className="font-semibold text-foreground text-sm mb-2">{title}</p><div className="text-sm text-muted-foreground leading-relaxed">{children}</div></div>;
}

export default function SocietyTopic12() {
  const [activeSection, setActiveSection] = useState("corruption");
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
    <Layout breadcrumbs={[{ label: "Unit 3", href: "/" }, { label: "Week 12: Emerging Issues" }]}>
      <Helmet><title>Emerging Issues — Corruption, Marriage, Stress, Alcohol & Suicide | Study Notes</title></Helmet>
      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10"><div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} /></div>
      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 12 · Society &amp; Culture</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Emerging Issues</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Modern society grapples with a range of complex social issues that cut across individual, family, and community life. This week examines five critical emerging issues in Kenyan society: corruption, marriage, stress, alcohol abuse, and suicide — each analysed from a sociological perspective with attention to causes, effects, and responses.</p>
          </div>

          <SectionHeading id="corruption" number="Section 1" title="Corruption" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4"><strong>Corruption</strong> is the abuse of entrusted power for private gain. It occurs when someone in a position of authority uses that authority to benefit themselves or others at the expense of the public interest. Corruption is one of the most serious challenges facing Kenya and undermines virtually every dimension of social development.</p>
          <IssueCard title="Definition and Types">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Bribery:</strong> Offering, giving, receiving, or soliciting something of value to influence a decision. The most common form in Kenya — bribery of traffic police, health workers, teachers, and government officials.</li>
              <li><strong>Embezzlement:</strong> Theft by a person entrusted with property or funds. A government official diverting public funds to personal accounts.</li>
              <li><strong>Fraud:</strong> Deception for financial gain. Procurement fraud, ghost workers on government payrolls, fraudulent academic certificates.</li>
              <li><strong>Extortion:</strong> Demanding payment through coercion or threats. Police extortion of matatu drivers; bureaucrats delaying services until bribes are paid.</li>
              <li><strong>Nepotism and cronyism:</strong> Favouring relatives (nepotism) or friends/associates (cronyism) in appointments and contracts, regardless of merit.</li>
              <li><strong>Political corruption:</strong> Vote-buying, manipulation of electoral processes, corruption in the awarding of tenders for political purposes.</li>
            </ul>
          </IssueCard>
          <IssueCard title="Causes of Corruption">
            <ul className="list-disc list-inside space-y-1">
              <li>Low public sector salaries that fail to provide a living wage, creating incentives to supplement income through bribes</li>
              <li>Weak institutions — courts that cannot enforce accountability, audit bodies without independence, oversight agencies without resources</li>
              <li>Cultural normalisation — when corruption becomes so pervasive that it is regarded as normal behaviour ('everyone does it'), social pressure to resist it weakens</li>
              <li>Greed and lack of integrity among individuals in positions of power</li>
              <li>Lack of transparency — decisions made without public scrutiny create opportunities for corrupt dealing</li>
              <li>Political patronage systems in which political loyalty is rewarded with jobs and contracts regardless of merit</li>
              <li>Poverty and inequality — desperate people may pay bribes to access services they are entitled to; desperate officials may accept them</li>
            </ul>
          </IssueCard>
          <IssueCard title="Effects of Corruption">
            <ul className="list-disc list-inside space-y-1">
              <li>Diverts public resources away from essential services (education, healthcare, infrastructure) into private pockets</li>
              <li>Undermines public trust in government and institutions, eroding the social contract</li>
              <li>Distorts economic decision-making — investment goes to politically connected insiders rather than most productive uses</li>
              <li>Perpetuates inequality — the wealthy and well-connected can buy their way to advantage while the poor cannot</li>
              <li>Weakens the rule of law — when justice can be bought, those with money avoid accountability</li>
              <li>Discourages foreign investment and economic development</li>
              <li>Corrupts the socialisation of youth — when children see corruption rewarded and integrity punished, they absorb corrupt values</li>
            </ul>
          </IssueCard>
          <IssueCard title="Anti-Corruption Measures in Kenya">
            <p>Kenya has established several institutions to combat corruption: the <strong>Ethics and Anti-Corruption Commission (EACC)</strong>; the <strong>Director of Public Prosecutions (DPP)</strong>; the <strong>Directorate of Criminal Investigations (DCI)</strong>; the <strong>Office of the Auditor-General</strong>; and the <strong>Public Procurement Regulatory Authority (PPRA)</strong>. Legislative frameworks include the Anti-Corruption and Economic Crimes Act and the Public Officer Ethics Act. Civil society organisations (like Transparency International Kenya) and a free press play crucial roles in exposing corruption. However, enforcement remains weak and conviction rates for high-level corruption are extremely low.</p>
          </IssueCard>

          <SectionHeading id="marriage" number="Section 2" title="Marriage" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4"><strong>Marriage</strong> is a legally and/or socially recognised union between two or more people that establishes rights and obligations regarding sexuality, property, children, and social status. It is one of the most universal social institutions, found in some form in every known human society — though its specific forms vary enormously.</p>
          <IssueCard title="Types of Marriage">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Monogamy:</strong> Union between two people (typically one man and one woman). The legally recognised and most common form in modern Kenya.</li>
              <li><strong>Polygyny:</strong> One man married to multiple women simultaneously. Practised in some Kenyan communities and recognised under customary law (with the wife's knowledge required under the Marriage Act 2014). Distinct from bigamy (marrying a second spouse without the first's knowledge, which is illegal).</li>
              <li><strong>Polyandry:</strong> One woman married to multiple men. Extremely rare globally; occurs in a few communities in Tibet and parts of India.</li>
              <li><strong>Endogamy:</strong> Marriage within a specific social group (clan, caste, ethnicity, religion). Many Kenyan communities practise ethnic endogamy — marrying within one's ethnic group.</li>
              <li><strong>Exogamy:</strong> Marriage outside one's immediate social group (particularly clan or lineage). Common across Kenya — most communities prohibit marriage within one's own clan.</li>
            </ul>
          </IssueCard>
          <IssueCard title="Functions of Marriage">
            <ul className="list-disc list-inside space-y-1">
              <li>Regulates sexual behaviour and provides legitimate channels for sexual expression</li>
              <li>Provides the primary social unit for reproduction and child-rearing</li>
              <li>Defines inheritance rights, property ownership, and family obligations</li>
              <li>Creates alliances between families and social groups</li>
              <li>Provides emotional support, companionship, and social identity for individuals</li>
              <li>Transmits cultural values, traditions, and property across generations</li>
            </ul>
          </IssueCard>
          <IssueCard title="Challenges Facing Marriage in Contemporary Kenya">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Rising divorce rates:</strong> Economic stress, changing gender expectations, urbanisation, and greater awareness of rights (especially women's rights to leave abusive marriages) have increased divorce rates. Kenya's divorce rate has risen significantly, though it remains lower than Western rates.</li>
              <li><strong>Domestic violence:</strong> GBV within marriage is pervasive — affecting an estimated 35% of married women. The Protection Against Domestic Violence Act (2015) provides legal remedies, but enforcement is inconsistent and cultural norms often discourage reporting.</li>
              <li><strong>Economic pressure:</strong> Rising costs of living, unemployment, and inequality create financial stress that strains marriages. The high cost of traditional marriage customs (bride price/lobola/ruracio) can also delay or prevent marriage.</li>
              <li><strong>Cohabitation without marriage:</strong> Increasing numbers of couples — particularly urban youth — live together without formal marriage. This creates legal complications regarding property rights and parental rights when relationships end.</li>
              <li><strong>Early marriage:</strong> 23% of Kenyan girls marry before 18. Early marriage ends girls' education, increases health risks (especially from early pregnancy), and perpetuates cycles of poverty.</li>
            </ul>
          </IssueCard>

          <SectionHeading id="stress" number="Section 3" title="Stress" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4"><strong>Stress</strong> is the body's psychological and physiological response to demands (stressors) that exceed or threaten to exceed a person's capacity to cope. It is a normal and sometimes adaptive response to challenge — but when chronic or overwhelming, it becomes a serious health and social problem.</p>
          <IssueCard title="Types of Stress">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Acute stress:</strong> Short-term, intense stress in response to an immediate threat or challenge. Normal and generally not harmful if resolved quickly. Example: exam stress, a near-miss car accident.</li>
              <li><strong>Chronic stress:</strong> Long-term, ongoing stress from persistent problems — poverty, abusive relationships, chronic illness, job insecurity. This type causes the most serious health damage because the stress response system remains activated for extended periods.</li>
              <li><strong>Individual stress:</strong> Arising from personal circumstances — financial difficulties, relationship breakdown, health problems, grief, academic pressure.</li>
              <li><strong>Workplace stress:</strong> Arising from work conditions — excessive workload, poor management, job insecurity, harassment, long commutes, inadequate compensation. Growing recognition as a major occupational health issue.</li>
            </ul>
          </IssueCard>
          <IssueCard title="Causes of Stress">
            <ul className="list-disc list-inside space-y-1">
              <li>Financial pressure and economic insecurity — the most pervasive source of stress in Kenya</li>
              <li>Work overload and poor work-life balance</li>
              <li>Relationship difficulties — marital conflict, family tension, social isolation</li>
              <li>Academic pressure — examination stress affects students at all levels</li>
              <li>Health problems — chronic illness, caring for sick family members</li>
              <li>Bereavement and loss</li>
              <li>Discrimination and social marginalisation</li>
              <li>Urban life stressors — traffic, noise, overcrowding, crime, anonymity</li>
              <li>Social media pressure — comparison culture, cyberbullying, information overload</li>
            </ul>
          </IssueCard>
          <IssueCard title="Effects of Stress">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Physical effects:</strong> Headaches, hypertension (high blood pressure), weakened immune system, digestive problems, cardiovascular disease, chronic fatigue, sleep disorders.</li>
              <li><strong>Psychological effects:</strong> Anxiety, depression, irritability, cognitive impairment (poor concentration, memory problems), emotional numbness, burnout.</li>
              <li><strong>Behavioural effects:</strong> Substance abuse (using alcohol or drugs to cope), social withdrawal, aggression, poor academic or work performance, risk-taking behaviour.</li>
              <li><strong>Social effects:</strong> Breakdown of relationships, family conflict, reduced community participation, increased domestic violence, reduced workplace productivity.</li>
            </ul>
          </IssueCard>
          <IssueCard title="Stress Management Strategies">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Physical strategies:</strong> Regular exercise (releases endorphins — natural mood elevators); adequate sleep (7–9 hours); balanced nutrition; relaxation techniques (deep breathing, yoga, meditation).</li>
              <li><strong>Psychological strategies:</strong> Cognitive reframing (changing how we interpret stressful situations); professional counselling and therapy (particularly Cognitive Behavioural Therapy); mindfulness practices; journaling.</li>
              <li><strong>Social strategies:</strong> Building and maintaining strong social support networks; talking to trusted friends and family; joining support groups; seeking help rather than isolating.</li>
              <li><strong>Organisational strategies:</strong> Time management and prioritisation; setting realistic goals; learning to say no; taking breaks; seeking flexible work arrangements where possible.</li>
            </ul>
          </IssueCard>

          <SectionHeading id="alcohol" number="Section 4" title="Alcohol Abuse" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4"><strong>Alcohol abuse</strong> is a pattern of drinking that causes harm to the individual's health, relationships, economic wellbeing, or legal standing. It ranges from hazardous drinking (above safe levels) to alcohol dependence (addiction), in which the person cannot function without alcohol and experiences withdrawal symptoms when they stop drinking.</p>
          <WarningBox><strong>Kenya's alcohol problem is severe:</strong> Kenya has one of the highest rates of alcohol consumption in sub-Saharan Africa. The World Health Organization estimates that approximately 13% of Kenyan men have alcohol use disorders. Illicit alcohol — including the illegal homebrew <em>chang'aa</em>, which is sometimes laced with methanol — causes frequent mass poisoning events. The 2024 Mukuru chang'aa poisoning killed dozens of people in Nairobi.</WarningBox>
          <IssueCard title="Causes of Alcohol Abuse">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Stress and coping:</strong> Alcohol is widely used as a mechanism to cope with stress, anxiety, depression, grief, and trauma. This coping use is one of the most common pathways to alcohol dependence.</li>
              <li><strong>Social and peer pressure:</strong> Social norms that associate drinking with masculinity, social status, or celebration create powerful pressure to drink, especially among young men. Peer pressure is particularly influential in adolescence.</li>
              <li><strong>Unemployment and idleness:</strong> Lack of meaningful work or activity leaves young people vulnerable to alcohol abuse. In high-unemployment communities, drinking can become a primary social activity.</li>
              <li><strong>Genetic vulnerability:</strong> Research shows a genetic component to alcohol dependence — individuals with close relatives who are alcoholics are significantly more likely to develop alcohol use disorders themselves.</li>
              <li><strong>Aggressive marketing:</strong> Alcohol companies aggressively market in Kenya, including through sponsorship of music events, sports, and community activities that attract young people.</li>
              <li><strong>Cheap and accessible alcohol:</strong> The prevalence and low cost of local brews makes alcohol very accessible, including to minors.</li>
            </ul>
          </IssueCard>
          <IssueCard title="Effects of Alcohol Abuse">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Health effects:</strong> Liver disease (cirrhosis), pancreatitis, cardiovascular disease, neurological damage, increased cancer risk, weakened immune system. Alcohol is a Group 1 carcinogen — it causes cancer.</li>
              <li><strong>Mental health effects:</strong> Depression, anxiety disorders, cognitive impairment, increased suicide risk. Alcohol is a depressant — it worsens underlying mental health conditions.</li>
              <li><strong>Social effects:</strong> Family breakdown, domestic violence, child neglect, social isolation, loss of employment, homelessness.</li>
              <li><strong>Economic effects:</strong> Wasted household income on alcohol; reduced productivity; healthcare costs; absenteeism; crime.</li>
              <li><strong>Public safety effects:</strong> Drunk driving (a leading cause of road traffic accidents in Kenya); alcohol-related violence; crime.</li>
            </ul>
          </IssueCard>
          <IssueCard title="Addressing Alcohol Abuse">
            <p>Effective responses operate at multiple levels: <strong>individual</strong> (treatment through rehabilitation centres; motivational interviewing; Alcoholics Anonymous and peer support groups); <strong>community</strong> (community awareness campaigns; faith-based interventions; alternative livelihood programmes for at-risk youth); <strong>structural</strong> (regulation of alcohol advertising, particularly to minors; taxation to reduce affordability; enforcement of age restrictions; regulation of drinking hours); and <strong>policy</strong> (Kenya's Alcoholic Drinks Control Act provides a regulatory framework, though enforcement is inconsistent).</p>
          </IssueCard>

          <SectionHeading id="suicide" number="Section 5" title="Suicide" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4"><strong>Suicide</strong> is the act of intentionally ending one's own life. It is a complex public health problem with deep psychological, social, and environmental roots. It is never simply a personal choice — it is almost always the result of overwhelming suffering that has outrun a person's capacity to cope. Emile Durkheim's pioneering 1897 sociological study of suicide demonstrated that suicide rates are shaped by social forces, not just individual psychology.</p>
          <WarningBox><strong>Suicide in Kenya:</strong> Mental health problems, including suicidal ideation and behaviour, are a growing public health concern in Kenya. The WHO estimates that approximately 800,000 people die by suicide globally each year. In Kenya, suicide rates have been rising, particularly among young people — driven by academic pressure, unemployment, relationship breakdown, financial distress, and untreated mental illness. Men die by suicide at approximately 3–4 times the rate of women (though women attempt suicide more often).</WarningBox>
          <IssueCard title="Durkheim's Types of Suicide (Sociological Theory)">
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Egoistic suicide:</strong> Results from low social integration — when individuals are not sufficiently connected to their social group, they lose the sense of meaning and purpose that social bonds provide. Found in individualistic, secular societies. Explains higher suicide rates among single people and those who have lost community ties.</li>
              <li><strong>Altruistic suicide:</strong> Results from excessive social integration — the individual sacrifices their life for the group. Examples: soldiers dying in battle; elderly people ending their lives to avoid being a burden on their community.</li>
              <li><strong>Anomic suicide:</strong> Results from lack of social regulation — when social norms break down (anomie) and individuals lose their moral compass, the resulting disorientation and meaninglessness increases suicide risk. Particularly associated with economic crises, rapid social change, and divorce.</li>
            </ul>
          </IssueCard>
          <IssueCard title="Individual Risk Factors for Suicide">
            <ul className="list-disc list-inside space-y-1">
              <li>Mental illness — particularly depression, bipolar disorder, schizophrenia, and substance use disorders (present in approximately 90% of completed suicides)</li>
              <li>Previous suicide attempt (the single strongest predictor of future attempt)</li>
              <li>Family history of suicide or mental illness</li>
              <li>Exposure to trauma — abuse, neglect, loss, violence</li>
              <li>Chronic pain or serious physical illness</li>
              <li>Social isolation and loneliness</li>
              <li>Access to lethal means (particularly firearms, pesticides)</li>
            </ul>
          </IssueCard>
          <IssueCard title="Social and Environmental Risk Factors">
            <ul className="list-disc list-inside space-y-1">
              <li>Unemployment and financial crisis</li>
              <li>Academic failure or exam pressure (a significant driver among Kenyan students)</li>
              <li>Relationship breakdown — divorce, break-up, bereavement</li>
              <li>Social stigma and discrimination (LGBTQ+ individuals face particularly high suicide risk in stigmatising environments)</li>
              <li>Bullying and cyberbullying</li>
              <li>Exposure to suicide by others (contagion effect — suicide clusters in schools and communities)</li>
              <li>Poor access to mental health services — in Kenya, there are only approximately 100 psychiatrists for 55 million people</li>
            </ul>
          </IssueCard>
          <IssueCard title="Warning Signs and Prevention">
            <p className="mb-2"><strong>Warning signs:</strong> Talking about wanting to die or being a burden; expressing hopelessness; withdrawing from friends and activities; giving away possessions; increased alcohol or drug use; extreme mood swings; reckless behaviour.</p>
            <p className="mb-2"><strong>Prevention strategies:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Individual:</strong> Seek professional mental health support; reach out to trusted people; crisis lines (Kenya Red Cross helpline: 1199)</li>
              <li><strong>Community:</strong> Mental health awareness campaigns to reduce stigma; suicide survivor support groups; community mental health workers; gatekeeper training (teaching ordinary people to identify and respond to suicide risk)</li>
              <li><strong>Institutional:</strong> School counselling services; employee assistance programmes; integration of mental health into primary healthcare</li>
              <li><strong>Policy:</strong> Increased government investment in mental health services; training of healthcare workers in mental health; restriction of access to lethal means</li>
            </ul>
          </IssueCard>
          <ExplainerBox><strong>What to do if someone is at risk:</strong> Take it seriously — never dismiss talk of suicide as attention-seeking. Listen without judgment. Ask directly: "Are you thinking about ending your life?" Asking about suicide does not increase risk — it opens the door to help. Help them connect with professional support immediately. Stay with them until they are safe. Remove access to lethal means where possible. Follow up — don't assume the crisis has passed.</ExplainerBox>

          <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 12: Emerging Issues</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Corruption:</strong> abuse of entrusted power for private gain. Types: bribery, embezzlement, fraud, extortion, nepotism. Effects: diverts resources, erodes trust, perpetuates inequality.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Marriage:</strong> socially/legally recognised union. Types: monogamy, polygyny, polyandry, endogamy, exogamy. Challenges: domestic violence, divorce, early marriage, economic pressure.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Stress:</strong> response to demands exceeding coping capacity. Types: acute/chronic, individual/workplace. Management: exercise, sleep, counselling, social support, time management.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Alcohol abuse:</strong> drinking causing harm. Causes: stress, peer pressure, unemployment, genetics, cheap access. Effects: liver disease, family breakdown, violence, road accidents.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Suicide:</strong> complex problem rooted in overwhelming suffering. Durkheim: egoistic, altruistic, anomic. Risk factors: mental illness, isolation, trauma, financial crisis. Prevention: destigmatise, increase mental health access, gatekeeper training.</span></li>
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
