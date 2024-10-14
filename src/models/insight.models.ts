import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for HubItem document
interface IHubItem extends Document {
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

// Define the interface for ProductItem document
interface IProductItem extends Document {
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

// Create HubItem schema
const HubItemSchema: Schema = new Schema({
    title: { type: String, required: true },
    volume: { type: String, required: true },
    totalFunding: { type: String, required: true },
    latestRound: { type: String, required: true },
    employees: { type: String, required: true },
    category: { type: [String], required: true },  // Array of strings
    location: { type: String, required: true },
    growth: { type: String, required: true },
    description: { type: String, required: true },
});

// Create ProductItem schema
const ProductItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    growth: { type: String, required: true },
    salesVolume: { type: String, required: true },
    totalRevenue: { type: String, required: true },
    latestVersion: { type: String, required: true },
    stock: { type: String, required: true },
    categories: { type: [String], required: true },  // Array of strings
    location: { type: String, required: true },
});

// Create Mongoose models
const HubItem = mongoose.model<IHubItem>('HubItem', HubItemSchema);
const ProductItem = mongoose.model<IProductItem>('ProductItem', ProductItemSchema);

export { HubItem, ProductItem };
