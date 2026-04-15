import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Topic1 from "@/pages/topic-1";
import EconomicsTopic1 from "@/pages/economics-topic-1";
import EconomicsTopic2 from "@/pages/economics-topic-2";
import EconomicsTopic3 from "@/pages/economics-topic-3";
import EconomicsTopic5 from "@/pages/economics-topic-5";
import HealthTopic1 from "@/pages/health-topic-1";
import HealthTopic2 from "@/pages/health-topic-2";
import SocietyTopic1 from "@/pages/society-topic-1";
import SocietyTopic2 from "@/pages/society-topic-2";
import SocietyTopic3 from "@/pages/society-topic-3";
import SocietyTopic4 from "@/pages/society-topic-4";
import SocietyTopic5 from "@/pages/society-topic-5";
import SocietyTopic6 from "@/pages/society-topic-6";
import SocietyTopic8 from "@/pages/society-topic-8";
import SocietyTopic9 from "@/pages/society-topic-9";
import SocietyTopic10 from "@/pages/society-topic-10";
import SocietyTopic11 from "@/pages/society-topic-11";
import SocietyTopic12 from "@/pages/society-topic-12";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/unit/2" component={Home} />
      <Route path="/topic/1" component={Topic1} />
      <Route path="/economics/1" component={EconomicsTopic1} />
      <Route path="/economics/2" component={EconomicsTopic2} />
      <Route path="/economics/3" component={EconomicsTopic3} />
      <Route path="/economics/5" component={EconomicsTopic5} />
      <Route path="/health/1" component={HealthTopic1} />
      <Route path="/health/2" component={HealthTopic2} />
      <Route path="/society/1" component={SocietyTopic1} />
      <Route path="/society/2" component={SocietyTopic2} />
      <Route path="/society/3" component={SocietyTopic3} />
      <Route path="/society/4" component={SocietyTopic4} />
      <Route path="/society/5" component={SocietyTopic5} />
      <Route path="/society/6" component={SocietyTopic6} />
      <Route path="/society/8" component={SocietyTopic8} />
      <Route path="/society/9" component={SocietyTopic9} />
      <Route path="/society/10" component={SocietyTopic10} />
      <Route path="/society/11" component={SocietyTopic11} />
      <Route path="/society/12" component={SocietyTopic12} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="study-notes-theme">
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
