import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Post {
    @Prop()
    postId: string;

    @Prop()
    imageUri: string;

    @Prop()
    description: string;

    @Prop()
    likes: number
}