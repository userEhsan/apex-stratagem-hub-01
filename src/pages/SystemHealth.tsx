// System Health & Logs Page
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Activity, 
  Database,
  Wifi,
  Cpu,
  HardDrive,
  Download,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  RefreshCw
} from "lucide-react";
import { mockSystemHealth, mockLogs, formatNumber } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function SystemHealth() {
  const { toast } = useToast();
  const [healthData, setHealthData] = useState(mockSystemHealth);
  const [logs, setLogs] = useState(mockLogs);
  const [logFilter, setLogFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 45,
    memory: 68,
    disk: 34,
    network: 23
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        cpu: Math.max(10, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(95, prev.memory + (Math.random() - 0.5) * 5)),
        disk: Math.max(10, Math.min(80, prev.disk + (Math.random() - 0.5) * 2)),
        network: Math.max(5, Math.min(100, prev.network + (Math.random() - 0.5) * 15))
      }));

      // Add new log entry occasionally
      if (Math.random() < 0.3) {
        const newLog = {
          timestamp: new Date(),
          level: ['INFO', 'WARNING', 'ERROR'][Math.floor(Math.random() * 3)],
          component: ['StrategyEngine', 'DataFeed', 'RiskManager', 'OrderExecutor'][Math.floor(Math.random() * 4)],
          message: 'System status updated - all components operational'
        };
        setLogs(prev => [newLog, ...prev.slice(0, 19)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesFilter = logFilter === 'all' || log.level === logFilter;
    const matchesSearch = searchTerm === '' || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.component.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-status-active';
      case 'warning': return 'text-status-warning';
      case 'error': return 'text-status-error';
      default: return 'text-status-inactive';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleRefreshHealth = () => {
    toast({
      title: "Health Check Initiated",
      description: "Running comprehensive system diagnostics...",
    });
  };

  const handleExportLogs = () => {
    toast({
      title: "Export Started",
      description: "Downloading system logs...",
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Health & Diagnostics</h1>
          <p className="text-muted-foreground">Monitor system performance, health status, and logs</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportLogs}>
            <Download className="w-4 h-4 mr-1" />
            Export Logs
          </Button>
          <Button onClick={handleRefreshHealth}>
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh Health
          </Button>
        </div>
      </div>

      {/* System Health Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{formatNumber(systemMetrics.cpu, 0)}%</div>
            <Progress value={systemMetrics.cpu} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {systemMetrics.cpu > 80 ? 'High usage' : systemMetrics.cpu > 60 ? 'Moderate' : 'Normal'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{formatNumber(systemMetrics.memory, 0)}%</div>
            <Progress value={systemMetrics.memory} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {formatNumber(systemMetrics.memory * 32 / 100, 1)}GB / 32GB
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
            <Database className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{formatNumber(systemMetrics.disk, 0)}%</div>
            <Progress value={systemMetrics.disk} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {formatNumber(systemMetrics.disk * 1000 / 100, 0)}GB / 1TB
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network I/O</CardTitle>
            <Wifi className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">{formatNumber(systemMetrics.network, 0)}%</div>
            <Progress value={systemMetrics.network} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {formatNumber(systemMetrics.network * 10, 0)} Mbps
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Component Health Matrix */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Component Health Matrix
            </CardTitle>
            <CardDescription>Real-time status of all system components</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthData.map((component) => (
                <Card key={component.component} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={getHealthColor(component.status)}>
                        {getHealthIcon(component.status)}
                      </div>
                      <h3 className="font-medium">{component.component}</h3>
                    </div>
                    <Badge 
                      variant={component.status === 'active' ? 'default' : 
                              component.status === 'warning' ? 'secondary' : 'destructive'}
                    >
                      {component.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uptime:</span>
                      <span className="font-mono">{formatNumber(component.uptime, 2)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Last Check:</span>
                      <span className="text-muted-foreground">
                        {component.lastCheck.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {component.details}
                    </div>
                  </div>
                  
                  <Progress value={component.uptime} className="mt-3 h-2" />
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-medium mb-2">Performance Metrics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Response Time:</span>
                    <span className="font-mono">45ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Throughput:</span>
                    <span className="font-mono">2.3k req/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Error Rate:</span>
                    <span className="font-mono text-success">0.02%</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Version Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Core Engine:</span>
                    <span className="font-mono">v2.4.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Strategy Engine:</span>
                    <span className="font-mono">v1.8.3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Manager:</span>
                    <span className="font-mono">v1.2.0</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Connections</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Database:</span>
                    <Badge variant="default" className="text-xs">Connected</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>WebSocket:</span>
                    <Badge variant="default" className="text-xs">Active</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Broker API:</span>
                    <Badge variant="default" className="text-xs">Online</Badge>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Zap className="w-4 h-4 mr-1" />
              Run Full Diagnostic
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Logs Analysis Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            System Logs
          </CardTitle>
          <CardDescription>Real-time system logs with search and filtering</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="live" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="live">Live Logs</TabsTrigger>
              <TabsTrigger value="errors">Error Analysis</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="live" className="space-y-4 mt-6">
              {/* Log Filters */}
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search logs..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={logFilter} onValueChange={setLogFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="INFO">Info</SelectItem>
                    <SelectItem value="WARNING">Warning</SelectItem>
                    <SelectItem value="ERROR">Error</SelectItem>
                    <SelectItem value="SUCCESS">Success</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Live Log Stream */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredLogs.map((log, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-secondary/20 rounded-lg text-sm">
                    <Badge 
                      variant={
                        log.level === 'ERROR' ? 'destructive' :
                        log.level === 'WARNING' ? 'secondary' :
                        log.level === 'SUCCESS' ? 'default' : 'outline'
                      }
                      className="text-xs"
                    >
                      {log.level}
                    </Badge>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{log.component}</span>
                        <span className="text-xs text-muted-foreground">
                          {log.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="text-muted-foreground">{log.message}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="errors" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-status-error">3</div>
                  <div className="text-sm text-muted-foreground">Errors (24h)</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-status-warning">12</div>
                  <div className="text-sm text-muted-foreground">Warnings (24h)</div>
                </Card>
                <Card className="p-4 text-center">
                  <div className="text-2xl font-bold text-status-active">99.97%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Errors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {filteredLogs.filter(log => log.level === 'ERROR').slice(0, 5).map((log, index) => (
                      <div key={index} className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-destructive">{log.component}</span>
                          <span className="text-xs text-muted-foreground">
                            {log.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="text-sm">{log.message}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Response Times</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] bg-secondary/10 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                      <div className="text-center text-muted-foreground">
                        <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Response time chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Error Frequency</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] bg-secondary/10 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                      <div className="text-center text-muted-foreground">
                        <AlertTriangle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Error frequency chart</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}