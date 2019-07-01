import { Schema, model } from 'mongoose';

const ConfigurationSchema: Schema = new Schema({
  instagram: {
    auth: {
      code: String,
      clientId: { type: String, unique: true },
      clientSecret: { type: String }
    }
  }
});

export const Configuration = model('Configuration', ConfigurationSchema);