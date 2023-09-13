import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class LikePostDto {
  @IsString()
  @ApiProperty({
    type: String,
    description: "The UUID of the user liking a post",
  })
  username: string;
  @IsUUID("all")
  @ApiProperty({
    type: String,
    description: "The username of the user liking a post",
  })
  userId: string;
  @IsUUID("all")
  @ApiProperty({
    type: String,
    description: "The UUID of the post to like",
  })
  postId: string;
}
