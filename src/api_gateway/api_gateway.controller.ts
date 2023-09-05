import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService, LoginDto, RegisterDto } from 'src/auth/index';
import { User, AtGuard, RtGuard } from 'src/common/index';
import { FollowUserDto, ProfileDto, UserService } from 'src/user/index';
@Controller()
export class GatewayController {
  private readonly postServiceClient: ApolloClient<unknown>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    config: ConfigService
  ) {
    this.postServiceClient = new ApolloClient({
      uri: config.get('GRAPHQL_URL') || 'http://localhost:3300/graphql',
      cache: new InMemoryCache(),
    });
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() dto: RegisterDto) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.CREATED)
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@User() user: any) {
    return this.authService.logout(user);
  }

  @UseGuards(RtGuard)
  @Post('/refresh-token')
  refresh(@User() user: any) {
    return this.authService.refreshToken(user);
  }

  @UseGuards(AtGuard)
  @Post('user/follow')
  @HttpCode(HttpStatus.CREATED)
  follow(@User() user: any, @Body() dto: FollowUserDto) {
    return this.userService.follow(user, dto);
  }

  @UseGuards(AtGuard)
  @Post('user/unfollow')
  @HttpCode(HttpStatus.OK)
  unfollow(@User() user: any, @Body() dto: FollowUserDto) {
    return this.userService.unfollow(user, dto);
  }

  @UseGuards(AtGuard)
  @Put('user/profile')
  updateProfile(@User() user: any, @Body() dto: ProfileDto) {
    return this.userService.updateProfile(user, dto);
  }

  @Get('user/profile/:username')
  getProfile(@User() user: any, @Param('username') username: string) {
    return this.userService.getProfile(username);
  }

  @Get('post/hello')
  async getHello() {
    try {
      const { data } = await this.postServiceClient.query({
      query: gql`
      query{
        hello
      }`,
    });
    return data;
    } catch (error) {
      return error
    }
  }
}
