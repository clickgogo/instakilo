import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;
const now: string = new Date().toISOString().split('T')[0];
@Schema()
export class Post {
  @Prop()
  postId: string;

  @Prop()
  ownerId: string;
  
  @Prop()
  ownerUserName: string;

  @Prop()
  imageUri: string;

  @Prop()
  description: string;

  @Prop({
    default: 0,
  })
  likes: number;

  @Prop({
    default: now,
  })
  createdAt: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
