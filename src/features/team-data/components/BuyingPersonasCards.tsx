
import { useTeam38BuyingPersonas } from "../hooks/useTeam38Data";
import { useTeam3BuyingPersonas } from "../hooks/useTeam3Data";
import { useLocation } from "react-router-dom";
import { PersonaCardItem } from "./buying-personas/PersonaCardItem";
import { EmptyPersonasState } from "./buying-personas/EmptyPersonasState";
import { PersonasErrorState } from "./buying-personas/PersonasErrorState";
import { PersonasLoadingState } from "./buying-personas/PersonasLoadingState";
import { groupPersonasByName } from "./buying-personas/PersonaDataUtils";
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

  console.log("Raw buying personas data:", data);
  
  // Process the raw data to match the GroupedPersona format expected by PersonaCardItem
  const groupedPersonas = groupPersonasByName(data);
  
  // Additional debug logging
  console.log("Grouped personas result:", groupedPersonas);
  
  if (!groupedPersonas || groupedPersonas.length === 0) {
    console.log("No grouped personas were created");
    return <EmptyPersonasState />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {groupedPersonas.map((persona, index) => (
        <PersonaCardItem key={persona.name} persona={persona} index={index} />
      ))}
    </div>
  );
};

export default BuyingPersonasCards;
