import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { PostService } from "./post.service";
import { Post } from "./types/index";
import { CreatePostInput } from "./inputs/create-post.input";
import { ModifyPostInput } from "./inputs/modify-post.input";

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => String)
  hello() {
    return "Hello developer";
  }

  @Query(() => [Post])
  async getAllPosts() {
    return await this.postService.getAllPosts();
  }

  @Query(() => [Post])
  async getAllPostsByUser(@Args("username") username: string) {
    return await this.postService.getAllPostsByUser(username);
  }

  @Mutation(() => Post)
  // @UseGuards(AtGuard)
  async createPost(
    @Args("input") input: CreatePostInput /*@User() user: any*/,
  ) {
    /*if (!isUserLoggedSameAsInput(user, input))
      throw new UnauthorizedException('Unauthorized');*/

    return this.postService.createPost(input);
  }

  @Mutation(() => Post)
  async modifyPostDescription(@Args("input") input: ModifyPostInput) {
    return this.postService.modifyPost(input);
  }
}
