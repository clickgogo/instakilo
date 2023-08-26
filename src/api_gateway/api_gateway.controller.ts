import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto, RegisterDto } from 'src/auth/dto';
import { FollowUserDto } from 'src/user/dto';
import { UserService } from 'src/user/user.service';

@Controller()
export class GatewayController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('signup')
  async signup(@Body() dto: RegisterDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('user/follow')
  follow(@Req() req: any, @Body() dto: FollowUserDto) {
    return this.userService.follow( req.user, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('user/unfollow')
  unfollow(@Req() req: any, @Body() dto: FollowUserDto) {
    return this.userService.unfollow(req.user, dto);
  }
}
