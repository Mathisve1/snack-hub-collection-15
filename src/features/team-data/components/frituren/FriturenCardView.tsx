
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Frituur } from "../../types";
import { 
  TrendingUp, 
  ShoppingBag, 
  Store, 
  DollarSign, 
  BarChart, 
  Star
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type FriturenCardViewProps = {
  frituren: Frituur[];
};

const FriturenCardView = ({ frituren }: FriturenCardViewProps) => {
  if (!frituren || frituren.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">No frituren data available to display</p>
      </div>
    );
  }

  // Calculate average margins
  const averageMargins = 
    frituren.reduce((sum, f) => sum + (f.gemiddlede_marges || 0), 0) / 
    frituren.filter(f => f.gemiddlede_marges !== null && f.gemiddlede_marges !== undefined).length;

  // Get top bestsellers
  const bestsellers = frituren
    .flatMap(f => [f.bestseller_1, f.bestseller_2, f.bestseller_3])
    .filter(Boolean)
    .reduce((acc, item) => {
      if (!item) return acc;
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Get top suppliers
  const suppliers = frituren
    .map(f => f.groothandel)
    .filter(Boolean)
    .reduce((acc, item) => {
      if (!item) return acc;
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Get top trends
  const trends = frituren
    .flatMap(f => [f.trends_1, f.trends_2])
    .filter(Boolean)
    .reduce((acc, item) => {
      if (!item) return acc;
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Bestsellers Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Bestsellers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(bestsellers)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([product, count], index) => (
                <div key={product} className="flex justify-between items-center">
                  <span className="text-gray-700">{product}</span>
                  <Badge variant={index === 0 ? "default" : "outline"}>
                    {count}x mentioned
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Trends Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
            Trending Products
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(trends)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([trend, count], index) => (
                <div key={trend} className="flex justify-between items-center">
                  <span className="text-gray-700">{trend}</span>
                  <Badge variant={index === 0 ? "default" : "outline"}>
                    {count}x mentioned
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Suppliers Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <ShoppingBag className="h-5 w-5 mr-2 text-green-500" />
            Main Suppliers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(suppliers)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([supplier, count], index) => (
                <div key={supplier} className="flex justify-between items-center">
                  <span className="text-gray-700">{supplier}</span>
                  <Badge variant={index === 0 ? "default" : "outline"}>
                    {count}x mentioned
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Metrics Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <BarChart className="h-5 w-5 mr-2 text-purple-500" />
            Financial Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Average Margins</p>
              <p className="text-2xl font-bold">{averageMargins.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Average Purchase Price</p>
              <p className="text-2xl font-bold">
                €{(frituren.reduce((sum, f) => sum + (f.aankoopprijs || 0), 0) / 
                  frituren.filter(f => f.aankoopprijs !== null && f.aankoopprijs !== undefined).length).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Protein Snacks Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <DollarSign className="h-5 w-5 mr-2 text-cyan-500" />
            Protein Snacks Pricing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Average Purchase Price</p>
              <p className="text-2xl font-bold">
                €{(frituren.reduce((sum, f) => sum + (f.aankoopprijs_proteine_snacks || 0), 0) / 
                  frituren.filter(f => f.aankoopprijs_proteine_snacks !== null && f.aankoopprijs_proteine_snacks !== undefined).length).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Price Range</p>
              <p className="text-lg">
                €{Math.min(...frituren.map(f => f.aankoopprijs_proteine_snacks || Infinity)).toFixed(2)} - 
                €{Math.max(...frituren.map(f => f.aankoopprijs_proteine_snacks || 0)).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Willingness Card */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Store className="h-5 w-5 mr-2 text-orange-500" />
            Market Openness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {frituren
              .map(f => f.bereidheid_aanbieden)
              .filter(Boolean)
              .reduce((acc, item) => {
                if (!item) return acc;
                acc[item] = (acc[item] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([willingness, count], index) => (
                <div key={willingness} className="flex justify-between items-center">
                  <span className="text-gray-700">{willingness}</span>
                  <Badge variant={index === 0 ? "default" : "outline"}>
                    {count}x mentioned
                  </Badge>
                </div>
              ))}
            {frituren
              .flatMap(f => [f.waarom_niet_verkopen, f.waarom_niet_verkopen_2])
              .filter(Boolean)
              .reduce((acc, item) => {
                if (!item) return acc;
                acc[item] = (acc[item] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(([reason, count]) => (
                <div key={reason} className="flex justify-between items-center">
                  <span className="text-gray-700 text-sm">Reason: {reason}</span>
                  <Badge variant="outline" className="bg-red-50">
                    {count}x
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FriturenCardView;
