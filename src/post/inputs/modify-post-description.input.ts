import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ModifyPostDescriptionInput {
  @Field()
  @IsString()
  description?: string;
  @Field()
  postId: string;
}
