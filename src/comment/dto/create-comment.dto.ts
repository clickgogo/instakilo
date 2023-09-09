import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCommentDto {
    @IsUUID("all")
    postId: string;
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsString()
    comment: string;
}