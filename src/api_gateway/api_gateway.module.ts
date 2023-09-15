import { Module } from "@nestjs/common";
import { AuthService } from "src/common/auth/auth.service";
import { GatewayController } from "./api_gateway.controller";
import { JwtModule } from "@nestjs/jwt";
import {
  UserService,
  PostModule,
  CommentService,
  LikesService,
  ThinkyModule,
} from "../modules/index";
import { ApiGatewayService } from "./api_gateway.service";

@Module({
  imports: [JwtModule, PostModule, ThinkyModule],
  controllers: [GatewayController],
  providers: [
    AuthService,
    UserService,
    CommentService,
    LikesService,
    ApiGatewayService,
  ],
})
export class ApiGatewayModule {}
