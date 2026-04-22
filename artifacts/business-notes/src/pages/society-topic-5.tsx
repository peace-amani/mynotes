import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";

const sections = [
  { id: "concept", label: "1. The Concept of Culture" },
  { id: "characteristics", label: "2. Characteristics of Culture" },
  { id: "symbols", label: "3. Symbols" },
  { id: "language", label: "4. Language" },
  { id: "values", label: "5. Values" },
  { id: "norms", label: "6. Norms" },
  { id: "folkways-mores", label: "7. Folkways and Mores" },
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

export default function SocietyTopic5() {
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
      { label: "Week 5: Culture" },
    ]}>
      <Helmet>
        <title>Culture — Characteristics, Symbols, Language, Values & Norms | Study Notes</title>
        <meta name="description" content="The concept of culture, its 7 characteristics, and the four elements: symbols, language, values, and norms (including folkways and mores)." />
        <meta property="og:title" content="Culture — Week 5 | Society & Culture" />
        <meta property="og:image" content="https://notes.xwolf.space/og-home.svg" />
      </Helmet>

      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 5 · Society &amp; Culture</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Culture</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Culture is simultaneously the most obvious and the most invisible feature of human life. It shapes everything we do — how we eat, dress, speak, pray, mourn, celebrate, and understand the world — yet it is so deeply embedded in our daily existence that we rarely notice it. This week we unpack what culture is, what its characteristics are, and what its core elements consist of.
            </p>
          </div>

          {/* ===== SECTION 1 ===== */}
          <SectionHeading id="concept" number="Section 1" title="The Concept of Culture" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The word <strong>culture</strong> means different things to different people. In everyday speech, we might say someone is "very cultured" to mean they are refined, educated, or appreciative of the arts. We speak of "popular culture," "youth culture," "company culture," and "cultural heritage." In sociology, however, culture has a precise and comprehensive meaning that encompasses far more than artistic sophistication.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            To the sociologist, <strong>culture is a system of ideas and values, beliefs, knowledge, norms, customs, and technology shared by almost everyone in a particular society and passed from one generation to the next</strong>. It is the entire toolkit through which human beings make sense of the world, relate to each other, and organise their collective life.
          </p>

          <blockquote className="my-6 border-l-4 border-primary/40 pl-6 py-2">
            <p className="font-serif text-lg italic text-foreground/75 leading-relaxed">"Culture is that complex whole which includes knowledge, belief, art, morals, laws, custom, and any other capabilities and habits acquired by man as a member of society."</p>
            <footer className="mt-2 text-sm text-muted-foreground">— E.B. Taylor (1871) — the first formal definition of culture in anthropology</footer>
          </blockquote>

          <ExplainerBox>
            <strong>Unpacking Taylor's definition word by word:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>"Complex whole"</strong> — Culture is not a single thing but an interconnected system. You cannot understand one element of culture in isolation from the others.</li>
              <li><strong>"Knowledge"</strong> — Everything a society knows: how to grow crops, treat illness, calculate time, build structures, navigate rivers.</li>
              <li><strong>"Belief"</strong> — Everything a society accepts as true, including religious beliefs, superstitions, folk understandings, and scientific theories.</li>
              <li><strong>"Art"</strong> — All forms of creative expression: music, dance, visual arts, oral literature, sculpture, architecture.</li>
              <li><strong>"Morals"</strong> — The values and ethical principles the society upholds: what is right and wrong, honourable and shameful.</li>
              <li><strong>"Laws"</strong> — Formalised rules backed by state authority.</li>
              <li><strong>"Custom"</strong> — Informal, traditional practices that govern everyday life without formal legal enforcement.</li>
              <li><strong>"Acquired by man as a member of society"</strong> — Culture is not biologically inherited. It is learned through participation in social life.</li>
            </ul>
          </ExplainerBox>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Culture is a society's system of common heritage. Each of us has a culture because we were all raised in a particular society. We express our culture continuously — in our dress, food, work, language, and other activities. We learn our culture from our forebears and contemporaries, and then we pass it on to future generations.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            In general terms, culture can be said to include all the <strong>human phenomena in society that are not products of biological inheritance</strong>. Culture includes all learned behaviour and consists of both:
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">Material Culture</h3>
              <p className="text-sm text-foreground/80 mb-2">The physical, tangible products of human activity that a culture creates and uses. Material culture includes:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-0.5">
                <li>Houses and architecture</li>
                <li>Clothing and jewellery</li>
                <li>Tools and technologies</li>
                <li>Food and cooking implements</li>
                <li>Art objects, sculptures, and musical instruments</li>
                <li>Vehicles and infrastructure</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-2 italic">Both the skills needed to make a product AND the product itself are parts of culture.</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">Non-Material Culture</h3>
              <p className="text-sm text-foreground/80 mb-2">The intangible, invisible aspects of culture — the ideas, beliefs, and meanings that give material culture its significance. Non-material culture includes:</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-0.5">
                <li>Language and communication patterns</li>
                <li>Values and moral standards</li>
                <li>Norms and rules of conduct</li>
                <li>Beliefs and worldviews</li>
                <li>Rituals and ceremonies</li>
                <li>Folklore and oral traditions</li>
              </ul>
            </div>
          </div>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Culture is one of the most complex sociological concepts and one of the most central to understanding human behaviour. A comprehension of the elements of culture is important to all interpersonal relationships — from personal life to occupation. Cultural understanding prevents misunderstanding, reduces conflict, and enables effective communication across social boundaries.
          </p>

          <ExampleBox>
            <strong>Culture is everywhere:</strong> Right now, as you read this, culture is operating in multiple ways simultaneously: the language you are reading in (English) is a cultural product; the concept of a "university examination" is a cultural institution; the expectation that you should study independently reflects cultural values around individual achievement; the device you are reading on is a product of technological culture; even the fact that you are doing this in preparation for a grade reflects a cultural system that organises knowledge, credentials, and career opportunities in a particular way. There is no view from outside culture — we are always already inside it.
          </ExampleBox>

          {/* ===== SECTION 2 ===== */}
          <SectionHeading id="characteristics" number="Section 2" title="Characteristics of Culture" />

          <p className="text-base text-foreground/80 leading-relaxed mb-5">
            Every human culture — however different they may appear in their specific content — shares certain fundamental characteristics. These are the properties that define culture as such, wherever it is found.
          </p>

          {[
            {
              title: "Culture is Learnt",
              content: "Culture is not innate — it is not part of our biological inheritance. We are not born with culture; we acquire it through socialization and the development of habits. Cultural traits are learned through interaction with others, observation, instruction, and practice. This is why culture varies across societies: there is no universal culture determined by genetics, only diverse cultures shaped by different historical, geographical, and social circumstances.",
              example: "A child born in Korea and adopted at birth by a Kenyan family will grow up speaking Swahili and Kikuyu, eating ugali and nyama choma, celebrating Kenyan national holidays, and observing Kenyan cultural norms — not Korean ones. Their biology is Korean; their culture is Kenyan. This powerfully demonstrates that culture is acquired through the social environment, not through genes."
            },
            {
              title: "Culture is Social",
              content: "Culture does not exist in isolation. It originates and develops through social interaction. A person cannot create a culture alone — by definition, culture requires a group. Man cannot acquire human qualities without his association with other men. Culture is fundamentally a collective achievement: the accumulated wisdom, practices, and beliefs of generations of people living together and sharing experiences. Robinson Crusoe alone on an island might maintain his pre-existing culture for a while, but he could not create new culture in isolation.",
              example: "The Swahili culture of the East African coast is the product of centuries of interaction between Bantu-speaking coastal communities, Arab traders, Persian merchants, and Indian businesspeople. No single group created it alone — it emerged from their sustained social and economic interactions. It is simultaneously African and cosmopolitan, a culture shaped by the meeting of many peoples."
            },
            {
              title: "Culture is Shared",
              content: "Culture is not individual but collective. It includes the expectations of the group as a whole. It is a social product — not a private invention. For a practice, value, or belief to count as culture, it must be shared among a significant portion of the group. Individual quirks, personal preferences, and idiosyncratic habits are not culture — they become cultural only when they are adopted by the group. Culture represents the shared expectations, meanings, and practices through which a community maintains its coherent identity.",
              example: "The practice of harambee — communal fundraising — is shared across Kenyan communities of diverse ethnic backgrounds and has become part of national Kenyan culture. Virtually all Kenyans understand what a harambee is, know how to participate in one, and share the values of mutual support and community solidarity that it expresses. Its 'sharedness' is precisely what makes it cultural."
            },
            {
              title: "Culture is Idealistic",
              content: "It is rightly said that what is included in culture is not always fully attained — it is always idealised, and efforts are made to achieve these ideals. Culture reflects ideal norms and ideal behaviour for a group. Cultural ideals set standards that people aspire to but rarely fully achieve. The difference between what culture prescribes (the ideal) and what people actually do (the real) is one of the most interesting and important areas of sociological investigation.",
              example: "Every culture prescribes ideals of family life — loving, supportive, economically stable, morally upright families. The reality of family life in any society falls considerably short of this ideal: there is divorce, domestic violence, neglect, economic hardship, and dysfunction. Yet the ideal persists and continues to influence behaviour, legislation, and social expectations. The ideal of 'the good Kenyan family' shapes law (e.g., the Children Act), policy (e.g., child support enforcement), and social pressure — even when the reality is far more complex."
            },
            {
              title: "Culture is Transmittive",
              content: "Culture always has a link with the past. It is the past that is given to the future in the form of customs, traditions, and inherited practices. Each generation does not start from scratch — it inherits a vast cultural legacy from previous generations, adapts and modifies it, and passes it on in turn. This intergenerational transmission is what gives culture its depth, its historical resonance, and its sense of continuity. The process of cultural transmission is socialization — through which each new generation absorbs the accumulated heritage of its predecessors.",
              example: "Traditional Kenyan wedding ceremonies are a vivid example of cultural transmission. In many communities, specific rituals — the negotiation of bride price (lobola/ruracio), the blessing of the couple by elders, the specific foods prepared and served, the songs sung — have been passed down through generations. Young people who participate in these ceremonies are receiving a living transmission of their community's history, values, and sense of identity. Some elements remain unchanged across centuries; others are adapted to modern circumstances. Both continuity and adaptation are aspects of cultural transmission."
            },
            {
              title: "Culture is Gratifying",
              content: "Each social group has certain common ends and needs, which are met by the culture. Culture meets both physical and non-physical needs — it provides methods for satisfying hunger, the need for shelter, the need for belonging, the need for meaning, and the need for beauty. Culture gratifies ethical, aesthetic, emotional, and social needs of the group as a whole. In this sense, culture is not a constraint imposed from outside but a resource that communities create and use to meet their deepest needs.",
              example: "Kenyan funeral culture provides a powerful example of cultural gratification. When a person dies, there are culturally prescribed ways of grieving, supporting the bereaved family, preparing and burying the body, and commemorating the deceased. These rituals are not arbitrary — they meet profound needs: they channel grief, they reinforce community solidarity, they affirm beliefs about life and death, and they ensure the dignified transition of the deceased. Without cultural rituals to structure these moments, death would be far more psychologically overwhelming."
            },
            {
              title: "Culture is Dynamic",
              content: "Culture is not static — it is always changing. It simply means 'a way of life,' and ways of life evolve in response to changing circumstances. Inventions, discoveries, problems, and planned changes all affect culture. New ways of life are evolved and adopted in an attempt to adjust to changed circumstances. Every factor that affects society also brings about changes in the cultural arena. Culture absorbs new elements, discards obsolete ones, and continuously evolves. However, cultural change often occurs unevenly — some elements change rapidly (fashion, technology) while others change very slowly (core values, religious beliefs, family structures).",
              example: "Kenyan culture has absorbed mobile phones and mobile money (M-Pesa) within a single generation, fundamentally transforming how people transact, communicate, and organise their social and economic lives. Yet at the same time, many traditional practices around marriage, burial, and family obligation remain remarkably persistent. Culture is dynamic in the sense that it changes — but it does not change uniformly or completely. It is always a mixture of the inherited and the new."
            },
          ].map(({ title, content, example }) => (
            <div key={title} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden mb-4">
              <div className="px-5 py-3 border-b border-border/40 bg-muted/30">
                <p className="font-semibold text-foreground text-sm">{title}</p>
              </div>
              <div className="px-5 py-4 space-y-2">
                <p className="text-sm text-foreground/80 leading-relaxed">{content}</p>
                <div className="pl-3 border-l-2 border-primary/30 mt-2">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Example</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{example}</p>
                </div>
              </div>
            </div>
          ))}

          {/* ===== SECTION 3 ===== */}
          <SectionHeading id="symbols" number="Section 3" title="Elements of Culture: Symbols" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A <strong>symbol</strong> is anything that carries a particular meaning recognised and shared by people who share a culture. Words, numbers, gestures, crosses, flags, colours, animals — all of these can function as symbols.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The existence of culture is entirely dependent on people's ability to create and understand symbols. Without symbols, there would be no language, no religion, no art, no law, no money, and no science — all of which depend fundamentally on the shared ability to make one thing "stand for" something else.
          </p>

          <div className="space-y-3 mb-5">
            {[
              ["The ability to use symbols is uniquely human", "Unlike animals, human beings can use symbols to understand reality, transmit messages, store complex information, and deal with abstract symbolic worlds. An animal can respond to a red light because of conditioning — but it does not understand that red 'means' danger. A human understands the meaning of red in a traffic light, and can reason about what would happen if the rules were changed. This capacity for symbolic thought is the foundation of human culture."],
              ["Symbols are collective creations", "Symbols are products of group experiences and needs — they are not invented by individuals. They also shape group experiences and future needs. Symbols emerge from collective life and then feed back into it, shaping how the group perceives and organises the world."],
              ["Symbols are arbitrary designations", "There is no necessary, natural connection between a symbol and what it represents. There is nothing inherent in holding one's thumb up that indicates approval — this meaning is a cultural convention, not a natural fact. If a group of children designates a tree as a 'goal,' it becomes a goal. Different cultures have made entirely different arbitrary choices about what symbols to use and what they mean."],
              ["Symbols are often unrelated to the objects they represent", "Only humans can assign symbols to represent objects and concepts that may be completely unrelated to the symbol itself. This arbitrariness is precisely what makes human symbol systems so flexible and powerful — we can create symbols for anything, including abstract concepts like 'justice,' 'infinity,' or 'democracy' that have no physical form at all."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <ExampleBox>
            <strong>Symbols across cultures — the same gesture, different meanings:</strong> The "thumbs up" gesture means approval and positivity in most Western cultures. In parts of West Africa and the Middle East, however, the same gesture is considered highly offensive — equivalent to raising the middle finger. Similarly, nodding the head up and down means "yes" in most cultures, but in Bulgaria and parts of Greece, it means "no." This demonstrates the arbitrary and culturally specific nature of symbols: the same physical action can carry completely different — even opposite — meanings depending on the cultural context.
          </ExampleBox>

          <ExampleBox>
            <strong>Kenyan symbols:</strong> The Kenyan flag is rich with symbolism: black represents the people of Kenya; red represents the blood shed during the struggle for independence; green represents the land and natural resources; white represents peace and unity; the Maasai shield and two spears represent the defence of freedom. None of these relationships are "natural" — they are arbitrary cultural assignments. Yet these symbols carry powerful meaning for Kenyans, generating pride, emotion, and national identity.
          </ExampleBox>

          {/* ===== SECTION 4 ===== */}
          <SectionHeading id="language" number="Section 4" title="Elements of Culture: Language" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The most important set of symbols is <strong>language</strong> — the systematised usage of speech and hearing (and writing) to convey or express feelings and ideas. Language is uniquely flexible and precise. It enables us to share experiences from the past and present, convey hopes for the future, describe dreams and fantasies, and communicate about things that bear little resemblance to physical reality.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Language is the chief factor in our ability to transmit culture.</strong> It is through language that our ideas, values, beliefs, and knowledge are transmitted, expressed, and shared. All human societies have languages. Although there are thousands of different languages in the world, linguistic behaviour as such is universal — every human group has developed a spoken language.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Language is uniquely human, and this is what fundamentally distinguishes humans from other forms of life. The importance of language to human beings and our cultural heritage is dramatically illustrated by experiments conducted with chimpanzees:
          </p>

          <div className="rounded-xl border border-border/60 bg-muted/20 p-6 mb-5">
            <p className="text-xs font-bold tracking-widest text-primary uppercase mb-3">The Chimpanzee Language Experiments</p>
            <div className="space-y-3 text-sm text-foreground/80 leading-relaxed">
              <p>Psychologists raised young chimpanzees in their homes alongside their own infants of the same age, treating both as equally as possible and monitoring their development carefully. In many respects — especially motor skills — the chimpanzee's early development matched or even exceeded the human infant's. The chimpanzee could walk earlier, grip objects more dexterously, and navigate physical environments with greater agility.</p>
              <p>However, the moment the human child began to speak, their cognitive development rapidly and dramatically outpaced that of the chimpanzee. Every effort was made to teach the chimpanzee to speak — but without success. The researchers reported that they were "completely unable to train their animal to utter any word or imitate human speech."</p>
              <p>In a second experiment, researchers reported that their chimpanzee had acquired a "vocabulary" of three words — "mama," "papa," and "cup." However, observers noted that the imitation of these words was so crude that the sounds could hardly be identified, and could be called words "only by a stretch of imagination." Moreover, these words were used mechanically and without genuine understanding.</p>
              <p>These studies demonstrate a major gap between human infants and chimpanzees — a difference in kind, not merely in degree. The chimpanzee's inability to acquire language is not a matter of effort or intelligence alone; it reflects a fundamental difference in the cognitive and biological architecture of the human species.</p>
            </div>
          </div>

          <ExplainerBox>
            <strong>What these experiments reveal about culture:</strong> If chimpanzees cannot acquire language (despite being our closest biological relatives and being raised in human environments), then language — and through it, the entire edifice of human culture — is specifically and exclusively human. This explains why, despite millions of years of coexistence with other primate species, only humans have developed art, religion, science, law, philosophy, and complex social institutions. Language is not merely a communication tool; it is the foundation of all distinctly human achievement.
          </ExplainerBox>

          <h3 className="font-semibold text-foreground text-lg mt-5 mb-3">Why Language Matters for Culture</h3>
          <div className="space-y-2 mb-4">
            {[
              ["Language transmits cultural heritage", "Without language, each generation would have to discover everything from scratch. Language allows knowledge, values, history, and wisdom to be encoded and transmitted across generations — in oral tradition, writing, and digital media."],
              ["Language enables complex social organisation", "Law, commerce, education, diplomacy, science, and religion all depend on the capacity to communicate complex, abstract ideas precisely. Without language, none of these institutions would be possible."],
              ["Language shapes perception", "The Sapir-Whorf hypothesis argues that the language you speak shapes how you perceive and experience reality. Languages that have precise vocabulary for concepts allow their speakers to make finer discriminations about those concepts than speakers of languages without that vocabulary."],
              ["Language can help or hinder cultural transmission", "Sometimes ideas or concepts are hard to translate because a language has no word to express them. Kiswahili, for example, does not have equivalents for a number of technical scientific terms — this creates barriers to the transmission of scientific knowledge through Swahili and has implications for science education policy in Kenya."],
              ["Language is so basic to culture that it is taken for granted", "We rarely notice language unless it fails — when we encounter a translation error, a misunderstood idiom, or a concept that doesn't exist in our language. Yet language is operating continuously, shaping every thought we think and every relationship we maintain."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-3">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          {/* ===== SECTION 5 ===== */}
          <SectionHeading id="values" number="Section 5" title="Elements of Culture: Values" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Values</strong> are abstract conceptions of what is important and worthwhile. These conceptions are shared by the people in a society. Our values are the basis of our judgements about what is desirable, beautiful, correct, and good — as well as what is undesirable, ugly, incorrect, and bad.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Most values have both positive and negative counterparts which are reciprocally related. For example: if you place a high positive value on fighting for your country, you will place a high negative value on those who refuse to fight. If you value hard work positively, you will judge laziness negatively. Values always come in these paired positive and negative forms.
          </p>

          <div className="space-y-3 mb-5">
            {[
              ["Values are emotionally charged", "Values stand for things we believe are worth defending — and this belief is not merely intellectual but deeply emotional. When our values are challenged, we feel it viscerally: threatened, offended, angry, or afraid. This emotional charge is what gives values their motivating power. It is also what makes value conflicts so intense and difficult to resolve."],
              ["Values influence the content of norms", "Values are the foundation upon which norms (specific behavioural rules) are built. If a society values education highly, its norms will make provision for mass schooling and the punishment of those who prevent children from attending. If a society values gender equality, its norms will prohibit discrimination based on sex. The relationship flows from values to norms: first the society decides what matters, then it creates specific rules to protect and promote those things."],
              ["Basic values are learned in early life", "Most of our basic values are learned in early life from family, friends, mass media, and other sources within the society. These values become part of our personalities. Because we learn them from our societies, few people possess truly unique sets of values — they are generally shared and reinforced by those with whom we interact."],
              ["Values serve as a general guide for behaviour", "Some of the things that form our value system include God, money, honesty, cleanliness, freedom, children, education, work, and marriage. These values serve as a general guide for our behaviour and the formation of specific attitudes. They tell us what to pursue, what to avoid, what to admire, and what to condemn."],
              ["Values justify and prohibit behaviour", "Since values indicate what is proper and improper, they tend to justify certain types of behaviour and forbid others. A society that values respect for elders will justify deferential behaviour toward older people and prohibit disrespectful treatment, even when the elder is wrong."],
              ["Value conflicts create moral stress", "When basic values are in conflict, we usually place them in a hierarchy of importance and behave consistently with the most important. For example, during war, the value of patriotism may overcome the value of preserving human life — soldiers are willing to kill and risk death for their country. When it is impossible to resolve a value conflict through hierarchy, we may feel profound guilt or mental stress."],
              ["Values differ across societies", "Values are learned cultural products and thus differ from one society to another. One society may value political independence and another places value on political conformity and obedience. One society may value individual achievement while another emphasises family unity and collective support. Neither is inherently superior — they reflect different cultural traditions and social contexts."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4 mb-2">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <ExampleBox>
            <strong>Value conflicts in Kenyan society:</strong> A common value conflict in Kenya is between the value of <em>ethnic loyalty</em> (sticking with and supporting one's ethnic community) and the value of <em>national unity</em> (prioritising the welfare of all Kenyans regardless of ethnicity). During elections, many voters face this conflict acutely: do I vote for the candidate from my community (ethnic loyalty) or the candidate I believe is more competent and will govern for all Kenyans (national merit)? This value conflict — and how it is resolved by millions of voters — shapes national politics and the quality of governance.
          </ExampleBox>

          <NoteBox>
            <strong>The difference between values and norms:</strong> Values are abstract and general conceptions of what is important and worthwhile. Norms are specific guidelines for behaviour in particular kinds of situations. Honesty is a general value. The expectation that students should not cheat in an examination is a norm. The value gives direction; the norm gives specific instruction. You cannot understand why a norm exists without knowing the value it serves.
          </NoteBox>

          {/* ===== SECTION 6 ===== */}
          <SectionHeading id="norms" number="Section 6" title="Elements of Culture: Norms" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Norms</strong> are rules of conduct — social expectations about how people should and should not behave in various social situations. They are both:
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">Prescriptive</h3>
              <p className="text-sm text-foreground/80">They tell people what they <em>should</em> do. "Greet your elders respectfully." "Dress modestly in places of worship." "Pay your taxes." "Respect other people's property." These prescriptions direct behaviour toward desired social outcomes.</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <h3 className="font-semibold text-foreground mb-2">Proscriptive</h3>
              <p className="text-sm text-foreground/80">They tell people what they <em>should not</em> do. "Do not cheat in examinations." "Do not speak disrespectfully to elders." "Do not steal." These prohibitions protect social values and the rights of others.</p>
            </div>
          </div>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            While values are abstract conceptions of what is important and worthwhile, social norms are <strong>standards, rules, guides, and expectations for actual behaviour</strong>. Norms link values with actual events. Norms and values are conceptually consistent, but values are less situation-bound and more general and abstract. Norms are the operational rules through which values are enacted in specific situations.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Most norms permit a range of behaviour — certain kinds of over-conformity and under-conformity are expected and tolerated. We should not, for example, harshly criticise a starving man who lies to get food. Norms are flexible enough to accommodate contextual variation and emergency circumstances.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Norms ensure that social life proceeds smoothly, for they give us guidelines for our own behaviour and reliable expectations for the behaviour of others. This function is so important that there is always strong social pressure on people to conform to established norms. The norms of a society are ultimately an expression of its values.
          </p>

          <ExampleBox>
            <strong>Norms in university life:</strong> University norms govern every aspect of student behaviour: attending lectures (unless ill), submitting work before deadlines, citing sources in essays, addressing lecturers by their title, not speaking loudly in the library, not using phones during examinations, and wearing appropriate clothing in academic settings. These norms are not arbitrary — they reflect the values of academic integrity (honesty), respect for learning (punctuality and preparation), and respect for others (not disrupting their work). When norms are violated, social pressure is applied: a student who cheats faces not only institutional sanctions (expulsion) but also social disapproval from peers.
          </ExampleBox>

          {/* ===== SECTION 7 ===== */}
          <SectionHeading id="folkways-mores" number="Section 7" title="Folkways and Mores" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            American sociologist <strong>William G. Summer</strong> identified two types of norms based on their moral weight and the severity of the reaction to their violation. He labelled them <strong>folkways</strong> and <strong>mores</strong>.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
              <h3 className="font-semibold text-foreground text-base mb-3">Folkways</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">Folkways are customs or conventions — norms that provide rules for conduct but whose violation brings only mild social censure, not serious punishment. They are the ordinary usages and conventions of everyday life. Conformity to folkways is expected, but not absolutely insisted upon.</p>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">Like all norms, folkways are learned through interaction with others and passed down from generation to generation. They change as culture changes or when we enter different social situations. Our tendency is to accept folkways as appropriate without questioning them.</p>
              <div className="mt-2 text-xs text-muted-foreground italic">Examples: shaking hands in greeting, chewing food quietly, wearing pants rather than pyjamas to lectures, saying "please" and "thank you," making eye contact during conversation.</div>
            </div>
            <div className="rounded-xl border-2 border-red-200/40 bg-red-50/30 dark:bg-red-900/10 p-5">
              <h3 className="font-semibold text-foreground text-base mb-3">Mores</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">Mores (pronounced "MOR-ayz") are considered far more important than folkways and involve a clear-cut distinction between right and wrong. They are closely associated with the values a society considers most fundamental. The word "mores" comes from the ancient Roman term for their most respected and even sacred customs.</p>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">Violations of mores inspire intense reactions, and some form of punishment inevitably follows. This punishment may involve expulsion from the group, harsh ridicule, imprisonment, or even death. People believe that their mores are crucial for the maintenance of a decent and orderly society.</p>
              <div className="mt-2 text-xs text-muted-foreground italic">Examples: prohibition on murder, sexual abuse, incest, betrayal of one's country, child neglect, public nudity (especially of genitals), theft, and fraud.</div>
            </div>
          </div>

          <div className="overflow-x-auto mb-5">
            <table className="text-sm border border-border/40 w-full text-left">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">Feature</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold text-blue-700 dark:text-blue-400">Folkways</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold text-red-700 dark:text-red-400">Mores</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  ["Moral weight", "Low — convention, not morality", "High — directly tied to core moral values"],
                  ["Violation response", "Mild: smiles, glances, gentle comments", "Severe: punishment, expulsion, imprisonment, death"],
                  ["Changeability", "Change relatively easily with culture", "More resistant to change; deeply embedded"],
                  ["Examples", "Table manners, dress codes, greetings", "Prohibitions on murder, incest, child abuse, treason"],
                  ["Basis", "Custom and convention", "Deep moral conviction and sacred values"],
                  ["Enforcement", "Informal social pressure only", "Both formal law and intense informal pressure"],
                ].map(([feat, folk, more]) => (
                  <tr key={String(feat)}>
                    <td className="px-4 py-2 font-medium text-foreground">{feat}</td>
                    <td className="px-4 py-2 text-muted-foreground">{folk}</td>
                    <td className="px-4 py-2 text-muted-foreground">{more}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ExampleBox>
            <strong>William Summer's classic illustration of the difference:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>A man who walks down a street wearing nothing on his <em>upper</em> body (no shirt) is violating a <strong>folkway</strong> — it is unconventional and will attract looks and mild disapproval, but it is not a serious moral offence.</li>
              <li>A man who walks down a street wearing nothing on his <em>lower</em> body (no trousers) is violating one of society's most important <strong>mores</strong> — the requirement that people cover the genitals in public. This will provoke intense shock, outrage, and immediate intervention by authorities. It is not merely a violation of convention; it is experienced as a moral offence and a threat to public decency.</li>
            </ul>
            The difference is not just in the degree of reaction — it is in the kind of norm violated. Folkways are about convention; mores are about morality.
          </ExampleBox>

          <h3 className="font-semibold text-foreground text-lg mt-6 mb-3">Taboos — The Most Extreme Mores</h3>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Some violations of mores are made almost literally unthinkable by a <strong>taboo</strong> — a powerful social belief that some specific act is so utterly loathsome that it must never be contemplated, let alone performed. Taboos are the most extreme form of normative prohibition: they function not through fear of punishment but through a deep cultural aversion that makes the act seem inherently revolting or dangerous.
          </p>

          <ExampleBox>
            <strong>Universal and culture-specific taboos:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li><strong>Incest taboo</strong> — found in virtually every human culture, this prohibits sexual relations between close family members. It is perhaps the most nearly universal of all taboos. The specific definition of "close family" varies, but the taboo itself appears across all cultures.</li>
              <li><strong>Cannibalism taboo</strong> — the consumption of human flesh is taboo in virtually all cultures, though there are rare historical exceptions in specific ritual contexts.</li>
              <li><strong>Culture-specific food taboos</strong> — Muslims and Jews are prohibited from eating pork; Hindus are prohibited from eating beef; many Kenyan communities have taboos against eating specific animals. These are not universal but are absolute within the cultures that hold them.</li>
              <li><strong>Speaking the name of the dead</strong> — in some Kenyan and other African communities, speaking the name of a recently deceased person is taboo for a period of mourning. The taboo protects the living from spiritual danger and the memory of the deceased from misappropriation.</li>
            </ul>
          </ExampleBox>

          <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 5: Culture</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Culture</strong> (E.B. Taylor) = "that complex whole including knowledge, belief, art, morals, laws, custom and habits acquired by man as a member of society." It is learned, not inherited.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>7 Characteristics:</strong> Learnt, Social, Shared, Idealistic, Transmittive, Gratifying, Dynamic.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Material culture</strong> = physical products (houses, tools, clothing). <strong>Non-material culture</strong> = intangible products (language, values, norms, beliefs).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Symbols</strong> — arbitrary designations carrying shared meaning; uniquely human capacity that makes culture possible.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Language</strong> — the most important symbol system; the chief medium of cultural transmission; uniquely human (proved by chimpanzee experiments).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Values</strong> — abstract conceptions of what is important; emotionally charged; culturally variable; the basis for norms.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Norms</strong> — specific rules of conduct (prescriptive and proscriptive); link values to actual behaviour.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Folkways</strong> = everyday conventions, mild sanctions for violations. <strong>Mores</strong> = morally important norms, severe sanctions. <strong>Taboos</strong> = the most extreme mores — acts so loathsome they are made almost unthinkable.</span></li>
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
