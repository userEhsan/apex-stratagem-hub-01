import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Settings,
  TrendingUp,
  Activity,
  Brain,
  LineChart,
  Shield,
  Database,
  Menu,
  X,
  DollarSign
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart3,
    description: "Main trading overview"
  },
  {
    title: "Trading Config",
    url: "/config",
    icon: Settings,
    description: "Symbol and strategy settings"
  },
  {
    title: "Strategy Management",
    url: "/strategies",
    icon: Brain,
    description: "Strategy library and editor"
  },
  {
    title: "Market Analysis",
    url: "/analysis",
    icon: LineChart,
    description: "Charts and technical analysis"
  },
  {
    title: "Live Trading",
    url: "/trading",
    icon: TrendingUp,
    description: "Real-time monitoring"
  },
  {
    title: "Backtesting",
    url: "/backtesting",
    icon: Activity,
    description: "Strategy testing and analytics"
  },
  {
    title: "System Health",
    url: "/health",
    icon: Shield,
    description: "Monitoring and diagnostics"
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Database,
    description: "System configuration"
  },
];

export function TradingSidebar() {
  const sidebar = useSidebar();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClassName = (path: string) => {
    const isCurrentlyActive = isActive(path);
    return cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      isCurrentlyActive
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-sidebar-foreground"
    );
  };

  return (
    <Sidebar className={cn("border-r border-sidebar-border", isCollapsed ? "w-16" : "w-64")}>
      <SidebarContent className="p-4">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3 mb-8 px-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">TradingOS</h1>
              <p className="text-xs text-sidebar-foreground/60">Professional Suite</p>
            </div>
          )}
        </div>

        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-sidebar-foreground/60 mb-3">
              Navigation
            </SidebarGroupLabel>
          )}
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="p-0">
                    <NavLink to={item.url} className={getNavClassName(item.url)} title={isCollapsed ? item.title : ""}>
                      <item.icon className={cn("flex-shrink-0", isCollapsed ? "w-5 h-5" : "w-4 h-4")} />
                      {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-current/60 truncate">{item.description}</div>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Status at bottom */}
        {!isCollapsed && (
          <div className="mt-auto pt-4 border-t border-sidebar-border">
            <div className="px-3 py-2 text-xs text-sidebar-foreground/60">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-status-active rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
              <div>Uptime: 99.98%</div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}