
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeam38BuyingPersonas } from "../hooks/useTeam38Data";
import { useTeam3BuyingPersonas } from "../hooks/useTeam3Data";
import { Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { BuyingPersona } from "../types";

interface BuyingPersonasTableProps {
  personas?: BuyingPersona[];
}

const BuyingPersonasTable = ({ personas }: BuyingPersonasTableProps) => {
  const location = useLocation();
  // Check if the current path includes team-3 or team-38-results-quadruplicate
  const isTeam3Data = location.pathname === "/team-3-results" || location.pathname === "/team-38-results-quadruplicate";
  const isTeam13Data = location.pathname === "/team-13-results";
  
  // Log the current path and which team was detected
  console.log(`BuyingPersonasTable - Current path: ${location.pathname}, isTeam3Data: ${isTeam3Data}, isTeam13Data: ${isTeam13Data}`);
  
  // Use the appropriate hook based on the current path
  const team38Data = useTeam38BuyingPersonas();
  const team3Data = useTeam3BuyingPersonas();

  // Use passed personas if available, otherwise use the data from hooks
  const data = personas || (isTeam3Data ? team3Data.data : team38Data.data);
  const loading = !personas && (isTeam3Data ? team3Data.loading : team38Data.loading);
  const error = !personas && (isTeam3Data ? team3Data.error : team38Data.error);
  
  // Log the data we're actually using
  console.log("BuyingPersonasTable using data:", { 
    teamSource: personas ? "passed directly" : (isTeam3Data ? "team3" : "team38"),
    dataLength: data?.length || 0,
    isLoading: loading
  });

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
        Error loading buying personas data: {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No buying personas data available.
      </div>
    );
  }

  // Get all unique column keys excluding 'id'
  const columnKeys = Object.keys(data[0]).filter(key => key !== 'id');
  
  console.log("Buying personas data columns:", columnKeys);
  console.log("Buying personas data sample:", data[0]);

  return (
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
            {data.map((persona) => (
              <TableRow key={persona.id}>
                {columnKeys.map((key) => (
                  <TableCell key={`${persona.id}-${key}`}>
                    {typeof persona[key] === 'boolean' 
                      ? persona[key] ? 'Yes' : 'No'
                      : persona[key] || '—'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BuyingPersonasTable;
