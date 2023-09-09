import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostInput } from './inputs/create-post.input';
import { ModifyPostInput } from './inputs/modify-post.input';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async createPost(postInput: CreatePostInput): Promise<Post> {
    const data = {
      ownerId: postInput.ownerId,
      ownerUserName: postInput.ownerUserName,
      imageListUri: postInput.imageListUri,
      description: postInput.description,
    };
    const newPost = new this.postModel(data);
    return await newPost.save();
  }

  async modifyPost(input: ModifyPostInput) {
    const filter = {
      postId: input.postId,
    };
    const data = {
      description: input.description,
    };
    const changedPost = await this.postModel
      .findOneAndUpdate(filter, data)
      .getUpdate();

    return changedPost;
  }

  async getAllPosts(): Promise<Post[]> {
    const results = await this.postModel.find().exec();
    return results;
  }

  async getAllPostsByUser(username: string) {
    const filter = { ownerUserName: username };
    const results = await this.postModel.find(filter);
    return results;
  }

  async clearDB() {
    return await this.postModel.deleteMany({});
  }
}
