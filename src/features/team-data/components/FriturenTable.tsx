import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeam38Frituren } from "../hooks/useTeam38Data";
import { Loader2 } from "lucide-react";

export const FriturenTable = () => {
  const { data: frituren, loading, error } = useTeam38Frituren();

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Team 38 Frituren Information</CardTitle>
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
          <CardTitle>Team 38 Frituren Information</CardTitle>
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
        <CardTitle>Team 38 Frituren Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bestseller 1</TableHead>
                <TableHead>Bestseller 2</TableHead>
                <TableHead>Bestseller 3</TableHead>
                <TableHead>Trends</TableHead>
                <TableHead>Aankoopprijs</TableHead>
                <TableHead>Marges</TableHead>
                <TableHead>Bereidheid aanbieden</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {frituren.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    No frituren data available
                  </TableCell>
                </TableRow>
              ) : (
                frituren.map((frituur) => (
                  <TableRow key={frituur.id}>
                    <TableCell>{frituur.bestseller_1}</TableCell>
                    <TableCell>{frituur.bestseller_2 || "-"}</TableCell>
                    <TableCell>{frituur.bestseller_3 || "-"}</TableCell>
                    <TableCell>
                      {frituur.trends_1 && <div>{frituur.trends_1}</div>}
                      {frituur.trends_2 && <div className="mt-1">{frituur.trends_2}</div>}
                    </TableCell>
                    <TableCell>{frituur.aankoopprijs || "-"}</TableCell>
                    <TableCell>
                      {frituur.gemiddlede_marges && <div>Gem: {frituur.gemiddlede_marges}</div>}
                      {frituur.absolute_marges && <div className="mt-1">Abs: {frituur.absolute_marges}</div>}
                    </TableCell>
                    <TableCell>{frituur.bereidheid_aanbieden || "-"}</TableCell>
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

export default FriturenTable;
