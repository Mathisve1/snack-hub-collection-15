
import { useParams } from "react-router-dom";
import BuyingPersonasTable from "./components/BuyingPersonasTable";
import FriturenTable from "./components/FriturenTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTeam38StreetInterviews } from "./hooks/useTeam38Data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2, XCircle } from "lucide-react";

const StreetInterviewsTable = () => {
  const { data: interviews, loading, error } = useTeam38StreetInterviews();

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Team 38 Street Interviews</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Team 38 Street Interviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-500">Error loading data: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Team 38 Street Interviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Eerste Reactie</TableHead>
                <TableHead>Populaire Snack 1</TableHead>
                <TableHead>Populaire Snack 2</TableHead>
                <TableHead>Prijs</TableHead>
                <TableHead>Smaakvoorkeuren</TableHead>
                <TableHead>Hogere Prijs</TableHead>
                <TableHead>Marketing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No street interviews data available
                  </TableCell>
                </TableRow>
              ) : (
                interviews.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell>{interview.eerste_reactie || "-"}</TableCell>
                    <TableCell>{interview.populaire_snack_1 || "-"}</TableCell>
                    <TableCell>{interview.populaire_snack_2 || "-"}</TableCell>
                    <TableCell>{interview.prijs || "-"}</TableCell>
                    <TableCell>{interview.smaakvoorkeuren || "-"}</TableCell>
                    <TableCell>
                      {interview.hogere_prijs ? 
                        <CheckCircle className="h-5 w-5 text-green-500" /> : 
                        <XCircle className="h-5 w-5 text-red-500" />}
                    </TableCell>
                    <TableCell>{interview.marketing_1 || "-"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export const Team38DataContainer = () => {
  const { teamId } = useParams();
  
  // Check if the current team is team 38
  if (teamId !== "OV-38") {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Access Restricted</h2>
        <p>This data is only available for Team 38.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Team 38 Data Tables</h1>
      
      <Tabs defaultValue="buyingPersonas" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="buyingPersonas">Buying Personas</TabsTrigger>
          <TabsTrigger value="frituren">Frituren</TabsTrigger>
          <TabsTrigger value="streetInterviews">Street Interviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buyingPersonas">
          <BuyingPersonasTable />
        </TabsContent>
        
        <TabsContent value="frituren">
          <FriturenTable />
        </TabsContent>
        
        <TabsContent value="streetInterviews">
          <StreetInterviewsTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Team38DataContainer;
