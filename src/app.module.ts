import { Module } from "@nestjs/common";
import { AuthModule } from "./common/auth/auth.module";
import {
  UserModule,
  UserPrismaModule,
  LikesModule,
  CommentModule,
  PostModule,
  feed,
} from "./modules/index";
import { ApiGatewayModule } from "./api_gateway/api_gateway.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    CommentModule,
    feed,
    ApiGatewayModule,
    UserPrismaModule,
    LikesModule,
    PostModule,
  ],
})
export class AppModule {}
