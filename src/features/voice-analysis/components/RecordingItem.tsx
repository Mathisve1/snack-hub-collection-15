
import { AudioLines } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { VoiceAnalysis } from "../types";
import StatusBadge from "./StatusBadge";
import FileDownloader from "./FileDownloader";
import { formatDuration } from "../utils/formatUtils";

interface RecordingItemProps {
  recording: VoiceAnalysis;
  audioUrl?: string;
}

const RecordingItem = ({ recording, audioUrl }: RecordingItemProps) => {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-3">
          <AudioLines className="h-5 w-5 text-indigo-500 mt-1" />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">
                Recording {formatDistanceToNow(new Date(recording.created_at), { addSuffix: true })}
              </p>
              <StatusBadge status={recording.status} />
            </div>
            <p className="text-sm text-gray-500">Duration: {formatDuration(recording.duration_seconds)}</p>
            
            {recording.transcript && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-1">Transcript:</p>
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{recording.transcript}</p>
              </div>
            )}
            
            {recording.analysis && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-1">Analysis:</p>
                <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded whitespace-pre-wrap">{recording.analysis}</p>
              </div>
            )}
            
            <div className="mt-3">
              {audioUrl && (
                <div className="mb-2">
                  <audio 
                    src={audioUrl} 
                    controls 
                    className="w-full max-w-md"
                  />
                </div>
              )}
              
              {recording.file_name && (
                <FileDownloader fileName={recording.file_name} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingItem;
