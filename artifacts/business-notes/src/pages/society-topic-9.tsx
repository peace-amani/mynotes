import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, AlertTriangle, CheckCircle2, Swords, Handshake, Trophy, Scale, MessageCircle } from "lucide-react";

const sections = [
  { id: "intro", label: "1. Social Processes — Overview" },
  { id: "competition", label: "2. Competition" },
  { id: "conflict", label: "3. Conflict" },
  { id: "cooperation", label: "4. Cooperation" },
  { id: "accommodation", label: "5. Accommodation" },
  { id: "negotiation", label: "6. Negotiation" },
  { id: "comparison", label: "7. Comparison Table" },
];

function SectionHeading({ id, number, title }: { id: string; number: string; title: string }) {
  return (
    <div id={id} className="scroll-mt-20 pt-12 pb-4 border-b border-border/60 mb-6">
      <p className="text-xs font-bold tracking-widest text-primary uppercase mb-1">{number}</p>
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{title}</h2>
    </div>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="font-semibold text-foreground text-lg mt-7 mb-3">{children}</h3>;
}

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
    <div className="my-4 flex gap-3 rounded-lg border border-green-300/40 bg-green-50 dark:bg-green-900/10 p-4">
      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
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

function ProcessCard({ icon, color, title, children }: { icon: React.ReactNode; color: string; title: string; children: React.ReactNode }) {
  return (
    <div className={`rounded-xl border ${color} overflow-hidden mb-3`}>
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border/30 bg-muted/20">
        <div className="text-primary">{icon}</div>
        <p className="font-semibold text-foreground text-sm">{title}</p>
      </div>
      <div className="px-5 py-4 text-sm text-foreground/80 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

function PointList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-sm text-foreground/80 leading-relaxed">
          <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function SocietyTopic9() {
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
        .map((s) => { const el = document.getElementById(s.id); return el ? { id: s.id, top: el.getBoundingClientRect().top } : null; })
        .filter(Boolean).filter((s) => s!.top <= 120);
      if (current.length > 0) setActiveSection(current[current.length - 1]!.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionIndex = sections.findIndex((s) => s.id === activeSection);
  const progress = Math.round(((sectionIndex + 1) / sections.length) * 100);

  return (
    <Layout breadcrumbs={[
      { label: "Unit 3", href: "/" },
      { label: "Week 9: Social Processes" },
    ]}>
      <Helmet>
        <title>Social Processes — Competition, Conflict, Cooperation, Accommodation & Negotiation | Study Notes</title>
        <meta name="description" content="Social processes: meaning, characteristics, importance, and how to use competition, conflict, cooperation, accommodation, and negotiation to solve social problems." />
        <meta property="og:title" content="Social Processes — Week 9 | Society & Culture" />
        <meta property="og:image" content="https://notes.xwolf.space/og-home.svg" />
      </Helmet>

      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 9 · Society &amp; Culture</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Social Processes</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Social life is not static — it is driven by dynamic processes through which individuals and groups interact, compete, clash, collaborate, adjust, and negotiate. Understanding these processes is essential for analysing how societies function, how problems arise, and how they can be resolved. This week covers five key social processes: <strong>Competition, Conflict, Cooperation, Accommodation,</strong> and <strong>Negotiation</strong> — each examined for its meaning, characteristics, importance, and role in solving social problems.
            </p>
          </div>

          {/* ===== SECTION 1 ===== */}
          <SectionHeading id="intro" number="Section 1" title="Social Processes — An Overview" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A <strong>social process</strong> refers to the ways in which individuals and groups interact, adjust, and readjust to one another within a social setting. Social processes are the recurring patterns of social interaction through which people relate to each other — sometimes harmoniously, sometimes in opposition, and often in complex combinations of both. They are the mechanisms through which society is continuously being shaped, challenged, and reproduced.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Social processes can be broadly classified into two categories:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="rounded-xl border border-border/60 bg-card/50 p-5">
              <h3 className="font-semibold text-foreground mb-2">Associative Processes</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">These are social processes that bring people together, build solidarity, and promote social harmony. They create bonds, resolve differences, and enable collective achievement.</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /><span>Cooperation — working together toward shared goals</span></li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /><span>Accommodation — adjusting to reduce tension</span></li>
                <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /><span>Negotiation — reaching mutually acceptable agreements</span></li>
              </ul>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/50 p-5">
              <h3 className="font-semibold text-foreground mb-2">Dissociative Processes</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">These are social processes that drive people apart, create divisions, and generate tension. They are not necessarily destructive — they can also be engines of innovation, justice, and social change.</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex gap-2"><AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" /><span>Competition — striving against others for scarce rewards</span></li>
                <li className="flex gap-2"><AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" /><span>Conflict — open struggle between opposing parties</span></li>
              </ul>
            </div>
          </div>

          <ExplainerBox>
            <strong>Why study social processes?</strong> Social processes are not abstract academic concepts — they shape every aspect of daily life. When you compete for a scholarship, you are participating in a social process. When neighbours quarrel over a boundary wall, they are in conflict. When students work together on a group presentation, they are cooperating. When two countries reach a peace agreement, they are accommodating. When a union and employer agree on wages, they are negotiating. Understanding these processes equips you to analyse social situations, anticipate outcomes, and intervene more effectively to resolve problems.
          </ExplainerBox>

          <ExampleBox>
            <strong>All five processes operating simultaneously — a real-world example:</strong> In a Kenyan university, all five social processes operate at once. Students <em>compete</em> for limited spots on the Dean's List. Study groups <em>cooperate</em> to prepare for exams. Students from different ethnic groups may experience <em>conflict</em> around cultural differences. Roommates who disagree on noise levels may reach <em>accommodation</em> by agreeing on quiet hours. Student leaders and university management may <em>negotiate</em> over fee increments. Social life is never driven by just one process — it is always a complex interplay of several simultaneously.
          </ExampleBox>

          {/* ===== SECTION 2 ===== */}
          <SectionHeading id="competition" number="Section 2" title="Competition" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Competition is one of the most fundamental and pervasive social processes. It is the process by which individuals or groups strive against one another for the same limited goals, rewards, or resources. Competition occurs when what one party gains, another cannot have — when the prize is scarce and multiple parties want it.
          </p>

          <SubHeading>Meaning and Definitions</SubHeading>

          <div className="space-y-3 mb-5">
            {[
              { scholar: "Sociological definition", def: "Competition is a form of social interaction in which two or more parties strive for the same goal that is scarce enough that not all can obtain it. It is an impersonal, continuous struggle for rewards that are limited." },
              { scholar: "George Simmel", def: "Competition is an indirect form of conflict — rather than fighting each other directly, competitors focus their energies on achieving the prize ahead of their rivals. The goal is to outperform, not to harm." },
              { scholar: "Charles Cooley", def: "Competition is the universal form of social struggle that pervades all social life. It is the striving of two or more individuals or groups for the same goal, where the success of one limits or excludes the success of others." },
              { scholar: "Park and Burgess", def: "Competition is an interaction process through which individuals and groups seek to control conditions that are valued by both parties but limited in supply. It is the struggle for position, prestige, and reward." },
            ].map(({ scholar, def }) => (
              <div key={scholar} className="rounded-lg border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-4 py-2 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-xs">{scholar}</p>
                </div>
                <p className="px-4 py-3 text-sm text-foreground/80 leading-relaxed italic">"{def}"</p>
              </div>
            ))}
          </div>

          <SubHeading>Characteristics of Competition</SubHeading>
          <PointList items={[
            "Competition is universal — it is found in every human society, from the most technologically simple to the most complex. It is a fundamental feature of social life wherever resources are limited and aspirations are unlimited.",
            "Competition is continuous — it is not a single event but an ongoing process. As long as there are scarce goods and ambitious people, competition persists. Even after one competition ends, another begins.",
            "Competition is impersonal — competitors typically focus on the goal rather than on harming or defeating their rivals. A student competing for a scholarship focuses on improving their grades, not on sabotaging fellow students. This impersonality distinguishes competition from conflict.",
            "Competition is governed by rules and norms — pure, unconstrained competition would collapse into conflict. All forms of institutionalised competition (exams, elections, business markets, sports) are governed by agreed rules that define what constitutes fair and unfair competition.",
            "Competition is dynamic — it promotes change and innovation. When competitors strive to outperform one another, they are driven to improve, innovate, and develop new strategies. This dynamism is one of competition's most valuable social functions.",
            "Competition is conscious or unconscious — sometimes people knowingly compete (e.g., applying for the same job); sometimes they compete without being aware of it (e.g., two businesses attracting the same customers without directly engaging each other).",
            "Competition produces inequality — by its nature, competition produces winners and losers. This differential outcome is simultaneously its motivation engine (the desire to win drives effort) and its primary social problem (losers may be disadvantaged, marginalised, or excluded).",
          ]} />

          <SubHeading>Importance of Competition</SubHeading>
          <div className="space-y-3 mb-4">
            {[
              ["Stimulates effort and excellence", "Competition motivates individuals and groups to push beyond their comfort zones and develop their full potential. Students compete for scholarships, athletes compete for medals, scientists compete for recognition — in each case, the competition raises the quality of the outcome. Without competition, there would be less incentive for excellence."],
              ["Drives innovation and progress", "Competing parties are constantly searching for ways to outperform rivals. This search drives invention, creativity, and innovation. The competition between Apple and Samsung, for example, has produced remarkable advances in smartphone technology. The competition between pharmaceutical companies drove the extraordinary speed of COVID-19 vaccine development."],
              ["Allocates scarce resources efficiently", "In a market economy, competition is the primary mechanism for allocating scarce resources to their most valued uses. Prices, wages, and profits are determined by competitive forces, directing resources toward the goods and services that people most want."],
              ["Reveals talent and ability", "Competition creates conditions under which genuine talent and skill can be identified and rewarded. Competitive examinations, sports tournaments, and job interviews all function as mechanisms for identifying the most capable individuals for valued positions."],
              ["Promotes social mobility", "When competition is fair and rules-based, it allows individuals from any background to rise based on merit. This creates channels of social mobility that can reduce the rigidity of inherited class or caste hierarchies."],
              ["Maintains social order through legitimate channels", "By providing legitimate, rule-governed ways to pursue scarce goods, competition channels ambitions and rivalries that might otherwise erupt into open conflict or crime. The ballot box, the courtroom, the job market, and the sports field all function as institutionalised competitive arenas that absorb social tensions."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <SubHeading>How Competition Can Be Used to Solve Social Problems</SubHeading>
          <PointList items={[
            "Improving public services through competitive tendering — when governments require multiple providers to compete for contracts to deliver public services (roads, hospitals, schools), competition can improve quality, reduce costs, and reduce corruption. Procurement laws in Kenya require competitive bidding for public contracts precisely because competition discourages cartels and inflated pricing.",
            "Reducing corruption through competitive elections — democratic elections are a form of political competition. Where elections are genuinely competitive and free, politicians who perform poorly lose power to rivals. This competitive accountability mechanism is one of the most powerful anti-corruption tools available to societies.",
            "Improving education outcomes through merit-based scholarships — competitive scholarship programmes incentivise academic effort among students who might otherwise lack motivation. The Kenya Certificate of Secondary Education examination creates nationwide academic competition that drives students to develop their intellectual potential.",
            "Addressing unemployment through competitive job markets — where labour markets are genuinely competitive, employers must offer attractive wages and conditions to attract talent, while workers must develop marketable skills to compete effectively. Policies that remove barriers to fair labour market competition (e.g., anti-discrimination laws, skills training programmes) can reduce structural unemployment.",
            "Spurring technological solutions to social problems — competitions specifically designed to solve social problems (hackathons, innovation prizes, social entrepreneurship competitions) channel competitive energies toward addressing poverty, disease, climate change, and other challenges. Prize competitions for renewable energy technology, for example, have accelerated the development of solar and wind power.",
          ]} />

          <WarningBox>
            <strong>When competition becomes a problem:</strong> Competition is most beneficial when it is fair, rule-governed, and does not produce excessive inequality. When competition is unfair (e.g., rigged tenders, examination cheating, discriminatory hiring), it breeds cynicism and resentment. When competition is too intense and unregulated, it can lead to stress, burnout, unethical behaviour, and breakdown of social bonds. Societies must manage competition through appropriate rules, anti-monopoly legislation, and social safety nets for those who lose out.
          </WarningBox>

          {/* ===== SECTION 3 ===== */}
          <SectionHeading id="conflict" number="Section 3" title="Conflict" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Conflict is the social process in which two or more parties engage in direct, open struggle against one another. Unlike competition — which is impersonal and governed by rules — conflict is personal, direct, and often involves an attempt to overcome, defeat, damage, neutralise, or eliminate the opposing party. Conflict occurs when competition breaks down, when communication fails, or when the stakes are too high for parties to accept competitive outcomes.
          </p>

          <SubHeading>Meaning and Definitions</SubHeading>

          <div className="space-y-3 mb-5">
            {[
              { scholar: "General sociological definition", def: "Conflict is a social process in which individuals or groups seek to further their interests by harming, defeating, or eliminating rival parties who stand in the way of their goals. It is a struggle for goals, values, status, power, or resources in which the aims of the opposing parties are to neutralise, injure, or eliminate the rivals." },
              { scholar: "Lewis Coser", def: "Conflict is a struggle over values and claims to scarce status, power, and resources, in which the aims of the opponents are to neutralise, injure, or eliminate their rivals. Conflict, however, also has positive functions — it can clarify issues, mobilise resources, and ultimately lead to social change and more just arrangements." },
              { scholar: "Karl Marx", def: "Conflict (particularly class conflict) is the engine of social history. All social progress is driven by the struggle between groups with opposing interests — particularly between those who own the means of production and those who must sell their labour. Social change happens through conflict, not through gradual harmonious evolution." },
              { scholar: "Georg Simmel", def: "Conflict is a form of socialisation — paradoxically, it is a social process that, while apparently divisive, actually creates bonds and defines social boundaries. Groups in conflict become more internally cohesive; the common enemy unifies what was previously disparate." },
            ].map(({ scholar, def }) => (
              <div key={scholar} className="rounded-lg border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-4 py-2 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-xs">{scholar}</p>
                </div>
                <p className="px-4 py-3 text-sm text-foreground/80 leading-relaxed italic">"{def}"</p>
              </div>
            ))}
          </div>

          <SubHeading>Characteristics of Conflict</SubHeading>
          <PointList items={[
            "Conflict is personal — unlike competition, which focuses on the prize, conflict focuses on the opposing party. In conflict, the goal becomes not just to win but to defeat, damage, or eliminate the rival. Conflict is about 'us versus them.'",
            "Conflict involves direct confrontation — the opposing parties engage each other directly, whether physically (violence), verbally (arguments, accusations), legally (litigation), or economically (trade wars, boycotts).",
            "Conflict is conscious and intentional — parties in conflict are aware of the opposition and actively choose to engage in struggle. This distinguishes conflict from mere misunderstanding or accidental friction.",
            "Conflict is emotionally charged — it typically involves anger, fear, resentment, hatred, pride, and other strong emotions that intensify the struggle and make resolution more difficult.",
            "Conflict creates social boundaries — conflict clearly defines 'insiders' and 'outsiders,' 'us' and 'them.' This boundary-drawing function can strengthen in-group solidarity even as it damages relations with out-groups.",
            "Conflict can be constructive or destructive — not all conflict is harmful. Constructive conflict challenges unjust arrangements, brings hidden grievances to the surface, stimulates creative problem-solving, and drives social change. Destructive conflict causes suffering, destroys relationships, and wastes social resources.",
            "Conflict has escalation dynamics — conflicts tend to escalate: small disagreements become arguments, arguments become grievances, grievances become confrontations, confrontations become violence. Understanding escalation dynamics is essential for conflict prevention and resolution.",
          ]} />

          <SubHeading>Importance of Conflict</SubHeading>
          <div className="space-y-3 mb-4">
            {[
              ["Signals social dysfunction and unmet needs", "Conflict is often a symptom of deeper social problems — inequality, injustice, discrimination, or unmet needs. Like pain in the body, conflict draws attention to problems that might otherwise be ignored. Suppressing conflict without addressing its causes is like taking painkillers for a broken leg without setting the bone."],
              ["Drives social change and justice", "Many of the greatest advances in social justice — the abolition of slavery, the end of colonial rule, women's suffrage, civil rights — were achieved through conflict. Oppressed groups who accepted their situation without conflict would not have achieved liberation. Conflict is often the only language that entrenched power understands."],
              ["Strengthens group solidarity", "Groups in conflict become more internally united. Shared adversity forges bonds of solidarity, loyalty, and collective identity. The history of liberation movements, trade unions, and independence struggles all demonstrate how conflict unifies disparate individuals into cohesive social movements."],
              ["Clarifies values and boundaries", "Conflict forces parties to articulate and defend their values, interests, and positions. This clarification — while painful — can produce greater mutual understanding of where genuine differences lie, making subsequent negotiation and accommodation more informed and durable."],
              ["Prevents social stagnation", "Societies that suppress all conflict risk stagnation, corruption, and eventual explosive breakdown. A degree of managed conflict — through democratic debate, judicial processes, and social movements — keeps societies dynamic, accountable, and capable of self-correction."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <SubHeading>How Conflict Can Be Used to Solve Social Problems</SubHeading>
          <PointList items={[
            "Channelling conflict through legal institutions — courts, tribunals, and regulatory bodies transform destructive inter-personal or inter-group conflict into rule-governed legal proceedings. Instead of fighting in the streets, disputing parties fight with evidence and arguments before an impartial adjudicator. This institutionalisation of conflict is one of the great civilisational achievements of the rule of law.",
            "Using constructive conflict to challenge injustice — organised protest, civil disobedience, strikes, and advocacy campaigns use the energy of social conflict constructively to pressure those in power to address legitimate grievances. Kenya's 2024 youth-led protests against the Finance Bill demonstrated how peaceful but assertive conflict can force policy change.",
            "Conflict resolution and peace-building — conflict resolution professionals use structured processes to help parties in conflict identify the root causes of their dispute, understand each other's perspectives, and develop mutually acceptable solutions. Peace-building goes further, addressing the underlying structural inequalities and historical grievances that generate recurring conflict.",
            "Using conflict analysis to design better policies — understanding what causes conflict in a particular community allows policymakers to address root causes rather than symptoms. If land conflicts in a county are caused by unclear tenure rights, the solution is land registration reform — not just policing the conflict after it erupts.",
            "Ethnic and inter-community dialogue — where conflict has deep ethnic, religious, or cultural roots, sustained structured dialogue between community representatives can build mutual understanding, humanise 'the other,' and develop shared frameworks for coexistence. Kenya's National Cohesion and Integration Commission facilitates such dialogue as part of its conflict prevention mandate.",
          ]} />

          <ExampleBox>
            <strong>Conflict driving positive social change in Kenya:</strong> The 2007–2008 post-election violence in Kenya killed over 1,000 people and displaced hundreds of thousands. But the catastrophic conflict also created the political conditions for a transformative social outcome: the 2010 Constitution, which established a devolved system of government, a Bill of Rights, independent institutions (IEBC, IPOA, the Judiciary), and constitutional limits on executive power. The conflict revealed fatal flaws in Kenya's political structure and created the political will to address them. This is a dramatic example of destructive conflict catalysing constructive social reform.
          </ExampleBox>

          {/* ===== SECTION 4 ===== */}
          <SectionHeading id="cooperation" number="Section 4" title="Cooperation" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Cooperation is the social process through which individuals and groups work together toward shared goals, combining their efforts, resources, and skills for mutual benefit. It is perhaps the most fundamentally human of all social processes — the capacity for large-scale cooperation is what distinguishes human civilisation from the behaviour of other animals and makes our extraordinary collective achievements possible.
          </p>

          <SubHeading>Meaning and Definitions</SubHeading>

          <div className="space-y-3 mb-5">
            {[
              { scholar: "Sociological definition", def: "Cooperation is a social process in which two or more individuals or groups work together to achieve a common goal. It involves the pooling of resources, effort, and knowledge, with benefits shared among the participants. Cooperation requires mutual agreement on goals, trust between parties, and willingness to subordinate individual interests to collective ones." },
              { scholar: "C.H. Cooley", def: "Cooperation arises when men realise that they have common interests. It is the joint effort of two or more persons for a common end. It is the most basic and fundamental of all social processes, without which no complex social organisation would be possible." },
              { scholar: "A.W. Green", def: "Cooperation is the continuous and common endeavour of two or more persons to perform a task or to reach a goal that is commonly cherished. It is the most fundamental of all social processes." },
              { scholar: "Merrill and Eldredge", def: "Cooperation is a form of social interaction wherein two or more persons work together to gain a common end. It is characterised by a combination of efforts toward a goal that benefits all the participants." },
            ].map(({ scholar, def }) => (
              <div key={scholar} className="rounded-lg border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-4 py-2 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-xs">{scholar}</p>
                </div>
                <p className="px-4 py-3 text-sm text-foreground/80 leading-relaxed italic">"{def}"</p>
              </div>
            ))}
          </div>

          <SubHeading>Characteristics of Cooperation</SubHeading>
          <PointList items={[
            "Cooperation requires common goals — parties cooperate because they share an objective that none can achieve alone, or that can be achieved more efficiently together. Without a shared goal, there is no basis for cooperation.",
            "Cooperation is voluntary — genuine cooperation requires the willing participation of all parties. Forced collaboration is not true cooperation; it is coercion. This voluntariness is what gives cooperation its moral and social value.",
            "Cooperation requires trust — cooperative relationships depend on trust that each party will fulfil their commitments. Where trust breaks down, cooperation collapses. Building and maintaining trust is therefore a central challenge in all cooperative endeavours.",
            "Cooperation involves division of labour — in most cooperative arrangements, different parties contribute different skills, resources, or efforts according to their capacities. This specialisation makes the collective effort more efficient than it would be if everyone tried to do everything.",
            "Cooperation is mutual and reciprocal — the benefits of cooperation are shared among participants, though not necessarily equally. The sharing of benefits is what distinguishes cooperation from exploitation.",
            "Cooperation is universal — it exists in some form in every human society and at every level of social organisation, from a family sharing a meal to international alliances between nations.",
            "Cooperation can be direct or indirect — direct cooperation involves face-to-face interaction (e.g., a study group). Indirect cooperation occurs when parties pursue a common end without direct interaction (e.g., all taxpayers cooperating to fund public services through taxes).",
          ]} />

          <SubHeading>Types of Cooperation</SubHeading>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {[
              ["Primary Cooperation", "Cooperation within primary groups (families, close-knit communities) where members share a common life and identity. Goals and rewards are shared communally. Example: a family farming together."],
              ["Secondary Cooperation", "Cooperation within formal organisations (businesses, schools, governments) where members cooperate to achieve organisational goals in exchange for wages or other individual benefits. Example: employees cooperating within a company."],
              ["Tertiary Cooperation", "Cooperation between groups or organisations that may also be competitors. Also called 'symbiotic cooperation.' Example: competing businesses cooperating to lobby government for favourable industry regulations."],
              ["Spontaneous Cooperation", "Unplanned, unorganised cooperation that arises naturally in response to a situation. Example: bystanders spontaneously cooperating to help accident victims before emergency services arrive."],
            ].map(([type, desc]) => (
              <div key={String(type)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{type}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <SubHeading>Importance of Cooperation</SubHeading>
          <div className="space-y-3 mb-4">
            {[
              ["Foundation of social life", "Without cooperation, no complex social organisation is possible. Language itself is a cooperative achievement — it requires that speakers agree on the meanings of words. Law, government, education, commerce, religion — all depend on sustained cooperation among large numbers of people who may never meet each other personally."],
              ["Enables the achievement of goals beyond individual capacity", "Most of the greatest human achievements — from the construction of cities to the mapping of the human genome to space exploration — required cooperation on a scale impossible for any individual. Cooperation multiplies human capacity far beyond what any individual can achieve alone."],
              ["Promotes social solidarity and cohesion", "Cooperative experiences build bonds of trust, mutual obligation, and shared identity. Groups that cooperate regularly develop strong social cohesion — a sense of 'we' that sustains them through adversity. This social capital is one of the most important assets a community can have."],
              ["Reduces waste and duplication", "When parties cooperate rather than each pursuing goals independently, they can pool resources, eliminate duplication, and achieve more with less. International scientific cooperation, for example, prevents the duplication of expensive experiments and accelerates the pace of discovery."],
              ["Builds resilience", "Cooperative communities are more resilient in the face of adversity — natural disasters, economic hardship, conflict, and public health emergencies. Communities with high levels of social trust and cooperative capacity recover from shocks faster and more completely than those characterised by individualism and distrust."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <SubHeading>How Cooperation Can Be Used to Solve Social Problems</SubHeading>
          <PointList items={[
            "Community-based problem solving through collective action — many local problems (poor sanitation, inadequate roads, insecurity) can be addressed through organised community cooperation. Community-led initiatives pool labour, materials, and local knowledge to address problems that neither the state nor individual households can solve alone. Kenya's community water projects, village savings groups (chamas), and neighbourhood security watches are examples.",
            "Public-private partnerships — complex social problems (infrastructure, healthcare, education) can be addressed more effectively when government, private sector, and civil society cooperate, each contributing their comparative advantages. Effective PPPs combine government's regulatory authority and public mandate with private sector's capital and efficiency and civil society's community trust and accountability.",
            "International cooperation on global challenges — climate change, pandemics, terrorism, and financial crises cross national borders and cannot be solved by any single country acting alone. The Paris Agreement on climate change, the World Health Organization's pandemic response, and Interpol's cooperation on transnational crime are all examples of international cooperation addressing global social problems.",
            "Cooperative economic models — cooperatives (producer cooperatives, consumer cooperatives, housing cooperatives) give members collective ownership and democratic control over economic resources, making economic participation more equitable. Kenya's tea and coffee industries are largely organised through cooperative structures, allowing smallholder farmers to access markets and processing facilities that would be unaffordable individually.",
            "Inter-ethnic and interfaith cooperation for peacebuilding — one of the most powerful tools for reducing ethnic and religious conflict is structured cooperation between members of different groups on shared projects. When Kikuyu and Luo farmers cooperate on an irrigation project, they build relationships, develop mutual respect, and undermine the ethnic stereotypes that fuel conflict.",
          ]} />

          <ExampleBox>
            <strong>Harambee — the Kenyan tradition of cooperative problem-solving:</strong> Kenya's founding president Jomo Kenyatta made <em>harambee</em> (Swahili for "pulling together") the national motto. The tradition of communal fundraising — where community members pool resources to build schools, fund medical bills, pay university fees, and respond to disasters — is a deeply ingrained form of cooperation. It reflects the African philosophy of ubuntu ("I am because we are") and has been instrumental in funding infrastructure and services in communities where state provision is inadequate. Harambee is cooperation institutionalised as culture.
          </ExampleBox>

          {/* ===== SECTION 5 ===== */}
          <SectionHeading id="accommodation" number="Section 5" title="Accommodation" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Accommodation is the social process through which individuals or groups adjust to each other in ways that reduce conflict and enable them to coexist, even when their differences, disagreements, or incompatibilities have not been fully resolved. Accommodation is not the same as agreement — it is the achievement of a workable, tolerable arrangement that allows social life to continue despite persistent differences.
          </p>

          <SubHeading>Meaning and Definitions</SubHeading>

          <div className="space-y-3 mb-5">
            {[
              { scholar: "Park and Burgess", def: "Accommodation is the process by which warring individuals or groups reach a working arrangement whereby each party can continue to exist. It refers to changes in behaviour (but not necessarily in attitude) that reduce conflict and enable coexistence. Accommodation is the organisation of relations that prevents continuous conflict." },
              { scholar: "Ogburn and Nimkoff", def: "Accommodation refers to the adjustments which persons and groups make in order to end or prevent conflict, lessen competition, and maintain inter-individual or inter-group associations. It is an adjustment to a situation that is taken for granted, which underlies all social relations." },
              { scholar: "Biesanz and Biesanz", def: "Accommodation is a process by which human beings adjust themselves to the social environment — particularly to situations of conflict — in such a way that they can function with reasonable efficiency. It involves adopting a tolerable modus vivendi (way of living) with others." },
            ].map(({ scholar, def }) => (
              <div key={scholar} className="rounded-lg border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-4 py-2 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-xs">{scholar}</p>
                </div>
                <p className="px-4 py-3 text-sm text-foreground/80 leading-relaxed italic">"{def}"</p>
              </div>
            ))}
          </div>

          <NoteBox>
            <strong>Accommodation vs. Assimilation:</strong> Accommodation means adjusting behaviour to live alongside those who are different, while maintaining distinct identities. Assimilation means merging into the dominant group and losing separate identity. A Somali refugee community in Nairobi that maintains its language, religion, and customs while adapting its economic behaviour to Kenyan norms is accommodating. A Somali family that adopts Kenyan language, dress, and social practices as their own is assimilating. Accommodation preserves diversity; assimilation reduces it.
          </NoteBox>

          <SubHeading>Characteristics of Accommodation</SubHeading>
          <PointList items={[
            "Accommodation is not resolution — it does not eliminate the underlying causes of conflict or the fundamental differences between parties. It achieves a temporary or lasting truce, but the underlying tensions may remain. A negotiated ceasefire between warring countries is accommodation — the causes of the war have not been resolved, but the fighting has stopped.",
            "Accommodation may be involuntary — parties may accommodate each other not because they want to, but because they have no better option. A colonised people may accommodate colonial rule not because they accept its legitimacy, but because armed resistance is too costly.",
            "Accommodation changes behaviour but not necessarily attitudes — a person who accommodates a colleague they dislike may act professionally toward them while privately maintaining their negative feelings. This gap between behavioural accommodation and attitudinal change is why accommodation alone is not always a durable solution.",
            "Accommodation is gradual — it typically develops over time as parties discover through trial and error what arrangements are mutually tolerable. It is not usually achieved through a single dramatic act but through an accumulating series of small adjustments.",
            "Accommodation is universal — all social life requires some degree of accommodation. Even in the most harmonious relationships, people must continuously adjust their behaviour to accommodate the needs, preferences, and limitations of others.",
            "Accommodation can become institutionalised — when accommodation arrangements prove durable, they may be formalised into laws, treaties, customs, or institutions. Kenya's power-sharing arrangements following the 2007–2008 post-election crisis were an institutionalised accommodation between the competing political factions.",
          ]} />

          <SubHeading>Forms of Accommodation</SubHeading>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            {[
              ["Compromise", "Both parties give up something to reach a mutually acceptable arrangement. Neither gets everything they want, but both get something. The most common form of accommodation in negotiations and disputes."],
              ["Mediation", "A third party helps conflicting parties reach an accommodation by facilitating communication, clarifying misunderstandings, and proposing workable arrangements. The mediator has no authority to impose a solution."],
              ["Arbitration", "A third party with authority hears both sides and imposes a binding accommodation. Unlike mediation, the parties agree in advance to accept the arbitrator's decision."],
              ["Coercion", "One party forces accommodation on the other through power. The weaker party adjusts their behaviour because they have no choice. This is an unstable form of accommodation — it lasts only as long as the power differential persists."],
              ["Conciliation", "An attempt to bring hostile parties together by reducing tension, building goodwill, and creating conditions for dialogue. Unlike mediation, conciliation does not involve active problem-solving but focuses on improving the relationship."],
              ["Tolerance", "An agreement — explicit or implicit — to accept differences without necessarily approving of them. Religious tolerance, for example, means allowing people to practice different faiths without endorsing those faiths."],
            ].map(([form, desc]) => (
              <div key={String(form)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{form}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <SubHeading>Importance of Accommodation</SubHeading>
          <PointList items={[
            "Prevents destructive conflict — accommodation channels potential conflict into manageable adjustments, preventing the escalation to open violence or irreparable social rupture. In a diverse society like Kenya's, with 44+ ethnic groups, accommodation is not a luxury — it is a survival necessity.",
            "Enables social continuity — by allowing incompatible parties to coexist without resolving every underlying difference, accommodation keeps social life functioning. Without accommodation, every unresolved difference would become a reason for conflict.",
            "Creates space for longer-term reconciliation — accommodation is often the first step toward deeper resolution. By reducing the immediate threat of conflict, it creates the conditions of relative calm in which parties can begin the harder work of addressing underlying causes.",
            "Preserves cultural diversity — accommodation allows different cultural, religious, and ethnic communities to maintain their distinct identities while participating in a common social framework. Multicultural societies depend on accommodation to function.",
            "Builds social resilience — societies with developed accommodation capacities — strong conflict resolution institutions, cultures of compromise, respected mediation traditions — are more resilient in the face of social stress than those that respond to every difference with escalation.",
          ]} />

          <SubHeading>How Accommodation Can Be Used to Solve Social Problems</SubHeading>
          <PointList items={[
            "Power-sharing arrangements in post-conflict societies — where political competition has produced violent conflict, accommodation through negotiated power-sharing can restore stability and create conditions for reconciliation. Kenya's 2008 National Accord and Reconciliation Act, which created a power-sharing government between PNU and ODM, is a classic example of political accommodation averting civil war.",
            "Legal pluralism — accommodating different legal traditions (customary law, religious law, civil law) within a national legal framework allows communities to govern themselves according to their own traditions while remaining within the national legal order. Kenya's constitution recognises customary law and kadhi courts as part of this accommodation.",
            "Accommodating diversity in the workplace — organisations with diverse workforces need accommodation mechanisms to manage differences in religious practices (prayer times, dietary restrictions), cultural communication styles, and family obligations. Workplace accommodation policies reduce discrimination grievances and improve productivity.",
            "Land dispute accommodation through community agreements — rather than forcing all land disputes through formal courts (which are expensive, slow, and often culturally alienating), communities can use traditional accommodation mechanisms — council of elders, community mediation — to reach workable arrangements about land use and boundaries.",
            "Interfaith accommodation for social peace — in communities with multiple religious traditions, structured interfaith dialogue and formal agreements about the use of shared spaces, the timing of religious events, and the rights of converts can prevent religious disputes from escalating into violence.",
          ]} />

          {/* ===== SECTION 6 ===== */}
          <SectionHeading id="negotiation" number="Section 6" title="Negotiation" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Negotiation is the structured process through which two or more parties with different interests, needs, or goals communicate with each other in order to reach a mutually acceptable agreement. It is simultaneously a social process, a communication skill, and a problem-solving technique. Negotiation is distinguished from other social processes by its deliberate, structured character — it is a conscious, intentional effort to reach agreement through dialogue.
          </p>

          <SubHeading>Meaning and Definitions</SubHeading>

          <div className="space-y-3 mb-5">
            {[
              { scholar: "General definition", def: "Negotiation is a process of communication and bargaining between two or more parties who seek to reach a mutually acceptable agreement about one or more issues on which they disagree. It involves making offers and counteroffers, making concessions, and ultimately reaching a settlement that all parties can live with." },
              { scholar: "Fisher and Ury (Getting to Yes, 1981)", def: "Negotiation is a basic means of getting what you want from others. It is back-and-forth communication designed to reach an agreement when you and the other side have some interests that are shared and others that are opposed. Principled negotiation focuses on interests rather than positions — asking not 'what do you want?' but 'why do you want it?' — and seeks outcomes that satisfy the underlying interests of all parties." },
              { scholar: "Rubin and Brown", def: "Negotiation is a process in which two or more parties exchange offers, make demands, and reach agreements through communication and persuasion rather than through force or authority. It is an interaction between equals (or near-equals) who have something the other wants." },
              { scholar: "Pruitt and Carnevale", def: "Negotiation is a discussion between two or more parties aimed at resolving incompatible goals. It is a voluntary process in which both parties have the choice of reaching agreement or walking away — the possibility of no agreement is what gives both parties leverage." },
            ].map(({ scholar, def }) => (
              <div key={scholar} className="rounded-lg border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-4 py-2 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-xs">{scholar}</p>
                </div>
                <p className="px-4 py-3 text-sm text-foreground/80 leading-relaxed italic">"{def}"</p>
              </div>
            ))}
          </div>

          <SubHeading>Characteristics of Negotiation</SubHeading>
          <PointList items={[
            "Negotiation involves two or more parties — negotiation requires at least two parties with the authority to make and accept commitments. Single-party decision-making is not negotiation.",
            "Negotiation involves conflict of interest — parties negotiate because they want different things, or the same scarce thing. If there were no conflict, there would be no need to negotiate.",
            "Negotiation is a voluntary process — unlike arbitration or adjudication, where a third party imposes a solution, negotiation involves parties voluntarily choosing to engage in dialogue and accepting or rejecting proposed agreements.",
            "Negotiation involves information exchange — effective negotiation requires parties to share enough information about their interests, constraints, and priorities to identify areas of potential agreement. Withholding all information leads to deadlock; sharing all information may lead to exploitation.",
            "Negotiation involves concessions — reaching agreement typically requires each party to give up something they initially wanted. The art of negotiation lies in making concessions on issues of lesser importance while protecting interests of greater importance.",
            "Negotiation is goal-directed — the purpose of negotiation is to reach an agreement. This goal-orientation distinguishes it from mere discussion or debate, which may be open-ended.",
            "Negotiation can be distributive or integrative — distributive negotiation treats the situation as zero-sum (one party's gain is the other's loss) and focuses on claiming as large a share of the available value as possible. Integrative negotiation seeks to expand the total value available by finding creative solutions that address the underlying interests of both parties.",
          ]} />

          <SubHeading>Key Concepts in Negotiation</SubHeading>
          <div className="overflow-x-auto mb-4">
            <table className="text-sm border border-border/40 w-full text-left">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">Concept</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">Meaning</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">Example</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  ["BATNA", "Best Alternative To a Negotiated Agreement — what you will do if no deal is reached. Your BATNA determines your power in negotiation.", "A job applicant with another job offer has a strong BATNA and can negotiate salary more boldly."],
                  ["ZOPA", "Zone Of Possible Agreement — the range within which a deal is possible. Agreement is only reachable within the ZOPA.", "If a buyer will pay up to Ksh 500,000 and a seller will accept as little as Ksh 450,000, the ZOPA is Ksh 450,000–500,000."],
                  ["Positions vs. Interests", "Positions are what parties say they want. Interests are why they want it. Negotiating on interests rather than positions opens more solutions.", "Position: 'I want Fridays off.' Interest: 'I need to care for an elderly parent.' A flexible schedule might satisfy the interest without the position."],
                  ["Anchoring", "The first offer in a negotiation sets a reference point that influences subsequent offers. Opening with a strong anchor is a powerful negotiating tactic.", "A seller who opens at Ksh 1 million anchors the negotiation even if the eventual price is Ksh 750,000."],
                  ["Win-Win", "An outcome in which both parties achieve their key interests — neither loses what matters most. Integrative negotiation aims for win-win.", "A tenant wants lower rent; a landlord wants reliable payment. A win-win: the tenant gets a reduced rate; the landlord gets a 2-year lease with advance payment."],
                ].map(([concept, meaning, example]) => (
                  <tr key={String(concept)}>
                    <td className="px-4 py-2 font-semibold text-foreground">{concept}</td>
                    <td className="px-4 py-2 text-muted-foreground">{meaning}</td>
                    <td className="px-4 py-2 text-muted-foreground italic">{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SubHeading>Importance of Negotiation</SubHeading>
          <div className="space-y-3 mb-4">
            {[
              ["Avoids costly conflict", "Negotiated solutions are almost always less costly — in time, money, emotional energy, relationships, and social capital — than the alternatives: litigation, strikes, violence, or broken relationships. The 2008 Kenya National Dialogue and Reconciliation process, led by Kofi Annan, negotiated an end to the post-election violence in six weeks, saving thousands of lives."],
              ["Produces durable agreements", "Agreements that parties have negotiated themselves, rather than having imposed upon them, tend to be more durable because all parties feel ownership of the outcome. Imposed settlements often unravel because aggrieved parties look for opportunities to re-open the issue."],
              ["Preserves and strengthens relationships", "Negotiation conducted respectfully and in good faith can actually strengthen relationships between parties, even difficult ones. Going through a difficult negotiation successfully builds trust and demonstrates that the relationship can handle stress."],
              ["Develops critical social skills", "The skills required for effective negotiation — active listening, empathy, analytical thinking, creative problem-solving, emotional regulation, communication, and persuasion — are among the most valuable capacities a person can develop. These skills transfer across every domain of personal and professional life."],
              ["Enables fair distribution of resources", "Through negotiation, parties can reach agreements about the distribution of resources, rights, and responsibilities that reflect their respective needs and contributions more accurately than arbitrary allocation. Wage negotiation between employers and trade unions is the primary mechanism through which the distribution of economic value between capital and labour is determined."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <SubHeading>How Negotiation Can Be Used to Solve Social Problems</SubHeading>
          <PointList items={[
            "Labour-management negotiations — disputes between workers and employers about wages, working conditions, and job security can be resolved through collective bargaining — a structured negotiation between trade unions and management. This process, when functioning well, prevents strikes, lockouts, and workplace violence while ensuring workers receive fair compensation. Kenya's Salaries and Remuneration Commission plays a role in facilitating such negotiations in the public sector.",
            "Peace negotiations in armed conflicts — some of the world's most intractable violent conflicts have been brought to an end through sustained negotiation. The Northern Ireland Good Friday Agreement (1998), the South African transition from apartheid (1990–1994), and the Kenya National Dialogue and Reconciliation (2008) all demonstrate that negotiation can end even deeply entrenched violent conflicts when parties are genuinely committed to finding a solution.",
            "Community resource allocation — disputes over land, water, and other shared resources within communities can be resolved through structured community negotiation involving all stakeholders. A negotiated water-sharing agreement among farmers upstream and downstream of a river is more durable and equitable than a unilateral decision by any single party.",
            "Business dispute resolution through Alternative Dispute Resolution (ADR) — commercial disputes that would otherwise clog courts can be resolved more quickly and cheaply through negotiation, mediation, and arbitration. Kenya's Arbitration Act and the Nairobi Centre for International Arbitration facilitate commercial dispute resolution through ADR, reducing the burden on the formal court system.",
            "International diplomacy on shared challenges — climate negotiations (like the Paris Agreement COP process), trade negotiations (like the African Continental Free Trade Area agreement), and diplomatic negotiations between neighbouring states over shared resources (like the Nile Basin Initiative) all use structured negotiation to reach agreements on complex, multi-stakeholder problems that no single party can solve alone.",
          ]} />

          <ExampleBox>
            <strong>Principled negotiation in practice — the 2022 doctors' strike resolution in Kenya:</strong> When Kenya's medical workers went on strike over pay and working conditions in 2022, the government faced a choice: use force to compel compliance (coercion), ignore the doctors (avoidance), or negotiate. Negotiation ultimately prevailed. The parties were brought to the table, each articulating their positions (doctors: pay rises; government: fiscal constraints) and then their interests (doctors: financial security and professional dignity; government: healthcare service delivery and fiscal responsibility). A phased implementation agreement was reached — a classic accommodation through negotiation. The agreement was imperfect and contested, but it ended the immediate crisis and preserved the possibility of continued dialogue.
          </ExampleBox>

          {/* ===== SECTION 7 ===== */}
          <SectionHeading id="comparison" number="Section 7" title="Comparison of Social Processes" />

          <div className="overflow-x-auto mb-6">
            <table className="text-sm border border-border/40 w-full text-left">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-3 py-2 border-b border-border/40 font-semibold">Feature</th>
                  <th className="px-3 py-2 border-b border-border/40 font-semibold text-amber-700 dark:text-amber-400">Competition</th>
                  <th className="px-3 py-2 border-b border-border/40 font-semibold text-red-700 dark:text-red-400">Conflict</th>
                  <th className="px-3 py-2 border-b border-border/40 font-semibold text-green-700 dark:text-green-400">Cooperation</th>
                  <th className="px-3 py-2 border-b border-border/40 font-semibold text-blue-700 dark:text-blue-400">Accommodation</th>
                  <th className="px-3 py-2 border-b border-border/40 font-semibold text-purple-700 dark:text-purple-400">Negotiation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20 text-xs">
                {[
                  ["Type", "Dissociative", "Dissociative", "Associative", "Associative", "Associative"],
                  ["Relationship", "Impersonal", "Personal/direct", "Collaborative", "Adjustive", "Communicative"],
                  ["Goal focus", "Winning the prize", "Defeating the rival", "Shared outcome", "Coexistence", "Mutual agreement"],
                  ["Rules", "Governed by rules", "May violate rules", "Shared norms", "Emerging norms", "Structured process"],
                  ["Outcome", "Win/lose", "Win/lose (often mutual loss)", "Win/win", "Tolerable coexistence", "Negotiated agreement"],
                  ["Social effect", "Innovation; inequality", "Change; destruction", "Solidarity; progress", "Stability; diversity", "Fair distribution; peace"],
                  ["Kenyan example", "KCSE examinations", "2007-08 post-election violence", "Harambee", "2008 National Accord", "CBA in public sector"],
                ].map(([feature, ...values]) => (
                  <tr key={String(feature)}>
                    <td className="px-3 py-2 font-semibold text-foreground">{feature}</td>
                    {values.map((v, i) => (
                      <td key={i} className="px-3 py-2 text-muted-foreground">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 9: Social Processes</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Social processes</strong> are the recurring patterns of interaction through which society is continuously shaped — some associative (bringing together), some dissociative (driving apart).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" /><span><strong>Competition</strong> — impersonal, rule-governed struggle for scarce rewards. Drives innovation and excellence but can produce inequality. Solution tool: merit-based systems, competitive elections, anti-corruption procurement.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" /><span><strong>Conflict</strong> — direct, personal struggle. Can be destructive but also drives social change and justice. Solution tool: legal institutions, dialogue, conflict resolution, peace-building.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /><span><strong>Cooperation</strong> — voluntary joint effort for shared goals. Foundation of all complex social organisation. Solution tool: community collective action, PPPs, cooperative economics, international agreements.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" /><span><strong>Accommodation</strong> — adjusting to reduce conflict without resolving underlying differences. Enables coexistence in diverse societies. Solution tool: power-sharing, mediation, legal pluralism, tolerance.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" /><span><strong>Negotiation</strong> — structured dialogue to reach mutually acceptable agreements. Most effective when focused on interests rather than positions (principled negotiation). Solution tool: labour-management bargaining, peace talks, community resource agreements, ADR.</span></li>
            </ul>
          </div>

          <div className="h-16" />
        </div>

        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-24 space-y-1">
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">Contents</p>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`}
                onClick={(e) => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" }); }}
                className={`block text-xs py-1 px-2 rounded transition-colors ${activeSection === s.id ? "text-primary font-semibold border-l-2 border-primary pl-3" : "text-muted-foreground hover:text-foreground border-l-2 border-transparent pl-3"}`}
              >{s.label}</a>
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
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90">
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </Layout>
  );
}
