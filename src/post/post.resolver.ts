import { Resolver, Query } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './schemas/post.schema';

@Resolver("Query")
export class PostResolver {
  constructor(private postService: PostService) {}

  @Query(() => String)
  hello(): string {
    return "Hello developer";
  }
}
