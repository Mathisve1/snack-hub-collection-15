
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnalysisResults from "../AnalysisResults";

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
            <AnalysisResults 
              key={`frituren-${refreshFrituren}`}
              team={team}
              type="frituren"
            />
          </TabsContent>
          
          <TabsContent value="interviews">
            <AnalysisResults 
              key={`interviews-${refreshInterviews}`}
              team={team}
              type="interviews"
            />
          </TabsContent>

          <TabsContent value="buyer">
            <AnalysisResults 
              key={`buyer-${refreshBuyer}`}
              team={team}
              type="buyer"
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalysisResultsCard;
