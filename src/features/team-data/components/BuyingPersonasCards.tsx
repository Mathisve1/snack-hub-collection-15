
import { useTeam38BuyingPersonas } from "../hooks/useTeam38Data";
import { useTeam3BuyingPersonas } from "../hooks/useTeam3Data";
import { useTeam13BuyingPersonas } from "../hooks/useTeam13Data";
import { useLocation } from "react-router-dom";
import { PersonaCardItem } from "./buying-personas/PersonaCardItem";
import { EmptyPersonasState } from "./buying-personas/EmptyPersonasState";
import { PersonasErrorState } from "./buying-personas/PersonasErrorState";
import { PersonasLoadingState } from "./buying-personas/PersonasLoadingState";
import { BuyingPersona } from "../types";

interface BuyingPersonasCardsProps {
  personas?: BuyingPersona[];
}

const BuyingPersonasCards = ({ personas }: BuyingPersonasCardsProps) => {
  const location = useLocation();
  // Check if the current path includes team-3 or team-38-results-quadruplicate
  const isTeam3Data = location.pathname === "/team-3-results" || location.pathname === "/team-38-results-quadruplicate";
  const isTeam13Data = location.pathname === "/team-13-results";
  
  // Log the current path and which team was detected
  console.log(`Current path: ${location.pathname}, isTeam3Data: ${isTeam3Data}, isTeam13Data: ${isTeam13Data}`);
  
  // Use the appropriate hook based on the current path
  const team38Data = useTeam38BuyingPersonas();
  const team3Data = useTeam3BuyingPersonas();
  const team13Data = useTeam13BuyingPersonas();
  
  // Use passed personas if available, otherwise use the data from hooks
  const data = personas || 
    (isTeam13Data ? team13Data.data : 
     (isTeam3Data ? team3Data.data : team38Data.data));

  const loading = !personas && 
    (isTeam13Data ? team13Data.loading : 
     (isTeam3Data ? team3Data.loading : team38Data.loading));

  const error = !personas && 
    (isTeam13Data ? team13Data.error : 
     (isTeam3Data ? team3Data.error : team38Data.error));

  // Always log the current state for debugging
  console.log("BuyingPersonasCards state:", { 
    data, 
    loading, 
    error, 
    isTeam3Data,
    isTeam13Data,
    path: location.pathname,
    dataSource: personas ? "props" : (isTeam13Data ? "team13Data" : (isTeam3Data ? "team3Data" : "team38Data")),
    team3DataLength: team3Data.data?.length,
    team38DataLength: team38Data.data?.length,
    team13DataLength: team13Data.data?.length,
    personasLength: personas?.length
  });

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
          error: error,
          currentPath: location.pathname,
          isTeam3Data: isTeam3Data,
          isTeam13Data: isTeam13Data,
          team3DataLength: team3Data.data?.length,
          team38DataLength: team38Data.data?.length,
          team13DataLength: team13Data.data?.length,
          personasLength: personas?.length
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
          error: "No valid persona types found in data",
          currentPath: location.pathname,
          isTeam3Data: isTeam3Data,
          isTeam13Data: isTeam13Data
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
