import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, CheckCircle2, AlertTriangle } from "lucide-react";

const sections = [
  { id: "intro", label: "1. What is HIV/AIDS?" },
  { id: "keyfacts", label: "2. Key Facts & Kenya" },
  { id: "stages", label: "3. Stages of HIV Infection" },
  { id: "symptoms", label: "4. Signs & Symptoms" },
  { id: "transmission", label: "5. Transmission" },
  { id: "riskfactors", label: "6. Risk Factors" },
  { id: "diagnosis", label: "7. Diagnosis" },
  { id: "prevention", label: "8. Prevention Strategies" },
  { id: "prep-pep", label: "9. PrEP & PEP" },
  { id: "pmtct", label: "10. PMTCT" },
  { id: "treatment", label: "11. Treatment (ART)" },
  { id: "kenya-art", label: "12. ART in Kenya" },
  { id: "social", label: "13. Social Strategies" },
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

export default function HealthTopic1() {
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
    <Layout breadcrumbs={[{ label: "Unit 4", href: "/" }, { label: "HIV Prevention Strategies" }]}>
      <Helmet>
        <title>HIV Prevention Strategies | Health Study Notes</title>
        <meta name="description" content="Comprehensive notes on HIV/AIDS — what it is, transmission, risk factors, diagnosis, all 5 prevention strategies (sexual, VMMC, blood-borne, PMTCT, social), PrEP, PEP, and ART in Kenya." />
      </Helmet>

      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>

          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Unit 4 · Health Sciences</p>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">HIV Prevention Strategies</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              HIV (Human Immunodeficiency Virus) remains one of the most significant public health challenges globally and in Kenya. These notes cover what HIV and AIDS are, how the infection progresses, how it is transmitted and diagnosed, and — most importantly — the full range of prevention strategies from behaviour change to biomedical interventions and social policy. Treatment options and Kenya's ART programme are also covered in detail.
            </p>
          </div>

          {/* Section 1 */}
          <SectionHeading id="intro" number="Section 1" title="What is HIV and AIDS?" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>HIV (Human Immunodeficiency Virus)</strong> is a virus that attacks the body's immune system — specifically targeting and destroying <strong>CD4+ T-cells</strong> (also called helper T-cells), which are white blood cells that play a critical role in coordinating the immune response against infections and diseases. When enough CD4 cells are destroyed, the immune system becomes so severely compromised that it can no longer protect the body from infections that a healthy immune system would easily fight off.
          </p>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>AIDS (Acquired Immunodeficiency Syndrome)</strong> is the most advanced stage of HIV infection. A person is diagnosed with AIDS when their CD4 cell count falls below <strong>200 cells/mm³</strong> (a healthy person has 500–1,500 cells/mm³) or when they develop one of a list of <strong>AIDS-defining illnesses</strong> such as tuberculosis, Kaposi's sarcoma, cryptococcal meningitis, or Pneumocystis pneumonia.
          </p>
          <NoteBox>
            <strong>WHO's Advanced HIV Disease (AHD) definition:</strong> CD4 cell count less than 200 cells/mm³ OR WHO Stage 3 or 4 disease in adults and adolescents. All children under 5 years living with HIV are considered to have advanced HIV disease, regardless of CD4 count, because their immune systems are more vulnerable.
          </NoteBox>
          <ExplainerBox>
            <strong>The key distinction:</strong> HIV is the virus that causes the infection. AIDS is the syndrome (collection of diseases) that results from severe immune system damage caused by prolonged HIV infection. Not all people with HIV have AIDS — with proper treatment, a person can live with HIV for decades without ever progressing to AIDS.
          </ExplainerBox>

          {/* Section 2 */}
          <SectionHeading id="keyfacts" number="Section 2" title="Key Facts — Global and Kenya" />
          <div className="grid md:grid-cols-2 gap-3 mb-5">
            {[
              ["Global burden", "An estimated 39.9 million people were living with HIV at the end of 2023. About 65% of all people living with HIV globally are in the WHO African Region."],
              ["Annual deaths", "In 2023, approximately 630,000 people died from HIV-related causes globally — down significantly from the peak of around 2 million annual deaths in 2004, largely due to expanded ART access."],
              ["New infections (2023)", "An estimated 1.3 million people acquired HIV in 2023. Despite decades of prevention efforts, transmission continues in every country in the world."],
              ["The 95-95-95 targets", "By 2025: 95% of people living with HIV should know their status; 95% of those should be on ART; 95% on ART should have suppressed viral loads. By 2023: these percentages stood at 86%, 89%, and 93% respectively — progress, but not yet targets met."],
              ["Kenya's burden", "In 2022, Kenya had an estimated HIV prevalence of 3.7% among adults aged 15–49. Approximately 18,000 Kenyans died from AIDS-related causes in 2022. Kenya is home to one of the largest HIV-positive populations in sub-Saharan Africa."],
              ["No cure — but treatable", "There is currently no cure for HIV infection. However, antiretroviral therapy (ART) allows people living with HIV to live long, healthy, and productive lives and to prevent transmission to others. HIV has become a manageable chronic condition, similar to diabetes or hypertension."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Section 3 */}
          <SectionHeading id="stages" number="Section 3" title="Stages of HIV Infection" />
          <div className="space-y-3 mb-5">
            {[
              { stage: "Stage 1: Acute HIV Infection (2–4 weeks after exposure)", detail: "The first stage occurs within 2–4 weeks of HIV entering the body. The virus replicates rapidly and the viral load (amount of HIV in the blood) is extremely high — making this period the most infectious. Many people experience a flu-like illness (fever, headache, rash, sore throat, swollen glands, muscle aches). Some people have no symptoms at all. Standard HIV antibody tests may not yet show positive results during this 'window period' because the body has not yet produced enough antibodies to be detected.", risk: "HIGHEST TRANSMISSION RISK" },
              { stage: "Stage 2: Chronic HIV Infection / Clinical Latency (months to years)", detail: "HIV continues to replicate at lower levels. The person may have few or no symptoms — they may look and feel healthy — but they can still transmit HIV to others. Without treatment, this stage can last 10 years or more. With ART, this stage can last for decades, potentially for the rest of a person's life. Regular monitoring of CD4 count and viral load is critical during this stage.", risk: "Lower but ongoing transmission risk" },
              { stage: "Stage 3: AIDS (Advanced HIV Disease)", detail: "AIDS is diagnosed when CD4 count falls below 200 cells/mm³ or when AIDS-defining opportunistic infections appear. The immune system is so severely damaged that infections and cancers that healthy people fight off easily become life-threatening. Without treatment, survival is typically 3 years from the onset of AIDS. With ART, even at this stage, a person can recover immune function, clear opportunistic infections, and return to relatively good health — though the process takes time.", risk: "Severe immune compromise" },
            ].map(({ stage, detail, risk }) => (
              <div key={stage} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30 flex items-center justify-between">
                  <p className="font-semibold text-foreground text-sm">{stage}</p>
                  <span className="text-xs text-muted-foreground">{risk}</span>
                </div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          {/* Section 4 */}
          <SectionHeading id="symptoms" number="Section 4" title="Signs and Symptoms" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">The symptoms of HIV vary by stage of infection. Crucially, many people with HIV have <strong>no symptoms at all</strong> for years, which is why testing is so essential — you cannot tell if someone has HIV by how they look or feel.</p>
          <div className="grid md:grid-cols-3 gap-3 mb-4">
            {[
              { s: "Acute Stage (Early, 2–4 wks)", items: ["Fever", "Headache", "Rash (often widespread)", "Sore throat", "Fatigue", "Swollen lymph nodes", "Muscle and joint aches", "Night sweats"] },
              { s: "Chronic Stage (Progressive)", items: ["Persistent swollen lymph nodes", "Weight loss (unexplained)", "Prolonged fever", "Chronic diarrhoea", "Persistent cough", "Oral thrush (fungal infection)", "Shingles (herpes zoster)", "Fatigue"] },
              { s: "AIDS Stage (Severe)", items: ["Tuberculosis (TB) — most common AIDS-defining illness in Africa", "Cryptococcal meningitis", "Severe bacterial pneumonia", "Kaposi's sarcoma (skin cancer)", "Lymphomas", "CMV retinitis (can cause blindness)", "Wasting syndrome", "Dementia"] },
            ].map(({ s, items }) => (
              <div key={s} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-xs mb-2">{s}</p>
                <ul className="space-y-1">{items.map(i => <li key={i} className="flex gap-2 text-xs text-muted-foreground"><span className="text-primary">•</span>{i}</li>)}</ul>
              </div>
            ))}
          </div>
          <NoteBox>
            <strong>Critical public health fact:</strong> A person in the asymptomatic chronic stage of HIV — feeling completely healthy — can still transmit the virus to sexual partners. This is why regular HIV testing is recommended for all sexually active people, not just those who feel unwell. In Kenya, the standard recommendation is testing at least once a year and before starting a new sexual relationship.
          </NoteBox>

          {/* Section 5 */}
          <SectionHeading id="transmission" number="Section 5" title="Transmission of HIV" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">HIV is transmitted through specific body fluids from a person who has HIV. Not all body fluids carry enough HIV to infect another person.</p>
          <div className="grid md:grid-cols-2 gap-3 mb-4">
            <div className="rounded-lg border border-red-300/40 bg-red-50/30 dark:bg-red-900/10 p-4">
              <p className="font-semibold text-foreground text-sm mb-2">Body fluids that CAN transmit HIV</p>
              <ul className="space-y-1">{["Blood (including menstrual blood)", "Semen and pre-seminal fluid", "Rectal fluids", "Vaginal fluids", "Breast milk"].map(i => <li key={i} className="flex gap-2 text-xs text-foreground/80"><span className="text-red-500">✕</span>{i}</li>)}</ul>
            </div>
            <div className="rounded-lg border border-green-300/40 bg-green-50/30 dark:bg-green-900/10 p-4">
              <p className="font-semibold text-foreground text-sm mb-2">Things that CANNOT transmit HIV</p>
              <ul className="space-y-1">{["Kissing or hugging", "Shaking hands", "Sharing food or water", "Saliva, tears, or sweat", "Mosquito or insect bites", "Air or water", "Sharing toilets or bathrooms", "Coughing or sneezing"].map(i => <li key={i} className="flex gap-2 text-xs text-foreground/80"><span className="text-green-500">✓</span>{i}</li>)}</ul>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            {[
              ["Sexual transmission", "The most common route globally. HIV is transmitted through unprotected anal or vaginal sex with an HIV-positive person. Anal sex carries the highest risk because the rectal mucosa is thin and easily torn. The risk is significantly higher when other STIs (especially those causing sores or ulcers) are present, because they create entry points for the virus."],
              ["Blood-to-blood transmission", "Sharing needles, syringes, or other injecting equipment among people who inject drugs is a major route of transmission. Receiving contaminated blood transfusions or blood products (now rare in Kenya due to routine blood screening) is another route. Needlestick injuries among healthcare workers are a recognised risk."],
              ["Mother-to-child transmission (MTCT)", "HIV can be transmitted from an HIV-positive mother to her child during pregnancy (through the placenta), during labour and delivery, or through breastfeeding. Without intervention, the risk of MTCT is approximately 20–45%. With effective antiretroviral treatment, this risk can be reduced to below 1%."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <ExplainerBox>
            <strong>Undetectable = Untransmittable (U=U):</strong> People living with HIV who are taking ART and have an undetectable viral load (meaning the virus is suppressed to such low levels it cannot be measured in standard blood tests) will NOT transmit HIV to their sexual partners. This is one of the most important scientific findings in HIV prevention — and it means that early access to ART and support to remain on treatment is critical not only for the individual's health but as a powerful prevention tool.
          </ExplainerBox>

          {/* Section 6 */}
          <SectionHeading id="riskfactors" number="Section 6" title="Risk Factors" />
          <div className="space-y-2 mb-5">
            {[
              ["Unprotected anal or vaginal sex", "Having sex without a condom, especially with a person of unknown HIV status, is the primary risk factor for sexual HIV transmission. The risk varies by sex act: receptive anal intercourse carries the highest risk per act."],
              ["Having another STI", "Sexually transmitted infections — syphilis, herpes, chlamydia, gonorrhoea, bacterial vaginosis — dramatically increase the risk of both acquiring and transmitting HIV. STIs cause inflammation, ulcers, and breaks in the mucosal lining, which make it much easier for HIV to enter or exit the body."],
              ["Harmful alcohol and drug use during sex", "Alcohol and drug intoxication impairs judgement and is strongly associated with inconsistent condom use, sexual risk-taking, and higher numbers of sexual partners — all of which increase HIV risk."],
              ["Sharing injecting equipment", "Sharing needles or syringes among people who inject drugs allows HIV (and other blood-borne viruses like Hepatitis C) to be transferred directly from one person's bloodstream to another's."],
              ["Unsafe medical procedures", "Receiving injections or other procedures with unsterilised equipment in poorly regulated healthcare settings can transmit HIV. This is why infection prevention and control (IPC) is a core component of health systems."],
              ["Multiple concurrent sexual partners", "Having multiple simultaneous sexual partnerships significantly increases the probability of exposure to HIV. In high-prevalence settings like Kenya, network effects mean that concurrent partnerships accelerate the spread of HIV through a community far more rapidly than sequential partnerships."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Section 7 */}
          <SectionHeading id="diagnosis" number="Section 7" title="Diagnosis of HIV" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">Early diagnosis is critical — it allows people to start treatment sooner (better health outcomes), access support, and make informed decisions to prevent transmitting HIV to others.</p>
          <div className="space-y-3 mb-4">
            {[
              { method: "Rapid Diagnostic Tests (RDTs)", detail: "The most widely used type of HIV test in Kenya and most of Africa. These tests detect HIV antibodies (proteins the immune system produces in response to HIV infection) in blood, oral fluid, or urine. They provide results within 15–30 minutes — enabling same-day diagnosis and linkage to care. They are used at clinics, voluntary counselling and testing (VCT) centres, and in community-based outreach. WHO-prequalified RDTs are highly accurate (>99% sensitivity and specificity) when used correctly." },
              { method: "The Window Period", detail: "After HIV exposure, there is a 'window period' — typically up to 28 days — during which antibody levels are too low to be detected by standard tests, even though the person has HIV and can transmit it. People who have had a high-risk exposure and test negative should retest after 28 days. More sensitive 4th generation tests (detecting both antibodies and the p24 antigen) shorten the window period to as little as 18 days." },
              { method: "HIV Self-Testing", detail: "Self-test kits are now available in Kenya, allowing people to test themselves in private. A positive self-test must always be confirmed by a trained healthcare worker using the national testing algorithm (two different approved tests). Self-testing is an important tool for reaching people who would not otherwise test, including men, young people, and key populations." },
              { method: "Testing for Infants", detail: "For babies born to HIV-positive mothers, standard antibody tests cannot be used for the first 18 months of life — maternal antibodies are still present in the baby's blood, which causes false positives. Instead, infants need Early Infant Diagnosis (EID) using PCR (Polymerase Chain Reaction) virological testing, ideally at birth or at 6 weeks of age. EID should be done at every opportunity in Kenya." },
              { method: "Confirmatory Testing", detail: "No single positive HIV test is sufficient for diagnosis. WHO and Kenya guidelines require retesting (using a different approved test) before enrolment in treatment and care, to rule out testing or reporting errors. This protects patients from being incorrectly diagnosed and unnecessarily started on treatment." },
            ].map(({ method, detail }) => (
              <div key={method} className="rounded-xl border border-border/60 bg-card/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-border/30 bg-muted/30"><p className="font-semibold text-foreground text-sm">{method}</p></div>
                <p className="px-5 py-4 text-sm text-foreground/80 leading-relaxed">{detail}</p>
              </div>
            ))}
          </div>

          {/* Section 8 */}
          <SectionHeading id="prevention" number="Section 8" title="HIV Prevention Strategies" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-5">HIV is entirely preventable — but no single strategy is 100% effective, so a comprehensive combination of approaches is recommended. WHO and the Kenyan government promote five main categories of prevention:</p>

          {/* Strategy 1 */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 overflow-hidden mb-4">
            <div className="px-5 py-3 border-b border-primary/20 bg-primary/10">
              <p className="font-bold text-foreground">Strategy 1 — Preventing Sexual Transmission</p>
            </div>
            <div className="px-5 py-4 space-y-3">
              {[
                ["Behaviour Change Programmes", "Programmes that encourage consistent and correct condom use, delay in sexual debut (especially among young people), reduction in the number of sexual partners, and avoidance of high-risk sexual practices. These programmes are delivered through schools, community outreach, media campaigns, and peer education. In Kenya, the National AIDS Control Council (NACC) coordinates national behaviour change communication."],
                ["Condom Promotion and Distribution", "Male and female (internal) condoms are highly effective at preventing HIV transmission when used correctly and consistently. The Kenyan government distributes free male and female condoms through public health facilities, NGOs, and community-based organisations. Social marketing of affordable condoms (Salama, Trust) through pharmacies and kiosks extends access. Condoms also prevent other STIs and unintended pregnancies."],
                ["HIV Counselling and Testing (HCT)", "People who know their HIV status are better able to protect themselves and their partners. HCT services include pre-test counselling, the HIV test, post-test counselling (linking positive clients to care, and supporting negative clients to remain HIV-free), and couples counselling. Knowing one's status is the gateway to all other HIV services."],
                ["Diagnosis and Treatment of STIs", "Effective STI treatment reduces HIV transmission risk by healing the genital ulcers and inflammation that facilitate HIV entry and exit. Integrating STI services with HIV testing and prevention is a core component of Kenya's HIV prevention strategy."],
                ["Voluntary Counselling and Testing (VCT)", "VCT is client-initiated testing — the client chooses to seek an HIV test. It can be provided through standalone VCT centres, hospital outpatient departments, mobile testing units, or home-based testing. VCT includes both pre- and post-test counselling. It is distinct from PITC (Provider-Initiated Testing and Counselling), where healthcare providers initiate the conversation about HIV testing with all patients seeking care for any reason."],
              ].map(([t, d]) => (
                <div key={String(t)}>
                  <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy 2 */}
          <SectionHeading id="vmmc" number="Strategy 2" title="Voluntary Medical Male Circumcision (VMMC)" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">
            <strong>VMMC</strong> is the complete, surgical removal of the foreskin of the penis by trained medical professionals in properly equipped settings. It is one of the most evidence-based biomedical HIV prevention interventions available.
          </p>
          <div className="space-y-2 mb-4">
            {[
              ["The evidence", "Three landmark randomised controlled clinical trials conducted between 2005 and 2007 in Kenya (Kisumu), South Africa (Orange Farm), and Uganda (Rakai) conclusively demonstrated that VMMC reduces a man's risk of acquiring HIV through heterosexual vaginal sex by approximately 60–70%. Long-term follow-up of the Kenya and Uganda cohorts and a 2012 meta-analysis confirmed a protective effect of around 70%."],
              ["How it works", "The inner surface of the foreskin contains high concentrations of Langerhans cells and other HIV-target cells. It is also prone to small tears during intercourse. Removing the foreskin therefore removes a major entry point for HIV. Additionally, circumcised men have lower rates of other STIs (including HSV-2, HPV, and bacterial infections) which further reduces HIV risk."],
              ["Limitations", "VMMC reduces but does not eliminate HIV risk — it does NOT replace condoms. VMMC provides no direct protection to female partners, and it does not protect against HIV transmission through anal sex. It is most beneficial for heterosexual men in high-prevalence settings."],
              ["Kenya's VMMC programme", "Kenya was one of the original trial sites (Kisumu) and has been a global leader in VMMC scale-up. The government's VMMC programme has circumcised millions of men in western Kenya (Nyanza and Western regions, which historically had low circumcision rates and high HIV prevalence) through a combination of fixed clinic sites, mobile outreach campaigns, and community mobilisation."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Section 9 */}
          <SectionHeading id="prep-pep" number="Section 9" title="PrEP and PEP — Antiretroviral Prevention" />
          <div className="grid md:grid-cols-2 gap-4 mb-5">
            <div className="rounded-xl border border-primary/20 bg-primary/5 overflow-hidden">
              <div className="px-5 py-3 border-b border-primary/20 bg-primary/10">
                <p className="font-bold text-foreground">PrEP — Pre-Exposure Prophylaxis</p>
              </div>
              <div className="px-5 py-4 text-sm text-foreground/80 leading-relaxed space-y-2">
                <p>PrEP is antiretroviral medication taken by HIV-negative people <strong>before</strong> potential HIV exposure to prevent infection. When taken consistently, oral PrEP (tenofovir/emtricitabine — sold as Truvada) reduces HIV acquisition risk by <strong>more than 99%</strong>.</p>
                <p><strong>Who it's for:</strong> People at substantial ongoing risk — including serodiscordant couples (one partner HIV-positive, one negative), sex workers, men who have sex with men (MSM), and people who inject drugs.</p>
                <p><strong>Kenya:</strong> The Ministry of Health began scaling up PrEP in 2017. It is available free at many public health facilities. Long-acting injectable PrEP (cabotegravir injections every 2 months) and the dapivirine vaginal ring are newer alternatives for people who struggle with daily oral pills.</p>
              </div>
            </div>
            <div className="rounded-xl border border-secondary/20 bg-secondary/5 overflow-hidden">
              <div className="px-5 py-3 border-b border-secondary/20 bg-secondary/10">
                <p className="font-bold text-foreground">PEP — Post-Exposure Prophylaxis</p>
              </div>
              <div className="px-5 py-4 text-sm text-foreground/80 leading-relaxed space-y-2">
                <p>PEP is antiretroviral medication taken by HIV-negative people <strong>after</strong> a potential HIV exposure — such as unprotected sex, a needlestick injury, or sexual assault — to prevent the virus from establishing a permanent infection.</p>
                <p><strong>Critical timing:</strong> PEP must be started within <strong>72 hours (3 days)</strong> of exposure — the sooner the better. It must be taken daily for <strong>28 days</strong>. It is not 100% effective and is not a substitute for regular prevention.</p>
                <p><strong>Kenya:</strong> PEP is available free at public hospitals and HIV clinics. It is also provided as part of sexual assault response services. Healthcare workers who experience needlestick injuries should be given PEP immediately.</p>
              </div>
            </div>
          </div>

          {/* Section 10 */}
          <SectionHeading id="pmtct" number="Section 10" title="Preventing Mother-to-Child Transmission (PMTCT)" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            PMTCT — also called <strong>elimination of mother-to-child transmission (eMTCT)</strong> — refers to a set of interventions that prevent HIV-positive pregnant women from passing the virus to their babies. Without any intervention, the risk of MTCT is 20–45%. With full PMTCT implementation, this risk falls to below 1%.
          </p>
          <div className="space-y-2 mb-4">
            {[
              ["Primary prevention for women of childbearing age", "The first and most fundamental PMTCT prong is preventing HIV infection in women in the first place — through all the sexual transmission prevention strategies described above. An HIV-negative woman cannot transmit HIV to her baby."],
              ["HIV testing in antenatal care (ANC)", "All pregnant women attending antenatal clinics in Kenya are offered HIV testing as a routine part of ANC. This identifies HIV-positive mothers so they can be started on treatment and monitored. Partners of pregnant women are also encouraged to test."],
              ["ART for all HIV-positive pregnant and breastfeeding women", "Kenya adopted WHO's 'Option B+' in 2014, then the 'Treat All' policy — meaning all HIV-positive pregnant and breastfeeding women are started on ART immediately, regardless of CD4 count or clinical stage, and continue ART for life. This protects both the mother's health and prevents transmission to the baby during pregnancy, delivery, and breastfeeding."],
              ["Safe delivery practices", "For women with high viral loads despite ART, Caesarean section (C-section) delivery can reduce the risk of HIV transmission during birth. Avoiding invasive procedures like episiotomies and early rupture of membranes also reduces MTCT risk during labour."],
              ["Safe infant feeding", "WHO and the Kenyan government recommend that HIV-positive mothers on ART who are virally suppressed can breastfeed safely, because ART reduces the risk of HIV transmission through breastmilk to very low levels. Where breastfeeding is not possible, safe replacement feeding (commercial infant formula) can be used with appropriate support. The choice depends on the mother's clinical situation, local context, and access to clean water."],
              ["Infant prophylaxis and EID", "HIV-exposed babies (born to HIV-positive mothers) are given nevirapine syrup daily for 6–12 weeks after birth as prophylaxis. They are tested using Early Infant Diagnosis (PCR test) at 6 weeks of age. Follow-up testing is done at 6 months, 12 months, and at cessation of breastfeeding."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Strategy 3 — blood-borne */}
          <div className="rounded-xl border border-amber-300/30 bg-amber-50/20 dark:bg-amber-900/10 overflow-hidden mb-6">
            <div className="px-5 py-3 border-b border-amber-300/30">
              <p className="font-bold text-foreground">Strategy 3 — Preventing Blood-Borne Transmission</p>
            </div>
            <div className="px-5 py-4 space-y-3 text-sm text-foreground/80">
              {[
                ["Needle and Syringe Programmes (NSPs)", "Providing clean, sterile injecting equipment to people who inject drugs prevents HIV (and Hepatitis C) transmission through shared needles. NSPs are a core component of 'harm reduction' — meeting people where they are rather than demanding abstinence before offering health services."],
                ["Opioid Substitution Therapy (OST)", "Methadone maintenance therapy (MMT) and buprenorphine are provided in Kenya through medically assisted therapy (MAT) programmes, primarily in Nairobi and Mombasa. OST reduces illicit drug use, improves health outcomes, and dramatically reduces needle sharing and HIV transmission among people who inject drugs. Kenya's harm reduction programmes offer drop-in centres, HIV/TB testing, and MAT."],
                ["Blood Safety", "All donated blood in Kenya is routinely screened for HIV (and Hepatitis B, C, and syphilis) before transfusion. The Kenya National Blood Transfusion Service (KNBTS) manages a national blood safety programme. Voluntary, non-remunerated blood donation is the safest source."],
                ["Infection Prevention and Control (IPC) in Healthcare", "Universal precautions — treating all blood and body fluids as potentially infectious — protect healthcare workers and patients from HIV transmission. This includes using gloves, safe injection practices (one needle, one syringe, one patient, one time), and safe disposal of sharps. Healthcare workers who experience needlestick injuries must receive PEP immediately."],
              ].map(([t, d]) => (
                <div key={String(t)}>
                  <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                  <p className="text-muted-foreground leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 11 */}
          <SectionHeading id="treatment" number="Section 11" title="Treatment — Antiretroviral Therapy (ART)" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            There is currently <strong>no cure</strong> for HIV infection. However, <strong>Antiretroviral Therapy (ART)</strong> is a powerful treatment that suppresses HIV replication in the body, allowing the immune system to recover and maintain its protective function. ART does not eliminate HIV from the body — it controls it.
          </p>
          <div className="space-y-3 mb-4">
            {[
              ["How ART works", "ART consists of a combination of at least three antiretroviral drugs from at least two different drug classes. Each class blocks HIV at a different step in its replication cycle: some prevent HIV from entering cells (entry/fusion inhibitors), some prevent it from converting its RNA to DNA (reverse transcriptase inhibitors — NRTIs and NNRTIs), some prevent it from inserting its DNA into the cell's DNA (integrase inhibitors), and some prevent it from assembling new viral particles (protease inhibitors). Using three drugs simultaneously prevents the virus from developing resistance to any single drug."],
              ["What ART achieves", "When taken correctly and consistently, ART: suppresses viral load to undetectable levels (within 6 months for most people); allows CD4 count to recover toward normal levels; prevents progression to AIDS; prevents development of opportunistic infections; reduces mortality dramatically; prevents transmission to sexual partners (U=U — undetectable = untransmittable); and allows people to live long, healthy, productive lives."],
              ["ART must be taken for life", "ART does not cure HIV — it controls it. If ART is stopped, the virus rebounds rapidly. People on ART must take their medications every day, at the same time, for the rest of their lives. Missed doses allow the virus to replicate, which can lead to drug resistance, making the virus harder to treat."],
              ["First-line regimen in Kenya", "Kenya's current first-line ART regimen (2024) for adults is Dolutegravir (DTG) + Tenofovir + Lamivudine — a fixed-dose combination (FDC) taken once daily. Dolutegravir has replaced older regimens because it is more potent, has fewer side effects, and has a higher barrier to resistance development. Viral load monitoring every 6 months is used to confirm treatment success."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Section 12 */}
          <SectionHeading id="kenya-art" number="Section 12" title="ART in Kenya — Progress and Challenges" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">Kenya adopted WHO's recommendation to immediately offer ART to all HIV-diagnosed people ('Treat All') in 2016. This was a landmark policy shift from the previous approach of waiting until CD4 counts fell below 350 or 500 cells/mm³.</p>
          <div className="space-y-2 mb-4">
            {[
              ["Progress", "By 2016, 940,000 adults and 60,000 children in Kenya were on ART. Coverage is improving, and Kenya has made remarkable progress toward the 95-95-95 targets. In 2015, 64% of people on ART in Kenya had suppressed viral loads."],
              ["Adolescents — a critical gap", "Adolescents are consistently the most difficult group to reach with HIV treatment. AIDS remains the leading cause of death among adolescents in Kenya. In 2014, only 34,800 out of 141,000 adolescents (10–19 years) with known HIV-positive status were on ART. Barriers include stigma, disclosure difficulties, transition from paediatric to adult care, and poor health system responsiveness to young people's needs."],
              ["Key populations", "ART coverage is lowest among key populations — the groups most affected by HIV. Coverage among men who have sex with men (MSM) was only 6%, and among female sex workers (FSW) only 34% in 2016. Criminalisation, stigma, and discrimination prevent these groups from accessing services."],
              ["Drug resistance", "Poor adherence to ART can lead to the development of drug-resistant HIV strains. Drug resistance monitoring is not yet routinely conducted in Kenya, making it difficult to track levels of resistance in the population. Maintaining adherence support — through counselling, peer support groups, and differentiated service delivery models — is critical."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Section 13 */}
          <SectionHeading id="social" number="Section 13" title="Social Strategies and Supportive Policies" />
          <p className="text-sm text-foreground/80 leading-relaxed mb-3">Biomedical strategies alone cannot end HIV — the social, structural, and policy environment profoundly shapes HIV risk and access to services.</p>
          <div className="space-y-2 mb-5">
            {[
              ["HIV awareness campaigns", "Mass media campaigns (radio, TV, social media), community outreach, and school-based education programmes raise awareness about HIV transmission, prevention, testing, and treatment. In Kenya, the NACC and Ministry of Health coordinate national campaigns. Community health workers (CHWs) play a crucial front-line role in household-level HIV education."],
              ["Anti-stigma measures", "HIV-related stigma and discrimination remain major barriers to testing and treatment. People fear rejection by partners, families, and communities; discrimination in employment and healthcare; and breach of confidentiality. Anti-stigma interventions include public education, community dialogue, engagement of people living with HIV (PLHIV) as ambassadors, and legal protections against discrimination. The Kenya HIV and AIDS Prevention and Control Act (HAPCA 2006) prohibits HIV-related discrimination."],
              ["Gender equity and women's empowerment", "Women — especially young women in sub-Saharan Africa — bear a disproportionate burden of HIV infection. Gender inequalities (women's limited power to negotiate condom use or refuse sex, economic dependence on partners, sexual violence) drive HIV risk. Programmes that promote girls' education, economic empowerment of women, and address gender-based violence are powerful structural HIV prevention tools."],
              ["Community and PLHIV involvement", "The 'greater involvement of people living with HIV/AIDS' (GIPA) principle, endorsed by the UN, recognises that PLHIV have a right to be meaningfully involved in designing and implementing HIV responses. Peer support networks, community advisory boards, and PLHIV leadership in advocacy are all components of a rights-based response."],
              ["Visible political leadership", "High-level political commitment to HIV — as demonstrated by political leaders speaking openly about HIV, protecting human rights, and ensuring adequate funding — has been critical to the success of national HIV programmes. Countries where political leaders denied or minimised the HIV epidemic (as occurred in South Africa under President Mbeki in the early 2000s) experienced catastrophic consequences."],
              ["Legal reform", "Laws that criminalise same-sex relations, sex work, or drug use drive these populations underground and away from health services, fuelling HIV transmission. Supportive legal environments — decriminalisation of needle possession, non-discriminatory healthcare laws — are associated with better HIV outcomes."],
            ].map(([t, d]) => (
              <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4">
                <p className="font-semibold text-foreground text-sm mb-1">{t}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — HIV Prevention Strategies</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              {[
                "HIV attacks CD4+ T-cells; AIDS is the advanced stage (CD4 <200 cells/mm³). ART controls HIV but does not cure it.",
                "39.9 million people globally; Kenya prevalence 3.7% (adults 15–49, 2022); no cure but highly effective treatment available.",
                "Three stages: Acute (flu-like, most infectious), Chronic (often asymptomatic, years), AIDS (severe immune failure).",
                "Transmitted via blood, semen, vaginal fluids, rectal fluids, breast milk. NOT by casual contact, hugging, sharing food.",
                "U=U: Undetectable viral load on ART = Untransmittable to sexual partners.",
                "5 Prevention Strategies: (1) Sexual (condoms, behaviour change, VCT, STI treatment); (2) VMMC (~70% protection); (3) Blood-borne (NSPs, blood safety, IPC); (4) PMTCT (<1% risk with full intervention); (5) Social (anti-stigma, legal reform, gender equity).",
                "PrEP: daily ARV for HIV-negative high-risk people (>99% effective). PEP: 72-hour emergency ARV after exposure (28-day course).",
                "ART first-line in Kenya: DTG + Tenofovir + Lamivudine, once daily, for life. Viral load monitoring every 6 months.",
                "Adolescents and key populations remain hardest to reach with services in Kenya.",
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
