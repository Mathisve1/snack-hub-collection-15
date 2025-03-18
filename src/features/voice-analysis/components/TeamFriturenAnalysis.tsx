
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatDistanceToNow } from "date-fns";
import { VoiceAnalysis } from "../types";
import { Card } from "@/components/ui/card";
import { formatDuration } from "../utils/formatUtils";
import StatusBadge from "./StatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TeamFriturenAnalysisProps {
  recordings: VoiceAnalysis[];
  team: string;
}

const TeamFriturenAnalysis = ({ recordings, team }: TeamFriturenAnalysisProps) => {
  // Filter recordings for the specific team first
  const teamRecordings = recordings.filter(recording => recording.team === team);
  
  // Filter completed recordings since those are the ones we want to display
  const completedRecordings = teamRecordings.filter(r => r.status === 'completed');
  
  // Group recordings by type (transcripts and analyses)
  const transcripts = completedRecordings.filter(r => r.transcript);
  const analyses = completedRecordings.filter(r => r.analysis);

  if (teamRecordings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No recordings found for this team.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="transcripts" className="w-full">
        <TabsList>
          <TabsTrigger value="transcripts">
            Transcripts ({transcripts.length})
          </TabsTrigger>
          <TabsTrigger value="analyses">
            Analyses ({analyses.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transcripts" className="mt-4 space-y-4">
          {transcripts.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {transcripts.map((recording) => (
                <AccordionItem key={recording.id} value={recording.id} className="border rounded-lg">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-gray-50 rounded-lg">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          Recording from {formatDistanceToNow(new Date(recording.created_at), { addSuffix: true })}
                        </span>
                        <StatusBadge status={recording.status} />
                      </div>
                      {recording.duration_seconds > 0 && (
                        <span className="text-xs text-gray-500">
                          Duration: {formatDuration(recording.duration_seconds)}
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <Card className="p-4 mt-2">
                      <p className="text-sm whitespace-pre-wrap">{recording.transcript}</p>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No transcripts available yet.
            </div>
          )}
        </TabsContent>

        <TabsContent value="analyses" className="mt-4 space-y-4">
          {analyses.length > 0 ? (
            <Accordion type="single" collapsible className="w-full space-y-4">
              {analyses.map((recording) => (
                <AccordionItem key={recording.id} value={recording.id} className="border rounded-lg">
                  <AccordionTrigger className="px-4 hover:no-underline hover:bg-gray-50 rounded-lg">
                    <div className="flex flex-col items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          Analysis from {formatDistanceToNow(new Date(recording.created_at), { addSuffix: true })}
                        </span>
                        <StatusBadge status={recording.status} />
                      </div>
                      {recording.duration_seconds > 0 && (
                        <span className="text-xs text-gray-500">
                          Duration: {formatDuration(recording.duration_seconds)}
                        </span>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <Card className="p-4 mt-2">
                      <p className="text-sm whitespace-pre-wrap">{recording.analysis}</p>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No analyses available yet.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamFriturenAnalysis;
