import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, CheckCircle2, AlertTriangle } from "lucide-react";

const sections = [
  { id: "intro",        label: "1. What is Health Education?" },
  { id: "objectives",  label: "2. Objectives of Health Education" },
  { id: "value",       label: "3. Value of Health Education" },
  { id: "determinants",label: "4. WHO Determinants of Health" },
  { id: "definition",  label: "5. Defining Health & Well-Being" },
  { id: "causes",      label: "6. Top 10 Causes of Mortality (Kenya)" },
  { id: "malaria",     label: "7. Malaria" },
  { id: "pneumonia",   label: "8. Pneumonia" },
  { id: "cancer",      label: "9. Cancer" },
  { id: "rta",         label: "10. Traffic Accidents" },
  { id: "application", label: "11. Applying Health Knowledge" },
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

export default function HealthTopic6() {
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
        .map(s => { const el = document.getElementById(s.id); return el ? { id: s.id, top: el.getBoundingClientRect().top } : null; })
        .filter(Boolean)
        .filter(s => s!.top <= 120);
      if (current.length > 0) setActiveSection(current[current.length - 1]!.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionIndex = sections.findIndex(s => s.id === activeSection);
  const progress = Math.round(((sectionIndex + 1) / sections.length) * 100);

  return (
    <Layout breadcrumbs={[{ label: "Unit 4", href: "/" }, { label: "Introduction to Health Education" }]}>
      <Helmet>
        <title>Introduction to Health Education | Health Study Notes</title>
        <meta name="description" content="Comprehensive notes on Health Education — objectives, value, WHO determinants of health, defining health and well-being, top causes of mortality in Kenya, and disease prevention including malaria, pneumonia, cancer, and traffic accidents." />
      </Helmet>

      {/* Reading progress bar */}
      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Unit 4 · Health Sciences</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Introduction to Health Education</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Health education is the bridge between what we know about health and what we actually do about it. These notes cover the meaning, objectives, and value of health education; how the World Health Organisation defines health; what determines whether people are healthy; Kenya's leading causes of death; and detailed prevention strategies for four of the most deadly and common conditions — malaria, pneumonia, cancer, and road traffic accidents.
            </p>
          </div>

          {/* ─── SECTION 1 ─── */}
          <SectionHeading id="intro" number="Section 1" title="What is Health Education?" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Health education</strong> is a deliberately planned combination of learning experiences designed to help individuals, families, groups, and communities gain the knowledge, develop the attitudes, and acquire the skills necessary to make informed decisions and take actions that protect and promote their health. It is not the same as simply providing health information — it goes a step further by motivating and enabling people to act on what they know.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Health education draws from multiple disciplines — medicine, psychology, sociology, communication, and education theory — to craft messages and programmes that reach people where they are, in a language they understand, and in a way that actually changes behaviour.
          </p>
          <ExplainerBox>
            <strong>Think about the difference:</strong> Knowing that smoking causes lung cancer is <em>health information</em>. Understanding <em>why</em> you smoke, what triggers the urge, how to replace the habit, and where to get support — and then actually quitting — is the goal of <em>health education</em>. Information alone rarely changes behaviour; education shapes the will and the skill to change.
          </ExplainerBox>
          <ExampleBox>
            <strong>Kenyan context:</strong> In Kenya, health education is delivered through multiple channels — community health volunteers (CHVs) conducting household visits under the Community Health Strategy, radio programmes in Kiswahili and local languages, school health curricula in primary and secondary schools, religious leaders discussing family planning in churches and mosques, and social media campaigns like the government's "#JisaibisheJisaidie" HIV awareness drives.
          </ExampleBox>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            It is important to understand what health education is <em>not</em>: it is not propaganda, it is not coercion, and it is not simply telling people what to do. True health education respects people's autonomy and works to build their capacity to make their own informed choices.
          </p>

          {/* ─── SECTION 2 ─── */}
          <SectionHeading id="objectives" number="Section 2" title="Objectives of Health Education" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Health education serves several overlapping objectives that span the individual, the community, and the broader social system. These objectives are derived from the course slides and elaborated here:
          </p>

          <div className="space-y-4 mb-6">
            {[
              {
                n: "1",
                title: "Enable people to identify their health problems and needs",
                detail: "Many people experience symptoms but do not recognise them as signs of a health problem, or they normalise ill-health because they have lived with it for so long. Health education builds awareness — for example, teaching communities in Kisumu to recognise the early signs of malaria (fever, chills, headache) rather than attributing them to witchcraft or fatigue, so they seek care promptly.",
              },
              {
                n: "2",
                title: "Help people solve their health problems using their own potential",
                detail: "Health education promotes self-efficacy — the belief that you are capable of taking action that will improve your situation. Rather than creating dependency on health workers, good health education empowers people to boil water during a cholera outbreak, make oral rehydration solution at home from sugar and salt, or recognise when a child needs to go to hospital versus when home treatment is appropriate.",
              },
              {
                n: "3",
                title: "Build normal, positive health trends",
                detail: "By consistently reinforcing health-promoting behaviours across communities over time, health education helps shift what is considered 'normal'. For example, before widespread hand-washing campaigns, many Kenyans did not routinely wash hands with soap after using the toilet. Health education — combined with behaviour change communication — made hand-washing normal, particularly during COVID-19.",
              },
              {
                n: "4",
                title: "Establish proper health-seeking behaviours",
                detail: "This means encouraging people to visit formal health facilities when sick rather than self-medicating with unregulated drugs, to attend antenatal clinics during pregnancy, to return for follow-up treatment, and to complete full courses of antibiotics rather than stopping when they feel better (which creates antibiotic resistance). In Kenya, low male health-seeking behaviour is a persistent challenge — men are less likely to seek care until conditions are advanced.",
              },
              {
                n: "5",
                title: "Attain high-quality, longer lives free of preventable disease and premature death",
                detail: "The ultimate goal. This means reducing infant and maternal mortality, cutting the incidence of preventable diseases, ensuring that people live not just longer but healthier, more functional lives. Kenya's Vision 2030 and the Big Four Agenda both include targets for reduced infant mortality and increased life expectancy.",
              },
              {
                n: "6",
                title: "Achieve health equity and eliminate disparities",
                detail: "Health outcomes in Kenya are highly unequal — a child born in Turkana County has a life expectancy significantly lower than one born in Nairobi. Gender, income, geography, ethnicity, and disability status all affect access to health services. Health education recognises these disparities and targets programmes specifically at marginalised and underserved groups.",
              },
              {
                n: "7",
                title: "Create social and physical environments that promote good health",
                detail: "Individual behaviour cannot be separated from the environment in which people live. You cannot tell a Mathare slum resident to 'eat healthy' without addressing the food environment (dominated by cheap, processed foods), or to 'exercise regularly' without safe public spaces. Health education at the policy level advocates for healthy built environments, clean air, safe water, and spaces for physical activity.",
              },
            ].map(({ n, title, detail }) => (
              <div key={n} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-sm">Objective {n}: {title}</p>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          {/* ─── SECTION 3 ─── */}
          <SectionHeading id="value" number="Section 3" title="Value of Health Education" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The value of health education extends far beyond preventing disease. It produces outcomes across multiple domains — individual, educational, social, and economic. The following points draw from the course slides and expand on each:
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">A. Building Knowledge, Skills, and Attitudes</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Health education builds students' and community members' <strong>knowledge</strong> (facts and understanding about health), <strong>skills</strong> (practical abilities like CPR, preparing ORS, reading a prescription label, or self-examining for lumps), and <strong>positive attitudes</strong> (values and emotional orientations that support health, such as valuing preventive care over reactive treatment, or treating people living with HIV with dignity rather than stigma).
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            It addresses all four dimensions of health: <strong>physical</strong> (body and biological function), <strong>mental</strong> (emotional wellbeing and cognitive function), <strong>emotional</strong> (ability to recognise and manage feelings), and <strong>social</strong> (ability to form relationships, participate in society, and contribute to community). All four are interconnected — a person dealing with severe depression will struggle to maintain physical health; a person in chronic poverty will struggle to maintain mental health.
          </p>
          <ExampleBox>
            <strong>Kenyan school example:</strong> The Kenya National School Health Policy integrates health education into primary school curricula. Pupils learn about nutrition, hygiene, puberty, sexual and reproductive health, first aid, mental health, and drug and substance abuse — with the aim that knowledge acquired in childhood forms the foundation for a lifetime of healthy decision-making.
          </ExampleBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">B. Motivating Behaviour Change and Risk Reduction</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Health education <strong>motivates</strong> people to improve and maintain their health, prevent disease, and <strong>reduce risky behaviours</strong>. Effective curricula and community programmes produce documented positive changes in behaviours around:
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-5">
            {[
              ["Alcohol, tobacco, and other drugs", "Teaching young people about the brain science of addiction, the short-term social consequences (violence, accidents, peer conflict), and the long-term health impact (liver disease, lung cancer, cognitive damage) at an age before habits form."],
              ["Injury prevention", "Safe road behaviour, use of seat belts and helmets, safe storage of pesticides and chemicals at home, water safety — all of which are leading causes of injury and death in Kenya."],
              ["Mental and emotional health", "Destigmatising mental illness, teaching coping strategies, recognising the signs of depression and suicidal ideation. Kenya has a growing mental health crisis — 1 in 4 Kenyans will experience a mental disorder in their lifetime, yet there are fewer than 100 psychiatrists for 55 million people."],
              ["Nutrition", "Understanding balanced diets, the dangers of malnutrition and over-nutrition, food safety, reading labels — especially important given the rise in NCDs (diabetes, hypertension) driven partly by dietary changes in urban Kenya."],
              ["Physical activity", "Regular exercise reduces the risk of heart disease, obesity, diabetes, depression, and some cancers. Health education normalises activity as part of daily life, not just something athletes do."],
              ["Prevention of diseases and infections", "Vaccination, hygiene, sexual health, malaria prevention, TB adherence — knowledge about how disease spreads and how to prevent it is foundational to behaviour change."],
              ["Sexuality and family life", "Comprehensive sexuality education reduces teenage pregnancy, HIV transmission, and gender-based violence — three major public health challenges in Kenya."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">C. The Link Between Health and Academic Performance</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Research consistently shows that <strong>healthier students perform better academically</strong>. This relationship works in multiple directions:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground/80 mb-4">
            <li>Students who have breakfast attend class with better concentration and recall. A study of Kenyan primary school children found that school feeding programmes in areas like Turkana significantly improved both attendance and test scores.</li>
            <li>Students suffering from untreated malaria, intestinal worms, or dental pain cannot concentrate and are frequently absent. Kenya's school health programme — including deworming, vision screening, and immunisations — directly improves educational outcomes.</li>
            <li>Students with good mental health — who feel safe, valued, and supported — engage better with learning. Bullying, domestic violence, and food insecurity at home undermine academic performance even when physical health is intact.</li>
            <li>Health education itself is cross-curricular: it reinforces literacy (reading health materials), numeracy (calculating medicine doses, reading nutritional information), science (understanding biology of disease), and life skills (decision-making, communication, negotiation).</li>
          </ul>
          <NoteBox>
            <strong>Key point to remember:</strong> Health education is not a "soft" subject. Evidence shows it is one of the highest-return investments a society can make — every shilling spent on childhood health and nutrition education saves multiple shillings in reduced healthcare costs, lost productivity, and social costs later. The World Bank estimates that every year of quality schooling (including health education) adds 8–10% to individual lifetime earnings.
          </NoteBox>

          {/* ─── SECTION 4 ─── */}
          <SectionHeading id="determinants" number="Section 4" title="WHO Determinants of Health" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A central insight of modern public health — and one articulated clearly by the World Health Organisation — is that <strong>individual health is shaped far more by circumstances and environment than by individual choices alone</strong>. This is captured in the concept of the <strong>social determinants of health</strong>.
          </p>
          <blockquote className="border-l-4 border-primary pl-5 py-2 my-5 italic text-foreground/70 text-base">
            "Whether people are healthy or not is determined by their circumstances and environment. To a large extent, factors such as where we live, the state of our environment, genetics, our income and education level, and our relationships with friends and family all have considerable impacts on health."
            <span className="block mt-2 not-italic text-xs text-muted-foreground">— World Health Organisation</span>
          </blockquote>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            This is a profound and important idea: two people making identical lifestyle choices can have very different health outcomes based solely on where they were born, how much money their family has, what kind of environment they grew up in, and what opportunities were available to them. The WHO groups the determinants of health into the following categories:
          </p>
          <div className="space-y-3 mb-6">
            {[
              { d: "Social and economic environment", detail: "Income and social status are the single most powerful determinants of health. In Kenya, poverty in counties like Turkana and Mandera correlates with the highest rates of malnutrition, maternal mortality, and child mortality in the country. Wealthier Kenyans live longer, eat better, access better healthcare, and live in safer environments — not simply because they make better choices, but because they have better options." },
              { d: "Physical environment", detail: "The quality of air, water, and land where people live. Residents of industrial areas near Mombasa's port or Nairobi's Dandora dumping site face elevated rates of respiratory disease, cancers, and skin conditions from pollution exposure. Access to clean water determines rates of cholera, typhoid, and diarrhoeal disease — a major killer of Kenyan children under five." },
              { d: "Individual behaviour and lifestyle", detail: "Diet, physical activity, smoking, alcohol use, sexual behaviour, and adherence to medical treatment. While this is where traditional health messaging focuses, behaviour is itself shaped by the other determinants — people in poverty often cannot afford nutritious food, and people in unsafe neighbourhoods cannot safely walk or exercise." },
              { d: "Genetics and biology", detail: "Inherited traits affect predisposition to conditions such as hypertension, diabetes, sickle cell anaemia (prevalent in Western Kenya), and certain cancers. However, genetic predisposition is not destiny — environmental factors interact with genes to determine whether disease manifests." },
              { d: "Education", detail: "Education is one of the most consistent predictors of health outcomes globally. More educated people are better able to understand health information, navigate the healthcare system, advocate for themselves, earn income, and make informed decisions about diet, reproduction, and lifestyle. Kenya's ongoing challenges with dropout rates — particularly for girls — have direct health consequences." },
              { d: "Access to health services", detail: "The quality, affordability, and proximity of healthcare. Kenya operates a mixed public-private system. The Kenya Primary Health Care Network aims to place services within 5 km of every Kenyan, but geographic isolation, cost of transport, facility stock-outs of medicines, and understaffing remain major barriers, particularly in ASAL (arid and semi-arid) counties." },
              { d: "Social support networks", detail: "People with strong social relationships — family, friends, community, faith groups — have better health outcomes, better recovery from illness, and lower rates of depression and suicide. Social isolation is increasingly recognised as a health risk comparable in magnitude to smoking 15 cigarettes a day." },
            ].map(({ d, detail }) => (
              <div key={d} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-sm">{d}</p>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
          <ExplainerBox>
            <strong>Why does this matter for health education?</strong> Because effective health education cannot focus only on changing individual behaviour. It must also advocate for the social conditions — fair wages, safe housing, clean water, access to education, and violence-free environments — that make healthy behaviour possible. This is sometimes called the <em>upstream</em> approach to health: fixing the river rather than just pulling drowning people out one by one.
          </ExplainerBox>

          {/* ─── SECTION 5 ─── */}
          <SectionHeading id="definition" number="Section 5" title="Defining Health and Well-Being" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Our understanding of what "health" actually means has evolved dramatically over the past century — and continues to evolve. Getting this definition right matters, because the way we define health determines what we measure, what we fund, and what interventions we prioritise.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">The Traditional (Biomedical) Definition</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            For most of modern medical history, health was understood simply as <strong>the absence of disease or infirmity</strong>. Under this model, a person was healthy if they had no diagnosable illness. The role of medicine was to diagnose conditions and treat them — a reactive approach focused almost entirely on symptoms and pathology.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            This definition had serious limitations. It ignored the millions of people who had no diagnosed disease but were clearly not thriving — people living with chronic fatigue, anxiety, loneliness, or poverty. It also excluded mental health, social functioning, and the quality of life as legitimate health concerns.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">The WHO Definition (1948, Still in Use)</h3>
          <blockquote className="border-l-4 border-primary pl-5 py-2 my-5 italic text-foreground/70 text-base">
            "Health is a state of complete physical, mental and social well-being and not merely the absence of disease or infirmity."
            <span className="block mt-2 not-italic text-xs text-muted-foreground">— World Health Organisation, 1948 Constitution</span>
          </blockquote>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            This definition was revolutionary when it was written and remains the most widely cited definition of health in the world. It introduced three critical dimensions:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground/80 mb-4">
            <li><strong>Physical well-being:</strong> The body functions optimally — organs work properly, energy is adequate, pain is absent or managed, physical capacity meets the demands of daily life.</li>
            <li><strong>Mental well-being:</strong> The person is able to think clearly, manage emotions, cope with stress, maintain a positive self-image, and make sound decisions. This explicitly included mental health as a component of health — not a separate or lesser concern.</li>
            <li><strong>Social well-being:</strong> The person can form and maintain relationships, contribute to community, fulfil social roles (student, employee, parent, citizen), and participate in society. A person who is physically well but completely socially isolated is not fully healthy under this definition.</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">The Evolving Definition: Health as a Holistic Spectrum</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Modern health thinking has expanded even further. Health is now increasingly understood as <strong>a dynamic, multi-dimensional spectrum</strong> rather than a binary state. Key developments include:
          </p>
          <div className="space-y-3 mb-5">
            {[
              { h: "Health is not just medical — it is environmental", d: "Health is no longer simply a question of access to medical treatment; it is determined by a range of factors related to the quality of our built environment. The design of our cities, homes, workplaces, roads, parks, and food systems all shape health outcomes. This is why urban planners, architects, engineers, and policymakers are now considered part of the health system." },
              { h: "Interrelationships between social, psychological, and medical factors", d: "Chronic stress (caused by poverty, violence, discrimination, or overwork) raises cortisol levels, weakens immune function, increases blood pressure, and accelerates cellular ageing. Mental illness increases the risk of physical disease and vice versa. Social isolation is as deadly as smoking. Modern medicine recognises these connections even if health services are still largely organised around separate specialities." },
              { h: "How a person functions in society is part of health", d: "Under a fully holistic definition, a person who cannot go to school, hold a job, participate in family life, or move freely through public spaces because of a mental or physical condition is not fully healthy — even if their clinical markers look acceptable. Functional capacity and social participation are health outcomes in their own right." },
              { h: "Prevention is as important as cure", d: "A more holistic appreciation of health sees prevention not as an optional extra but as central to the health system. This shifts focus from treating disease after it occurs to preventing it from occurring in the first place — through vaccination, health education, environmental improvement, and early detection." },
              { h: "Long-term solutions over short-term treatments", d: "The current model of healthcare focuses heavily on immediate symptom relief: prescribe a drug, manage a crisis. A holistic approach looks for the root causes — why this person keeps getting sick, what in their environment or behaviour or social situation is driving recurrent illness — and addresses those structural factors." },
            ].map(({ h, d }) => (
              <div key={h} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-sm">{h}</p>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <NoteBox>
            <strong>Increasing pressures on health systems:</strong> The shift to a holistic definition comes at a difficult time. Health systems globally — including Kenya's — face rising pressure from an ageing population, the epidemic of obesity and NCDs, a growing mental health crisis, and rising patient expectations. The traditional narrow focus on individual symptoms and hospital-based treatment is no longer sufficient or financially sustainable. Health education and prevention are thus not optional extras — they are economic and social necessities.
          </NoteBox>
          <ExampleBox>
            <strong>Kenyan example — designing healthy environments:</strong> Nairobi County's ongoing efforts to develop safe pedestrian walkways, cycling lanes (as seen along Ngong Road), and urban parks respond directly to the holistic health mandate. When people can walk or cycle safely, rates of physical inactivity, obesity, hypertension, and depression all decrease. Engineers, urban planners, and transport policymakers are thus functioning as public health actors, even if they don't use that language.
          </ExampleBox>

          {/* ─── SECTION 6 ─── */}
          <SectionHeading id="causes" number="Section 6" title="Top 10 Leading Causes of Mortality in Kenya" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            According to the <strong>Kenya Demographic Health Survey (KDHS) 2014</strong> and subsequent data, the ten leading causes of death in Kenya are listed below. Understanding this list is essential for health education — it tells us exactly where prevention efforts should be concentrated.
          </p>
          <div className="overflow-hidden rounded-xl border border-border/60 mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/60 border-b border-border/60">
                  <th className="px-4 py-3 text-left font-semibold text-foreground w-12">Rank</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground">Cause of Death</th>
                  <th className="px-4 py-3 text-left font-semibold text-foreground hidden md:table-cell">Category</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1", "Malaria", "Communicable / Parasitic"],
                  ["2", "Pneumonia", "Communicable / Respiratory"],
                  ["3", "Cancer", "Non-communicable"],
                  ["4", "HIV / AIDS", "Communicable / Viral"],
                  ["5", "Tuberculosis (TB)", "Communicable / Bacterial"],
                  ["6", "Anaemia", "Nutritional / Secondary condition"],
                  ["7", "Traffic Accidents (RTAs)", "Injury"],
                  ["8", "Other accidents", "Injury"],
                  ["9", "Heart Disease", "Non-communicable"],
                  ["10", "Meningitis", "Communicable"],
                ].map(([rank, cause, cat]) => (
                  <tr key={rank} className="border-b border-border/40 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-foreground/60 font-mono">{rank}</td>
                    <td className="px-4 py-3 font-medium text-foreground">{cause}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{cat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ExplainerBox>
            <strong>What this list tells us:</strong> Six of the top ten causes (malaria, pneumonia, HIV/AIDS, TB, anaemia, meningitis) are communicable or infectious diseases — meaning they are largely preventable through public health measures like clean water, vaccination, health education, and adequate nutrition. Three causes (cancer, heart disease, traffic accidents) require a combination of behavioural change, environmental design, and medical intervention. Anaemia often reflects underlying malnutrition, which is itself a product of poverty and food insecurity. This list underscores why health education — which addresses behaviour, environment, and knowledge — is such a powerful tool for reducing mortality in Kenya.
          </ExplainerBox>

          {/* ─── SECTION 7 ─── */}
          <SectionHeading id="malaria" number="Section 7" title="Malaria — Causes, Factors and Prevention" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Malaria remains the <strong>number one cause of death in Kenya</strong> according to the KDHS, and is a major cause of hospital admissions and school absenteeism, particularly among children under five and pregnant women. Despite decades of control efforts, malaria transmission persists in lakeside, coastal, and forested regions of Kenya.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Causative Agent</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Malaria is caused by <strong>Plasmodium parasites</strong> — single-celled organisms transmitted to humans through the bites of infected female <em>Anopheles</em> mosquitoes (the "malaria vector"). There are five species of Plasmodium that infect humans:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground/80 mb-4">
            <li><strong>P. falciparum:</strong> The most dangerous species — responsible for the majority of severe malaria cases and deaths. Dominant in sub-Saharan Africa, including Kenya's lake and coastal regions.</li>
            <li><strong>P. vivax:</strong> Can remain dormant in the liver for months or years, causing relapses. More common in South and Southeast Asia but also found in Kenya.</li>
            <li><strong>P. malariae, P. ovale, P. knowlesi:</strong> Less common, generally cause milder disease (except P. knowlesi in some settings).</li>
          </ul>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The mosquito bites a person with malaria and ingests parasites along with blood. The parasites undergo sexual reproduction in the mosquito's gut, then migrate to the salivary glands. When the mosquito bites its next victim, the parasites are injected along with saliva. They travel to the liver, mature, then enter the bloodstream and invade red blood cells — destroying them in cycles that cause the characteristic cycles of fever and chills.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Environmental Factors that Favour Malaria Transmission</h3>
          <div className="space-y-2 mb-5">
            {[
              { f: "Stagnant water", d: "Mosquitoes breed exclusively in standing or slow-moving water. Stagnant ditches, blocked drains, construction sites with pooled water, old tyres, uncovered water containers, and irrigated fields all provide breeding sites. Kisumu city's proximity to Lake Victoria means mosquito breeding is facilitated year-round." },
              { f: "Presence of bushes and long grass", d: "Dense vegetation around homes provides resting sites for adult mosquitoes during the day. Clearing bushes and trimming grass within 100 metres of homes is a simple, effective prevention measure." },
              { f: "Rainfall", d: "Rains increase standing water and expand mosquito breeding habitats rapidly. Malaria incidence typically surges 2–4 weeks after heavy rains — giving communities a short window for preventive action (clearing drains, spraying)." },
              { f: "Low altitude and high temperatures", d: "Malaria transmission is most intense in warm, low-altitude areas. Western Kenya (around Lake Victoria, ~1,130m) and the coastal strip (Mombasa, Kilifi, Kwale) have the highest transmission levels. At high altitudes like Nairobi (~1,700m) and the highlands, temperatures are low enough to slow or halt parasite development in mosquitoes, making transmission rare. However, climate change is enabling mosquitoes to colonise higher altitudes that were previously malaria-free." },
            ].map(({ f, d }) => (
              <div key={f} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-sm">{f}</p>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Prevention and Control Measures</h3>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground/80 mb-4">
            <li><strong>Improve drainage and sewerage:</strong> Ensuring water does not pool in or around homes eliminates breeding sites. This requires both household behaviour (emptying containers, covering water tanks) and government investment in drainage infrastructure, particularly in informal settlements like Kibera (Nairobi) and Nyalenda (Kisumu).</li>
            <li><strong>Trim grass and clear bushes:</strong> Regular vegetation management around homes reduces adult mosquito resting sites. Community clean-up campaigns ("harambee") are a cost-effective local approach.</li>
            <li><strong>Insecticide-Treated Bed Nets (ITNs):</strong> Long-lasting insecticidal nets (LLINs) are one of the most evidence-based and cost-effective malaria interventions known. Kenya distributes LLINs free of charge to pregnant women and children under five through health facilities (ANC and immunisation clinics). Sleeping under a net every night, properly tucked in, can reduce malaria transmission by up to 90% in high-transmission areas.</li>
            <li><strong>Indoor Residual Spraying (IRS):</strong> Spraying the interior walls of homes with insecticide kills resting mosquitoes. The Kenya National Malaria Programme conducts IRS campaigns in high-transmission counties.</li>
            <li><strong>Malaria prophylaxis (preventive medicine):</strong> Travellers from low-transmission areas (like Nairobi) visiting malaria-endemic zones should take antimalarial prophylaxis — most commonly doxycycline or atovaquone-proguanil — starting before the trip and continuing after return. Pregnant women receive Intermittent Preventive Treatment (IPTp) with sulfadoxine-pyrimethamine at every ANC visit from the second trimester to protect both mother and foetus.</li>
            <li><strong>Seek early diagnosis and treatment:</strong> Rapid Diagnostic Tests (RDTs) are available at community health units. Early treatment with artemisinin-based combination therapy (ACT) — the current first-line treatment in Kenya — prevents progression to severe malaria and death, and reduces the parasite reservoir in the community.</li>
            <li><strong>RTS,S malaria vaccine:</strong> Kenya, Ghana, and Malawi participated in the landmark WHO-coordinated pilot of the RTS,S/AS01 malaria vaccine. Kenya has now incorporated it into the routine immunisation schedule, making Kenya one of the first countries in the world to offer malaria vaccination as standard public health practice.</li>
          </ul>

          {/* ─── SECTION 8 ─── */}
          <SectionHeading id="pneumonia" number="Section 8" title="Pneumonia — Causes, Factors and Prevention" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Pneumonia is <strong>the second leading cause of death in Kenya</strong> and the world's leading infectious killer of children under five. It is a disease of the lungs characterised by inflammation and fluid accumulation in the air sacs (alveoli), which impairs the lung's ability to exchange oxygen and carbon dioxide.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">What Happens in Pneumonia</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            When infection reaches the lungs, the immune system responds by sending white blood cells and fluid to the affected area. This inflammatory response fills the alveoli with fluid (exudate), preventing efficient gas exchange. The person experiences difficulty breathing, reduced oxygen saturation, and in severe cases, respiratory failure. Severe pneumonia causes the chest to visibly retract with each breath — a sign that the body is struggling to pull air in.
          </p>
          <ExampleBox>
            <strong>Kenyan context:</strong> Children in crowded urban informal settlements (Mathare, Kibera) and in rural areas with high indoor smoke exposure from wood-burning cooking fires are at highest risk. The combination of smoke inhalation, malnutrition (which weakens immunity), lack of vaccination, and delayed care-seeking turns a treatable condition into a killer.
          </ExampleBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Causes</h3>
          <div className="space-y-2 mb-5">
            {[
              { c: "Bacterial pneumonia", d: "The most common and most dangerous form in adults. Streptococcus pneumoniae (pneumococcus) is the single most important bacterium — it can cause lobar pneumonia affecting an entire lobe of the lung. Other bacterial causes include Haemophilus influenzae (common in children), Klebsiella pneumoniae (in alcoholics and diabetics), and Mycoplasma pneumoniae ('walking pneumonia' — milder, often managed at home)." },
              { c: "Viral pneumonia", d: "Can be caused by influenza virus (particularly H1N1 and H3N2 strains), respiratory syncytial virus (RSV — the leading cause of pneumonia hospitalisation in infants), COVID-19 (SARS-CoV-2), adenovirus, and rhinovirus. Viral pneumonia is often less severe than bacterial but can be complicated by secondary bacterial superinfection." },
              { c: "Fungal pneumonia", d: "Most commonly Pneumocystis jirovecii pneumonia (PCP), which almost exclusively affects people with severely suppressed immune systems — particularly people with AIDS who are not on ART. Cryptococcus neoformans can also cause severe pneumonia and meningitis in immunocompromised individuals. Both are significant causes of morbidity in Kenya given the HIV burden." },
              { c: "Aspiration pneumonia", d: "Occurs when food, drink, saliva, or vomit is inhaled into the lungs — most common in unconscious or intoxicated patients, those with swallowing problems (stroke), or newborns." },
            ].map(({ c, d }) => (
              <div key={c} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-sm">{c}</p>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Prevention and Control Measures</h3>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground/80 mb-4">
            <li><strong>Wash hands regularly:</strong> Especially after using the toilet and before handling food. Hand-washing with soap is one of the most effective preventive measures against respiratory infections because the organisms that cause pneumonia spread via hand-to-mouth transfer and respiratory droplets. Kenya's Ministry of Health expanded handwashing campaigns dramatically during COVID-19, with lasting public awareness gains.</li>
            <li><strong>Vaccination:</strong> The <strong>pneumococcal conjugate vaccine (PCV10 or PCV13)</strong> protects against the most common bacterial cause — it is part of Kenya's routine immunisation schedule, given to infants at 6, 10, and 14 weeks. The influenza vaccine is recommended annually for high-risk groups (elderly, immunocompromised, healthcare workers). The Haemophilus influenzae type b (Hib) vaccine — part of the pentavalent vaccine in Kenya's schedule — protects against another major bacterial cause.</li>
            <li><strong>Eat nutritiously:</strong> A well-nourished immune system mounts a faster and more effective response to respiratory infection. In children, exclusive breastfeeding for the first six months provides maternal antibodies and significantly reduces pneumonia risk. Vitamin A, zinc, and iron deficiencies are associated with increased susceptibility to respiratory infections.</li>
            <li><strong>Exercise regularly:</strong> Moderate aerobic exercise strengthens the respiratory system and immune function. People who are physically active have lower rates of pneumonia and better outcomes when infected.</li>
            <li><strong>Get adequate sleep:</strong> Sleep deprivation suppresses immune function — people who sleep fewer than 6 hours per night are significantly more susceptible to respiratory infections. This is particularly important for university students and healthcare workers in Kenya who frequently experience sleep deprivation.</li>
            <li><strong>Quit smoking:</strong> Cigarette smoke paralyses the cilia (hair-like structures that sweep pathogens out of the respiratory tract), damages the alveolar lining, and suppresses immune cell function in the lungs — dramatically increasing the risk of pneumonia and other respiratory infections. Passive smoke exposure in children is a major risk factor for childhood pneumonia in Kenya.</li>
            <li><strong>Reduce indoor air pollution:</strong> Cooking over open fires using charcoal, wood, or kerosene exposes households — particularly women and children — to levels of particulate matter far exceeding WHO safe limits. Promoting the use of improved cook stoves (jiko bora) and LPG gas reduces indoor pollution and pneumonia risk significantly.</li>
            <li><strong>Stay away from sick people and use respiratory hygiene:</strong> Cover mouth and nose when coughing or sneezing; dispose of tissues hygienically; avoid crowded indoor spaces during respiratory illness outbreaks.</li>
            <li><strong>Early treatment:</strong> Antibiotic treatment for bacterial pneumonia (typically amoxicillin at community level in Kenya) must begin promptly. Community health volunteers are trained to identify children with fast breathing (a danger sign of pneumonia) and refer or treat accordingly under the Integrated Community Case Management (iCCM) programme.</li>
          </ul>

          {/* ─── SECTION 9 ─── */}
          <SectionHeading id="cancer" number="Section 9" title="Cancer — Causes, Factors and Prevention" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Cancer is the <strong>third leading cause of death in Kenya</strong> and the most rapidly growing cause of mortality as lifestyle changes, improved detection, and an ageing population converge. The Kenya National Cancer Institute estimates that approximately <strong>47,000 new cancer cases</strong> are diagnosed in Kenya each year, and around <strong>33,000 people die</strong> from cancer annually — suggesting many cases are diagnosed at advanced, untreatable stages.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">What is Cancer?</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Cancer is a collective term for a group of diseases characterised by the <strong>uncontrolled division and growth of abnormal cells</strong> that invade surrounding tissues and can spread (metastasise) to distant organs through the blood and lymphatic system. Normally, cells divide in an orderly, regulated way — old cells die and new ones replace them. Cancer occurs when this regulation breaks down: cells grow uncontrollably, do not die when they should, and accumulate into masses called tumours (though not all cancers form tumours — leukaemia, for example, is a cancer of the blood).
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">What Causes Cancer? — DNA Damage</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Cancer is fundamentally caused by <strong>changes (mutations) in the DNA</strong> of individual cells — specifically in genes that control cell growth, division, and death. These mutations can be:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground/80 mb-4">
            <li><strong>Inherited (germline mutations):</strong> Passed from parent to child before birth. Examples: BRCA1 and BRCA2 gene mutations that dramatically increase breast and ovarian cancer risk; mutations causing familial adenomatous polyposis (bowel cancer). These account for a minority of cancer cases.</li>
            <li><strong>Acquired (somatic mutations):</strong> Occurring during a person's lifetime due to exposure to carcinogens (cancer-causing agents), replication errors, or random chance. The accumulation of multiple mutations over time — often over decades — is what eventually triggers cancer.</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Major Risk Factors for Cancer</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-5">
            {[
              ["Tobacco and smoking", "Tobacco is the single largest preventable cause of cancer globally. It causes cancers of the lung, mouth, throat, oesophagus, stomach, pancreas, kidney, bladder, and cervix. Even secondhand smoke exposure significantly increases cancer risk. In Kenya, tobacco use has been declining since the Tobacco Control Act (2007) but remains a concern, particularly in urban areas."],
              ["Diet and physical activity", "Diets high in red meat, processed meat, salt, and low in vegetables, fruits, and fibre increase the risk of colorectal, stomach, and oesophageal cancer. Obesity — increasingly common in urban Kenya — is a risk factor for at least 13 cancer types including breast, endometrial, bowel, kidney, and liver cancer. Physical inactivity contributes to obesity and independently increases cancer risk."],
              ["Sun and ultraviolet radiation", "UV radiation from the sun is the primary cause of skin cancer. While darker skin pigmentation provides some protection, all people are at risk with prolonged unprotected sun exposure — particularly farmers, construction workers, and outdoor workers in Kenya's equatorial sun. In Kenya, skin cancer is increasingly reported."],
              ["Viruses and infections", "Several cancers in Kenya are linked to infections: Human Papillomavirus (HPV) → cervical cancer (the leading cancer killer of Kenyan women); Helicobacter pylori (H. pylori) → stomach cancer; Hepatitis B and C viruses → liver cancer; HIV → Kaposi's sarcoma, lymphoma; Epstein-Barr virus → Burkitt's lymphoma (common in children in malaria-endemic Western Kenya)."],
              ["Alcohol", "Heavy and prolonged alcohol consumption increases the risk of mouth, throat, oesophageal, liver, breast, and colorectal cancer. Chang'aa and busaa (traditional Kenyan alcohol) are often consumed in large quantities in some communities, contributing to liver cancer burden."],
              ["Chemicals and environmental carcinogens", "Occupational exposure to asbestos (mesothelioma, lung cancer), benzene (leukaemia), aflatoxins from mouldy maize and groundnuts (liver cancer — a significant risk in maize-heavy Kenyan diets stored in poor conditions) and other chemical carcinogens."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Prevention and Control Measures</h3>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground/80 mb-4">
            <li><strong>Avoid tobacco and cigarettes:</strong> Never starting is best. If already smoking, quitting at any age reduces cancer risk substantially — within 10 years of quitting, a former smoker's lung cancer risk halves. Kenya's Tobacco Control Act restricts advertising, mandates health warnings, and bans smoking in public places.</li>
            <li><strong>Avoid or minimise alcohol:</strong> There is no "safe" level of alcohol in relation to cancer risk — every drink carries some risk. Reducing intake significantly lowers cancer risk, particularly for liver and oesophageal cancer.</li>
            <li><strong>Eat a healthy, balanced diet:</strong> Eat plenty of vegetables, fruits, whole grains, and legumes. Limit red and processed meat, added sugars, and salt. The slide specifically mentions avoiding <em>excessive nyama choma</em> — charcoal-grilled meat is a major part of Kenyan social culture, but the char (containing polycyclic aromatic hydrocarbons and heterocyclic amines) is carcinogenic, particularly for colorectal and stomach cancer when consumed in large amounts regularly.</li>
            <li><strong>Maintain a healthy weight and be physically active:</strong> Aim for at least 150 minutes of moderate activity per week. Maintaining a healthy BMI (18.5–24.9 kg/m²) reduces cancer risk significantly. Walking, cycling, and local activities like football and dance all count.</li>
            <li><strong>Protect yourself from excessive sun:</strong> Use sunscreen with SPF 30+, wear protective clothing, seek shade during peak sun hours (10am–4pm), and wear UV-protective sunglasses.</li>
            <li><strong>Get vaccinated:</strong>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li><strong>HPV vaccine (Gardasil/Cervarix):</strong> Kenya introduced HPV vaccination for 10-year-old girls in 2019 through the routine immunisation schedule. It protects against the HPV strains responsible for ~70% of cervical cancer cases. Cervical cancer is the most common cancer among Kenyan women and a leading cause of cancer death.</li>
                <li><strong>Hepatitis B vaccine:</strong> Part of Kenya's pentavalent infant immunisation programme. Protecting against hepatitis B infection substantially reduces lifetime risk of liver cancer.</li>
              </ul>
            </li>
            <li><strong>Avoid risky behaviours:</strong> Reduce sexual partners (to lower HPV and hepatitis B/C transmission), use condoms consistently, avoid sharing needles, and test for HIV (since HIV increases cancer risk significantly).</li>
            <li><strong>Get regular medical care and cancer screening:</strong>
              <ul className="list-disc pl-6 mt-1 space-y-1">
                <li><strong>Cervical cancer screening:</strong> WHO recommends VIA (Visual Inspection with Acetic Acid) — an affordable, no-lab-needed screening method available at many Kenyan health facilities — for women aged 25–65 every 3–5 years.</li>
                <li><strong>Breast cancer:</strong> Women should perform monthly self-breast examinations and report any lumps, nipple discharge, or skin changes promptly. Clinical breast examination is available at health centres.</li>
                <li><strong>Prostate cancer:</strong> PSA (Prostate Specific Antigen) testing is available at referral hospitals — men over 50, or 40 with a family history, should discuss screening with a doctor.</li>
                <li><strong>Colorectal cancer:</strong> Colonoscopy is available at major hospitals. Reporting blood in stool or persistent change in bowel habits should not be delayed.</li>
              </ul>
            </li>
            <li><strong>Proper food storage:</strong> Store maize and groundnuts in dry, well-ventilated conditions to prevent aflatoxin contamination — a major preventable liver cancer risk in Kenya.</li>
          </ul>
          <WarnBox>
            <strong>Cancer stigma in Kenya:</strong> Many Kenyan patients present to hospital with late-stage cancer because symptoms were ignored, attributed to witchcraft or bad luck, or because of fear of diagnosis. By the time many present, curative treatment is no longer possible. Health education must address cancer myths, reduce stigma, and normalise the message that early detection saves lives — because it does.
          </WarnBox>

          {/* ─── SECTION 10 ─── */}
          <SectionHeading id="rta" number="Section 10" title="Road Traffic Accidents — Causes, Factors and Prevention" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Road Traffic Accidents (RTAs) are the <strong>seventh leading cause of death in Kenya</strong> and a major public health crisis. The WHO projects that road traffic injuries will become the <strong>third leading cause of the global disease burden by 2020</strong> (now already a reality in many settings), driven by the rapid growth of motorisation in low- and middle-income countries without commensurate improvements in road safety systems.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A Road Traffic Accident (RTA) is defined as <strong>any injury due to crashes originating from, terminating with, or involving a vehicle partially or fully on a public road</strong>. This includes crashes involving matatus, motorcycles (boda bodas), lorries, private vehicles, and pedestrians.
          </p>
          <ExampleBox>
            <strong>Kenyan context:</strong> Kenya loses approximately <strong>3,000 people per year</strong> to road traffic accidents according to the National Transport and Safety Authority (NTSA). Boda boda (motorcycle taxi) accidents have become a leading subcategory — particularly affecting young men aged 15–35. The majority of boda boda riders and passengers do not wear helmets consistently. The Nairobi–Mombasa highway and Nairobi–Nakuru highway are among the most dangerous roads in Africa.
          </ExampleBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Main Causes of Road Traffic Accidents</h3>
          <div className="space-y-3 mb-5">
            {[
              { c: "Human error (the dominant cause — ~90% of accidents)", d: "This includes: speeding (a factor in nearly half of all fatal accidents); driving under the influence of alcohol or drugs — a major problem on Kenyan roads, particularly at night and on weekends; distracted driving (using a mobile phone while driving — now an offence under Kenyan traffic law); driver fatigue — long-haul lorry and bus drivers often exceed safe driving hours; failure to wear seat belts or helmets; overloading of matatus and lorries beyond safe capacity; lane indiscipline and reckless overtaking; failure to obey traffic signals and signs." },
              { c: "Vehicle (equipment) failure", d: "Mechanical defects — brake failure, tyre blowouts, steering faults, lighting failures — cause or worsen accidents. Many matatus and boda bodas in Kenya operate without adequate maintenance. Corruption in vehicle inspection (nyumba kumi) means unsafe vehicles remain on the road. The 2014 Sachang'wan tanker fire, which killed over 100 people after a crash, exemplified the catastrophic potential of heavy vehicle failure." },
              { c: "Poor road design and infrastructure", d: "Roads without clear lane markings, without proper lighting, without pedestrian crossings, with sharp unbanked curves, potholes, missing guard rails, or inadequate road signs increase accident risk significantly. Poorly designed junctions — such as those without traffic lights or roundabouts in high-traffic areas — create dangerous conflict points. Urban planning that forces pedestrians to walk in roads rather than on pavements is an infrastructural failure with direct mortality consequences." },
              { c: "Environmental factors", d: "Heavy rain reduces visibility and makes roads slippery. Fog — particularly in the Rift Valley and highland areas — dramatically reduces visibility. Wandering livestock on roads, particularly at night in rural areas, cause fatal collisions. Construction debris left in roads and uncovered manholes are additional hazards." },
            ].map(({ c, d }) => (
              <div key={c} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-sm">{c}</p>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Prevention Measures</h3>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground/80 mb-4">
            <li><strong>Improved equipment and vehicle maintenance:</strong> Enforce rigorous vehicle inspection (SVR — Statutory Vehicle Roadworthiness) to remove mechanically unsafe vehicles. Require operators of public service vehicles to document maintenance schedules. NTSA's fitment centres inspection system is a step in this direction.</li>
            <li><strong>Better driver awareness, education, and policing:</strong> Stricter enforcement of speed limits using speed cameras (already deployed on key Kenyan highways like the Southern Bypass); breathalyser testing at road checkpoints for drunk driving; harsher penalties for traffic offences; mandatory refresher training for PSV drivers; expanded driver education in schools through road safety curriculum integration.</li>
            <li><strong>Enforce traffic laws consistently:</strong> Public behaviour changes when enforcement is predictable. When road users know that running a red light results in a fine (not a bribe), behaviour changes. Kenya's NTSA has made progress in reducing corruption in traffic enforcement, but it remains a challenge.</li>
            <li><strong>Mandatory use of seat belts and helmets:</strong> Seat belts reduce fatality risk by 45% for front seat occupants and 60% for rear seat occupants. Helmets reduce boda boda head injury risk by 70%. Kenya's Traffic Act mandates both, but enforcement — particularly for boda bodas — remains inconsistent.</li>
            <li><strong>Improved road and environmental design:</strong> Install street lighting on accident blackspots; build pedestrian walkways and footbridges over busy highways; improve road markings and signage; repair and maintain road surfaces; engineer safer road geometry (curves, junctions, overtaking zones). The Standard Gauge Railway (SGR) has reduced heavy truck traffic on the Mombasa–Nairobi road, which has had a measurable safety benefit.</li>
            <li><strong>Manage fatigue and overloading:</strong> Implement mandatory rest periods for commercial drivers; weight bridges to enforce load limits; install speed governors on PSVs (already required by law in Kenya).</li>
            <li><strong>Emergency response capacity:</strong> Reducing deaths from RTAs requires not just preventing accidents but improving the speed and quality of emergency response. Many Kenyans who survive a crash die because of delays in getting to hospital. Community first aid training, functional ambulance systems (like the 999 emergency line), and trauma-capable health facilities along major highway corridors are essential.</li>
          </ul>

          {/* ─── SECTION 11 ─── */}
          <SectionHeading id="application" number="Section 11" title="Applying Health Knowledge — Purpose of This Course" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The slides close with a critical reminder about the purpose of this entire course. This is not an abstract academic exercise — health knowledge has direct, practical, life-saving applications. The course's aim, as stated in the slides, is:
          </p>
          <blockquote className="border-l-4 border-primary pl-5 py-2 my-5 italic text-foreground/70 text-base">
            "To make you aware of health and related facts for your personal care. Health is not just about not being ill or obtaining treatment but includes a state of complete physical, mental and social well-being."
          </blockquote>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The slides emphasise that health — and therefore the content of health education — is not narrow. <strong>Well-being goes beyond the individual</strong> and incorporates the full range of ways in which the world we live in shapes our health:
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-5">
            {[
              ["Lifestyle & exposure to disease risk factors", "The choices you make daily — diet, activity, substance use, sleep, sexual behaviour — accumulate over years to determine health outcomes. Understanding the biology and evidence behind these choices allows you to make them deliberately, not by default."],
              ["Effects of the environment, pollution, industry & products", "As a future engineer, business manager, architect, or planner, the decisions you make in your career will affect the health of the people who live and work in the environments you shape. A poorly ventilated factory causes occupational lung disease. A building with no access to natural light affects mental health. A road without pedestrian infrastructure increases mortality."],
              ["Farming & food products", "Agricultural practices affect what food is available, how nutritious it is, and whether it is contaminated. Pesticide misuse, aflatoxin in stored grain, food adulteration, and poor food handling all have direct health consequences in Kenya."],
              ["Business & ethics", "Businesses make decisions that affect health — food companies add excessive salt, sugar, and fat to products; pharmaceutical companies price essential medicines beyond reach; tobacco companies target young people; alcohol producers market aggressively in low-income communities. Understanding health ethics is part of responsible business management."],
              ["Society & social interactions", "Social structures — gender norms, ethnic divisions, economic inequality, family structures — shape health behaviours and outcomes. Gender-based violence, forced early marriage, and social exclusion all have direct and severe health consequences."],
              ["Infrastructure & design, materials, clothing, noise, roads, weather & equipment", "The built environment is a health determinant. Buildings that are cold, damp, overcrowded, or poorly ventilated increase respiratory disease. Occupational noise causes hearing loss. Road design determines who dies in traffic. Protective equipment — helmets, gloves, safety boots — saves lives when designed and worn properly."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <ExplainerBox>
            <strong>The takeaway:</strong> Health education at university level is not about memorising symptoms and treatments (though that knowledge is important). It is about understanding the systems — biological, social, environmental, economic — that produce health and disease. With this understanding, you can protect your own health more effectively, and — whatever field you work in — make decisions that protect and promote the health of the communities around you. Every profession intersects with health. The engineer who installs clean water pipes saves more lives than many clinicians. The businessperson who refuses to sell counterfeit medicines, or who installs proper ventilation in a factory, is practising public health.
          </ExplainerBox>
          <NoteBox>
            <strong>Kenyan professional responsibility:</strong> Kenya's health challenges are immense — malaria, HIV, cancer, road accidents, growing NCDs, mental health crisis, and inadequate health infrastructure. The government cannot solve these alone. Professionals in every field — engineering, business, architecture, law, education, journalism — contribute to or detract from population health through the decisions they make. This course equips you with the foundation to be a health-promoting professional, not just a healthy individual.
          </NoteBox>

        </div>

        {/* ─── SIDEBAR TOC ─── */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-20">
            <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase mb-3">On this page</p>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-xs text-muted-foreground">{progress}% through</span>
            </div>
            <nav className="space-y-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`block text-xs py-1 px-2 rounded transition-colors ${activeSection === s.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </Layout>
  );
}
