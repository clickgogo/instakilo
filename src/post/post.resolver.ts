import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { PostService } from "./post.service";
import { PostDto } from "../api_gateway/dto/index";
import { CreatePostInput } from "./inputs/create-post.input";
import { ModifyPostInput } from "./inputs/modify-post.input";
import { AtGuard, GraphqlAtGuard, User } from "src/common";
import { UnauthorizedException, UseGuards } from "@nestjs/common";

@Resolver()
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => String)
  hello() {
    return "Hello developer";
  }

  @Query(() => [PostDto])
  async getAllPosts() {
    return await this.postService.getAllPosts();
  }

  @Query(() => [PostDto])
  async getAllPostsByUser(@Args("username") username: string) {
    return await this.postService.getAllPostsByUser(username);
  }

  @Mutation(() => PostDto)
  // @UseGuards(AtGuard)
  async createPost(
    @Args("input") input: CreatePostInput /*@User() user: any*/,
  ) {
    /*if (!isUserLoggedSameAsInput(user, input))
      throw new UnauthorizedException('Unauthorized');*/

    return this.postService.createPost(input);
  }

  @Mutation(() => PostDto)
  async modifyPostDescription(@Args("input") input: ModifyPostInput) {
    return this.postService.modifyPost(input);
  }
}
function isUserLoggedSameAsInput(user: any, input: any) {
  return user.username === input;
}
