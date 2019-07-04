import { Schema, model, Document, Model } from 'mongoose';

export interface IConfiguration extends Document {
  instagram: {
    auth: {
      code: string,
      accessToken: string,
      clientId: string,
      clientSecret: string
    }
  },
  twitter: {
    auth: {
      consumerKey: string,
      consumerSecret: string,
      accessToken: string
    },
    query: string,
    sinceId: number
  }
}

const ConfigurationSchema: Schema = new Schema({
  instagram: {
    auth: {
      code: String,
      accessToken: String,
      clientId: { type: String, unique: true },
      clientSecret: { type: String }
    }
  },
  twitter: {
    auth: {
      consumerKey: { type: String, unique: true },
      consumerSecret: String,
      accessToken: String
    },
    query: String,
    sinceId: { type: Number, default: 0 }
  }
});

export const Configuration: Model<IConfiguration> = model<IConfiguration>('Configuration', ConfigurationSchema);
