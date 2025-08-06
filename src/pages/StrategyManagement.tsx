// Strategy Management Page
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Brain, 
  TrendingUp, 
  BarChart3, 
  Settings, 
  Play, 
  Edit, 
  Copy, 
  Trash2,
  Plus,
  Target,
  Zap,
  Activity
} from "lucide-react";
import { mockStrategies, mockSymbols, formatNumber } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function StrategyManagement() {
  const { toast } = useToast();
  const [selectedStrategy, setSelectedStrategy] = useState(mockStrategies[0]);
  const [strategyParams, setStrategyParams] = useState<any>(selectedStrategy.parameters);

  const handleStrategySelect = (strategyId: string) => {
    const strategy = mockStrategies.find(s => s.id === strategyId);
    if (strategy) {
      setSelectedStrategy(strategy);
      setStrategyParams(strategy.parameters);
    }
  };

  const handleSaveStrategy = () => {
    toast({
      title: "Strategy Saved",
      description: `${selectedStrategy.name} configuration has been updated.`,
    });
  };

  const handleBacktest = () => {
    toast({
      title: "Backtest Started",
      description: `Running backtest for ${selectedStrategy.name}...`,
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Strategy Management</h1>
          <p className="text-muted-foreground">Design, configure, and optimize trading strategies</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Copy className="w-4 h-4 mr-1" />
            Clone Strategy
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-1" />
            New Strategy
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Strategy Library */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Strategy Library
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockStrategies.map((strategy) => (
              <Card 
                key={strategy.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedStrategy.id === strategy.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleStrategySelect(strategy.id)}
              >
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{strategy.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{strategy.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Win Rate:</span>
                      <span className="text-profit font-mono">{formatNumber(strategy.performance.winRate, 1)}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Avg Profit:</span>
                      <span className="text-profit font-mono">{formatNumber(strategy.performance.avgProfit, 1)}%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Max DD:</span>
                      <span className="text-loss font-mono">{formatNumber(strategy.performance.maxDrawdown, 1)}%</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {strategy.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        {/* Strategy Editor */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  {selectedStrategy.name}
                </CardTitle>
                <CardDescription>{selectedStrategy.description}</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleBacktest}>
                  <Activity className="w-4 h-4 mr-1" />
                  Backtest
                </Button>
                <Button size="sm" onClick={handleSaveStrategy}>
                  <Settings className="w-4 h-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="parameters" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="parameters">Parameters</TabsTrigger>
                <TabsTrigger value="assignment">Assignment</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="parameters" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* MACD Parameters */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">MACD Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Fast Period: {strategyParams.fastPeriod || 12}</Label>
                        <Slider
                          value={[strategyParams.fastPeriod || 12]}
                          onValueChange={([value]) => setStrategyParams(prev => ({ ...prev, fastPeriod: value }))}
                          max={50}
                          min={5}
                          step={1}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Slow Period: {strategyParams.slowPeriod || 26}</Label>
                        <Slider
                          value={[strategyParams.slowPeriod || 26]}
                          onValueChange={([value]) => setStrategyParams(prev => ({ ...prev, slowPeriod: value }))}
                          max={100}
                          min={10}
                          step={1}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Signal Period: {strategyParams.signalPeriod || 9}</Label>
                        <Slider
                          value={[strategyParams.signalPeriod || 9]}
                          onValueChange={([value]) => setStrategyParams(prev => ({ ...prev, signalPeriod: value }))}
                          max={30}
                          min={3}
                          step={1}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Additional Parameters */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Additional Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {strategyParams.rsiPeriod && (
                        <div className="space-y-2">
                          <Label>RSI Period: {strategyParams.rsiPeriod}</Label>
                          <Slider
                            value={[strategyParams.rsiPeriod]}
                            onValueChange={([value]) => setStrategyParams(prev => ({ ...prev, rsiPeriod: value }))}
                            max={50}
                            min={5}
                            step={1}
                          />
                        </div>
                      )}

                      {strategyParams.btcCorrelationThreshold && (
                        <div className="space-y-2">
                          <Label>BTC Correlation Threshold: {strategyParams.btcCorrelationThreshold}</Label>
                          <Slider
                            value={[strategyParams.btcCorrelationThreshold]}
                            onValueChange={([value]) => setStrategyParams(prev => ({ ...prev, btcCorrelationThreshold: value }))}
                            max={1}
                            min={0}
                            step={0.1}
                          />
                        </div>
                      )}

                      {strategyParams.primaryTimeframe && (
                        <div className="space-y-2">
                          <Label>Primary Timeframe</Label>
                          <Select value={strategyParams.primaryTimeframe}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1m">1 Minute</SelectItem>
                              <SelectItem value="5m">5 Minutes</SelectItem>
                              <SelectItem value="15m">15 Minutes</SelectItem>
                              <SelectItem value="1h">1 Hour</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-secondary/20 rounded-lg">
                        <div className="text-2xl font-bold text-profit">{formatNumber(selectedStrategy.performance.winRate, 1)}%</div>
                        <div className="text-sm text-muted-foreground">Win Rate</div>
                      </div>
                      <div className="text-center p-4 bg-secondary/20 rounded-lg">
                        <div className="text-2xl font-bold text-profit">+{formatNumber(selectedStrategy.performance.avgProfit, 1)}%</div>
                        <div className="text-sm text-muted-foreground">Avg Profit</div>
                      </div>
                      <div className="text-center p-4 bg-secondary/20 rounded-lg">
                        <div className="text-2xl font-bold text-loss">-{formatNumber(selectedStrategy.performance.maxDrawdown, 1)}%</div>
                        <div className="text-sm text-muted-foreground">Max Drawdown</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assignment" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Strategy Assignment</CardTitle>
                    <CardDescription>Assign this strategy to trading symbols</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {mockSymbols.map((symbol) => (
                        <Card key={symbol.symbol} className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{symbol.symbol}</h3>
                              <p className="text-sm text-muted-foreground">Currently: {symbol.strategy}</p>
                            </div>
                            <Button 
                              variant={symbol.strategy === selectedStrategy.name ? "default" : "outline"}
                              size="sm"
                            >
                              {symbol.strategy === selectedStrategy.name ? "Assigned" : "Assign"}
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Backtest Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Total Return:</span>
                          <span className="font-mono text-profit">+24.7%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sharpe Ratio:</span>
                          <span className="font-mono">1.84</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max Drawdown:</span>
                          <span className="font-mono text-loss">-{formatNumber(selectedStrategy.performance.maxDrawdown, 1)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Trades:</span>
                          <span className="font-mono">1,247</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Profit Factor:</span>
                          <span className="font-mono">1.67</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Symbol Performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockSymbols.slice(0, 5).map((symbol) => (
                          <div key={symbol.symbol} className="flex justify-between items-center">
                            <span className="text-sm">{symbol.symbol}</span>
                            <div className="text-right">
                              <div className={`text-sm font-mono ${symbol.pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                                {symbol.pnl >= 0 ? '+' : ''}{formatNumber(symbol.pnl * 0.1, 1)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Configuration</CardTitle>
                    <CardDescription>Expert-level strategy customization</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Risk Management</h3>
                        <div className="space-y-2">
                          <Label>Position Sizing Method</Label>
                          <Select defaultValue="fixed">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="fixed">Fixed Size</SelectItem>
                              <SelectItem value="kelly">Kelly Criterion</SelectItem>
                              <SelectItem value="volatility">Volatility-based</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Maximum Risk per Trade: 2%</Label>
                          <Slider defaultValue={[2]} max={10} min={0.1} step={0.1} />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Signal Filtering</h3>
                        <div className="space-y-2">
                          <Label>Minimum Confidence Threshold: 0.7</Label>
                          <Slider defaultValue={[0.7]} max={1} min={0.1} step={0.1} />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Volume Confirmation</Label>
                          <Select defaultValue="enabled">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="enabled">Enabled</SelectItem>
                              <SelectItem value="disabled">Disabled</SelectItem>
                              <SelectItem value="adaptive">Adaptive</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}