import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreatePostInput } from './inputs/create-post.input';
import { ModifyPostDescriptionInput } from './inputs/modify-post-description.input';

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => String)
  hello() {
    return 'Hello developer';
  }

  @Query(() => [CreatePostDto])
  async getAllPosts() {
    return await this.postService.getAllPosts();
  }

  @Query(() => [CreatePostDto])
  async getAllPostsByUser(@Args('username') username: string) {
    return await this.postService.getAllPostsByUser(username);
  }

  @Mutation(() => CreatePostDto)
  async createPost(@Args('input') input: CreatePostInput) {
    return this.postService.createPost(input);
  }
  @Mutation(() => CreatePostDto)
  async modifyPostDescription(
    @Args('input') input: ModifyPostDescriptionInput,
  ) {
    return this.postService.modifyPostDescription(input);
  }
}
