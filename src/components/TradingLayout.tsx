import { SidebarProvider } from "@/components/ui/sidebar";
import { TradingSidebar } from "./TradingSidebar";
import { TradingHeader } from "./TradingHeader";

interface TradingLayoutProps {
  children: React.ReactNode;
}

export function TradingLayout({ children }: TradingLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <TradingSidebar />
        
        <div className="flex-1 flex flex-col">
          <TradingHeader />
          
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}