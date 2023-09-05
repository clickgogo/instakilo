import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostInput } from './inputs/post.input';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async createPost(postInput: CreatePostInput): Promise<Post> {
    const newPost = new this.postModel({
      ownerId: postInput.ownerId,
      ownerUserName: postInput.ownerUserName,
      imageListUri: postInput.imageListUri,
      description: postInput.description,
    });
    return await newPost.save();
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }
}
