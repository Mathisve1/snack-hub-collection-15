
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import SnackPage from "./pages/SnackPage";
import FriturenList from "./pages/FriturenList";
import FrituurDetails from "./pages/FrituurDetails";
import AddFrituurPage from "./pages/AddFrituurPage";
import Team38Results from "./pages/Team38Results";
import Team3Results from "./pages/Team3Results";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalog/:team" element={<Catalog />} />
          <Route path="/snack/:id" element={<SnackPage />} />
          <Route path="/frituren/:team" element={<FriturenList />} />
          <Route path="/frituur/:team/:businessName" element={<FrituurDetails />} />
          <Route path="/frituren/:team/add" element={<AddFrituurPage />} />
          <Route path="/team-38-results" element={<Team38Results />} />
          <Route path="/team-3-results" element={<Team3Results />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
