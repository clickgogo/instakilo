import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserPrismaService } from 'src/user-prisma/user-prisma.service';
import { RegisterDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userPrisma: UserPrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: RegisterDto) {
    const hash: string = await argon.hash(dto.password);
    try {
      const user = await this.userPrisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          hash: hash,
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
    const user = await this.userPrisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Invalid email');

    const passwordMatch = await argon.verify(user.hash, dto.password);

    if (!passwordMatch) throw new ForbiddenException('Invalid password');

    return {
      message: 'User access successful',
      access_token: await this.signToken(user.id, user.email, user.username),
    };
  }

  async signToken(userId: string, email: string, username: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
      username
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
