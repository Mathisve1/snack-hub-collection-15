
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeam13Frituren } from "../hooks/useTeam13Data";
import { Loader2, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FriturenSummary from "./frituren/FriturenSummary";
import { Frituur } from "../types";

interface Team13FriturenTableProps {
  frituren?: Frituur[];
}

const Team13FriturenTable = ({ frituren }: Team13FriturenTableProps) => {
  // Use the team13 hook
  const team13Data = useTeam13Frituren();
  
  // Use passed frituren if available, otherwise use the data from hooks
  const data = frituren || team13Data.data;
  const loading = !frituren && team13Data.loading;
  const error = !frituren && team13Data.error;
  
  // Log the data we're actually using
  console.log("Team13FriturenTable using data:", { 
    dataSource: frituren ? "passed directly" : "team13 hook",
    dataLength: data?.length || 0,
    isLoading: loading,
    team13DataLength: team13Data.data?.length,
    friturenLength: frituren?.length
  });
  
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
  
  console.log("Team 13 Frituren data columns:", columnKeys);
  console.log("Team 13 Frituren data sample:", data[0]);

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

export default Team13FriturenTable;
