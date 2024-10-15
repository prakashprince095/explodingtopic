import mongoose, { Schema, Document } from 'mongoose';

interface IKeyIndicators extends Document {
    growth: string;
    speed: string;
    seasonality: string;
    volatility: string;
    sentiment: string;
    forecast: string;
}

const KeyIndicatorsSchema: Schema = new Schema({
    growth: { type: String, required: true },
    speed: { type: String, required: true },
    seasonality: { type: String, required: true },
    volatility: { type: String, required: true },
    sentiment: { type: String, required: true },
    forecast: { type: String, required: true },
});

// Define RelatedStartup interface and schema
interface IRelatedStartup extends Document {
    logo: string;
    name: string;
    description: string;
    growthRate: string;
}

const RelatedStartupSchema: Schema = new Schema({
    logo: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    growthRate: { type: String, required: true },
});

interface IChannel extends Document {
    name: string;
    volume: number;
}

const ChannelSchema: Schema = new Schema({
    name: { type: String, required: true },
    volume: { type: Number, required: true },
});

interface ISegment extends Document {
    title: string;
    description: string;
    foundedDate: string;
    website: string;
    socialPlatforms: string[];
    growth: string;
    volume: string;
    totalFunding: string;
    latestRound: string;
    employees: string;
    category: string[];
    location: string;
    growthData?: number[];
    relatedStartups?: IRelatedStartup[];
    channels?: IChannel[];
    keyIndicators?: IKeyIndicators;
}

const SegmentSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    foundedDate: { type: String, required: true },
    website: { type: String, required: true },
    socialPlatforms: { type: [String], required: true },
    growth: { type: String, required: true },
    volume: { type: String, required: true },
    totalFunding: { type: String, required: true },
    latestRound: { type: String, required: true },
    employees: { type: String, required: true },
    category: { type: [String], required: true },
    location: { type: String, required: true },
    growthData: { type: [Number], required: false },
    relatedStartups: { type: [RelatedStartupSchema], required: false },
    channels: { type: [ChannelSchema], required: false },
    keyIndicators: { type: KeyIndicatorsSchema, required: false },
});

const Segment = mongoose.model<ISegment>('Segment', SegmentSchema);
const RelatedStartup = mongoose.model<IRelatedStartup>('RelatedStartup', RelatedStartupSchema);
const KeyIndicators = mongoose.model<IKeyIndicators>('KeyIndicators', KeyIndicatorsSchema);
const Channel = mongoose.model<IChannel>('Channel', ChannelSchema);

export { Segment, RelatedStartup, KeyIndicators, Channel };
