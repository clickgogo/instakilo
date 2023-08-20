import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserPrismaModule } from "../user-prisma/user-prisma.module";

@Module({
    providers: [AuthService]
})
export class AuthModule{}