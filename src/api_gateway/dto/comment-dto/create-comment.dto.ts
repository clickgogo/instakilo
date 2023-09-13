import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCommentDto {
    @IsUUID("all")
    postId: string;
    @IsUUID("all")
    userId: string;
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    comment: string;
}