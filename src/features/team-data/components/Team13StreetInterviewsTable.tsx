
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTeam13StreetInterviews } from "../hooks/useTeam13Data";
import { Loader2 } from "lucide-react";
import { StreetInterview } from "../types";
import Team13StreetInterviewsSummary from "./Team13StreetInterviewsSummary";

interface Team13StreetInterviewsTableProps {
  interviews?: StreetInterview[];
}

const Team13StreetInterviewsTable = ({ interviews }: Team13StreetInterviewsTableProps) => {
  const [showSummary, setShowSummary] = useState(true);
  
  // Use the hook if no data is provided directly
  const team13Data = useTeam13StreetInterviews();
  
  // Use passed data if available, otherwise use the data from hooks
  const data = interviews || team13Data.data;
  const loading = !interviews && team13Data.loading;
  const error = !interviews && team13Data.error;
  
  console.log("Team13StreetInterviewsTable using data:", { 
    dataSource: interviews ? "passed directly" : "team13 hook",
    dataLength: data?.length || 0,
    isLoading: loading,
    firstRecord: data && data.length > 0 ? data[0] : null
  });

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

  // Use the Summary view by default
  return (
    <div>
      <div className="flex justify-end mb-4">
        <div className="bg-gray-100 rounded-md p-1 inline-flex">
          <button
            className={`px-3 py-1 rounded-md text-sm ${showSummary ? 'bg-white shadow' : ''}`}
            onClick={() => setShowSummary(true)}
          >
            Summary View
          </button>
          <button
            className={`px-3 py-1 rounded-md text-sm ${!showSummary ? 'bg-white shadow' : ''}`}
            onClick={() => setShowSummary(false)}
          >
            Table View
          </button>
        </div>
      </div>
      
      {showSummary ? (
        <Team13StreetInterviewsSummary />
      ) : (
        <div className="rounded-md border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold">Eerste Reactie</TableHead>
                  <TableHead className="font-semibold">Verkoopskanalen</TableHead>
                  <TableHead className="font-semibold">Motivatie Frituur</TableHead>
                  <TableHead className="font-semibold">Populaire Snack 1</TableHead>
                  <TableHead className="font-semibold">Populaire Snack 2</TableHead>
                  <TableHead className="font-semibold">Eiwitgehalte</TableHead>
                  <TableHead className="font-semibold">Prijs</TableHead>
                  <TableHead className="font-semibold">Branding</TableHead>
                  <TableHead className="font-semibold">Marketing 1</TableHead>
                  <TableHead className="font-semibold">Marketing 2</TableHead>
                  <TableHead className="font-semibold">Smaakvoorkeuren</TableHead>
                  <TableHead className="font-semibold">Coating</TableHead>
                  <TableHead className="font-semibold">Krokantheid</TableHead>
                  <TableHead className="font-semibold">Bereiding</TableHead>
                  <TableHead className="font-semibold">Innovatie</TableHead>
                  <TableHead className="font-semibold">Hogere Prijs</TableHead>
                  <TableHead className="font-semibold">Vervangen Traditioneel</TableHead>
                  <TableHead className="font-semibold">Frituurbezoek</TableHead>
                  <TableHead className="font-semibold">Prijs Factoren</TableHead>
                  <TableHead className="font-semibold">Aankoopbarrières</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((interview) => (
                  <TableRow key={interview.id}>
                    <TableCell>{interview.eerste_reactie || '—'}</TableCell>
                    <TableCell>{interview.verkoopskanalen || '—'}</TableCell>
                    <TableCell>{interview.motivatie_frituur || '—'}</TableCell>
                    <TableCell>{interview.populaire_snack_1 || '—'}</TableCell>
                    <TableCell>{interview.populaire_snack_2 || '—'}</TableCell>
                    <TableCell>{interview.eiwitgehalte || '—'}</TableCell>
                    <TableCell>{interview.prijs || '—'}</TableCell>
                    <TableCell>{interview.branding || '—'}</TableCell>
                    <TableCell>{interview.marketing_1 || '—'}</TableCell>
                    <TableCell>{interview.marketing_2 || '—'}</TableCell>
                    <TableCell>{interview.smaakvoorkeuren || '—'}</TableCell>
                    <TableCell>{interview.welke_coating || '—'}</TableCell>
                    <TableCell>{interview.belang_van_krokantheid || '—'}</TableCell>
                    <TableCell>{interview.bereidingsvoorkeur || '—'}</TableCell>
                    <TableCell>{interview.ruimte_voor_innovatie ? 'Ja' : 'Nee'}</TableCell>
                    <TableCell>{interview.hogere_prijs ? 'Ja' : 'Nee'}</TableCell>
                    <TableCell>{interview.vervangen_traditionele_snack ? 'Ja' : 'Nee'}</TableCell>
                    <TableCell>{interview.frituurbezoek_frequentie || '—'}</TableCell>
                    <TableCell>{interview.hogere_prijs_factoren || '—'}</TableCell>
                    <TableCell>{interview.belangrijkst_aankoopbariere || '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team13StreetInterviewsTable;
