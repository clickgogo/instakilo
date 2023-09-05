import { Injectable } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PostModule } from './post.module';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel('Post') private readonly postModel: Model<Post>) {}

  async createPost(post: Post): Promise<Post> {
    const createdPost = new this.postModel(post);
    return createdPost.save();
  }

  async getPosts(): Promise<Post[]> {
    return this.postModel.find().exec();
  }
}

/*async function bootstrap() {
  const app = await NestFactory.create(PostModule);
  await app.listen(3301); // Listen on a different port than the API Gateway
}
bootstrap();*/
