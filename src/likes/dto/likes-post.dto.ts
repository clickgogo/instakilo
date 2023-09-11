import { IsString, IsUUID } from "class-validator";

export class LikePostDto {
    @IsString()
    username: string;
    @IsUUID("all")
    userId: string;
    @IsUUID("all")
    postId: string;
}