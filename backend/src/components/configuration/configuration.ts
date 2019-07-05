import { Schema, model, Document, Model } from 'mongoose';

export interface IConfiguration extends Document {
  timer: {
    maxDate: number,
    deadline: Date
  }
}

const ConfigurationSchema: Schema = new Schema({
  timer: {
    maxDate: Number,
    deadline: Date
  }
});

export const Configuration: Model<IConfiguration> = model<IConfiguration>('Configuration', ConfigurationSchema);
