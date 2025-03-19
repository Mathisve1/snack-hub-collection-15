
import { Banknote } from "lucide-react";

type PriceSectionProps = {
  prices: (string | number)[];
};

export const PriceSection = ({ prices }: PriceSectionProps) => {
  // Calculate price range
  const numericPrices = prices.map(p => typeof p === 'number' ? p : parseFloat(p.toString()));
  const validPrices = numericPrices.filter(p => !isNaN(p));
  
  const minPrice = validPrices.length > 0 ? Math.min(...validPrices) : 'N/A';
  const maxPrice = validPrices.length > 0 ? Math.max(...validPrices) : 'N/A';
  const priceRange = validPrices.length > 0 ? `€${minPrice} - €${maxPrice}` : 'N/A';
  
  // Calculate average price
  const averagePrice = validPrices.length > 0 
    ? Math.round(validPrices.reduce((sum, price) => sum + price, 0) / validPrices.length * 100) / 100
    : 'N/A';
    
  // Count individual prices and their occurrences
  const priceOccurrences: Record<string, number> = {};
  validPrices.forEach(price => {
    if (price !== null && price !== undefined) {
      const priceKey = price.toString();
      priceOccurrences[priceKey] = (priceOccurrences[priceKey] || 0) + 1;
    }
  });
  
  return (
    <div className="flex items-start">
      <Banknote className="h-5 w-5 mr-2 text-yellow-500 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Prijs</p>
        <div className="text-gray-600">
          <div>Gemiddeld: €{typeof averagePrice === 'number' ? averagePrice.toFixed(2) : averagePrice}</div>
          <div>Bereik: {priceRange}</div>
          <div className="text-xs mt-1">
            {Object.entries(priceOccurrences).map(([price, count], i) => (
              <span key={price} className="mr-2">
                €{price} ({count}x)
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
