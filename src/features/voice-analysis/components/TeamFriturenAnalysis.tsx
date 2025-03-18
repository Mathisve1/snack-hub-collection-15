
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatDistanceToNow } from "date-fns";
import { VoiceAnalysis } from "../types";
import { Card } from "@/components/ui/card";
import { formatDuration } from "../utils/formatUtils";
import StatusBadge from "./StatusBadge";

interface TeamFriturenAnalysisProps {
  recordings: VoiceAnalysis[];
}

const TeamFriturenAnalysis = ({ recordings }: TeamFriturenAnalysisProps) => {
  const hasTranscripts = recordings.some(r => r.transcript);
  const hasAnalyses = recordings.some(r => r.analysis);

  if (recordings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No recordings found for this team.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hasTranscripts && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="transcripts">
            <AccordionTrigger className="text-lg font-semibold">
              Transcripts ({recordings.filter(r => r.transcript).length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 mt-2">
                {recordings.filter(r => r.transcript).map((recording) => (
                  <Card key={recording.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(recording.created_at), { addSuffix: true })} 
                        {recording.duration_seconds > 0 && ` • ${formatDuration(recording.duration_seconds)}`}
                      </div>
                      <StatusBadge status={recording.status} />
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{recording.transcript}</p>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      {hasAnalyses && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="analyses">
            <AccordionTrigger className="text-lg font-semibold">
              Analyses ({recordings.filter(r => r.analysis).length})
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 mt-2">
                {recordings.filter(r => r.analysis).map((recording) => (
                  <Card key={recording.id} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(recording.created_at), { addSuffix: true })}
                        {recording.duration_seconds > 0 && ` • ${formatDuration(recording.duration_seconds)}`}
                      </div>
                      <StatusBadge status={recording.status} />
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{recording.analysis}</p>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default TeamFriturenAnalysis;
