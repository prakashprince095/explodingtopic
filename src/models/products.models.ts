import mongoose, { Schema, Document } from 'mongoose';


interface ITopSeller extends Document {
    logo: string;
    name: string;
    revenue: string;
    sales: string;
}

const TopSellerSchema: Schema = new Schema({
    logo: { type: String, required: true },
    name: { type: String, required: true },
    revenue: { type: String, required: true },
    sales: { type: String, required: true },
});


interface IRelatedProduct extends Document {
    logo: string;
    name: string;
    price: string;
    avgRating: string;
}

const RelatedProductSchema: Schema = new Schema({
    logo: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    avgRating: { type: String, required: true },
});


interface IKeyIndicators extends Document {
    growth: string;
    speed: string;
    seasonality: string;
    volatility: string;
    sentiment: string;
}

const KeyIndicatorsSchema: Schema = new Schema({
    growth: { type: String, required: true },
    speed: { type: String, required: true },
    seasonality: { type: String, required: true },
    volatility: { type: String, required: true },
    sentiment: { type: String, required: true },
});

interface IProductSegment extends Document {
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
    topSellers?: ITopSeller[];
    relatedProducts?: IRelatedProduct[];
    keyIndicators?: IKeyIndicators;
}

const ProductSegmentSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    growth: { type: String, required: true },
    salesVolume: { type: String, required: true },
    totalRevenue: { type: String, required: true },
    latestVersion: { type: String, required: true },
    stock: { type: String, required: true },
    categories: { type: [String], required: true },
    location: { type: String, required: true },
    imageUrl: { type: String },
    avgRevenue: { type: String },
    avgBSR: { type: String },
    avgPrice: { type: String },
    avgMonthlySales: { type: String },
    avgReviews: { type: String },
    salesData: { type: [Number] },
    topSellers: [TopSellerSchema],
    relatedProducts: [RelatedProductSchema],
    keyIndicators: KeyIndicatorsSchema,
});

const ProductSegment = mongoose.model<IProductSegment>('ProductSegment', ProductSegmentSchema);
const TopSeller = mongoose.model<ITopSeller>('TopSeller', TopSellerSchema);
const RelatedProduct = mongoose.model<IRelatedProduct>('RelatedProduct', RelatedProductSchema);
const KeyIndicators = mongoose.model<IKeyIndicators>('KeyIndicators', KeyIndicatorsSchema);

export { ProductSegment, TopSeller, RelatedProduct, KeyIndicators };
