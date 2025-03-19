
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeam38BuyingPersonas } from "../hooks/useTeam38Data";
import { Loader2 } from "lucide-react";

const BuyingPersonasTable = () => {
  const { data, loading, error } = useTeam38BuyingPersonas();

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
