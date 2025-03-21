import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Frituur } from "../../types";
import { TrendingUp, ShoppingBag, Store, DollarSign, BarChart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
type FriturenCardViewProps = {
  frituren: Frituur[];
};
const FriturenCardView = ({
  frituren
}: FriturenCardViewProps) => {
  if (!frituren || frituren.length === 0) {
    return <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No frituren data available to display</p>
      </div>;
  }

  // Calculate average margins
  const averageMargins = frituren.reduce((sum, f) => {
    const margin = typeof f.gemiddlede_marges === 'string' ? parseFloat(f.gemiddlede_marges) : f.gemiddlede_marges || 0;
    return sum + margin;
  }, 0) / frituren.filter(f => f.gemiddlede_marges !== null && f.gemiddlede_marges !== undefined).length;

  // Get top bestsellers
  const bestsellers = frituren.flatMap(f => [f.bestseller_1, f.bestseller_2, f.bestseller_3]).filter(Boolean).reduce((acc, item) => {
    if (!item) return acc;
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get top suppliers
  const suppliers = frituren.map(f => f.groothandel).filter(Boolean).reduce((acc, item) => {
    if (!item) return acc;
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get top trends
  const trends = frituren.flatMap(f => [f.trends_1, f.trends_2]).filter(Boolean).reduce((acc, item) => {
    if (!item) return acc;
    acc[item] = (acc[item] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return;
};
export default FriturenCardView;