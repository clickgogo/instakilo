import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostDto {
  @Field()
  postId: string;
  @Field()
  ownerId: string;
  @Field()
  ownerUserName: string;
  @Field((type) => [String])
  imageListUri: string[];
  @Field()
  description: string;
  @Field()
  likes: number;
  @Field()
  createdAt: string;
}
