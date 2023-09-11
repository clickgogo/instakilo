import { Inject, Injectable } from '@nestjs/common';
import PostLikes from './models/post-likes.model';
import { LikePostDto } from './dto';

@Injectable()
export class LikesService {
    constructor(@Inject('RETHINKDB_CONNECTION') private readonly rethinkdb){
    
    }

    async getAll(){ 
        return await PostLikes.run()
    }

    async newPostLike(input: LikePostDto) {
        const newLike = new PostLikes(input);
        return await newLike.save();
      }
}
