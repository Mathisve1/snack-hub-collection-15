
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BuyingPersona } from "../types";

interface BuyingPersonasTableProps {
  personas: BuyingPersona[];
}

const Team3BuyingPersonasTable = ({ personas }: BuyingPersonasTableProps) => {
  if (!personas || personas.length === 0) {
    return <div className="text-center p-6">No buying personas data available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Team 3 Buying Personas Data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Persona</TableHead>
            <TableHead>Geslacht</TableHead>
            <TableHead>Leeftijd</TableHead>
            <TableHead>Prijs</TableHead>
            <TableHead>Consumptie Situatie</TableHead>
            <TableHead>Frituurbezoek</TableHead>
            <TableHead>Motivatie</TableHead>
            <TableHead>Marketing</TableHead>
            <TableHead>Open voor Nieuwe Snack</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {personas.map((persona) => (
            <TableRow key={persona.id}>
              <TableCell className="font-medium">{persona.buying_persona}</TableCell>
              <TableCell>{persona.geslacht || 'N/A'}</TableCell>
              <TableCell>{persona.leeftijd || 'N/A'}</TableCell>
              <TableCell>{persona.prijs || 'N/A'}</TableCell>
              <TableCell>{persona.consumptie_situatie || 'N/A'}</TableCell>
              <TableCell>{persona.frequentie_frituurbezoek || 'N/A'}</TableCell>
              <TableCell>{persona.motivatie_kiezen_proteine_snack || 'N/A'}</TableCell>
              <TableCell>{persona.marketing || 'N/A'}</TableCell>
              <TableCell>{persona.openheid_nieuwe_snack ? 'Ja' : 'Nee'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Team3BuyingPersonasTable;
