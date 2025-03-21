
import { BuyingPersona } from "../../types";
import { PersonaCardItem } from "./PersonaCardItem";

type GroupedPersona = {
  personaType: string;
  personas: BuyingPersona[];
};

type PersonaCardListProps = {
  groupedPersonas: GroupedPersona[];
};

const PersonaCardList = ({ groupedPersonas }: PersonaCardListProps) => {
  if (!groupedPersonas || groupedPersonas.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No buying personas data available to display</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {groupedPersonas.map((group, index) => (
        <PersonaCardItem
          key={group.personaType}
          personaType={group.personaType}
          personaCount={group.personas.length}
          personas={group.personas}
          index={index}
        />
      ))}
    </div>
  );
};

export default PersonaCardList;
