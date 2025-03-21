
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StreetInterview } from "../../types";
import { 
  MessageSquare, 
  ThumbsUp, 
  DollarSign, 
  Utensils, 
  Clock,
  BarChart,
  Percent,
  Flame 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import DataPoint from "./cards/DataPoint";

type StreetInterviewsCardViewProps = {
  interviews: StreetInterview[];
};

const StreetInterviewsCardView = ({ interviews }: StreetInterviewsCardViewProps) => {
  if (!interviews || interviews.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No street interviews data available to display</p>
      </div>
    );
  }

  // Calculate the percentage of people open to innovation
  const totalWithInnovationData = interviews.filter(i => i.ruimte_voor_innovatie !== undefined && i.ruimte_voor_innovatie !== null).length;
  const openToInnovation = interviews.filter(i => i.ruimte_voor_innovatie === true).length;
  const innovationPercentage = totalWithInnovationData > 0 
    ? Math.round((openToInnovation / totalWithInnovationData) * 100) 
    : 0;

  // Calculate the percentage of people willing to pay more
  const totalWithPriceData = interviews.filter(i => i.hogere_prijs !== undefined && i.hogere_prijs !== null).length;
  const willingToPayMore = interviews.filter(i => i.hogere_prijs === true).length;
  const higherPricePercentage = totalWithPriceData > 0 
    ? Math.round((willingToPayMore / totalWithPriceData) * 100) 
    : 0;

  // Calculate average protein content preference
  const totalWithProteinData = interviews.filter(i => i.eiwitgehalte !== undefined && i.eiwitgehalte !== null).length;
  const averageProtein = totalWithProteinData > 0
    ? interviews.reduce((sum, i) => sum + (typeof i.eiwitgehalte === 'number' ? i.eiwitgehalte : 0), 0) / totalWithProteinData
    : 0;

  // Get top initial reactions
  const initialReactions = interviews
    .map(i => i.eerste_reactie)
    .filter(Boolean)
    .reduce((acc, item) => {
      if (!item) return acc;
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Get popular snacks
  const popularSnacks = interviews
    .flatMap(i => [i.populaire_snack_1, i.populaire_snack_2])
    .filter(Boolean)
    .reduce((acc, item) => {
      if (!item) return acc;
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Get taste preferences
  const tastePreferences = interviews
    .map(i => i.smaakvoorkeuren)
    .filter(Boolean)
    .reduce((acc, item) => {
      if (!item) return acc;
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Get preparation preferences
  const prepPreferences = interviews
    .map(i => i.bereidingsvoorkeur)
    .filter(Boolean)
    .reduce((acc, item) => {
      if (!item) return acc;
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Innovation Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ThumbsUp className="h-5 w-5 mr-2 text-blue-500" />
            Openness to Innovation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{innovationPercentage}%</span>
              <span className="text-sm text-gray-500">Open to new protein snacks</span>
            </div>
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
              <ThumbsUp className={`h-8 w-8 ${innovationPercentage > 50 ? 'text-blue-600' : 'text-blue-400'}`} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Key barriers to adoption:</p>
            <div className="mt-2 space-y-2">
              {interviews
                .map(i => i.belangrijkst_aankoopbariere)
                .filter(Boolean)
                .reduce((acc, item) => {
                  if (!item) return acc;
                  acc[item] = (acc[item] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([barrier, count]) => (
                  <div key={barrier} className="flex justify-between items-center">
                    <span className="text-gray-700">{barrier}</span>
                    <Badge variant="outline">{count}x</Badge>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Initial Reactions Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-indigo-500" />
            Initial Reactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(initialReactions)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([reaction, count], index) => (
                <div key={reaction} className="flex justify-between items-center">
                  <span className="text-gray-700">{reaction}</span>
                  <Badge variant={index === 0 ? "default" : "outline"}>
                    {count}x
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Sensitivity Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-green-500" />
            Price Sensitivity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
              <span className="text-3xl font-bold">{higherPricePercentage}%</span>
              <span className="text-sm text-gray-500">Willing to pay premium</span>
            </div>
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className={`h-8 w-8 ${higherPricePercentage > 50 ? 'text-green-600' : 'text-green-400'}`} />
            </div>
          </div>
          <div className="mt-2">
            <DataPoint 
              label="Average Price Point" 
              value={interviews.reduce((sum, i) => sum + (typeof i.prijs === 'number' ? i.prijs : 0), 0) / 
                interviews.filter(i => typeof i.prijs === 'number').length} 
              unit="€"
              highlightValue={true}
            />
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-500">Price increase factors:</p>
            <div className="mt-2 space-y-2">
              {interviews
                .map(i => i.hogere_prijs_factoren)
                .filter(Boolean)
                .reduce((acc, item) => {
                  if (!item) return acc;
                  acc[item] = (acc[item] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([factor, count]) => (
                  <div key={factor} className="flex justify-between items-center">
                    <span className="text-gray-700">{factor}</span>
                    <Badge variant="outline">{count}x</Badge>
                  </div>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Snacks Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Utensils className="h-5 w-5 mr-2 text-orange-500" />
            Popular Snacks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(popularSnacks)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 6)
              .map(([snack, count], index) => (
                <div key={snack} className="flex justify-between items-center">
                  <span className="text-gray-700">{snack}</span>
                  <Badge variant={index < 2 ? "default" : "outline"} className={index < 2 ? "bg-orange-500" : ""}>
                    {count}x
                  </Badge>
                </div>
              ))}
          </div>
          <div className="mt-6">
            <DataPoint 
              label="Would Replace Traditional Snack" 
              value={`${Math.round((interviews.filter(i => i.vervangen_traditionele_snack === true).length / 
                interviews.filter(i => i.vervangen_traditionele_snack !== undefined && i.vervangen_traditionele_snack !== null).length) * 100)}%`}
              iconComponent={<Flame className="h-5 w-5 text-red-500" />}
            />
          </div>
        </CardContent>
      </Card>

      {/* Taste Preferences Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Flame className="h-5 w-5 mr-2 text-red-500" />
            Taste & Texture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Taste Preferences:</p>
              <div className="space-y-2">
                {Object.entries(tastePreferences)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3)
                  .map(([taste, count]) => (
                    <div key={taste} className="flex justify-between items-center">
                      <span className="text-gray-700">{taste}</span>
                      <Badge variant="outline">{count}x</Badge>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Coating Preferences:</p>
              <div className="space-y-2">
                {interviews
                  .map(i => i.welke_coating)
                  .filter(Boolean)
                  .reduce((acc, item) => {
                    if (!item) return acc;
                    acc[item] = (acc[item] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3)
                  .map(([coating, count]) => (
                    <div key={coating} className="flex justify-between items-center">
                      <span className="text-gray-700">{coating}</span>
                      <Badge variant="outline">{count}x</Badge>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preparation & Protein Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-purple-500" />
            Preparation & Protein
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Preparation Preferences:</p>
              <div className="space-y-2">
                {Object.entries(prepPreferences)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3)
                  .map(([prep, count]) => (
                    <div key={prep} className="flex justify-between items-center">
                      <span className="text-gray-700">{prep}</span>
                      <Badge variant="outline">{count}x</Badge>
                    </div>
                  ))}
              </div>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Protein Content</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">{averageProtein.toFixed(1)}</span>
                  <span className="ml-1 text-gray-500">g</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Percent className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StreetInterviewsCardView;
