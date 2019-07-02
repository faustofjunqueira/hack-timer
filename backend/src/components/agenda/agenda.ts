import { Document, model, Model, Schema } from 'mongoose';

export interface IHackActivity extends Document
{
    start: Date;
    end: Date;
    title: string;
    description: string;
}

const HackActivitySchema = new Schema({
    start: { type: Date, required: true, unique: false },
    end: { type: Date, required: true, unique: false },
    title: { type: String, required: true, unique: false },
    description: { type: String, required: false, unique: false }
});

export const HackActivity: Model<IHackActivity> = model<IHackActivity>('HackActivity', HackActivitySchema);
