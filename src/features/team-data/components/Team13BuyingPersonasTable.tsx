
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeam13BuyingPersonas } from "../hooks/useTeam13Data";
import { Loader2 } from "lucide-react";
import { BuyingPersona } from "../types";

interface Team13BuyingPersonasTableProps {
  personas?: BuyingPersona[];
}

const Team13BuyingPersonasTable = ({ personas }: Team13BuyingPersonasTableProps) => {
  // Use the hook if no personas are provided directly
  const team13Data = useTeam13BuyingPersonas();
  
  // Use passed personas if available, otherwise use the data from hooks
  const data = personas || team13Data.data;
  const loading = !personas && team13Data.loading;
  const error = !personas && team13Data.error;
  
  // Log the data we're actually using
  console.log("Team13BuyingPersonasTable using data:", { 
    dataSource: personas ? "passed directly" : "team13 hook",
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
  
  console.log("Team 13 Buying personas data columns:", columnKeys);
  console.log("Team 13 Buying personas data sample:", data[0]);

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

export default Team13BuyingPersonasTable;
