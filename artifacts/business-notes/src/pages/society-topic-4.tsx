import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, AlertTriangle, CheckCircle2, Users } from "lucide-react";

const sections = [
  { id: "concept", label: "1. Conceptualising Socialization" },
  { id: "daniella", label: "2. Daniella's Story" },
  { id: "definitions", label: "3. Scholarly Definitions" },
  { id: "factors", label: "4. Factors of Socialization" },
  { id: "agencies", label: "5. Agencies of Socialization" },
  { id: "types", label: "6. Types of Socialization" },
  { id: "features", label: "7. Features of Socialization" },
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

function WarningBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 flex gap-3 rounded-lg border border-red-300/40 bg-red-50 dark:bg-red-900/10 p-4">
      <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
      <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
    </div>
  );
}

function AgencyCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/50 overflow-hidden mb-4">
      <div className="flex items-center gap-3 px-5 py-3 border-b border-border/40 bg-muted/30">
        <div className="text-primary">{icon}</div>
        <p className="font-semibold text-foreground text-sm">{title}</p>
      </div>
      <div className="px-5 py-4 text-sm text-foreground/80 leading-relaxed space-y-3">{children}</div>
    </div>
  );
}

export default function SocietyTopic4() {
  const [activeSection, setActiveSection] = useState("concept");
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
      { label: "Week 4: Socialization" },
    ]}>
      <Helmet>
        <title>Socialization — Types, Agencies & Factors | Study Notes</title>
        <meta name="description" content="Socialization: definitions, Daniella's story, factors (imitation, suggestion, identification, language), agencies (family, school, peers, church, state, mass media), types and features." />
        <meta property="og:title" content="Socialization — Week 4 | Society & Culture" />
        <meta property="og:image" content="https://notes.xwolf.space/og-home.svg" />
      </Helmet>

      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 4 · Society &amp; Culture</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Socialization</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              How do we become human? We are born with biology — but we become social beings through socialization. This week examines the lifelong process through which individuals learn the norms, values, language, and social skills that allow them to function as members of society. Without socialization, as the case of Daniella shows, even the most basic human capacities fail to develop.
            </p>
          </div>

          {/* ===== SECTION 1 ===== */}
          <SectionHeading id="concept" number="Section 1" title="Conceptualising Socialization" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Socialization</strong> is the lifelong process through which individuals learn, internalise, and adopt the norms, values, behaviours, and social skills necessary to function effectively as members of society. It is how we learn the norms and beliefs of our society. From our earliest family and play experiences, we are made aware of societal values and expectations.
          </p>

          <ExplainerBox>
            <strong>What does "internalise" mean?</strong> Internalisation is the process by which external social rules become internal personal values. When a child is first told "don't steal," it is an external command enforced by parents. After years of reinforcement, the child grows up with an internal sense that stealing is wrong — they feel guilt, shame, or discomfort at the mere thought of stealing, even when no one is watching. This shift from external compliance to internal conviction is the essence of what socialisation achieves. It is why most adults don't need police officers standing next to them to behave lawfully — the rules have become part of who they are.
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The human infant comes into the world as a biological organism with all animal needs — for food, warmth, physical contact, and security. Through socialization, this biological organism is gradually moulded and transformed into a <strong>social being</strong>: one who uses language, follows social norms, respects others' rights, pursues culturally defined goals, and understands their place within a community.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Without this process of moulding and transformation, society could not continue, nor could culture exist, nor could the individual become a full person. Because of the transformation that socialization achieves, most babies grow up into fully functioning social beings, able to use the language of their parents and competent in their society's culture.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Socialization performs <strong>two critically important functions</strong>:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">1. Transmits a Social Heritage</h3>
              <p className="text-sm text-foreground/80">Socialization is the mechanism through which every generation passes on its accumulated knowledge, values, norms, language, customs, and beliefs to the next. Without socialization, every generation would have to start from scratch — rediscovering fire, reinventing language, re-establishing laws. Socialization makes cultural continuity possible.</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">2. Creates Personality</h3>
              <p className="text-sm text-foreground/80">Personalities do not come ready-made. They are moulded through socialization. Through interaction with others, a person gains an identity, develops values and aspirations, and under favourable conditions becomes able to make full use of their potentials. Socialization helps the individual develop a self — a sense of who they are in relation to others.</p>
            </div>
          </div>

          <NoteBox>
            <strong>Socialization is a lifelong process:</strong> The process of socialization is operative not only in childhood but throughout life. It begins at birth and continues until death. We are socialised into new roles at every stage of life — as students, as employees, as parents, as retirees. When you started university, you were being socialised into the norms of higher education (how to address professors, how to write essays, how to manage independent study). When you take your first job, you will be socialised into the norms of the workplace. Socialization never stops.
          </NoteBox>

          {/* ===== SECTION 2 ===== */}
          <SectionHeading id="daniella" number="Section 2" title="Daniella's Story — The Case for Socialization" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Perhaps the most powerful illustration of what socialization does — and what happens when it is absent — is the real case of Daniella, discovered in Plant City, Florida in 2005.
          </p>

          <div className="rounded-xl border border-border/60 bg-muted/20 p-6 mb-5">
            <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3">Case Study: Daniella (Plant City, Florida, 2005)</p>
            <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
              <p>In the summer of 2005, police detective Mark Holste followed an investigator from the Department of Children and Families to a home in Plant City, Florida. They were responding to a neighbour's report about a shabby house on Old Sydney Road. A small girl had been spotted peering from one of its broken windows — a child that no one in the neighbourhood had ever seen outside the home.</p>
              <p>Upon entering the house, the detective and his team were immediately shocked. It was the worst scene they had ever encountered: infested with cockroaches, smeared with faeces and urine from both humans and animals, filled with dilapidated furniture and rotting debris.</p>
              <p>Detective Holste headed down a hallway and entered a small room. <em>"She lay on a torn, moldy mattress on the floor. She was curled on her side… her ribs and collarbone jutted out… her black hair was matted, crawling with lice. Insect bites, rashes and sores pocked her skin… She was naked — except for a soiled nappy."</em> The girl had big, vacant eyes, staring into the darkness.</p>
              <p>Detective Holste immediately carried her out of the home and she was taken to hospital for evaluation.</p>
              <p>Through extensive medical testing, doctors determined that although Daniella was severely malnourished, she was physically capable of seeing, hearing, and vocalising normally. Yet the picture was devastating:</p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>She would not look anyone in the eyes</li>
                <li>She did not know how to chew or swallow solid food</li>
                <li>She did not cry</li>
                <li>She did not respond to stimuli that would normally cause pain</li>
                <li>She did not know how to communicate</li>
                <li>She had not learned to walk properly</li>
                <li>She showed no emotional responsiveness — no joy, no fear, no curiosity, no affection</li>
              </ul>
              <p className="mt-3">Doctors found no neurological explanation. There was nothing physically wrong with her brain or sensory organs. The problem was not biological — it was social. Daniella had been left almost entirely alone. She had received no regular interaction: no holding, no hugging, no talking, no explanations or demonstrations. She had not been taught to walk, to eat, to speak, or to interact. She had not learned to play or even to understand the world around her.</p>
              <p>Without socialization, Daniella had failed to develop even the most basic capacities that we consider naturally human.</p>
            </div>
          </div>

          <h3 className="font-semibold text-foreground text-lg mt-6 mb-4">Key Lessons from Daniella's Story</h3>

          <div className="space-y-3 mb-5">
            {[
              ["Biology is not enough", "Daniella had a perfectly functional brain and body. Yet without social interaction, she could not walk, speak, or even eat solid food. This proves that being biologically human is not sufficient to become socially human. The distinctly human capacities — language, emotional intelligence, self-awareness, cultural competence — are not instinctive. They must be learned through sustained social interaction."],
              ["The process of moulding into a social being", "The human infant comes into the world as a biological organism with animal needs. Through socialization, this organism is gradually moulded and transformed into a social being who learns social ways of acting and feeling. Without this process, neither society nor culture can exist, and the individual cannot truly become a person."],
              ["Socialization helps the individual develop self", "Through interaction with others, a person gains an identity, develops values and inspirations, and under favourable conditions becomes able to make full use of their potentials. Daniella had no sense of self — she could not distinguish herself from the world around her because no one had ever interacted with her in ways that would build that self-awareness."],
              ["Personalities are moulded through socialization", "Personalities do not come ready-made. Daniella had no detectable personality — she was a blank, because there had been no social interaction to shape one. Every trait we think of as personality — curiosity, humour, empathy, determination, creativity — develops through years of social engagement."],
              ["Critical periods and limits of recovery", "Daniella's case also illustrates the concept of 'critical periods' in development — windows of time during which the brain is most receptive to certain kinds of learning. Language, for example, is most easily acquired in early childhood. Daniella, who had missed this critical period, struggled enormously to learn to speak even after being placed in a loving foster family. While she made significant progress, she never fully recovered the capacities that would have developed naturally through early socialization."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <WarningBox>
            <strong>Daniella's case is not unique.</strong> Similar cases of "feral children" — children raised in extreme isolation or with minimal human contact — have been documented across history and across cultures. The 18th-century "Wild Boy of Aveyron" in France, "Genie" in 1970s California, and "Oxana Malaya" in Ukraine (who grew up with dogs) all showed similar patterns: profound deficits in language, social skills, and emotional expression that proved extremely difficult to remediate even with intensive intervention. Together, these cases make an overwhelming case for the indispensability of socialization to human development.
          </WarningBox>

          {/* ===== SECTION 3 ===== */}
          <SectionHeading id="definitions" number="Section 3" title="Scholarly Definitions of Socialization" />

          <p className="text-base text-foreground/80 leading-relaxed mb-5">
            Sociologists have approached socialization from different angles, emphasising different aspects of the process. The following definitions, from leading scholars, each illuminate a different facet of this complex phenomenon:
          </p>

          {[
            {
              scholar: "Kimball Young",
              definition: "Socialization is the process by which social beings establish wider and profounder relationships with one another, in which they become more bound up with, and more dependent on one another, in which they develop the sense of obligation to and responsibility for others, in which they grow more perceptive of the personality of themselves and of others, and build up the complex structure of near and wider association.",
              explanation: "Young's definition is remarkable for its emphasis on the deepening quality of social relationships over time. Socialization is not merely about learning rules — it is about developing emotional bonds, moral obligations, psychological perceptiveness, and an ever-expanding network of social connections. It describes socialization as a process of growing up into increasingly rich and complex social relationships."
            },
            {
              scholar: "Bogardus",
              definition: "Socialization will mean the process of inducting the individual into the social and cultural world; of making him a participant member of the society and its various groups, and inducing him to accept the norms and values of that society. Socialization is definitely a matter of learning and not of biological inheritance.",
              explanation: "Bogardus makes a crucial point: socialization is about learning, not genetics. You are not born a Kenyan, a Christian, an English speaker, or a law-abiding citizen. You become these things through the social process of induction into particular cultural worlds. This has profound implications: it means human beings are remarkably flexible and adaptable — we can be socialised into virtually any cultural system — but it also means we are dependent on our social environment to become fully human."
            },
            {
              scholar: "Lundberg",
              definition: "Socialization is the process of working together, of developing group responsibility, of being guided by the welfare and needs of others.",
              explanation: "Lundberg focuses on the pro-social outcomes of socialization — the development of co-operation, group consciousness, and other-directedness. His definition emphasises that socialization is not merely about training individuals to conform to rules, but about cultivating a genuine orientation toward collective welfare. A fully socialised person is not just rule-following but genuinely cares about the group."
            },
            {
              scholar: "Ogburn",
              definition: "Socialization consists of complex processes of interaction through which the individual learns the habits, skills, beliefs and standards of judgment that are necessary for his effective participation in social groups and communities.",
              explanation: "Ogburn's definition is comprehensive and practical. It lists the specific things socialization transmits: habits (routines and behaviours), skills (practical competencies), beliefs (understanding of reality), and standards of judgment (values and moral frameworks). Crucially, it frames all of these as necessary for 'effective participation' — making clear that socialization is not just about personal development but about enabling productive membership in social life."
            },
            {
              scholar: "Green",
              definition: "Socialization is the process by which the child acquires a cultural content, along with selfhood and personality.",
              explanation: "Green's definition is elegant in its compression. 'Cultural content' refers to the norms, values, language, beliefs, and customs of one's society. 'Selfhood' refers to the development of a sense of 'I' — a distinct personal identity that knows itself as separate from others. 'Personality' refers to the unique configuration of traits, dispositions, and characteristics that makes each person who they are. Socialization accomplishes all three simultaneously — you cannot acquire cultural content without developing a self, and you cannot have a self without culture."
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

          {/* ===== SECTION 4 ===== */}
          <SectionHeading id="factors" number="Section 4" title="Factors Responsible for the Process of Socialization" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Socialization is the process of learning group norms, habits, and ideas. It does not happen automatically — it is driven by specific psychological and social processes. There are <strong>four key factors</strong> through which individuals learn from those around them and absorb their culture:
          </p>

          {[
            {
              title: "1. Imitation",
              content: "Imitation is the copying by an individual of the actions of another. When a child tries to walk impressively like his father, wearing spectacles and swinging a stick, he is imitating. Imitation may be conscious or unconscious, spontaneous or deliberate. It is the main factor in the process of socialization of the child. Through imitation, children learn many social behaviour patterns — how to greet, how to eat, how to dress, how to express emotions. Language and pronunciation are acquired by the child primarily through imitation.",
              example: "A child who grows up watching their mother greet neighbours with a warm handshake and a smile will instinctively imitate this behaviour. They don't need to be taught 'now shake hands' — they absorb the behaviour through observation and repetition. This is why children raised in families that read for pleasure tend to become readers, and children raised in households where aggression is used to resolve conflict often resort to aggression themselves. Imitation transmits both positive and negative social behaviours.",
              real: "In Kenyan schools, students often imitate the accents, vocabulary, and mannerisms of teachers they admire. In professional settings, new employees imitate the dress codes, communication styles, and work habits of senior colleagues. Advertising exploits imitation by showing admired celebrities using products — consumers imitate the celebrities' behaviour by purchasing the same products."
            },
            {
              title: "2. Suggestion",
              content: "Suggestion is the process of communicating information which has no logical or self-evident basis — it is devoid of rational persuasion. The individual accepts the suggestion not because they have reasoned it through, but because of trust, authority, emotional appeal, or repeated exposure. In industry, politics, education, and every other field, people acquainted with psychological facts make use of suggestion to make their ideas and notions acceptable by others, and to make them behave according to their wishes. Propaganda and advertising are based on the fundamental psychological principle of suggestion.",
              example: "When a political leader repeatedly describes a particular ethnic group as 'enemies of progress,' this suggestion — even without evidence — can shape how their followers perceive and treat members of that group. The suggestion works not through logic but through authority and repetition. This is how propaganda operates: it bypasses rational evaluation and works directly on emotions and prejudices.",
              real: "Religious teachings often work through suggestion — the authority of scripture, the trust placed in religious leaders, and the emotional power of communal worship can make believers accept propositions they have not personally verified. Similarly, beauty advertising suggests that using a particular cream will make women more beautiful, more confident, and more socially successful — not through scientific argument but through emotionally compelling images and testimonials."
            },
            {
              title: "3. Identification",
              content: "In his early age, the child cannot make any distinction between his organism and the environment. Most of his actions are random — natural reactions of which he is not conscious. As he grows in age, he comes to know the nature of things which satisfy his needs. Such things become the objects of his identification. The area of identification increases with growth in age. Through identification, he becomes sociable. Identification involves adopting the identity, values, goals, and behaviours of people or groups one admires or belongs to — not just copying a specific action (as in imitation) but incorporating an entire identity.",
              example: "A teenager who identifies strongly with a particular musical subculture (hip-hop, metal, afrobeats) doesn't just listen to the music — they adopt the entire aesthetic: the clothing, the language, the social values, the heroes, the enemies. This identification shapes their worldview, their social circle, and their sense of self. Similarly, a student who identifies as a 'science person' adopts the values, practices, and social identity of scientific culture — intellectual curiosity, empiricism, scepticism, precision.",
              real: "Young Kenyan men who identify with gang culture in Nairobi's informal settlements adopt not just specific criminal behaviours but an entire social identity — the slang, the codes of loyalty, the dress, the hierarchy, the values. Conversely, students who identify with academic excellence adopt an entirely different set of values and behaviours. Identification explains why peer group membership is so powerfully influential during adolescence."
            },
            {
              title: "4. Language",
              content: "Language is the medium of social intercourse and the means of cultural transmission. At first, the child utters random syllables which have no meaning. But gradually he learns his mother tongue. Language moulds the personality of the individual from infancy. The child comes to know most of the things of the world through language. With language, social contacts become very easy because people can easily exchange their ideas. Language helps or hinders the spread of culture. Sometimes ideas or concepts are hard to translate because a language has no word with which to express it (e.g., Kiswahili does not have equivalents for a number of words used in the sciences). Language gives the capacity for conveying ideas and states of emotion in an easy and simple way. Language has led man from a mere clumsy animal to a human being in the real sense of the word. It has simplified the conveyance of ideas, smoothened social contacts, conserved culture and transmitted it to posterity.",
              example: "The Sapir-Whorf hypothesis (also called linguistic relativity) proposes that the language you speak shapes how you perceive reality. The Hopi people of North America have a language with no simple past or future tense — everything is expressed as a continuum. This linguistic structure, some linguists argue, shapes a fundamentally different experience of time. The Inuit languages have dozens of words for different types of snow — enabling speakers to make perceptual distinctions that speakers of English (which has just one word: snow) simply cannot.",
              real: "In Kenya, the shift from mother-tongue instruction to English and Kiswahili in schools is a profound act of socialization — it shapes which cultural worlds children can access, which knowledge systems they can engage with, and which social identities they can claim. Simultaneously, the vitality of indigenous languages like Dholuo, Gikuyu, and Kamba preserves cultural knowledge, values, and ways of understanding the world that cannot be fully translated into other languages."
            },
          ].map(({ title, content, example, real }) => (
            <div key={title} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden mb-5">
              <div className="px-5 py-3 border-b border-border/40 bg-muted/30">
                <p className="font-semibold text-foreground text-sm">{title}</p>
              </div>
              <div className="px-5 py-4 space-y-3">
                <p className="text-sm text-foreground/80 leading-relaxed">{content}</p>
                <div className="pl-3 border-l-2 border-amber-400/40">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide mb-1">Illustration</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{example}</p>
                </div>
                <div className="pl-3 border-l-2 border-primary/30">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Kenyan / Real-World Context</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{real}</p>
                </div>
              </div>
            </div>
          ))}

          {/* ===== SECTION 5 ===== */}
          <SectionHeading id="agencies" number="Section 5" title="Agencies of Socialization" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The process of socialization is operative not only in childhood but throughout life. It is a process which begins at birth and continues unceasingly until the death of an individual. Formally, socialization had been restricted to children, but it has now been broadened to include aspects of adult behaviour as well.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Socialization should not be left to chance or accident — it should be controlled through institutional channels. Two main sources of socialization exist: <strong>those who have authority over the individual</strong> (parents, teachers, elderly persons, the state) and <strong>those who are equal in authority</strong> (playmates, friends, club fellows). In the first category, the relationship is one of constraint and compliance; in the second, it is one of co-operation and mutual influence. Both are essential.
          </p>

          <AgencyCard icon={<Users className="h-5 w-5" />} title="1. The Family">
            <p>The parents or the family are the <strong>first and most influential</strong> agents of socialization. They are the most closely related to the child, both emotionally and physically. It is from the family that the child receives their most foundational social programming:</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>From parents, the child learns speech and language — the very medium through which all further socialization will occur.</li>
              <li>The child is taught societal morality: what is right and wrong, what is honourable and shameful.</li>
              <li>The child learns to respect persons in authority and to navigate hierarchical relationships.</li>
              <li>The child learns a number of civic virtues — honesty, responsibility, generosity.</li>
              <li>The child gets their first lessons of cooperation, tolerance, self-sacrifice, love, and affection in the family setting.</li>
              <li>The environment of the family — its economic circumstances, emotional climate, cultural practices — profoundly influences the child's growth, worldview, and life chances.</li>
            </ul>
            <p className="mt-2">The relationship between parent and child is one of <em>constraint</em>: parents have the power and authority to command obedience. But this authority, when exercised with love, is the source of the child's security, identity, and earliest moral formation.</p>
            <ExampleBox>
              <strong>Kenyan family socialization:</strong> In many Kenyan families, children are taught from a very early age to greet adults respectfully (with both hands or kneeling), to serve guests food before eating themselves, to address elders by respectful titles ("Mzee," "Bibi," "Shosh"), and to observe specific family rituals. These practices — transmitted from grandparents to parents to children — are acts of socialization that embed values of respect, generosity, and family loyalty. The family also socialises children into gender roles: who cooks, who fetches water, who herds cattle, who speaks at family meetings. These early socialization patterns can persist throughout life.
            </ExampleBox>
          </AgencyCard>

          <AgencyCard icon={<Users className="h-5 w-5" />} title="2. The School">
            <p>The school is the <strong>second major agent of socialization</strong>. While the family socialises through love, intimacy, and authority, the school introduces the child to a broader, more formal, and more diverse social world.</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>In school, the child receives formal education which moulds their ideas, attitudes, and intellectual competencies.</li>
              <li>Good education can make the child a good citizen; poor or misdirected education can produce anti-social attitudes and behaviours.</li>
              <li>A well-planned system of education can produce socialised, civic-minded persons capable of contributing to national development.</li>
              <li>The school also teaches the "hidden curriculum" — unwritten rules about punctuality, submission to authority, competition, teamwork, deferred gratification (working now for future rewards), and national identity.</li>
            </ul>
            <ExampleBox>
              <strong>Formal and informal socialization in Kenyan schools:</strong> Officially, Kenyan schools teach mathematics, Kiswahili, English, science, social studies, and other subjects. But they also socialise students into national identity through the singing of the national anthem, the recitation of the national pledge, the flying of the flag, and the study of Kenyan history and civics. Uniforms enforce conformity and equality across socioeconomic backgrounds. The prefect system socialises students into leadership and followership. School rules about punctuality, respect for teachers, and prohibition of violence transmit civic values alongside academic knowledge.
            </ExampleBox>
          </AgencyCard>

          <AgencyCard icon={<Users className="h-5 w-5" />} title="3. Playmates and Peers (Peer Group)">
            <p>Playmates and friends constitute a uniquely important agency of socialization because of the <strong>equality of the relationship</strong>. Unlike family and school, the peer relationship is horizontal — it is based on co-operation and mutual understanding rather than authority and constraint.</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>The child acquires something from peers that they simply cannot acquire from parents: self-confidence and self-esteem built through peer acceptance and recognition.</li>
              <li>Peer interactions teach negotiation, conflict resolution, empathy, and the experience of being evaluated by equals rather than authorities.</li>
              <li>Peer groups also transmit youth culture — music, fashion, slang, social media norms — that parents may be unaware of or resistant to.</li>
              <li>Peer pressure is one of the most powerful forces in adolescent socialization: the desire to belong and be accepted by peers can override family values and individual judgment.</li>
            </ul>
            <ExampleBox>
              <strong>Double-edged nature of peer socialization:</strong> Peer groups socialise children into positive behaviours — studying together, participating in sports, helping each other with problems. But they also socialise into negative behaviours: smoking, substance abuse, gang membership, bullying, and academic dishonesty. Research consistently shows that the single most powerful predictor of adolescent drug use is having friends who use drugs — not family income, parental education, or neighbourhood. This illustrates the enormous socialising power of the peer group, for better or worse.
            </ExampleBox>
          </AgencyCard>

          <AgencyCard icon={<Users className="h-5 w-5" />} title="4. The Church (Religious Institutions)">
            <p>Religion is an important factor in society, and religious institutions are significant agents of socialization.</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>In early societies, religion provided the primary bond of social unity — shared beliefs about the sacred defined community boundaries and social obligations.</li>
              <li>Though the influence of formal religion has diminished in many modern secular societies, it continues to powerfully mould beliefs, values, and ways of life in most Kenyan communities.</li>
              <li>Through religious sermons, children and adults receive moral instruction that may determine their course of life and shape their ethical frameworks.</li>
              <li>Religious communities also socialise members into specific gender roles, dietary practices, sexual norms, attitudes toward death, and concepts of the afterlife.</li>
              <li>Religious institutions reinforce values like compassion, honesty, service, and humility — values that hold society together.</li>
            </ul>
            <ExampleBox>
              <strong>Religion as socialization in Kenya:</strong> Kenya is a deeply religious country — the vast majority of Kenyans identify as Christians or Muslims. For many Kenyan families, the church or mosque is not just a place of worship but the primary social institution: it organises weddings, funerals, and naming ceremonies; it provides community support networks; it offers moral education for children through Sunday school and madrasa; and it provides role models (pastors, imams, deacons) for emulation. The values transmitted through religious socialization — honesty, respect, generosity, hard work, sexual morality — shape behaviour far beyond the walls of the place of worship.
            </ExampleBox>
          </AgencyCard>

          <AgencyCard icon={<Users className="h-5 w-5" />} title="5. The State">
            <p>The state is an <strong>authoritarian agency of socialization</strong>. It makes laws for the people, lays down the mode of conduct expected of them, and enforces compliance through formal legal mechanisms.</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li>Unlike the family, school, or church — which socialise primarily through persuasion, example, and emotional bonds — the state has the unique authority to compel compliance through the threat and application of force.</li>
              <li>Citizens are required to obey the laws of the state. If they fail to adjust to these laws, they are punished — through fines, imprisonment, or other sanctions.</li>
              <li>The state also socialises through national symbols (the flag, the national anthem, national holidays), national curriculum requirements in schools, public broadcasting, and civic education programmes.</li>
              <li>Military service, where it exists, is a powerful instrument of state socialization — it drills discipline, patriotism, physical endurance, and obedience to command.</li>
            </ul>
            <ExampleBox>
              <strong>State socialization in Kenya:</strong> The Kenyan state socialises citizens in multiple ways. The national curriculum teaches a common national history, civic values, and patriotism. National holidays (Madaraka Day, Jamhuri Day, Mashujaa Day) reinforce shared national identity and historical memory. The National Youth Service socialises young people into discipline and civic responsibility. Traffic laws, anti-corruption campaigns, and public health mandates (like the public smoking ban) all represent the state's ongoing effort to shape citizen behaviour in line with collectively agreed social values.
            </ExampleBox>
          </AgencyCard>

          <AgencyCard icon={<Users className="h-5 w-5" />} title="6. Mass Media">
            <p>Mass media — including television, radio, the internet, social media, newspapers, and magazines — has emerged as one of the most powerful agents of socialization in the modern world. It operates on a vast scale, reaching a broad audience across geographical and class boundaries and influencing their attitudes, beliefs, and behaviours.</p>
            <ul className="list-disc list-inside space-y-1 mt-2">
              <li><strong>Information provision:</strong> Mass media provides information about current events, cultural norms, and societal values, shaping public perceptions and opinions about everything from health to politics to gender roles.</li>
              <li><strong>Educational content:</strong> Media offers educational programmes aimed at children and adults, helping them develop language skills, mathematical concepts, and moral understanding (e.g., Sesame Street, educational YouTube channels).</li>
              <li><strong>Cultural transmission:</strong> Media transmits popular culture — music, fashion, language, values — across national and generational boundaries at unprecedented speed.</li>
              <li><strong>Role modelling:</strong> Media figures — celebrities, athletes, politicians, influencers — function as role models whose behaviours, values, and lifestyles are imitated by audiences.</li>
            </ul>
            <WarningBox>
              <strong>Negative effects of mass media socialization:</strong> Media also creates unrealistic images and expectations. Advertising promotes ideals of physical beauty that are unattainable for most people, contributing to body image disorders. Social media creates "comparison cultures" that drive anxiety, depression, and social isolation. Violent video games and films may normalise aggression. Misinformation spreads rapidly, distorting public understanding of health, science, and politics. Perhaps most significantly, excessive media consumption reduces face-to-face social interactions, potentially weakening the very social bonds that healthy socialization requires.
            </WarningBox>
            <ExampleBox>
              <strong>Social media and Kenyan youth:</strong> Platforms like TikTok, Instagram, Twitter/X, and WhatsApp are now among the most powerful socialising forces for Kenyan youth. They transmit fashion trends, political ideas, sexual norms, language (including new slang), and social values at extraordinary speed. The "influencer" culture — where young people with large social media followings shape the attitudes and consumer behaviour of their followers — is a new and powerful form of socialization that operates outside the control of family, school, state, or church.
            </ExampleBox>
          </AgencyCard>

          {/* ===== SECTION 6 ===== */}
          <SectionHeading id="types" number="Section 6" title="Types of Socialization" />

          <div className="space-y-4 mb-5">
            {[
              {
                type: "Primary Socialization",
                desc: "This occurs in early childhood, primarily within the family. It is the most foundational and enduring form of socialization — it lays down the basic framework of language, values, identity, and emotional responses upon which all later socialization builds. What we learn in primary socialization tends to be deeply internalised and forms the core of our personality and worldview.",
                eg: "Learning to speak Dholuo, absorbing Luo cultural values around respect for elders, developing attachment to family members, learning basic moral distinctions between right and wrong — all of these are products of primary socialization within a Luo family."
              },
              {
                type: "Secondary Socialization",
                desc: "This occurs later in life, as individuals encounter new institutions and social contexts — schools, workplaces, religious institutions, peer groups, the media. Secondary socialization builds upon the foundation of primary socialization but introduces the individual to broader social roles, specialised knowledge, and more formal institutional norms.",
                eg: "When a student enters university, they undergo secondary socialization: they learn the norms of academic life (writing essays, engaging in seminars, citing sources, managing independent study), they are exposed to diverse peers from different backgrounds, and they are introduced to new ideas that may challenge or refine the values instilled in primary socialization."
              },
              {
                type: "Anticipatory Socialization",
                desc: "This is the process by which individuals prepare for future roles by practising the behaviours, values, and attitudes associated with those roles before they formally occupy them. People voluntarily adopt the norms and values of a group they aspire to join.",
                eg: "A medical student who begins to dress professionally, adopt the detached-yet-caring bedside manner of physicians, and speak using medical terminology is engaging in anticipatory socialization — practising being a doctor before officially becoming one. Similarly, young people who practise business dress codes before their first job interview are socialising themselves into professional norms."
              },
              {
                type: "Re-socialization",
                desc: "This occurs when individuals shed an old identity and the norms associated with it, and adopt a radically new set of norms, values, and behaviours. It often occurs in 'total institutions' — closed social environments like prisons, military boot camps, psychiatric hospitals, or monasteries — where the individual's previous identity is systematically dismantled and a new one built in its place.",
                eg: "Military basic training is a classic example: recruits have their civilian identity stripped away (their hair is shaved, they wear identical uniforms, their civilian names may be replaced by ranks or numbers), and they are subjected to intense physical and psychological conditioning designed to build a new military identity centred on discipline, obedience, unit loyalty, and physical toughness. Prison is another: whether by design or by default, incarceration socialises inmates into the norms of prison culture."
              },
              {
                type: "Developmental Socialization",
                desc: "This is the process by which people learn to improve their social and interpersonal skills over time. It is an ongoing, positive form of socialization that helps individuals become more effective in navigating social environments — improving communication, building empathy, developing leadership abilities, and expanding their social competence.",
                eg: "Attending a public speaking course, joining a community service organisation, undergoing therapy to improve relationships, or participating in leadership training are all forms of developmental socialization — deliberate efforts to grow and improve one's social capabilities."
              },
            ].map(({ type, desc, eg }) => (
              <div key={type} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-2">{type}</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{desc}</p>
                <div className="mt-2 pl-3 border-l-2 border-primary/30">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Example</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{eg}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ===== SECTION 7 ===== */}
          <SectionHeading id="features" number="Section 7" title="Features / Characteristics of Socialization" />

          <div className="space-y-3 mb-5">
            {[
              ["It is a lifelong process", "Socialization begins at birth and continues until death. It is not confined to childhood but encompasses every stage of life — childhood, adolescence, adulthood, and old age. Every new role, every new institution, every major life transition involves new socialization."],
              ["It involves learning, not instinct", "Socialization is definitively a matter of learning, not biological inheritance. Everything that socialization transmits — language, values, norms, customs, beliefs — must be actively learned through social interaction. There is no cultural gene."],
              ["It is interactive", "Socialization is not a one-way process in which society imposes itself on a passive individual. It is always interactive: the individual actively engages with socialising agents, interprets messages, selects from competing influences, and sometimes resists or modifies what they are taught."],
              ["It creates a social self", "Through socialization, the biological individual becomes a social self — a person with a sense of identity, moral commitments, cultural knowledge, and emotional bonds. The 'self' is not pre-given; it emerges from the social process."],
              ["It transmits culture", "Socialization is the primary mechanism through which culture is transmitted from one generation to the next. Without socialization, each generation would have to rediscover everything that its predecessors learned — language, technology, moral norms, religious beliefs, artistic traditions."],
              ["It ensures social continuity", "By transmitting shared norms and values from one generation to the next, socialization ensures that society continues to function in a recognisably consistent way across time. It is the social glue that holds generations together."],
              ["It is contextual", "Socialization is shaped by the specific cultural, historical, economic, and social context in which it occurs. A child socialised in rural Turkana is shaped by different norms, values, and experiences than a child socialised in Nairobi's Karen suburb — even if both are Kenyan. Context is everything."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 4: Socialization</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Socialization</strong> is the lifelong process of learning norms, values, and social skills necessary to function in society.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Daniella's case</strong> proves that biology alone is insufficient — without social interaction, even basic human capacities (walking, speaking, eating) fail to develop.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Two functions:</strong> Transmits social heritage + Creates personality.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Four factors:</strong> Imitation, Suggestion, Identification, Language.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Six agencies:</strong> Family (first), School (second), Peers, Church/Religion, State, Mass Media.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Five types:</strong> Primary, Secondary, Anticipatory, Re-socialization, Developmental.</span></li>
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
