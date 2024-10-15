import mongoose, { Schema, Document } from 'mongoose';

interface IChannel extends Document {
  name: string;
  percentage: number;
}

const ChannelSchema: Schema = new Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true },
});

interface IKeyIndicator extends Document {
  name: string;
  value: number;
}

const KeyIndicatorSchema: Schema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
});

interface IRelatedTrend extends Document {
  name: string;
  growth: number;
  chartData: number[];
}

const RelatedTrendSchema: Schema = new Schema({
  name: { type: String, required: true },
  growth: { type: Number, required: true },
  chartData: { type: [Number], required: true },
});

interface ICompanyData extends Document {
  name: string;
  volume: string;
  growth: string;
  description: string;
  channels: IChannel[];
  keyIndicators: IKeyIndicator[];
  relatedTrends: IRelatedTrend[];
}

const CompanyDataSchema: Schema = new Schema({
  name: { type: String, required: true },
  volume: { type: String, required: true },
  growth: { type: String, required: true },
  description: { type: String, required: true },
  channels: { type: [ChannelSchema], required: true },
  keyIndicators: { type: [KeyIndicatorSchema], required: true },
  relatedTrends: { type: [RelatedTrendSchema], required: true },
});

interface IIndustry extends Document {
  name: string;
  subcategories: string[];
}

const IndustrySchema: Schema = new Schema({
  name: { type: String, required: true },
  subcategories: { type: [String], required: true },
});

const CompanyData = mongoose.model<ICompanyData>('CompanyData', CompanyDataSchema);
const Industry = mongoose.model<IIndustry>('Industry', IndustrySchema);

export { CompanyData, Industry };
