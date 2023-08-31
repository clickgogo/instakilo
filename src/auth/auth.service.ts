import {
  ForbiddenException,
  InternalServerErrorException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { UserPrismaService } from 'src/user-prisma/user-prisma.service';
import { RegisterDto, LoginDto, LogoutDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private userPrisma: UserPrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: RegisterDto) {
    const hash: string = await this.hashData(dto.password);
    try {
      const user = await this.userPrisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          hash: hash,
          //hashedRefreshToken: null
        },
      });

      return {
        message: 'User Registered successfully',
        userId: user.id,
      };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Username or email already exist');
        }
      }
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.userPrisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) throw new ForbiddenException('Invalid email');

      const passwordMatch = await this.verifyHash(user.hash, dto.password);

      if (!passwordMatch) throw new ForbiddenException('Invalid password');

      const { accessToken, refreshToken } = await this.getTokens(
        user.id,
        user.email,
        user.username,
      );

      //save refresh token to db
      await this.updateRefreshToken(user.id, refreshToken);

      return {
        message: 'User access successful',
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException({ error });
    }
  }

  async logout(dto: LogoutDto) {
    try {
      return await this.userPrisma.user.update({
        where: {
          username: dto.username,
          hashedRefreshToken: {
            not: null,
          },
        },
        data: {
          hashedRefreshToken: null,
        },
      });
    } catch (error) {
      if (error.code == 'P2025')
        throw new BadRequestException('User already Logged out');
    }
  }

  async getTokens(
    uuid: string,
    email: string,
    username: string,
  ): Promise<tokens> {
    const [accessToken, refreshToken] = await Promise.all([
      await this.jwt.signAsync(
        {
          uuid,
          email,
          username,
        },
        {
          secret: this.config.get('JWT_SECRET'),
          expiresIn: 60 * 15,
        },
      ),
      await this.jwt.signAsync(
        {
          uuid,
          email,
          username,
        },
        {
          secret: this.config.get('REFRESH_JWT_SECRET'),
          //one week expiration
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    try {
      const hashedRefreshToken = await this.hashData(refreshToken);
      await this.userPrisma.user.update({
        where: {
          id,
        },
        data: {
          hashedRefreshToken,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  hashData(data: string): Promise<string> {
    return argon.hash(data);
  }

  verifyHash(password1: string, password2: string): Promise<boolean> {
    return argon.verify(password1, password2);
  }
}
