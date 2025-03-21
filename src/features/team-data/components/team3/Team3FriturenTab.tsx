import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TableIcon, LayoutGrid } from "lucide-react";
import Team3FriturenTable from "../Team3FriturenTable";
import FriturenSummary from "../frituren/FriturenSummary";
import FriturenCardView from "../frituren/FriturenCardView";
import { Frituur } from "../../types";
interface Team3FriturenTabProps {
  frituren: Frituur[];
}
const Team3FriturenTab = ({
  frituren
}: Team3FriturenTabProps) => {
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");
  return <>
      <div className="flex justify-end mb-4">
        <div className="bg-gray-100 rounded-md p-1 inline-flex">
          <Button variant={viewMode === "cards" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("cards")} className="rounded-md">
            <LayoutGrid className="h-4 w-4 mr-1" />
            Cards
          </Button>
          <Button variant={viewMode === "table" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("table")} className="rounded-md">
            <TableIcon className="h-4 w-4 mr-1" />
            Table
          </Button>
        </div>
      </div>
      
      {viewMode === "table" ? <Team3FriturenTable frituren={frituren} /> : <>
          <h3 className="text-xl font-bold mb-6">Key Insights from Frituren</h3>
          <FriturenSummary data={frituren} />
          
          <FriturenCardView frituren={frituren} />
        </>}
    </>;
};
export default Team3FriturenTab;