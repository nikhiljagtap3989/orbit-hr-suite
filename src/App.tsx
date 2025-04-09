
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Onboarding from "./pages/Onboarding";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import Documents from "./pages/Documents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            } 
          />
          <Route 
            path="/employees" 
            element={
              <MainLayout>
                <Employees />
              </MainLayout>
            } 
          />
          <Route 
            path="/onboarding" 
            element={
              <MainLayout>
                <Onboarding />
              </MainLayout>
            } 
          />
          <Route 
            path="/attendance" 
            element={
              <MainLayout>
                <Attendance />
              </MainLayout>
            } 
          />
          <Route 
            path="/leave" 
            element={
              <MainLayout>
                <Leave />
              </MainLayout>
            } 
          />
          <Route 
            path="/documents" 
            element={
              <MainLayout>
                <Documents />
              </MainLayout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
