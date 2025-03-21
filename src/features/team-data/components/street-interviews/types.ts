
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
  // Additional props to fix the type errors
  eersteReactieInfo?: any;
  verkoopskanalenInfo?: any;
  eerste_reacties?: Record<string, number>;
  verkoopskanalen?: Record<string, number>;
  formatBreakdown?: any;
}

export interface MotivationSnacksCardProps {
  title?: string;
  icon?: React.ElementType;
  topMotivations: TopValue[];
  topSnacks: TopValue[];
  motivationTotal: number;
  snacksTotal: number;
  // Additional props to fix the type errors
  motivatieInfo?: any;
  populaireSnackInfo?: any;
  motivatie_frituur?: Record<string, number>;
  populaire_snacks?: Record<string, number>;
  formatBreakdown?: any;
}

export interface ProteinPriceCardProps {
  title?: string;
  icon?: React.ElementType;
  avgProtein: number;
  avgPrice: number;
  proteinRanges: Record<string, number>;
  priceRanges: Record<string, number>;
  // Additional props to fix the type errors
  eiwitgehalteInfo?: any;
  prijsInfo?: any;
  gemiddeldeEiwitgehalte?: number;
  gemiddeldePrijs?: number;
  eiwitgehalte?: Record<string, number>;
  prijzen?: Record<string, number>;
  formatBreakdown?: any;
}

export interface TasteCoatingCardProps {
  title?: string;
  icon?: React.ElementType;
  topTastes: TopValue[];
  topCoatings: TopValue[];
  tastesTotal: number;
  coatingsTotal: number;
  // Additional props to fix the type errors
  smaakvoorkeurenInfo?: any;
  coatingInfo?: any;
  smaakvoorkeuren?: Record<string, number>;
  coating?: Record<string, number>;
  formatBreakdown?: any;
}

export interface PreparationCrunchCardProps {
  title?: string;
  icon?: React.ElementType;
  topPreparations: TopValue[];
  topImportanceCrunch: TopValue[];
  preparationsTotal: number;
  crunchImportanceTotal: number;
  // Additional props to fix the type errors
  bereidingsvoorkeurInfo?: any;
  belangKrokantheidInfo?: any;
  bereidingsvoorkeur?: Record<string, number>;
  belang_krokantheid?: Record<string, number>;
  formatBreakdown?: any;
}

export interface BarriersFrequencyCardProps {
  title?: string;
  icon?: React.ElementType;
  topBarriers: TopValue[];
  topFrequencies: TopValue[];
  barriersTotal: number;
  frequenciesTotal: number;
  // Additional props to fix the type errors
  aankoopbarriereInfo?: any;
  frequentieInfo?: any;
  aankoopbarrieres?: Record<string, number>;
  frituurbezoek_frequentie?: Record<string, number>;
  formatBreakdown?: any;
}

export interface InnovationPriceCardProps {
  title?: string;
  icon?: React.ElementType;
  innovationPercentage: number;
  higherPricePercentage: number;
  replaceTradSnackPercentage: number;
  highPriceFactors?: TopValue[];
  // Additional props to fix the type errors
  innovatieRuimtePercentage?: number;
  hogerePrijsPercentage?: number;
  vervangenTraditionalPercentage?: number;
}

export interface SummaryCardProps {
  title: string;
  icon: React.ElementType;
  count: number;
  children?: React.ReactNode;
  className?: string;
  iconClassName?: string;
  countUnit?: string;
  subtitle?: string;
  iconColor?: string;
}

export interface AverageResponseCardProps {
  title?: string;
  icon?: React.ElementType;
  average?: number;
  deviation?: number;
  unit?: string;
  labels?: string[];
  // Additional props to fix type errors
  gemiddeldePositiefResponse?: string;
  gemiddeldeEiwitgehalte?: string;
  gemiddeldePrijs?: string;
}
