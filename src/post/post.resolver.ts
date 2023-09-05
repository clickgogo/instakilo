import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostDto } from './dto/create-post.dto';
import { CreatePostInput } from './inputs/post.input';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => String)
  hello() {
    return 'Hello developer';
  }

  @Query(() => [PostDto])
  async getAllPosts() {
    return await this.postService.getAllPosts();
  }

  @Mutation(() => PostDto)
  async createPost(@Args('input') input: CreatePostInput) {
    return this.postService.createPost(input);
  }
}
