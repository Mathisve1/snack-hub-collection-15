
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Frituur } from "../../types";
import { processFriturenData, getMostCommon, calculateAverage, formatBreakdown } from "./FriturenDataUtils";
import { TrendingUp, ShoppingCart, Truck, Percent, Star, Target, Megaphone } from "lucide-react";
type FriturenSummaryProps = {
  data: Frituur[];
};
const FriturenSummary = ({
  data
}: FriturenSummaryProps) => {
  const processedData = processFriturenData(data);
  const bestsellerInfo = getMostCommon(processedData.bestsellers);
  const trendInfo = getMostCommon(processedData.trends);
  const groothandelInfo = getMostCommon(processedData.groothandel);
  const extraGroothandelInfo = getMostCommon(processedData.extra_groothandel);
  const belangrijkeFactorInfo = getMostCommon(processedData.belangrijke_factoren);
  const marketingInfo = getMostCommon(processedData.marketing);
  const bereidheidInfo = getMostCommon(processedData.bereidheid_aanbieden);
  const waaromNietInfo = getMostCommon(processedData.waarom_niet_verkopen);
  const gemiddeldeMargesAvg = calculateAverage(processedData.gemiddelde_marges);
  const absoluteMargesAvg = calculateAverage(processedData.absolute_marges);
  const aankoopprijsAvg = calculateAverage(processedData.aankoopprijs);
  const aankoopprijsProteineAvg = calculateAverage(processedData.aankoopprijs_proteine_snacks);
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {/* Bestsellers Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-blue-500" />
            Bestsellers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="font-semibold">Meest populair:</p>
              <p>{bestsellerInfo.value} ({bestsellerInfo.percentage}%)</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Alle bestsellers:</p>
              <p className="text-sm text-gray-600">{formatBreakdown(processedData.bestsellers)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trends Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="font-semibold">Belangrijkste trend:</p>
              <p>{trendInfo.value} ({trendInfo.percentage}%)</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Alle trends:</p>
              <p className="text-sm text-gray-600">{formatBreakdown(processedData.trends)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Groothandel Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Truck className="h-5 w-5 mr-2 text-orange-500" />
            Groothandel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="font-semibold">Meest voorkomende groothandel:</p>
              <p>{groothandelInfo.value} ({groothandelInfo.percentage}%)</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Alle groothandels:</p>
              <p className="text-sm text-gray-600">{formatBreakdown(processedData.groothandel)}</p>
            </div>
            <div className="mt-4">
              <p className="font-semibold">Extra groothandel:</p>
              <p className="text-sm text-gray-600">{formatBreakdown(processedData.extra_groothandel)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prijzen Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Percent className="h-5 w-5 mr-2 text-purple-500" />
            Marges & Prijzen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="font-semibold">Gemiddelde marges:</p>
              <p>{gemiddeldeMargesAvg}%</p>
            </div>
            <div>
              <p className="font-semibold">Absolute marges:</p>
              <p>{absoluteMargesAvg}€</p>
            </div>
            <div>
              <p className="font-semibold">Gemiddelde aankoopprijs:</p>
              <p>{aankoopprijsAvg}€</p>
            </div>
            <div>
              <p className="font-semibold">Gemiddelde aankoopprijs proteïne snacks:</p>
              <p>{aankoopprijsProteineAvg}€</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Belangrijke Factoren Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Belangrijke Factoren
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="font-semibold">Meest belangrijke factor:</p>
              <p>{belangrijkeFactorInfo.value} ({belangrijkeFactorInfo.percentage}%)</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Alle belangrijke factoren:</p>
              <p className="text-sm text-gray-600">{formatBreakdown(processedData.belangrijke_factoren)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marketing Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Megaphone className="h-5 w-5 mr-2 text-pink-500" />
            Marketing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="font-semibold">Meest effectieve marketing:</p>
              <p>{marketingInfo.value} ({marketingInfo.percentage}%)</p>
            </div>
            <div>
              <p className="font-semibold text-sm">Alle marketing strategieën:</p>
              <p className="text-sm text-gray-600">{formatBreakdown(processedData.marketing)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bereidheid & Bezwaren Card */}
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Target className="h-5 w-5 mr-2 text-indigo-500" />
            Bereidheid & Bezwaren
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Bereidheid om aan te bieden:</p>
              <p>{bereidheidInfo.value} ({bereidheidInfo.percentage}%)</p>
              <p className="font-semibold text-sm mt-2">Details:</p>
              <p className="text-sm text-gray-600">{formatBreakdown(processedData.bereidheid_aanbieden)}</p>
            </div>
            <div>
              <p className="font-semibold">Redenen om de proteine snack niet te kopen:</p>
              <p>{waaromNietInfo.value} ({waaromNietInfo.percentage}%)</p>
              <p className="font-semibold text-sm mt-2">Details:</p>
              <p className="text-sm text-gray-600">{formatBreakdown(processedData.waarom_niet_verkopen)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default FriturenSummary;
