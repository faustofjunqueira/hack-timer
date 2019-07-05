import { Schema, model, Document, Model } from 'mongoose';

export interface IMedia extends Document {
  date: Date,
  profile: {
    name: string,
    media: string,
    id: string
  },
  id: string,
  text: string,
  media?: string
}

const MediaSchema: Schema = new Schema({
  date: Date,
  profile: {
    name: String,
    media: String,
    id: String
  },
  id: String,
  text: String,
  media: String
});

export const Media: Model<IMedia> = model<IMedia>('Media', MediaSchema);