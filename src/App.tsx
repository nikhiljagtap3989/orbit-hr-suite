
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import RCMDashboard from "./pages/RCMDashboard";
import PatientScheduling from "./pages/rcm/PatientScheduling";
import InsuranceVerification from "./pages/rcm/InsuranceVerification";
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
                <RCMDashboard />
              </MainLayout>
            } 
          />
          <Route 
            path="/patient-scheduling" 
            element={
              <MainLayout>
                <PatientScheduling />
              </MainLayout>
            } 
          />
          <Route 
            path="/insurance-verification" 
            element={
              <MainLayout>
                <InsuranceVerification />
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
