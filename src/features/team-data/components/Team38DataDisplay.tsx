
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTeam38BuyingPersonas, useTeam38Frituren, useTeam38StreetInterviews } from "../hooks/useTeam38Data";
import { Loader2 } from "lucide-react";

export const Team38DataDisplay = () => {
  const { data: buyingPersonas, loading: loadingPersonas, error: personasError } = useTeam38BuyingPersonas();
  const { data: frituren, loading: loadingFrituren, error: friturenError } = useTeam38Frituren();
  const { data: streetInterviews, loading: loadingInterviews, error: interviewsError } = useTeam38StreetInterviews();

  const renderLoading = () => (
    <div className="flex justify-center items-center p-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Loading data...</span>
    </div>
  );

  const renderError = (message: string) => (
    <div className="text-red-500 p-4 text-center">
      Error loading data: {message}
    </div>
  );

  const renderBuyingPersonasTable = () => {
    if (loadingPersonas) return renderLoading();
    if (personasError) return renderError(personasError);
    if (!buyingPersonas.length) return <div className="text-center p-4">No buying personas data available</div>;

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Team 38 Buying Personas</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Buying Persona</TableHead>
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
            {buyingPersonas.map((persona) => (
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

  const renderFriturenTable = () => {
    if (loadingFrituren) return renderLoading();
    if (friturenError) return renderError(friturenError);
    if (!frituren.length) return <div className="text-center p-4">No frituren data available</div>;

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Team 38 Frituren Data</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Bestseller 1</TableHead>
              <TableHead>Bestseller 2</TableHead>
              <TableHead>Bestseller 3</TableHead>
              <TableHead>Trends</TableHead>
              <TableHead>Groothandel</TableHead>
              <TableHead>Aankoopprijs</TableHead>
              <TableHead>Bereidheid Aanbieden</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {frituren.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.bestseller_1}</TableCell>
                <TableCell>{item.bestseller_2 || 'N/A'}</TableCell>
                <TableCell>{item.bestseller_3 || 'N/A'}</TableCell>
                <TableCell>{item.trends_1 || 'N/A'}</TableCell>
                <TableCell>{item.groothandel || 'N/A'}</TableCell>
                <TableCell>{item.aankoopprijs || 'N/A'}</TableCell>
                <TableCell>{item.bereidheid_aanbieden || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const renderStreetInterviewsTable = () => {
    if (loadingInterviews) return renderLoading();
    if (interviewsError) return renderError(interviewsError);
    if (!streetInterviews.length) return <div className="text-center p-4">No street interviews data available</div>;

    return (
      <div className="overflow-x-auto">
        <Table>
          <TableCaption>Team 38 Street Interviews</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Eerste Reactie</TableHead>
              <TableHead>Populaire Snack 1</TableHead>
              <TableHead>Populaire Snack 2</TableHead>
              <TableHead>Prijs</TableHead>
              <TableHead>Smaakvoorkeuren</TableHead>
              <TableHead>Marketing</TableHead>
              <TableHead>Hogere Prijs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {streetInterviews.map((interview) => (
              <TableRow key={interview.id}>
                <TableCell className="font-medium">{interview.eerste_reactie || 'N/A'}</TableCell>
                <TableCell>{interview.populaire_snack_1 || 'N/A'}</TableCell>
                <TableCell>{interview.populaire_snack_2 || 'N/A'}</TableCell>
                <TableCell>{interview.prijs || 'N/A'}</TableCell>
                <TableCell>{interview.smaakvoorkeuren || 'N/A'}</TableCell>
                <TableCell>{interview.marketing_1 || 'N/A'}</TableCell>
                <TableCell>{interview.hogere_prijs ? 'Ja' : 'Nee'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Team 38 Data</h1>
      
      <Tabs defaultValue="buyingPersonas" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-lg mb-4">
          <TabsTrigger value="buyingPersonas">Buying Personas</TabsTrigger>
          <TabsTrigger value="frituren">Frituren</TabsTrigger>
          <TabsTrigger value="streetInterviews">Street Interviews</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buyingPersonas">
          {renderBuyingPersonasTable()}
        </TabsContent>
        
        <TabsContent value="frituren">
          {renderFriturenTable()}
        </TabsContent>
        
        <TabsContent value="streetInterviews">
          {renderStreetInterviewsTable()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Team38DataDisplay;
