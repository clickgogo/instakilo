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

  async checkIfUserAlreadyFollows(follower: FollowerUserDto) {
    const followerUser = await this.userPrisma.user.findUnique({
      where: {
        username: follower.username,
      },
      include: {
        following: true,
      },
    });

    return followerUser;
  }

  async checkIfUserToFollowOrUnfollowExists(userFollowed: FollowUserDto) {
    const userToFollow = await this.userPrisma.user.findUnique({
      where: {
        username: userFollowed.username,
      },
    });

    if (!userToFollow) throw new ForbiddenException('no user found to follow');

    return userToFollow;
  }

  async addFollowingAndFollower(followerUser: any, userToFollow: any) {
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

    return { followerResponse, followingResponse };
  }

  async removeFollowingAndFollower(followerUser: any, followingUser: any) {
    const followerResponse = await this.userPrisma.follower.delete({
      where: {
        followerUser: {
          followerUser,
        },
        followerUsername: followerUser.username,
      } as any,
    });
    console.log(followerResponse);

    const followingResponse = await this.userPrisma.following.delete({
      where: {
        followingUser: {
          followerUser,
        },
        followingUsername: followingUser.username,
      } as any,
    });

    return { followerResponse, followingResponse };
  }

  async follow(userFollowed: FollowUserDto, follower: FollowerUserDto) {
    try {
      //check if user already follows
      const followerUser = await this.checkIfUserAlreadyFollows(follower);

      followerUser.following.map(eachFollow => {
        if(eachFollow.followingUsername == follower.username) {
          throw new BadRequestException('Already follows the user');
        }
      })

      //check if user exists
      const userToFollow =
        await this.checkIfUserToFollowOrUnfollowExists(userFollowed);

      const { followerResponse, followingResponse } =
        await this.addFollowingAndFollower(followerUser, userToFollow);

      return {
        followerResponse,
        followingResponse,
      };
    } catch (error) {
      return error;
    }
  }

  async unfollow(userFollowed: FollowUserDto, follower: FollowerUserDto) {
    try {
      const followerUser = await this.checkIfUserAlreadyFollows(follower);

      followerUser.following.map(eachFollow => {
        if(eachFollow.followingUsername === userFollowed.username) throw new BadRequestException('Already follows the user');
      })

      const userToFollow =
        await this.checkIfUserToFollowOrUnfollowExists(userFollowed);

      const { followerResponse, followingResponse } =
        await this.removeFollowingAndFollower(followerUser, userToFollow);

      console.log(followerResponse, followingResponse);

      return {
        followerResponse,
        followingResponse,
      };
    } catch (error) {
      return { error };
    }
  }
}
