
import { useTeam38BuyingPersonas } from "../hooks/useTeam38Data";
import { PersonaCardItem } from "./buying-personas/PersonaCardItem";
import { groupPersonasByName } from "./buying-personas/PersonaDataUtils";
import { PersonasLoadingState } from "./buying-personas/PersonasLoadingState";
import { PersonasErrorState } from "./buying-personas/PersonasErrorState";
import { EmptyPersonasState } from "./buying-personas/EmptyPersonasState";

const BuyingPersonasCards = () => {
  const { data, loading, error } = useTeam38BuyingPersonas();

  if (loading) {
    return <PersonasLoadingState />;
  }

  if (error) {
    return <PersonasErrorState error={error} />;
  }

  if (!data || data.length === 0) {
    return <EmptyPersonasState />;
  }

  // Group personas by name
  const personaGroups = groupPersonasByName(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
      {personaGroups.map((persona, index) => (
        <PersonaCardItem 
          key={persona.name} 
          persona={persona} 
          index={index} 
        />
      ))}
    </div>
  );
};

export default BuyingPersonasCards;
