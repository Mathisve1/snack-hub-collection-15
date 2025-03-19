import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StreetInterview } from "../../types";
import { 
  processStreetInterviewsData, 
  getMostCommon, 
  calculateBooleanPercentage, 
  formatBreakdown,
  calculateAverageResponse,
  calculateAverageFromRecord
} from "./StreetInterviewsDataUtils";
import { 
  MessageSquare, 
  Store, 
  Lightbulb, 
  Utensils, 
  DollarSign, 
  Package, 
  Sparkles, 
  Clock, 
  Tag, 
  Droplet,
  BarChart
} from "lucide-react";

type StreetInterviewsSummaryProps = {
  data: StreetInterview[];
};

const StreetInterviewsSummary = ({ data }: StreetInterviewsSummaryProps) => {
  const processedData = processStreetInterviewsData(data);
  
  const eersteReactieInfo = getMostCommon(processedData.eerste_reacties);
  const verkoopskanalenInfo = getMostCommon(processedData.verkoopskanalen);
  const motivatieInfo = getMostCommon(processedData.motivatie_frituur);
  const populaireSnackInfo = getMostCommon(processedData.populaire_snacks);
  const eiwitgehalteInfo = getMostCommon(processedData.eiwitgehalte);
  const prijsInfo = getMostCommon(processedData.prijzen);
  const smaakvoorkeurenInfo = getMostCommon(processedData.smaakvoorkeuren);
  const coatingInfo = getMostCommon(processedData.coating);
  const bereidingsvoorkeurInfo = getMostCommon(processedData.bereidingsvoorkeur);
  const belangKrokantheidInfo = getMostCommon(processedData.belang_krokantheid);
  const aankoopbarriereInfo = getMostCommon(processedData.aankoopbarrieres);
  const frequentieInfo = getMostCommon(processedData.frituurbezoek_frequentie);
  
  const innovatieRuimtePercentage = calculateBooleanPercentage(processedData.innovatie_ruimte);
  const hogerePrijsPercentage = calculateBooleanPercentage(processedData.hogere_prijs_bereidheid);
  const vervangenTraditionalPercentage = calculateBooleanPercentage(processedData.vervangen_traditionele_snack);
  
  const gemiddeldePositiefResponse = calculateAverageResponse(data);
  
  const gemiddeldeEiwitgehalte = calculateAverageFromRecord(processedData.eiwitgehalte);
  const gemiddeldePrijs = calculateAverageFromRecord(processedData.prijzen);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-blue-500" />
            Eerste Reactie & Verkoopskanalen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Meest voorkomende eerste reactie:</p>
              <p>{eersteReactieInfo.value} ({eersteReactieInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.eerste_reacties)}</p>
            </div>
            <div>
              <p className="font-semibold">Populairste verkoopskanalen:</p>
              <p>{verkoopskanalenInfo.value} ({verkoopskanalenInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.verkoopskanalen)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Store className="h-5 w-5 mr-2 text-orange-500" />
            Motivatie & Populaire Snacks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Meest voorkomende motivatie frituur:</p>
              <p>{motivatieInfo.value} ({motivatieInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.motivatie_frituur)}</p>
            </div>
            <div>
              <p className="font-semibold">Populairste snacks:</p>
              <p>{populaireSnackInfo.value} ({populaireSnackInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.populaire_snacks)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-500" />
            Eiwitgehalte & Prijs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Gewenst eiwitgehalte:</p>
              <p>{eiwitgehalteInfo.value} ({eiwitgehalteInfo.percentage}%)</p>
              <p className="text-sm text-muted-foreground mt-1">Gemiddeld: {gemiddeldeEiwitgehalte}%</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.eiwitgehalte)}</p>
            </div>
            <div>
              <p className="font-semibold">Prijsindicatie:</p>
              <p>{prijsInfo.value} ({prijsInfo.percentage}%)</p>
              <p className="text-sm text-muted-foreground mt-1">Gemiddeld: €{gemiddeldePrijs}</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.prijzen)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Utensils className="h-5 w-5 mr-2 text-purple-500" />
            Smaak & Coating
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Smaakvoorkeuren:</p>
              <p>{smaakvoorkeurenInfo.value} ({smaakvoorkeurenInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.smaakvoorkeuren)}</p>
            </div>
            <div>
              <p className="font-semibold">Coating voorkeur:</p>
              <p>{coatingInfo.value} ({coatingInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.coating)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Package className="h-5 w-5 mr-2 text-red-500" />
            Bereiding & Krokantheid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Bereidingsvoorkeur:</p>
              <p>{bereidingsvoorkeurInfo.value} ({bereidingsvoorkeurInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.bereidingsvoorkeur)}</p>
            </div>
            <div>
              <p className="font-semibold">Belang van krokantheid:</p>
              <p>{belangKrokantheidInfo.value} ({belangKrokantheidInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.belang_krokantheid)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Clock className="h-5 w-5 mr-2 text-pink-500" />
            Aankoopbarrière & Bezoekfrequentie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Belangrijkste aankoopbarrière:</p>
              <p>{aankoopbarriereInfo.value} ({aankoopbarriereInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.aankoopbarrieres)}</p>
            </div>
            <div>
              <p className="font-semibold">Frituurbezoek frequentie:</p>
              <p>{frequentieInfo.value} ({frequentieInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.frituurbezoek_frequentie)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-indigo-500" />
            Gemiddelde responswaarden
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Gemiddelde positieve respons:</p>
              <p>{gemiddeldePositiefResponse}</p>
              <p className="text-sm text-gray-600 mt-1">
                Berekend op basis van innovatie openheid, hogere prijs bereidheid, en bereidheid traditionele snacks te vervangen
              </p>
            </div>
            <div className="mt-4">
              <p className="font-semibold">Gemiddeld gewenst eiwitgehalte:</p>
              <p>{gemiddeldeEiwitgehalte}%</p>
            </div>
            <div className="mt-4">
              <p className="font-semibold">Gemiddelde prijsindicatie:</p>
              <p>€{gemiddeldePrijs}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
            Bereidheid voor Innovatie & Hogere Prijs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="font-semibold">Ruimte voor innovatie:</p>
              <p>{innovatieRuimtePercentage} van respondenten</p>
            </div>
            <div>
              <p className="font-semibold">Bereidheid hogere prijs:</p>
              <p>{hogerePrijsPercentage} van respondenten</p>
            </div>
            <div>
              <p className="font-semibold">Vervangen traditionele snack:</p>
              <p>{vervangenTraditionalPercentage} van respondenten</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreetInterviewsSummary;
