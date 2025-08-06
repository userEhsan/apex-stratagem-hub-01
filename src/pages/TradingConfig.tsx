// Trading Configuration Page
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Settings, Sliders, Shield, Activity, Save, RotateCcw, AlertTriangle } from "lucide-react";
import { mockSymbols, mockStrategies } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function TradingConfig() {
  const { toast } = useToast();
  const [configs, setConfigs] = useState(mockSymbols);
  const [globalSettings, setGlobalSettings] = useState({
    tradingMode: 'PAPER',
    riskProfile: 'Moderate',
    bufferSize: 1000,
    defaultInterval: '1s',
    emergencyHalt: true
  });

  const [features, setFeatures] = useState({
    multiTimeframe: true,
    correlationAnalysis: true,
    signalEnhancement: false,
    crossSymbolAnalysis: true
  });

  const handleSymbolConfigChange = (symbol: string, field: string, value: any) => {
    setConfigs(prev => prev.map(config => 
      config.symbol === symbol ? { ...config, [field]: value } : config
    ));
  };

  const handleSaveConfig = () => {
    toast({
      title: "Configuration Saved",
      description: "Trading configuration has been updated successfully.",
    });
  };

  const handleResetConfig = () => {
    setConfigs(mockSymbols);
    toast({
      title: "Configuration Reset",
      description: "All settings have been reset to defaults.",
      variant: "destructive",
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Trading Configuration</h1>
          <p className="text-muted-foreground">Configure symbols, strategies, and system parameters</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleResetConfig}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset All
          </Button>
          <Button onClick={handleSaveConfig}>
            <Save className="w-4 h-4 mr-1" />
            Save Configuration
          </Button>
        </div>
      </div>

      {/* Global Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Global Settings
          </CardTitle>
          <CardDescription>System-wide trading parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="trading-mode">Trading Mode</Label>
              <Select value={globalSettings.tradingMode} onValueChange={(value) => 
                setGlobalSettings(prev => ({ ...prev, tradingMode: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PAPER">Paper Trading</SelectItem>
                  <SelectItem value="LIVE">Live Trading</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="risk-profile">Risk Profile</Label>
              <Select value={globalSettings.riskProfile} onValueChange={(value) => 
                setGlobalSettings(prev => ({ ...prev, riskProfile: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conservative">Conservative</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="buffer-size">Buffer Size</Label>
              <Input 
                id="buffer-size"
                type="number" 
                value={globalSettings.bufferSize}
                onChange={(e) => setGlobalSettings(prev => ({ ...prev, bufferSize: parseInt(e.target.value) }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="default-interval">Default Interval</Label>
              <Select value={globalSettings.defaultInterval} onValueChange={(value) => 
                setGlobalSettings(prev => ({ ...prev, defaultInterval: value }))
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1s">1 Second</SelectItem>
                  <SelectItem value="5s">5 Seconds</SelectItem>
                  <SelectItem value="1m">1 Minute</SelectItem>
                  <SelectItem value="5m">5 Minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch 
              id="emergency-halt" 
              checked={globalSettings.emergencyHalt}
              onCheckedChange={(checked) => setGlobalSettings(prev => ({ ...prev, emergencyHalt: checked }))}
            />
            <Label htmlFor="emergency-halt" className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              Enable emergency halt triggers
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Feature Activation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Feature Activation
          </CardTitle>
          <CardDescription>Enable advanced trading features</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="multi-timeframe">Multi-timeframe Analysis</Label>
                  <p className="text-sm text-muted-foreground">Analyze multiple timeframes for signal confirmation</p>
                </div>
                <Switch 
                  id="multi-timeframe"
                  checked={features.multiTimeframe}
                  onCheckedChange={(checked) => setFeatures(prev => ({ ...prev, multiTimeframe: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="correlation-analysis">Correlation Analysis</Label>
                  <p className="text-sm text-muted-foreground">Consider symbol correlations in trading decisions</p>
                </div>
                <Switch 
                  id="correlation-analysis"
                  checked={features.correlationAnalysis}
                  onCheckedChange={(checked) => setFeatures(prev => ({ ...prev, correlationAnalysis: checked }))}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="signal-enhancement">Signal Enhancement</Label>
                  <p className="text-sm text-muted-foreground">AI-powered signal strength calculation</p>
                </div>
                <Switch 
                  id="signal-enhancement"
                  checked={features.signalEnhancement}
                  onCheckedChange={(checked) => setFeatures(prev => ({ ...prev, signalEnhancement: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="cross-symbol">Cross-Symbol Analysis</Label>
                  <p className="text-sm text-muted-foreground">Analyze relationships between different symbols</p>
                </div>
                <Switch 
                  id="cross-symbol"
                  checked={features.crossSymbolAnalysis}
                  onCheckedChange={(checked) => setFeatures(prev => ({ ...prev, crossSymbolAnalysis: checked }))}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Symbol Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sliders className="w-5 h-5" />
            Symbol Configuration
          </CardTitle>
          <CardDescription>Individual settings for each trading symbol</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {configs.map((config) => (
              <Card key={config.symbol} className="bg-secondary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">{config.symbol}</CardTitle>
                      <Badge variant="outline">{config.name}</Badge>
                      <Switch 
                        checked={config.health !== 'inactive'}
                        onCheckedChange={(checked) => 
                          handleSymbolConfigChange(config.symbol, 'health', checked ? 'active' : 'inactive')
                        }
                      />
                    </div>
                    <Badge 
                      variant={config.health === 'active' ? 'default' : 
                              config.health === 'warning' ? 'secondary' : 
                              config.health === 'error' ? 'destructive' : 'outline'}
                    >
                      {config.health}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Allocation and Strategy */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label>Portfolio Allocation: {config.allocation}%</Label>
                      <Slider
                        value={[config.allocation]}
                        onValueChange={([value]) => handleSymbolConfigChange(config.symbol, 'allocation', value)}
                        max={50}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Strategy</Label>
                      <Select value={config.strategy} onValueChange={(value) => 
                        handleSymbolConfigChange(config.symbol, 'strategy', value)
                      }>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {mockStrategies.map((strategy) => (
                            <SelectItem key={strategy.id} value={strategy.name}>
                              {strategy.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Risk Parameters */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Risk Parameters</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`stop-loss-${config.symbol}`} className="text-xs">Stop Loss %</Label>
                        <Input 
                          id={`stop-loss-${config.symbol}`}
                          type="number" 
                          placeholder="5.0"
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`take-profit-${config.symbol}`} className="text-xs">Take Profit %</Label>
                        <Input 
                          id={`take-profit-${config.symbol}`}
                          type="number" 
                          placeholder="10.0"
                          step="0.1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`max-position-${config.symbol}`} className="text-xs">Max Position Size</Label>
                        <Input 
                          id={`max-position-${config.symbol}`}
                          type="number" 
                          placeholder="1000"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Strategy Parameters */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Strategy Parameters</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Fast Period: 12</Label>
                        <Slider defaultValue={[12]} max={50} step={1} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Slow Period: 26</Label>
                        <Slider defaultValue={[26]} max={100} step={1} />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">Signal Period: 9</Label>
                        <Slider defaultValue={[9]} max={30} step={1} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}