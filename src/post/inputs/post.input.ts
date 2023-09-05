import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsUUID()
  ownerId: string;
  @Field()
  @IsString()
  ownerUserName: string;
  @Field((type) => [String])
  imageListUri: string[];
  @Field()
  @IsString()
  description: string;
}
