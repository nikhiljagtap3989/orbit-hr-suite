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
import { CalendarPlus, ShieldCheck, Coins, FileText, Code, FilePen, Search, Send, Receipt, X, Mail, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    label: "RCM Dashboard",
    path: "/",
    icon: BarChart,
  },
  {
    label: "Patient Scheduling",
    path: "/patient-scheduling",
    icon: CalendarPlus,
  },
  {
    label: "Insurance Verification",
    path: "/insurance-verification",
    icon: ShieldCheck,
  },
  {
    label: "Co-Pay Collection",
    path: "/copay-collection",
    icon: Coins,
  },
  {
    label: "Visit Documentation",
    path: "/visit-documentation",
    icon: FileText,
  },
  {
    label: "Medical Coding",
    path: "/medical-coding",
    icon: Code,
  },
  {
    label: "Charge Entry",
    path: "/charge-entry",
    icon: FilePen,
  }
];

const Sidebar = () => {
  return (
    <SidebarComponent>
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <h2 className="text-xl font-bold text-primary-foreground">Healthcare RCM</h2>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>RCM Workflow</SidebarGroupLabel>
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
            Contact our support team for RCM assistance
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
