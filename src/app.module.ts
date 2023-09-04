import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { feed } from './feed/feed.module';
import { ApiGatewayModule } from './api_gateway/api_gateway.module';
import { UserPrismaModule } from './user-prisma/user-prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    feed,
    ApiGatewayModule,
    UserPrismaModule,
  ],
})
export class AppModule {}
