
import React from 'react';
import { StreetInterview } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { processStreetInterviewsData, extractStreetInterviewMetrics } from './street-interviews/utils/dataProcessing';
import { 
  MessageSquare, 
  ShoppingBag, 
  Utensils, 
  DollarSign, 
  Coffee, 
  Cpu, 
  BarChart 
} from 'lucide-react';
import ReactionsChannelsCard from './street-interviews/cards/ReactionsChannelsCard';
import MotivationSnacksCard from './street-interviews/cards/MotivationSnacksCard';
import ProteinPriceCard from './street-interviews/cards/ProteinPriceCard';
import TasteCoatingCard from './street-interviews/cards/TasteCoatingCard';
import PreparationCrunchCard from './street-interviews/cards/PreparationCrunchCard';
import BarriersFrequencyCard from './street-interviews/cards/BarriersFrequencyCard';
import InnovationPriceCard from './street-interviews/cards/InnovationPriceCard';
import SummaryCard from './street-interviews/cards/SummaryCard';

interface Team13StreetInterviewsSummaryProps {
  data: StreetInterview[];
}

const Team13StreetInterviewsSummary: React.FC<Team13StreetInterviewsSummaryProps> = ({ data }) => {
  const processedData = processStreetInterviewsData(data);
  const metrics = extractStreetInterviewMetrics(processedData);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard 
          title="Eerste reacties & verkoopskanalen" 
          icon={MessageSquare} 
          count={metrics.eersteReactiesTotal + metrics.verkoopskanalenTotal} 
        />
        <SummaryCard 
          title="Motivatie & populaire snacks" 
          icon={ShoppingBag} 
          count={metrics.motivationTotal + metrics.snacksTotal} 
        />
        <SummaryCard 
          title="Smaakvoorkeuren & coating" 
          icon={Coffee} 
          count={metrics.tastesTotal + metrics.coatingsTotal} 
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <ReactionsChannelsCard 
          icon={MessageSquare}
          topFirstReactions={metrics.topFirstReactions}
          topSalesChannels={metrics.topSalesChannels}
          eersteReactiesTotal={metrics.eersteReactiesTotal}
          verkoopskanalenTotal={metrics.verkoopskanalenTotal}
        />
        
        <MotivationSnacksCard 
          icon={ShoppingBag}
          topMotivations={metrics.topMotivations}
          topSnacks={metrics.topSnacks}
          motivationTotal={metrics.motivationTotal}
          snacksTotal={metrics.snacksTotal}
        />
        
        <ProteinPriceCard 
          icon={DollarSign}
          avgProtein={metrics.avgProtein}
          avgPrice={metrics.avgPrice}
          proteinRanges={metrics.proteinRanges}
          priceRanges={metrics.priceRanges}
        />
        
        <TasteCoatingCard 
          icon={Coffee}
          topTastes={metrics.topTastes}
          topCoatings={metrics.topCoatings}
          tastesTotal={metrics.tastesTotal}
          coatingsTotal={metrics.coatingsTotal}
        />
        
        <PreparationCrunchCard 
          icon={Utensils}
          topPreparations={metrics.topPreparations}
          topImportanceCrunch={metrics.topCrunchImportance}
          preparationsTotal={metrics.preparationsTotal}
          crunchImportanceTotal={metrics.crunchImportanceTotal}
        />
        
        <BarriersFrequencyCard 
          icon={BarChart}
          topBarriers={metrics.topBarriers}
          topFrequencies={metrics.topFrequencies}
          barriersTotal={metrics.barriersTotal}
          frequenciesTotal={metrics.frequenciesTotal}
        />
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Cpu className="h-5 w-5 mr-2 text-blue-500" />
            Innovatie & Prijsperceptie
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InnovationPriceCard 
            innovationPercentage={metrics.innovationPercentage}
            higherPricePercentage={metrics.higherPricePercentage}
            replaceTradSnackPercentage={metrics.replaceTradSnackPercentage}
            highPriceFactors={metrics.topPriceFactors}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Team13StreetInterviewsSummary;
