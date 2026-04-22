import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, CheckCircle2, AlertTriangle } from "lucide-react";

const sections = [
  { id: "definitions", label: "1. Rural vs Urban — Definitions" },
  { id: "rural", label: "2. Rural Community" },
  { id: "urban", label: "3. Urban Community" },
  { id: "migration", label: "4. Rural-Urban Migration" },
  { id: "environment", label: "5. Environmental Management" },
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

export default function SocietyTopic3() {
  const [activeSection, setActiveSection] = useState("definitions");
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
    <Layout breadcrumbs={[{ label: "Unit 3", href: "/" }, { label: "Week 3: Urban & Rural Community" }]}>
      <Helmet><title>Urban & Rural Community | Study Notes</title></Helmet>
      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10"><div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} /></div>
      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 3 · Society &amp; Culture</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Urban and Rural Community</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">The distinction between rural and urban communities is one of the most important in sociology — these two environments produce profoundly different patterns of social life, economic organisation, and human experience. The movement from rural to urban areas (rural-urban migration) is one of the defining social processes of the modern world, including Kenya.</p>
          </div>

          <SectionHeading id="definitions" number="Section 1" title="Definitions of Rural and Urban Community" />
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="rounded-xl border border-border/60 bg-card/50 p-5">
              <h3 className="font-semibold text-foreground mb-3">Rural Community</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">A <strong>rural community</strong> is a settlement characterised by low population density, predominantly agricultural or pastoral economic activity, strong social ties among residents who know each other personally, and relatively limited access to urban-based infrastructure and services.</p>
              <p className="text-sm text-muted-foreground">Examples in Kenya: Villages in Kisii, Meru, West Pokot, Turkana — communities where farming, herding, or fishing are the primary livelihoods and where the social fabric is woven through kinship, clan, and long-term neighbourly relationships.</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/50 p-5">
              <h3 className="font-semibold text-foreground mb-3">Urban Community</h3>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">An <strong>urban community</strong> is a settlement characterised by high population density, diverse and specialised economic activities (commerce, industry, services), formal institutional structures, developed infrastructure, and predominantly secondary (impersonal) social relationships.</p>
              <p className="text-sm text-muted-foreground">Examples in Kenya: Nairobi, Mombasa, Kisumu, Nakuru, Eldoret — cities characterised by diverse populations, formal employment, developed roads and utilities, and complex institutional landscapes.</p>
            </div>
          </div>

          <SectionHeading id="rural" number="Section 2" title="Characteristics of Rural Communities" />
          <div className="space-y-3 mb-5">
            {[
              ["Low population density", "Rural communities have relatively few people per unit of land area. This low density means that houses are spread out, social interaction is face-to-face and personal, and community members typically know each other. In contrast to the anonymity of urban life, rural life is lived in full view of one's neighbours."],
              ["Agricultural economy", "The primary economic activity in most rural communities is agriculture (crop growing), pastoralism (animal herding), fishing, or forestry. Economic life is tied to the land and its seasonal rhythms. Most production is for subsistence (home consumption) with a surplus sold at local markets."],
              ["Strong primary relationships", "Social relationships in rural communities are typically primary — personal, face-to-face, emotionally rich, and long-lasting. People know their neighbours, their families, and their histories. Social life is embedded in networks of kinship, friendship, and long-term association. This creates strong social solidarity but can also limit individual freedom and privacy."],
              ["Homogeneity", "Rural communities tend to be more socially homogeneous — members share similar ethnic backgrounds, religions, values, occupations, and ways of life. This shared identity creates strong community cohesion but can also generate intolerance of difference and resistance to change."],
              ["Conservative values and traditions", "Rural communities tend to uphold traditional values, customs, and religious practices more strongly than urban ones. Elders hold authority; customary practices govern important life events; change is viewed with caution. This conservatism provides cultural continuity and social stability but can also obstruct positive social change."],
              ["Limited infrastructure and services", "Rural areas typically have less developed infrastructure than urban ones — fewer paved roads, less reliable electricity and water supply, fewer schools and health facilities, less access to information and communication technology. This infrastructure gap is a major driver of rural-urban migration."],
              ["Social control through community norms", "In rural communities, social control is primarily informal — exercised through community opinion, peer pressure, the authority of elders, and shame. Deviant behaviour is visible and quickly noticed. This tight social control can maintain order effectively but can also be oppressive, especially for women, young people, and minority groups."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <SectionHeading id="urban" number="Section 3" title="Characteristics of Urban Communities" />
          <div className="space-y-3 mb-5">
            {[
              ["High population density", "Urban areas concentrate large numbers of people into relatively small geographical areas. Nairobi, for example, has over 4 million people within its boundaries. This density creates economies of scale for services and infrastructure but also generates problems of congestion, pollution, and competition for resources."],
              ["Diverse and specialised economy", "Urban economies are characterised by extraordinary diversity and specialisation. Instead of most people doing the same basic agricultural work, urban dwellers perform thousands of different specialised occupations — banking, medicine, manufacturing, retail, law, entertainment, construction, teaching. This specialisation is both a product and a driver of urban economic complexity."],
              ["Secondary social relationships", "Urban social life is predominantly characterised by secondary relationships — formal, impersonal, and limited to specific roles. You interact with your bank teller, your bus driver, and your office colleague as role-bearers, not as whole persons. Urban dwellers often do not know their neighbours. This anonymity provides freedom and privacy but can also produce loneliness, alienation, and weakened social bonds."],
              ["Heterogeneity and diversity", "Cities bring together people of different ethnic groups, religions, classes, nationalities, and lifestyles. Nairobi contains communities from virtually every Kenyan ethnic group as well as significant populations of Somali, Indian, Chinese, European, and other nationalities. This diversity is a source of creativity and innovation but also potential tension and conflict."],
              ["Formal social control", "In cities, social control is primarily formal — exercised through the police, courts, local government, and regulatory agencies rather than through community norms and elder authority. Anonymity reduces the effectiveness of informal social pressure, making formal institutions more necessary."],
              ["Access to services and opportunities", "Urban areas offer greater access to education, healthcare, employment, entertainment, cultural institutions, and communication infrastructure. This concentration of opportunity is the primary pull factor for rural-urban migration — but access is very unequally distributed between wealthy and poor urban residents."],
              ["Social problems and inequality", "Urban areas concentrate both extraordinary wealth and desperate poverty. Informal settlements (slums), unemployment, crime, substance abuse, and social fragmentation are characteristic urban problems that arise when the pace of urban growth outstrips the capacity of infrastructure and institutions to absorb and serve the growing population."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <SectionHeading id="migration" number="Section 4" title="Rural-Urban Migration" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4"><strong>Rural-urban migration</strong> is the movement of people from rural areas to urban centres in search of better livelihoods and opportunities. It is one of the most significant demographic processes in Kenya and across Africa, driving rapid urbanisation and transforming both the communities people leave and those they join.</p>
          <h3 className="font-semibold text-foreground text-base mt-5 mb-3">Push Factors (reasons people leave rural areas)</h3>
          <div className="space-y-2 mb-4">
            {[
              "Poverty and low agricultural income — subsistence farming often fails to generate sufficient income to meet family needs, especially as land becomes more divided among growing families.",
              "Drought and environmental degradation — climate variability, soil erosion, deforestation, and desertification reduce agricultural productivity and increase vulnerability to food insecurity.",
              "Lack of employment opportunities — outside agriculture, there is limited formal employment in most rural areas. Young people with education cannot find work matching their qualifications.",
              "Poor social services — limited access to quality education, healthcare, clean water, electricity, and internet drives young, educated, and aspirational people to seek better-served urban environments.",
              "Social pressure and traditional restrictions — in some rural communities, traditional restrictions on women's autonomy, inheritance rights, and career choices drive women to seek greater freedom in urban areas.",
              "Insecurity — in some regions, pastoralist conflicts, land disputes, and banditry make rural life dangerous, pushing people toward the relative security of urban settlements.",
            ].map((item, i) => (
              <div key={i} className="flex gap-2 text-sm text-foreground/80 leading-relaxed p-3 rounded-lg border border-border/40 bg-card/40">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" /><span>{item}</span>
              </div>
            ))}
          </div>
          <h3 className="font-semibold text-foreground text-base mt-5 mb-3">Pull Factors (reasons people are attracted to cities)</h3>
          <div className="space-y-2 mb-4">
            {[
              "Employment opportunities — cities offer formal employment in manufacturing, commerce, services, government, and the informal sector that are unavailable in rural areas.",
              "Higher wages — urban wages are generally higher than rural incomes, even for unskilled work, making migration economically rational for most individuals.",
              "Better education — cities contain universities, polytechnics, and better-quality secondary schools that attract students and young people seeking further education.",
              "Better healthcare — major hospitals, specialists, and advanced medical facilities are concentrated in cities, attracting people with serious health conditions and those who want access to better medical care.",
              "Social freedom and anonymity — urban anonymity allows people to escape the restrictive social norms and community surveillance of rural life and to explore new identities and lifestyles.",
              "Cultural attractions — entertainment, music, sports, restaurants, and cultural events make cities appealing destinations for young people seeking stimulation and social life.",
            ].map((item, i) => (
              <div key={i} className="flex gap-2 text-sm text-foreground/80 leading-relaxed p-3 rounded-lg border border-border/40 bg-card/40">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /><span>{item}</span>
              </div>
            ))}
          </div>
          <h3 className="font-semibold text-foreground text-base mt-5 mb-3">Problems of Rural-Urban Migration</h3>
          <WarningBox>
            <strong>Migration creates problems in both origin and destination communities.</strong>
          </WarningBox>
          <div className="space-y-3 mb-5">
            {[
              ["Overcrowding and slum formation in cities", "When migrants arrive in cities faster than housing, infrastructure, and employment can absorb them, overcrowded informal settlements (slums) develop. Kibera in Nairobi — one of Africa's largest informal settlements — is home to over 250,000 people living in extremely dense, underserviced conditions. Slums lack adequate sanitation, clean water, waste management, and secure housing."],
              ["Unemployment and underemployment", "Many migrants arrive in cities with unrealistic expectations about employment opportunities. Those who cannot find formal employment may enter the informal economy as hawkers, casual labourers, domestic workers, or subsistence traders — often earning inadequate incomes in precarious conditions."],
              ["Increased urban crime", "The combination of high population density, unemployment, poverty, weakened social bonds, and the anonymity of urban life creates conditions conducive to crime. Urban crime rates — particularly property crime, robbery, and drug-related offences — are generally higher than in rural areas."],
              ["Loss of agricultural labour in rural areas", "When productive-age adults migrate to cities, rural communities lose their primary agricultural workforce. This labour shortage reduces agricultural production, may lead to the neglect of productive land, and leaves dependent populations (children, elderly) without adequate support."],
              ["Family breakdown and social problems", "Migration separates families when some members migrate and others remain behind. Long-distance relationships and the social disorientation of urban life contribute to marriage breakdown, child neglect, and the weakening of extended family support networks."],
              ["Strain on urban infrastructure", "Rapid urban growth exceeds the capacity of infrastructure to keep up. Roads become congested, water and sanitation systems are overloaded, power supplies are unreliable, and public transport is inadequate. The cost of expanding infrastructure falls on already-stretched city governments."],
              ["Spread of diseases", "High population density in informal settlements facilitates the rapid spread of communicable diseases. Cholera, tuberculosis, HIV/AIDS, and respiratory infections are disproportionately common in informal urban settlements with limited sanitation and healthcare."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          <SectionHeading id="environment" number="Section 5" title="Environmental Management and Conservation" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4"><strong>Environmental management</strong> refers to the planning and organisation of human activities to prevent, reduce, and remedy environmental damage while sustaining the natural resources on which human well-being depends. It is directly linked to both rural and urban community issues because both face distinct but interconnected environmental challenges.</p>
          <div className="space-y-3 mb-4">
            {[
              ["Rural environmental challenges", "Soil erosion from deforestation and overgrazing; land degradation from unsustainable farming practices; water pollution from agricultural chemicals; depletion of wildlife habitats; desertification in arid areas. In Kenya, the destruction of forest cover on the Mau Complex — East Africa's largest montane forest — has dramatically reduced river flows, affecting agriculture and urban water supplies across a vast area."],
              ["Urban environmental challenges", "Air pollution from industrial activity and vehicle emissions; water pollution from industrial effluent and inadequate sewage treatment; solid waste management failures (mountains of uncollected garbage); noise pollution; loss of green spaces and urban biodiversity. Nairobi River, which flows through the city, is one of the most polluted rivers in East Africa — choked with industrial waste, raw sewage, and solid rubbish."],
              ["Conservation strategies", "Conservation involves protecting natural ecosystems, biodiversity, and resources from destruction. In Kenya, this includes national parks and game reserves, community conservancies (which give local communities financial incentives for conservation), watershed protection zones, marine protected areas, and reforestation programmes. The Kenya Green Belt Movement, founded by Nobel laureate Wangari Maathai, mobilised communities — particularly women — to plant trees across Kenya as a strategy for environmental restoration and community empowerment."],
              ["Sustainable development", "The key principle is sustainable development — meeting present needs without compromising the ability of future generations to meet their needs. This requires integrating environmental considerations into economic planning: sustainable agriculture, renewable energy, green urban planning, waste reduction and recycling, and water conservation. Kenya's Vision 2030 includes environmental sustainability as a cross-cutting theme."],
            ].map(([title, detail]) => (
              <div key={String(title)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
          <ExampleBox><strong>Kenya Urban-Rural divide — key statistics:</strong> In 1963, fewer than 10% of Kenyans lived in urban areas. By 2024, approximately 30% were urban. Nairobi alone grew from a colonial railway camp of a few thousand in 1900 to a city of over 5 million. This extraordinary pace of urbanisation — driven by rural-urban migration — has outpaced infrastructure development, creating the complex challenges of informal settlements, traffic congestion, water shortages, and unemployment that characterise Nairobi today.</ExampleBox>

          <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 3</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Rural:</strong> low density, agricultural, strong primary ties, homogeneous, conservative, limited services.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Urban:</strong> high density, diverse economy, secondary ties, heterogeneous, formal control, better services.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Push factors:</strong> poverty, drought, lack of jobs, poor services, social restrictions, insecurity.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Pull factors:</strong> employment, higher wages, education, healthcare, freedom, entertainment.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Problems of migration:</strong> overcrowding/slums, unemployment, crime, family breakdown, strain on infrastructure, disease spread, loss of rural agricultural labour.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Environment:</strong> rural (deforestation, erosion) vs urban (pollution, waste). Conservation = protecting ecosystems; sustainable development = meeting needs without compromising the future.</span></li>
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
