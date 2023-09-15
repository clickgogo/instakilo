import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable({})
export class UserPrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.USER_DATABASE_URL,
        },
      },
    });
  }
}
