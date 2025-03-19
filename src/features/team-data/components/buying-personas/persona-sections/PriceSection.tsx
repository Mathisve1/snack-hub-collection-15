
import { ShoppingBag } from "lucide-react";
import { getMostCommon } from "../utils/personaDisplayUtils";

type PriceSectionProps = {
  prices: Record<string, number>;
};

export const PriceSection = ({ prices }: PriceSectionProps) => {
  const prijs = getMostCommon(prices);
  
  return (
    <div className="flex items-start">
      <ShoppingBag className="h-5 w-5 mr-2 text-purple-500 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Prijsgevoeligheid</p>
        <p>{prijs.value}</p>
      </div>
    </div>
  );
};
