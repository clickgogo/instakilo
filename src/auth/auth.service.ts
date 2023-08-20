import { Injectable } from "@nestjs/common";
import { UserPrismaService } from "src/user-prisma/user-prisma.service";
import { AuthDto } from "./dto";
import { randomUUID } from "crypto";
import * as argon from "argon2"

@Injectable()
export class AuthService{
    constructor(private userPrisma: UserPrismaService){}
    
    async signup(dto: AuthDto) {
        const hash: string = await argon.hash(dto.password)
        const user = await this.userPrisma.user.create({
            data: {
                username: dto.username,
                email: dto.email,
                hash: hash,
            }
        })
        return {
            "message": "User Registered successfully",
            "userId": user.id
        }
    }

    login() {
        return "successful"
    }
}