import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, CheckCircle2 } from "lucide-react";

const sections = [
  { id: "definition", label: "1. Definition of Sociology" },
  { id: "nature", label: "2. Nature & Scope" },
  { id: "social-sciences", label: "3. Sociology & Other Sciences" },
  { id: "importance", label: "4. Importance of Sociology" },
  { id: "development", label: "5. Development of Sociology" },
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

export default function SocietyTopic1() {
  const [activeSection, setActiveSection] = useState("definition");
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
    <Layout breadcrumbs={[{ label: "Unit 3", href: "/" }, { label: "Week 1: Introduction to Sociology" }]}>
      <Helmet>
        <title>Introduction to Sociology | Study Notes</title>
        <meta name="description" content="Definition, nature and scope of sociology, its relationship with other social sciences, importance, and historical development." />
      </Helmet>
      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10"><div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} /></div>
      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 1 · Society &amp; Culture</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Introduction to Sociology</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Sociology is the scientific study of human society — its structure, institutions, processes, and the behaviour of groups. It emerged as a formal discipline in the 19th century in response to the dramatic social transformations of industrialisation, urbanisation, and political revolution. This week establishes the foundations: what sociology is, what it studies, why it matters, and how it developed.</p>
          </div>

          <SectionHeading id="definition" number="Section 1" title="Definition of Sociology" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">The term <strong>sociology</strong> was coined by the French philosopher <strong>Auguste Comte</strong> in 1838. It is a compound word formed from the Latin <em>socius</em> (companion, associate) and the Greek <em>logos</em> (study, science). Literally: the scientific study of social life, social groups, and society.</p>
          <ExplainerBox><strong>Why "science"?</strong> Comte believed sociology should use the methods of natural science — systematic observation, empirical evidence, and logical reasoning — to understand society. This distinguishes sociology from mere opinion or common sense about social life. Sociologists form hypotheses, collect data, and draw evidence-based conclusions about how societies work.</ExplainerBox>
          <div className="space-y-3 mb-5">
            {[
              { scholar: "Auguste Comte", def: "Sociology is the positive science of society — the application of scientific method to the study of social phenomena. It is the queen of all sciences, the most complex and most important." },
              { scholar: "Emile Durkheim", def: "Sociology is the science of social facts. Social facts are ways of acting, thinking, and feeling that are external to individuals and coerce them. Examples: law, morality, religion, language — all exist independently of any individual and shape behaviour." },
              { scholar: "Max Weber", def: "Sociology is a science which attempts the interpretive understanding (Verstehen) of social action in order to arrive at a causal explanation of its course and effects. To understand society, we must understand the meaning that actors give to their actions." },
              { scholar: "Anthony Giddens", def: "Sociology is the systematic study of human societies, giving special emphasis to modern, industrialised systems. It is concerned with social processes, social structures, and how individuals are shaped by — and in turn shape — the societies they live in." },
              { scholar: "C. Wright Mills", def: "Sociology enables us to use the 'sociological imagination' — the ability to see the relationship between personal troubles and public issues. Private troubles (unemployment, divorce, depression) are connected to larger social forces (economic recession, changing family norms, social inequality)." },
            ].map(({ scholar, def }) => (
              <div key={scholar} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-2 border-b border-border/30 bg-muted/30"><p className="font-semibold text-foreground text-sm">{scholar}</p></div>
                <p className="px-5 py-3 text-sm text-foreground/80 leading-relaxed italic">"{def}"</p>
              </div>
            ))}
          </div>
          <ExampleBox><strong>The sociological imagination in practice:</strong> If one person loses their job, that is a personal trouble — perhaps due to poor performance or bad luck. If a million people lose their jobs in a year, that is a public issue: it reflects structural problems in the economy, not individual failure. Sociology trains us to make this shift — from blaming individuals to understanding the social forces shaping their circumstances. This is crucial for good policy-making.</ExampleBox>

          <SectionHeading id="nature" number="Section 2" title="Nature and Scope of Sociology" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">Understanding what kind of discipline sociology is helps us understand what it can and cannot do.</p>
          <h3 className="font-semibold text-foreground text-base mt-5 mb-3">Nature of Sociology</h3>
          <div className="space-y-3 mb-5">
            {[
              ["Sociology is a social science", "It studies human social life using systematic, evidence-based methods. It is distinct from the natural sciences (biology, chemistry) because its subject matter — human beings — is reflexive: people can think about themselves, change their behaviour when studied, and respond to sociological findings about them."],
              ["Sociology is empirical", "It is based on observation, data collection, and evidence rather than on abstract philosophy or speculation alone. Sociologists conduct surveys, interviews, ethnographic fieldwork, and statistical analysis to understand social reality."],
              ["Sociology is both theoretical and applied", "It develops theoretical frameworks to explain social phenomena (functionalism, conflict theory, symbolic interactionism) and applies these to address real-world social problems (poverty, crime, inequality, discrimination)."],
              ["Sociology is both macro and micro", "Macrosociology studies large-scale social structures and institutions (the state, the economy, religious systems). Microsociology studies small-scale face-to-face interactions (how people greet each other, how conversations are structured, how groups make decisions). Both levels of analysis are essential."],
              ["Sociology is general and special", "General sociology studies society as a whole — its structures, processes, and institutions. Special sociologies focus on particular domains: sociology of education, sociology of religion, sociology of gender, medical sociology, economic sociology, urban sociology."],
              ["Sociology is value-laden but strives for objectivity", "Sociologists bring their own backgrounds, values, and perspectives to their work. Achieving perfect objectivity is impossible, but sociology as a discipline demands rigorous evidence, transparency of method, and openness to findings that challenge preconceptions."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
          <h3 className="font-semibold text-foreground text-base mt-5 mb-3">Scope of Sociology</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-3">The scope of sociology is extremely broad. It covers:</p>
          <ul className="list-disc list-inside text-sm text-foreground/80 space-y-1 mb-4">
            <li>Social groups and their structures (families, communities, organisations, nations)</li>
            <li>Social institutions (family, education, religion, economy, government)</li>
            <li>Social stratification and inequality (class, caste, gender, race, ethnicity)</li>
            <li>Social processes (socialisation, competition, conflict, cooperation, accommodation)</li>
            <li>Social change and development (modernisation, globalisation, social movements)</li>
            <li>Social problems (poverty, crime, substance abuse, discrimination, corruption)</li>
            <li>Culture and ideology (values, norms, beliefs, symbols, language)</li>
            <li>Population and environment (demographic trends, urbanisation, environmental sociology)</li>
          </ul>

          <SectionHeading id="social-sciences" number="Section 3" title="Sociology and Other Social Sciences" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">Sociology does not exist in isolation. It is closely related to the other social sciences, sharing some concerns with each while maintaining its distinctive focus on groups, institutions, and social structures.</p>
          <div className="overflow-x-auto mb-5">
            <table className="text-sm border border-border/40 w-full text-left">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">Discipline</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">Focus</th>
                  <th className="px-4 py-2 border-b border-border/40 font-semibold">Relationship with Sociology</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/20">
                {[
                  ["Psychology", "Individual mental processes, behaviour, emotions, cognition", "Both study human behaviour, but psychology focuses on the individual while sociology focuses on the group. Social psychology bridges the two — studying how groups influence individual behaviour."],
                  ["Economics", "Production, distribution, consumption of goods and services; rational choice", "Both study human activity but from different angles. Economics often assumes rational, self-interested actors; sociology examines how social structures, norms, and culture shape economic behaviour."],
                  ["Political Science", "Power, governance, the state, political institutions, and behaviour", "Both examine power and social organisation. Sociology provides the broader social context within which political behaviour occurs; political science focuses specifically on governance and formal power."],
                  ["Anthropology", "Human culture, evolution, biological diversity, and social organisation across cultures", "Sociology and anthropology are closely related. Anthropology traditionally focused on small-scale, pre-industrial societies using ethnographic methods; sociology on complex, industrial societies. Today the boundaries are blurred."],
                  ["History", "Past events, their causes, and their significance", "History provides the temporal context for sociological analysis. Sociology examines social processes over time; historical sociology applies sociological concepts to historical events. Weber and Marx both used historical analysis extensively."],
                  ["Social Work", "Practical intervention to help individuals and families in distress", "Sociology provides the theoretical understanding of social problems; social work provides the practical intervention. Most social workers need a solid foundation in sociology to understand the structural causes of the problems they address."],
                ].map(([disc, focus, rel]) => (
                  <tr key={String(disc)}>
                    <td className="px-4 py-2 font-semibold text-foreground">{disc}</td>
                    <td className="px-4 py-2 text-muted-foreground text-xs">{focus}</td>
                    <td className="px-4 py-2 text-muted-foreground text-xs">{rel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <NoteBox><strong>Interdisciplinarity in practice:</strong> Studying drug abuse in Kenya requires all these disciplines simultaneously: psychology to understand addiction and individual vulnerability; sociology to understand the social environments that encourage drug use; economics to understand the drug trade as a market; political science to understand drug policy; history to understand the origins of drug use patterns; social work to design and deliver rehabilitation programmes. Real social problems do not respect disciplinary boundaries.</NoteBox>

          <SectionHeading id="importance" number="Section 4" title="Importance of Sociology" />
          <div className="space-y-3 mb-5">
            {[
              ["Helps us understand ourselves and our society", "Sociology provides tools to step back from the taken-for-granted assumptions of our daily lives and examine them critically. It reveals how our identities, beliefs, opportunities, and behaviours are shaped by social forces we may not be aware of. This self-knowledge is foundational to personal and social empowerment."],
              ["Guides social policy", "Governments, NGOs, and international organisations rely on sociological research to design effective policies. Understanding the social causes of poverty, crime, disease, and inequality enables more targeted and effective interventions. Without sociological knowledge, policy-makers would be working in the dark."],
              ["Promotes social reform and justice", "By identifying the structural causes of social problems and documenting their human costs, sociology provides the intellectual foundation for campaigns for social justice, equality, and human rights. The civil rights movement, the women's movement, and the anti-apartheid struggle all drew on sociological analysis."],
              ["Contributes to international understanding", "In an increasingly globalised world, understanding cultural differences, migration patterns, international inequality, and global social change is essential for peaceful coexistence. Sociology equips us to understand peoples and societies very different from our own."],
              ["Provides career-relevant skills", "Sociological training develops critical thinking, research skills, data analysis, writing, and the ability to see complex issues from multiple perspectives. These skills are valued in law, medicine, journalism, business, government, education, social work, and many other fields."],
              ["Helps manage social change", "Societies everywhere are changing rapidly — through technological innovation, demographic shifts, climate change, and globalisation. Sociology helps us understand these changes, anticipate their consequences, and develop strategies for managing them without causing unnecessary disruption or suffering."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <SectionHeading id="development" number="Section 5" title="Development of Sociology" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">Sociology emerged as a distinct academic discipline in the 19th century, though social thought has a much longer history. Its development was driven by the dramatic social transformations of the Industrial Revolution, the French Revolution, and the rise of modern capitalism.</p>
          {[
            { name: "Auguste Comte (1798–1857) — France", role: "Founder of sociology", contribution: "Coined the term 'sociology' and argued that society could and should be studied scientifically. He proposed 'positivism' — the idea that knowledge of social reality must be based on observable, measurable evidence, not metaphysics or religion. He proposed a 'law of three stages' through which all human knowledge passes: theological (explained by gods), metaphysical (explained by abstract forces), and positive (explained by science). Sociology, as a positive science of society, would be the capstone of human knowledge." },
            { name: "Herbert Spencer (1820–1903) — Britain", role: "Social Darwinist", contribution: "Applied Darwin's theory of evolution to society ('survival of the fittest'). Spencer argued that societies evolve from simple to complex forms and that social inequality is a natural and necessary feature of this evolution. He opposed welfare measures for the poor, arguing they interfered with 'natural selection.' While his social Darwinism is now widely rejected as politically dangerous, his comparative analysis of social institutions was influential in establishing sociology as a discipline." },
            { name: "Karl Marx (1818–1883) — Germany/Britain", role: "Conflict theorist", contribution: "Marx argued that all history is the history of class struggle — the conflict between those who own the means of production (the bourgeoisie/capitalists) and those who must sell their labour (the proletariat/workers). He analysed capitalism as a system of exploitation that would inevitably generate the conditions for its own revolutionary overthrow. His concepts — class, alienation, ideology, false consciousness, means of production — remain central to sociological analysis even among those who reject his political conclusions." },
            { name: "Emile Durkheim (1858–1917) — France", role: "Father of empirical sociology", contribution: "Durkheim established sociology as an academic discipline with its own distinct subject matter (social facts) and methods (empirical research). His study of suicide (1897) — demonstrating that even this most individual act is shaped by social forces — is a landmark of sociological methodology. He introduced concepts of social solidarity (mechanical and organic), anomie (social normlessness), collective consciousness, and the functions of religion. He showed that social phenomena cannot be reduced to individual psychology." },
            { name: "Max Weber (1864–1920) — Germany", role: "Action theorist", contribution: "Weber complemented Durkheim's focus on social structures with a focus on the meaning of social action. He introduced 'Verstehen' (interpretive understanding) — sociology must understand the subjective meaning actors give to their actions, not just observe their behaviour. His works include analysis of the relationship between Protestantism and capitalism ('The Protestant Ethic and the Spirit of Capitalism'), studies of bureaucracy, rationalization, and types of authority (traditional, charismatic, rational-legal). He showed how cultural and religious values shape economic and political life." },
          ].map(({ name, role, contribution }) => (
            <div key={name} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden mb-4">
              <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                <p className="font-semibold text-foreground text-sm">{name}</p>
                <p className="text-xs text-primary mt-0.5">{role}</p>
              </div>
              <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{contribution}</p>
            </div>
          ))}
          <ExampleBox><strong>Three theoretical perspectives that emerge from these founders:</strong><ul className="list-disc list-inside mt-2 space-y-1"><li><strong>Functionalism</strong> (Durkheim, Spencer): Society is like an organism. Every institution has a function that contributes to social stability. Inequality, crime, and even poverty have functions. This perspective tends to be conservative — it explains existing arrangements as functional.</li><li><strong>Conflict Theory</strong> (Marx, Weber): Society is characterised by inequality, power, and struggle. Social arrangements reflect the interests of dominant groups. This perspective is critical — it asks: who benefits from current arrangements, and who is harmed?</li><li><strong>Symbolic Interactionism</strong> (Mead, Goffman): Society is constructed through everyday face-to-face interactions and the shared meanings that people give to symbols. This micro-level perspective focuses on how individuals create and maintain social reality through interaction.</li></ul></ExampleBox>

          <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 1: Introduction to Sociology</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Sociology</strong> = scientific study of society; coined by Comte from Latin socius + Greek logos.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Key definitions:</strong> Durkheim (social facts), Weber (Verstehen/interpretive understanding), Giddens (systematic study of modern societies), Mills (sociological imagination).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Nature:</strong> empirical, theoretical, both macro and micro, both general and special, value-laden but strives for objectivity.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Related to:</strong> psychology (individual), economics (markets), political science (power), anthropology (culture), history (past).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Key founders:</strong> Comte (positivism), Spencer (social evolution), Marx (class conflict), Durkheim (social facts, anomie), Weber (Verstehen, rationalization).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Three perspectives:</strong> Functionalism, Conflict Theory, Symbolic Interactionism.</span></li>
            </ul>
          </div>
          <div className="h-16" />
        </div>
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
              <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} /></div>
            </div>
          </div>
        </aside>
      </div>
      {showScrollTop && <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90"><ArrowUp className="h-5 w-5" /></button>}
    </Layout>
  );
}
