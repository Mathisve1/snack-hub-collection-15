
import { AudioLines } from "lucide-react";
import { useRecordings } from "../hooks/useRecordings";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatusBadge from "./StatusBadge";
import { formatDistanceToNow } from "date-fns";
import { formatDuration } from "../utils/formatUtils";

interface RecordingsListProps {
  team: string;
  type: 'frituren' | 'interviews';
}

const RecordingsList = ({ team, type }: RecordingsListProps) => {
  const { recordings, loading } = useRecordings(team, type);

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
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead className="w-1/3">Transcript</TableHead>
          <TableHead className="w-1/3">Analysis</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recordings.map((recording) => (
          <TableRow key={recording.id}>
            <TableCell>
              <StatusBadge status={recording.status} />
            </TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(recording.created_at), { addSuffix: true })}
            </TableCell>
            <TableCell>
              {formatDuration(recording.duration_seconds)}
            </TableCell>
            <TableCell className="whitespace-normal">
              <div className="max-h-40 overflow-y-auto">
                {recording.transcript || '-'}
              </div>
            </TableCell>
            <TableCell className="whitespace-normal">
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
