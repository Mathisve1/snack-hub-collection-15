
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StreetInterview } from "../types";

interface StreetInterviewsTableProps {
  interviews: StreetInterview[];
}

const Team3StreetInterviewsTable = ({ interviews }: StreetInterviewsTableProps) => {
  if (!interviews || interviews.length === 0) {
    return <div className="text-center p-6">No street interviews data available</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>Team 3 Street Interviews Data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Eerste Reactie</TableHead>
            <TableHead>Motivatie</TableHead>
            <TableHead>Populaire Snack 1</TableHead>
            <TableHead>Populaire Snack 2</TableHead>
            <TableHead>Prijs</TableHead>
            <TableHead>Eiwitgehalte</TableHead>
            <TableHead>Smaakvoorkeuren</TableHead>
            <TableHead>Bereidingsvoorkeur</TableHead>
            <TableHead>Hogere Prijs</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interviews.map((interview) => (
            <TableRow key={interview.id}>
              <TableCell className="font-medium">{interview.eerste_reactie || 'N/A'}</TableCell>
              <TableCell>{interview.motivatie_frituur || 'N/A'}</TableCell>
              <TableCell>{interview.populaire_snack_1 || 'N/A'}</TableCell>
              <TableCell>{interview.populaire_snack_2 || 'N/A'}</TableCell>
              <TableCell>{interview.prijs || 'N/A'}</TableCell>
              <TableCell>{interview.eiwitgehalte || 'N/A'}</TableCell>
              <TableCell>{interview.smaakvoorkeuren || 'N/A'}</TableCell>
              <TableCell>{interview.bereidingsvoorkeur || 'N/A'}</TableCell>
              <TableCell>{interview.hogere_prijs ? 'Ja' : 'Nee'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Team3StreetInterviewsTable;
