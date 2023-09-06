import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class modifyPostDto {
  @Field()
  description?: string;
}
