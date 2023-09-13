import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class LikeCommentDto {
    @IsString()
    @ApiProperty({
        type: String,
        description: "The UUID of the user liking a comment",
      })
    username: string;
    @IsUUID("all")
    @ApiProperty({
        type: String,
        description: "The username of the user liking a comment",
      })
    userId: string;
    @IsUUID("all")
    @ApiProperty({
        type: String,
        description: "The UUID of the comment to like",
      })
    commentId: string;
}