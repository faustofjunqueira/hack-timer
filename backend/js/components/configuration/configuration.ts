import { Schema, model, Document, Model } from 'mongoose';

export interface IConfiguration extends Document {
  instagram: {
    auth: {
      code: string,
      clientId: string,
      clientSecret: string
    }
  };
}

const ConfigurationSchema: Schema = new Schema({
  instagram: {
    auth: {
      code: String,
      clientId: { type: String, unique: true },
      clientSecret: { type: String }
    }
  }
});

export const Configuration: Model<IConfiguration> = model<IConfiguration>('Configuration', ConfigurationSchema);
