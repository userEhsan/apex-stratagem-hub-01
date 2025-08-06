// Market Analysis & Charting Page
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Search,
  Star,
  Eye,
  Activity,
  Target,
  Zap,
  AlertTriangle
} from "lucide-react";
import { mockSymbols, mockSignals, mockTrades, formatCurrency, formatPercentage, formatNumber } from "@/lib/mockData";

export default function MarketAnalysis() {
  const [selectedSymbol, setSelectedSymbol] = useState(mockSymbols[0]);
  const [timeframe, setTimeframe] = useState('5m');
  const [chartType, setChartType] = useState('candlestick');

  const timeframes = ['1m', '5m', '15m', '1h', '4h', '1d'];
  const indicators = [
    { name: 'MACD', enabled: true, color: '#3b82f6' },
    { name: 'RSI', enabled: true, color: '#f59e0b' },
    { name: 'EMA 20', enabled: true, color: '#10b981' },
    { name: 'EMA 50', enabled: false, color: '#ef4444' },
    { name: 'Volume', enabled: true, color: '#8b5cf6' }
  ];

  // Mock correlation data
  const correlationData = [
    { symbol: 'BTCUSDT', correlation: 1.00 },
    { symbol: 'ETHUSDT', correlation: 0.87 },
    { symbol: 'ADAUSDT', correlation: 0.72 },
    { symbol: 'BNBUSDT', correlation: 0.65 },
    { symbol: 'SOLUSDT', correlation: 0.78 },
    { symbol: 'DOGEUSDT', correlation: 0.45 }
  ];

  // Mock market regime data
  const marketRegime = {
    current: 'Bull Market',
    confidence: 0.84,
    duration: '12 days',
    strength: 'Strong'
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Market Analysis</h1>
          <p className="text-muted-foreground">Advanced charting and technical analysis tools</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Star className="w-4 h-4 mr-1" />
            Add to Watchlist
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-1" />
            Full Screen
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Panel - Symbol Selector */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Watchlist</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search symbols..." className="pl-8" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockSymbols.map((symbol) => (
              <Card 
                key={symbol.symbol}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedSymbol.symbol === symbol.symbol ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedSymbol(symbol)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{symbol.symbol}</h3>
                      <p className="text-xs text-muted-foreground">{symbol.name}</p>
                    </div>
                    <Badge 
                      variant={symbol.health === 'active' ? 'default' : 
                              symbol.health === 'warning' ? 'secondary' : 'outline'}
                      className="text-xs"
                    >
                      {symbol.health}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Price:</span>
                      <span className="font-mono">{formatCurrency(symbol.price)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>24h:</span>
                      <span className={`font-mono ${symbol.change24h >= 0 ? 'text-profit' : 'text-loss'}`}>
                        {formatPercentage(symbol.change24h)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>P&L:</span>
                      <span className={`font-mono ${symbol.pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                        {formatCurrency(symbol.pnl)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Main Chart Area */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="w-5 h-5" />
                  {selectedSymbol.symbol} - {selectedSymbol.name}
                </CardTitle>
                <CardDescription>
                  {formatCurrency(selectedSymbol.price)} 
                  <span className={`ml-2 ${selectedSymbol.change24h >= 0 ? 'text-profit' : 'text-loss'}`}>
                    {formatPercentage(selectedSymbol.change24h)}
                  </span>
                </CardDescription>
              </div>
              
              {/* Timeframe Selector */}
              <div className="flex items-center gap-1">
                {timeframes.map((tf) => (
                  <Button
                    key={tf}
                    variant={timeframe === tf ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeframe(tf)}
                    className="text-xs px-2"
                  >
                    {tf}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Mock Chart Area */}
            <div className="w-full h-[400px] bg-secondary/10 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Professional Trading Chart</p>
                <p className="text-sm">Candlestick chart with technical indicators</p>
                <p className="text-xs mt-2">TradingView integration ready</p>
              </div>
            </div>
            
            {/* Chart Controls */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="candlestick">Candlestick</SelectItem>
                    <SelectItem value="line">Line</SelectItem>
                    <SelectItem value="area">Area</SelectItem>
                    <SelectItem value="heikin-ashi">Heikin Ashi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Technical Indicators */}
              <div className="flex items-center gap-2">
                {indicators.map((indicator) => (
                  <Badge 
                    key={indicator.name}
                    variant={indicator.enabled ? "default" : "outline"}
                    className="text-xs cursor-pointer"
                    style={indicator.enabled ? { backgroundColor: indicator.color } : {}}
                  >
                    {indicator.name}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Analysis Tools */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Analysis Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signals" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signals" className="text-xs">Signals</TabsTrigger>
                <TabsTrigger value="metrics" className="text-xs">Metrics</TabsTrigger>
              </TabsList>

              <TabsContent value="signals" className="space-y-4 mt-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Latest Signals</h3>
                  <div className="space-y-2">
                    {mockSignals.slice(0, 4).map((signal) => (
                      <Card key={signal.id} className="p-3 bg-secondary/20">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant={signal.type === 'BUY' ? 'default' : 'destructive'} className="text-xs">
                            {signal.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {signal.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium">{signal.symbol}</div>
                          <div className="text-xs text-muted-foreground mb-1">
                            {formatCurrency(signal.price)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Confidence: {formatNumber(signal.confidence * 100, 0)}%
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Signal Strength</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Technical Score:</span>
                      <span className="font-mono text-profit">8.2/10</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Volume Score:</span>
                      <span className="font-mono text-warning">6.5/10</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Momentum:</span>
                      <span className="font-mono text-profit">Strong</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="metrics" className="space-y-4 mt-4">
                <div>
                  <h3 className="text-sm font-medium mb-3">Market Regime</h3>
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-profit" />
                      <span className="font-medium text-profit">{marketRegime.current}</span>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div>Confidence: {formatNumber(marketRegime.confidence * 100, 0)}%</div>
                      <div>Duration: {marketRegime.duration}</div>
                      <div>Strength: {marketRegime.strength}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Correlation Matrix</h3>
                  <div className="space-y-1">
                    {correlationData.slice(0, 4).map((item) => (
                      <div key={item.symbol} className="flex justify-between text-xs">
                        <span>{item.symbol}:</span>
                        <span className={`font-mono ${
                          item.correlation > 0.8 ? 'text-profit' :
                          item.correlation > 0.5 ? 'text-warning' : 'text-loss'
                        }`}>
                          {formatNumber(item.correlation, 2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-3">Risk Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Volatility (24h):</span>
                      <span className="font-mono">2.34%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Risk Score:</span>
                      <span className="font-mono text-warning">Medium</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Exposure:</span>
                      <span className="font-mono">{selectedSymbol.allocation}%</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Panel - Order Book & Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Trades
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockTrades.slice(0, 5).map((trade) => (
                <div key={trade.id} className="flex items-center justify-between p-2 bg-secondary/10 rounded">
                  <div className="flex items-center gap-2">
                    <Badge variant={trade.side === 'BUY' ? 'default' : 'destructive'} className="text-xs">
                      {trade.side}
                    </Badge>
                    <span className="text-sm">{trade.symbol}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono">{formatCurrency(trade.price)}</div>
                    <div className="text-xs text-muted-foreground">{trade.timestamp.toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="w-5 h-5" />
              Signal History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockSignals.slice(0, 5).map((signal) => (
                <div key={signal.id} className="flex items-center justify-between p-2 bg-secondary/10 rounded">
                  <div className="flex items-center gap-2">
                    <Badge variant={signal.type === 'BUY' ? 'default' : 'destructive'} className="text-xs">
                      {signal.type}
                    </Badge>
                    <span className="text-sm">{signal.symbol}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs">Conf: {formatNumber(signal.confidence * 100, 0)}%</div>
                    <div className="text-xs text-muted-foreground">{signal.timestamp.toLocaleTimeString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Performance Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Win Rate:</span>
                <span className="font-mono text-profit">74.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Profit:</span>
                <span className="font-mono text-profit">+2.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Max Drawdown:</span>
                <span className="font-mono text-loss">-8.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Sharpe Ratio:</span>
                <span className="font-mono">1.84</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Trades:</span>
                <span className="font-mono">1,247</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}