import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @IsUUID("all")
  @ApiProperty({ type: String, description: "The Id of the user Posting" })
  ownerId: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "The username of the user Posting",
  })
  username: string;
  @IsNotEmpty()
  @ApiProperty({
    type: [String],
    description: "The url of the images posted",
  })
  imageUrlsList: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Post description",
  })
  description: string;
}
