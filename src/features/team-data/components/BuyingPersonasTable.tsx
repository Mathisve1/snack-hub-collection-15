
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeam38BuyingPersonas } from "../hooks/useTeam38Data";
import { Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { BuyingPersona } from "../types";

interface BuyingPersonasTableProps {
  personas?: BuyingPersona[];
}

const BuyingPersonasTable = ({ personas }: BuyingPersonasTableProps) => {
  const location = useLocation();
  // Log the current path
  console.log(`BuyingPersonasTable - Current path: ${location.pathname}`);
  
  // Use the team38Data hook only if personas are not passed as props
  const team38Data = useTeam38BuyingPersonas();

  // Use passed personas if available, otherwise use the data from hooks
  const data = personas || team38Data.data;
  const loading = !personas && team38Data.loading;
  const error = !personas && team38Data.error;
  
  // Log the data we're actually using
  console.log("BuyingPersonasTable using data:", { 
    teamSource: personas ? "passed directly" : "team38",
    dataLength: data?.length || 0,
    isLoading: loading,
    firstItem: data && data.length > 0 ? data[0].buying_persona : null
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
