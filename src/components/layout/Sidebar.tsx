
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { Users, FileText, Briefcase, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: Users,
  },
  {
    label: "Employees",
    path: "/employees",
    icon: Users,
  },
  {
    label: "Onboarding",
    path: "/onboarding",
    icon: Briefcase,
  },
  {
    label: "Attendance",
    path: "/attendance",
    icon: Clock,
  },
  {
    label: "Leave",
    path: "/leave",
    icon: Calendar,
  },
  {
    label: "Documents",
    path: "/documents",
    icon: FileText,
  },
];

const Sidebar = () => {
  return (
    <SidebarComponent>
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <h2 className="text-xl font-bold text-primary-foreground">Orbit HR</h2>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        cn("flex items-center gap-3", {
                          "text-sidebar-accent-foreground bg-sidebar-accent":
                            isActive,
                        })
                      }
                      end
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-6">
        <div className="rounded-md bg-sidebar-accent p-4">
          <h3 className="font-medium text-sidebar-accent-foreground">
            Need Help?
          </h3>
          <p className="text-xs text-sidebar-foreground mt-1">
            Check our documentation for guides and support
          </p>
          <button className="mt-2 text-xs font-medium underline text-sidebar-accent-foreground">
            View Documentation
          </button>
        </div>
      </div>
    </SidebarComponent>
  );
};

export default Sidebar;
