import { Bell, Power, Settings, User, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { mockPortfolio } from "@/lib/mockData";
import { formatCurrency, formatPercentage } from "@/lib/mockData";

export function TradingHeader() {
  const { dailyPnL, totalEquity } = mockPortfolio;
  const dailyPnLPercentage = (dailyPnL / totalEquity) * 100;

  return (
    <header className="h-14 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 sticky top-0 z-50">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-8 w-8" />
        
        {/* Real-time equity display */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Total Equity:</span>
            <span className="font-mono font-semibold text-foreground">
              {formatCurrency(totalEquity)}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Daily P&L:</span>
            <span className={`font-mono font-semibold ${dailyPnL >= 0 ? 'text-profit' : 'text-loss'}`}>
              {formatCurrency(dailyPnL)} ({formatPercentage(dailyPnLPercentage)})
            </span>
          </div>
        </div>
      </div>

      {/* Center section - System status */}
      <div className="flex items-center gap-3">
        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
          <CheckCircle className="w-3 h-3 mr-1" />
          LIVE Trading
        </Badge>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <div className="w-2 h-2 bg-status-active rounded-full animate-pulse"></div>
          <span>All Systems Online</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Recent Alerts</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-start gap-2 p-3">
              <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
              <div className="flex-1">
                <div className="font-medium">High exposure warning</div>
                <div className="text-xs text-muted-foreground">SOLUSDT position exceeds 80% allocation</div>
                <div className="text-xs text-muted-foreground mt-1">2 minutes ago</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-2 p-3">
              <CheckCircle className="w-4 h-4 text-success mt-0.5" />
              <div className="flex-1">
                <div className="font-medium">Trade executed</div>
                <div className="text-xs text-muted-foreground">BUY 0.15 BTC at $67,234.56</div>
                <div className="text-xs text-muted-foreground mt-1">5 minutes ago</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-start gap-2 p-3">
              <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
              <div className="flex-1">
                <div className="font-medium">Strategy alert</div>
                <div className="text-xs text-muted-foreground">MACD divergence detected on ETHUSDT</div>
                <div className="text-xs text-muted-foreground mt-1">8 minutes ago</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Emergency halt button */}
        <Button variant="destructive" size="sm" className="font-medium">
          <Power className="w-4 h-4 mr-1" />
          HALT
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <User className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="hidden sm:block text-sm">Trader</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Trading Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Power className="w-4 h-4 mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}