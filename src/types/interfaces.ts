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
  avgRevenue?: string;          // Optional fields to match ProductDetailsModal.tsx
  avgBSR?: string;              // Optional fields to match ProductDetailsModal.tsx
  avgPrice?: string;            // Optional fields to match ProductDetailsModal.tsx
  avgMonthlySales?: string;     // Optional fields to match ProductDetailsModal.tsx
};

