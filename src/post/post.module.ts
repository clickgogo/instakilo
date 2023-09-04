import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostService } from './post.service';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost/instakilo-post-db')],
    providers: [PostService]
})
export class PostModule {}
