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
import EconomicsTopic5 from "@/pages/economics-topic-5";
import SocietyTopic2 from "@/pages/society-topic-2";
import SocietyTopic4 from "@/pages/society-topic-4";
import SocietyTopic5 from "@/pages/society-topic-5";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/unit/2" component={Home} />
      <Route path="/topic/1" component={Topic1} />
      <Route path="/economics/1" component={EconomicsTopic1} />
      <Route path="/economics/2" component={EconomicsTopic2} />
      <Route path="/economics/5" component={EconomicsTopic5} />
      <Route path="/society/2" component={SocietyTopic2} />
      <Route path="/society/4" component={SocietyTopic4} />
      <Route path="/society/5" component={SocietyTopic5} />
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
