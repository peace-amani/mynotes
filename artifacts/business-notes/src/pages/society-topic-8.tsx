import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/layout";
import { ArrowUp, Info, Lightbulb, CheckCircle2 } from "lucide-react";

const sections = [
  { id: "attitudes", label: "1. Attitude Formation & Change" },
  { id: "leadership", label: "2. Leadership" },
  { id: "group-stages", label: "3. Group Stages" },
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

export default function SocietyTopic8() {
  const [activeSection, setActiveSection] = useState("attitudes");
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
    <Layout breadcrumbs={[{ label: "Unit 3", href: "/" }, { label: "Week 8: Leadership & Group Dynamics" }]}>
      <Helmet><title>Leadership and Group Dynamics | Study Notes</title></Helmet>
      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10"><div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} /></div>
      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl">
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Week 8 · Society &amp; Culture</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">Leadership and Group Dynamics</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">Understanding how groups form, develop, and are led is fundamental to social life. Whether in classrooms, workplaces, communities, or nations, human beings organise in groups — and those groups are shaped by the attitudes of their members and the quality of their leadership.</p>
          </div>

          <SectionHeading id="attitudes" number="Section 1" title="Attitude Formation and Change" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">An <strong>attitude</strong> is a relatively stable evaluation of a person, group, object, or concept as favourable or unfavourable, positive or negative. Attitudes have three components:</p>
          <div className="grid md:grid-cols-3 gap-3 mb-5">
            {[
              ["Cognitive component", "What we believe or think about something. 'Corruption is harmful to society.'"],
              ["Affective component", "How we feel about something. 'I feel angry when I see corruption.'"],
              ["Behavioural component", "How we act toward something. 'I refuse to pay bribes.'"],
            ].map(([t, d]) => <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4"><p className="font-semibold text-foreground text-sm mb-1">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>)}
          </div>

          <h3 className="font-semibold text-foreground text-base mt-5 mb-3">How Attitudes Are Formed</h3>
          <div className="space-y-3 mb-5">
            {[
              ["Direct experience", "First-hand encounters with people, objects, or situations are among the most powerful attitude-forming experiences. A student who has experienced encouraging teachers develops a positive attitude toward education. A person robbed in a specific neighbourhood develops a negative attitude toward that area. Direct experience creates strong, durable attitudes."],
              ["Socialisation", "The family, school, religion, peer group, and media all transmit attitudes as part of the socialisation process. Children absorb the political, religious, and social attitudes of their families before they have the cognitive capacity to evaluate them independently. These early-formed attitudes tend to be deeply embedded and resistant to change."],
              ["Classical conditioning", "Attitudes can be formed through association. If a product is repeatedly paired with a beautiful person in advertising, consumers develop a positive attitude toward the product through association — even without conscious evaluation. Propaganda works by associating political figures or ideas with emotionally positive or negative stimuli."],
              ["Cognitive learning", "Through observation, reading, and education, we develop attitudes by processing and evaluating information. We can develop attitudes about people we have never met (e.g., historical figures, foreign nations, celebrities) purely through information we receive about them."],
              ["Group membership and social identity", "We adopt the attitudes of groups we belong to or aspire to belong to. University students adopt the academic culture's attitudes toward research and critical thinking; new employees adopt workplace norms; religious converts adopt the theological and moral attitudes of their new faith community."],
            ].map(([t, d]) => <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4"><p className="font-semibold text-foreground text-sm mb-1">{t}</p><p className="text-sm text-muted-foreground leading-relaxed">{d}</p></div>)}
          </div>

          <h3 className="font-semibold text-foreground text-base mt-5 mb-3">How Attitudes Change</h3>
          <div className="space-y-3 mb-5">
            {[
              ["Persuasive communication", "Attitudes can be changed by compelling arguments, credible sources, and effective communication. The effectiveness of persuasion depends on the credibility of the communicator, the strength of the arguments, and the emotional receptivity of the audience. Political speeches, advertising, and public health campaigns all aim to change attitudes through persuasive communication."],
              ["Cognitive dissonance", "Leon Festinger (1957) argued that people experience psychological discomfort (dissonance) when their attitudes and behaviours conflict. To reduce this discomfort, they change either their behaviour or their attitude. A smoker who knows smoking is dangerous experiences dissonance and may reduce it by changing their attitude ('the research is exaggerated') or their behaviour (quitting smoking)."],
              ["Contact hypothesis", "Gordon Allport argued that direct, positive contact between members of different groups reduces prejudice and changes negative attitudes. When people of different ethnic, religious, or social groups work together toward common goals under conditions of equal status, prejudice decreases and more positive attitudes develop. This is the theoretical basis for desegregation, integrated housing, and inter-ethnic cooperation programmes."],
              ["Life experiences and role changes", "Major life events — marriage, parenthood, bereavement, migration, career changes — can profoundly alter attitudes. A person who becomes a parent often develops different attitudes toward children's welfare, education policy, and community safety. Someone who loses a family member to illness may develop different attitudes toward healthcare policy."],
              ["Social pressure and normative influence", "People change their attitudes to conform to the expectations of groups they care about. This can be positive (peer support groups helping members develop healthy attitudes) or negative (peer pressure leading young people to adopt hostile or self-destructive attitudes)."],
            ].map(([t, d]) => <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4"><p className="font-semibold text-foreground text-sm mb-1">{t}</p><p className="text-sm text-muted-foreground leading-relaxed">{d}</p></div>)}
          </div>

          <SectionHeading id="leadership" number="Section 2" title="Leadership" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4"><strong>Leadership</strong> is the ability to influence others toward the achievement of goals. It is a process of social influence in which one person (the leader) guides, motivates, and directs the behaviour of others (followers) toward a common purpose.</p>
          <h3 className="font-semibold text-foreground text-base mt-5 mb-3">Leadership Theories</h3>
          <div className="space-y-3 mb-5">
            {[
              ["Trait Theory", "Early leadership research sought to identify the personal qualities that make great leaders — arguing that leaders are born, not made. Traits associated with leadership include: intelligence, self-confidence, determination, integrity, sociability, emotional intelligence, and decisiveness. While traits matter, trait theory alone is insufficient — many people with 'leadership traits' are poor leaders in practice, while many effective leaders do not fit the typical 'leader' profile."],
              ["Behavioural Theory", "Rather than focusing on who leaders are, behavioural theory focuses on what leaders do. Two key dimensions of leadership behaviour were identified: task-orientation (focusing on completing the work, setting goals, organising activities) and people-orientation (focusing on relationships, motivation, and the well-being of team members). Effective leaders balance both."],
              ["Situational/Contingency Theory", "No single leadership style is best in all situations. The most effective leadership style depends on the situation — including the maturity and capability of followers, the urgency of the task, and the complexity of the problem. Hersey and Blanchard's Situational Leadership model suggests that leaders should adapt their style (telling, selling, participating, delegating) to the readiness level of their followers."],
              ["Transformational Leadership", "Transformational leaders inspire followers to transcend their own self-interest for the good of the organisation or cause. They create a compelling vision, communicate it passionately, challenge followers to innovate, and develop the leadership capacity of their followers. Kenya's Wangari Maathai exemplified transformational leadership — inspiring thousands of ordinary women to plant trees as an act of environmental and political empowerment."],
            ].map(([t, d]) => <div key={String(t)} className="rounded-lg border border-border/60 bg-card/50 p-4"><p className="font-semibold text-foreground text-sm mb-1">{t}</p><p className="text-sm text-muted-foreground leading-relaxed">{d}</p></div>)}
          </div>

          <h3 className="font-semibold text-foreground text-base mt-5 mb-3">Leadership Styles</h3>
          <div className="overflow-x-auto mb-5">
            <table className="text-sm border border-border/40 w-full text-left">
              <thead className="bg-muted/40"><tr><th className="px-4 py-2 border-b border-border/40 font-semibold">Style</th><th className="px-4 py-2 border-b border-border/40 font-semibold">Description</th><th className="px-4 py-2 border-b border-border/40 font-semibold">Best for</th><th className="px-4 py-2 border-b border-border/40 font-semibold">Risk</th></tr></thead>
              <tbody className="divide-y divide-border/20">
                {[
                  ["Autocratic", "Leader makes all decisions alone; expects compliance. Clear chain of command.", "Crisis situations; unskilled workers; when speed is essential.", "Resentment; suppresses creativity; poor morale."],
                  ["Democratic", "Leader involves team in decisions; consensus-building; shared authority.", "Creative work; highly skilled teams; long-term planning.", "Slow decision-making; may stall under crisis."],
                  ["Laissez-faire", "Leader delegates decision-making entirely; minimal direction.", "Highly motivated, self-directed experts.", "Chaos and lack of direction if team is not self-driven."],
                  ["Transformational", "Inspires through vision and values; develops followers; challenges status quo.", "Organisational change; complex challenges; building movements.", "Can overreach; followers may become dependent on leader's vision."],
                  ["Servant", "Leader prioritises the needs of followers; leads through service and support.", "Community organisations; social movements; education.", "May be seen as weak; can be exploited."],
                ].map(([style, desc, best, risk]) => <tr key={String(style)}><td className="px-4 py-2 font-semibold text-foreground">{style}</td><td className="px-4 py-2 text-muted-foreground text-xs">{desc}</td><td className="px-4 py-2 text-muted-foreground text-xs">{best}</td><td className="px-4 py-2 text-muted-foreground text-xs">{risk}</td></tr>)}
              </tbody>
            </table>
          </div>

          <SectionHeading id="group-stages" number="Section 3" title="Group Stages — Tuckman's Model" />
          <p className="text-base text-foreground/80 leading-relaxed mb-4">Psychologist Bruce Tuckman (1965) identified four stages through which groups typically develop. He later added a fifth stage. Understanding these stages helps leaders and group members navigate group development more effectively.</p>
          <div className="space-y-4 mb-5">
            {[
              { stage: "Stage 1: Forming", color: "border-blue-300/40 bg-blue-50/30 dark:bg-blue-900/10", desc: "Group members come together for the first time. There is excitement, anxiety, and uncertainty. Members are polite and tentative — testing the waters, figuring out roles and rules. Dependence on the leader is high. Little real work gets done yet as members focus on orientation and relationship-building.", example: "Your group for the UCCC 1103 social processes presentation meets for the first time. Everyone is polite, introduces themselves, and tentatively suggests ideas without committing to anything." },
              { stage: "Stage 2: Storming", color: "border-red-300/40 bg-red-50/30 dark:bg-red-900/10", desc: "Conflict emerges as members begin to assert their personalities, opinions, and preferred ways of working. There are power struggles, disagreements over goals and methods, competition for roles, and challenges to the leader's authority. This is the most uncomfortable stage, and many groups get stuck here or collapse. However, navigating conflict successfully is essential for the group's development.", example: "Two group members disagree on how to divide the work. One wants to present all five processes separately; another wants to integrate them by theme. Tension builds. The leader must facilitate resolution without suppressing the disagreement." },
              { stage: "Stage 3: Norming", color: "border-amber-300/40 bg-amber-50/30 dark:bg-amber-900/10", desc: "The group begins to find its rhythm. Members resolve their differences, establish clear roles and norms of behaviour, develop trust, and begin to work cooperatively. Group cohesion grows. Members begin to feel a sense of group identity — 'us' rather than 'me.' The leader can begin to step back and share responsibility more broadly.", example: "After the conflict, the group agrees on a clear division of responsibilities, establishes a WhatsApp group for communication, agrees on meeting times, and commits to a shared structure for the presentation. Trust grows and productivity increases." },
              { stage: "Stage 4: Performing", color: "border-green-300/40 bg-green-50/30 dark:bg-green-900/10", desc: "The group reaches its peak productivity and effectiveness. Members work together smoothly, support each other, solve problems creatively, and achieve high-quality outcomes. Interdependence is high. The leader can focus on facilitation and removing obstacles rather than directing individual work. This is the stage at which the group achieves its purpose.", example: "The group is producing excellent presentation slides, rehearsing effectively, supporting each other's weak areas, and delivering high-quality analysis of each social process. Everyone is contributing and morale is high." },
              { stage: "Stage 5: Adjourning (Mourning)", color: "border-purple-300/40 bg-purple-50/30 dark:bg-purple-900/10", desc: "The group's task is completed and it disbands. Members may feel pride in their achievement but also loss at the end of a meaningful group experience. This stage requires the leader to help members process the transition, celebrate achievements, and close the group experience constructively. Some members may resist adjournment by finding reasons to extend the group's life.", example: "After the presentation, the group celebrates over lunch, shares feedback on each other's contributions, and says goodbye. Some members feel genuine sadness that the group is ending — they had formed real bonds." },
            ].map(({ stage, color, desc, example }) => (
              <div key={stage} className={`rounded-xl border ${color} overflow-hidden`}>
                <div className="px-5 py-3 border-b border-border/20 bg-white/20 dark:bg-black/10"><p className="font-semibold text-foreground text-sm">{stage}</p></div>
                <div className="px-5 py-4 space-y-2">
                  <p className="text-sm text-foreground/80 leading-relaxed">{desc}</p>
                  <div className="pl-3 border-l-2 border-primary/30"><p className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">Example</p><p className="text-xs text-muted-foreground leading-relaxed">{example}</p></div>
                </div>
              </div>
            ))}
          </div>
          <ExplainerBox><strong>Why group stages matter for your presentation:</strong> Your presentation group will go through these stages whether you are aware of them or not. Understanding the model helps you: recognise that storming is normal and survivable (don't dissolve the group when conflict arises); understand that norming requires deliberate effort to establish shared expectations; facilitate the performing stage by clarifying roles, communication channels, and accountability; and close the experience constructively in adjourning. Groups that skip the harder stages (storming, norming) often fail to reach the performing stage.</ExplainerBox>

          <div className="mt-10 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Quick Summary — Week 8</h3>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Attitude</strong> = stable evaluation (cognitive + affective + behavioural components). Formed through: experience, socialisation, conditioning, learning, group membership.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Attitude change:</strong> persuasion, cognitive dissonance, contact hypothesis, life events, social pressure.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Leadership styles:</strong> autocratic, democratic, laissez-faire, transformational, servant.</span></li>
              <li className="flex gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /><span><strong>Tuckman's group stages:</strong> Forming (polite, uncertain) → Storming (conflict) → Norming (cohesion, roles) → Performing (productive) → Adjourning (closure).</span></li>
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
