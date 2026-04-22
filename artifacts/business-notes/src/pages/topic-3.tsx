import { Helmet } from "react-helmet-async";
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, Info, Lightbulb, AlertTriangle, CheckCircle2 } from "lucide-react";

const sections = [
  { id: "overview", label: "1. Why Study History of Management?" },
  { id: "pre-classical", label: "2. Pre-Scientific Era" },
  { id: "scientific", label: "3. Scientific Management — Taylor" },
  { id: "administrative", label: "4. Administrative Management — Fayol" },
  { id: "fayol-principles", label: "5. Fayol's 14 Principles" },
  { id: "bureaucratic", label: "6. Bureaucratic Theory — Weber" },
  { id: "classical-critique", label: "7. Critique of Classical School" },
  { id: "hawthorne", label: "8. Hawthorne Studies" },
  { id: "human-relations", label: "9. Human Relations Movement" },
  { id: "maslow", label: "10. Maslow's Hierarchy of Needs" },
  { id: "mcgregor", label: "11. Theory X and Theory Y — McGregor" },
  { id: "herzberg", label: "12. Herzberg's Two-Factor Theory" },
  { id: "quantitative", label: "13. Quantitative School" },
  { id: "systems", label: "14. Systems Theory" },
  { id: "contingency", label: "15. Contingency Theory" },
  { id: "modern", label: "16. Modern Approaches" },
  { id: "comparison", label: "17. Schools Comparison Table" },
];

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
    <div className="my-4 flex gap-3 rounded-lg border border-secondary/30 bg-secondary/5 p-4">
      <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
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

function SectionHeading({ id, number, title }: { id: string; number: string; title: string }) {
  return (
    <div id={id} className="scroll-mt-20 pt-12 pb-4 border-b border-border/60 mb-6">
      <p className="text-xs font-bold tracking-widest text-primary uppercase mb-1">{number}</p>
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground">{title}</h2>
    </div>
  );
}

export default function Topic3() {
  const [activeSection, setActiveSection] = useState("overview");
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
        .map((s) => {
          const el = document.getElementById(s.id);
          return el ? { id: s.id, top: el.getBoundingClientRect().top } : null;
        })
        .filter(Boolean)
        .filter((s) => s!.top <= 120);
      if (current.length > 0) setActiveSection(current[current.length - 1]!.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sectionIndex = sections.findIndex((s) => s.id === activeSection);
  const progress = Math.round(((sectionIndex + 1) / sections.length) * 100);

  return (
    <Layout
      breadcrumbs={[
        { label: "Unit 1 — Business Management", href: "/" },
        { label: "Evolution of Management Thought" },
      ]}
    >
      <Helmet>
        <title>Evolution of Management Thought | Unit 1 Business Management | Study Notes</title>
        <meta name="description" content="Evolution of management thought — classical, behavioural, quantitative, systems, contingency, and modern schools. BCom notes for Technical University of Kenya." />
      </Helmet>

      <div className="fixed top-14 left-0 md:left-64 right-0 h-0.5 bg-primary/20 z-10">
        <div className="h-full bg-primary transition-all duration-150" style={{ width: `${readProgress}%` }} />
      </div>

      <div className="flex gap-8 px-4 sm:px-6 py-8 max-w-7xl mx-auto">
        <div className="flex-1 min-w-0 max-w-3xl" ref={contentRef}>

          {/* Hero */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-widest text-secondary uppercase mb-3">Unit 1 — Business Management</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground mb-4 leading-tight">
              Evolution of Management Thought
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Management theory did not spring up overnight. It evolved over more than a century — shaped by industrial revolutions, world wars, psychological research, technological change, and the lived experience of millions of workers and managers. Understanding this evolution tells you not just <em>how</em> management is practised today, but <em>why</em> — and what the alternatives are when things go wrong.
            </p>
          </div>

          {/* SECTION 1 */}
          <SectionHeading id="overview" number="Section 1" title="Why Study the History of Management Thought?" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Before diving into the specific schools, it is worth asking: why does a BCom student need to study management theories from the 1880s? The answer is that every management practice you will encounter in your career — performance appraisals, organisational charts, team-building, quality control, strategic planning — has roots in these theories. Understanding the roots helps you use the tools intelligently.
          </p>

          <ExplainerBox>
            <strong>The Timeline at a Glance:</strong><br /><br />
            <strong>Pre-1880s:</strong> Management by instinct and tradition — no formal theory<br />
            <strong>1880s–1930s:</strong> Classical School — efficiency, structure, rules (Taylor, Fayol, Weber)<br />
            <strong>1930s–1960s:</strong> Behavioural/Neo-Classical School — people, motivation, human relations (Mayo, Maslow, McGregor, Herzberg)<br />
            <strong>1940s–1970s:</strong> Quantitative School — mathematical models, operations research<br />
            <strong>1960s–1970s:</strong> Systems Theory — the organisation as an interconnected whole<br />
            <strong>1970s–1980s:</strong> Contingency Theory — no single best way; context matters<br />
            <strong>1980s–present:</strong> Modern approaches — TQM, learning organisations, knowledge management, strategic management
          </ExplainerBox>

          <NoteBox>
            <strong>Exam tip:</strong> Each school of thought arose partly as a response to the limitations of the schools that came before it. When you study each school, always note: (1) what problem it was trying to solve, (2) who its key thinkers were, (3) what its core assumptions are, and (4) what its main criticisms are.
          </NoteBox>

          {/* SECTION 2 */}
          <SectionHeading id="pre-classical" number="Section 2" title="The Pre-Scientific Management Era (Before 1880s)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Before formal management theory existed, businesses and organisations were managed based on <strong>tradition, intuition, trial and error, and the personal authority</strong> of owners or military-style commanders. There was no concept of studying management as a discipline.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Early Contributors Worth Knowing</h3>

          <div className="space-y-4 mb-6">
            {[
              {
                name: "Robert Owen (1771–1858)",
                contribution: "A Welsh industrialist and social reformer who argued that improving workers' living and working conditions would increase productivity. He reduced working hours, provided decent housing for workers, and refused to employ young children in his cotton mills in Scotland. He believed management had a responsibility to workers' welfare — a radical idea for his time. Owen is often called the father of personnel management.",
              },
              {
                name: "Charles Babbage (1791–1871)",
                contribution: "A British mathematician and inventor who argued that scientific principles should be applied to work processes to reduce waste and increase efficiency. He advocated dividing labour so that each worker performs only the tasks their skills are suited for — an early articulation of what Taylor would later develop into Scientific Management. He is sometimes called the father of operations research.",
              },
              {
                name: "Adam Smith (1723–1790)",
                contribution: "In his landmark work 'The Wealth of Nations' (1776), Smith demonstrated the enormous productivity gains from the division of labour. His famous example: in a pin factory, one worker making pins from start to finish might produce 20 pins a day. But 10 workers each specialising in a different step of the process could produce 48,000 pins a day. This insight underpinned the industrial revolution and shaped almost all management thinking that followed.",
              },
            ].map((item) => (
              <Card key={item.name} className="border-border">
                <CardContent className="p-4">
                  <p className="font-semibold text-foreground mb-2">{item.name}</p>
                  <p className="text-sm text-foreground/75 leading-relaxed">{item.contribution}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The <strong>Industrial Revolution</strong> (late 18th to 19th century) created the conditions that made formal management theory necessary. Factories replaced cottage industries. Thousands of workers were brought under one roof. Steam-powered machinery created entirely new production processes. Someone had to figure out how to coordinate this complexity — and that need gave birth to management as a discipline.
          </p>

          {/* SECTION 3 */}
          <SectionHeading id="scientific" number="Section 3" title="Scientific Management — Frederick Winslow Taylor (1856–1915)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Frederick Winslow Taylor</strong> is widely regarded as the <strong>"Father of Scientific Management."</strong> He was an American mechanical engineer who worked his way up from an apprentice to chief engineer at Midvale Steel Works in Philadelphia. It was there that he first noticed — and was infuriated by — what he called <strong>"soldiering"</strong>: workers deliberately working far below their capacity to protect their jobs and avoid management setting higher output expectations.
          </p>

          <ExplainerBox>
            Taylor's central question was simple but revolutionary: <em>"What is the one best way to do this job?"</em> He believed that for every task, there exists a scientifically optimal method — the right tools, the right motions, the right pace — and that finding and enforcing that method would dramatically increase output. Management's job was to discover that best method; workers' job was to follow it precisely.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Taylor's Core Principles of Scientific Management</h3>

          <div className="space-y-4 mb-6">
            {[
              {
                num: "1",
                title: "Develop a Science for Each Element of Work",
                body: "Replace rule-of-thumb work methods with methods based on scientific study. Taylor used time-and-motion studies — breaking every job into its smallest component movements, timing each movement with a stopwatch, eliminating unnecessary motions, and establishing the precise sequence and time for each step. This produced the 'one best way.'",
              },
              {
                num: "2",
                title: "Scientifically Select, Train, and Develop Workers",
                body: "Instead of allowing workers to choose their own tasks and train themselves, management should scientifically select the worker most physically and mentally suited to each job, and then systematically train them in the 'one best way.' Taylor opposed the common practice of assigning anyone to any available job.",
              },
              {
                num: "3",
                title: "Cooperate with Workers to Ensure Work is Done According to the Science",
                body: "Management must cooperate heartily with workers — providing the tools, incentives, and environment defined by the scientific study. This represented a mental revolution: instead of management and workers being adversaries, they should work together toward the common goal of maximum efficiency.",
              },
              {
                num: "4",
                title: "Divide Work and Responsibility Equally Between Management and Workers",
                body: "Management should take over all work for which it is better suited than the workers — meaning the planning, organising, and supervisory work. Workers should concentrate on execution. This clear division of mental work (management) and manual work (workers) was new and controversial.",
              },
            ].map((p) => (
              <Card key={p.num} className="border-border">
                <CardContent className="p-4">
                  <p className="text-xs font-bold text-primary uppercase tracking-wide mb-1">Principle {p.num}</p>
                  <p className="font-semibold text-foreground mb-2">{p.title}</p>
                  <p className="text-sm text-foreground/75 leading-relaxed">{p.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Taylor's Key Contributions and Techniques</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span><strong>Time-and-motion studies:</strong> Systematic observation and timing of every work task to establish standard times and methods</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span><strong>Differential piece-rate system:</strong> Workers who meet or exceed the standard output rate receive a higher pay rate per unit; those who fall short receive a lower rate. This incentivises hitting the target.</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span><strong>Functional foremanship:</strong> Instead of one supervisor overseeing all aspects, Taylor proposed eight different specialist supervisors — each responsible for a specific aspect (planning, instruction, speed, inspection, discipline, etc.)</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span><strong>Standardisation of tools and procedures:</strong> The right tool for each job, in its standardised form, used in the standardised way</span></li>
          </ul>

          <ExampleBox>
            <strong>Taylor's Famous Pig Iron Experiment (1899):</strong><br /><br />
            At Bethlehem Steel, workers were loading 12.5 tonnes of pig iron per man per day. Taylor selected a worker he called "Schmidt" (real name Henry Noll) — a physically strong man motivated by money. Taylor scientifically studied the task: the right size shovel load, the right rest periods, the right walking pace. Under Taylor's direction, Schmidt loaded 47.5 tonnes per day — nearly four times the original amount — and was paid 60% more. Taylor used this to demonstrate that scientific management benefited both worker (higher wages) and employer (higher output).
          </ExampleBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Other Key Figures in Scientific Management</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {[
              { name: "Frank Gilbreth (1868–1924)", note: "Extended Taylor's work through detailed motion studies. He identified 17 basic hand and body motions called 'therbligs' (Gilbreth backwards) and used early film to analyse worker movements, eliminating wasted motions. Famous for his work on bricklaying, where he reduced the number of motions from 18 to 5, tripling productivity." },
              { name: "Lillian Gilbreth (1878–1972)", note: "Frank's wife and collaborator. Brought the human element into scientific management — she argued that worker fatigue, psychology, and wellbeing must be factored into the scientific study of work. She is considered one of the first industrial/organizational psychologists." },
              { name: "Henry Gantt (1861–1919)", note: "Invented the Gantt Chart — a bar chart showing tasks scheduled over time, still used universally today in project management. He also introduced the task-and-bonus system (workers who complete their quota get a bonus, their supervisor also gets a bonus if all workers complete the quota — incentivising supervisors to teach properly)." },
              { name: "Henry Ford (1863–1947)", note: "Applied scientific management principles at a massive scale. Introduced the moving assembly line at Highland Park (1913) — workers stood in one place and the work moved to them. Ford's Model T production time fell from 12.5 hours to 93 minutes per car. He also paid workers $5/day (double the industry average) to attract the best workers and reduce turnover." },
            ].map((p) => (
              <Card key={p.name} className="border-border">
                <CardContent className="p-4">
                  <p className="font-semibold text-foreground text-sm mb-2">{p.name}</p>
                  <p className="text-sm text-foreground/75 leading-relaxed">{p.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Criticisms of Scientific Management</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span>Treats workers as <strong>machines</strong> — focuses entirely on physical efficiency while ignoring psychological and social needs</span></li>
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span><strong>Dehumanising</strong> — extreme specialisation makes work monotonous and meaningless, leading to alienation</span></li>
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span>Assumes workers are primarily motivated by <strong>money alone</strong> — ignores social belonging, recognition, and self-actualisation</span></li>
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span>Extreme division of labour leads to <strong>loss of craft skills</strong> and worker creativity</span></li>
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span>Management-worker relationship remains <strong>adversarial</strong> despite Taylor's claims — workers resented being told exactly how to do every motion</span></li>
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span>Does not address <strong>organisational structure</strong>, management functions, or strategic decisions</span></li>
          </ul>

          {/* SECTION 4 */}
          <SectionHeading id="administrative" number="Section 4" title="Administrative Management — Henri Fayol (1841–1925)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            While Taylor focused on improving efficiency at the <em>shopfloor level</em> (workers and supervisors), <strong>Henri Fayol</strong> — a French mining engineer and executive — looked at management from the <em>top down</em>. He was interested in what managers at all levels do, and how organisations should be structured and run.
          </p>

          <ExplainerBox>
            Fayol ran a struggling French mining company (Comambault) for 30 years and turned it into a highly profitable enterprise. He then spent his retirement writing up what he had learned into a systematic theory of management — published in 1916 as <em>Administration Industrielle et Générale</em> (General and Industrial Management). He is considered the <strong>"Father of Modern Management Theory."</strong>
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Fayol's Five Functions of Management</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Fayol identified five core functions that every manager performs, regardless of the type or level of organisation. These five functions still form the basis of most management textbooks today:
          </p>

          <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary/10">
                  <th className="p-3 border border-border font-semibold text-left">Function</th>
                  <th className="p-3 border border-border font-semibold text-left">What It Means</th>
                  <th className="p-3 border border-border font-semibold text-left">Modern Equivalent</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Planning (Prévoyance)", "Forecasting future conditions and developing a plan of action to achieve objectives", "Strategic and operational planning"],
                  ["Organising (Organisation)", "Assembling the human and material resources needed to carry out the plan; designing the structure", "Organisational design, job design"],
                  ["Commanding (Commandement)", "Directing subordinates to carry out their assigned tasks; issuing instructions", "Leadership, direction"],
                  ["Coordinating (Coordination)", "Ensuring all activities and departments work together harmoniously toward common goals", "Integration, communication"],
                  ["Controlling (Contrôle)", "Monitoring actual performance against the plan; taking corrective action when needed", "Performance management, auditing"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                    <td className="p-3 border border-border font-medium">{row[0]}</td>
                    <td className="p-3 border border-border">{row[1]}</td>
                    <td className="p-3 border border-border text-muted-foreground">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <NoteBox>
            Fayol's five functions are sometimes abbreviated as <strong>POCCC</strong> (Planning, Organising, Commanding, Coordinating, Controlling). Modern management texts often simplify this to <strong>POLC</strong> (Planning, Organising, Leading, Controlling) — combining Commanding and Coordinating into "Leading." Know both versions for exams.
          </NoteBox>

          {/* SECTION 5 */}
          <SectionHeading id="fayol-principles" number="Section 5" title="Fayol's 14 Principles of Management" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Alongside his five functions, Fayol identified <strong>14 general principles of management</strong> — guidelines that he believed should inform how managers make decisions. Unlike Taylor's rigid rules, Fayol presented these as flexible principles, to be applied with judgment based on circumstances.
          </p>

          <div className="space-y-3 mb-6">
            {[
              { num: 1, name: "Division of Work", explanation: "Specialisation of tasks increases efficiency and skill. Workers who repeatedly perform the same task become faster and more expert at it. This applies to both technical and managerial work.", example: "An accounting department has separate staff for accounts payable, accounts receivable, and payroll — each specialised, each more efficient than one person doing everything." },
              { num: 2, name: "Authority and Responsibility", explanation: "Authority is the right to give orders; responsibility is the obligation to perform. These must be balanced — a manager cannot be held responsible for outcomes if they lack the authority to direct the work. Equally, authority without responsibility leads to abuse.", example: "A project manager responsible for delivery on time must have the authority to assign tasks and approve the schedule. Without authority, they bear responsibility without power — an impossible and unfair position." },
              { num: 3, name: "Discipline", explanation: "Employees must respect and abide by the rules, regulations, and agreements of the organisation. Discipline requires good supervisors at all levels, clear rules, and fair enforcement. Without discipline, no organisation can function effectively.", example: "If employees know that arriving late has no consequence, punctuality breaks down. Consistent, fair enforcement of attendance rules maintains discipline without resentment." },
              { num: 4, name: "Unity of Command", explanation: "Each employee should receive orders from only ONE superior. Receiving conflicting orders from two different bosses creates confusion, dilutes accountability, and damages morale. This principle is violated in matrix organisations where employees report to both a functional manager and a project manager.", example: "If a sales rep receives instructions from both the Sales Manager and the Marketing Manager, and those instructions conflict, the rep does not know whose direction to follow. Errors and resentment follow." },
              { num: 5, name: "Unity of Direction", explanation: "There should be one plan and one head for each group of activities directed towards the same objective. All activities aimed at a single goal must be coordinated under one manager and one plan.", example: "The marketing plan, the sales strategy, and the product development plan should all align under a single strategic direction. Departments pulling in different directions waste resources." },
              { num: 6, name: "Subordination of Individual Interest to General Interest", explanation: "The interests of any individual employee or group must not override the interests of the organisation as a whole. When personal interests conflict with organisational goals, management must reconcile them — and the organisational interest must prevail.", example: "An employee may want to leave early every Friday. The organisation needs full attendance. The organisational requirement takes precedence, but management should do so fairly and explain the reason." },
              { num: 7, name: "Remuneration", explanation: "Employees must be paid a fair wage that satisfies both the employee (adequate reward) and the employer (reasonable cost). Pay systems should be equitable and — where possible — provide incentives for good performance.", example: "A commission-only sales structure may be unfair in months with no sales. A base salary plus commission balances security with incentive, satisfying both parties." },
              { num: 8, name: "Centralisation", explanation: "Refers to the degree to which decision-making authority is concentrated at the top of the organisation. The right degree of centralisation versus decentralisation depends on the situation. Routine decisions may be delegated; strategic decisions usually remain centralised.", example: "A bank centralises credit risk decisions (all major loans approved at headquarters) but decentralises customer service decisions (branch managers can resolve customer complaints without headquarters approval)." },
              { num: 9, name: "Scalar Chain (Line of Authority)", explanation: "There should be a clear, unbroken line of authority from the top of the organisation down to the lowest level. Every employee should know who they report to and who reports to them. Communication should normally flow along this chain.", example: "In a company, the CEO → General Manager → Department Head → Supervisor → Worker. A worker who has an issue should raise it with their supervisor, not go directly to the CEO — this is the scalar chain." },
              { num: 10, name: "Order", explanation: "There should be an orderly arrangement of people and materials — the right person in the right place (social order) and the right material in the right place (material order). Disorder wastes time and causes frustration.", example: "A factory where tools are always stored in the same designated place saves workers the time of searching. An office where the right person is in the right role prevents confusion about responsibilities." },
              { num: 11, name: "Equity", explanation: "Managers should treat all employees with fairness, kindness, and impartiality. Equity is the combination of justice (applying rules consistently) and kindness (treating people with respect and consideration). Unfair treatment destroys loyalty.", example: "Applying the same leave policy to all employees regardless of their seniority or personal relationship with management — and doing so with understanding rather than rigidity — demonstrates equity." },
              { num: 12, name: "Stability of Tenure of Personnel", explanation: "High employee turnover is inefficient and costly. It takes time for a new employee to learn their role and reach full productivity. Management should provide job security and support long-term employment. An organisation with stable staff performs better than one with constant turnover.", example: "An experienced nurse who has worked in a ward for 5 years is far more effective than a newly hired replacement who must re-learn procedures, patient histories, and team dynamics." },
              { num: 13, name: "Initiative", explanation: "Employees should be encouraged and allowed to think for themselves and take initiative within the boundaries of their authority. An organisation that allows employee initiative benefits from creativity, problem-solving, and higher engagement. Managers who suppress all initiative lose the organisation's best ideas.", example: "A customer service representative who notices a recurring customer complaint and proposes a process improvement — rather than just logging the complaint — is exercising initiative. Wise managers reward this." },
              { num: 14, name: "Esprit de Corps (Team Spirit)", explanation: "Management should foster unity, harmony, and team spirit among employees. An organisation where people work together as a cohesive team is far more effective than one where individuals compete against each other or departments work in silos.", example: "A hospital ward where nurses, doctors, and support staff trust, respect, and support each other delivers better patient outcomes than one riven by professional hierarchies and inter-departmental rivalries." },
            ].map((p) => (
              <Card key={p.num} className="border-border">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <span className="text-2xl font-serif font-bold text-primary/30 shrink-0 w-8 text-right">{p.num}</span>
                    <div>
                      <p className="font-semibold text-foreground mb-1">{p.name}</p>
                      <p className="text-sm text-foreground/75 leading-relaxed mb-2">{p.explanation}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-2">{p.example}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SECTION 6 */}
          <SectionHeading id="bureaucratic" number="Section 6" title="Bureaucratic Management — Max Weber (1864–1920)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Max Weber</strong> was a German sociologist (not a practicing manager) who studied organisations historically and cross-culturally. He observed that most organisations of his time were managed on the basis of <em>tradition</em> (we do it this way because we always have) or <em>personal charisma</em> (we follow this leader because of who they are). Both, he argued, were unstable, arbitrary, and inefficient.
          </p>

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Weber proposed a third basis for organisational authority: <strong>rational-legal authority</strong> — authority based on written rules, laws, and formal positions rather than personal relationships or tradition. The organisational form built on rational-legal authority he called a <strong>bureaucracy</strong>.
          </p>

          <ExplainerBox>
            Weber used the word "bureaucracy" positively — as a description of an ideal, rational, efficient form of organisation. Today the word has negative connotations (slow, rigid, paper-bound). This is because real-world bureaucracies often become dysfunctional over time. Weber was describing the theoretical ideal, not the reality.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Weber's Characteristics of an Ideal Bureaucracy</h3>

          <div className="space-y-3 mb-6">
            {[
              { char: "1. Clear Division of Labour", desc: "Every position has clearly defined duties and responsibilities. Each person knows exactly what their job entails and what it does not entail. Overlap, confusion, and duplication are eliminated.", example: "In a government ministry, the procurement officer handles purchasing; the finance officer handles payments; the human resources officer handles staffing. These roles do not overlap." },
              { char: "2. Hierarchy of Authority", desc: "A clear chain of command from the top to the bottom of the organisation. Every position is supervised by a higher position, and every supervisor has authority over those below them. The hierarchy makes accountability clear.", example: "The Chief Registrar of the University reports to the Vice-Chancellor; the Faculty Registrar reports to the Chief Registrar; the departmental secretary reports to the Faculty Registrar." },
              { char: "3. Formal Selection", desc: "All employees are selected on the basis of their qualifications, skills, and technical expertise — determined through formal examinations, academic credentials, or merit-based processes. No nepotism, favouritism, or personal connections.", example: "Public service recruitment in Kenya (through the Public Service Commission) requires applicants to meet stated academic qualifications and pass competitive interviews — formal selection." },
              { char: "4. Formal Rules and Procedures", desc: "The organisation is governed by formal, written rules that apply uniformly to all situations and all employees. Rules are documented in policies, procedures, regulations, and standing orders. There is no room for arbitrary personal decisions.", example: "A bank has documented procedures for every transaction type — opening an account, processing a loan, handling a dispute. Every officer follows the same procedure every time." },
              { char: "5. Impersonality", desc: "Rules apply to everyone equally, regardless of who they are. A manager enforces the same rule on their best friend and their newest employee. This eliminates favouritism and ensures fairness, though it can feel cold and rigid.", example: "If the disciplinary procedure specifies a written warning for first absence without notice, every employee receives a written warning — including the most senior manager's relative." },
              { char: "6. Career Orientation", desc: "Employment in a bureaucracy is a career, not just a job. Employees are appointed to positions, receive a salary, are promoted based on seniority and performance, and enjoy job security. This creates commitment and builds organisational knowledge.", example: "A career civil servant in Kenya joins as a graduate officer, progresses through grades (Senior Officer → Principal Officer → Deputy Director → Director) over decades, building deep institutional knowledge." },
            ].map((item) => (
              <Card key={item.char} className="border-border">
                <CardContent className="p-4">
                  <p className="font-semibold text-foreground mb-2">{item.char}</p>
                  <p className="text-sm text-foreground/75 leading-relaxed mb-2">{item.desc}</p>
                  <p className="text-xs italic text-muted-foreground border-l-2 border-primary/20 pl-2">{item.example}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Weber's Three Types of Authority</h3>
          <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary/10">
                  <th className="p-3 border border-border font-semibold text-left">Type</th>
                  <th className="p-3 border border-border font-semibold text-left">Basis of Legitimacy</th>
                  <th className="p-3 border border-border font-semibold text-left">Example</th>
                  <th className="p-3 border border-border font-semibold text-left">Stability</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border font-medium">Traditional</td>
                  <td className="p-3 border border-border">Custom, tradition, heredity ("we have always done it this way")</td>
                  <td className="p-3 border border-border">Monarchy, tribal leadership</td>
                  <td className="p-3 border border-border">Fragile — depends on continuation of tradition</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="p-3 border border-border font-medium">Charismatic</td>
                  <td className="p-3 border border-border">Personal qualities of the leader — inspiration, vision, magnetism</td>
                  <td className="p-3 border border-border">Religious leaders, revolutionary politicians</td>
                  <td className="p-3 border border-border">Unstable — collapses when the leader dies or loses followers' faith</td>
                </tr>
                <tr>
                  <td className="p-3 border border-border font-medium">Rational-Legal</td>
                  <td className="p-3 border border-border">Written rules, formal positions, law</td>
                  <td className="p-3 border border-border">Government agencies, corporations, universities</td>
                  <td className="p-3 border border-border">Most stable — survives changes in personnel</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Criticisms of Bureaucracy</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span><strong>Rigidity:</strong> Strict adherence to rules makes it slow to respond to change or unusual situations</span></li>
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span><strong>Goal displacement:</strong> Following rules becomes the goal, rather than achieving the organisation's actual purpose ("red tape")</span></li>
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span><strong>Impersonality:</strong> Treating every case identically ignores legitimate individual differences and special circumstances</span></li>
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span><strong>Empire building:</strong> Managers expand their departments to increase their own authority and budget, regardless of actual need</span></li>
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span><strong>Ignores the human element:</strong> Like Taylor, Weber's model ignores motivation, job satisfaction, and informal relationships</span></li>
          </ul>

          {/* SECTION 7 */}
          <SectionHeading id="classical-critique" number="Section 7" title="Overall Critique of the Classical School" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Taylor, Fayol, and Weber all belong to what we call the <strong>Classical School of Management</strong>. Together, they built the foundations of management as a formal discipline. But they shared a common fatal flaw — one that the next school of thought would expose dramatically.
          </p>

          <WarningBox>
            <strong>The Classical School's Fatal Assumption:</strong><br /><br />
            All three classical theorists assumed that the key to organisational effectiveness was <strong>structure, rules, efficiency, and financial incentives</strong>. They viewed the human being in the organisation primarily as an economic unit — a rational actor who responds to financial rewards and whose behaviour can be optimised through proper system design.<br /><br />
            They largely ignored the <strong>social, psychological, and emotional dimensions</strong> of human behaviour at work. Workers are not machines. They have feelings, social needs, group loyalties, fears, and aspirations. Ignoring these does not make them go away — it makes them the dominant force in determining whether management's plans are actually implemented.
          </WarningBox>

          <ExampleBox>
            <strong>The Limits of Scientific Management in Practice:</strong><br /><br />
            Ford's River Rouge plant in the 1920s was the world's most scientifically managed factory. Worker turnover was 370% per year — Ford had to hire nearly 4 workers to keep 1 employed. Workers found the work so monotonous, dehumanising, and physically punishing that they left constantly. Ford had to double wages to $5/day just to fill the positions. The most efficient production system in the world was creating a deeply unhappy and unstable workforce. Something was missing — and a researcher named Elton Mayo was about to discover what it was.
          </ExampleBox>

          {/* SECTION 8 */}
          <SectionHeading id="hawthorne" number="Section 8" title="The Hawthorne Studies (1924–1933)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The Hawthorne Studies were a series of experiments conducted at the <strong>Hawthorne Works</strong> of Western Electric Company near Chicago, USA. They began as straightforward scientific management studies — but ended up revolutionising our understanding of human behaviour in organisations.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Phase 1: Illumination Studies (1924–1927)</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Western Electric and the National Research Council wanted to determine the relationship between lighting intensity and worker productivity. The hypothesis was simple: better lighting → better visibility → higher output. They divided workers into two groups: an experimental group (whose lighting was changed) and a control group (constant lighting). The result shocked them: <strong>productivity increased in both groups — even when lighting in the experimental group was reduced to near-moonlight levels.</strong> The physical environment seemed to have almost nothing to do with output.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Phase 2: Relay Assembly Test Room (1927–1932)</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A group of six women assemblers were separated from the main floor and placed in a test room. Various changes were introduced — rest breaks, shorter working hours, free lunches, changes in work schedules — and output was measured. Again, a startling result: <strong>output increased with almost every change, including returning to original conditions.</strong>
          </p>

          <ExplainerBox>
            Elton Mayo and his Harvard team realised something profound: the women's productivity was not responding to the physical changes — it was responding to the <strong>attention they were receiving</strong>. They had been selected for the study, they were being observed, their supervisors consulted them on changes, they were treated as special. They formed a cohesive social group. They felt valued. And this sense of being valued, being part of something, and being paid attention to drove their performance — not the lighting, the rest breaks, or the free food.<br /><br />
            This became known as the <strong>Hawthorne Effect:</strong> people tend to modify or improve their behaviour when they know they are being observed.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Phase 3: Bank Wiring Observation Room (1931–1932)</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            A group of 14 men wiring telephone equipment were observed (they knew the observer was present but were told he would not report on them). The result contradicted scientific management entirely: the men deliberately restricted their output to an informal group norm — regardless of the financial incentive to produce more. Workers who produced above the norm were called "rate-busters" and socially sanctioned. Workers who produced below the norm were called "chisellers." The group enforced its own standard.
          </p>

          <NoteBox>
            The Bank Wiring Room study revealed the enormous power of <strong>informal groups</strong>. Workers do not behave as isolated economic units. They form social groups with their own norms, leadership, values, and loyalties — and these informal structures can override official management directives. This was a complete refutation of Taylor's assumption that workers respond primarily to financial incentives.
          </NoteBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Findings of the Hawthorne Studies</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">1.</span><span>Workers are motivated by <strong>social factors</strong> — recognition, belonging, group membership, attention from management — at least as much as by economic factors</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">2.</span><span><strong>Informal groups</strong> form within every organisation and powerfully influence worker behaviour — including setting output norms that may conflict with management's goals</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">3.</span><span>The <strong>relationship between worker and supervisor</strong> significantly affects performance — workers perform better when supervisors are interested in and supportive of them</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">4.</span><span><strong>Communication and participation</strong> matter — workers whose opinions are sought and who understand the reasons for decisions are more cooperative and productive</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">5.</span><span>The <strong>psychological and social work environment</strong> is just as important as the physical work environment</span></li>
          </ul>

          {/* SECTION 9 */}
          <SectionHeading id="human-relations" number="Section 9" title="The Human Relations Movement" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The Hawthorne Studies gave birth to the <strong>Human Relations Movement</strong> — a school of management thought that placed people, their social needs, and their relationships at the centre of organisational effectiveness. If classical management said "design the right system," human relations said "develop the right relationships."
          </p>

          <ExplainerBox>
            <strong>Key Assumptions of the Human Relations School:</strong><br /><br />
            1. Employees are social beings, not just economic units — they need to belong, to be recognised, to feel valued<br />
            2. Satisfied workers are productive workers — employee wellbeing and organisational performance are not in conflict<br />
            3. Informal groups are powerful and must be understood and worked with, not ignored<br />
            4. Good management means building good human relationships — listening, communicating, showing interest in workers as people<br />
            5. Participation in decision-making increases employee commitment and cooperation
          </ExplainerBox>

          <ExampleBox>
            <strong>Human Relations in Practice — Kenya Context:</strong><br /><br />
            A tea estate in Kericho introduces a new picking quota. Scientific management says: set the standard, measure output, pay accordingly. Human relations management says: call a meeting of the pickers, explain why the quota is being changed, listen to their concerns, ask for their input on a fair quota, ensure supervisors are supportive and approachable. The second approach will generate higher genuine acceptance and more sustainable productivity — because it addresses social and psychological needs alongside the economic ones.
          </ExampleBox>

          {/* SECTION 10 */}
          <SectionHeading id="maslow" number="Section 10" title="Abraham Maslow's Hierarchy of Needs (1943)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Abraham Maslow</strong>, an American psychologist, published his landmark theory of human motivation in 1943. He proposed that human beings have a hierarchy of needs — arranged like a pyramid — and that people are motivated to satisfy lower-level needs before they become motivated by higher-level needs.
          </p>

          <div className="my-6 rounded-lg border border-border overflow-hidden">
            <div className="bg-primary/10 p-3 text-center">
              <p className="text-sm font-bold text-foreground">Maslow's Hierarchy of Needs</p>
            </div>
            <div className="divide-y divide-border">
              {[
                { level: 5, name: "Self-Actualisation Needs", desc: "Realising one's full potential; achieving everything one is capable of; creativity, growth, peak experience", work: "Challenging work, creative freedom, opportunities for professional growth and development", color: "bg-purple-50 dark:bg-purple-900/10" },
                { level: 4, name: "Esteem Needs", desc: "Self-esteem (confidence, achievement, mastery) and the esteem of others (recognition, reputation, status)", work: "Performance recognition, job titles, awards, praise from supervisors, responsibility", color: "bg-blue-50 dark:bg-blue-900/10" },
                { level: 3, name: "Social / Love and Belonging Needs", desc: "Friendship, intimacy, belonging to groups, love, being accepted by others", work: "Team membership, good relationships with colleagues, supportive supervisor, company social events", color: "bg-green-50 dark:bg-green-900/10" },
                { level: 2, name: "Safety Needs", desc: "Security of body, employment, resources, health, property; protection from physical and emotional harm", work: "Job security, safe working conditions, employment contracts, medical insurance, pension scheme", color: "bg-amber-50 dark:bg-amber-900/10" },
                { level: 1, name: "Physiological Needs", desc: "Air, water, food, shelter, sleep, clothing — the basic requirements for physical survival", work: "Sufficient salary to buy food and shelter, adequate rest breaks, reasonable working hours", color: "bg-red-50 dark:bg-red-900/10" },
              ].map((row) => (
                <div key={row.level} className={`p-4 ${row.color}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-bold text-muted-foreground shrink-0 w-6">L{row.level}</span>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-1">{row.name}</p>
                      <p className="text-xs text-foreground/70 mb-1">{row.desc}</p>
                      <p className="text-xs text-primary font-medium">At work: {row.work}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Implications for Management</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span>A manager cannot motivate a hungry, insecure employee with recognition or creative challenges — first the basic needs must be met</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span>As each level is satisfied, it ceases to be a motivator — only unsatisfied needs drive behaviour</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span>Many Kenyan workplaces still operate at the physiological and safety levels — adequate pay and job security are primary motivators</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span>Professional employees in knowledge industries (engineers, doctors, lawyers) may already have their lower needs met and be motivated primarily by esteem and self-actualisation</span></li>
          </ul>

          <WarningBox>
            <strong>Criticisms of Maslow's Hierarchy:</strong><br />
            Research has not consistently supported the strict hierarchy — some people sacrifice physiological needs for esteem (e.g., artists living in poverty to pursue their craft). Cultural differences matter: in collectivist cultures (common in Africa and Asia), belonging needs may rank above safety needs. The hierarchy is too rigid and universal to capture the complexity of human motivation in practice. Despite these criticisms, it remains one of the most widely taught and applied models in management.
          </WarningBox>

          {/* SECTION 11 */}
          <SectionHeading id="mcgregor" number="Section 11" title="Theory X and Theory Y — Douglas McGregor (1960)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Douglas McGregor</strong>, an American social psychologist and professor at MIT, published <em>The Human Side of Enterprise</em> in 1960. He argued that a manager's behaviour is fundamentally shaped by their underlying assumptions about human nature — and he identified two contrasting sets of assumptions, which he called <strong>Theory X</strong> and <strong>Theory Y</strong>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card className="border-red-300/50 dark:border-red-800/50">
              <CardContent className="p-5">
                <p className="font-bold text-red-600 dark:text-red-400 mb-3">Theory X — The Traditional View</p>
                <p className="text-xs text-muted-foreground mb-3">Assumes that people are fundamentally lazy and must be coerced</p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>Workers are inherently lazy and will avoid work whenever possible</li>
                  <li>Workers lack ambition and prefer to be told what to do</li>
                  <li>Workers are primarily self-interested and indifferent to organisational goals</li>
                  <li>Workers resist change</li>
                  <li>Workers must be directed, controlled, coerced, and threatened with punishment to work</li>
                </ul>
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Management style that follows:</p>
                  <p className="text-sm">Authoritarian — tight supervision, micromanagement, top-down control, punishment for non-performance, limited worker autonomy</p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-green-300/50 dark:border-green-800/50">
              <CardContent className="p-5">
                <p className="font-bold text-green-700 dark:text-green-400 mb-3">Theory Y — The Progressive View</p>
                <p className="text-xs text-muted-foreground mb-3">Assumes that people find work natural and can self-direct</p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>Work is as natural as rest or play — people do not inherently dislike it</li>
                  <li>When committed to goals, people exercise self-direction and self-control</li>
                  <li>Commitment comes from rewards associated with achievement (not just pay)</li>
                  <li>People learn to accept and even seek responsibility</li>
                  <li>Most workers have more creativity and problem-solving capacity than organisations use</li>
                </ul>
                <div className="mt-4 pt-3 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Management style that follows:</p>
                  <p className="text-sm">Participative — delegate authority, encourage initiative, set goals collaboratively, trust workers, provide challenging work</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <ExplainerBox>
            <strong>The Self-Fulfilling Prophecy:</strong><br /><br />
            McGregor's most powerful insight was that managerial assumptions create the reality they predict. A Theory X manager who treats workers as lazy will:<br />
            — Micromanage every task (removing autonomy)<br />
            — Not share information (removing context and meaning)<br />
            — Punish rather than develop (removing motivation)<br />
            — Result: workers become disengaged, doing only what they must — confirming the manager's belief that workers are lazy. The assumption became self-fulfilling.<br /><br />
            A Theory Y manager creates conditions for growth, gives autonomy, communicates openly, and trusts workers — and typically finds that workers rise to meet those expectations.
          </ExplainerBox>

          <ExampleBox>
            <strong>Kenya Application:</strong><br /><br />
            <strong>Theory X in action:</strong> A government office where all leave must be approved three levels up, every document requires four signatures, supervisors must account for every minute of every worker's time. Workers learn to arrive exactly on time, do the minimum required, and leave the moment their shift ends. Initiative is punished ("who told you to do that?"). The system creates exactly the passive, uninspired workforce it assumed it would find.<br /><br />
            <strong>Theory Y in action:</strong> A tech startup in Nairobi gives developers the objective ("build a mobile payment feature by Q3") and the resources, but lets them decide how to achieve it. Developers work flexible hours, collaborate across roles, and propose solutions management had not considered. Output is high because the people are genuinely engaged.
          </ExampleBox>

          {/* SECTION 12 */}
          <SectionHeading id="herzberg" number="Section 12" title="Herzberg's Two-Factor Theory (1959)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Frederick Herzberg</strong>, an American psychologist, asked a deceptively simple question to 200 engineers and accountants in Pittsburgh: <em>"Tell me about a time when you felt exceptionally good about your job. Tell me about a time when you felt exceptionally bad about your job."</em> The answers revealed a striking pattern that became the <strong>Two-Factor Theory</strong> (also called Motivator-Hygiene Theory).
          </p>

          <div className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary/10">
                  <th className="p-3 border border-border font-semibold text-left">Hygiene Factors (Dissatisfiers)</th>
                  <th className="p-3 border border-border font-semibold text-left">Motivators (Satisfiers)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border border-border align-top">
                    <p className="font-medium mb-2">When absent → dissatisfaction and demotivation</p>
                    <p className="font-medium mb-2">When present → absence of dissatisfaction (NOT motivation)</p>
                    <ul className="space-y-1 text-foreground/75">
                      <li>• Company policy and administration</li>
                      <li>• Supervision quality</li>
                      <li>• Relationship with supervisor</li>
                      <li>• Working conditions</li>
                      <li>• Salary and remuneration</li>
                      <li>• Relationship with colleagues</li>
                      <li>• Job security</li>
                      <li>• Personal life factors</li>
                    </ul>
                  </td>
                  <td className="p-3 border border-border align-top">
                    <p className="font-medium mb-2">When present → genuine motivation and satisfaction</p>
                    <p className="font-medium mb-2">When absent → no motivation (NOT dissatisfaction)</p>
                    <ul className="space-y-1 text-foreground/75">
                      <li>• Achievement — completing difficult tasks</li>
                      <li>• Recognition — being acknowledged for work</li>
                      <li>• The work itself — interesting, meaningful tasks</li>
                      <li>• Responsibility — having real ownership of work</li>
                      <li>• Advancement — promotion and career growth</li>
                      <li>• Personal growth — learning and development</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <ExplainerBox>
            <strong>Herzberg's Key Insight — The Salary Paradox:</strong><br /><br />
            Herzberg found that salary is a <strong>hygiene factor</strong>, not a motivator. This seems counterintuitive — surely people work harder for more money? But Herzberg found that:<br />
            — Low pay DOES cause dissatisfaction and poor performance<br />
            — Adequate pay removes dissatisfaction — but does NOT create motivation<br />
            — Once pay is satisfactory, increasing it further does not drive sustained higher performance<br /><br />
            Think of it like oxygen: insufficient oxygen makes you very ill. Sufficient oxygen keeps you healthy. But filling the room with extra oxygen does not make you super-productive. Pay works the same way — it is a baseline condition, not a driver of exceptional performance. Exceptional performance comes from motivators: recognition, interesting work, responsibility, growth.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Implications for Management — Job Enrichment</h3>
          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            Herzberg's theory led to the concept of <strong>job enrichment</strong> — redesigning jobs to include more motivators. Rather than making jobs more specialised (Taylor's approach), job enrichment makes them more meaningful.
          </p>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span><strong>Vertical loading:</strong> Give workers more responsibility — let them plan their own work, set their own methods, evaluate their own performance</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span><strong>Task identity:</strong> Give workers responsibility for a complete, identifiable piece of work — not just one fragment</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span><strong>Direct feedback:</strong> Let workers know directly how they are performing, rather than routing all feedback through supervisors</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span><strong>Natural work units:</strong> Assign workers responsibility for a group of related tasks rather than a single repetitive motion</span></li>
          </ul>

          {/* SECTION 13 */}
          <SectionHeading id="quantitative" number="Section 13" title="The Quantitative Management School (1940s Onwards)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            The <strong>Quantitative School</strong> (also called the Management Science School or Operations Research School) emerged during and after World War II. Military planners needed to optimise complex operations — logistics, convoy routing, aircraft deployment, bombing schedules — using scarce resources under extreme uncertainty. They turned to mathematics.
          </p>

          <ExplainerBox>
            A classic example: during WWII, Allied naval commanders needed to decide how to deploy limited numbers of aircraft to protect merchant ship convoys crossing the Atlantic. Operations researchers built mathematical models of submarine attack patterns, convoy sizes, aircraft patrol ranges, and detection probabilities. Their models showed that larger convoys with fewer escorts were actually safer than smaller convoys with more escorts — a result that contradicted the intuitive military judgment. This mathematical insight saved thousands of lives and billions of pounds in cargo.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Branches of the Quantitative School</h3>

          <div className="space-y-4 mb-6">
            {[
              {
                name: "Operations Research (OR)",
                desc: "Uses mathematical models and statistical analysis to solve complex management problems. Involves building a mathematical representation of a management problem, running simulations, and identifying the optimal solution.",
                techniques: "Linear programming, integer programming, network analysis (PERT/CPM), inventory models, queuing theory",
                application: "Finding the cheapest route for distributing goods from warehouses to retail outlets; determining optimal inventory levels to minimise holding and stockout costs",
              },
              {
                name: "Management Information Systems (MIS)",
                desc: "Systems designed to capture, process, store, and communicate information to support management decision-making at all levels of the organisation.",
                techniques: "Database management, enterprise resource planning (ERP), decision support systems",
                application: "A retail chain's system that automatically reorders stock when inventory falls below a threshold; a hospital system that tracks patient records, medication dispensing, and billing",
              },
              {
                name: "Total Quality Management (TQM)",
                desc: "A management philosophy focused on continuous improvement of processes, products, and services through statistical measurement and systematic analysis. Originally developed by W. Edwards Deming.",
                techniques: "Statistical process control (SPC), control charts, Pareto analysis, cause-and-effect diagrams (fishbone), Six Sigma",
                application: "A Kenyan flower exporter uses statistical sampling to measure and control defect rates at every stage of production, identifying and fixing the root causes of rejected shipments before they reach the export market",
              },
            ].map((item) => (
              <Card key={item.name} className="border-border">
                <CardContent className="p-4">
                  <p className="font-semibold text-foreground mb-2">{item.name}</p>
                  <p className="text-sm text-foreground/75 leading-relaxed mb-2">{item.desc}</p>
                  <p className="text-xs font-semibold text-primary mb-1">Key techniques:</p>
                  <p className="text-xs text-foreground/70 mb-2">{item.techniques}</p>
                  <p className="text-xs font-semibold text-secondary mb-1">Real-world application:</p>
                  <p className="text-xs italic text-foreground/70">{item.application}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Criticisms of the Quantitative School</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span>Models depend on the quality of data — "<strong>garbage in, garbage out</strong>" — poor data produces misleading optimal solutions</span></li>
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span>Many important management problems <strong>cannot be quantified</strong> — how do you model organisational culture, leadership quality, or employee morale in an equation?</span></li>
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span>Requires specialist mathematical skills that many managers lack</span></li>
            <li className="flex gap-2"><span className="text-red-500 font-bold shrink-0">✗</span><span>Can create an illusion of precision and certainty in inherently uncertain situations</span></li>
          </ul>

          {/* SECTION 14 */}
          <SectionHeading id="systems" number="Section 14" title="Systems Theory (1960s)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            <strong>Systems Theory</strong> approached organisations in a fundamentally different way from all previous schools. Instead of asking "how do we optimise this one part?" it asked "how does the whole organisation work as an interconnected system?" It was influenced by biologist Ludwig von Bertalanffy's general systems theory.
          </p>

          <ExplainerBox>
            A system is a set of interrelated parts that work together to form a whole. The human body is a system — the circulatory, respiratory, nervous, and digestive systems are interdependent. A change in one affects the others. An organisation works the same way: the sales department, operations, finance, HR, and marketing are all interdependent subsystems. A decision made in one department creates ripples throughout the organisation — and systems theory insists that managers must understand these interdependencies rather than managing each department in isolation.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Concepts in Systems Theory</h3>

          <div className="my-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-primary/10">
                  <th className="p-3 border border-border font-semibold text-left">Concept</th>
                  <th className="p-3 border border-border font-semibold text-left">Meaning</th>
                  <th className="p-3 border border-border font-semibold text-left">Example</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Input", "Resources taken from the environment — people, money, materials, information", "A university takes in students, lecturers, funds, knowledge, and facilities"],
                  ["Transformation Process", "The activities that convert inputs into outputs", "Teaching, research, assessment, administration"],
                  ["Output", "Products and services produced for the environment", "Graduates, research publications, community service, trained professionals"],
                  ["Feedback", "Information about outputs that flows back to adjust inputs and processes", "Graduate employment rates, student satisfaction surveys, employer feedback on graduate quality"],
                  ["Open System", "A system that interacts with its external environment — taking in inputs and releasing outputs", "A company operating in a market — affected by competition, regulation, economic conditions"],
                  ["Closed System", "A system with no interaction with its environment (theoretical only — no real organisation is truly closed)", "An isolated laboratory experiment — in theory only"],
                  ["Synergy", "The whole is greater than the sum of its parts — departments working together produce more value than they would separately", "A hospital's doctors, nurses, pharmacists, and administrators working as a coordinated team deliver better patient outcomes than any of them could alone"],
                  ["Entropy", "Without management effort, systems tend toward disorder and decay", "A neglected organisation loses market share, good staff leave, processes deteriorate"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                    <td className="p-3 border border-border font-medium">{row[0]}</td>
                    <td className="p-3 border border-border">{row[1]}</td>
                    <td className="p-3 border border-border text-muted-foreground text-xs">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ExampleBox>
            <strong>Systems Thinking Applied — Kenya Commercial Bank:</strong><br /><br />
            KCB launches an aggressive new loan product (Sales decision). Loan approvals surge (Sales output increases). But the Credit Risk team was not consulted — they lack capacity to process the extra applications (bottleneck in Operations). Customer waiting time increases (Service Quality suffers). Non-performing loans rise because the risk assessment process was rushed (Financial consequence). Staff in branches are overwhelmed and starting to leave (HR consequence).<br /><br />
            A systems thinker would have required coordination between Sales, Credit Risk, Operations, HR, and Finance before launching — because any one of those subsystems affects all the others.
          </ExampleBox>

          {/* SECTION 15 */}
          <SectionHeading id="contingency" number="Section 15" title="Contingency Theory (1970s)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            After decades of different schools each claiming to have found the "best" approach to management, researchers in the 1970s started asking a different question: <em>"What works best — where, when, and under what conditions?"</em> The answer was the <strong>Contingency Theory</strong> (also called Situational Theory).
          </p>

          <ExplainerBox>
            <strong>The Core Principle:</strong> There is no single best way to manage. The most effective management approach depends on the specific situation — the technology used, the environment, the size of the organisation, the nature of the task, the characteristics of the workforce, and many other contextual factors. Management is inherently situational.
          </ExplainerBox>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Contingency Variables</h3>
          <ul className="space-y-2 text-foreground/80 mb-4 ml-2">
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span><strong>Organisation size:</strong> A five-person startup and a 50,000-person corporation need fundamentally different management structures. What works for one is inappropriate for the other.</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span><strong>Technology:</strong> Routine, repetitive technologies (mass production) suit more rigid, centralised structures. Non-routine, innovative technologies (software development, research) suit flexible, decentralised structures.</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span><strong>Environmental uncertainty:</strong> Stable, predictable environments suit formal bureaucratic structures. Turbulent, rapidly changing environments (technology startups, media companies) suit organic, flexible structures.</span></li>
            <li className="flex gap-2"><span className="text-primary font-bold shrink-0">•</span><span><strong>Individual differences:</strong> McGregor's insight applies here — the appropriate management style depends on the skills, motivation, and maturity of the specific individuals being managed.</span></li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Contingency Research</h3>
          <div className="space-y-3 mb-6">
            {[
              { researcher: "Burns and Stalker (1961)", finding: "Studied Scottish electronics firms. Found that stable environments favoured 'mechanistic' (bureaucratic, formal) structures, while dynamic environments favoured 'organic' (flexible, decentralised) structures. Neither was universally superior — it depended on the environment." },
              { researcher: "Lawrence and Lorsch (1967)", finding: "Found that organisations in uncertain environments needed more differentiation (specialised departments handling different aspects of uncertainty) but also more integration (mechanisms to coordinate those departments). The challenge was balancing the two." },
              { researcher: "Fiedler's Contingency Model (1967)", finding: "Applied contingency thinking to leadership. Found that task-oriented leaders perform best in situations that are either very favourable or very unfavourable for the leader. Relationship-oriented leaders perform best in moderately favourable situations. No leadership style is universally best." },
            ].map((item) => (
              <Card key={item.researcher} className="border-border">
                <CardContent className="p-4">
                  <p className="font-semibold text-foreground mb-2">{item.researcher}</p>
                  <p className="text-sm text-foreground/75 leading-relaxed">{item.finding}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <ExampleBox>
            <strong>Contingency Theory Applied in Kenya:</strong><br /><br />
            <strong>Kenya Breweries (EABL)</strong> — large, stable production environment, thousands of employees, standardised processes. Appropriate structure: tall hierarchy, standardised procedures, clear rules (Weberian bureaucracy works well here).<br /><br />
            <strong>A Nairobi FinTech Startup</strong> — small team, rapidly changing technology environment, highly skilled workers, constant innovation required. Appropriate structure: flat hierarchy, agile project teams, minimal rules, high autonomy (Theory Y management, organic structure).<br /><br />
            The mistake would be to apply EABL's management approach to the FinTech startup, or the startup's approach to EABL. Context determines the right approach — that is the contingency principle.
          </ExampleBox>

          {/* SECTION 16 */}
          <SectionHeading id="modern" number="Section 16" title="Modern Management Approaches (1980s–Present)" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            From the 1980s onwards, new management challenges — globalisation, rapid technological change, knowledge work, sustainability — demanded new frameworks. Several modern approaches have become influential:
          </p>

          <div className="space-y-5 mb-6">
            {[
              {
                name: "Total Quality Management (TQM)",
                pioneer: "W. Edwards Deming, Joseph Juran, Kaoru Ishikawa",
                desc: "TQM is a philosophy of continuous improvement in which quality is everyone's responsibility — not just the quality control department's. It involves systematic measurement, employee involvement, customer focus, and continuous incremental improvement (Kaizen). Deming's 14 Points guide organisations on eliminating defects, investing in people, and breaking down inter-departmental barriers.",
                example: "Toyota's Production System (TPS) is the world's most famous TQM implementation — continuous improvement (Kaizen), just-in-time production, and respect for people combine to make Toyota one of the world's most consistently high-quality manufacturers. Kenya's manufacturing sector increasingly adopts ISO quality management standards based on TQM principles.",
              },
              {
                name: "The Learning Organisation",
                pioneer: "Peter Senge — The Fifth Discipline (1990)",
                desc: "Senge argued that the organisations that will thrive in the future are those that discover how to learn continuously — to adapt, innovate, and solve problems faster than the environment changes. He identified five disciplines: Personal Mastery, Mental Models, Shared Vision, Team Learning, and Systems Thinking (the fifth discipline that integrates the others).",
                example: "Google is often cited as a learning organisation — it encourages experimentation (many products fail, and that is acceptable), shares knowledge across teams, and actively builds learning into its culture through '20% time' (engineers can spend 20% of their time on any project they choose — Gmail and Google Maps began this way).",
              },
              {
                name: "Management by Objectives (MBO)",
                pioneer: "Peter Drucker — The Practice of Management (1954)",
                desc: "MBO is a systematic process by which managers and subordinates jointly identify organisational goals, set individual performance targets aligned with those goals, and then evaluate performance against those targets. The key feature is the joint setting of goals — both supervisor and employee agree on what 'success' looks like before the performance period begins.",
                example: "A sales director and their team collaboratively agree that the team will achieve KES 50 million in new business in Q3. Each salesperson then sets personal targets (e.g., 10 new accounts, KES 5 million each). At the end of Q3, performance is evaluated against the agreed targets, not subjective supervisor opinion.",
              },
              {
                name: "Strategic Management",
                pioneer: "Alfred Chandler, Michael Porter, Henry Mintzberg",
                desc: "Strategic management focuses on how organisations achieve and sustain competitive advantage over the long term. It includes environmental scanning (PESTEL, SWOT), strategy formulation (Porter's Generic Strategies, Blue Ocean Strategy), strategy implementation, and strategic control. It views the entire organisation as a unit competing in an external environment.",
                example: "Equity Bank's decision in the 2000s to serve the 'bottom of the pyramid' — previously unbanked low-income Kenyans — through agency banking and mobile money was a strategic management decision. It gave Equity a competitive positioning that differentiated it from traditional banks and drove explosive growth.",
              },
              {
                name: "Knowledge Management",
                pioneer: "Peter Drucker (coined 'knowledge worker'), Nonaka and Takeuchi",
                desc: "In the knowledge economy, an organisation's competitive advantage lies not in physical assets but in knowledge — tacit (in employees' heads) and explicit (documented). Knowledge management involves systematically capturing, sharing, and applying knowledge across the organisation so it is not lost when individuals leave.",
                example: "McKinsey & Company's internal knowledge database allows consultants in Nairobi to access case studies, frameworks, and client insights from projects done anywhere in the world — applying knowledge earned in one engagement to solve problems in another.",
              },
            ].map((item) => (
              <Card key={item.name} className="border-border">
                <CardContent className="p-5">
                  <p className="font-bold text-foreground text-base mb-1">{item.name}</p>
                  <p className="text-xs text-primary font-semibold mb-3">Pioneer(s): {item.pioneer}</p>
                  <p className="text-sm text-foreground/75 leading-relaxed mb-3">{item.desc}</p>
                  <div className="rounded bg-secondary/5 border border-secondary/20 p-3">
                    <p className="text-xs font-semibold text-secondary mb-1">Example:</p>
                    <p className="text-xs text-foreground/70 leading-relaxed">{item.example}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* SECTION 17 */}
          <SectionHeading id="comparison" number="Section 17" title="Schools of Management Thought — Master Revision Table" />

          <p className="text-base text-foreground/80 leading-relaxed mb-4">
            This table consolidates all schools for quick revision before an exam.
          </p>

          <div className="my-6 overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-primary/10">
                  <th className="p-2 border border-border font-semibold text-left">School</th>
                  <th className="p-2 border border-border font-semibold text-left">Period</th>
                  <th className="p-2 border border-border font-semibold text-left">Key Thinkers</th>
                  <th className="p-2 border border-border font-semibold text-left">Core Idea</th>
                  <th className="p-2 border border-border font-semibold text-left">Key Criticism</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Scientific Management", "1880s–1930s", "Taylor, Gilbreth, Gantt, Ford", "Find the 'one best way' to perform each task through scientific study; optimise physical efficiency; incentivise with pay", "Treats workers as machines; ignores social/psychological needs; dehumanising specialisation"],
                  ["Administrative Management", "1900s–1930s", "Henri Fayol", "Management has universal functions (POCCC) and principles (14) that apply in all organisations at all levels", "Over-generalised; principles sometimes conflict; insufficient attention to informal organisation"],
                  ["Bureaucratic Management", "1900s–1920s", "Max Weber", "Rational-legal authority through formal rules, hierarchy, and merit-based systems creates the most stable and efficient organisation", "Creates rigidity, red tape, goal displacement; ignores human element and informal relationships"],
                  ["Human Relations", "1930s–1960s", "Elton Mayo, Hawthorne researchers", "Social factors (belonging, recognition, relationships) motivate workers at least as much as money; informal groups are powerful", "Over-emphasised social needs; undervalued economic motivation; 'happiness → productivity' assumption is too simple"],
                  ["Behavioural Science", "1940s–1970s", "Maslow, McGregor, Herzberg", "Understanding individual psychology (motivation, needs, assumptions about human nature) is essential for effective management", "Research largely done in US; cultural applicability questioned; Maslow's strict hierarchy not supported by research"],
                  ["Quantitative School", "1940s–present", "Operations researchers, W. Edwards Deming", "Mathematical models, statistics, and systematic analysis can optimise management decisions", "Cannot quantify human behaviour; requires specialist skills; can create false certainty"],
                  ["Systems Theory", "1960s–present", "Bertalanffy, Katz and Kahn", "Organisations are open systems of interrelated parts; changes in one part affect the whole; must manage the whole, not just parts", "Too abstract; difficult to apply practically; does not prescribe specific management actions"],
                  ["Contingency Theory", "1970s–present", "Burns & Stalker, Lawrence & Lorsch, Fiedler", "No universal best management approach; the right approach depends on the specific situation (size, technology, environment, people)", "Difficult to apply — how do you know which factors matter in which situation? Can lead to indecision"],
                  ["Modern Approaches", "1980s–present", "Drucker, Senge, Porter, Deming", "Strategic positioning, continuous improvement, learning capacity, knowledge management, and quality are the sources of sustained competitive advantage", "Diverse and sometimes contradictory; implementation challenges in developing country contexts"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                    {row.map((cell, j) => (
                      <td key={j} className={`p-2 border border-border leading-snug ${j === 0 ? "font-medium" : ""}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <NoteBox>
            <strong>Final Exam Tip — How to Answer "Evolution of Management Thought" Questions:</strong><br /><br />
            1. <strong>Chronological structure:</strong> Always present schools in order — Classical → Behavioural → Quantitative → Systems → Contingency → Modern<br />
            2. <strong>Each school was a response:</strong> Explain what problem each school was reacting to (e.g., behavioural school reacted to classical school's neglect of human factors)<br />
            3. <strong>Apply to Kenya:</strong> Examiners at TUK expect you to apply concepts to the Kenyan or East African business context — always have a local example ready<br />
            4. <strong>Strengths and limitations:</strong> No school is perfect — know the key criticism of each<br />
            5. <strong>Avoid saying any school is "wrong":</strong> Each school captured real insights; modern management draws on all of them simultaneously
          </NoteBox>

          {/* Navigation */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-3 justify-between">
              <Link href="/topic/2" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-colors">
                ← Topic 2: Forms of Business Organizations
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Back to Home →
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky sidebar nav */}
        <aside className="hidden xl:block w-56 shrink-0">
          <div className="sticky top-20">
            <p className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">On this page</p>
            <div className="flex flex-col gap-0.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`text-xs px-3 py-1.5 rounded transition-colors ${
                    activeSection === s.id
                      ? "bg-primary/10 text-primary font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.label}
                </a>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Section progress</p>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{progress}% through sections</p>
            </div>
          </div>
        </aside>
      </div>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-primary p-2.5 text-primary-foreground shadow-lg hover:bg-primary/90 transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}
    </Layout>
  );
}
