
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BuyingPersona } from "../../types";
import { User, Calendar, DollarSign, Clock, Coffee, ThumbsUp } from "lucide-react";
import { countOccurrences, calculateOpenness } from "./utils/personaDataUtils";

type PersonaCardItemProps = {
  personaType: string;
  personaCount: number;
  personas: BuyingPersona[];
  index: number;
};

const getCardColor = (index: number) => {
  const colors = [
    "bg-blue-50",
    "bg-green-50",
    "bg-orange-50",
    "bg-purple-50",
    "bg-teal-50",
    "bg-rose-50"
  ];
  return colors[index % colors.length];
};

export const PersonaCardItem = ({ personaType, personaCount, personas, index }: PersonaCardItemProps) => {
  // Process demographic data
  const genders = countOccurrences(personas, 'geslacht');
  const openness = calculateOpenness(personas);
  
  // Get age data
  const ages = personas.map(p => p.leeftijd).filter(age => age !== null && age !== undefined) as number[];
  const avgAge = ages.length > 0 ? Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length) : 0;
  const minAge = ages.length > 0 ? Math.min(...ages) : 0;
  const maxAge = ages.length > 0 ? Math.max(...ages) : 0;
  
  // Get price data
  const prices = personas.map(p => p.prijs).filter(price => price !== null && price !== undefined) as number[];
  const avgPrice = prices.length > 0 ? prices.reduce((sum, price) => sum + price, 0) / prices.length : 0;
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
  
  // Consumption situation
  const consumption = countOccurrences(personas, 'consumptie_situatie');
  
  // Visit frequency
  const frequency = countOccurrences(personas, 'frequentie_frituurbezoek');
  
  return (
    <Card className={`${getCardColor(index)} border`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">
          {personaType}
        </CardTitle>
        <CardDescription>
          Geaggregeerd van {personaCount} {personaCount === 1 ? 'profiel' : 'profielen'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Gender Section */}
        <div>
          <div className="flex items-center mb-2">
            <User className="h-4 w-4 mr-1 text-gray-500" />
            <span className="font-medium">Geslacht</span>
          </div>
          <div className="relative h-16 w-16 mx-auto">
            <svg className="h-16 w-16" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="16" fill="#e6e6e6" />
              {Object.entries(genders).map(([gender, count], i, arr) => {
                const percentage = count / personaCount;
                const startAngle = arr.slice(0, i).reduce((sum, [_, c]) => sum + (c / personaCount) * 360, 0);
                const endAngle = startAngle + percentage * 360;
                const x1 = 16 + 16 * Math.cos((startAngle - 90) * Math.PI / 180);
                const y1 = 16 + 16 * Math.sin((startAngle - 90) * Math.PI / 180);
                const x2 = 16 + 16 * Math.cos((endAngle - 90) * Math.PI / 180);
                const y2 = 16 + 16 * Math.sin((endAngle - 90) * Math.PI / 180);
                const largeArcFlag = percentage > 0.5 ? 1 : 0;
                
                const color = gender.toLowerCase().includes('vrouw') ? '#ec4899' : '#3b82f6';
                
                return (
                  <path 
                    key={gender}
                    d={`M 16,16 L ${x1},${y1} A 16,16 0 ${largeArcFlag} 1 ${x2},${y2} Z`}
                    fill={color}
                  />
                );
              })}
            </svg>
          </div>
          {Object.entries(genders).map(([gender, count]) => {
            const percentage = Math.round((count / personaCount) * 100);
            const color = gender.toLowerCase().includes('vrouw') ? 'text-pink-500' : 'text-blue-500';
            return (
              <div key={gender} className="text-xs text-gray-600 flex justify-between">
                <span className={color}>{gender}</span>
                <span>{count} ({percentage}%)</span>
              </div>
            );
          })}
        </div>
        
        {/* Age Section */}
        <div>
          <div className="flex items-center mb-1">
            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
            <span className="font-medium">Leeftijd</span>
          </div>
          <div className="text-sm">
            <div className="flex justify-between">
              <span>Gemiddeld: {avgAge}</span>
            </div>
            <div className="flex justify-between">
              <span>Bereik: {minAge} - {maxAge}</span>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {ages.map((age, i) => (
                <span key={i}>
                  {age} {i < ages.length - 1 ? ', ' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Price Section */}
        <div>
          <div className="flex items-center mb-1">
            <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
            <span className="font-medium">Prijs</span>
          </div>
          <div className="text-sm">
            <div className="flex justify-between">
              <span>Gemiddeld: €{avgPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Bereik: €{minPrice} - €{maxPrice}</span>
            </div>
          </div>
        </div>
        
        {/* Frequency Section */}
        <div>
          <div className="flex items-center mb-1">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            <span className="font-medium">Frequentie Frituurbezoek</span>
          </div>
          <div className="text-sm space-y-1">
            {Object.entries(frequency).map(([freq, count]) => (
              <div key={freq} className="flex justify-between">
                <span>{freq}</span>
                <span className="text-gray-500">{count}x</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Consumption Section */}
        <div>
          <div className="flex items-center mb-1">
            <Coffee className="h-4 w-4 mr-1 text-gray-500" />
            <span className="font-medium">Consumptie Situatie</span>
          </div>
          <div className="text-sm space-y-1">
            {Object.entries(consumption).map(([situation, count]) => (
              <div key={situation} className="flex justify-between">
                <span>{situation}</span>
                <span className="text-gray-500">{count}x</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Openness Section */}
        <div>
          <div className="flex items-center mb-1">
            <ThumbsUp className="h-4 w-4 mr-1 text-gray-500" />
            <span className="font-medium">Open voor Nieuwe Snack</span>
          </div>
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-500 h-2.5 rounded-full" 
                style={{ width: `${openness.percentage}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm font-medium">{openness.percentage}%</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {openness.open} van {openness.total} {openness.total === 1 ? 'persoon' : 'personen'}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
