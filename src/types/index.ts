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
  
  // Add the `Startup` type here
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
    keyIndicators?: KeyIndicators;
  }
  