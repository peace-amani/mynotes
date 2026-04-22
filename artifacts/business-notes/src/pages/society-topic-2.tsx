import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, AlertTriangle, CheckCircle2, BookOpen } from "lucide-react";

const sections = [
  { id: "meaning", label: "1. Meaning of Society" },
  { id: "definitions", label: "2. Scholarly Definitions" },
  { id: "origins", label: "3. Theories of Origin" },
  { id: "characteristics", label: "4. Characteristics of Society" },
  { id: "community", label: "5. Community vs Society" },
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

function QuoteBlock({ quote, author }: { quote: string; author: string }) {
  return (
    <blockquote className="my-6 border-l-4 border-primary/40 pl-6 py-2">
      <p className="font-serif text-base italic text-foreground/75 leading-relaxed">"{quote}"</p>
      <footer className="mt-2 text-sm text-muted-foreground">— {author}</footer>
    </blockquote>
  );
}

function TheoryCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/50 p-5 mb-4">
      <h3 className="font-semibold text-foreground text-base mb-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-primary" />
        {title}
      </h3>
      <div className="text-sm text-foreground/80 leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export default function SocietyTopic2() {
  const [activeSection, setActiveSection] = useState("meaning");
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
      { label: "Unit 3", href: "/unit/3" },
      { label: "Week 2: Society" },
    ]}>
      <Helmet>
        <title>Society — Definitions, Theories & Characteristics | Study Notes</title>
        <meta name="description" content="Meaning of society, scholarly definitions, theories of origin (Divine, Force, Social Contract), and 10 characteristics of society." />
        <meta property="og:title" content="Society — Week 2 | Society & Culture" />
        <meta property="og:image" content="https://notes.xwolf.space/og-home.svg" />
      </Helmet>

      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 2 · Society &amp; Culture</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Society: Meaning, Origins &amp; Characteristics</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              "Society" is the most fundamental concept in sociology — yet also one of the most vague. This week we examine what society truly means, how different scholars have defined it, the competing theories about how it came into existence, and the core characteristics that define every human society from the smallest village to the modern nation-state.
            </p>
          </div>

          {/* ===== SECTION 1 ===== */}
          <SectionHeading id="meaning" number="Section 1" title="Meaning and Nature of Society" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The term <strong>society</strong> is the most fundamental one in sociology — but also one of the most vague and general concepts in the sociologist's vocabulary. In everyday speech, we use the word loosely. We speak of "The Co-operative Society," "The Agricultural Society," "The Friendly Society," "The Society of Jesus," and "The Theosophical Society." In these examples, "society" means no more than an association. We also say "I enjoy his society," "I like the society of artists," or "I move in high society." Here society means companionship, association, or a class of people.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            In sociology, however, society has a much more precise and expansive meaning. The term is derived from the <strong>Latin word "socius,"</strong> which means <em>companionship or friendship</em>. Companionship means sociability. As the German sociologist <strong>George Simmel</strong> pointed out, it is this element of sociability — the tendency of human beings to seek and enjoy the company of others — that defines the true essence of society.
          </p>

          <ExplainerBox>
            <strong>Why the Latin root matters:</strong> The word "socius" (companion, ally) reveals something deep about the human condition. Society is not merely a collection of individuals who happen to occupy the same territory. It is a network of relationships held together by companionship, mutual recognition, and shared purpose. When Aristotle declared that "man is a social animal," he was pointing to the same truth: human beings are fundamentally wired for togetherness, and they wither in isolation.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Society indicates that man always lives in the company of other people. Man lives in towns, cities, tribes, and villages — but never truly alone. Loneliness brings boredom and fear. Man needs society for his physical, psychological, and spiritual survival. Society is not just around us — as Maclver puts it, it is <strong>within us as well as around us</strong>. It shapes our beliefs, our morals, our ideals, and our emotional and intellectual development.
          </p>

          <ExampleBox>
            <strong>Real-world illustration:</strong> Consider a Kenyan child born in a remote village. From the moment of birth, society acts upon them: naming ceremonies dictate what they are called, family elders determine how they are raised, the local school teaches the national curriculum, the church or mosque shapes their moral outlook, age-mates influence their identity during adolescence, and the state governs their adult life through law. At no point is this person ever truly outside society — even hermits who retreat from the world carry society's language, beliefs, and values within them.
          </ExampleBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Society makes our life livable. It is the nurse of youth, the arena of manhood and womanhood. Society not only liberates the activities of men but also limits them. It controls behaviour in countless ways. It shapes our attributes, beliefs, morals and ideals. Emotional development, intellectual maturity, satisfaction of physical needs and the expression of our aesthetic impulses — all are dependent on society.
          </p>

          {/* ===== SECTION 2 ===== */}
          <SectionHeading id="definitions" number="Section 2" title="Scholarly Definitions of Society" />

          <p className="text-base text-foreground/80 leading-relaxed mb-5">
            Different sociologists have defined society from different angles — some emphasising its relational nature, others its organisational complexity, and yet others its normative dimensions. Each definition captures a different facet of this multifaceted concept.
          </p>

          {[
            {
              scholar: "Morris Ginsberg",
              definition: "A society is a collection of individuals united by certain relations or mode of behavior which mark them off from others who do not enter into these relations or who differ from them in behavior.",
              explanation: "Ginsberg draws attention to the fact that what makes a group a 'society' is not merely co-presence but shared behaviour patterns and relationships. Members of a society are distinguished from non-members precisely because they share common ways of acting, relating, and interacting. This definition highlights the boundary-drawing function of society — defining who belongs and who does not."
            },
            {
              scholar: "G.D.M. Cole",
              definition: "Society is the complex of organized associations and institutions within a community.",
              explanation: "Cole stresses the organised, institutional dimension of society. Society is not just a crowd or a gathering — it is a structured network of institutions (family, school, government, religion, economy) and associations (clubs, trade unions, political parties) that give human collective life its coherence and continuity."
            },
            {
              scholar: "Prof. Giddings",
              definition: "Society is the union itself, the organization, the sum of formal relations in which associating individuals are bound together.",
              explanation: "Giddings emphasises the formal, structured nature of social bonds. Society exists as a total system of organised relationships — not just the individuals within it. This foreshadows modern systems theory: society is more than the sum of its parts."
            },
            {
              scholar: "Lapiere",
              definition: "The term society refers not to a group of people, but to the complex pattern of norms of interaction that arise among and between them.",
              explanation: "This is a profoundly important definition. Lapiere shifts our focus from the people themselves to the patterns of interaction between them. Society, in this view, exists in the relationships and the rules that govern those relationships — not in the physical individuals. Two people who have never met are part of the same society if they follow the same norms and interact within the same set of expectations."
            },
            {
              scholar: "Maclver",
              definition: "Society is a web of social relationships.",
              explanation: "Perhaps the most elegant and widely cited definition. Maclver captures the essence of society in a single metaphor: a web. Like a spider's web, society consists of countless interconnected threads of relationship. Remove any thread and the web is weakened; remove too many and it collapses. Every person is connected to every other through chains of relationship — family, work, neighbourhood, commerce, politics, culture."
            },
          ].map(({ scholar, definition, explanation }) => (
            <div key={scholar} className="mb-5 rounded-xl border border-border/60 bg-card/50 overflow-hidden">
              <div className="px-5 py-3 border-b border-border/40 bg-muted/30">
                <p className="font-semibold text-foreground text-sm">{scholar}</p>
              </div>
              <div className="px-5 py-4">
                <blockquote className="border-l-4 border-primary/40 pl-4 italic text-sm text-foreground/75 mb-3">"{definition}"</blockquote>
                <p className="text-sm text-foreground/80 leading-relaxed">{explanation}</p>
              </div>
            </div>
          ))}

          <NoteBox>
            <strong>Synthesis:</strong> Reading these definitions together reveals a consistent theme — society is not about individuals in isolation, but about the <em>relationships</em>, <em>norms</em>, <em>institutions</em>, and <em>shared patterns of behaviour</em> that bind people together into an organised collective life. Society is both the product of human interaction and the framework within which all human interaction takes place.
          </NoteBox>

          {/* ===== SECTION 3 ===== */}
          <SectionHeading id="origins" number="Section 3" title="Theories of the Origin of Society" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            How did human societies first come into existence? Why do human beings live in organised groups rather than in isolation? Several scholars and schools of thought have proposed different theories to explain the origin of society. Whatever the theory, it is universally agreed that there is a fundamental <strong>need for a society</strong> — it is not accidental or arbitrary, but a necessary feature of human existence.
          </p>

          <TheoryCard title="Theory of Divine Origin (God's Creation)">
            <p>According to this theory, society is <strong>God's own creation</strong>. It finds its basis in religious scripture, particularly the Old Testament (Genesis). According to the Biblical account, God created man in His own image but later realised that man was very lonely. God therefore created a woman to keep man company.</p>
            <p className="mt-2">This act of creation — of one being made to complement another — reveals that it is God's <em>plan and design</em> for human beings to live in company with others. Society, therefore, is not a human invention or a historical accident: it is divinely ordained. God created the society Himself by making human beings inherently social, needing one another for companionship, reproduction, and spiritual fulfilment.</p>
            <ExplainerBox>
              <strong>Why this theory matters:</strong> For societies rooted in faith traditions — which includes the vast majority of Kenyan communities — the divine origin theory provides a profound moral basis for social life. It answers the question "why should I care about others?" with a theological response: because God designed us for each other. It gives social obligations a sacred character: caring for your neighbour, respecting elders, supporting the community — these are not merely social conventions but divine imperatives.
            </ExplainerBox>
            <ExampleBox>
              <strong>Contemporary relevance:</strong> In Kenya, the <em>harambee</em> (pulling together) spirit — the tradition of communal fundraising and mutual support — is often grounded in both cultural and religious values. Community members come together to raise funds for funerals, hospital bills, school fees, and weddings not merely because society demands it, but because most Kenyans believe that God calls them to love and support one another. The divine origin theory reinforces this social obligation.
            </ExampleBox>
          </TheoryCard>

          <TheoryCard title="Force Theory">
            <p>According to the Force Theory, in the distant past human beings lived <strong>freely and without any organisation or rules</strong>. There was no structured society — people existed as individuals or small family groups, acting on their own impulses without a governing framework.</p>
            <p className="mt-2">However, a small group of <strong>powerful individuals</strong> eventually used their strength and dominance to impose their will upon the weaker majority. This powerful minority set rules, made themselves leaders, and enforced these rules upon the rest. The weaker majority had no choice but to comply.</p>
            <p className="mt-2">Over time, this arrangement of enforced obedience created a functional organisation — regular patterns of interaction, clear hierarchies, and established norms. From this enforced structure, <strong>society came into being</strong>. What began as domination evolved into an ongoing social order.</p>
            <ExplainerBox>
              <strong>Critical analysis:</strong> The Force Theory is controversial because it portrays society as originating in oppression rather than consent or divine will. It suggests that social hierarchies — rulers and ruled, powerful and powerless — are baked into the very foundations of society. This resonates with Marxist thought, which argues that the state (and society's institutions) are instruments of class domination, designed to preserve the power of those who created them.
            </ExplainerBox>
            <ExampleBox>
              <strong>Historical example — colonialism in Africa:</strong> The colonial imposition of European rule on African peoples is a striking real-world illustration of the Force Theory. Colonial powers used military force to subjugate existing communities, imposed their own laws and administrative structures, and created a new social order that served colonial interests. Many modern African nations, including Kenya, still live with the institutional legacies of societies originally shaped by force. This does not make those societies illegitimate today, but it explains much about the inequalities and power structures within them.
            </ExampleBox>
          </TheoryCard>

          <TheoryCard title="Social Contract Theory">
            <p>The Social Contract Theory is perhaps the most intellectually sophisticated of the three. According to this theory, in the distant past people lived in a state of <strong>great misery and danger</strong>. Powerful individuals would fight or kill weaker ones at will. There was no functional authority to appeal to in case of dispute or attack. Many people were killed by wildlife because everyone lived a solitary, unprotected life. Basic needs such as food and water were completely unattainable for the old, the weak, and the sick.</p>
            <p className="mt-2">Driven by the unbearable suffering of this lawless existence, people <strong>rationally decided to come together</strong> to end these miseries. They set up rules that everyone agreed to follow. They created a communal authority — a proto-government — to resolve disputes and protect the weak. In exchange for giving up some individual freedom (the freedom to do whatever they wanted), people gained security, protection, and access to collective resources.</p>
            <p className="mt-2">This voluntary agreement — the "social contract" — is the origin of society. Society is therefore a <strong>rational, deliberate human creation</strong>, born from the recognition that life together is vastly better than life alone.</p>
            <ExplainerBox>
              <strong>The philosophers behind this theory:</strong> Three major Enlightenment thinkers developed versions of Social Contract Theory:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Thomas Hobbes (1651)</strong> argued that without society, life would be "solitary, poor, nasty, brutish and short." People contracted with a sovereign power to escape this chaos, giving up freedom in exchange for order.</li>
                <li><strong>John Locke (1689)</strong> took a more optimistic view: people are naturally rational and give up only certain rights to a government, which must protect their remaining rights (to life, liberty, and property). If it fails, people have the right to revolt — a concept that directly inspired the American Declaration of Independence.</li>
                <li><strong>Jean-Jacques Rousseau (1762)</strong> believed that humans are naturally good but corrupted by society. The ideal social contract would allow people to remain free while living collectively — a tension that defines democratic politics to this day.</li>
              </ul>
            </ExplainerBox>
            <ExampleBox>
              <strong>Kenyan example — Constitution-making:</strong> Kenya's 2010 Constitution is a modern social contract. After years of political violence, ethnic tension, and authoritarian rule, Kenyans came together through a participatory drafting process to write new rules for their collective life. The Constitution specifies what citizens give up (e.g., the right to private violence, the right to discriminate), what the state must provide (security, education, healthcare, justice), and what rights are inalienable (dignity, equality, freedom of expression). This is exactly the structure of a Lockean social contract — a mutual agreement to live by shared rules for mutual benefit.
            </ExampleBox>
            <NoteBox>
              <strong>Comparing the three theories:</strong> The Divine Origin theory says society was created by God for our benefit; the Force Theory says it was imposed by the powerful upon the weak; and the Social Contract Theory says it was created by rational human agreement to escape misery. In reality, most human societies contain elements of all three: divine/cultural legitimation, power hierarchies, and evolving social agreements. No single theory fully explains the complexity of social origins.
            </NoteBox>
          </TheoryCard>

          {/* ===== SECTION 4 ===== */}
          <SectionHeading id="characteristics" number="Section 4" title="Characteristics of Society" />

          <p className="text-base text-foreground/80 leading-relaxed mb-5">
            Regardless of its origin, every human society — from the smallest hunter-gatherer band to the largest modern nation-state — shares certain fundamental characteristics. These characteristics are what distinguish a "society" from a mere crowd, a mob, or an accidental gathering.
          </p>

          {[
            {
              title: "1. Society Consists of People",
              content: "Society is composed of people — this is its most fundamental feature. Without people, there can be no society, no social relationships, and no social life at all. Just as without students and teachers there can be no school, without people there is simply no society to speak of.",
              example: "The Maasai society of Kenya and Tanzania is defined by its Maasai people — their language (Maa), their customs, their cattle-herding lifestyle, and their distinctive red clothing. Remove the Maasai people and the society disappears, even if the land remains. Society exists in people, not in territory alone."
            },
            {
              title: "2. Mutual Interaction and Mutual Awareness",
              content: "Society is a group of people in continuous interaction with each other. This interaction is not one-way but reciprocal — it involves mutual contact between two or more persons. It is 'a process whereby men interpenetrate the minds of each other.' An individual is a member of society so long as they engage in relationships with other members. Without this ongoing interaction, social life would cease. Crucially, social interaction is only possible because of mutual awareness — members must recognise and be aware of each other. Society exists only where social beings 'behave towards one another in ways determined by their recognition of one another.' Without this awareness there can be no society. Not all relations are social relations — a social relationship exists only when the members are aware of each other and adjust their behaviour accordingly.",
              example: "Consider two strangers who pass each other on a Nairobi street. If they are entirely unaware of each other, there is no social relationship — just two physical bodies in proximity. But the moment they make eye contact, nod in greeting, or adjust their path to avoid a collision, they have entered into a social relationship: they have become mutually aware and are adjusting their behaviour based on that awareness. Society is built from millions of such micro-interactions every day."
            },
            {
              title: "3. Society Depends on Likeness",
              content: "The principle of likeness is essential for society. Society exists among those who resemble one another in some degree — in body and in mind. Likeness refers to similarities in needs, work, aims, ideals, values, and outlook towards life. As the saying goes, 'birds of the same feather flock together.' Human beings as members of the species Homo sapiens have many things in common — biological needs, emotional drives, cognitive capacities, and a shared vulnerability to suffering and death. Society rests on what F.H. Giddings calls 'consciousness of kind' — the recognition of similarity that makes companionship, intimacy, and association possible. 'Comradeship, intimacy, association of any kind or degree would be impossible without some understanding of each by the other, and that understanding depends on the likeness which each apprehends in the other.'",
              example: "The formation of ethnic or cultural communities in urban areas illustrates this principle. Kikuyu migrants to Mombasa, for example, tend to form associations with other Kikuyu — they share a language, cultural practices, food preferences, and value systems. This 'consciousness of kind' makes initial social bonds easier to form. Similarly, professional groups — doctors, lawyers, teachers — form associations with colleagues who share their educational background, professional norms, and daily experiences."
            },
            {
              title: "4. Society Rests on Difference Too",
              content: "Society also implies difference. A society based entirely on likeness and uniformity would be a very limited one. If all members were exactly alike, their social relationships would be extremely few. There would be little give-and-take, little reciprocity, and members would contribute very little to one another. Life would also become monotonous and uninteresting without difference. Family, for example, rests on the biological difference between the sexes. People differ from one another in their looks, personality, ability, talent, attitude, interest, taste, intelligence, faith, and occupation. These differences create the conditions for exchange, specialisation, and complementarity — I can do what you cannot, and vice versa, so we benefit from our association.",
              example: "A hospital functions because of the productive differences among its members: surgeons, nurses, anaesthesiologists, radiologists, pharmacists, cleaners, administrators, and security guards all have different skills. The hospital as a social unit would be impossible if everyone were identical. The same is true of society as a whole — a society of only farmers, or only lawyers, or only teachers would collapse. Difference is not a problem for society; it is one of its essential engines."
            },
            {
              title: "5. Co-operation and Division of Labour",
              content: "Primarily likeness and secondarily difference create the conditions for division of labour and co-operation. Division of labour involves assigning to each unit or group a specific share of a common task. For example, the common task of producing cotton clothes is shared by farmers who grow cotton, spinners, weavers, dyers, and merchants. At home, work is divided between father, mother, and children. Division of labour and specialisation are the hallmarks of modern complex society. As C.H. Cooley says, 'co-operation arises when men realise that they have common interests.' Co-operation refers to mutual working together for the attainment of a common goal. Men satisfy many of their desires and fulfil interests through joint efforts.",
              example: "The construction of a road in Kenya involves extraordinary division of labour and co-operation: engineers design the route, surveyors map the terrain, plant operators grade the ground, construction workers lay tarmac, traffic managers keep workers safe, procurement officers source materials, accountants manage budgets, and government officials oversee the project. No single individual could build a road alone. Co-operation and specialisation are what make large-scale human achievements possible — from the pyramids of Egypt to the satellites in orbit above us."
            },
            {
              title: "6. Society Implies Interdependence",
              content: "Social relationships are characterised by interdependence. The most basic social group — the family — is based upon the interdependence of man and woman. One depends upon the other for the satisfaction of needs. As society advances, the area of interdependence grows. Today, not only individuals are interdependent upon one another, but even communities, social groups, societies, and entire nations are interdependent. No modern country is fully self-sufficient — they all depend on international trade, foreign expertise, global communications, and cross-border diplomacy.",
              example: "Kenya's economy is deeply interdependent with the global economy. Kenyan tea is grown by smallholder farmers, processed in local factories, and exported to Britain, Pakistan, and Egypt. In return, Kenya imports petroleum from the Gulf, machinery from China, and pharmaceuticals from India. Internally, urban consumers depend on rural farmers for food; farmers depend on urban factories for tools and fertiliser; both depend on banks for credit and the government for roads, security, and legal enforcement. Remove any one strand and the whole web weakens."
            },
            {
              title: "7. Society is Dynamic",
              content: "Society is not static; it is dynamic. Change is ever present in society. Changeability is an inherent quality of human society. No society can remain constant for any length of time. Society is like water in a stream or river that forever flows. Old people die and new ones are born. New associations and institutions come into being and old ones may die a natural death. Existing institutions undergo changes to suit the demands of the changing times. Society is always in a state of flux — ever becoming, never finally fixed.",
              example: "Kenyan society has changed dramatically over the past century. Pre-colonial Kenyan communities were largely agricultural or pastoral, organised around clans and age-grade systems, with no written laws, no formal schools, and no central government. Colonial rule introduced Christianity, formal education, a monetary economy, and a centralised state. Independence brought democratic institutions and a national identity. In the 21st century, the mobile money revolution (M-Pesa), urbanisation, social media, and the gig economy are transforming social relationships once again. Society never stops changing — it is permanently in motion."
            },
            {
              title: "8. Social Control",
              content: "Society has its own ways and means of controlling the behaviour of its members. Co-operation exists in society, but so do competition, conflicts, tensions, revolts, rebellions, and suppressions. Clashes of economic, political, or religious interests are not uncommon. Left uncontrolled, these conflicts could tear apart the very fabric of society. The behaviour of people must therefore be regulated — through formal mechanisms like laws, courts, and police, and through informal mechanisms like social norms, community pressure, shame, and ostracism. Social control ensures that the social order is maintained and that disruptive forces do not overwhelm the bonds that hold society together.",
              example: "Social control operates at multiple levels simultaneously in Kenya. Formally: the Constitution, criminal law, the judiciary, and the police regulate behaviour and punish violations. Informally: community elders mediate disputes through customary law; religious leaders preach moral standards; social disapproval ('what will people say?') prevents many behaviours that are not technically illegal but violate community norms. Even the custom of ubuntu ('I am because we are') functions as a form of social control — it creates strong expectations of generosity, reciprocity, and solidarity."
            },
            {
              title: "9. Culture",
              content: "Each society is distinct from the other. Every society is unique because it has its own way of life, called culture. Culture refers to, as Linton says, 'the social heritage of man.' It includes the whole range of our life — attitudes, judgments, morals, values, beliefs, ideas, ideologies, and our political, legal, economic institutions; our sciences and philosophies. Culture is the expression of human nature in our ways of living and thinking, in behaving, in dressing, in singing, in worshipping. Culture is what makes one society distinguishable from another — two societies may share the same geography but have completely different cultures. Without culture, society would have no identity, no memory, and no direction.",
              example: "The Luo and Kikuyu peoples of Kenya inhabit the same nation and share a common citizenship, but they have distinct cultures — different languages, different traditional foods, different marriage customs, different music, different spiritual practices, and different historical narratives. These cultural differences enrich Kenyan national life but also require careful management to prevent inter-ethnic conflict. Culture is what gives each community its unique identity within the broader national society."
            },
            {
              title: "10. The Gregarious Nature of Man",
              content: "There is yet another attribute on which society depends: the gregarious nature of man. Aristotle said that 'man is a social animal.' Psychologists like William McDougall argue that man is social because of a basic human instinct — the 'gregarious instinct,' which refers to the tendency of human beings to live in groups. Man always lives amidst other men. He cannot truly live without them. This internal nature — this deep-seated drive for togetherness — has forced man to establish social groups and societies and to live in them. Society is not merely an external structure imposed upon individuals; it responds to an internal, biological, and psychological need within every human being.",
              example: "Experiments in sensory deprivation and solitary confinement provide dramatic evidence of the gregarious instinct. Studies of prisoners placed in solitary confinement show rapid psychological deterioration — anxiety, hallucinations, depression, and in some cases permanent psychological damage — within days or weeks. Human beings in complete isolation do not thrive; they unravel. Conversely, strong social ties are among the most powerful predictors of physical health, mental well-being, and longevity. We are, at the deepest biological level, social animals."
            },
          ].map(({ title, content, example }) => (
            <div key={title} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden mb-5">
              <div className="px-5 py-3 border-b border-border/40 bg-muted/30">
                <p className="font-semibold text-foreground text-sm">{title}</p>
              </div>
              <div className="px-5 py-4 space-y-2">
                <p className="text-sm text-foreground/80 leading-relaxed">{content}</p>
                <div className="mt-2 pl-3 border-l-2 border-primary/30">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Real-World Example</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{example}</p>
                </div>
              </div>
            </div>
          ))}

          {/* ===== SECTION 5 ===== */}
          <SectionHeading id="community" number="Section 5" title="Community vs. Society" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The terms "community" and "society" are often used interchangeably in everyday speech, but sociologists draw an important distinction between them.
          </p>

          <div className="overflow-x-auto mb-5">
            <table className="text-sm border border-border/40 w-full text-left">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">Feature</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold text-blue-700 dark:text-blue-400">Community</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold text-green-700 dark:text-green-400">Society</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  ["Scale", "Smaller, more localised", "Larger, can be national or global"],
                  ["Ties", "Stronger personal ties; members know each other", "May include strangers with no personal ties"],
                  ["Geographic basis", "Usually tied to a specific territory", "May transcend territory (e.g., professional societies)"],
                  ["Shared identity", "Strong shared identity and sense of belonging", "More abstract shared identity (e.g., 'Kenyan')"],
                  ["Primary relationships", "Dominant (family, neighbours, friends)", "Mix of primary and secondary relationships"],
                  ["Examples", "A village, a neighbourhood, a school community", "Kenyan society, African society, global society"],
                ].map(([feat, comm, soc]) => (
                  <tr key={String(feat)}>
                    <td className="px-4 py-2 font-medium text-foreground">{feat}</td>
                    <td className="px-4 py-2 text-muted-foreground">{comm}</td>
                    <td className="px-4 py-2 text-muted-foreground">{soc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ExplainerBox>
            <strong>Key distinction:</strong> A community is always part of a society, but a society is more than any single community. In Machakos County, dozens of villages form distinct communities — each with its own local leaders, customs, and social dynamics. Together, they (and hundreds of other communities) form Kenyan society. Society is the broader framework within which communities exist. Communities give us our most intimate social bonds; society gives us the larger institutional and cultural framework that makes complex national life possible.
          </ExplainerBox>

          <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 2</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Society</strong> comes from the Latin "socius" (companion) and refers to a network of social relationships, norms, and institutions binding people together.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Divine Origin Theory:</strong> God created society by designing humans for companionship (Biblical basis).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Force Theory:</strong> Society emerged when powerful individuals imposed order on the weak majority.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Social Contract Theory:</strong> Rational people voluntarily agreed to live by shared rules to escape the misery of lawless existence (Hobbes, Locke, Rousseau).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>10 Characteristics:</strong> People, mutual interaction &amp; awareness, likeness, difference, co-operation &amp; division of labour, interdependence, dynamic, social control, culture, gregarious nature.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Community vs. Society:</strong> Communities are smaller, more localised, with stronger personal ties; society is the larger framework within which communities exist.</span></li>
            </ul>
          </div>

          <div className="h-16" />
        </div>

        {/* Table of Contents */}
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
