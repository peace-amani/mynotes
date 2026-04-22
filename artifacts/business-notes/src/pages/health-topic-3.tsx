import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, CheckCircle2, AlertTriangle } from "lucide-react";

const sections = [
  { id: "definitions",    label: "1. Definitions" },
  { id: "sanitation",     label: "2. Types of Sanitation" },
  { id: "epidemiology",   label: "3. Epidemiology" },
  { id: "transmission",   label: "4. Disease Transmission" },
  { id: "agents",         label: "5. Disease-Causing Agents" },
  { id: "modes",          label: "6. Modes of Transmission" },
  { id: "foodwater",      label: "7. Food & Waterborne Diseases" },
  { id: "diseases",       label: "8. Diseases from Poor Hygiene" },
  { id: "prevention",     label: "9. Prevention & Control" },
  { id: "medical",        label: "10. Medical Hygiene" },
  { id: "respiratory",    label: "11. Respiratory Hygiene" },
  { id: "foodhygiene",    label: "12. Food Hygiene" },
  { id: "water",          label: "13. Water Treatment & Storage" },
  { id: "handwashing",    label: "14. Hand Washing" },
  { id: "personal",       label: "15. Personal Hygiene" },
  { id: "sharing",        label: "16. Don't Share Personal Items" },
  { id: "wash",           label: "17. WASH & SDG 6" },
  { id: "environment",    label: "18. Environmental Health & Waste" },
  { id: "summary",        label: "19. Summary" },
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

export default function HealthTopic3() {
  const [activeSection, setActiveSection] = useState("definitions");
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
    <Layout breadcrumbs={[{ label: "Unit 4", href: "/" }, { label: "Hygiene, Sanitation & Safety" }]}>
      <Helmet>
        <title>Hygiene, Sanitation & Safety | Health Study Notes</title>
        <meta name="description" content="Comprehensive notes on Hygiene, Sanitation and Safety — definitions, types of sanitation, epidemiology, modes of disease transmission, food and waterborne diseases, hand washing, personal hygiene, water treatment, and environmental health." />
      </Helmet>

      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Unit 4 · Health Sciences</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Hygiene, Sanitation &amp; Safety</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Poor hygiene and inadequate sanitation are among the most persistent and preventable causes of illness and death worldwide, and Kenya is no exception. These notes cover the foundational definitions, the science of how diseases spread (epidemiology and modes of transmission), the specific diseases linked to poor hygiene, and the full range of practices — from hand washing to sewage treatment — that protect individual and community health. Alongside each concept is an explanation of <em>why</em> it matters and how it applies in the Kenyan context.
            </p>
          </div>

          {/* ─── SECTION 1 ─── */}
          <SectionHeading id="definitions" number="Section 1" title="Definitions — Hygiene and Sanitation" />

          <h3 className="text-lg font-semibold text-foreground mb-3">What is Hygiene?</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Hygiene</strong> refers to the set of practices associated with the <strong>preservation of health and healthy living</strong>. It is a concept related to medicine as well as to personal and professional care practices related to most aspects of daily life. While hygiene is most commonly associated with cleanliness, its scope is much broader — it includes any practice whose purpose is to prevent disease, maintain bodily health, and create conditions conducive to well-being.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The word "hygiene" itself comes from <em>Hygieia</em>, the Greek goddess of health, cleanliness, and sanitation. <strong>Hygienics</strong> (or Hygiene as a science) is the formal discipline that deals with the promotion and preservation of health — studying the conditions and practices that prevent disease and maintain well-being at the individual, household, community, and institutional level.
          </p>
          <div className="space-y-3 mb-5">
            {[
              { d: "Personal hygiene", detail: "Acts that directly maintain individual cleanliness and health — frequent hand washing, face washing, bathing with soap and clean water, dental care, nail hygiene, and clothing cleanliness. These are among the simplest and most effective disease-prevention tools available." },
              { d: "Environmental hygiene", detail: "The broader set of conditions in the physical environment that affect health — clean air, uncontaminated water, safe food, proper waste disposal, and control of disease vectors such as mosquitoes and flies." },
              { d: "Professional/Medical hygiene", detail: "Standards of cleanliness and sterilisation in healthcare settings, food production facilities, and other professional environments where contamination risks are high." },
            ].map(({ d, detail }) => (
              <div key={d} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-sm">{d}</p>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>
          <NoteBox>
            <strong>Important note:</strong> Practising personal hygiene in many parts of the world is difficult due to lack of clean water and soap. In Kenya, approximately 41% of the rural population lacks access to basic hygiene facilities (UNICEF/WHO 2021). This means hygiene education must always be paired with action to improve access — telling people to wash hands when they have no water is ineffective and disrespectful. This is why the Kenyan government integrates WASH (Water, Sanitation and Hygiene) infrastructure with hygiene behaviour change campaigns.
          </NoteBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">What is Sanitation?</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Sanitation</strong> is a hygienic means of promoting health through the <strong>prevention of human contact with the hazards of wastes</strong>. It addresses the management, treatment, and safe disposal of waste materials that could otherwise contaminate the environment and cause disease.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The wastes that pose health hazards include:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-base text-foreground/80 mb-4">
            <li><strong>Human and animal faeces</strong> — the most critical waste category for disease transmission (source of bacteria, viruses, and parasites)</li>
            <li><strong>Solid wastes</strong> — household refuse, packaging, food waste, hazardous materials</li>
            <li><strong>Domestic wastewater</strong> — sewage (from toilets) and grey water (from kitchens, laundry, and bathing)</li>
            <li><strong>Industrial waste</strong> — chemicals, heavy metals, biological waste from manufacturing</li>
            <li><strong>Agricultural wastes</strong> — pesticide runoff, animal waste from farms, fertiliser leaching into water supplies</li>
          </ul>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Prevention of contact with these hazards can be achieved through three levels of intervention:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-base text-foreground/80 mb-4">
            <li><strong>Engineering solutions</strong> — sewerage networks, wastewater treatment plants, piped water systems</li>
            <li><strong>Simple technologies</strong> — pit latrines, septic tanks, ventilated improved pit (VIP) latrines, tippy taps</li>
            <li><strong>Personal hygiene practices</strong> — hand washing with soap after defecation and before eating</li>
          </ul>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The WHO also defines sanitation as a group of methods to <strong>collect human excreta and urine as well as community wastewater in a hygienic way, where human and community health is not altered</strong>. The goal is to decrease the spread of disease through proper water and excreta management, safe food handling, and reducing the causes and opportunities for disease transmission.
          </p>
          <ExampleBox>
            <strong>Kenyan context:</strong> According to the KDHS (Kenya Demographic and Health Survey), about 47% of Kenyans use improved sanitation facilities, but open defecation still occurs in some rural and informal urban areas. Kibera in Nairobi — one of Africa's largest urban informal settlements — is notorious for "flying toilets" (defecating into plastic bags and throwing them away) due to inadequate sanitation infrastructure. This creates catastrophic conditions for cholera, typhoid, and diarrhoeal disease transmission.
          </ExampleBox>

          {/* ─── SECTION 2 ─── */}
          <SectionHeading id="sanitation" number="Section 2" title="Types of Sanitation" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Sanitation is not a single system — it encompasses multiple overlapping approaches, each targeting different aspects of waste management and health protection:
          </p>
          <div className="space-y-3 mb-5">
            {[
              { t: "Basic Sanitation", d: "The management of human faeces at the household level. The minimum acceptable standard — every household should have access to a hygienic toilet or latrine that prevents faeces from contaminating the surrounding environment. In Kenya, the Basic Sanitation target under the SDGs is that everyone should use at least a basic sanitation service (an improved facility not shared with other households) by 2030." },
              { t: "On-site Sanitation", d: "Collection and treatment of waste at the point where it is deposited — typically where there is no sewerage network. Examples include pit latrines (faeces collected in a lined or unlined pit), septic tanks (underground chambers where solid waste settles and liquid waste flows to a drain field), and pour flush latrines. On-site sanitation is the most common form used in rural Kenya and urban areas without sewerage." },
              { t: "Food Sanitation", d: "Measures specifically aimed at ensuring food safety — preventing contamination of food during production, processing, storage, and preparation. This includes safe water for washing food and cooking, proper refrigeration, clean utensils and surfaces, food handler hygiene, and pest control. Food sanitation failures cause food poisoning (salmonella, E. coli, listeria) which kills thousands of Kenyans annually — often misattributed to other causes." },
              { t: "Environmental Sanitation", d: "Control of environmental factors that form links in disease transmission — including solid waste management, water and wastewater management, industrial waste disposal, noise control, and management of various forms of pollution. Environmental sanitation addresses the conditions that allow disease vectors (mosquitoes, flies, rats) to breed and pathogens to persist in the environment." },
              { t: "Ecological Sanitation (EcoSan)", d: "An innovative approach that tries to imitate nature through the recycling of nutrients and water from human and animal wastes in a hygienically safe manner. Rather than treating excreta purely as waste to be disposed of, EcoSan treats it as a resource — composting human waste into safe fertiliser (after adequate treatment time to eliminate pathogens) that can return nutrients to agricultural soils. This is particularly relevant in Kenya's agriculture-dependent rural communities where chemical fertiliser costs are high." },
            ].map(({ t, d }) => (
              <div key={t} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-sm">{t}</p>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* ─── SECTION 3 ─── */}
          <SectionHeading id="epidemiology" number="Section 3" title="Epidemiology" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Epidemiology</strong> is the study of the <strong>frequency and distribution of diseases</strong> and the factors — called <strong>determinants</strong> or <strong>risk factors</strong> — that contribute to the spread of diseases in a population. It is the foundational science of public health: understanding where disease is occurring, how often, who it affects, and why it is spreading is essential for designing effective responses.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Three key factors determine how a disease spreads in a population:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-base text-foreground/80 mb-5">
            <li><strong>Virulence of the pathogen</strong> — how powerful the disease-causing organism is; how easily it invades cells, how much tissue damage it causes, and how quickly it reproduces</li>
            <li><strong>Susceptibility of the population</strong> — how vulnerable people are; determined by immunity levels, age, nutritional status, presence of other diseases, and access to healthcare</li>
            <li><strong>Mode of transmission</strong> — how the pathogen moves from one infected person to others</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Four Epidemiological Patterns of Disease Distribution</h3>
          <div className="space-y-3 mb-5">
            {[
              { t: "Endemic", badge: "ONGOING", col: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400", d: "Refers to the constant presence and/or usual prevalence of a disease or infectious agent within a geographic area. An endemic disease is 'always there' at a predictable baseline level. Example: Malaria is endemic in Kenya's lakeside, coastal, and forested regions — it is always present in those areas at expected levels. HIV/AIDS is also endemic in sub-Saharan Africa. When a disease is endemic, the community has adapted to its presence, though this does not mean it is accepted as inevitable." },
              { t: "Epidemic", badge: "OUTBREAK", col: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400", d: "Refers to more than the normal (expected) number of cases of a disease in a community or area within a particular period. Epidemics involve diseases with short incubation periods that can be transmitted easily — for example, through contaminated drinking water. When hygiene breaks down — especially following floods, droughts, or displacement — cholera epidemics erupt rapidly. Kenya has experienced several cholera epidemics, particularly in Nairobi's informal settlements and in refugee camps like Kakuma." },
              { t: "Pandemic", badge: "GLOBAL", col: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400", d: "Refers to an epidemic that has spread over several countries or continents, usually affecting a large number of people. The most recent and vivid example is COVID-19 (SARS-CoV-2), which became a pandemic in March 2020. HIV/AIDS, which has affected every country in the world and killed over 40 million people since the 1980s, is also classified as a pandemic. The word 'pandemic' comes from Greek: pan (all) + demos (people)." },
              { t: "Sporadic", badge: "IRREGULAR", col: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400", d: "Refers to a disease that occurs infrequently and irregularly — without a predictable pattern, not consistently present in the population, and not explosively spreading. Example: Rabies in Kenya occurs sporadically — individual cases appear unpredictably, usually linked to animal bites, rather than sustained human-to-human transmission. Ebola outbreaks in East Africa (e.g., Uganda's occasional outbreaks) have been sporadic — appearing irregularly without becoming endemic." },
            ].map(({ t, badge, col, d }) => (
              <div key={t} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30 flex items-center justify-between">
                  <p className="font-semibold text-foreground text-sm">{t}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${col}`}>{badge}</span>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <ExplainerBox>
            <strong>Why epidemics are particularly dangerous:</strong> Epidemics are most serious when hygiene is not observed, because diseases transmitted via contaminated water, food, or faecal-oral routes can spread explosively in a short time. During the 2015 cholera epidemic that hit Nakuru, Nairobi, and other Kenyan counties, over 11,000 cases were recorded in a single year — all driven by a bacterium (Vibrio cholerae) that spreads almost exclusively through contaminated water and food when sanitation breaks down.
          </ExplainerBox>

          {/* ─── SECTION 4 ─── */}
          <SectionHeading id="transmission" number="Section 4" title="Transmission of Diseases" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Disease transmission</strong> is the process of a pathogen (disease-causing organism) leaving one host and infecting a new host. For transmission to be complete, two factors are always crucial:
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-5">
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <p className="font-semibold text-foreground text-sm mb-2">Source of disease</p>
              <p className="text-xs text-muted-foreground leading-relaxed">The reservoir — the person, animal, surface, water, food, or soil that is carrying and releasing the pathogen. For many diseases, the source is an infected person shedding the pathogen in their faeces, respiratory droplets, skin, blood, or other body fluids. For others (like malaria), the source is an infected animal or vector.</p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card/50 p-4">
              <p className="font-semibold text-foreground text-sm mb-2">Target (susceptible) population</p>
              <p className="text-xs text-muted-foreground leading-relaxed">A person or group that lacks immunity to the pathogen and is exposed to it in sufficient quantity (the infectious dose) via a route that allows infection. Without a susceptible target, transmission does not result in disease — this is the logic behind herd immunity through vaccination.</p>
            </div>
          </div>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Understanding transmission is the foundation of <strong>breaking the chain of infection</strong> — if you can interrupt the transfer of the pathogen from source to target at any point, you prevent disease. Hygiene and sanitation are the most powerful tools for breaking this chain.
          </p>

          {/* ─── SECTION 5 ─── */}
          <SectionHeading id="agents" number="Section 5" title="Disease-Causing Agents (Pathogens)" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The following are the major categories of disease-causing organisms. Understanding what type of pathogen causes a disease helps determine the appropriate treatment and prevention approach.
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-5">
            {[
              ["Bacteria", "Single-celled organisms that can reproduce on their own. Cause diseases like cholera (Vibrio cholerae), typhoid (Salmonella typhi), TB (Mycobacterium tuberculosis), and pneumonia (Streptococcus pneumoniae). Most bacterial diseases can be treated with antibiotics — though antibiotic resistance is a growing crisis. Bacteria are killed by boiling, chlorination, proper cooking, and hand washing."],
              ["Viruses", "Tiny particles that can only reproduce inside living host cells. Cause diseases like HIV/AIDS, COVID-19, influenza, hepatitis B and C, rotavirus diarrhoea, polio, and measles. Viruses cannot be treated with antibiotics — antiviral drugs exist for some (HIV, hepatitis B, influenza) but not all. Vaccines are the most powerful tool against many viral diseases."],
              ["Parasites", "Organisms that live on or in a host and benefit at the host's expense. Include protozoa (single-celled: Plasmodium causing malaria; Entamoeba causing amoebic dysentery; Giardia) and helminths (worms: roundworm/Ascaris, hookworm, tapeworm, schistosome). Very common in Kenya — intestinal worm burden significantly reduces children's growth, cognition, and school performance."],
              ["Fungi", "Complex organisms including yeasts and moulds. Cause superficial infections (ringworm, athlete's foot, candidiasis/thrush) and in immunocompromised persons, severe deep infections (cryptococcal meningitis, Pneumocystis pneumonia). Aflatoxins produced by Aspergillus fungi growing on maize and groundnuts are a major cancer (liver) risk in Kenya."],
              ["Chlamydia", "Bacteria-like organisms that must live inside host cells to reproduce. Chlamydia trachomatis causes the sexually transmitted infection chlamydia (a leading cause of pelvic inflammatory disease and infertility in Kenya) and also causes trachoma — the infectious eye disease that is the world's leading preventable cause of blindness."],
              ["Rickettsia", "Parasitic bacteria transmitted by arthropod vectors (ticks, mites, lice, fleas). Cause diseases including typhus (epidemic louse-borne typhus — Rickettsia prowazekii) and spotted fever (tick-borne). Rickettsial diseases are more common in areas with poor hygiene, overcrowding, and vector infestation — conditions found in conflict zones and refugee camps."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* ─── SECTION 6 ─── */}
          <SectionHeading id="modes" number="Section 6" title="Modes of Disease Transmission" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Pathogens enter the body through specific routes. Understanding these routes is essential for designing the right preventive measure — because you block transmission by targeting the specific route the pathogen uses.
          </p>
          <div className="space-y-3 mb-6">
            {[
              {
                mode: "1. Ingestion — Faecal-Oral Route",
                d: "In communities where facilities for safe disposal of faeces are inadequate, the majority of diarrhoeal disease originates from infected faeces. Infectious agents travel from faeces → hands → mouth. This can happen directly (unwashed hands touching the mouth or food) or indirectly via contaminated surfaces (toilet handles, door knobs, money, shared utensils), contaminated water, or contaminated food. This is the route for cholera, typhoid, dysentery, hepatitis A, rotavirus, polio, and intestinal worms. The single most impactful intervention is hand washing with soap after using the toilet and before eating.",
              },
              {
                mode: "2. Inhalation — Respiratory Route",
                d: "Respiratory tract infections such as colds, flu, COVID-19, TB, and whooping cough result from inhaling infected mucous droplets expelled when an infected person coughs, sneezes, talks, or breathes. Some pathogens (like SARS-CoV-2) spread via tiny aerosol particles that remain suspended in the air for extended periods. Hand-to-face transfer is also important — rubbing the nasal mucosa or eye with contaminated hands after touching infected surfaces introduces pathogens directly onto mucous membranes. Good respiratory hygiene (covering coughs, disposing of tissues, washing hands) dramatically reduces transmission.",
              },
              {
                mode: "3. Penetration — Skin or Mucosal Breach",
                d: "Some pathogens enter through cuts, wounds, mucous membranes, or needlestick injuries. HIV, hepatitis B and C, tetanus, and rabies are transmitted this way. Schistosoma parasites (bilharzia) actively penetrate intact skin of people wading or swimming in contaminated freshwater — a significant risk in Lake Victoria communities in western Kenya. Hookworm larvae penetrate bare feet that contact contaminated soil, which is why wearing shoes is an important hygiene measure.",
              },
              {
                mode: "4. Conjunctiva — Eye Route",
                d: "Some pathogens can enter directly through the eye's mucous membrane. Trachoma (caused by Chlamydia trachomatis) is a classic example — the bacteria spread from eye discharge on hands and then from hands to another person's eye, or via flies that land on eye secretions. Regular face washing breaks this cycle and is the primary prevention for trachoma. Other eye-transmitted infections include adenoviral conjunctivitis ('pink eye') and gonococcal eye infection in newborns.",
              },
              {
                mode: "5. Urogenital Route",
                d: "Pathogens transmitted through sexual contact or urinary tract exposure. Sexually transmitted infections (STIs) including HIV, gonorrhoea, syphilis, chlamydia, and HPV use this route. Schistosoma haematobium (urogenital schistosomiasis) damages the urinary tract and bladder, increasing HIV susceptibility. Urogenital transmission is reduced through condom use, partner reduction, treatment of STIs, and genital hygiene.",
              },
              {
                mode: "6. Vector-Borne Transmission",
                d: "Pathogens transmitted by vectors — insects or other organisms that carry the pathogen from one host to another. The most important vector in Kenya is the female Anopheles mosquito (malaria). Other vectors include: Aedes mosquitoes (dengue, yellow fever, Zika — increasingly relevant as climate change expands their range in Kenya); tsetse flies (sleeping sickness, present in some Kenyan wildlife areas); ticks (Rickettsia spotted fever, Crimean-Congo haemorrhagic fever); and sandflies (leishmaniasis, present in arid northern Kenya). Vector control — through nets, spraying, draining breeding sites, and protective clothing — is essential.",
              },
            ].map(({ mode, d }) => (
              <div key={mode} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-sm">{mode}</p>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <NoteBox>
            <strong>Intestinal helminths and children:</strong> For intestinal worms (helminths like Ascaris and hookworm), hands and human faeces are the major transmission routes. Worm infections do not necessarily cause death, but they contribute significantly to <strong>morbidity</strong> (illness and impaired function) — particularly in children under 15. Chronic worm burden causes malnutrition, anaemia (hookworm sucks blood from the intestinal wall), cognitive impairment, and growth stunting. Kenya's national school-based deworming programme (treating all school-age children twice a year with albendazole) targets this burden directly.
          </NoteBox>

          {/* ─── SECTION 7 ─── */}
          <SectionHeading id="foodwater" number="Section 7" title="Food and Waterborne Diseases" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Food and waterborne diseases</strong> are caused by eating contaminated food or drinking impure water. There are more than <strong>250 kinds</strong> of food and waterborne diseases known — the majority are infections caused by bacteria, viruses, or parasites, though some are caused by toxic chemicals or harmful substances (like aflatoxins or pesticide residues).
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-5">How They Present</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Because the microbe or toxin usually enters the body through the gastrointestinal tract, the first and most common symptoms of food or waterborne disease are:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-base text-foreground/80 mb-4">
            <li><strong>Nausea</strong> — the body's signal that the stomach is irritated or the toxin has triggered the vomiting reflex</li>
            <li><strong>Vomiting</strong> — a protective mechanism to expel the pathogen or toxin before more is absorbed</li>
            <li><strong>Abdominal cramps</strong> — caused by intestinal inflammation and accelerated gut motility as the body tries to flush out the pathogen</li>
            <li><strong>Diarrhoea</strong> — the defining and most dangerous symptom; fluid is secreted into or drawn into the gut in response to infection, and if this continues, the person loses water and salts (electrolytes) faster than they can be replaced, causing dehydration</li>
          </ul>
          <WarnBox>
            <strong>Dehydration is the main killer:</strong> The usual cause of death in diarrhoeal illness — especially in young children — is dehydration, not the pathogen itself. A child can die within hours of the onset of severe cholera if not given fluid replacement. Oral Rehydration Solution (ORS) — a simple mixture of water, sugar, and salt — has saved tens of millions of lives worldwide and is the first-line treatment for diarrhoeal dehydration. Sachets are available at any Kenyan chemist for a few shillings, and the formula can be made at home.
          </WarnBox>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Globally, <strong>88% of diarrhoeal cases</strong> are attributable to unsafe water, inadequate sanitation, or insufficient hygiene. These cases result in millions of deaths each year, mostly in young children. Most cases occur in developing countries — including Kenya — because of unsafe water, poor sanitation, and insufficient hygiene. Not all waterborne diseases cause diarrhoea; some instead cause malnutrition, skin infections, and organ damage.
          </p>

          {/* ─── SECTION 8 ─── */}
          <SectionHeading id="diseases" number="Section 8" title="Diseases Related to Poor Hygiene" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The following diseases are directly linked to poor hygiene, inadequate sanitation, and unsafe water. Each is preventable through the hygiene practices described in the sections that follow.
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            {[
              ["Amebiasis", "Caused by Entamoeba histolytica; spreads via faecal contamination of food and water. Causes amoebic dysentery (bloody diarrhoea) and can form abscesses in the liver. Common in Kenya where water quality is unreliable."],
              ["Campylobacter infection", "Leading cause of bacterial diarrhoea globally; usually from contaminated poultry or unpasteurised milk. Common cause of 'traveller's diarrhoea'."],
              ["Cholera", "Acute watery diarrhoea caused by Vibrio cholerae. Spreads via contaminated water. Without treatment, mortality can reach 25–50%. Kenya has experienced repeated cholera outbreaks in Nairobi's informal settlements."],
              ["Cryptosporidiosis", "Caused by Cryptosporidium parasites; very resistant to chlorine. Spreads via contaminated water, including swimming pools. Particularly dangerous for HIV-positive individuals."],
              ["Cyclosporiasis", "Caused by Cyclospora cayetanensis; found in contaminated fresh produce and water. Causes prolonged, relapsing diarrhoea."],
              ["Dracunculiasis (Guinea-worm disease)", "Nearly eradicated globally through WASH interventions. Caused by a large worm that grows under the skin; emerges painfully through a blister, usually near the foot. Transmitted by drinking water containing infected water fleas."],
              ["Escherichia coli (E. coli) infection", "Several strains of E. coli cause diarrhoea, including haemorrhagic (bloody) diarrhoea. Enterotoxigenic E. coli is a leading cause of infant diarrhoea in Kenya. O157:H7 strain can cause kidney failure."],
              ["Fascioliasis", "Liver fluke infection from eating contaminated raw watercress or other aquatic plants. Causes liver damage."],
              ["Giardiasis", "Caused by Giardia lamblia; one of the most common intestinal parasites globally. Spreads via faecal contamination. Causes prolonged, foul-smelling diarrhoea and malabsorption."],
              ["Hepatitis A", "Viral liver infection spread via faecal-oral route (contaminated food/water). Causes jaundice, fatigue, and liver inflammation. Vaccine-preventable."],
              ["Leptospirosis", "Caused by Leptospira bacteria; spreads through contact with water or soil contaminated by infected animal urine (especially rats). An occupational hazard for Kenyan farmers, sewage workers, and those living near rivers."],
              ["Rotavirus", "Leading cause of severe diarrhoeal disease in children under 5 worldwide and in Kenya. Highly contagious; spreads via faecal-oral route. Kenya introduced rotavirus vaccine into the routine immunisation schedule in 2014."],
              ["Salmonella", "Causes both non-typhoidal salmonellosis (food poisoning from contaminated eggs, poultry, raw meat) and typhoid fever (Salmonella typhi). Widespread in Kenya."],
              ["Schistosomiasis (Bilharzia)", "Caused by Schistosoma parasites that penetrate skin in contaminated freshwater. Major burden in communities around Lake Victoria in western Kenya (Kisumu, Siaya, Homa Bay counties). Causes chronic organ damage (liver, spleen, bladder)."],
              ["Shigellosis (Bacillary dysentery)", "Bacterial infection causing bloody diarrhoea; spreads person-to-person and via contaminated food and water. Can cause large outbreaks in crowded, unhygienic conditions."],
              ["Typhoid Fever", "Caused by Salmonella typhi; spreads via contaminated water and food. Causes sustained fever, abdominal pain, and can be fatal if untreated. Vaccine available. Endemic in many Kenyan urban areas with poor water/sanitation."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* ─── SECTION 9 ─── */}
          <SectionHeading id="prevention" number="Section 9" title="Prevention and Control of Diseases" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Effective prevention requires understanding how infectious diseases are transmitted, and then prioritising actions that disrupt the most high-risk pathways. <strong>Breaking the chain of faecal-oral transmission</strong> — the single most important intervention for the majority of hygiene-related diseases — is achieved by combining improved sanitation (so that faeces are safely contained) with good hygiene practices (so that pathogens cannot travel from faeces to mouth via hands, food, or water).
          </p>
          <ExplainerBox>
            <strong>The F-diagram:</strong> Public health workers use the "F-diagram" to visualise faecal-oral transmission routes: Faeces → Fingers → Flies → Fields/Floors → Food/Fluids → (the) Face. Hygiene interventions target each of these pathways — hand washing targets "fingers", food hygiene targets "food and fluids", safe excreta disposal targets "faeces", fly control targets "flies", and safe water targets "fluids". A comprehensive approach blocks multiple pathways simultaneously.
          </ExplainerBox>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Other prevention and control strategies include: vaccination (for vaccine-preventable diseases like cholera, typhoid, rotavirus, hepatitis A, and polio); treatment of sick individuals to reduce the infectious reservoir; health education to change behaviours; and environmental modification to eliminate vector breeding sites.
          </p>

          {/* ─── SECTION 10 ─── */}
          <SectionHeading id="medical" number="Section 10" title="Medical Hygiene Practices" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            In healthcare settings — hospitals, clinics, dental offices, laboratories — the risk of pathogen transmission is extremely high because of the concentration of sick people and invasive procedures. Medical hygiene practices are specifically designed to prevent <strong>healthcare-associated infections (HAIs)</strong> — infections that patients or healthcare workers acquire within the healthcare environment.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground/80 mb-4">
            <li><strong>Isolation or quarantine of infectious persons or materials:</strong> Patients with highly contagious or dangerous infections (TB, Ebola, COVID-19) are placed in isolation rooms to prevent the spread to other patients, visitors, and staff. Quarantine applies to people who have been exposed but are not yet showing symptoms. In Kenya, isolation facilities for Ebola preparedness exist at referral hospitals in major urban centres.</li>
            <li><strong>Sterilisation of surgical instruments:</strong> All instruments that enter the body or come into contact with sterile tissue must be rendered completely free of all living microorganisms, including spores. Methods include steam autoclaving (the gold standard), dry heat, chemical sterilisation (e.g., ethylene oxide for heat-sensitive equipment), and radiation. Failure to sterilise properly causes surgical site infections, which are a major cause of post-operative morbidity in Kenyan hospitals.</li>
            <li><strong>Use of personal protective equipment (PPE):</strong> Masks (N95 or surgical), gowns, caps, protective eyewear, and gloves form physical barriers between the healthcare worker and potentially infectious materials. During the COVID-19 pandemic, PPE shortages across Kenyan health facilities exposed healthcare workers to unacceptable infection risk.</li>
            <li><strong>Proper bandaging and dressing of injuries:</strong> Wounds that are not properly cleaned, covered, and regularly redressed become sites of bacterial colonisation and infection. In a Kenyan context, inadequate wound care after road accidents frequently leads to secondary infections, sepsis, and preventable limb loss.</li>
            <li><strong>Safe disposal of medical waste:</strong> Sharps (needles, scalpels) must be discarded in puncture-proof containers. Infectious waste (blood-soaked materials, pathology specimens) requires incineration or other high-temperature treatment. Improper medical waste disposal at Kenyan health facilities — where waste ends up in general municipal waste — poses needle-stick injury risks and environmental contamination.</li>
            <li><strong>Disinfection of reusable items:</strong> Linen, surgical drapes, uniforms, and reusable instruments that are not heat-sterilisable must be chemically disinfected. Proper laundry temperature and disinfectant protocols are essential.</li>
            <li><strong>Surgical hand scrubbing and clinical hand washing:</strong> Before any surgical procedure, the entire surgical team must scrub hands and forearms with antimicrobial soap or hand rub for at least 3–5 minutes to mechanically remove and kill transient microorganisms. In general clinical settings, the WHO promotes the "5 moments of hand hygiene" — before patient contact, before aseptic procedures, after body fluid exposure risk, after patient contact, and after contact with patient surroundings.</li>
          </ul>

          {/* ─── SECTION 11 ─── */}
          <SectionHeading id="respiratory" number="Section 11" title="Respiratory Hygiene" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Correct respiratory hygiene when coughing and sneezing dramatically reduces the spread of germs — particularly during cold and flu season and during respiratory disease outbreaks (influenza, COVID-19, RSV). Respiratory infections such as colds and flu result from inhaling infected droplets or by rubbing the nasal mucosa or eye with contaminated hands. Research shows that good respiratory hygiene can significantly reduce the risk of respiratory infections.
          </p>
          <div className="space-y-2 mb-5">
            {[
              { s: "Carry tissues and use them to catch coughs and sneezes", d: "A tissue catches the expelled droplets and prevents them from becoming airborne or landing on surfaces. The tissue acts as a physical barrier containing thousands of viruses or bacteria that would otherwise contaminate the surrounding environment." },
              { s: "Dispose of tissues immediately after use", d: "A used tissue is infectious material. It should go directly into a covered bin — not placed on a desk, handed to someone else, or reused. In settings without tissues (very common in Kenyan schools and workplaces), coughing or sneezing into the crook of the elbow (not the hand) is the recommended alternative." },
              { s: "Clean your hands immediately after", d: "Whether you used a tissue or your hand/elbow to catch a cough or sneeze, wash hands with soap and water, or use an alcohol-based hand sanitiser (at least 60% alcohol). This prevents transfer of respiratory pathogens to surfaces and objects that others touch." },
              { s: "Wear a mask when sick", d: "When experiencing respiratory symptoms (runny nose, cough, fever), wearing a mask in public settings protects others. This practice — normalised in Kenya during COVID-19 — is equally applicable during influenza season, especially around elderly people and those with chronic illness." },
            ].map(({ s, d }) => (
              <div key={s} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-sm">{s}</p>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* ─── SECTION 12 ─── */}
          <SectionHeading id="foodhygiene" number="Section 12" title="Food Hygiene" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Food hygiene comprises all the practices that prevent food from becoming contaminated and causing illness. Food poisoning is an extremely common, largely preventable condition that causes millions of illnesses and thousands of deaths in Kenya annually — many of which are unreported or misattributed. The WHO's <strong>Five Key Principles of Food Hygiene</strong> provide a practical framework:
          </p>
          <div className="space-y-3 mb-5">
            {[
              { n: "1", p: "Keep clean — prevent contaminating food from people, pets, and pests", d: "Wash hands before touching food, after using the toilet, after handling raw meat, after touching animals or garbage, and after sneezing or coughing. Keep cooking surfaces, cutting boards, and utensils clean. Keep food covered to prevent access by flies, cockroaches, and rodents — all of which carry pathogens on their bodies and in their faeces. In Kenyan market settings (e.g., Gikomba, Wakulima), open display of food without covers is a major contamination risk." },
              { n: "2", p: "Separate raw and cooked foods to prevent cross-contamination", d: "Raw meat, poultry, and seafood carry pathogens that can contaminate ready-to-eat foods if they come into contact. Use separate cutting boards and knives for raw and cooked foods. Store raw meat on the bottom shelf of the refrigerator so it cannot drip onto other foods. Never place cooked food back onto a plate that held raw meat." },
              { n: "3", p: "Cook to the right temperature for long enough", d: "Cooking kills pathogens. Most foodborne pathogens are destroyed at 70°C throughout the food. Meat (especially chicken, pork, and minced meat) must be cooked until juices run clear and there is no pink left inside. For nyama choma, ensure the interior of the meat is fully cooked — not just the surface. Soups and stews should be brought to a rolling boil. Reheated food must reach 70°C throughout, not just steamed." },
              { n: "4", p: "Store foods at the proper temperature", d: "Bacteria multiply rapidly between 5°C and 60°C — the 'danger zone'. Refrigerate perishable foods below 5°C; keep hot foods above 60°C; do not leave cooked food at room temperature for more than 2 hours (1 hour in Kenya's hot climate). In markets and homes without refrigeration, perishable foods must be purchased fresh and cooked the same day." },
              { n: "5", p: "Use safe water and raw materials", d: "Use safe water (boiled, chlorinated, or from a treated source) for all food preparation, washing produce, and cooking. Do not use food that is past its expiry date, that shows signs of mould or spoilage, or that has been stored improperly. Inspect fresh produce for obvious contamination. Be especially cautious with foods like groundnuts and maize that can carry aflatoxins if mouldy." },
            ].map(({ n, p, d }) => (
              <div key={n} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-sm">Principle {n}: {p}</p>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* ─── SECTION 13 ─── */}
          <SectionHeading id="water" number="Section 13" title="Household Water Treatment and Safe Storage" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Safe drinking water is a fundamental requirement for health, yet it remains a significant problem not only in developing countries but also in parts of the developed world — the WHO estimates that 120 million people in the European region alone lack access to safe drinking water. In Kenya, millions rely on water sources that are contaminated or untreated. Even water collected from a relatively safe source can become contaminated during storage at home (through contact with contaminated hands, dirty storage vessels, or using containers that are not properly covered).
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Point-of-use (POU) water treatment</strong> interventions can reduce diarrhoeal disease even in communities where piped water quality is poor or where there is no piped supply at all. The following methods are available:
          </p>
          <div className="space-y-3 mb-5">
            {[
              { m: "Boiling", d: "Heating water until a rolling boil begins (100°C at sea level, slightly lower at altitude). Boiling kills all pathogens — bacteria, viruses, and parasites — and remains the most reliable household water treatment method in Kenya. After boiling, allow to cool with the lid on to prevent recontamination, then store in a clean, covered container. The main limitation is the cost of firewood/charcoal, the indoor air pollution from cooking fires, and the time required." },
              { m: "Chemical disinfection — chlorine or iodine", d: "Adding measured amounts of sodium hypochlorite (household bleach) or iodine solution to water kills most bacteria and viruses but is less effective against Cryptosporidium. Kenya's WaterGuard (sodium hypochlorite) is a low-cost, widely available product proven to reduce diarrhoeal disease in Kenyan households. Correct dosage and contact time (at least 30 minutes before drinking) are essential. Iodine is less commonly used but effective and available as tablets." },
              { m: "Ceramic filtration", d: "Ceramic filters (pot-type) made from clay, rice husks, or other local materials remove bacteria and parasites by physical filtration through tiny pores. Impregnation with colloidal silver provides additional antibacterial action. Effective against bacteria and protozoa but less effective against viruses. Used in many Kenyan NGO WASH programmes. Requires periodic cleaning and replacement when cracked." },
              { m: "Solar Disinfection (SODIS)", d: "Fill clean 1.5–2 litre clear plastic (PET) bottles with water and place on an inclined surface (such as a roof) in direct sunlight for 6 hours (48 hours if cloudy). UV-A radiation and heat combine to inactivate pathogens. Highly effective against bacteria and viruses; less effective against helminths. An excellent option when no chemical disinfectants are available. Widely promoted by PATH and other NGOs in Kenya." },
              { m: "UV irradiation", d: "Community or household UV systems use ultraviolet lamps to disinfect water flowing past them. UV light damages the DNA of pathogens, preventing them from reproducing. Highly effective against bacteria, viruses, and Cryptosporidium (which is resistant to chlorine). Systems can be batch (small volumes) or flow-through. Cost and electricity requirements limit use in rural Kenya, but UV systems are increasingly used in small towns and schools." },
              { m: "Combined flocculation/disinfection (e.g., WaterMaker/P&G sachets)", d: "Sachets of powder (such as Procter & Gamble's PUR sachets) combine a flocculant (alum) that causes suspended particles and bacteria to clump and settle, followed by the release of chlorine to disinfect. One sachet treats 10 litres of very turbid (cloudy) water. Used by MSF and Red Cross in emergency settings in Kenya." },
              { m: "Multibarrier methods", d: "Using two or more methods in combination — for example, filtration followed by chlorination, or SODIS after settlement. Each method removes different contaminants, so combining methods provides more comprehensive protection than any single treatment alone." },
            ].map(({ m, d }) => (
              <div key={m} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-sm">{m}</p>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <NoteBox>
            <strong>Safe water storage:</strong> Treated water must be stored correctly or it can become recontaminated. Use clean containers with narrow necks or covered with hard covers — jerry cans or other closed containers with spigots are ideal. Never put hands or other objects directly into the drinking water container. Use a dedicated ladle or cup that is hung on the wall with a nail and only used for serving water. Label the container to distinguish treated from untreated water.
          </NoteBox>

          {/* ─── SECTION 14 ─── */}
          <SectionHeading id="handwashing" number="Section 14" title="Hand Washing — The Single Most Effective Hygiene Practice" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Hand washing with soap is the single most effective and cost-efficient hygiene intervention known. It prevents respiratory infections, diarrhoeal diseases, eye infections, skin infections, and foodborne illness. The WHO estimates that hand washing could prevent up to 1 million deaths per year globally.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-5">Why Hand Washing with Soap Matters</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Our hands constantly touch surfaces, food, and other people, picking up and depositing microorganisms invisibly. Soap works not by "killing" bacteria but by <strong>mechanically removing</strong> them — soap molecules have a water-loving head and a fat-loving tail; the fat-loving tail binds to the cell membranes of bacteria and to oily residues on the skin's surface, and when hands are rinsed under water, the soap carries the pathogens off and down the drain. Plain water alone removes some germs through physical flushing, but soap dramatically increases removal efficiency. Antibacterial soap with triclocarban or triclosan kills bacteria directly, but regular soap is effective for most everyday hygiene needs.
          </p>
          <ul className="list-disc pl-6 space-y-1 text-base text-foreground/80 mb-4">
            <li>People who do not wash hands are at significantly higher risk of contracting colds, flu, and gastrointestinal illnesses</li>
            <li>Improper or absent hand washing can cause or worsen pneumonia — particularly dangerous in the elderly and those with chronic diseases</li>
            <li>E. coli, hepatitis A, flu, colds, and other infections are transmitted through contaminated hands contacting food or another person's face or body</li>
            <li>Dirty hands can transmit illness to the entire family via shared food and surfaces</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">When to Wash Your Hands</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-5">
            {[
              ["Before preparing food", "Raw food carries pathogens that can be transferred to the food and then to anyone who eats it"],
              ["Before eating", "Food consumed with dirty hands delivers pathogens directly to the digestive tract"],
              ["Before touching eyes, nose, or mouth", "Mucous membranes are direct entry points for respiratory and eye pathogens"],
              ["Before feeding a child", "Infants and young children have immature immune systems and are highly susceptible"],
              ["After using the toilet (defecation or urination)", "Faecal matter — even when invisible — remains on hands after toilet use"],
              ["After cleaning a child who has defecated / changing diapers", "Child faeces contain the same pathogens as adult faeces"],
              ["After coughing, sneezing, or blowing your nose", "Respiratory pathogens are deposited on hands and then transferred to surfaces"],
              ["After handling animals or animal waste", "Animals carry Salmonella, Campylobacter, E. coli, and other zoonotic pathogens on their fur, skin, and in their faeces"],
              ["After handling garbage or waste", "Waste contains high concentrations of diverse pathogens"],
              ["After coming in from outside", "Hands collect contaminants from surfaces touched in public spaces"],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-3">
                <p className="font-semibold text-foreground text-xs mb-1">{t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">How to Wash Hands Correctly (7 Steps)</h3>
          <div className="space-y-2 mb-5">
            {[
              "Wet hands under clean running water",
              "Apply soap — bar soap or liquid soap — sufficient to cover all hand surfaces",
              "Away from the running water, rub all surfaces: palms together, back of each hand with the palm of the other, interlace fingers and rub between them, cup fingers into claws and rub the back of fingers against opposite palm, grip each thumb and rotate, rub the fingertips of each hand in the opposite palm. Do this for at least 20 seconds (sing 'Happy Birthday' twice as a timer)",
              "Rinse thoroughly under clean running water, holding hands downward so rinse water runs off fingertips",
              "Dry hands thoroughly with a clean towel (paper towel or clean cotton towel — not a shared cloth)",
              "Use the towel to turn off the tap if in a public setting to avoid re-contamination",
              "In areas without running water, use a tippy tap — a plastic bottle with a small hole in the cap, tilted by a foot pedal to release water — which allows hands-free water dispensing using very little water",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/50 p-3">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                <p className="text-sm text-foreground/80 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
          <NoteBox>
            <strong>Ash as a soap substitute:</strong> In communities where soap is not available, wood ash (from cooking fires) is an acceptable substitute. Ash is alkaline and abrasive — it helps mechanically dislodge pathogens and has some antimicrobial properties. It is far more effective than water alone. This is an important practical point for rural Kenya where soap availability can be intermittent.
          </NoteBox>
          <NoteBox>
            <strong>Nail hygiene:</strong> The spaces between fingernails and the skin beneath them are excellent hiding places for pathogens that survive soap and water washing. Fingernails must be clipped regularly and kept short. Under no circumstances should anyone prepare food with long, dirty fingernails.
          </NoteBox>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            In occupational settings, hand washing is required by law in Kenya for food handlers, healthcare workers, and certain industrial workers. All families should also have access to a clean, functioning latrine — because hand washing after open defecation in the field is far less effective than hand washing after using a properly constructed latrine.
          </p>

          {/* ─── SECTION 15 ─── */}
          <SectionHeading id="personal" number="Section 15" title="Personal Hygiene — Clean Body, Teeth, Hair, and Feet" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Personal hygiene — also called body hygiene — encompasses all the practices that maintain the cleanliness and health of the individual body. Good personal hygiene serves multiple purposes: preventing disease, preventing body odour, improving self-esteem and social confidence, preventing dental problems, and protecting skin health.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-5">Bathing</h3>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground/80 mb-4">
            <li>Bathe at least daily — twice a day is recommended in Kenya's climate, especially after exercise, sports, or physical outdoor work</li>
            <li>Use soap and water; dry with a clean towel; change into clean underwear after bathing</li>
            <li>Not bathing allows bacteria on the skin to accumulate, causing body odour and skin infections. In women, inadequate genital hygiene increases the risk of bacterial vaginosis and urinary tract infections</li>
            <li>Antibacterial soaps are useful but regular soap is sufficient for daily hygiene; some antibacterial soaps can cause allergic reactions in sensitive skin</li>
          </ul>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Body odour</strong> is caused by: chemicals in sweat (including pheromones); wastes excreted through the skin (such as metabolised alcohol — when you drink, some alcohol is excreted through the skin and causes a characteristic odour); the action of bacteria that live on skin and feed on dead skin cells and sweat; and unwashed clothes, especially underwear and socks. To manage body odour: clean underarms and groin and dry thoroughly; use deodorant or antiperspirant; wash clothes after each use; cut from the diet foods whose compounds appear in sweat (garlic, onions, beer).
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-5">Dental Hygiene</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Brush teeth at least <strong>2–3 times daily</strong>, especially after eating and before sleeping. The bacteria that accumulate in the mouth between brushing or overnight cause tooth decay (dental caries), gingivitis (gum inflammation), bad breath (halitosis), and in advanced cases, periodontitis (destruction of supporting structures of the teeth). Poor dental health has also been linked to cardiovascular disease and diabetes control — bacteria from gum disease can enter the bloodstream and cause systemic inflammation.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4"><strong>Causes of bad breath:</strong> food trapped in cavities; certain foods (garlic, onions); tobacco and alcohol; plaque deposits on teeth and gums; gum disease; and bacterial accumulation on the tongue. <strong>To maintain fresh breath:</strong> brush circularly to reach all surfaces including molars; floss to remove inter-dental food and plaque; gargle with water or mouthwash; clean the tongue (bacteria accumulate on the tongue surface); use toothpaste with fluoride; chew sugarless gum to stimulate saliva; visit a dentist regularly. <strong>To detect bad breath:</strong> breathe out through the mouth into a handkerchief and smell it; run dental floss between teeth and smell it; or simply ask someone you trust.</p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-5">Hair Hygiene</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Wash hair regularly — more frequently after spending time outdoors, exercising (sweat accumulates on the scalp), or swimming (chlorine and pool chemicals require rinsing). Unwashed or poorly combed hair becomes infested with lice (head lice — Pediculus humanus capitis), which suck blood from the scalp. Lice transfer easily between people sharing combs, hats, or through close head contact (as in crowded Kenyan classrooms). Ridding a person of lice requires permethrin or pyrethrin-based shampoo plus careful combing with a fine-toothed comb, and treating all household members simultaneously. Shampooing also removes dandruff (dead skin cells from the scalp) and pollen, dust, and other environmental contaminants.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-5">Foot Hygiene</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Foot odour results from sweat accumulating in shoes and socks without evaporating, providing an ideal environment for bacteria. To prevent foot odour and foot infections: wash the soles and between the toes daily with antibacterial soap; soak feet in salt solution if odour is persistent; use clean, breathable socks (change daily); air shoes between wearings; choose the right shoe size; sprinkle shoes with talcum powder; wear open-toed sandals when possible; always wear footwear — particularly sandals or thongs — in public bathrooms, communal showers, and swimming pool areas to prevent fungal infections (athlete's foot — tinea pedis) and parasitic infections (hookworm larvae penetrate bare feet in soil).
          </p>

          {/* ─── SECTION 16 ─── */}
          <SectionHeading id="sharing" number="Section 16" title="Do Not Share Personal Items" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Sharing personal items that have come into contact with another person's body fluids is a significant and often underappreciated hygiene risk. This applies not only to syringes and medical equipment but to everyday items:
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-5">
            {[
              ["Toothbrushes", "Sharing a toothbrush transfers bacteria and viruses between gums, blood (micro-cuts from brushing), and saliva. Can transmit streptococcal bacteria, herpes simplex virus, and hepatitis C."],
              ["Razors and shaving blades", "Razors cause microscopic skin cuts. Sharing transfers blood, potentially including hepatitis B, hepatitis C, and HIV. Never share. Barbershops should use single-use blades or sterilise equipment between clients — a serious gap in hygiene standards at many Kenyan informal barbershops."],
              ["Syringes and medical equipment", "Sharing needles and syringes is one of the primary transmission routes for HIV, hepatitis B, and hepatitis C among people who inject drugs. This is a key focus of Kenya's harm reduction programmes (needle/syringe programmes)."],
              ["Combs, brushes, and hair accessories", "Transfer lice, scalp bacteria, and fungi (ringworm/tinea capitis) between individuals. Each person should have their own and store it separately."],
              ["Towels and face cloths", "Transfer skin bacteria, fungi (athlete's foot, ringworm), and eye pathogens between individuals."],
              ["Handkerchiefs", "Reusable cloth handkerchiefs accumulate respiratory pathogens with each use. If using a handkerchief (rather than a tissue), wash daily. Use handkerchief or elbow crook to cover mouth when sneezing/coughing."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* ─── SECTION 17 ─── */}
          <SectionHeading id="wash" number="Section 17" title="WASH and the Sustainable Development Goals (SDG 6)" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>WASH</strong> stands for <strong>Water, Sanitation, and Hygiene</strong> — the three interconnected pillars of environmental health. Access to clean water, proper sanitation, and good hygiene practices together protect communities from disease, enable children to attend school, allow women to live with dignity, support economic development, and underpin almost every other development priority.
          </p>
          <blockquote className="border-l-4 border-primary pl-5 py-2 my-5 italic text-foreground/70 text-base">
            "Sustainable Development Goal 6 goes beyond drinking water, sanitation and hygiene to also address the quality and sustainability of water resources, which are critical to the survival of people and the planet. The 2030 Agenda recognises the centrality of water resources to sustainable development and the vital role that improved drinking water, sanitation and hygiene play in progress in other areas, including health, education and poverty reduction."
            <span className="block mt-2 not-italic text-xs text-muted-foreground">— United Nations, SDG 6</span>
          </blockquote>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            SDG 6 has eight specific targets, including: ensuring universal and equitable access to safe and affordable drinking water (6.1); achieving access to adequate and equitable sanitation and hygiene for all, and ending open defecation (6.2); improving water quality and reducing pollution (6.3); and substantially increasing water-use efficiency (6.4).
          </p>
          <ExampleBox>
            <strong>Kenya and SDG 6:</strong> Kenya's Big Four Agenda includes affordable housing and universal health coverage — both of which require clean water and sanitation. The government's Athi Water Works Development Agency, Lake Victoria South Water Works, and other regional authorities are responsible for water supply. Kenya has made significant progress — piped water access in urban areas has improved — but significant gaps remain, particularly in ASALs (arid and semi-arid lands) where communities walk hours to water sources. The Kenya WASH programme, supported by UNICEF and bilateral donors, works to close these gaps.
          </ExampleBox>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Key WASH definitions:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-foreground/80 mb-4">
            <li><strong>Safe water:</strong> Clean water that can be consumed or used without risk of getting a disease — free from chemical contamination, biological pathogens, and physical hazards</li>
            <li><strong>Sanitation:</strong> The state of being clean; refers to the facilities and services involved in the safe disposal of human waste (toilets, latrines, sewage systems) and the management of other waste types</li>
            <li><strong>Hygiene:</strong> The practice of keeping oneself and the surrounding environment clean in order to prevent disease — including personal hygiene, environmental hygiene, food hygiene, and professional/medical hygiene</li>
          </ul>

          {/* ─── SECTION 18 ─── */}
          <SectionHeading id="environment" number="Section 18" title="Environmental Health and Waste Disposal" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Environmental health</strong> is defined by the WHO as those aspects of human health and disease that are determined by factors in the environment. It encompasses the theory and practice of assessing and controlling environmental factors that can potentially affect health — including waste disposal, pollution, and the safety of built and natural environments.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Waste disposal</strong> is a growing global challenge. Improper waste disposal creates breeding sites for disease vectors (mosquitoes, flies, rats), contaminates water supplies and food, pollutes the air, degrades ecosystems, and creates physical hazards. Handling and disposal of household refuse has direct health consequences.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-5">Types of Household Waste</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-5">
            {[
              ["Organic waste", "Derived from animal and plant matter — vegetable and meat trimmings, bones, inedible plant parts, food leftovers, old cooking oils, garden waste from flower beds and hedges. Organic waste decomposes naturally and can be composted into nutrient-rich fertiliser."],
              ["Inorganic (solid) waste", "Packaging materials — plastic cans, metal cans, glass (bottles, crockery), office waste (paper, cardboard, cartridges), linen waste (towels, rags). Inorganic waste does not decompose naturally and must be recycled, compacted, or disposed of through appropriate channels."],
              ["Liquid waste", "Grey water from kitchens (dishwashing, cooking) and bathrooms, laundry water, and used cooking oils. Must be disposed of into the sewerage system or, where no sewerage exists, into a soakage pit away from water sources."],
              ["Hazardous waste", "Includes garage wastes (old engine oils), chemicals, pesticides, pharmaceuticals, batteries, and electronic waste. Requires special handling — should not be mixed with general household waste. In Kenya, improper disposal of old batteries and e-waste (discarded electronics) at sites like Dandora dumpsite is a significant source of heavy metal contamination."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-5">Waste Disposal Methods</h3>
          <div className="space-y-2 mb-5">
            {[
              { m: "Prevention and reduction (best approach)", d: "The most environmentally sound method — generating less waste in the first place. Achieved through buying only what is needed, avoiding excessive packaging, using reusable items, and buying second-hand. In Kenya, the Plastic Bags (Control) Regulations 2017 banned single-use plastic carrier bags — a major waste reduction intervention." },
              { m: "Composting / biological reprocessing", d: "Biological methods such as composting convert organic waste (food scraps, garden waste, paper) into organic manure that enriches soil and can replace expensive chemical fertilisers. Organic waste buried in soil decomposes naturally, adds nutrients, and improves soil structure. Left-over food scraps can also feed domestic animals (pigs, chickens, cows)." },
              { m: "Recycling and energy recovery", d: "Materials separated by type (glass, metals, plastics, paper, rubber) can be taken to recycling facilities where they are reprocessed into new products. Used cooking oil can be converted to biodiesel. Energy recovery systems convert waste into fuel for heating or generating electricity — a promising approach for urban Kenya's large volumes of organic waste." },
              { m: "Burying", d: "Suitable for small amounts of organic waste in areas where large volumes are not generated (e.g. picnic sites, isolated residences). Organic matter degrades in soil, adding nutrients. Not suitable for inorganic or toxic waste — plastic and metals do not biodegrade and contaminate soil." },
              { m: "Burning / incineration", d: "Used primarily for flammable waste (paper, certain plastics). Municipal-scale incinerators can reduce waste volume dramatically and generate energy from waste, but release pollutants (dioxins, furans, heavy metals) from their stacks — requiring effective emission controls. Household burning of plastic waste is harmful and should be avoided." },
              { m: "Draining into main sewer", d: "Appropriate for liquid wastes like grey water from dishwashing. Kitchen wastewater is channelled to the main sewer through drainage pipes." },
              { m: "Compacting", d: "Compactors reduce the volume (bulkiness) of waste, making it easier to transport to disposal sites. Compacted waste is then taken to landfill or other disposal facilities." },
              { m: "Ocean/river disposal — avoid", d: "Dumping waste into rivers and the ocean is environmentally harmful, polluting aquatic ecosystems and harming marine life. While the organic content of treated sewage effluent can be safely discharged into rivers (once certified clean), untreated solid waste should never be disposed of this way. Kenya's rivers — including the Nairobi River — suffer severe pollution from illegal dumping." },
            ].map(({ m, d }) => (
              <div key={m} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30">
                  <p className="font-semibold text-foreground text-sm">{m}</p>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-5">Sewage Treatment</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Sewage treatment is the process of removing physical, chemical, and biological contaminants from wastewater and household sewage (both runoff/effluents and domestic sewage). Its objective is to produce: (1) an environmentally safe liquid waste stream (treated effluent) that can be discharged into the environment without causing harm, and (2) a solid waste (treated sludge) suitable for disposal or reuse (typically as agricultural fertiliser). Using advanced technology, treated sewage effluent can even be reclaimed as safe drinking water — a practice already used in countries like Singapore and Namibia.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            In areas without access to a public sewerage network, the following <strong>on-site sanitation methods</strong> are acceptable alternatives:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-base text-foreground/80 mb-3">
            <li><strong>Septic tank:</strong> Underground chamber where solid waste settles and partially degrades, while liquid waste flows to a drain field where it is filtered through the soil</li>
            <li><strong>Pour flush latrine:</strong> Toilet with a water seal (siphon) to prevent odour and fly access; requires only a small pour of water to flush</li>
            <li><strong>Ventilated Improved Pit (VIP) latrine:</strong> Pit latrine with a vent pipe and a dark interior; the vent pipe draws flies toward the light outside rather than into the latrine, preventing them from returning to food and spreading disease</li>
          </ul>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The following sanitation methods should be <strong>discouraged</strong> due to their health hazards:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-base text-foreground/80 mb-4">
            <li><strong>Service/bucket latrines:</strong> Faeces collected in containers that must be manually handled and emptied — high infection risk for the handlers</li>
            <li><strong>Public latrines without maintenance:</strong> Quickly become vectors of disease transmission due to high traffic and inadequate cleaning</li>
            <li><strong>Open latrines:</strong> Unenclosed defecation facilities — provide no privacy and allow easy access by flies and other vectors</li>
            <li><strong>Open defecation:</strong> Defecation into the open environment — the single most dangerous sanitation practice, directly contaminating soil, water, and food with faecal pathogens</li>
          </ul>
          <ExampleBox>
            <strong>Vector control in the home environment:</strong> Alongside waste disposal and sanitation, communities must actively control vectors. Measures include: destroying mosquito breeding sites (draining standing water, clearing bushes, covering water containers); using biological predators (introducing larvivorous fish — Gambusia/guppies — into water storage containers or ponds to eat mosquito larvae); chemical sprays (indoor residual spraying, larviciding of water bodies); mechanical killing (fly swatters, mosquito coils, electric fly traps); and personal and general hygiene (clean homes with covered food provide fewer opportunities for flies, cockroaches, and rats to breed and feed).
          </ExampleBox>

          {/* ─── SECTION 19 ─── */}
          <SectionHeading id="summary" number="Section 19" title="Summary — Everything Contributes" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            In reality, hygiene and sanitation are not single actions but an interconnected set of practices that together reduce the burden of infectious disease in a community. No single intervention is sufficient on its own — the most protected communities are those that implement multiple measures simultaneously, creating overlapping layers of protection. The complete picture:
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-6">
            {[
              ["Hand hygiene and personal hygiene", "The most immediate and individual-level protection — keeping hands, body, teeth, and clothing clean prevents person-to-person transmission and reduces self-infection."],
              ["Food hygiene (cooking, storing, preventing cross-contamination)", "Ensures that one of the most common entry routes for pathogens — food — is safe at every stage from purchase to consumption."],
              ["Control of vectors like house flies", "Flies land on faeces and then on food, physically transferring pathogens between the two. Fly control through waste management, food covers, and vector spraying breaks this route."],
              ["Ensuring safe water at point of use", "Even water from a clean source can be contaminated during transport and storage. POU treatment and proper storage protect the final drinking water quality."],
              ["Respiratory hygiene", "Covering coughs and sneezes, proper tissue disposal, and hand washing after respiratory secretion contact breaks airborne and droplet transmission."],
              ["Safe disposal of faeces (human and animal)", "Containment of faeces in properly designed latrines or sewerage systems is the most important environmental intervention for preventing faecal-oral disease transmission."],
              ["General hygiene (laundry, surfaces, toilets, baths, sinks)", "Keeping the home environment clean — regularly washing surfaces, laundering clothing and bedding, cleaning toilets and sinks — reduces pathogen reservoirs in the living environment."],
              ["Disposal of solid waste and control of wastewater", "Proper waste disposal eliminates vector breeding sites, reduces environmental contamination, and maintains a clean community environment."],
              ["Health education", "All of the above practices are adopted and maintained because people understand why they matter. Health education — informing, motivating, and enabling — is the foundation that makes all other hygiene and sanitation interventions sustainable and community-owned."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <ExplainerBox>
            <strong>Health education activities for hygiene and sanitation:</strong> Health education should convince and help community members to adopt and maintain specific preventive practices — including breastfeeding (which provides infant immunity), improved weaning practices, clean drinking water, using plenty of water for hygiene, consistent latrine use, and sanitary disposal of excreta. These are not abstract recommendations — they are evidence-based practices that, when adopted consistently at scale, transform community health outcomes. Kenya's Community Health Volunteers (CHVs) are the front-line workforce for delivering this education, visiting households and running village health days across all 47 counties.
          </ExplainerBox>

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
