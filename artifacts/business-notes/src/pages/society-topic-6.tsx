import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, CheckCircle2, AlertTriangle } from "lucide-react";

const sections = [
  { id: "meaning", label: "1. Meaning of Social Change" },
  { id: "characteristics", label: "2. Characteristics" },
  { id: "tradition-modernity", label: "3. Tradition, Modernity & Westernisation" },
  { id: "factors", label: "4. Factors of Social Change" },
  { id: "movements", label: "5. Social Movements" },
  { id: "themes", label: "6. Themes of Social Change" },
  { id: "consequences", label: "7. Consequences" },
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

export default function SocietyTopic6() {
  const [activeSection, setActiveSection] = useState("meaning");
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
    <Layout breadcrumbs={[{ label: "Unit 3", href: "/" }, { label: "Week 6: Social Change" }]}>
      <Helmet><title>Social Change | Study Notes</title></Helmet>
      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10"><div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} /></div>
      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 6 · Society &amp; Culture</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Social Change</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">No society stands still. Social change — the transformation of culture, social institutions, and social relationships over time — is one of the most fundamental and pervasive features of human social life. Understanding how and why societies change is essential for making sense of the world we live in and for shaping the world we want to build.</p>
          </div>

          <SectionHeading id="meaning" number="Section 1" title="Meaning of Social Change" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4"><strong>Social change</strong> refers to significant alterations over time in behaviour patterns, cultural values, norms, and social structures. It encompasses changes in the way people live, work, relate to each other, govern themselves, and understand the world. Social change is not just surface-level fashion shifts — it includes deep transformations in social institutions (family, economy, religion, government) and in the fundamental organisation of social life.</p>
          <div className="space-y-3 mb-5">
            {[
              { scholar: "Kingsley Davis", def: "Social change refers only to such alterations as occur in social organisation — that is, the structure and functions of society." },
              { scholar: "MacIver and Page", def: "Social change refers to a process responsive to many types of changes: to changes in the man-made conditions of life; to changes in the attitudes and beliefs of men; and to changes that go beyond the human control to bring about other changes." },
              { scholar: "Gillin and Gillin", def: "Social change is a variation from the mores, folkways, sanctions, and social organisation which have been adopted by a society." },
            ].map(({ scholar, def }) => (
              <div key={scholar} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-2 border-b border-border/30 bg-muted/30"><p className="font-semibold text-foreground text-sm">{scholar}</p></div>
                <p className="px-5 py-3 text-sm text-foreground/80 leading-relaxed italic">"{def}"</p>
              </div>
            ))}
          </div>

          <SectionHeading id="characteristics" number="Section 2" title="Characteristics of Social Change" />
          <div className="space-y-3 mb-5">
            {[
              ["Social change is universal", "Change is found in every society at every period of history. No society is entirely static. Even the most traditional societies are changing, though the pace may be slow and the changes may be difficult to perceive within a single lifetime."],
              ["Social change is continuous", "Change is a permanent and ongoing feature of social life. There is no point at which a society stops changing and becomes permanently fixed. Even periods that appear stable are characterised by slow, incremental changes that accumulate into major transformations over time."],
              ["Social change is unpredictable", "The direction, pace, and consequences of social change are notoriously difficult to predict. Technological innovations have unintended social consequences; social movements produce unexpected outcomes; economic crises transform political systems in ways that cannot be forecast. This unpredictability is a central challenge for social planning."],
              ["Social change produces a chain reaction", "Changes in one part of the social system produce changes in other parts. The introduction of the mobile phone, for example, transformed not just communication but also commerce, banking, politics, family relationships, and personal identity. Changes ripple through the social system in complex, interconnected ways."],
              ["Social change varies in speed", "Some changes are rapid and dramatic (revolutions, natural disasters, pandemics); others are slow and gradual (changes in family structures, shifting religious beliefs, demographic transitions). The pace of social change has generally accelerated in the modern era due to technological innovation and globalisation."],
              ["Social change can be planned or unplanned", "Some change is deliberately engineered through policy, legislation, education, and social movements. Other change is unplanned — the unintended consequence of other processes (e.g., industrialisation produced urbanisation as an unintended side effect)."],
              ["Social change is not inherently progressive", "Change can be positive or negative. Not all social change represents progress — some changes worsen inequality, damage the environment, or erode social cohesion. Evaluating the direction and consequences of change requires careful analysis."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <SectionHeading id="tradition-modernity" number="Section 3" title="Traditional Society, Modernity, and Westernisation" />
          <div className="space-y-4 mb-5">
            <div className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
              <div className="px-5 py-3 border-b border-border/30 bg-muted/30"><p className="font-semibold text-foreground">Traditional Society</p></div>
              <div className="px-5 py-4 text-sm text-foreground/80 leading-relaxed space-y-2">
                <p>Traditional societies are characterised by <strong>continuity with the past</strong>. They are organised around inherited customs, kinship systems, religious authority, and agricultural or pastoral livelihoods. Social status is primarily ascribed (inherited) rather than achieved. Social change is slow and viewed with suspicion. Knowledge is transmitted orally through elders. Authority rests with chiefs, elders, and religious leaders.</p>
                <p><strong>Kenyan example:</strong> Pre-colonial Maasai society — organised around age-grade systems, cattle herding, and the authority of elders (council of laibons). Roles were clearly defined by age and gender; social life was governed by rich oral tradition and customary law.</p>
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
              <div className="px-5 py-3 border-b border-border/30 bg-muted/30"><p className="font-semibold text-foreground">Modernity</p></div>
              <div className="px-5 py-4 text-sm text-foreground/80 leading-relaxed space-y-2">
                <p>Modernity refers to the set of social, economic, and cultural features associated with post-18th century industrial society. Key features include: urbanisation, industrialisation, scientific rationality, democratic governance, individualism, secularisation (declining religious authority), formal education, bureaucratic organisation, and belief in progress and human capacity to improve the world through reason and science.</p>
                <p>Modernity brought unprecedented improvements in living standards, health, education, and individual freedom — but also new forms of alienation, inequality, environmental destruction, and existential uncertainty (the "disenchantment of the world" — Weber).</p>
                <p><strong>Kenyan example:</strong> Post-independence Kenya — formal education system, national government bureaucracy, market economy, democratic elections, urbanisation, formal health system — all features of a modernising society.</p>
              </div>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
              <div className="px-5 py-3 border-b border-border/30 bg-muted/30"><p className="font-semibold text-foreground">Westernisation</p></div>
              <div className="px-5 py-4 text-sm text-foreground/80 leading-relaxed space-y-2">
                <p>Westernisation refers to the adoption of Western (European/North American) cultural practices, values, institutions, and lifestyles by non-Western societies. It is related to but distinct from modernisation: one can modernise (develop economically and institutionally) without becoming Western, but in practice the two processes have often been entangled because European colonialism exported both modernisation and Western cultural forms simultaneously.</p>
                <p>Westernisation in Africa has produced complex outcomes: the adoption of European languages (English, French), educational systems, legal structures, Christian religion, and consumer lifestyles alongside the survival and adaptation of African cultural traditions. The result is hybrid cultures — neither fully traditional nor fully Western.</p>
                <p><strong>Critical note:</strong> Many African scholars (e.g., Chinua Achebe, Ngugi wa Thiong'o) have critiqued westernisation as a form of cultural imperialism that marginalises African knowledge systems, languages, and values. They argue that Africa can and should modernise on its own terms, building on its own cultural strengths.</p>
              </div>
            </div>
          </div>

          <SectionHeading id="factors" number="Section 4" title="Factors Contributing to Social Change" />
          <div className="space-y-3 mb-5">
            {[
              ["Technology", "Technological innovation is one of the most powerful drivers of social change. The printing press transformed religion and education; the steam engine drove industrialisation; the internet transformed commerce, communication, and politics. In Kenya, mobile money (M-Pesa) revolutionised banking and transformed the livelihoods of millions — a technological innovation with profound social consequences."],
              ["Education", "Education equips individuals with new knowledge, skills, and values, enabling them to challenge traditional norms and adopt new ways of life. Mass education drives social mobility, changes gender norms (as women gain educational parity with men), spreads new ideas, and produces the human capital needed for economic development."],
              ["Population change", "Demographic shifts — changes in birth rates, death rates, migration patterns, and age structures — drive social change. Kenya's high youth population (over 70% under 35) creates political pressure for jobs, education reform, and democratic accountability that is reshaping the country's politics."],
              ["Economy", "Economic change — shifts in production systems, trade patterns, employment structures, and income distribution — drives social transformation. The shift from agricultural to industrial economies fundamentally transformed family structures, gender roles, urban-rural dynamics, and political systems across the world."],
              ["Religion", "Religious movements can drive social change — the Protestant Reformation reshaped European political and economic organisation (Weber); the Islamic Revolution transformed Iran; African Pentecostalism is transforming social norms around wealth, gender, and political participation across the continent."],
              ["Natural environment", "Natural events — droughts, floods, earthquakes, pandemics, climate change — force social adaptation. COVID-19 triggered dramatic changes in work practices (remote work), social interaction patterns (social distancing), healthcare systems, and government roles in the economy. Climate change is driving migration, conflict, and economic disruption that will reshape societies globally."],
              ["War and conflict", "Wars and violent conflicts are among the most dramatic agents of social change. They destroy existing social structures, redistribute power and resources, force technological innovation, produce massive refugee flows, and often trigger political revolutions. The First and Second World Wars transformed European societies fundamentally, as did Kenya's colonial wars and post-independence conflicts."],
              ["Social movements and collective action", "Organised social movements — civil rights movements, women's movements, environmental movements, trade union movements, pro-democracy movements — have been among the most effective agents of planned social change in history. They demonstrate that ordinary people, organised collectively, can change laws, institutions, and social norms."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <SectionHeading id="movements" number="Section 5" title="Social Movements" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">A <strong>social movement</strong> is a collective, organised effort by a large number of people to bring about (or resist) social change. Social movements are different from political parties (which seek state power) and interest groups (which seek policy influence through lobbying): they operate primarily outside formal political channels through public protest, awareness campaigns, mass mobilisation, and civil disobedience.</p>
          <div className="grid md:grid-cols-2 gap-3 mb-5">
            {[
              ["Reform movements", "Seek to change specific aspects of existing society without fundamentally transforming its structure. They work within the system to improve it. Example: the women's suffrage movement sought to extend voting rights to women without overturning capitalism or democracy."],
              ["Revolutionary movements", "Seek the complete transformation of the existing social order. They challenge the fundamental structure of society — its property relations, political system, or cultural framework. Example: the Mau Mau uprising against British colonial rule in Kenya sought to end colonialism and restore African land rights — a revolutionary challenge to the colonial order."],
              ["Resistance movements", "Seek to prevent or reverse social change — to protect existing arrangements from perceived threats. Example: conservative religious movements opposing same-sex marriage legislation are resistance movements seeking to prevent a specific social change."],
              ["Alternative movements", "Seek to change specific behaviours or lifestyle choices of individuals rather than transforming social structures. Example: temperance movements seeking to reduce alcohol consumption; environmental movements promoting sustainable personal consumption."],
            ].map(([type, desc]) => (
              <div key={String(type)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{type}</p>
                <p className="text-sm text-muted-foreground leading-relaxed text-xs">{desc}</p>
              </div>
            ))}
          </div>
          <ExampleBox><strong>Kenya's 2024 Gen-Z protests — a contemporary social movement:</strong> In June 2024, Kenyan youth — organised primarily through social media — mounted the most significant popular protest movement in Kenya's post-independence history. Sparked by opposition to proposed tax increases in the Finance Bill, the protests brought tens of thousands onto the streets, stormed Parliament, and ultimately forced President Ruto to withdraw the bill. The movement exemplified modern social movement dynamics: decentralised leadership, social media organisation, cross-ethnic participation, and creative forms of civil disobedience — achieving significant policy change within weeks.</ExampleBox>

          <SectionHeading id="themes" number="Section 6" title="Themes of Social Change" />
          <div className="space-y-3 mb-5">
            {[
              ["Globalisation", "The increasing interconnectedness of the world through trade, communication, migration, and cultural exchange. Globalisation accelerates the spread of ideas, technologies, products, and cultural practices across national boundaries, transforming local cultures and creating new global inequalities. For Kenya, globalisation brings both opportunities (access to global markets, information, and capital) and challenges (cultural homogenisation, economic dependency, vulnerability to external shocks)."],
              ["Modernisation", "The process through which societies adopt the institutional and cultural features of modern industrial society — urbanisation, formal education, democratic governance, rational-scientific worldview, and economic development. Modernisation theory (Rostow, Parsons) argued that all societies move through the same stages of development toward the Western model. This view is now widely criticised for ignoring the diverse paths of development and the role of colonial exploitation in shaping global inequality."],
              ["Democratisation", "The spread of democratic norms, institutions, and practices — free elections, civil liberties, rule of law, independent judiciary, and active civil society. Africa has undergone significant democratisation since the 1990s, including Kenya, though democratic gains are fragile and reversible."],
              ["Secularisation", "The declining role of religious authority in public life as scientific rationality, formal law, and secular education expand. While significant in Europe, secularisation is less evident in Africa — Kenya remains a deeply religious society in which faith continues to shape public life, politics, and personal identity."],
              ["Gender transformation", "The fundamental restructuring of gender relations — expanding women's rights, economic participation, educational attainment, and political representation. This transformation is driven by feminist movements, education, legislation, and economic change, but is contested and uneven, particularly in more traditional communities."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <SectionHeading id="consequences" number="Section 7" title="Consequences of Social Change" />
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-3 text-green-700 dark:text-green-400">Positive Consequences</h3>
              <div className="space-y-2">
                {[
                  ["Economic development", "Industrialisation, technological innovation, and market integration have dramatically raised living standards, reduced poverty, and extended human lifespans across the world."],
                  ["Greater equality and justice", "Civil rights movements, feminist movements, and anti-colonial struggles have reduced formal discrimination and extended rights to previously excluded groups."],
                  ["Medical and scientific advances", "Social changes enabling investment in research, education, and public health have produced vaccines, antibiotics, surgical techniques, and public health measures that have transformed human health."],
                  ["Greater individual freedom", "The decline of traditional authority, the rise of individual rights, and the diversification of social roles have expanded the range of life choices available to individuals."],
                ].map(([t, d]) => <div key={String(t)} className="rounded-lg border border-green-200/40 bg-green-50/30 dark:bg-green-900/10 p-3"><p className="font-semibold text-sm text-foreground mb-1">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div>)}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-3 text-red-600 dark:text-red-400">Negative Consequences</h3>
              <div className="space-y-2">
                {[
                  ["Anomie and social disintegration", "Rapid change destroys established norms before new ones are established, creating anomie — normlessness, social disorientation, and loss of community bonds. Durkheim linked anomie to suicide, crime, and mental illness."],
                  ["Cultural loss and identity crisis", "The destruction of traditional cultures through colonialism, westernisation, and rapid modernisation has caused the loss of languages, knowledge systems, and cultural practices accumulated over millennia."],
                  ["Increased inequality", "Economic globalisation has produced extraordinary wealth alongside extreme poverty. The benefits of technological change accrue disproportionately to those with capital and skills, exacerbating inequality within and between nations."],
                  ["Environmental destruction", "Industrialisation, urbanisation, and intensive agriculture have produced climate change, biodiversity loss, deforestation, soil degradation, and water pollution on a planetary scale."],
                ].map(([t, d]) => <div key={String(t)} className="rounded-lg border border-red-200/40 bg-red-50/30 dark:bg-red-900/10 p-3"><p className="font-semibold text-sm text-foreground mb-1">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div>)}
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 6: Social Change</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Social change</strong> = significant alteration in behaviour patterns, cultural values, norms, and social structures over time.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Characteristics:</strong> universal, continuous, unpredictable, chain reaction, varies in speed, planned or unplanned, not inherently progressive.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Traditional vs. Modern vs. Western:</strong> traditional = continuity with past; modernity = industrial/scientific/democratic; westernisation = adoption of Western cultural forms (critiqued as cultural imperialism).</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Key factors:</strong> technology, education, population change, economy, religion, environment, war, social movements.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Social movements:</strong> reform, revolutionary, resistance, alternative.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Consequences:</strong> positive (development, equality, freedom) and negative (anomie, cultural loss, inequality, environmental destruction).</span></li>
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
