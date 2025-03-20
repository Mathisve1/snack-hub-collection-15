
export interface CommonValueInfo {
  value: string;
  count: number;
  percentage: number;
}

export interface TopValue {
  name: string;
  count: number;
  percentage: number;
}

export interface ReactionsChannelsCardProps {
  title?: string;
  icon?: React.ElementType;
  topFirstReactions: TopValue[];
  topSalesChannels: TopValue[];
  eersteReactiesTotal: number;
  verkoopskanalenTotal: number;
}

export interface MotivationSnacksCardProps {
  title?: string;
  icon?: React.ElementType;
  topMotivations: TopValue[];
  topSnacks: TopValue[];
  motivationTotal: number;
  snacksTotal: number;
}

export interface ProteinPriceCardProps {
  title?: string;
  icon?: React.ElementType;
  avgProtein: number;
  avgPrice: number;
  proteinRanges: Record<string, number>;
  priceRanges: Record<string, number>;
}

export interface TasteCoatingCardProps {
  title?: string;
  icon?: React.ElementType;
  topTastes: TopValue[];
  topCoatings: TopValue[];
  tastesTotal: number;
  coatingsTotal: number;
}

export interface PreparationCrunchCardProps {
  title?: string;
  icon?: React.ElementType;
  topPreparations: TopValue[];
  topImportanceCrunch: TopValue[];
  preparationsTotal: number;
  crunchImportanceTotal: number;
}

export interface BarriersFrequencyCardProps {
  title?: string;
  icon?: React.ElementType;
  topBarriers: TopValue[];
  topFrequencies: TopValue[];
  barriersTotal: number;
  frequenciesTotal: number;
}

export interface InnovationPriceCardProps {
  title?: string;
  icon?: React.ElementType;
  innovationPercentage: number;
  higherPricePercentage: number;
  replaceTradSnackPercentage: number;
  highPriceFactors?: TopValue[];
}

export interface SummaryCardProps {
  title: string;
  icon: React.ElementType;
  count: number;
  children?: React.ReactNode;
}

export interface AverageResponseCardProps {
  title: string;
  icon: React.ElementType;
  average: number;
  deviation?: number;
  unit?: string;
  labels?: string[];
}
