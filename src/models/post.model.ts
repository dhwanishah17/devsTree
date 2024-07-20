import { Schema, model, Document, Types } from 'mongoose';

export interface IPost extends Document {
    title: string;
    description: string;
    client: Types.ObjectId;
    recruiter: Types.ObjectId;
    notes: { recruiter: Types.ObjectId, note: string }[];
}

const postSchema = new Schema<IPost>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recruiter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    notes: [{ recruiter: { type: Schema.Types.ObjectId, ref: 'User' }, note: { type: String, required: true } }]
});

export const Post = model<IPost>('Post', postSchema);
