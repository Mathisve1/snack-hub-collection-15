
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeam38Frituren } from "../hooks/useTeam38Data";
import { useTeam3Frituren } from "../hooks/useTeam3Data";
import { Loader2, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FriturenSummary from "./frituren/FriturenSummary";
import { useLocation } from "react-router-dom";

const FriturenTable = () => {
  const location = useLocation();
  const isTeam3 = location.pathname.includes("team-3");
  
  // Use the appropriate hook based on the current path
  const team38Data = useTeam38Frituren();
  const team3Data = useTeam3Frituren();
  
  const { data, loading, error } = isTeam3 ? team3Data : team38Data;
  
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
        Error loading frituren data: {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No frituren data available.
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
        <FriturenSummary data={data} />
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
                {data.map((frituur) => (
                  <TableRow key={frituur.id}>
                    {columnKeys.map((key) => (
                      <TableCell key={`${frituur.id}-${key}`}>
                        {typeof frituur[key] === 'boolean' 
                          ? frituur[key] ? 'Yes' : 'No'
                          : frituur[key] || '—'}
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

export default FriturenTable;
