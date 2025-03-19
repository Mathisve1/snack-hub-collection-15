
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useStreetInterviews } from "../hooks/useTeam38Data";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export const StreetInterviewsTable = () => {
  const { data: interviews, loading, error } = useStreetInterviews();

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
                <TableHead>Eerste reactie</TableHead>
                <TableHead>Populaire snacks</TableHead>
                <TableHead>Smaakvoorkeuren</TableHead>
                <TableHead>Prijs</TableHead>
                <TableHead>Frituurbezoek frequentie</TableHead>
                <TableHead>Innovatie ruimte</TableHead>
                <TableHead>Hogere prijs</TableHead>
                <TableHead>Vervangen traditionele snack</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interviews.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No street interview data available
                  </TableCell>
                </TableRow>
              ) : (
                interviews.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell className="max-w-xs">{interview.eerste_reactie || "-"}</TableCell>
                    <TableCell>
                      {interview.populaire_snack_1 && <div>{interview.populaire_snack_1}</div>}
                      {interview.populaire_snack_2 && <div className="mt-1">{interview.populaire_snack_2}</div>}
                    </TableCell>
                    <TableCell>{interview.smaakvoorkeuren || "-"}</TableCell>
                    <TableCell>{interview.prijs || "-"}</TableCell>
                    <TableCell>{interview.frituurbezoek_frequentie || "-"}</TableCell>
                    <TableCell>
                      {interview.ruimte_voor_innovatie !== undefined ? 
                        interview.ruimte_voor_innovatie ? 
                          <CheckCircle className="h-5 w-5 text-green-500" /> : 
                          <XCircle className="h-5 w-5 text-red-500" />
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {interview.hogere_prijs !== undefined ? 
                        interview.hogere_prijs ? 
                          <CheckCircle className="h-5 w-5 text-green-500" /> : 
                          <XCircle className="h-5 w-5 text-red-500" />
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {interview.vervangen_traditionele_snack !== undefined ? 
                        interview.vervangen_traditionele_snack ? 
                          <CheckCircle className="h-5 w-5 text-green-500" /> : 
                          <XCircle className="h-5 w-5 text-red-500" />
                        : "-"}
                    </TableCell>
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

export default StreetInterviewsTable;
