
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StreetInterview } from "../../types";
import { 
  processStreetInterviewsData,
  getMostCommon,
  calculateBooleanPercentage,
  formatBreakdown
} from "./StreetInterviewsDataUtils";
import { 
  ThumbsUp, 
  ShoppingBag, 
  Store, 
  Utensils, 
  Dumbbell, 
  PiggyBank, 
  Palette, 
  Megaphone, 
  Coffee, 
  Cookie, 
  Flame, 
  ArrowUpRight, 
  BarChart,
  Clock
} from "lucide-react";

type StreetInterviewsSummaryProps = {
  data: StreetInterview[];
};

const StreetInterviewsSummary = ({ data }: StreetInterviewsSummaryProps) => {
  const processedData = processStreetInterviewsData(data);
  
  const eersteReactieInfo = getMostCommon(processedData.eerste_reacties);
  const verkoopskanalenInfo = getMostCommon(processedData.verkoopskanalen);
  const motivatieFrituurInfo = getMostCommon(processedData.motivatie_frituur);
  const populaireSnacksInfo = getMostCommon(processedData.populaire_snacks);
  const eiwitgehalteInfo = getMostCommon(processedData.eiwitgehalte);
  const prijsInfo = getMostCommon(processedData.prijzen);
  const brandingInfo = getMostCommon(processedData.branding);
  const marketingInfo = getMostCommon(processedData.marketing);
  const smaakvoorkeurenInfo = getMostCommon(processedData.smaakvoorkeuren);
  const coatingInfo = getMostCommon(processedData.coating);
  const bereidingsvoorkeurInfo = getMostCommon(processedData.bereidingsvoorkeur);
  const hogerePrijsFactorenInfo = getMostCommon(processedData.hogere_prijs_factoren);
  const aankoopbarrieresInfo = getMostCommon(processedData.aankoopbarrieres);
  const frituurbezoekFrequentieInfo = getMostCommon(processedData.frituurbezoek_frequentie);
  const belangKrokantheidInfo = getMostCommon(processedData.belang_krokantheid);
  
  const innovatieRuimtePercentage = calculateBooleanPercentage(processedData.innovatie_ruimte);
  const hogerePrijsBereidheidPercentage = calculateBooleanPercentage(processedData.hogere_prijs_bereidheid);
  const vervangenTraditioneleSnackPercentage = calculateBooleanPercentage(processedData.vervangen_traditionele_snack);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Eerste Reacties Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ThumbsUp className="h-5 w-5 mr-2 text-blue-500" />
            Eerste Reacties
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="font-semibold">Meest voorkomende reactie:</p>
              <p>{eersteReactieInfo.value} ({eersteReactieInfo.percentage}%)</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Alle reacties:</p>
              <p className="text-sm text-gray-600">{formatBreakdown(processedData.eerste_reacties)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verkoopskanalen Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2 text-green-500" />
            Verkoopskanalen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="font-semibold">Meest genoemde verkoopskanaal:</p>
              <p>{verkoopskanalenInfo.value} ({verkoopskanalenInfo.percentage}%)</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Alle verkoopskanalen:</p>
              <p className="text-sm text-gray-600">{formatBreakdown(processedData.verkoopskanalen)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivatie Frituur Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Store className="h-5 w-5 mr-2 text-purple-500" />
            Motivatie Frituur
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="font-semibold">Belangrijkste motivatie:</p>
              <p>{motivatieFrituurInfo.value} ({motivatieFrituurInfo.percentage}%)</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Alle motivaties:</p>
              <p className="text-sm text-gray-600">{formatBreakdown(processedData.motivatie_frituur)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Populaire Snacks Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Utensils className="h-5 w-5 mr-2 text-orange-500" />
            Populaire Snacks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="font-semibold">Meest populaire snack:</p>
              <p>{populaireSnacksInfo.value} ({populaireSnacksInfo.percentage}%)</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Alle populaire snacks:</p>
              <p className="text-sm text-gray-600">{formatBreakdown(processedData.populaire_snacks)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Eiwitgehalte & Prijs Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Dumbbell className="h-5 w-5 mr-2 text-red-500" />
            Eiwitgehalte & Prijs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Voorkeur eiwitgehalte:</p>
              <p>{eiwitgehalteInfo.value} ({eiwitgehalteInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.eiwitgehalte)}</p>
            </div>
            <div>
              <p className="font-semibold">Prijsperceptie:</p>
              <p>{prijsInfo.value} ({prijsInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.prijzen)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Branding & Marketing Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Megaphone className="h-5 w-5 mr-2 text-pink-500" />
            Branding & Marketing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Branding voorkeur:</p>
              <p>{brandingInfo.value} ({brandingInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.branding)}</p>
            </div>
            <div>
              <p className="font-semibold">Effectieve marketing:</p>
              <p>{marketingInfo.value} ({marketingInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.marketing)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smaak & Coating Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Coffee className="h-5 w-5 mr-2 text-yellow-600" />
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

      {/* Bereidingsvoorkeur & Krokantheid Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Flame className="h-5 w-5 mr-2 text-amber-500" />
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

      {/* Prijsgevoeligheid Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <PiggyBank className="h-5 w-5 mr-2 text-green-600" />
            Prijsgevoeligheid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Bereidheid hogere prijs te betalen:</p>
              <p>{hogerePrijsBereidheidPercentage} zegt ja</p>
            </div>
            <div>
              <p className="font-semibold">Belangrijkste factoren voor hogere prijs:</p>
              <p>{hogerePrijsFactorenInfo.value} ({hogerePrijsFactorenInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.hogere_prijs_factoren)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Barrières & Frequentie Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Clock className="h-5 w-5 mr-2 text-indigo-500" />
            Barrières & Frequentie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Belangrijkste aankoopbarrière:</p>
              <p>{aankoopbarrieresInfo.value} ({aankoopbarrieresInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.aankoopbarrieres)}</p>
            </div>
            <div>
              <p className="font-semibold">Frituurbezoek frequentie:</p>
              <p>{frituurbezoekFrequentieInfo.value} ({frituurbezoekFrequentieInfo.percentage}%)</p>
              <p className="text-sm text-gray-600 mt-1">{formatBreakdown(processedData.frituurbezoek_frequentie)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Innovatie & Vervanging Card */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-blue-600" />
            Innovatie & Bereidheid tot Verandering
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="font-semibold">Ruimte voor innovatie:</p>
              <p className="text-2xl font-bold">{innovatieRuimtePercentage}</p>
              <p className="text-sm text-gray-600">Percentage dat vindt dat er ruimte is voor innovatie</p>
            </div>
            <div>
              <p className="font-semibold">Bereidheid hogere prijs te betalen:</p>
              <p className="text-2xl font-bold">{hogerePrijsBereidheidPercentage}</p>
              <p className="text-sm text-gray-600">Percentage dat bereid is meer te betalen</p>
            </div>
            <div>
              <p className="font-semibold">Bereidheid traditionele snack te vervangen:</p>
              <p className="text-2xl font-bold">{vervangenTraditioneleSnackPercentage}</p>
              <p className="text-sm text-gray-600">Percentage dat bereid is traditionele snack te vervangen</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreetInterviewsSummary;
