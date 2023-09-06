import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GatewayController } from './api_gateway.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [
    JwtModule,
    PostModule
  ],
  controllers: [GatewayController],
  providers: [AuthService, UserService],
})
export class ApiGatewayModule {}
