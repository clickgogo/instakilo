import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GatewayController } from './api_gateway.controller';

@Module({
    controllers: [GatewayController],
    providers: [AuthService]
})
export class ApiGatewayModule {}
