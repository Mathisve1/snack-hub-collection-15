
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeam13StreetInterviews } from "../hooks/useTeam13Data";
import { Loader2, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Team13StreetInterviewsSummary from "./Team13StreetInterviewsSummary";
import { StreetInterview } from "../types";

interface Team13StreetInterviewsTableProps {
  interviews?: StreetInterview[];
}

const Team13StreetInterviewsTable = ({ interviews }: Team13StreetInterviewsTableProps) => {
  // Use the team13 hook
  const team13Data = useTeam13StreetInterviews();
  
  // Use passed interviews if available, otherwise use the data from hooks
  const data = interviews || team13Data.data;
  const loading = !interviews && team13Data.loading;
  const error = !interviews && team13Data.error;
  
  // View mode state
  const [viewMode, setViewMode] = useState<"summary" | "table">("summary");

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading street interviews data: {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No street interviews data available.
      </div>
    );
  }

  // Get all unique column keys excluding 'id'
  const columnKeys = Object.keys(data[0]).filter(key => key !== 'id');

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
            Samenvatting
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="rounded-md"
          >
            <TableIcon className="h-4 w-4 mr-1" />
            Tabel
          </Button>
        </div>
      </div>

      {viewMode === "summary" ? (
        <Team13StreetInterviewsSummary interviews={data} />
      ) : (
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columnKeys.map((key) => (
                    <TableHead key={key} className="font-semibold">
                      {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((interview) => (
                  <TableRow key={interview.id}>
                    {columnKeys.map((key) => (
                      <TableCell key={`${interview.id}-${key}`}>
                        {typeof interview[key] === 'boolean' 
                          ? interview[key] ? 'Yes' : 'No'
                          : interview[key] || '—'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default Team13StreetInterviewsTable;
