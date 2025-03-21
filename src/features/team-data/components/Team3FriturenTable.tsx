
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Frituur } from "../types";

interface FriturenTableProps {
  frituren: Frituur[];
}

const Team3FriturenTable = ({ frituren }: FriturenTableProps) => {
  if (!frituren || frituren.length === 0) {
    return <div className="text-center p-6">No frituren data available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Team 3 Frituren Data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Bestseller 1</TableHead>
            <TableHead>Bestseller 2</TableHead>
            <TableHead>Bestseller 3</TableHead>
            <TableHead>Trends</TableHead>
            <TableHead>Groothandel</TableHead>
            <TableHead>Aankoopprijs</TableHead>
            <TableHead>Marges</TableHead>
            <TableHead>Bereidheid Aanbieden</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {frituren.map((frituur) => (
            <TableRow key={frituur.id}>
              <TableCell className="font-medium">{frituur.bestseller_1}</TableCell>
              <TableCell>{frituur.bestseller_2 || 'N/A'}</TableCell>
              <TableCell>{frituur.bestseller_3 || 'N/A'}</TableCell>
              <TableCell>{frituur.trends_1 || 'N/A'}</TableCell>
              <TableCell>{frituur.groothandel || 'N/A'}</TableCell>
              <TableCell>{frituur.aankoopprijs || 'N/A'}</TableCell>
              <TableCell>{frituur.gemiddlede_marges || 'N/A'}%</TableCell>
              <TableCell>{frituur.bereidheid_aanbieden || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Team3FriturenTable;
