import { Field, InputType } from '@nestjs/graphql';
import { ArrayMinSize, IsArray, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsUUID()
  ownerId: string;
  @Field()
  @IsString()
  ownerUserName: string;
  @Field((type) => [String])
  @IsArray()
  @ArrayMinSize(1)
  @IsString({each: true})
  imageListUri: string[];
  @Field()
  @IsString()
  description: string;
}
