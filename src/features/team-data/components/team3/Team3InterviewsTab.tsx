
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TableIcon, LayoutGrid } from "lucide-react";
import Team3StreetInterviewsTable from "../Team3StreetInterviewsTable";
import Team3StreetInterviewsSummary from "../Team3StreetInterviewsSummary";
import { StreetInterview } from "../../types";

interface Team3InterviewsTabProps {
  interviews: StreetInterview[];
}

const Team3InterviewsTab = ({ interviews }: Team3InterviewsTabProps) => {
  const [viewMode, setViewMode] = useState<"table" | "summary">("summary");

  return (
    <>
      <div className="flex justify-end mb-4">
        <div className="bg-gray-100 rounded-md p-1 inline-flex">
          <Button
            variant={viewMode === "summary" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("summary")}
            className="rounded-md"
          >
            <LayoutGrid className="h-4 w-4 mr-1" />
            Summary
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
        <Team3StreetInterviewsTable interviews={interviews} />
      ) : (
        <>
          <h3 className="text-xl font-bold mb-6">Street Interview Insights</h3>
          <Team3StreetInterviewsSummary data={interviews} />
        </>
      )}
    </>
  );
};

export default Team3InterviewsTab;
