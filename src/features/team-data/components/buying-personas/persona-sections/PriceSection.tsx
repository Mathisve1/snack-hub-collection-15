
import { ShoppingBag } from "lucide-react";
import { getPriceInfo } from "../utils/personaDisplayUtils";

type PriceSectionProps = {
  prices: Record<string, number>;
};

export const PriceSection = ({ prices }: PriceSectionProps) => {
  const priceInfo = getPriceInfo(prices);
  
  return (
    <div className="flex items-start">
      <ShoppingBag className="h-5 w-5 mr-2 text-purple-500 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Prijsgevoeligheid</p>
        <p className="font-medium">Gemiddeld: {priceInfo.average}€</p>
        {priceInfo.breakdown && (
          <p className="text-xs text-gray-600 mt-1">{priceInfo.breakdown}</p>
        )}
      </div>
    </div>
  );
};
