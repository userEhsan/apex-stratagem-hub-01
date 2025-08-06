// Backtesting & Analytics Page
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Activity, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Play,
  Download,
  Calendar as CalendarIcon,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { format } from "date-fns";
import { mockSymbols, mockStrategies, formatCurrency, formatPercentage, formatNumber } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Backtesting() {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState({
    from: new Date(2024, 0, 1),
    to: new Date()
  });
  const [selectedSymbols, setSelectedSymbols] = useState(['BTCUSDT', 'ETHUSDT']);
  const [selectedStrategy, setSelectedStrategy] = useState('enhanced-macd');
  const [initialCapital, setInitialCapital] = useState(100000);
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);

  // Mock backtest results
  const mockResults = {
    summary: {
      totalReturn: 24.7,
      sharpeRatio: 1.84,
      maxDrawdown: 8.2,
      winRate: 74.2,
      totalTrades: 1247,
      profitFactor: 1.67,
      avgWin: 3.2,
      avgLoss: -1.9,
      finalEquity: 124700
    },
    equityCurve: [
      { date: '2024-01-01', equity: 100000 },
      { date: '2024-02-01', equity: 102300 },
      { date: '2024-03-01', equity: 108900 },
      { date: '2024-04-01', equity: 106200 },
      { date: '2024-05-01', equity: 112800 },
      { date: '2024-06-01', equity: 118500 },
      { date: '2024-07-01', equity: 124700 }
    ],
    symbolBreakdown: [
      { symbol: 'BTCUSDT', return: 18.5, trades: 687, winRate: 76.8 },
      { symbol: 'ETHUSDT', return: 12.3, trades: 432, winRate: 71.5 },
      { symbol: 'ADAUSDT', return: 8.9, trades: 128, winRate: 69.2 }
    ],
    monthlyReturns: [
      { month: 'Jan', return: 2.3 },
      { month: 'Feb', return: 6.4 },
      { month: 'Mar', return: -2.5 },
      { month: 'Apr', return: 6.2 },
      { month: 'May', return: 5.3 },
      { month: 'Jun', return: 4.8 },
      { month: 'Jul', return: 1.8 }
    ]
  };

  const handleRunBacktest = () => {
    setIsRunning(true);
    toast({
      title: "Backtest Started",
      description: "Running strategy analysis on historical data...",
    });

    // Simulate backtest execution
    setTimeout(() => {
      setIsRunning(false);
      setResults(mockResults);
      toast({
        title: "Backtest Complete",
        description: "Analysis finished successfully. Results are now available.",
      });
    }, 3000);
  };

  const handleExportResults = () => {
    toast({
      title: "Export Started",
      description: "Downloading backtest results as CSV...",
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Backtesting & Analytics</h1>
          <p className="text-muted-foreground">Test strategies on historical data and analyze performance</p>
        </div>
        
        <div className="flex items-center gap-2">
          {results && (
            <Button variant="outline" onClick={handleExportResults}>
              <Download className="w-4 h-4 mr-1" />
              Export Results
            </Button>
          )}
          <Button onClick={handleRunBacktest} disabled={isRunning}>
            {isRunning ? (
              <>
                <Zap className="w-4 h-4 mr-1 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-1" />
                Run Backtest
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Backtest Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date Range */}
            <div className="space-y-3">
              <Label>Date Range</Label>
              <div className="grid grid-cols-2 gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.from ? format(dateRange.from, "PP") : "From date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.from}
                      onSelect={(date) => setDateRange(prev => ({ ...prev, from: date || new Date() }))}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange.to ? format(dateRange.to, "PP") : "To date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={dateRange.to}
                      onSelect={(date) => setDateRange(prev => ({ ...prev, to: date || new Date() }))}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Symbol Selection */}
            <div className="space-y-3">
              <Label>Symbols to Test</Label>
              <div className="space-y-2">
                {mockSymbols.map((symbol) => (
                  <div key={symbol.symbol} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={symbol.symbol}
                      checked={selectedSymbols.includes(symbol.symbol)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSymbols(prev => [...prev, symbol.symbol]);
                        } else {
                          setSelectedSymbols(prev => prev.filter(s => s !== symbol.symbol));
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor={symbol.symbol} className="text-sm">
                      {symbol.symbol} - {symbol.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy Selection */}
            <div className="space-y-2">
              <Label>Strategy</Label>
              <Select value={selectedStrategy} onValueChange={setSelectedStrategy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockStrategies.map((strategy) => (
                    <SelectItem key={strategy.id} value={strategy.id}>
                      {strategy.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Capital Settings */}
            <div className="space-y-2">
              <Label htmlFor="initial-capital">Initial Capital</Label>
              <Input
                id="initial-capital"
                type="number"
                value={initialCapital}
                onChange={(e) => setInitialCapital(parseInt(e.target.value))}
              />
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <Label>Quick Presets</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => {
                  setDateRange({
                    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                    to: new Date()
                  });
                }}>
                  30 Days
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
                  setDateRange({
                    from: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
                    to: new Date()
                  });
                }}>
                  3 Months
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
                  setDateRange({
                    from: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000),
                    to: new Date()
                  });
                }}>
                  6 Months
                </Button>
                <Button variant="outline" size="sm" onClick={() => {
                  setDateRange({
                    from: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
                    to: new Date()
                  });
                }}>
                  1 Year
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Panel */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Backtest Results
            </CardTitle>
            {results && (
              <Badge variant="default" className="w-fit">
                <CheckCircle className="w-3 h-3 mr-1" />
                Analysis Complete
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            {!results ? (
              <div className="h-[500px] flex items-center justify-center text-center">
                <div className="text-muted-foreground">
                  <Activity className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No backtest results yet</p>
                  <p className="text-sm">Configure your backtest parameters and click "Run Backtest" to see results</p>
                </div>
              </div>
            ) : (
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="equity">Equity Curve</TabsTrigger>
                  <TabsTrigger value="trades">Trade Analysis</TabsTrigger>
                  <TabsTrigger value="symbols">By Symbol</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-6 mt-6">
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-profit">+{formatNumber(results.summary.totalReturn, 1)}%</div>
                      <div className="text-sm text-muted-foreground">Total Return</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold">{formatNumber(results.summary.sharpeRatio, 2)}</div>
                      <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-loss">-{formatNumber(results.summary.maxDrawdown, 1)}%</div>
                      <div className="text-sm text-muted-foreground">Max Drawdown</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-profit">{formatNumber(results.summary.winRate, 1)}%</div>
                      <div className="text-sm text-muted-foreground">Win Rate</div>
                    </Card>
                  </div>

                  {/* Detailed Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Detailed Statistics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Initial Capital:</span>
                            <span className="font-mono">{formatCurrency(initialCapital)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Final Equity:</span>
                            <span className="font-mono">{formatCurrency(results.summary.finalEquity)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Total Trades:</span>
                            <span className="font-mono">{results.summary.totalTrades}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Profit Factor:</span>
                            <span className="font-mono">{formatNumber(results.summary.profitFactor, 2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Avg Win:</span>
                            <span className="font-mono text-profit">+{formatNumber(results.summary.avgWin, 1)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Avg Loss:</span>
                            <span className="font-mono text-loss">{formatNumber(results.summary.avgLoss, 1)}%</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Best Month:</span>
                            <span className="font-mono text-profit">+6.4%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Worst Month:</span>
                            <span className="font-mono text-loss">-2.5%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Volatility:</span>
                            <span className="font-mono">12.3%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="equity" className="space-y-6 mt-6">
                  {/* Mock Equity Curve Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Equity Curve</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] bg-secondary/10 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                        <div className="text-center text-muted-foreground">
                          <TrendingUp className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">Equity Curve Chart</p>
                          <p className="text-sm">Portfolio value over time with drawdown periods</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Monthly Returns */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Returns</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-7 gap-2">
                        {results.monthlyReturns.map((month) => (
                          <div key={month.month} className="text-center p-2 bg-secondary/20 rounded">
                            <div className="text-xs text-muted-foreground">{month.month}</div>
                            <div className={`text-sm font-mono ${month.return >= 0 ? 'text-profit' : 'text-loss'}`}>
                              {month.return >= 0 ? '+' : ''}{formatNumber(month.return, 1)}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="trades" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Trade Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] bg-secondary/10 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                        <div className="text-center text-muted-foreground">
                          <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">Trade Analysis Charts</p>
                          <p className="text-sm">P&L distribution, trade duration, and success patterns</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="symbols" className="space-y-6 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance by Symbol</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {results.symbolBreakdown.map((symbol) => (
                          <Card key={symbol.symbol} className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-medium">{symbol.symbol}</h3>
                                <p className="text-sm text-muted-foreground">{symbol.trades} trades</p>
                              </div>
                              <div className="text-right">
                                <div className={`text-lg font-bold ${symbol.return >= 0 ? 'text-profit' : 'text-loss'}`}>
                                  {symbol.return >= 0 ? '+' : ''}{formatNumber(symbol.return, 1)}%
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Win Rate: {formatNumber(symbol.winRate, 1)}%
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}