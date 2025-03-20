
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeam13StreetInterviews } from "../hooks/useTeam13Data";
import { Loader2, LayoutGrid, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import StreetInterviewsSummary from "./street-interviews/StreetInterviewsSummary";
import { StreetInterview } from "../types";

interface Team13StreetInterviewsTableProps {
  interviews?: StreetInterview[];
}

const Team13StreetInterviewsTable = ({ interviews }: Team13StreetInterviewsTableProps) => {
  // Use the team13 hook
  const team13Data = useTeam13StreetInterviews();
  
  // Use passed interviews if available, otherwise use the data from hooks
  const data = interviews || team13Data.data;
  const loading = !interviews && team13Data.loading;
  const error = !interviews && team13Data.error;
  
  // Log the data we're actually using
  console.log("Team13StreetInterviewsTable using data:", { 
    dataSource: interviews ? "passed directly" : "team13 hook",
    dataLength: data?.length || 0,
    isLoading: loading,
    hasError: !!error,
    data: data
  });
  
  const [viewMode, setViewMode] = useState<"summary" | "table">("summary");

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading street interviews data: {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No street interviews data available.
      </div>
    );
  }

  // Get all unique column keys excluding 'id'
  const columnKeys = Object.keys(data[0]).filter(key => key !== 'id');
  
  // Create a readable label for each column
  const getColumnLabel = (key: string): string => {
    const labelMap: Record<string, string> = {
      frituurbezoek_frequentie: "Frituurbezoek Frequentie",
      motivatie_frituur: "Motivatie Frituur",
      populaire_snack_1: "Populaire Snack 1",
      populaire_snack_2: "Populaire Snack 2",
      ruimte_voor_innovatie: "Ruimte Voor Innovatie",
      eiwitgehalte: "Eiwitgehalte",
      prijs: "Prijs",
      hogere_prijs: "Hogere Prijs",
      vervangen_traditionele_snack: "Vervangen Traditionele Snack",
      branding: "Branding",
      marketing_1: "Marketing 1",
      marketing_2: "Marketing 2",
      smaakvoorkeuren: "Smaakvoorkeuren",
      welke_coating: "Welke Coating",
      belang_van_krokantheid: "Belang Van Krokantheid",
      bereidingsvoorkeur: "Bereidingsvoorkeur",
      hogere_prijs_factoren: "Hogere Prijs Factoren",
      verkoopskanalen: "Verkoopskanalen",
      eerste_reactie: "Eerste Reactie",
      belangrijkst_aankoopbariere: "Belangrijkst Aankoopbarrière"
    };
    
    return labelMap[key] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };
  
  // Format cell values for display
  const formatCellValue = (value: any): string => {
    if (value === null || value === undefined) return '—';
    if (typeof value === 'boolean') return value ? 'Ja' : 'Nee';
    if (typeof value === 'number') {
      // Check if it might be a price
      if (columnKeys.includes('prijs') && value > 0 && value < 100) {
        return `€${value.toFixed(2)}`;
      }
      return value.toString();
    }
    return value;
  };
  
  return (
    <>
      <div className="flex justify-end mb-4">
        <div className="bg-gray-100 rounded-md p-1 inline-flex">
          <Button
            variant={viewMode === "summary" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("summary")}
            className="rounded-md"
          >
            <LayoutGrid className="h-4 w-4 mr-1" />
            Samenvatting
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("table")}
            className="rounded-md"
          >
            <TableIcon className="h-4 w-4 mr-1" />
            Tabel
          </Button>
        </div>
      </div>

      {viewMode === "summary" ? (
        <StreetInterviewsSummary data={data} />
      ) : (
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {columnKeys.map((key) => (
                    <TableHead key={key} className="font-semibold">
                      {getColumnLabel(key)}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((interview) => (
                  <TableRow key={interview.id}>
                    {columnKeys.map((key) => (
                      <TableCell key={`${interview.id}-${key}`}>
                        {formatCellValue(interview[key])}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default Team13StreetInterviewsTable;
