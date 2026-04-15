import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, CheckCircle2, AlertTriangle } from "lucide-react";

const sections = [
  { id: "intro", label: "1. Definition & Overview" },
  { id: "addiction", label: "2. Addiction & Dependence" },
  { id: "causes", label: "3. Causes & Risk Factors" },
  { id: "marijuana", label: "4. Marijuana/Cannabis" },
  { id: "cocaine", label: "5. Cocaine" },
  { id: "tobacco", label: "6. Tobacco & Nicotine" },
  { id: "alcohol", label: "7. Alcohol" },
  { id: "hallucinogens", label: "8. Hallucinogens" },
  { id: "inhalants", label: "9. Inhalants" },
  { id: "opioids", label: "10. Opioids" },
  { id: "signs", label: "11. Signs of Abuse" },
  { id: "complications", label: "12. Complications" },
  { id: "treatment", label: "13. Treatment & Rehab" },
  { id: "policy", label: "14. Kenya Government Policy" },
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
function WarnBox({ children }: { children: React.ReactNode }) {
  return <div className="my-4 flex gap-3 rounded-lg border border-red-300/40 bg-red-50 dark:bg-red-900/10 p-4"><AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" /><div className="text-sm text-foreground/80 leading-relaxed">{children}</div></div>;
}

function DrugCard({ name, badge, badgeColor, sections: drugSections }: {
  name: string; badge: string; badgeColor: string;
  sections: { heading: string; items: string[] | string }[];
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/50 overflow-hidden mb-5">
      <div className="px-5 py-3 border-b border-border/30 bg-muted/30 flex items-center gap-3">
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${badgeColor}`}>{badge}</span>
        <p className="font-bold text-foreground">{name}</p>
      </div>
      <div className="px-5 py-4 space-y-4">
        {drugSections.map(({ heading, items }) => (
          <div key={heading}>
            <p className="font-semibold text-foreground text-xs uppercase tracking-wide mb-2">{heading}</p>
            {typeof items === "string" ? (
              <p className="text-sm text-muted-foreground leading-relaxed">{items}</p>
            ) : (
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {items.map(i => <li key={i} className="flex gap-1.5 text-xs text-muted-foreground"><span className="text-primary mt-0.5">•</span>{i}</li>)}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HealthTopic2() {
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
      const current = sections.map(s => { const el = document.getElementById(s.id); return el ? { id: s.id, top: el.getBoundingClientRect().top } : null; }).filter(Boolean).filter(s => s!.top <= 120);
      if (current.length > 0) setActiveSection(current[current.length - 1]!.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionIndex = sections.findIndex(s => s.id === activeSection);
  const progress = Math.round(((sectionIndex + 1) / sections.length) * 100);

  return (
    <Layout breadcrumbs={[{ label: "Unit 4", href: "/" }, { label: "Drug & Substance Abuse" }]}>
      <Helmet>
        <title>Drug and Substance Abuse | Health Study Notes</title>
        <meta name="description" content="Comprehensive notes on drug and substance abuse — definitions, addiction, commonly abused drugs (marijuana, cocaine, tobacco, alcohol, hallucinogens, inhalants, opioids), treatment, rehabilitation, and Kenya government policy (NACADA)." />
      </Helmet>

      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>

          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Unit 4 · Health Sciences (UCCC 1102-05)</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Drug and Substance Abuse</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Drug abuse is one of the most complex and damaging public health challenges affecting individuals, families, and societies. These notes provide a comprehensive examination of drug abuse — its definitions, the science of addiction, a detailed study of the most commonly abused substances, how to recognise signs of abuse and addiction, the consequences, treatment and rehabilitation options, and Kenya's government policy framework for addressing the problem.
            </p>
          </div>

          {/* Section 1 */}
          <SectionHeading id="intro" number="Section 1" title="Definitions and Overview" />
          <div className="space-y-3 mb-5">
            {[
              ["Drug abuse", "The use of illegal drugs, or the use of prescription or over-the-counter medications in ways other than recommended or intended. It also includes the intentional inhalation of household or industrial chemicals for their mind-altering effects. Drug abuse, chemical abuse, and substance abuse are terms often used interchangeably."],
              ["Drug misuse", "Using a substance in a way that differs from the prescription or social norms — for example, taking a larger dose of a prescribed painkiller than recommended, or using someone else's prescription medication. Misuse may not involve the same level of harmful dependence as abuse."],
              ["Addiction / Dependence", "A chronic, relapsing disorder characterised by compulsive drug seeking, continued use despite harmful consequences, and long-lasting changes in the brain. Addiction is both a physical and psychological condition — the brain changes, and so does the person's behaviour, priorities, and relationships. It is classified as a disease by the medical community."],
              ["Tolerance", "A phenomenon where, with repeated drug use, the same dose produces a diminishing effect — requiring progressively larger doses to achieve the same 'high' or relief. Tolerance is a hallmark of developing physical dependence."],
              ["Withdrawal", "The set of physical and psychological symptoms that occur when a physically dependent person stops or significantly reduces drug use. Withdrawal symptoms are often the opposite of the drug's effects — e.g., stimulant withdrawal causes fatigue and depression; opioid withdrawal causes pain and anxiety. Severe withdrawal can be life-threatening (alcohol and benzodiazepines)."],
              ["Psychoactive drug", "Any chemical substance that crosses the blood-brain barrier and affects brain function — altering mood, perception, consciousness, cognition, or behaviour. All abused substances are psychoactive."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <ExplainerBox>
            <strong>Two main theories of drug abuse causation:</strong> (1) <strong>Genetic/biological predisposition</strong> — some people inherit a biological vulnerability to addiction (genetic factors account for approximately 40–60% of addiction risk). (2) <strong>Learned habit</strong> — drug use is a behaviour that can be learned from environment, peers, and family; if addiction develops, it manifests as a chronic, debilitating disease that progressively worsens without intervention.
          </ExplainerBox>

          {/* Section 2 */}
          <SectionHeading id="addiction" number="Section 2" title="Addiction and Dependence — Signs and Progression" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            Substance abuse progresses to substance <strong>dependence</strong> (addiction) when the amount of substance used and the rate of use increase over time, and when the person feels <strong>unable to control the impulse to use</strong>. The brain physically changes — neurons rewire around the drug — making the desire to use feel as urgent as hunger or thirst.
          </p>
          <h3 className="font-semibold text-foreground text-base mb-3">Signs that Abuse Has Become Addiction</h3>
          <div className="grid md:grid-cols-2 gap-2 mb-5">
            {[
              "Increasing tolerance — needing more drug to get the same effect",
              "Requiring the substance throughout the day to function",
              "Seeking out other drug users; cutting off non-using friends",
              "Dismissing or resenting concern expressed by loved ones",
              "Avoiding other activities; failing to meet obligations at work, school, or home",
              "Experiencing withdrawal symptoms when the drug is unavailable",
              "Hiding drug use from family and friends — secretiveness",
              "Binging — using heavily for many hours or several days",
              "Feeling completely unable to quit despite wanting to",
              "Continuing to use even when fully aware of the harm it is causing",
            ].map(s => (
              <div key={s} className="flex gap-2 rounded-lg border border-border/40 bg-card/30 p-3">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-foreground/80 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">Warning Signs of Abuse in Family Members</h3>
          <div className="space-y-2 mb-4">
            {[
              ["Problems at school or work", "Frequently missing school or work, sudden disinterest in academic or work activities, significant drop in grades or performance."],
              ["Physical health changes", "Unexplained weight loss or gain, lack of energy and motivation, red or glazed eyes, unusual smell on breath or clothes."],
              ["Neglected appearance", "Loss of interest in personal hygiene, clothing, or grooming — a visible deterioration in self-care."],
              ["Behavioural changes", "Extreme efforts to prevent family members from entering their room; secretive about where they go; drastic changes in relationships with family and friends; mood swings; aggressive or paranoid behaviour."],
              ["Money issues", "Sudden, unexplained requests for money; money or valuables disappearing from the household; selling personal possessions to fund drug use."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-3">
                <p className="font-semibold text-foreground text-sm mb-0.5">{t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Section 3 */}
          <SectionHeading id="causes" number="Section 3" title="Causes and Risk Factors" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">Drug abuse does not arise from a single cause — it results from the interaction of multiple biological, psychological, social, and environmental factors:</p>
          <div className="space-y-3 mb-5">
            {[
              ["Family history of addiction", "Drug addiction runs in families — genetic factors account for approximately 40–60% of addiction vulnerability. If a parent or sibling has struggled with addiction, the risk for other family members is significantly elevated. Some genes affect how a person metabolises drugs or experiences their pleasurable effects, influencing the likelihood of developing dependence."],
              ["Underlying mental health disorders", "Research consistently shows that the vast majority of people with drug addiction have an underlying mental health condition — depression, anxiety, PTSD, ADHD, schizophrenia, or bipolar disorder. About 50% of people with mental health diagnoses will face drug or alcohol challenges at some point, often using substances to 'self-medicate' painful emotions. This co-occurrence is called 'dual diagnosis' or 'comorbidity.'"],
              ["Peer pressure", "A powerful driver especially among adolescents and young adults. The desire to fit in, belong, and be accepted by peers can override rational risk assessment. Social environments where drug use is normalised make it far more likely that individuals will experiment — and potentially develop addiction."],
              ["Early life trauma and adverse experiences", "Childhood trauma — physical or sexual abuse, neglect, domestic violence, parental incarceration, household substance abuse — dramatically increases vulnerability to addiction in adulthood. People use drugs as a way of coping with overwhelming emotional pain when they lack healthier coping strategies."],
              ["Early onset of drug use", "Beginning drug use during adolescence is a major risk factor for addiction. The adolescent brain is still developing (the prefrontal cortex — the seat of decision-making, impulse control, and judgement — is not fully mature until the mid-20s). Drugs have more powerful neurological effects on developing brains, and early exposure is associated with significantly higher rates of lifetime addiction."],
              ["Lack of family involvement and supervision", "Weak family bonds, poor parental supervision, lack of consistent boundaries, and family conflict all increase addiction risk. Strong family relationships and parental engagement are among the most powerful protective factors against drug abuse."],
              ["Accessibility and availability", "The easier it is to access a drug, the more likely people — especially young people — are to use it. This is why restricting access (through taxation, licensing, age restrictions, and law enforcement) is a key component of drug control policy."],
              ["Method of administration", "Smoking or injecting drugs produces a faster, more intense high than swallowing or snorting — and faster onset is associated with higher addiction potential. This is why route of administration matters in addiction medicine."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Section 4 */}
          <SectionHeading id="marijuana" number="Section 4" title="Commonly Abused Drug 1 — Marijuana / Cannabis" />
          <DrugCard
            name="Marijuana / Cannabis (Bangi in Kenya)"
            badge="Stimulant + Depressant"
            badgeColor="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
            sections={[
              { heading: "What it is & how used", items: "Cannabis (from the plant Cannabis sativa) is the most widely used illicit drug globally and in Kenya. The active ingredient is THC (tetrahydrocannabinol). It is smoked (in joints, pipes, or bongs), eaten (in cakes, biscuits — 'edibles'), or inhaled as vapour. Cannabis is often the first illicit drug tried and is frequently used alongside alcohol or other substances. In Kenya, it is commonly known as 'bangi' or 'ganja.'" },
              { heading: "Short-term signs and symptoms", items: ["Sense of euphoria or feeling 'high'", "Heightened sensory perception (colours, sounds, tastes)", "Increased heart rate and blood pressure", "Red, bloodshot eyes", "Dry mouth", "Decreased coordination and balance", "Slowed reaction time", "Difficulty concentrating and remembering", "Anxiety or paranoid thinking", "Exaggerated food cravings at unusual times"] },
              { heading: "Long-term chronic effects", items: ["Decreased mental sharpness and cognitive function", "Poor performance at school or work", "Social withdrawal — fewer friends, narrower interests", "Increased risk of respiratory problems (similar to tobacco smoking)", "Decreased sperm count and testosterone in men", "Increased risk of depression, anxiety, and psychosis (especially with heavy early use)", "Amotivational syndrome — loss of drive and ambition"] },
              { heading: "Effects on the brain", items: "THC enters the bloodstream and reaches the brain rapidly, where it binds to cannabinoid receptors (CB1 receptors) in areas controlling pleasure, memory, thinking, concentration, coordination, and time perception. It floods the brain's reward circuit with dopamine, producing the characteristic 'high.' With heavy, long-term use, the brain reduces the number of cannabinoid receptors — contributing to tolerance and a blunted reward response." },
              { heading: "Mental health link", items: "Studies consistently link heavy cannabis use — particularly beginning in adolescence — with increased rates of depression, anxiety, schizophrenia, and other psychotic disorders. THC can trigger acute psychotic episodes even in people with no prior psychiatric history. The earlier the onset of regular use, the higher the risk." },
              { heading: "Kenyan context", items: "Kenya's NACADA surveys consistently identify cannabis as the most widely abused illicit substance in Kenya, especially among youth. It is cultivated in several counties (including parts of Coast, Nyanza, and Eastern regions). Despite being illegal, it is relatively cheap and accessible. The National Authority for the Campaign Against Alcohol and Drug Abuse (NACADA) manages demand and supply reduction efforts." },
            ]}
          />

          {/* Section 5 */}
          <SectionHeading id="cocaine" number="Section 5" title="Commonly Abused Drug 2 — Cocaine" />
          <DrugCard
            name="Cocaine (including Crack Cocaine)"
            badge="Powerful Stimulant"
            badgeColor="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
            sections={[
              { heading: "What it is & how used", items: "Cocaine is a powerfully addictive central nervous system stimulant derived from the coca plant. It comes in two main forms: powdered cocaine hydrochloride (snorted through the nose, or dissolved and injected) and crack cocaine (a freebase form processed into a rock crystal and smoked — the name comes from the crackling sound when heated). Crack produces a faster, more intense, but shorter-lived high than powdered cocaine, making it extremely addictive." },
              { heading: "Effects on the brain", items: "Cocaine acts by blocking the reuptake of dopamine in the brain's reward circuit, causing massive dopamine build-up. This produces an intense but short-lived euphoria and burst of energy. With repeated use, the brain reduces its own dopamine production and receptor sensitivity — requiring more cocaine to achieve any pleasure, and making everyday pleasures feel dull and joyless (anhedonia)." },
              { heading: "Short-term effects", items: ["Intense euphoria and increased energy", "Mental alertness and confidence", "Reduced appetite and fatigue", "Increased heart rate, blood pressure, body temperature", "Constricted blood vessels, dilated pupils", "Headaches and abdominal pain", "Paranoia and anxiety (with high doses)", "Binge use pattern — repeated doses to maintain the high"] },
              { heading: "Route-specific harms", items: ["Snorting: loss of smell, nosebleeds, nasal septum damage, hoarseness, swallowing problems", "Injecting: vein damage, risk of HIV/Hepatitis C, severe allergic reactions", "Smoking (crack): lung damage, rapid addiction, cardiovascular emergency risk", "All routes: heart attack, stroke, seizures — sometimes fatal"] },
              { heading: "Cocaethylene — poly-drug danger", items: "When cocaine and alcohol are used together, the liver produces a third substance — cocaethylene — which intensifies cocaine's euphoric effects but is associated with significantly higher risk of sudden death than either substance alone. This is a common and extremely dangerous combination." },
              { heading: "Withdrawal and treatment", items: "Cocaine withdrawal involves depression, anxiety, fatigue, difficulty concentrating, increased hunger, and intense drug cravings — but is not usually physically dangerous. No FDA-approved medications exist for cocaine addiction. Cognitive-behavioural therapy (CBT) is the most evidence-based treatment. Inpatient rehabilitation may be required for severe cases." },
            ]}
          />

          {/* Section 6 */}
          <SectionHeading id="tobacco" number="Section 6" title="Commonly Abused Drug 3 — Tobacco and Nicotine" />
          <DrugCard
            name="Tobacco / Nicotine"
            badge="Stimulant / Highly Addictive"
            badgeColor="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
            sections={[
              { heading: "What it is & how used", items: "Tobacco is a plant whose dried, fermented leaves contain nicotine — one of the most addictive substances known. It is smoked (cigarettes, cigars, pipes, kreteks, bidis, hookah/shisha), chewed (snuff, snus, chewing tobacco), or sniffed. E-cigarettes/vapes deliver nicotine in aerosol form. Tobacco is a legal drug but is responsible for more preventable deaths globally than any other substance." },
              { heading: "How nicotine affects the brain", items: "Nicotine is rapidly absorbed into the bloodstream and reaches the brain within seconds of inhalation. It stimulates the adrenal glands (releasing adrenaline) and activates the brain's reward circuits, increasing dopamine levels — producing feelings of pleasure, alertness, and relaxation. Nicotine also increases heart rate, blood pressure, and breathing rate. Tolerance develops rapidly, requiring more tobacco to achieve the same effect." },
              { heading: "Health effects of tobacco", items: ["Lung cancer — the leading cause (tobacco causes 85% of lung cases)", "Chronic obstructive pulmonary disease (COPD) — emphysema, chronic bronchitis", "Heart disease, stroke, and peripheral artery disease", "Mouth, throat, larynx, oesophageal, bladder, kidney, and colorectal cancers", "Type 2 diabetes, leukemia, cataracts, pneumonia", "Impotence and reproductive problems in men", "Premature ageing of the skin"] },
              { heading: "Secondhand smoke", items: "Non-smokers who regularly inhale secondhand (passive) smoke are at significantly elevated risk of lung cancer, heart disease, and respiratory infections. Children are especially vulnerable — secondhand smoke causes asthma attacks, ear infections, pneumonia, and sudden infant death syndrome (SIDS) in exposed children." },
              { heading: "Pregnancy risks", items: "Smoking during pregnancy increases risks of miscarriage, stillbirth, premature birth, low birth weight, and foetal alcohol syndrome-like developmental problems. The nicotine and carbon monoxide in tobacco smoke restrict foetal oxygen supply and growth." },
              { heading: "Cessation treatments", items: ["Nicotine Replacement Therapy (NRT): patches, gum, lozenges, inhalers, nasal sprays — deliver controlled nicotine to reduce withdrawal", "Bupropion (Zyban): antidepressant that reduces cravings and withdrawal", "Varenicline (Chantix): blocks nicotine receptors in the brain, reducing pleasure from smoking and withdrawal symptoms", "Behavioural counselling: most effective when combined with medication — identifies triggers, develops coping strategies, provides support"] },
            ]}
          />

          {/* Section 7 */}
          <SectionHeading id="alcohol" number="Section 7" title="Commonly Abused Drug 4 — Alcohol" />
          <DrugCard
            name="Alcohol (Ethyl Alcohol / Ethanol)"
            badge="CNS Depressant"
            badgeColor="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400"
            sections={[
              { heading: "What it is", items: "Alcohol (ethanol) is a CNS depressant produced by the fermentation of sugars. It is the world's most widely used psychoactive substance and is legal in most countries. In Kenya, both formal (beer, spirits, wine) and informal/illicit alcohol (chang'aa, busaa) are widely consumed. Illicit alcohol carries additional dangers — it may be adulterated with methanol, which causes blindness and death." },
              { heading: "Short-term effects", items: ["Lowered inhibitions and impaired judgement", "Loss of coordination and balance", "Slurred speech and slowed reaction times", "Blurred or double vision", "Mood swings — from euphoria to aggression", "Nausea and vomiting", "Blackouts (memory gaps)", "Increased risk-taking (unprotected sex, drink driving)"] },
              { heading: "Alcohol poisoning (acute overdose)", items: ["Confusion and stupor", "Nausea and uncontrollable vomiting", "Slowed or irregular breathing (< 8 breaths/min)", "Blue-tinged or pale skin (cyanosis)", "Low body temperature (hypothermia)", "Seizures", "Unconsciousness — MEDICAL EMERGENCY"] },
              { heading: "Long-term effects on major organs", items: ["Liver: fatty liver → alcoholic hepatitis → cirrhosis → liver cancer", "Brain: loss of grey and white matter, memory loss, dementia (Wernicke-Korsakoff syndrome from thiamine deficiency)", "Heart: cardiomyopathy, irregular heartbeat, high blood pressure, stroke", "Pancreas: pancreatitis (painful, life-threatening inflammation)", "Digestive system: gastric ulcers, oesophageal cancer, nutrient malabsorption", "Reproductive system: erectile dysfunction, irregular menstruation, infertility", "Bones: calcium imbalance → osteoporosis → increased fracture risk"] },
              { heading: "Psychological effects", items: "Alcohol is a CNS depressant, yet at low doses it appears stimulating because it first suppresses the inhibitory parts of the brain. With heavier use, sedative effects dominate. Chronic use is strongly linked to depression, anxiety, bipolar disorder, and alcohol-induced psychosis. Alcohol-use disorder (AUD) frequently co-occurs with other mental health conditions." },
              { heading: "Kenyan context", items: "Alcohol abuse is a major public health problem in Kenya. Illicit brew (chang'aa, busaa) tragedies — where drinkers are killed or blinded by methanol-contaminated alcohol — occur regularly, particularly in low-income urban areas. Kenya's Alcoholic Drinks Control Act (2010) regulates alcohol sale, licensing, and advertising. NACADA coordinates national alcohol and drug abuse prevention programmes." },
            ]}
          />

          <WarnBox>
            <strong>Binge drinking in Kenya:</strong> NACADA surveys show that binge drinking (consuming large amounts of alcohol in a single session) is common among young Kenyan men. A blood alcohol concentration (BAC) of 0.08 g/dL or above — reached after about 4–5 drinks in 2 hours — constitutes legal intoxication. At BAC 0.30+ g/dL, unconsciousness and respiratory arrest become life-threatening risks.
          </WarnBox>

          {/* Section 8 */}
          <SectionHeading id="hallucinogens" number="Section 8" title="Commonly Abused Drug 5 — Hallucinogens" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">Hallucinogens are a class of drugs that alter a user's awareness of their surroundings, thoughts, and feelings — producing hallucinations (experiences of things that seem real but are not). The most commonly abused hallucinogens are LSD (lysergic acid diethylamide) and PCP (phencyclidine).</p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-border/30 bg-muted/30"><p className="font-semibold text-foreground text-sm">LSD ('Acid')</p></div>
              <ul className="px-4 py-3 space-y-1">
                {["Visual, auditory, and tactile hallucinations", "Synesthesia (hearing colours, seeing sounds)", "Greatly distorted perception of reality", "Rapid, intense mood shifts — from euphoria to terror ('bad trip')", "Rapid heart rate and elevated blood pressure", "Tremors", "Flashbacks — re-experiencing hallucinations days or years later", "Permanent changes in perception (HPPD)", "Impulsive, dangerous behaviour during a 'trip'"].map(i => <li key={i} className="flex gap-1.5 text-xs text-muted-foreground"><span className="text-primary">•</span>{i}</li>)}
              </ul>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
              <div className="px-4 py-3 border-b border-border/30 bg-muted/30"><p className="font-semibold text-foreground text-sm">PCP (Phencyclidine / 'Angel Dust')</p></div>
              <ul className="px-4 py-3 space-y-1">
                {["Dissociation — feeling detached from body and surroundings", "Hallucinations", "Extreme agitation and aggressive, violent behaviour", "Involuntary eye movements (nystagmus)", "Lack of pain sensation (dangerous — self-injury without awareness)", "Elevated blood pressure and heart rate", "Problems with coordination and movement", "Severe confusion, memory problems", "Seizures and coma at high doses"].map(i => <li key={i} className="flex gap-1.5 text-xs text-muted-foreground"><span className="text-primary">•</span>{i}</li>)}
              </ul>
            </div>
          </div>
          <NoteBox>
            Hallucinogen use is associated with a heightened risk of accidents and injuries during the altered-consciousness state. There are no approved medications for hallucinogen addiction — treatment focuses on psychotherapy and supportive care for psychological consequences.
          </NoteBox>

          {/* Section 9 */}
          <SectionHeading id="inhalants" number="Section 9" title="Commonly Abused Drug 6 — Inhalants" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">
            Inhalants are household or industrial chemicals that produce psychoactive effects when inhaled. They are particularly dangerous because they are cheap, legal, and easily accessible — making them common among street children and impoverished youth. In Kenya, glue sniffing is a well-documented problem among street children in cities like Nairobi, Mombasa, and Kisumu.
          </p>
          <div className="space-y-2 mb-4">
            {[
              ["Commonly inhaled substances", "Glue (contact adhesive), paint thinners, correction fluid (typewriter fluid), felt-tip marker fluid, petrol/gasoline, cleaning fluids, aerosol sprays (deodorant, hairspray), cooking spray, nitrous oxide (laughing gas)."],
              ["Effects and signs", "Brief euphoria or intoxication; decreased inhibition; dizziness; nausea and vomiting; involuntary eye movements; slurred speech; slow movements and poor coordination; irregular heartbeat; tremors; rash around nose and mouth; lingering chemical odour."],
              ["Extreme dangers", "Inhalants are uniquely dangerous because they can cause 'Sudden Sniffing Death Syndrome' — cardiac arrest on the first use, without warning, due to the toxic effect of the chemicals on the heart. They also cause permanent brain damage (cognitive impairment, personality changes), liver and kidney damage, and hearing and vision loss with chronic use."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-red-300/40 bg-red-50/20 dark:bg-red-900/10 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Section 10 */}
          <SectionHeading id="opioids" number="Section 10" title="Commonly Abused Drug 7 — Opioids" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">Opioids are narcotic, painkilling drugs derived from opium (from the poppy plant) or synthetically manufactured. They include heroin (illicit), and morphine, codeine, methadone, and oxycodone (pharmaceutical). They are extremely physically addictive and the leading cause of overdose deaths worldwide.</p>
          <div className="space-y-3 mb-4">
            {[
              ["How opioids work", "Opioids bind to mu-opioid receptors in the brain, spinal cord, and gut — blocking pain signals and flooding the reward system with dopamine. They produce powerful analgesia (pain relief), euphoria, sedation, and relaxation. With repeated use, the brain rapidly reduces receptor sensitivity, causing tolerance — and extreme physical dependence that drives continued use to avoid agonising withdrawal."],
              ["Signs and symptoms of opioid use", "Dramatically reduced sense of pain; agitation alternating with drowsiness; slurred speech; constricted ('pinpoint') pupils; slowed breathing; constipation; confusion; problems with coordination; depression; runny nose (if snorted) or track marks on arms (if injected)."],
              ["Opioid overdose — a medical emergency", "Opioid overdose causes respiratory depression — breathing slows to the point of stopping entirely, causing brain damage and death within minutes. Signs: unresponsive, unconscious, slow/shallow/stopped breathing, blue lips or fingertips, gurgling sound ('death rattle'). NALOXONE (Narcan) — an opioid antagonist — can reverse overdose if given quickly. In Kenya, naloxone is available at harm reduction centres and some hospitals."],
              ["Heroin and Kenya's coast", "Heroin abuse is a significant problem in Kenya's coastal region (Mombasa, Kilifi, Kwale) and Nairobi, partly related to Kenya's position as a transit route for Afghan heroin flowing through East Africa. Injecting drug users (IDUs) are a key population for HIV in Kenya, due to needle sharing."],
              ["Treatment", "Opioid Use Disorder (OUD) is treated with opioid substitution therapy (OST) — methadone or buprenorphine. These longer-acting opioids prevent withdrawal, reduce cravings, and block the effects of illicit opioids, allowing people to stabilise their lives and engage with recovery. In Kenya, the Coast General Hospital and Mathare Hospital have been pioneers in methadone treatment. Behavioural therapy (CBT, contingency management) is combined with OST for best outcomes."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Section 11 */}
          <SectionHeading id="signs" number="Section 11" title="General Signs and Symptoms of Drug Abuse and Addiction" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">Beyond the drug-specific signs listed above, general signs that a person is abusing drugs include:</p>
          <div className="grid md:grid-cols-2 gap-2 mb-5">
            {[
              "Feeling compelled to use the drug regularly — daily or several times a day",
              "Intense drug cravings that overwhelm and block all other thoughts",
              "Needing more of the drug over time to get the same effect (tolerance)",
              "Taking larger amounts over longer periods than originally intended",
              "Spending significant time and energy obtaining, using, and recovering from the drug",
              "Neglecting work, school, family, or social responsibilities",
              "Continuing to use despite knowing it is causing harm",
              "Engaging in criminal behaviour (theft, fraud) to fund drug use",
              "Driving or engaging in risky activities while under the influence",
              "Repeatedly failing to stop using despite genuine attempts",
              "Experiencing withdrawal symptoms when stopping",
              "Balance problems, falls, impaired coordination",
              "Pupil size changes (very large or very small, drug-dependent)",
              "Short-term memory loss or blackouts",
              "Slurred speech or excessive talkativeness",
              "Nausea, vomiting, mood swings, impaired vision",
            ].map(s => (
              <div key={s} className="flex gap-2 rounded border border-border/40 bg-card/30 p-2">
                <span className="text-amber-500 text-xs mt-0.5">▸</span>
                <p className="text-xs text-foreground/80">{s}</p>
              </div>
            ))}
          </div>

          {/* Section 12 */}
          <SectionHeading id="complications" number="Section 12" title="Complications of Drug Abuse" />
          <div className="space-y-2 mb-5">
            {[
              ["Communicable diseases", "People who inject drugs are at dramatically elevated risk of HIV, Hepatitis B, and Hepatitis C through needle sharing. Those who abuse drugs that lower inhibitions (alcohol, cannabis) are more likely to engage in unprotected sex, also increasing HIV and STI risk."],
              ["Physical health damage", "Every organ system can be affected — heart (cardiomyopathy, arrhythmia, infection of heart valves), liver (cirrhosis, hepatitis, cancer), lungs (infections, cancer, COPD), brain (cognitive impairment, stroke, dementia), kidneys (failure), and reproductive system (infertility, foetal damage)."],
              ["Fatal overdose", "Drug overdose can cause respiratory arrest, cardiac arrest, or seizures leading to death. Opioid and alcohol overdose are the most common fatal overdoses. In Kenya, deaths from illicit brew (poisoned chang'aa) are periodically reported."],
              ["Mental health disorders", "Drug abuse causes and worsens depression, anxiety, psychosis, and personality disorders. The relationship is bidirectional — mental illness increases drug use risk, and drug use worsens mental illness."],
              ["Accidents and violence", "People under the influence of drugs are more likely to cause road traffic accidents, workplace accidents, and become victims or perpetrators of violence. Drunk driving is a leading cause of road deaths in Kenya."],
              ["Family breakdown", "Addiction profoundly disrupts family relationships — marital conflict, divorce, child neglect, and domestic violence are all associated with household substance abuse. Children raised in substance-abusing households have elevated risks of psychological problems and addiction themselves."],
              ["Legal consequences", "Arrest and prosecution for possession or supply of illegal drugs, driving under the influence, or crimes committed to fund addiction (theft, robbery) can result in imprisonment, criminal records, and loss of employment and professional licences."],
              ["Financial ruin", "Addiction is expensive — people may exhaust savings, lose employment, fall into debt, and ultimately into destitution to fund their addiction."],
              ["Suicide", "People with substance use disorders die by suicide at significantly higher rates than the general population. The despair of addiction, co-occurring mental illness, and the chaotic circumstances it creates all elevate suicide risk."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Section 13 */}
          <SectionHeading id="treatment" number="Section 13" title="Treatment of Addiction and Rehabilitation" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">There is no single cure for drug addiction, but a range of evidence-based interventions — used in combination — can help people achieve and maintain recovery. Treatment must be tailored to the individual's drug(s) of use, co-occurring mental health conditions, and life circumstances. Long-term follow-up is essential to prevent relapse.</p>
          <div className="space-y-3 mb-4">
            {[
              { t: "Detoxification (Detox / Withdrawal Therapy)", d: "The medically supervised process of safely stopping or tapering drug use and managing withdrawal symptoms. For some drugs (alcohol, benzodiazepines, opioids), withdrawal can be medically dangerous and must be conducted in a hospital or residential setting. Detox alone is NOT addiction treatment — it is only the first step. Without follow-up behavioural and psychosocial treatment, relapse rates after detox alone are extremely high." },
              { t: "Medications for Addiction Treatment (MAT)", d: "Medications are available for some addictions: Opioid Use Disorder — methadone, buprenorphine, or naltrexone (reduces cravings and blocks opioid effects); Alcohol Use Disorder — naltrexone (reduces cravings), acamprosate (reduces withdrawal discomfort), disulfiram (causes sickness if alcohol consumed); Tobacco — nicotine replacement therapy, bupropion, varenicline. No medications are approved for cocaine, cannabis, or methamphetamine addiction — treatment is behavioural." },
              { t: "Cognitive-Behavioural Therapy (CBT)", d: "The most evidence-based psychological treatment for addiction. CBT helps people: identify the thoughts, feelings, and situations that trigger drug use; develop coping strategies to deal with cravings and high-risk situations without using drugs; challenge and change distorted thinking patterns that maintain addiction; build problem-solving skills and communication skills; and prevent relapse by anticipating challenges." },
              { t: "12-Step Programmes and Self-Help Groups", d: "Programmes like Narcotics Anonymous (NA), Alcoholics Anonymous (AA), and Crystal Meth Anonymous use a 12-step model of recovery, peer support, and the concept of addiction as a chronic disorder requiring ongoing management. Self-help groups reduce shame, isolation, and stigma — powerful barriers to recovery — and provide community and accountability. Group members share experiences, strength, and hope, helping each other stay clean." },
              { t: "Inpatient vs. Outpatient Treatment", d: "Inpatient (residential) treatment: person lives at a treatment centre for 28–90 days or longer, separated from the drug-using environment. Appropriate for severe addiction, co-occurring disorders, or lack of stable home environment. Outpatient treatment: person attends counselling and treatment sessions while continuing to live at home. Appropriate for less severe addiction or as step-down care after inpatient. In Kenya, NACADA has worked to expand and standardise treatment and rehabilitation facilities, including developing Kenya National Standards for T&R facilities." },
              { t: "Long-Term Coping and Relapse Prevention", d: "Recovery is a lifelong process. Relapse (returning to drug use after a period of abstinence) is common and should be understood as a feature of a chronic disease, not a moral failure. Relapse prevention involves: maintaining a strong support network; continuing therapy and support group attendance; avoiding high-risk environments and people associated with past drug use; addressing underlying mental health issues; and having a plan for what to do if relapse occurs (seek help immediately, don't give up)." },
            ].map(({ t, d }) => (
              <div key={t} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30"><p className="font-semibold text-foreground text-sm">{t}</p></div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Section 14 */}
          <SectionHeading id="policy" number="Section 14" title="Kenya Government Policy — NACADA and the Drug Control Framework" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            The Government of Kenya recognises alcohol and drug abuse (ADA) as a major threat to national development. The primary coordinating body is <strong>NACADA (National Authority for the Campaign Against Alcohol and Drug Abuse)</strong>, established under the NACADA Act (Cap 243A). Kenya's approach operates on two fronts: <strong>demand reduction</strong> (reducing the desire and motivation to use drugs) and <strong>supply suppression</strong> (reducing the availability of drugs).
          </p>

          <h3 className="font-semibold text-foreground text-base mb-3">Demand Reduction Measures</h3>
          <div className="space-y-2 mb-4">
            {[
              "Sustained public education and awareness campaigns — including mass media campaigns targeting youth in and out of school",
              "Implementation of life skills programmes for youth and vulnerable groups in schools and communities",
              "Expansion and networking of treatment and rehabilitation facilities, with national quality standards",
              "Stakeholder engagement with Civil Society, Faith-Based Organisations, and Youth Organisations at national and county levels",
              "Community-centred programmes as the basic focus of successful ADA campaigns",
              "Inter-agency collaboration through public-sector committees at national and county levels to enforce alcohol and drug legislation",
              "Research and surveillance on new and emerging drug trends — including establishment of a National Drug Observatory at NACADA (with UNODC support) as a central repository for drug-related surveys",
              "Institutionalisation of ADA reporting in public and private sectors",
              "Biannual Report on the Status of ADA in Kenya to Parliament, developed jointly with national and county governments",
              "Evidence-based prevention interventions: family-based, community-based, school-based, workplace-based, and media-based programmes",
              "A 24-hour toll-free call centre providing counselling and support for persons with substance use disorders and their families",
            ].map(s => (
              <div key={s} className="flex gap-2 rounded border border-border/40 bg-card/30 p-3">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                <p className="text-xs text-foreground/80 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">Supply Suppression Measures</h3>
          <div className="space-y-2 mb-4">
            {[
              "Ongoing development, implementation, and review of policies and legislation on alcohol and drug control at national and county levels",
              "Multi-agency border control and transit point surveillance — with infrastructure, systems, and capacity building — to address drug trafficking, production, and infiltration of counterfeit drugs",
              "Enforcement of laws regulating precursor chemicals (chemicals used to manufacture illicit drugs) to ensure they are used only for legitimate purposes",
              "Quality and safety standards for all psychoactive substances through relevant ministries, departments, and agencies",
              "Key legislation: The Narcotic Drugs and Psychotropic Substances (Control) Act, 1994; The Alcoholic Drinks Control Act, 2010 (currently under review to strengthen devolved licensing and control functions); NACADA Act (Cap 243A)",
              "Inclusion of addiction treatment coverage under the National Hospital Insurance Fund (NHIF) — recognising addiction as a health condition requiring medical treatment",
              "Building a pool of trained prevention and treatment professionals through regular training programmes in collaboration with international partners",
            ].map(s => (
              <div key={s} className="flex gap-2 rounded border border-border/40 bg-card/30 p-3">
                <CheckCircle2 className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                <p className="text-xs text-foreground/80 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>

          <h3 className="font-semibold text-foreground text-base mb-3">Continuing Challenges in Kenya</h3>
          <div className="space-y-2 mb-5">
            {[
              "Poor access and unaffordability of Universal Health Care for poor and vulnerable populations",
              "Lack of harmonised policies and legislation across sectors — leading to policy gaps and disjointed responses",
              "Weak enforcement of laws — gaps in the criminal justice system, including lack of alternatives to incarceration for ADA offences",
              "Proliferation of licit and illicit drugs, counterfeit drugs, and drug trafficking",
              "Inadequate funding for alcohol and drug control programmes",
              "Insufficient treatment and rehabilitation facilities, especially outside major cities",
              "Lack of data on drug-related mortality and morbidity to inform evidence-based policy",
              "Emerging drug trends — new psychoactive substances (NPS), non-medical use of pharmaceutical drugs",
              "Ease of availability and accessibility of substances, particularly among youth",
              "Social complacence and tolerance towards substance use — reducing political will and community action",
              "Poor enforcement of alcohol advertising regulations — alcohol adverts airing during prime time TV despite regulations",
              "Inadequate monitoring and evaluation systems to track the impact of ADA interventions",
            ].map(s => (
              <div key={s} className="flex gap-2 rounded border border-amber-300/40 bg-amber-50/20 dark:bg-amber-900/10 p-3">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-xs text-foreground/80 leading-relaxed">{s}</p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Drug and Substance Abuse</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              {[
                "Drug abuse = using illegal drugs or misusing legal substances. Addiction = compulsive use despite consequences, driven by brain changes.",
                "Key signs of addiction: tolerance (needing more), withdrawal (symptoms when stopping), inability to control use, neglect of responsibilities.",
                "Causes: genetic predisposition (~40–60% of risk), mental health disorders, peer pressure, early use, trauma, family factors, availability.",
                "Marijuana (THC): euphoria, red eyes, coordination loss; long-term: cognitive decline, mental illness risk, lung damage.",
                "Cocaine: intense short euphoria via dopamine block; cardiovascular emergencies, paranoia; no approved medications — use CBT.",
                "Tobacco/Nicotine: highly addictive, responsible for lung cancer, COPD, heart disease; treat with NRT, bupropion, varenicline + counselling.",
                "Alcohol (CNS depressant): short-term — impaired judgement; long-term — liver cirrhosis, brain damage, heart disease, cancer. Illicit brew (chang'aa) is a Kenyan-specific danger.",
                "Hallucinogens (LSD/PCP): distorted reality, hallucinations, violence risk, flashbacks. Inhalants: cheap, accessible, can cause sudden death.",
                "Opioids: extremely addictive, overdose causes respiratory arrest (give naloxone). Treat with methadone/buprenorphine (OST) + CBT.",
                "Treatment: Detox (first step only) → MAT (medications) → CBT → 12-step support → long-term follow-up. Relapse is common — not failure.",
                "Kenya policy: NACADA coordinates demand reduction (education, treatment, counselling) and supply suppression (legislation, border control). Key laws: Narcotic Drugs Act (1994), Alcoholic Drinks Control Act (2010).",
              ].map((item, i) => (
                <li key={i} className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span>{item}</span></li>
              ))}
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
