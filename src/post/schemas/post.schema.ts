import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsUUID } from 'class-validator';
import { Document } from 'mongoose';
import { v4 as UUID } from 'uuid';

export type PostDocument = Post & Document;
@Schema()
export class Post {
  @Prop({ default: UUID })
  postId: string;

  @Prop({ required: true })
  @IsUUID()
  ownerId: string;

  @Prop({ required: true })
  ownerUserName: string;

  @Prop({ required: true })
  imageUri: string[];

  @Prop({ default: ""})
  description: string;

  @Prop({
    default: 0,
  })
  likes: number;

  @Prop({
    default: Date.now,
  })
  createdAt: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);
