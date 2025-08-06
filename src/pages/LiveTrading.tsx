// Live Trading & Monitoring Page
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  AlertTriangle,
  Power,
  Pause,
  Play,
  RotateCcw,
  DollarSign,
  Target,
  Zap,
  Eye,
  Shield
} from "lucide-react";
import { mockPortfolio, mockSymbols, mockSignals, mockTrades, formatCurrency, formatPercentage, formatNumber } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function LiveTrading() {
  const { toast } = useToast();
  const [isTrading, setIsTrading] = useState(true);
  const [realtimeData, setRealtimeData] = useState({
    portfolio: mockPortfolio,
    symbols: mockSymbols,
    signals: mockSignals,
    trades: mockTrades
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeData(prev => ({
        ...prev,
        portfolio: {
          ...prev.portfolio,
          totalEquity: prev.portfolio.totalEquity * (1 + (Math.random() - 0.5) * 0.0001),
          unrealizedPnL: prev.portfolio.unrealizedPnL + (Math.random() - 0.5) * 50,
          dailyPnL: prev.portfolio.dailyPnL + (Math.random() - 0.5) * 20
        },
        symbols: prev.symbols.map(symbol => ({
          ...symbol,
          price: symbol.price * (1 + (Math.random() - 0.5) * 0.001),
          pnl: symbol.pnl + (Math.random() - 0.5) * 5
        }))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleEmergencyHalt = () => {
    setIsTrading(false);
    toast({
      title: "Emergency Halt Activated",
      description: "All trading has been stopped immediately.",
      variant: "destructive",
    });
  };

  const handlePauseTrading = () => {
    setIsTrading(!isTrading);
    toast({
      title: isTrading ? "Trading Paused" : "Trading Resumed",
      description: isTrading ? "All new signals will be ignored." : "Signal processing has resumed.",
    });
  };

  const { totalEquity, unrealizedPnL, realizedPnL, dailyPnL } = realtimeData.portfolio;
  const dailyPnLPercentage = (dailyPnL / totalEquity) * 100;
  const totalPnL = unrealizedPnL + realizedPnL;
  const totalPnLPercentage = (totalPnL / totalEquity) * 100;

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Live Trading Monitor</h1>
          <p className="text-muted-foreground">Real-time portfolio monitoring and risk management</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant={isTrading ? "default" : "secondary"} className="px-3 py-1">
            {isTrading ? (
              <>
                <Play className="w-3 h-3 mr-1" />
                ACTIVE
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 mr-1" />
                PAUSED
              </>
            )}
          </Badge>
          
          <Button variant="outline" size="sm" onClick={handlePauseTrading}>
            {isTrading ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
            {isTrading ? "Pause" : "Resume"}
          </Button>
          
          <Button variant="destructive" size="sm" onClick={handleEmergencyHalt}>
            <Power className="w-4 h-4 mr-1" />
            EMERGENCY HALT
          </Button>
        </div>
      </div>

      {/* Real-time Portfolio Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={`bg-card/50 backdrop-blur-sm ${totalPnL >= 0 ? 'ring-1 ring-profit/20' : 'ring-1 ring-loss/20'}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Equity</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{formatCurrency(totalEquity)}</div>
            <p className="text-xs text-muted-foreground">
              <span className="animate-pulse">●</span> Live updating
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
            <CardTitle className="text-sm font-medium">Unrealized P&L</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold font-mono ${unrealizedPnL >= 0 ? 'text-profit' : 'text-loss'}`}>
              {formatCurrency(unrealizedPnL)}
            </div>
            <p className="text-xs text-muted-foreground">
              Open positions
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold font-mono ${totalPnL >= 0 ? 'text-profit' : 'text-loss'}`}>
              {formatCurrency(totalPnL)}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatPercentage(totalPnLPercentage)} return
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Position Manager */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Active Positions
            </CardTitle>
            <CardDescription>Real-time position monitoring and P&L tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {realtimeData.symbols.filter(s => s.position > 0).map((position) => (
                <Card key={position.symbol} className="p-4 bg-secondary/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-medium">{position.symbol}</h3>
                        <p className="text-sm text-muted-foreground">{position.name}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {position.strategy}
                      </Badge>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold font-mono">{formatCurrency(position.price)}</div>
                      <div className={`text-sm font-mono ${position.change24h >= 0 ? 'text-profit' : 'text-loss'}`}>
                        {formatPercentage(position.change24h)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                    <div>
                      <div className="text-xs text-muted-foreground">Position Size</div>
                      <div className="font-mono">{formatNumber(position.position, 4)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Market Value</div>
                      <div className="font-mono">{formatCurrency(position.position * position.price)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Unrealized P&L</div>
                      <div className={`font-mono ${position.pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                        {formatCurrency(position.pnl)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      View Chart
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      Reduce 50%
                    </Button>
                    <Button variant="destructive" size="sm" className="text-xs">
                      Close Position
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Monitor */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Risk Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Portfolio Risk</span>
                  <span className="text-sm font-mono text-warning">Medium</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Exposure Level</span>
                  <span className="text-sm font-mono">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Daily Loss Limit</span>
                  <span className="text-sm font-mono text-profit">Safe</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
            </div>

            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span>Max Position Size:</span>
                <span className="font-mono">$15,000</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Stop Loss Buffer:</span>
                <span className="font-mono">5.0%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Correlation Risk:</span>
                <span className="font-mono text-warning">0.72</span>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <AlertTriangle className="w-4 h-4 mr-1" />
              Risk Analysis Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Live Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Signal Feed
            </CardTitle>
            <CardDescription>Real-time trading signals as they're generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {realtimeData.signals.map((signal) => (
                <div key={signal.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant={signal.type === 'BUY' ? 'default' : 'destructive'} 
                      className={`${signal.status === 'executed' ? 'animate-pulse-profit' : ''}`}
                    >
                      {signal.type}
                    </Badge>
                    <div>
                      <div className="font-medium">{signal.symbol}</div>
                      <div className="text-xs text-muted-foreground">{signal.reason}</div>
                      <div className="text-xs text-muted-foreground">
                        Confidence: {formatNumber(signal.confidence * 100, 0)}%
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">{formatCurrency(signal.price)}</div>
                    <div className="text-xs text-muted-foreground">
                      {signal.timestamp.toLocaleTimeString()}
                    </div>
                    <Badge 
                      variant={signal.status === 'executed' ? 'default' : 
                              signal.status === 'pending' ? 'secondary' : 'destructive'}
                      className="text-xs mt-1"
                    >
                      {signal.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Trade Execution Log
            </CardTitle>
            <CardDescription>Orders placed, filled, and rejected</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {realtimeData.trades.map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant={trade.side === 'BUY' ? 'default' : 'destructive'}>
                      {trade.side}
                    </Badge>
                    <div>
                      <div className="font-medium">{trade.symbol}</div>
                      <div className="text-xs text-muted-foreground">
                        Amount: {formatNumber(trade.amount, 4)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-sm">{formatCurrency(trade.price)}</div>
                    <div className={`text-xs font-mono ${trade.pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                      P&L: {formatCurrency(trade.pnl)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {trade.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <Pause className="w-5 h-5" />
              <span className="text-xs">Pause All</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <RotateCcw className="w-5 h-5" />
              <span className="text-xs">Reduce Risk</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <Target className="w-5 h-5" />
              <span className="text-xs">Close 50%</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <Shield className="w-5 h-5" />
              <span className="text-xs">Risk Report</span>
            </Button>
            <Button variant="outline" className="flex flex-col items-center gap-2 h-20">
              <Activity className="w-5 h-5" />
              <span className="text-xs">Export Data</span>
            </Button>
            <Button variant="destructive" className="flex flex-col items-center gap-2 h-20">
              <Power className="w-5 h-5" />
              <span className="text-xs">Emergency</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}