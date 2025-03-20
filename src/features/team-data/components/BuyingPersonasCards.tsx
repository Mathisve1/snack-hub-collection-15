
import { BuyingPersona } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTeam38BuyingPersonas } from "../hooks/useTeam38Data";
import { Loader2, Users, Calendar, DollarSign, ShoppingBag, Clock, Lightbulb, Megaphone, CheckCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

interface BuyingPersonasCardsProps {
  personas?: BuyingPersona[];
}

const BuyingPersonasCards = ({ personas }: BuyingPersonasCardsProps) => {
  const location = useLocation();
  
  // Use the team38Data hook only if personas are not passed as props
  const team38Data = useTeam38BuyingPersonas();
  
  // Use passed personas if available, otherwise use the data from hooks
  const data = personas || team38Data.data;
  const loading = !personas && team38Data.loading;
  const error = !personas && team38Data.error;
  
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
        Error loading buying personas data: {error}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-gray-500 p-4 text-center">
        No buying personas data available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((persona) => (
        <Card key={persona.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader className="bg-gray-50 pb-2">
            <CardTitle className="text-lg font-bold">{persona.buying_persona}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 space-y-3">
            {persona.geslacht && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Gender: {persona.geslacht}</span>
              </div>
            )}
            
            {persona.leeftijd && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Age: {persona.leeftijd}</span>
              </div>
            )}
            
            {persona.prijs && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Price Sensitivity: {persona.prijs}</span>
              </div>
            )}
            
            {persona.consumptie_situatie && (
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Consumption: {persona.consumptie_situatie}</span>
              </div>
            )}
            
            {persona.frequentie_frituurbezoek && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Frituur visits: {persona.frequentie_frituurbezoek}</span>
              </div>
            )}
            
            {persona.motivatie_kiezen_proteine_snack && (
              <div className="flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-gray-500 mt-0.5" />
                <span className="text-sm">Motivation: {persona.motivatie_kiezen_proteine_snack}</span>
              </div>
            )}
            
            {persona.marketing && (
              <div className="flex items-start gap-2">
                <Megaphone className="h-4 w-4 text-gray-500 mt-0.5" />
                <span className="text-sm">Marketing approach: {persona.marketing}</span>
              </div>
            )}
            
            <div className="pt-2">
              <Badge variant={persona.openheid_nieuwe_snack ? "success" : "destructive"}>
                <CheckCircle className="h-3 w-3 mr-1" />
                {persona.openheid_nieuwe_snack ? "Open to new snacks" : "Conservative"}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BuyingPersonasCards;
