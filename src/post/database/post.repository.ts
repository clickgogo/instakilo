import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Post, PostDocument } from "../schemas/post.schema";
import { Model } from "mongoose";

@Injectable()
export class PostRepository {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>){}

    async createPost(post: Post){
        const newPost = await this.postModel.create(post);
        return newPost.save();
    }

    async findOnePost(){}

    async findAllPostsFromUser(username: string): Promise<Post[]>{
        return await this.postModel.find({ ownerUserName: username }).exec();
    }

    async editPostDescription(){}

    async deleteOnePost(){}
}