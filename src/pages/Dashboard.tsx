// Main Dashboard Page - Professional Trading Overview
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Eye,
  BarChart3
} from "lucide-react";
import { mockPortfolio, mockSymbols, mockSignals, mockTrades, formatCurrency, formatPercentage, formatNumber } from "@/lib/mockData";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [realtimeData, setRealtimeData] = useState(mockSymbols);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate price movements
      setRealtimeData(prev => prev.map(symbol => ({
        ...symbol,
        price: symbol.price * (1 + (Math.random() - 0.5) * 0.001), // ±0.05% movement
        pnl: symbol.pnl + (Math.random() - 0.5) * 10 // Small P&L changes
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const { totalEquity, availableBalance, allocatedBalance, unrealizedPnL, realizedPnL, dailyPnL } = mockPortfolio;
  const dailyPnLPercentage = (dailyPnL / totalEquity) * 100;
  const allocatedPercentage = (allocatedBalance / totalEquity) * 100;

  // Calculate totals
  const totalSignalsToday = mockSignals.length;
  const successRate = 74.2;
  const activeTraders = realtimeData.filter(s => s.health === 'active').length;
  const totalPnL = unrealizedPnL + realizedPnL;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header with quick actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trading Dashboard</h1>
          <p className="text-muted-foreground">Real-time overview of your automated trading system</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Pause className="w-4 h-4 mr-1" />
            Pause Trading
          </Button>
          <Button variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
          <Button variant="destructive" size="sm">
            <AlertTriangle className="w-4 h-4 mr-1" />
            Emergency Halt
          </Button>
        </div>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Equity</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{formatCurrency(totalEquity)}</div>
            <p className="text-xs text-muted-foreground">
              Available: {formatCurrency(availableBalance)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily P&L</CardTitle>
            {dailyPnL >= 0 ? 
              <TrendingUp className="h-4 w-4 text-profit" /> : 
              <TrendingDown className="h-4 w-4 text-loss" />
            }
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold font-mono ${dailyPnL >= 0 ? 'text-profit' : 'text-loss'}`}>
              {formatCurrency(dailyPnL)}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(dailyPnLPercentage)} today
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold font-mono ${totalPnL >= 0 ? 'text-profit' : 'text-loss'}`}>
              {formatCurrency(totalPnL)}
            </div>
            <p className="text-xs text-muted-foreground">
              Realized: {formatCurrency(realizedPnL)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-status-active" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-status-active">ONLINE</div>
            <p className="text-xs text-muted-foreground">
              {activeTraders}/{realtimeData.length} traders active
            </p>
          </CardContent>
        </Card>
      </div>

      {/* System Status Panel and Portfolio Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Portfolio Allocation</span>
                <span className="text-sm font-mono">{formatNumber(allocatedPercentage, 1)}%</span>
              </div>
              <Progress value={allocatedPercentage} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Success Rate</span>
                <span className="text-sm font-mono text-profit">{formatNumber(successRate, 1)}%</span>
              </div>
              <Progress value={successRate} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{totalSignalsToday}</div>
                <div className="text-xs text-muted-foreground">Signals Today</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{mockTrades.length}</div>
                <div className="text-xs text-muted-foreground">Trades Executed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Live Trading Activity
            </CardTitle>
            <CardDescription>Real-time signals and trade execution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {mockSignals.slice(0, 6).map((signal) => (
                <div key={signal.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant={signal.type === 'BUY' ? 'default' : 'destructive'} className="min-w-[50px]">
                      {signal.type}
                    </Badge>
                    <div>
                      <div className="font-medium">{signal.symbol}</div>
                      <div className="text-xs text-muted-foreground">{signal.reason}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">{formatCurrency(signal.price)}</div>
                    <div className="text-xs text-muted-foreground">
                      {signal.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Symbol Performance Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Symbol Performance Overview
          </CardTitle>
          <CardDescription>Real-time performance of all trading pairs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {realtimeData.map((symbol) => (
              <Card key={symbol.symbol} className="relative overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{symbol.symbol}</CardTitle>
                      <CardDescription>{symbol.name}</CardDescription>
                    </div>
                    <Badge 
                      variant={symbol.health === 'active' ? 'default' : 
                              symbol.health === 'warning' ? 'secondary' : 
                              symbol.health === 'error' ? 'destructive' : 'outline'}
                      className="capitalize"
                    >
                      {symbol.health}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <span className="font-mono font-bold">{formatCurrency(symbol.price)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">24h Change</span>
                    <span className={`font-mono font-bold ${symbol.change24h >= 0 ? 'text-profit' : 'text-loss'}`}>
                      {formatPercentage(symbol.change24h)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">P&L</span>
                    <span className={`font-mono font-bold ${symbol.pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                      {formatCurrency(symbol.pnl)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Strategy</span>
                    <span className="text-sm">{symbol.strategy}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-xs text-muted-foreground">Signals: {symbol.signalCount}</span>
                    <span className="text-xs text-muted-foreground">
                      Last: {symbol.lastSignal.toLocaleTimeString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Real-time Metrics Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-primary">12.4</div>
              <div className="text-xs text-muted-foreground">Signals/min</div>
            </div>
            <div>
              <div className="text-lg font-bold text-profit">{formatNumber(successRate, 1)}%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-lg font-bold text-warning">2</div>
              <div className="text-xs text-muted-foreground">Warnings</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">45ms</div>
              <div className="text-xs text-muted-foreground">Avg Latency</div>
            </div>
            <div>
              <div className="text-lg font-bold text-primary">2.1GB</div>
              <div className="text-xs text-muted-foreground">Memory</div>
            </div>
            <div>
              <div className="text-lg font-bold text-status-active">99.98%</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}