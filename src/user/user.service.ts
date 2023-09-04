import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FollowUserDto, LoggedUserDto, ProfileDto } from './dto';
import { UserPrismaService } from 'src/user-prisma/user-prisma.service';
import { IUser, IUserAndFollowing, followOrUnfollow } from './types/index';

@Injectable()
export class UserService {
  constructor(private userPrisma: UserPrismaService) {}

  async checkIfUserAlreadyFollows(
    follower: FollowUserDto,
    options: followOrUnfollow,
  ) {
    const userFollowing: IUserAndFollowing =
      await this.userPrisma.user.findUnique({
        where: {
          username: follower.username,
        },
        include: {
          following: true,
        },
      });

    if (options == followOrUnfollow.follow)
      userFollowing.following.map((eachFollow) => {
        if (eachFollow.username == follower.username)
          throw new BadRequestException('Already follows the user');
      });

    if (options == followOrUnfollow.unfollow)
      if (!userFollowing)
        throw new BadRequestException('Does not follow the user already');

    return userFollowing;
  }

  async checkIfTargetUserExists(userToFollowReq: FollowUserDto) {
    const userToFollow = await this.userPrisma.user.findUnique({
      where: {
        username: userToFollowReq.username,
      },
    });

    if (!userToFollow) throw new ForbiddenException('no user found to follow');

    return userToFollow;
  }

  async addFollowingAndFollower(
    userFollowing: IUserAndFollowing,
    userToFollow: IUser,
  ) {
    const followingResponse = await this.userPrisma.following.create({
      data: {
        user: {
          connect: {
            username: userFollowing.username,
          },
        },
        following: userToFollow.username,
      },
    });

    return { followingResponse };
  }

  async removeFollowingAndFollower(
    userFollowing: IUserAndFollowing,
    userToUnfollow: IUser,
  ) {
    const unfollowResponse = await this.userPrisma.following.deleteMany({
      where: {
        user: {
          username: userFollowing.username,
        },
        following: userToUnfollow.username,
      },
    });

    return { unfollowResponse };
  }

  async follow(follower: FollowUserDto, userToFollowReq: FollowUserDto) {
    try {
      //check if user already follows and returns user info
      const userFollowing = await this.checkIfUserAlreadyFollows(
        follower,
        followOrUnfollow.follow,
      );

      //check if user exists
      const userToFollow = await this.checkIfTargetUserExists(userToFollowReq);

      //check if user requested to follow himself
      if(userFollowing.username === userToFollow.username) throw new BadRequestException("User can't follow self account")

      const { followingResponse } = await this.addFollowingAndFollower(
        userFollowing,
        userToFollow,
      );

      return {
        followingResponse,
      };
    } catch (error) {
      return error;
    }
  }

  async unfollow(follower: FollowUserDto, userToFollowReq: FollowUserDto) {
    try {
      console.log(follower.username, userToFollowReq.username);
      const userFollowing = await this.checkIfUserAlreadyFollows(
        follower,
        followOrUnfollow.unfollow,
      );

      const userToFollow = await this.checkIfTargetUserExists(userToFollowReq);

      const { unfollowResponse } = await this.removeFollowingAndFollower(
        userFollowing,
        userToFollow,
      );

      return {
        unfollowResponse,
      };
    } catch (error) {
      return { error };
    }
  }

  async updateProfile(user: LoggedUserDto, dto: ProfileDto) {
    return await this.userPrisma.profile.upsert({
      where: {
        username: user.username,
      },
      update: {
        bio: dto.bio,
        photo_url: dto.photo_url,
      },
      create: {
        user: {
          connect: {
            username: user.username,
          },
        },
        photo_url: dto.photo_url,
        bio: dto.bio,
      },
    });
  }

  async getProfile(username: string) {
    if (!username) {
      throw new BadRequestException('No Username provided in request');
    }
    const profile = await this.userPrisma.profile.findUnique({
      where: {
        username,
      },
    });

    if (!profile) throw new NotFoundException('No user found');

    return profile;
  }
}
