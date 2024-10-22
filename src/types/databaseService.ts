// databaseService.ts

// Define the interface for a HubItem
interface IHubItem {
    title: string;
    volume: string;
    totalFunding: string;
    latestRound: string;
    employees: string;
    category: string[];
    location: string;
    growth: string;
    description: string;
  }
  
  // Define the interface for a ProductItem
  interface IProductItem {
    name: string;
    description: string;
    growth: string;
    salesVolume: string;
    totalRevenue: string;
    latestVersion: string;
    stock: string;
    categories: string[];
    location: string;
  }
  
  // The rest of your database service code
  