export interface RelatedStartup {
  id: number;
  logo: string;
  name: string;
  description: string;
  growthRate: string;
}

export interface KeyIndicators {
  growth: string;
  speed: string;
  seasonality: string;
  volatility: string;
  sentiment: string;
  forecast: string;
}

// Add this Trend interface here
export interface Trend {
  name: string;
  growthRate: string;
  growthData: { idx: number; value: number }[];
}

export interface Startup {
  id: number;
  title: string;
  description: string;
  foundedDate: string;
  website: string;
  socialPlatforms?: string[];
  growth: string;
  volume: string;
  totalFunding: string;
  latestRound: string;
  employees: string;
  category: string[];
  location: string;
  growthData?: number[];
  relatedStartups?: RelatedStartup[];
  channels?: { name: string; volume: number }[];
  relatedTrends?: Trend[]; // Uses the Trend interface here
  keyIndicators?: KeyIndicators;
}
