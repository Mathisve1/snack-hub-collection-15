
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeam38StreetInterviews } from "../hooks/useTeam38Data";
import { Loader2 } from "lucide-react";
import { StreetInterview } from "../types";

interface StreetInterviewsTableProps {
  interviews?: StreetInterview[];
}

const StreetInterviewsTable = ({ interviews }: StreetInterviewsTableProps) => {
  // Use the team38Data hook only if interviews are not passed as props
  const team38Data = useTeam38StreetInterviews();

  // Use passed interviews if available, otherwise use the data from hooks
  const data = interviews || team38Data.data;
  const loading = !interviews && team38Data.loading;
  const error = !interviews && team38Data.error;

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
  
  // Filter out columns we want to display
  const displayColumns = [
    'eerste_reactie', 'populaire_snack_1', 'populaire_snack_2', 
    'prijs', 'smaakvoorkeuren', 'marketing_1', 'hogere_prijs'
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
            {data.map((interview) => (
              <TableRow key={interview.id}>
                {filteredColumns.map((key) => (
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
  );
};

export default StreetInterviewsTable;
