
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeam38Frituren } from "../hooks/useTeam38Data";
import { Loader2 } from "lucide-react";
import { Frituur } from "../types";

interface FriturenTableProps {
  frituren?: Frituur[];
}

const FriturenTable = ({ frituren }: FriturenTableProps) => {
  // Use the team38Data hook only if frituren are not passed as props
  const team38Data = useTeam38Frituren();

  // Use passed frituren if available, otherwise use the data from hooks
  const data = frituren || team38Data.data;
  const loading = !frituren && team38Data.loading;
  const error = !frituren && team38Data.error;

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
  
  // Filter out columns we want to display
  const displayColumns = [
    'bestseller_1', 'bestseller_2', 'bestseller_3', 
    'trends_1', 'groothandel', 'aankoopprijs',
    'bereidheid_aanbieden'
  ];
  
  const filteredColumns = columnKeys.filter(key => displayColumns.includes(key));

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {filteredColumns.map((key) => (
                <TableHead key={key} className="font-semibold">
                  {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((frituur) => (
              <TableRow key={frituur.id}>
                {filteredColumns.map((key) => (
                  <TableCell key={`${frituur.id}-${key}`}>
                    {frituur[key] || '—'}
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

export default FriturenTable;
