// Settings & Administration Page
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Database,
  Bell,
  Palette,
  Download,
  Upload,
  RotateCcw,
  Save,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  
  const [userPreferences, setUserPreferences] = useState({
    theme: 'dark',
    currency: 'USD',
    timezone: 'UTC',
    decimals: 2,
    notifications: {
      email: true,
      sms: false,
      browser: true,
      trades: true,
      alerts: true,
      reports: false
    }
  });

  const [systemConfig, setSystemConfig] = useState({
    databaseUrl: 'postgresql://localhost:5432/trading',
    brokerApi: 'wss://api.example.com/ws',
    backupEnabled: true,
    maxConnections: 100,
    sessionTimeout: 24,
    rateLimit: 1000
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    sessionTimeout: 24,
    ipRestrictions: '',
    apiRateLimit: 1000,
    auditLogging: true
  });

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "All configuration changes have been saved successfully.",
    });
  };

  const handleResetSettings = () => {
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
      variant: "destructive",
    });
  };

  const handleBackup = () => {
    toast({
      title: "Backup Started",
      description: "Creating system state backup...",
    });
  };

  const handleRestore = () => {
    toast({
      title: "Restore Initiated",
      description: "Please select a backup file to restore.",
    });
  };

  return (
    <div className="p-6 space-y-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings & Administration</h1>
          <p className="text-muted-foreground">Configure system preferences and administration settings</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleResetSettings}>
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset All
          </Button>
          <Button onClick={handleSaveSettings}>
            <Save className="w-4 h-4 mr-1" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="preferences" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="preferences">User Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System Config</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="backup">Backup & Restore</TabsTrigger>
        </TabsList>

        <TabsContent value="preferences" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                User Preferences
              </CardTitle>
              <CardDescription>Customize your trading interface and display options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={userPreferences.theme} onValueChange={(value) => 
                      setUserPreferences(prev => ({ ...prev, theme: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Dark Mode</SelectItem>
                        <SelectItem value="light">Light Mode</SelectItem>
                        <SelectItem value="system">System Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency Format</Label>
                    <Select value={userPreferences.currency} onValueChange={(value) => 
                      setUserPreferences(prev => ({ ...prev, currency: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                        <SelectItem value="JPY">JPY (¥)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Time Zone</Label>
                    <Select value={userPreferences.timezone} onValueChange={(value) => 
                      setUserPreferences(prev => ({ ...prev, timezone: value }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="GMT">GMT</SelectItem>
                        <SelectItem value="JST">Japan Time</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="decimals">Decimal Precision</Label>
                    <Select value={userPreferences.decimals.toString()} onValueChange={(value) => 
                      setUserPreferences(prev => ({ ...prev, decimals: parseInt(value) }))
                    }>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 decimal places</SelectItem>
                        <SelectItem value="4">4 decimal places</SelectItem>
                        <SelectItem value="6">6 decimal places</SelectItem>
                        <SelectItem value="8">8 decimal places</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Dashboard Layout</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4 cursor-pointer hover:shadow-md border-2 border-primary">
                    <div className="aspect-video bg-secondary/20 rounded mb-2"></div>
                    <div className="text-center text-sm">Default Layout</div>
                  </Card>
                  <Card className="p-4 cursor-pointer hover:shadow-md">
                    <div className="aspect-video bg-secondary/20 rounded mb-2"></div>
                    <div className="text-center text-sm">Compact View</div>
                  </Card>
                  <Card className="p-4 cursor-pointer hover:shadow-md">
                    <div className="aspect-video bg-secondary/20 rounded mb-2"></div>
                    <div className="text-center text-sm">Detailed View</div>
                  </Card>
                  <Card className="p-4 cursor-pointer hover:shadow-md">
                    <div className="aspect-video bg-secondary/20 rounded mb-2"></div>
                    <div className="text-center text-sm">Custom Layout</div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Notification Channels</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive alerts via email</p>
                      </div>
                      <Switch 
                        id="email-notifications"
                        checked={userPreferences.notifications.email}
                        onCheckedChange={(checked) => 
                          setUserPreferences(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, email: checked }
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-notifications">SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive alerts via SMS</p>
                      </div>
                      <Switch 
                        id="sms-notifications"
                        checked={userPreferences.notifications.sms}
                        onCheckedChange={(checked) => 
                          setUserPreferences(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, sms: checked }
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="browser-notifications">Browser Notifications</Label>
                        <p className="text-sm text-muted-foreground">Show desktop notifications</p>
                      </div>
                      <Switch 
                        id="browser-notifications"
                        checked={userPreferences.notifications.browser}
                        onCheckedChange={(checked) => 
                          setUserPreferences(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, browser: checked }
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="trade-notifications">Trade Notifications</Label>
                        <p className="text-sm text-muted-foreground">Orders and executions</p>
                      </div>
                      <Switch 
                        id="trade-notifications"
                        checked={userPreferences.notifications.trades}
                        onCheckedChange={(checked) => 
                          setUserPreferences(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, trades: checked }
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="alert-notifications">System Alerts</Label>
                        <p className="text-sm text-muted-foreground">Errors and warnings</p>
                      </div>
                      <Switch 
                        id="alert-notifications"
                        checked={userPreferences.notifications.alerts}
                        onCheckedChange={(checked) => 
                          setUserPreferences(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, alerts: checked }
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="report-notifications">Daily Reports</Label>
                        <p className="text-sm text-muted-foreground">Performance summaries</p>
                      </div>
                      <Switch 
                        id="report-notifications"
                        checked={userPreferences.notifications.reports}
                        onCheckedChange={(checked) => 
                          setUserPreferences(prev => ({ 
                            ...prev, 
                            notifications: { ...prev.notifications, reports: checked }
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email-address">Email Address</Label>
                      <Input 
                        id="email-address"
                        type="email" 
                        placeholder="trader@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone-number">Phone Number</Label>
                      <Input 
                        id="phone-number"
                        type="tel" 
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    <Button variant="outline" className="w-full">
                      Test Notifications
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                System Configuration
              </CardTitle>
              <CardDescription>Configure database, broker connections, and system parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="database-url">Database Connection</Label>
                    <Input 
                      id="database-url"
                      value={systemConfig.databaseUrl}
                      onChange={(e) => setSystemConfig(prev => ({ ...prev, databaseUrl: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="broker-api">Broker API Endpoint</Label>
                    <Input 
                      id="broker-api"
                      value={systemConfig.brokerApi}
                      onChange={(e) => setSystemConfig(prev => ({ ...prev, brokerApi: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-connections">Max Connections</Label>
                    <Input 
                      id="max-connections"
                      type="number"
                      value={systemConfig.maxConnections}
                      onChange={(e) => setSystemConfig(prev => ({ ...prev, maxConnections: parseInt(e.target.value) }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                    <Input 
                      id="session-timeout"
                      type="number"
                      value={systemConfig.sessionTimeout}
                      onChange={(e) => setSystemConfig(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rate-limit">API Rate Limit (req/min)</Label>
                    <Input 
                      id="rate-limit"
                      type="number"
                      value={systemConfig.rateLimit}
                      onChange={(e) => setSystemConfig(prev => ({ ...prev, rateLimit: parseInt(e.target.value) }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="backup-enabled">Automatic Backups</Label>
                      <p className="text-sm text-muted-foreground">Enable daily system backups</p>
                    </div>
                    <Switch 
                      id="backup-enabled"
                      checked={systemConfig.backupEnabled}
                      onCheckedChange={(checked) => 
                        setSystemConfig(prev => ({ ...prev, backupEnabled: checked }))
                      }
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Connection Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Database</div>
                        <div className="text-sm text-muted-foreground">PostgreSQL</div>
                      </div>
                      <div className="w-3 h-3 bg-status-active rounded-full"></div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Broker API</div>
                        <div className="text-sm text-muted-foreground">WebSocket</div>
                      </div>
                      <div className="w-3 h-3 bg-status-active rounded-full"></div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Data Feed</div>
                        <div className="text-sm text-muted-foreground">Market Data</div>
                      </div>
                      <div className="w-3 h-3 bg-status-warning rounded-full"></div>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                    </div>
                    <Switch 
                      id="two-factor"
                      checked={securitySettings.twoFactorEnabled}
                      onCheckedChange={(checked) => 
                        setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: checked }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                    <Input 
                      id="session-timeout"
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ip-restrictions">IP Restrictions</Label>
                    <Input 
                      id="ip-restrictions"
                      placeholder="192.168.1.0/24, 10.0.0.1"
                      value={securitySettings.ipRestrictions}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, ipRestrictions: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api-rate-limit">API Rate Limit</Label>
                    <Input 
                      id="api-rate-limit"
                      type="number"
                      value={securitySettings.apiRateLimit}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, apiRateLimit: parseInt(e.target.value) }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="audit-logging">Audit Logging</Label>
                      <p className="text-sm text-muted-foreground">Log all system activities</p>
                    </div>
                    <Switch 
                      id="audit-logging"
                      checked={securitySettings.auditLogging}
                      onCheckedChange={(checked) => 
                        setSecuritySettings(prev => ({ ...prev, auditLogging: checked }))
                      }
                    />
                  </div>

                  <Button variant="outline" className="w-full">
                    Generate API Key
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Security Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-status-active" />
                      <div>
                        <div className="font-medium">Security Score</div>
                        <div className="text-2xl font-bold text-status-active">85/100</div>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-status-warning" />
                      <div>
                        <div className="font-medium">Recommendations</div>
                        <div className="text-sm text-muted-foreground">Enable 2FA for better security</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Backup & Restore
              </CardTitle>
              <CardDescription>Manage system backups and restore points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Create Backup</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a complete backup of your system configuration, strategies, and data.
                  </p>
                  <Button onClick={handleBackup} className="w-full">
                    <Download className="w-4 h-4 mr-1" />
                    Create System Backup
                  </Button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Restore System</h3>
                  <p className="text-sm text-muted-foreground">
                    Restore your system from a previous backup file.
                  </p>
                  <Button variant="outline" onClick={handleRestore} className="w-full">
                    <Upload className="w-4 h-4 mr-1" />
                    Restore from Backup
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">Recent Backups</h3>
                <div className="space-y-3">
                  {[
                    { date: '2024-01-15 14:30', size: '2.3 GB', type: 'Automatic' },
                    { date: '2024-01-14 14:30', size: '2.2 GB', type: 'Automatic' },
                    { date: '2024-01-13 14:30', size: '2.1 GB', type: 'Automatic' },
                    { date: '2024-01-12 09:15', size: '2.0 GB', type: 'Manual' }
                  ].map((backup, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{backup.date}</div>
                          <div className="text-sm text-muted-foreground">
                            {backup.type} backup • {backup.size}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Upload className="w-3 h-3 mr-1" />
                            Restore
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                  <div>
                    <h3 className="font-medium text-warning">Important Notice</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Always verify your backups and test restore procedures. 
                      Keep multiple backup copies in different locations for maximum data protection.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}