import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { Layout } from "@/components/layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, BookMarked, CheckCircle2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Topic1() {
  const [activeSection, setActiveSection] = useState<string>("section-1");
  const [scrolled, setScrolled] = useState(false);

  const sections = [
    { id: "section-1", title: "Definition and Meaning" },
    { id: "section-2", title: "Art or Science?" },
    { id: "section-3", title: "Characteristics" },
    { id: "section-4", title: "Functions" },
    { id: "section-5", title: "Management Levels" },
    { id: "section-6", title: "Management Skills" },
    { id: "section-7", title: "Managerial Roles" },
    { id: "section-8", title: "Qualities of a Good Manager" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
      
      // Update active section based on scroll position
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const currentScroll = window.scrollY + 100;
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= currentScroll) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const progress = ((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100;

  return (
    <Layout breadcrumbs={[
        { label: "Unit 1", href: "/" },
        { label: "Topic 1: Introduction to Management" }
      ]}
    >
      <Helmet>
        <title>Introduction to Management — Business Management | Study Notes</title>
        <meta name="description" content="Definition, characteristics, functions, levels and roles of management. Business Management Topic 1 study notes with examples." />
        <meta property="og:title" content="Introduction to Management — Unit 1 Business Management" />
        <meta property="og:description" content="Definition, characteristics, functions, levels and roles of management. Richly explained with real-world examples." />
        <meta property="og:image" content="https://notes.xwolf.space/og-bm-topic1.svg" />
        <meta property="og:url" content="https://notes.xwolf.space/topic/1" />
        <meta name="twitter:title" content="Introduction to Management | Study Notes" />
        <meta name="twitter:image" content="https://notes.xwolf.space/og-bm-topic1.svg" />
      </Helmet>
      {/* Reading Progress Bar */}
      <div className="sticky top-14 z-20 w-full h-1 bg-muted">
        <div 
          className="h-full bg-secondary transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-6 sm:py-8 md:py-12 flex flex-col md:flex-row gap-8">
        
        {/* Main Content */}
        <article className="flex-1 min-w-0 prose prose-slate dark:prose-invert prose-headings:font-serif prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground max-w-none">
          
          <header className="mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Introduction to Management
            </h1>
            <p className="text-base sm:text-xl text-muted-foreground leading-relaxed">
              Explore the foundational concepts of management, its core functions, and the skills required to be an effective leader in a modern organization.
            </p>
          </header>

          <div className="md:hidden mb-8 bg-card p-4 rounded-lg border border-border">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 mt-0">Contents</h3>
            <ul className="space-y-2 list-none pl-0 mt-0">
              {sections.map((section, idx) => (
                <li key={section.id} className="m-0">
                  <a href={`#${section.id}`} className="text-sm text-primary hover:text-secondary no-underline transition-colors flex gap-2">
                    <span className="text-muted-foreground/50">{idx + 1}.</span> {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <section id="section-1" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold border-b border-border pb-2 mb-6">1. Definition and Meaning of Management</h2>
            
            <Card className="my-6 bg-primary/5 border-primary/20 shadow-none">
              <CardContent className="p-6 flex gap-4">
                <Quote className="h-8 w-8 text-primary/40 shrink-0" />
                <div>
                  <p className="text-lg italic font-serif text-foreground m-0">
                    "Management is knowing exactly what you want men to do and then seeing that they do it the best and cheapest ways."
                  </p>
                  <p className="text-sm font-bold mt-2 text-primary">— F.W. Taylor</p>
                </div>
              </CardContent>
            </Card>

            <p>
              "Management is an art of getting things done through and with the people in formally organized groups. It is an art of creating an environment in which people can perform and individuals and can co-operate towards attainment of group goals."
            </p>
            <p className="font-medium text-foreground">
              Management is that act of planning, organizing, staffing, directing and controlling of organization activities so that predetermined goals can be achieved.
            </p>
          </section>

          <section id="section-2" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold border-b border-border pb-2 mb-6">2. Is Management an Art or a Science?</h2>
            <p>Management is considered to be both an art and a science.</p>

            <div className="grid md:grid-cols-2 gap-6 my-8">
              <Card className="bg-card shadow-sm border-border/60">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-bold text-primary mt-0 mb-4">Management as an Art</h3>
                  <ul className="space-y-2 m-0 text-sm">
                    <li>Involves the use of skills and know-how like any other art (music, painting, etc.)</li>
                    <li>Directed toward achievement of concrete results</li>
                    <li>Creative — creates new situations for further improvement</li>
                    <li>Has a personalized meaning — no one best way of managing; every manager has an individual approach</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-card shadow-sm border-border/60">
                <CardContent className="p-6">
                  <h3 className="text-xl font-serif font-bold text-primary mt-0 mb-4">Management as a Science</h3>
                  <ul className="space-y-2 m-0 text-sm">
                    <li>Involves operational research like other sciences</li>
                    <li>Principles explain cause and effects (like scientific laws)</li>
                    <li>Involves quantitative analysis and measurement</li>
                    <li>There is experimental analysis (e.g., quality control in production)</li>
                    <li>Advances with knowledge</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-secondary/10 border-l-4 border-secondary p-4 rounded-r-lg mt-6 text-foreground text-sm">
              <strong>NB:</strong> Management is seen to be a pseudo/quasi/inexact science — it has not been developed into a full science.
            </div>
          </section>

          <section id="section-3" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold border-b border-border pb-2 mb-6">3. Characteristics of Management</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Process", desc: "Of planning, organising, staffing, directing and controlling" },
                { title: "Goal-oriented", desc: "Major goal is to achieve business objectives" },
                { title: "Group activity", desc: "Human and physical resources must be co-ordinated for high productivity" },
                { title: "Universal application", desc: "Applied to any form of activity" },
                { title: "Dynamic", desc: "Involves adoption of an organization to environmental changes" },
                { title: "Signifies authority", desc: "Management cannot function without authority" },
                { title: "Activating Factor", desc: "Management activates other factors of production" },
                { title: "Human activity", desc: "Management functions can only be discharged by human beings" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 items-start bg-card p-4 rounded-lg border border-border/50">
                  <CheckCircle2 className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-foreground m-0">{item.title}</h4>
                    <p className="text-sm m-0 mt-1 text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="section-4" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold border-b border-border pb-2 mb-6">4. Functions of Management</h2>
            <p>Five main traditional functions:</p>
            
            <Accordion type="single" collapsible className="w-full mt-6" defaultValue="func-0">
              {[
                { title: "Planning", content: "Deciding in advance what is to be done, how, when, who, and where. Involves predetermining goals, objectives, policies, strategies, procedures and rules. Also involves identifying, analyzing and selecting courses of action." },
                { title: "Organizing", content: "Process involving identifying activities to be carried out, grouping similar activities together, creating departments/divisions, assigning duties, responsibilities and authority. Defines organizational structure, span of control, and forms of organization." },
                { title: "Staffing", content: "Matching workers to job requirements. Elements include: recruitment, selection, training and development, compensation, performance advisory, discipline and separation." },
                { title: "Directing", content: "Deals with guidance and supervision of individual and group efforts. Stimulates through motivation, clarifies through communication, coordinates employees and directs them toward goals through good leadership." },
                { title: "Controlling", content: "Begins where planning ends: Establishing performance standards, measuring actual performance, comparing actual vs. set standards, taking corrective action when necessary." }
              ].map((func, i) => (
                <AccordionItem key={i} value={`func-${i}`} className="border-border/50">
                  <AccordionTrigger className="text-lg font-serif font-bold text-foreground hover:text-primary transition-colors">
                    {i + 1}. {func.title}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {func.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section id="section-5" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold border-b border-border pb-2 mb-6">5. Management Levels</h2>
            <p>Three main decision-making hierarchy levels:</p>

            <div className="space-y-8 mt-8">
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="bg-primary/10 px-6 py-4 border-b border-border">
                  <h3 className="text-xl font-serif font-bold text-primary m-0">Top Level Managers</h3>
                  <p className="text-sm text-muted-foreground m-0 mt-1">Small group responsible for overall management. Establish operation policies. (e.g., CEO, MDs, GMs)</p>
                </div>
                <div className="p-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 mt-0">Key Roles</h4>
                  <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 m-0 text-sm list-none pl-0">
                    <li className="flex gap-2"><span className="text-secondary">•</span> Lay down objectives and broad policies</li>
                    <li className="flex gap-2"><span className="text-secondary">•</span> Issue instructions for budgets/procedures</li>
                    <li className="flex gap-2"><span className="text-secondary">•</span> Prepare strategic plans and policies</li>
                    <li className="flex gap-2"><span className="text-secondary">•</span> Appoint middle level executives</li>
                    <li className="flex gap-2"><span className="text-secondary">•</span> Control and coordinate all departments</li>
                    <li className="flex gap-2"><span className="text-secondary">•</span> Maintain contact with the outside world</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="bg-muted px-6 py-4 border-b border-border">
                  <h3 className="text-xl font-serif font-bold text-foreground m-0">Middle Level Managers</h3>
                  <p className="text-sm text-muted-foreground m-0 mt-1">Branch and departmental managers. Responsible to top management. Direct lower-level managers.</p>
                </div>
                <div className="p-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 mt-0">Key Roles</h4>
                  <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 m-0 text-sm list-none pl-0">
                    <li className="flex gap-2"><span className="text-muted-foreground">•</span> Execute plans according to top policies</li>
                    <li className="flex gap-2"><span className="text-muted-foreground">•</span> Make plans for sub-units</li>
                    <li className="flex gap-2"><span className="text-muted-foreground">•</span> Participate in hiring lower management</li>
                    <li className="flex gap-2"><span className="text-muted-foreground">•</span> Interpret policies to lower level</li>
                    <li className="flex gap-2"><span className="text-muted-foreground">•</span> Coordinate activities within department</li>
                    <li className="flex gap-2"><span className="text-muted-foreground">•</span> Send reports to top management</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="bg-card px-6 py-4 border-b border-border">
                  <h3 className="text-xl font-serif font-bold text-foreground m-0">First Line / First Level Managers</h3>
                  <p className="text-sm text-muted-foreground m-0 mt-1">Supervisory/Operative Level. Responsible for non-management employees. (e.g., Foreman, Supervisor)</p>
                </div>
                <div className="p-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3 mt-0">Key Roles</h4>
                  <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-2 m-0 text-sm list-none pl-0">
                    <li className="flex gap-2"><span className="text-muted-foreground">•</span> Assign jobs and tasks to workers</li>
                    <li className="flex gap-2"><span className="text-muted-foreground">•</span> Guide workers for day-to-day activities</li>
                    <li className="flex gap-2"><span className="text-muted-foreground">•</span> Responsible for quality/quantity of production</li>
                    <li className="flex gap-2"><span className="text-muted-foreground">•</span> Help solve grievances of workers</li>
                    <li className="flex gap-2"><span className="text-muted-foreground">•</span> Provide training to workers</li>
                    <li className="flex gap-2"><span className="text-muted-foreground">•</span> Image builders — direct contact with workers</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="section-6" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold border-b border-border pb-2 mb-6">6. Management Skills</h2>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <Card className="bg-card border-border shadow-sm">
                <CardContent className="p-5">
                  <h4 className="text-lg font-bold text-primary mt-0 mb-2">Technical Skills</h4>
                  <p className="text-sm m-0">Ability to use procedures, techniques and knowledge of a specialized field. Very important at lower levels.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-sm">
                <CardContent className="p-5">
                  <h4 className="text-lg font-bold text-primary mt-0 mb-2">Human Skills</h4>
                  <p className="text-sm m-0">Ability to work with, understand and motivate other people. Important at every level; primary for middle managers.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-sm">
                <CardContent className="p-5">
                  <h4 className="text-lg font-bold text-primary mt-0 mb-2">Conceptual Skills</h4>
                  <p className="text-sm m-0">Ability to coordinate and integrate all interests. Understanding the organization as a whole. Most important at top levels.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border shadow-sm">
                <CardContent className="p-5">
                  <h4 className="text-lg font-bold text-primary mt-0 mb-2">Diagnostic Skills</h4>
                  <p className="text-sm m-0">Identifying and prescribing possible solutions to problems. Most important at top level, moderately at middle.</p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-muted p-6 rounded-lg border border-border overflow-x-auto">
              <h4 className="text-sm font-bold uppercase tracking-wider text-foreground mb-4 mt-0">Levels vs. Skills Summary</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-bold">Skill</TableHead>
                    <TableHead className="font-bold">Importance by Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Technical</TableCell>
                    <TableCell>Most important at lower levels</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Human</TableCell>
                    <TableCell>Important at all levels; primary for middle managers</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Conceptual</TableCell>
                    <TableCell>Increases with rank; most important at top</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-foreground">Diagnostic</TableCell>
                    <TableCell>Most important at top, moderately at middle, least at lower</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>

          <section id="section-7" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold border-b border-border pb-2 mb-6">7. Managerial Roles (Mintzberg)</h2>
            <p>Henry Mintzberg identified 10 roles grouped into 3 categories:</p>

            <div className="space-y-6 mt-6">
              <div>
                <h3 className="text-xl font-serif text-secondary font-bold mb-3 border-l-2 border-secondary pl-3">Interpersonal Roles</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Figurehead</strong> — Ceremonial activities (prize giving, long service awards)</li>
                  <li><strong>Leader</strong> — Coordination and control; hiring, training, motivating employees</li>
                  <li><strong>Liaison</strong> — Making contact with individuals inside/outside the organization</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-serif text-secondary font-bold mb-3 border-l-2 border-secondary pl-3">Informational Roles</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Monitor</strong> — Continually scanning the environment for opportunities or threats</li>
                  <li><strong>Disseminator</strong> — Transmitting information gathered to subordinates, peers or supervisors</li>
                  <li><strong>Spokesperson</strong> — Representing the work unit to people inside and outside</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-serif text-secondary font-bold mb-3 border-l-2 border-secondary pl-3">Decisional Roles</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Entrepreneur</strong> — Seeking to improve work unit by adopting/modifying techniques</li>
                  <li><strong>Disturbance Handler</strong> — Responder to change; brings stability</li>
                  <li><strong>Resource Allocator</strong> — Decides who gets resources and how much</li>
                  <li><strong>Negotiator</strong> — Assumes when authority exists to commit organizational resources</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="section-8" className="scroll-mt-24 mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold border-b border-border pb-2 mb-6">8. Qualities of a Good Modern Manager</h2>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {[
                { title: "Knowledge of Organization", desc: "Insight of the organization as a whole, objectives, policies" },
                { title: "Technical Ability", desc: "Sound technical knowledge" },
                { title: "Ability to Communicate", desc: "Communicate fluently, accurately, simply yet effectively" },
                { title: "Cooperation", desc: "Art of getting cooperation from all employees" },
                { title: "Orderly", desc: "Disciplined, positive in thought" },
                { title: "Ability to Judge", desc: "Correct assessment of people, places and events" },
                { title: "Emotional Ability", desc: "Not temperamental; cool and patient" },
                { title: "Tactfulness", desc: "Tactful and shrewd; able to make ingenious compromise" }
              ].map((quality, i) => (
                <div key={i} className="flex flex-col">
                  <strong className="text-foreground">{i+1}. {quality.title}</strong>
                  <span className="text-sm text-muted-foreground">{quality.desc}</span>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-12" />

          {/* Key Terms / Summary Box */}
          <div className="bg-primary text-primary-foreground rounded-xl p-8 shadow-lg relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <BookMarked className="w-32 h-32" />
            </div>
            <h3 className="text-2xl font-serif font-bold mt-0 mb-4 flex items-center gap-2 relative z-10">
              <BookMarked className="h-6 w-6 text-secondary" />
              Quick Summary
            </h3>
            <p className="text-primary-foreground/80 mb-0 relative z-10 text-sm md:text-base leading-relaxed">
              Management is an essential discipline blending art and science to achieve organizational goals. 
              It involves five core functions: <strong>Planning, Organizing, Staffing, Directing, and Controlling</strong>. 
              Effective managers at all levels require a mix of technical, human, conceptual, and diagnostic skills 
              to navigate Mintzberg's interpersonal, informational, and decisional roles successfully.
            </p>
          </div>

        </article>

        {/* Desktop Table of Contents Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Contents</h3>
            <div className="space-y-1 relative before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border ml-2 pl-4">
              {sections.map((section, idx) => {
                const isActive = activeSection === section.id;
                return (
                  <div key={section.id} className="relative">
                    {isActive && (
                      <div className="absolute -left-[17px] top-1.5 w-0.5 h-3 bg-secondary rounded-r-full" />
                    )}
                    <a 
                      href={`#${section.id}`}
                      className={`block py-1 text-sm transition-colors ${
                        isActive 
                          ? "text-foreground font-medium" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {idx + 1}. {section.title}
                    </a>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 text-sm text-muted-foreground bg-card border border-border p-4 rounded-lg">
              <p className="mb-2 font-medium text-foreground">Study Progress</p>
              <div className="flex items-center justify-between mb-1">
                <span>Section {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>
        </aside>

      </div>

      {/* Scroll to top button */}
      {scrolled && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 h-12 w-12 rounded-full shadow-lg z-50 bg-primary text-primary-foreground hover:bg-primary/90"
          data-testid="btn-scroll-top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}
    </Layout>
  );
}
