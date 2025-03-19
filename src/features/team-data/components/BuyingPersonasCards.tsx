
import { useTeam38BuyingPersonas } from "../hooks/useTeam38Data";
import { useTeam3BuyingPersonas } from "../hooks/useTeam3Data";
import { Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { PersonaCardItem } from "./buying-personas/PersonaCardItem";
import { EmptyPersonasState } from "./buying-personas/EmptyPersonasState";
import { PersonasErrorState } from "./buying-personas/PersonasErrorState";
import { PersonasLoadingState } from "./buying-personas/PersonasLoadingState";

const BuyingPersonasCards = () => {
  const location = useLocation();
  const isTeam3 = location.pathname.includes("team-3");
  
  // Use the appropriate hook based on the current path
  const team38Data = useTeam38BuyingPersonas();
  const team3Data = useTeam3BuyingPersonas();
  
  const { data, loading, error } = isTeam3 ? team3Data : team38Data;

  if (loading) {
    return <PersonasLoadingState />;
  }

  if (error) {
    return <PersonasErrorState error={error} />;
  }

  if (!data || data.length === 0) {
    return <EmptyPersonasState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((persona) => (
        <PersonaCardItem key={persona.id} persona={persona} />
      ))}
    </div>
  );
};

export default BuyingPersonasCards;
