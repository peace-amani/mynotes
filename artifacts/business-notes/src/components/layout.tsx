import { Link, useLocation } from "wouter";
import { BookOpen, ChevronRight, Moon, Sun, Library, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LayoutProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function Layout({ children, breadcrumbs }: LayoutProps) {
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();

  const unit1Topics = [
    { id: 1, title: "Introduction to Management", available: true },
    { id: 2, title: "Evolution of Management Thought", available: false },
    { id: 3, title: "Planning", available: false },
    { id: 4, title: "Organizing", available: false },
  ];

  const unit2Topics = [
    { id: 1, title: "Introduction to Macroeconomics", available: true },
    { id: 2, title: "National Income", available: true },
    { id: 3, title: "Money and Banking", available: false },
    { id: 4, title: "Fiscal Policy", available: false },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 z-30 hidden h-screen w-64 flex-col border-r border-border bg-sidebar md:flex">
        <div className="flex h-14 items-center px-4 py-4 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2 font-serif font-bold text-lg text-sidebar-foreground transition-opacity hover:opacity-80">
            <Library className="h-5 w-5 text-primary dark:text-primary" />
            <span>Study Notes</span>
          </Link>
        </div>

        <ScrollArea className="flex-1 py-4">
          {/* Unit 1 */}
          <div className="px-4 mb-2">
            <Link href="/" className="block">
              <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase hover:text-foreground transition-colors">
                Unit 1 — Business Mgmt
              </h2>
            </Link>
          </div>
          <nav className="space-y-1 px-2 mb-6">
            {unit1Topics.map((topic) => {
              const isActive = location === `/topic/${topic.id}`;
              if (!topic.available) {
                return (
                  <div
                    key={topic.id}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm opacity-40 cursor-not-allowed"
                    title="Coming soon"
                  >
                    <BookOpen className="h-4 w-4 shrink-0" />
                    <span className="truncate">Topic {topic.id}: {topic.title}</span>
                  </div>
                );
              }
              return (
                <Link
                  key={topic.id}
                  href={`/topic/${topic.id}`}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`}
                  data-testid={`nav-unit1-topic-${topic.id}`}
                >
                  <BookOpen className="h-4 w-4 shrink-0" />
                  <span className="truncate">Topic {topic.id}: {topic.title}</span>
                </Link>
              );
            })}
          </nav>

          {/* Unit 2 */}
          <div className="px-4 mb-2">
            <Link href="/unit/2">
              <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase hover:text-foreground transition-colors">
                Unit 2 — Economics
              </h2>
            </Link>
          </div>
          <nav className="space-y-1 px-2">
            {unit2Topics.map((topic) => {
              const isActive = location === `/economics/${topic.id}`;
              if (!topic.available) {
                return (
                  <div
                    key={topic.id}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm opacity-40 cursor-not-allowed"
                    title="Coming soon"
                  >
                    <TrendingUp className="h-4 w-4 shrink-0" />
                    <span className="truncate">Week {topic.id}: {topic.title}</span>
                  </div>
                );
              }
              return (
                <Link
                  key={topic.id}
                  href={`/economics/${topic.id}`}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  }`}
                  data-testid={`nav-unit2-topic-${topic.id}`}
                >
                  <TrendingUp className="h-4 w-4 shrink-0" />
                  <span className="truncate">Week {topic.id}: {topic.title}</span>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-sidebar-border">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            data-testid="btn-toggle-theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:pl-64 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6">
          <div className="flex flex-1 items-center gap-2 text-sm text-muted-foreground">
            {breadcrumbs && breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-foreground transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            ))}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}
