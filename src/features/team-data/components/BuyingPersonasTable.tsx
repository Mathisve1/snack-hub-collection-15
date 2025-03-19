
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeam38BuyingPersonas } from "../hooks/useTeam38Data";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export const BuyingPersonasTable = () => {
  const { data: personas, loading, error } = useTeam38BuyingPersonas();

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Team 38 Buying Personas</CardTitle>
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
          <CardTitle>Team 38 Buying Personas</CardTitle>
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
        <CardTitle>Team 38 Buying Personas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px]">Persona</TableHead>
                <TableHead>Leeftijd</TableHead>
                <TableHead>Geslacht</TableHead>
                <TableHead>Prijs</TableHead>
                <TableHead>Consumptie situatie</TableHead>
                <TableHead>Frituurbezoek</TableHead>
                <TableHead>Open voor nieuwe snack</TableHead>
                <TableHead>Motivatie</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {personas.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No buying personas data available
                  </TableCell>
                </TableRow>
              ) : (
                personas.map((persona) => (
                  <TableRow key={persona.id}>
                    <TableCell className="font-medium">{persona.buying_persona}</TableCell>
                    <TableCell>{persona.leeftijd || "-"}</TableCell>
                    <TableCell>{persona.geslacht || "-"}</TableCell>
                    <TableCell>{persona.prijs || "-"}</TableCell>
                    <TableCell>{persona.consumptie_situatie || "-"}</TableCell>
                    <TableCell>{persona.frequentie_frituurbezoek || "-"}</TableCell>
                    <TableCell>
                      {persona.openheid_nieuwe_snack ? 
                        <CheckCircle className="h-5 w-5 text-green-500" /> : 
                        <XCircle className="h-5 w-5 text-red-500" />}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{persona.motivatie_kiezen_proteine_snack || "-"}</TableCell>
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

export default BuyingPersonasTable;
