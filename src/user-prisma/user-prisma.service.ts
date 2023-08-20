import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable({})
export class UserPrismaService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: 'postgresql://postgres:thisIsMyBankPassword4Real@localhost:5432/instakiloUserDB?schema=public'
                },
            }
        })
    }
}
