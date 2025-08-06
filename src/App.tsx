import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TradingLayout } from "./components/TradingLayout";
import Dashboard from "./pages/Dashboard";
import TradingConfig from "./pages/TradingConfig";
import StrategyManagement from "./pages/StrategyManagement";
import MarketAnalysis from "./pages/MarketAnalysis";
import LiveTrading from "./pages/LiveTrading";
import Backtesting from "./pages/Backtesting";
import SystemHealth from "./pages/SystemHealth";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TradingLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/config" element={<TradingConfig />} />
            <Route path="/strategies" element={<StrategyManagement />} />
            <Route path="/analysis" element={<MarketAnalysis />} />
            <Route path="/trading" element={<LiveTrading />} />
            <Route path="/backtesting" element={<Backtesting />} />
            <Route path="/health" element={<SystemHealth />} />
            <Route path="/settings" element={<Settings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TradingLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
