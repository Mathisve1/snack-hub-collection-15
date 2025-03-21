
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TableIcon, LayoutGrid } from "lucide-react";
import Team3BuyingPersonasTable from "../Team3BuyingPersonasTable";
import Team3BuyingPersonasCards from "../Team3BuyingPersonasCards";
import PersonaCardList from "../buying-personas/PersonaCardList";
import { BuyingPersona } from "../../types";

interface Team3PersonasTabProps {
  personas: BuyingPersona[];
  groupedPersonas: {
    personaType: string;
    personas: BuyingPersona[];
  }[];
}

const Team3PersonasTab = ({ personas, groupedPersonas }: Team3PersonasTabProps) => {
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");

  return (
    <>
      <div className="flex justify-end mb-4">
        <div className="bg-gray-100 rounded-md p-1 inline-flex">
          <Button
            variant={viewMode === "cards" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("cards")}
            className="rounded-md"
          >
            <LayoutGrid className="h-4 w-4 mr-1" />
            Cards
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="rounded-md"
          >
            <TableIcon className="h-4 w-4 mr-1" />
            Table
          </Button>
        </div>
      </div>
      
      {viewMode === "table" ? (
        <Team3BuyingPersonasTable personas={personas} />
      ) : (
        <>
          <Team3BuyingPersonasCards personas={personas} />
          <h3 className="text-xl font-bold mt-10 mb-4">Persona Profiles</h3>
          <PersonaCardList groupedPersonas={groupedPersonas} />
        </>
      )}
    </>
  );
};

export default Team3PersonasTab;
