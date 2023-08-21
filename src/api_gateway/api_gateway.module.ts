import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GatewayController } from './api_gateway.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule],
    controllers: [GatewayController],
    providers: [AuthService]
})
export class ApiGatewayModule {}
