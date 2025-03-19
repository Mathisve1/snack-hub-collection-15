
import { useTeam38BuyingPersonas } from "../hooks/useTeam38Data";
import { useTeam3BuyingPersonas } from "../hooks/useTeam3Data";
import { useLocation } from "react-router-dom";
import { PersonaCardItem } from "./buying-personas/PersonaCardItem";
import { EmptyPersonasState } from "./buying-personas/EmptyPersonasState";
import { PersonasErrorState } from "./buying-personas/PersonasErrorState";
import { PersonasLoadingState } from "./buying-personas/PersonasLoadingState";
import { BuyingPersona } from "../types";

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
    console.log("No data available for buying personas");
    return <EmptyPersonasState />;
  }

  // Debug log to see what data we're getting
  console.log("Rendering personas data:", data);
  
  // Create a set of unique persona types
  const uniquePersonaTypes = [...new Set(data.map(p => p.buying_persona?.toLowerCase() || ''))];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {uniquePersonaTypes.map((personaType, index) => {
        // Filter personas by type
        const personasOfType = data.filter(
          p => p.buying_persona?.toLowerCase() === personaType
        );
        
        // Skip empty persona types
        if (!personaType || personasOfType.length === 0) return null;
        
        // Create a simplified persona object with the data needed for the card
        const persona = {
          name: personaType.charAt(0).toUpperCase() + personaType.slice(1),
          count: personasOfType.length,
          personas: personasOfType
        };
        
        return (
          <PersonaCardItem 
            key={personaType} 
            personaType={persona.name}
            personaCount={persona.count}
            personas={persona.personas}
            index={index} 
          />
        );
      })}
    </div>
  );
};

export default BuyingPersonasCards;
