export interface CompanyDetailsProps {
  company: {
    name: string;
    volume: string;
    growth: string;
    description?: string;
  };
}

export interface CompanyInsightsProps {
  companyName: string;
  data: {
    channels: { name: string; percentage: number }[];
    keyIndicators: { name: string; value: string }[];
    relatedTrends: { name: string; growth: string }[];
  };
}

// src/types.ts
export type ProductSegment = {
  id: number;
  name: string;
  description: string;
  growth: string;
  salesVolume: string;
  totalRevenue: string;
  latestVersion: string;
  stock: string;
  categories: string[];
  location: string;
  imageUrl?: string;
  avgRevenue?: string;
  avgBSR?: string;
  avgPrice?: string;
  avgMonthlySales?: string;
  avgReviews?: string;
  salesData?: number[];
  topSellers?: { id: number; logo: string; name: string; revenue: string; sales: string }[];
  relatedProducts?: { id: number; logo: string; name: string; price: string; avgRating: string }[];
  keyIndicators?: { growth: string; speed: string; seasonality: string; volatility: string; sentiment: string };
};
