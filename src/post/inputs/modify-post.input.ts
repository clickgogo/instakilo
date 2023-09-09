import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ModifyPostInput {
  @Field()
  @IsString()
  ownerUserName?: string;
  @Field()
  @IsString()
  description?: string;
  @Field()
  postId: string;
}
