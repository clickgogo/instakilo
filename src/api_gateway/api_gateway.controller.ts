import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto, RegisterDto } from 'src/auth/dto';
import { FollowUserDto, ProfileDto } from 'src/user/dto';
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

  @UseGuards(AuthGuard('jwt'))
  @Put('user/profile')
  profile(@Req() req: any, @Body() dto: ProfileDto) {
    return this.userService.updateProfile(req.user, dto);
  }

  @Get('user/profile/:username')
  getProfile(@Req() req: any, @Param('username') username: string) {
    return this.userService.getProfile(username);
  }
}
