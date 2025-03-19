
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

  // Always log the current state for debugging
  console.log("BuyingPersonasCards state:", { data, loading, error, isTeam3, path: location.pathname });

  if (loading) {
    return <PersonasLoadingState />;
  }

  if (error) {
    return <PersonasErrorState error={error} />;
  }

  // Extra check to ensure we truly have no data
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <EmptyPersonasState 
        debug={{
          dataLength: data?.length,
          dataExists: !!data && Array.isArray(data) && data.length > 0,
          isLoading: loading,
          error: error
        }}
      />
    );
  }

  // Log what we're about to render
  console.log("Rendering personas data:", data);
  
  // Create a mapping of persona types to arrays of personas
  const personasByType: Record<string, BuyingPersona[]> = {};
  
  // Group personas by type, handling case insensitivity
  data.forEach(persona => {
    if (!persona.buying_persona) return;
    
    const personaType = persona.buying_persona.toLowerCase();
    if (!personasByType[personaType]) {
      personasByType[personaType] = [];
    }
    personasByType[personaType].push(persona);
  });
  
  // Convert to array for rendering
  const personaTypes = Object.keys(personasByType);
  
  // Ensure we actually have personas to display
  if (personaTypes.length === 0) {
    return (
      <EmptyPersonasState 
        debug={{
          dataLength: data?.length,
          dataExists: true,
          isLoading: false,
          error: "No valid persona types found in data"
        }}
      />
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {personaTypes.map((personaType, index) => {
        const personasOfThisType = personasByType[personaType];
        
        return (
          <PersonaCardItem 
            key={personaType} 
            personaType={personaType.charAt(0).toUpperCase() + personaType.slice(1)}
            personaCount={personasOfThisType.length}
            personas={personasOfThisType}
            index={index} 
          />
        );
      })}
    </div>
  );
};

export default BuyingPersonasCards;
