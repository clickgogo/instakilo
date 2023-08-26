import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { FollowUserDto } from './dto';
import { UserPrismaService } from 'src/user-prisma/user-prisma.service';
import { IUser, IUserAndFollowing } from './types/index';

@Injectable()
export class UserService {
  constructor(private userPrisma: UserPrismaService) {}

  async checkIfUserAlreadyFollows(follower: FollowUserDto) {
    const userFollowing: IUserAndFollowing =
      await this.userPrisma.user.findUnique({
        where: {
          username: follower.username,
        },
        include: {
          following: true,
        },
      });

    userFollowing.following.map((eachFollow) => {
      if (eachFollow.username == follower.username)
        throw new BadRequestException('Already follows the user');
    });

    return userFollowing;
  }

  async checkIfUserToFollowOrUnfollowExists(userToFollowReq: FollowUserDto) {
    const userToFollow = await this.userPrisma.user.findUnique({
      where: {
        username: userToFollowReq.username,
      },
    });

    if (!userToFollow) throw new ForbiddenException('no user found to follow');

    return userToFollow;
  }

  async addFollowingAndFollower(  userFollowing: IUserAndFollowing, userToFollow: IUser) {
    const followingResponse = await this.userPrisma.following.create({
      data: {
        user: {
            connect: {
              username: userFollowing.username,
            }
        },
        following: userToFollow.username
      },
    });

    return { followingResponse };
  }

  async removeFollowingAndFollower(followerUser: any, followingUser: any) {
    const followerResponse = await this.userPrisma.following.delete({
      where: {
        id: 1,
      },
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

  async follow(follower: FollowUserDto, userToFollowReq: FollowUserDto) {
    try {
      //check if user already follows and returns user info
      const userFollowing = await this.checkIfUserAlreadyFollows(follower);

      //check if user exists
      const userToFollow =
        await this.checkIfUserToFollowOrUnfollowExists(userToFollowReq);

      const { followingResponse } =
        await this.addFollowingAndFollower(userFollowing, userToFollow);

      return {
        followingResponse
      };
    } catch (error) {
      return error;
    }
  }
/*
  async unfollow(userFollowed: FollowUserDto, follower: FollowerUserDto) {
    try {
      let isUserFollowed = false;
      const followedUser = await this.checkIfUserAlreadyFollows(userFollowed);

      for (let eachFollower of followedUser.followers) {
        if (eachFollower.followerUsername !== follower.username) {
          isUserFollowed = true;
          break;
        }
      }

      if (!isUserFollowed)
        throw new BadRequestException('Does not follow the user already');

      const userToFollow =
        await this.checkIfUserToFollowOrUnfollowExists(userFollowed);

      console.log(followedUser);
      const { followerResponse, followingResponse } =
        await this.removeFollowingAndFollower(followedUser, userToFollow);

      console.log(followerResponse, followingResponse);

      return {
        followerResponse,
        followingResponse,
      };
    } catch (error) {
      return { error };
    }
  }*/
}
