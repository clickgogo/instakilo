import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GatewayController } from './api_gateway.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PostModule } from 'src/post/post.module';
import { CommentService } from 'src/comment/comment.service';
import { LikesService } from 'src/likes/likes.service';
import { ThinkyModule } from 'src/likes/likes-thinky/thinky.module';

@Module({
  imports: [
    JwtModule,
    PostModule,
    ThinkyModule,
  ],
  controllers: [GatewayController],
  providers: [AuthService, UserService, CommentService, LikesService],
})
export class ApiGatewayModule {}
