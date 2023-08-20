import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { AuthDto } from "src/auth/dto";

@Controller()
export class GatewayController{
    constructor(private authService: AuthService) {}
 
    @Post('signup')
    async signup(@Body() dto: AuthDto){
        return this.authService.signup(dto)
    }

    @Post('login')
    login(){
        return this.authService.login()
    }
}