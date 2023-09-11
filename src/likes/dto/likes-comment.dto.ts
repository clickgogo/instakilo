import { IsString, IsUUID } from "class-validator";

export class LikeCommentDto {
    @IsString()
    username: string;
    @IsUUID("all")
    userId: string;
    @IsUUID("all")
    commentId: string;
}