
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalysisResults from "../AnalysisResults";
import { useState } from "react";

interface AnalysisResultsCardProps {
  team: string;
  refreshFrituren: number;
  refreshInterviews: number;
  refreshBuyer: number;
}

const AnalysisResultsCard = ({ 
  team, 
  refreshFrituren, 
  refreshInterviews, 
  refreshBuyer 
}: AnalysisResultsCardProps) => {
  // Default view mode state to handle the sub-tabs (transcripts/analyses)
  const [viewMode, setViewMode] = useState<'transcripts' | 'analyses'>('transcripts');

  // Handler for changing the view mode
  const handleViewModeChange = (mode: 'transcripts' | 'analyses') => {
    setViewMode(mode);
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl">Analysis Results</CardTitle>
        <CardDescription>
          View transcripts and analyses from your uploaded voice recordings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="frituren" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="frituren">Frituren</TabsTrigger>
            <TabsTrigger value="interviews">Street Interviews</TabsTrigger>
            <TabsTrigger value="buyer">Buyer Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="frituren">
            <Tabs defaultValue="transcripts" onValueChange={(value) => handleViewModeChange(value as 'transcripts' | 'analyses')}>
              <TabsList className="mb-4">
                <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
                <TabsTrigger value="analyses">Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transcripts">
                <AnalysisResults 
                  key={`frituren-transcripts-${refreshFrituren}`}
                  team={team}
                  type="frituren"
                  viewMode="transcripts"
                />
              </TabsContent>
              
              <TabsContent value="analyses">
                <AnalysisResults 
                  key={`frituren-analyses-${refreshFrituren}`}
                  team={team}
                  type="frituren"
                  viewMode="analyses"
                />
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          <TabsContent value="interviews">
            <Tabs defaultValue="transcripts" onValueChange={(value) => handleViewModeChange(value as 'transcripts' | 'analyses')}>
              <TabsList className="mb-4">
                <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
                <TabsTrigger value="analyses">Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transcripts">
                <AnalysisResults 
                  key={`interviews-transcripts-${refreshInterviews}`}
                  team={team}
                  type="interviews"
                  viewMode="transcripts"
                />
              </TabsContent>
              
              <TabsContent value="analyses">
                <AnalysisResults 
                  key={`interviews-analyses-${refreshInterviews}`}
                  team={team}
                  type="interviews"
                  viewMode="analyses"
                />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="buyer">
            <Tabs defaultValue="transcripts" onValueChange={(value) => handleViewModeChange(value as 'transcripts' | 'analyses')}>
              <TabsList className="mb-4">
                <TabsTrigger value="transcripts">Transcripts</TabsTrigger>
                <TabsTrigger value="analyses">Analysis</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transcripts">
                <AnalysisResults 
                  key={`buyer-transcripts-${refreshBuyer}`}
                  team={team}
                  type="buyer"
                  viewMode="transcripts"
                />
              </TabsContent>
              
              <TabsContent value="analyses">
                <AnalysisResults 
                  key={`buyer-analyses-${refreshBuyer}`}
                  team={team}
                  type="buyer"
                  viewMode="analyses"
                />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalysisResultsCard;
