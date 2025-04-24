
import React from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background flex-col">
        <div className="flex flex-1 w-full overflow-hidden">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-auto p-6">
              {children}
            </main>
          </div>
        </div>
        <footer className="bg-muted py-4 px-6 text-sm text-center border-t">
          <p>© {new Date().getFullYear()} Healthcare RCM System - Streamlining Revenue Cycle Management</p>
        </footer>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
