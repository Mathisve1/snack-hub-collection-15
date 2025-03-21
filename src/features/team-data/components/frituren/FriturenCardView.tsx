
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {/* Popular Bestsellers */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
            Popular Bestsellers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(bestsellers)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([item, count], index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item}</span>
                  <Badge variant="secondary">{count} mentions</Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Suppliers */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Store className="mr-2 h-5 w-5 text-primary" />
            Popular Suppliers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(suppliers)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([item, count], index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item}</span>
                  <Badge variant="secondary">{count} frituren</Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Trends */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            Current Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(trends)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([item, count], index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item}</span>
                  <Badge variant="secondary">{count} mentions</Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Insights */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <DollarSign className="mr-2 h-5 w-5 text-primary" />
            Financial Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Average Margins</span>
              <Badge variant="outline" className="font-semibold">
                {averageMargins.toFixed(1)}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FriturenCardView;
