import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { FollowUserDto, FollowerUserDto } from './dto';
import { UserPrismaService } from 'src/user-prisma/user-prisma.service';

@Injectable()
export class UserService {
  constructor(private userPrisma: UserPrismaService) {}

  async checkIfUserAlreadyFollows(userFollowed: FollowUserDto, follower: FollowerUserDto){
    const followerUser = await this.userPrisma.user.findUnique({
      where: {
        username: follower.username,
      },
      include: {
        followers: true,
      },
    });

    if (userFollowed.username in followerUser.followers)
      throw new BadRequestException('Already follows the user');

      return followerUser
  }

  async checkIfUserToFollowExists(userFollowed: FollowUserDto){
    const userToFollow = await this.userPrisma.user.findUnique({
      where: {
        username: userFollowed.username,
      },
    });

    if (!userToFollow)
      throw new ForbiddenException('no user found to follow');

      return userToFollow
  }

  async addFollowingAndFollower(followerUser: any, userToFollow: any){
    const followerResponse = await this.userPrisma.follower.create({
      data: {
        followerUser: {
          connect: {
            username: userToFollow.username,
          },
        },
      },
    });

    const followingResponse = await this.userPrisma.following.create({
      data: {
        followingUser: {
          connect: {
            username: followerUser.username,
          },
        },
      },
    });

    return {followerResponse, followingResponse}
  }

  async follow(userFollowed: FollowUserDto, follower: FollowerUserDto) {
    try {
      //check if user already follows
      const followerUser = await this.checkIfUserAlreadyFollows(userFollowed, follower)

      //check if user exists
      const userToFollow = await this.checkIfUserToFollowExists(userFollowed)

      const { followerResponse, followingResponse } = await this.addFollowingAndFollower(followerUser, userToFollow)

      return {
        followerResponse,
        followingResponse,
      };
    } catch (error) {
      return error;
    }
  }

  unfollow(userFollowed: FollowUserDto, follower: FollowerUserDto) {}
}
