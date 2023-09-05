import { Document } from 'mongoose';

export interface Post extends Document {
  readonly postId: string;
  readonly ownerId: string;
  readonly ownerUserName: string;
  readonly imageUri: string;
  readonly description: string;
  readonly likes: number;
  readonly createdAt: string;
}
