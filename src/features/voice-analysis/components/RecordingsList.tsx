
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
  const { recordings, loading, audioUrls } = useRecordings(team, type);

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
          <TableHead>Audio</TableHead>
          <TableHead>Transcript</TableHead>
          <TableHead>Analysis</TableHead>
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
            <TableCell>
              {audioUrls[recording.id] && (
                <audio src={audioUrls[recording.id]} controls className="w-40" />
              )}
            </TableCell>
            <TableCell className="max-w-xs truncate">
              {recording.transcript || '-'}
            </TableCell>
            <TableCell className="max-w-xs truncate">
              {recording.analysis || '-'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RecordingsList;
