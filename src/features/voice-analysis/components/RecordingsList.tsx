
import { AudioLines } from "lucide-react";
import { useRecordings } from "../hooks/useRecordings";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface RecordingsListProps {
  team: string;
  type: 'frituren' | 'interviews';
}

const RecordingsList = ({ team, type }: RecordingsListProps) => {
  const { recordings, loading } = useRecordings(team, type);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
        <span className="ml-3 text-gray-600">Loading recordings...</span>
      </div>
    );
  }

  if (recordings.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
        <AudioLines className="h-10 w-10 mx-auto text-gray-400 mb-2" />
        <p className="text-gray-500">No voice recordings have been analyzed yet</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/2">Transcript</TableHead>
          <TableHead className="w-1/2">Analysis</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recordings.map((recording) => (
          <TableRow key={recording.id}>
            <TableCell className="whitespace-normal align-top">
              <div className="max-h-40 overflow-y-auto">
                {recording.transcript || '-'}
              </div>
            </TableCell>
            <TableCell className="whitespace-normal align-top">
              <div className="max-h-40 overflow-y-auto">
                {recording.analysis || '-'}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecordingsList;
