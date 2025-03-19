
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeam38StreetInterviews } from "../hooks/useTeam38Data";
import { useTeam3StreetInterviews } from "../hooks/useTeam3Data";
import { Loader2, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import StreetInterviewsSummary from "./street-interviews/StreetInterviewsSummary";
import { useLocation } from "react-router-dom";

const StreetInterviewsTable = () => {
  const location = useLocation();
  // Check if the current path includes team-3 or team-38-results-quadruplicate
  const isTeam3Data = location.pathname === "/team-3-results" || location.pathname === "/team-38-results-quadruplicate";
  
  // Log the current path and which team was detected
  console.log(`StreetInterviewsTable - Current path: ${location.pathname}, isTeam3Data: ${isTeam3Data}`);
  
  // Use the appropriate hook based on the current path
  const team38Data = useTeam38StreetInterviews();
  const team3Data = useTeam3StreetInterviews();
  
  const { data, loading, error } = isTeam3Data ? team3Data : team38Data;
  
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
        <StreetInterviewsSummary data={data} />
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

export default StreetInterviewsTable;
