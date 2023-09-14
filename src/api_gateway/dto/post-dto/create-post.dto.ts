import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @IsUUID("all")
  @ApiProperty({
    type: String,
    description: "The Id of the user Posting",
    example: "c63f1797-4bb0-4791-a84e-bd889f643a10",
  })
  ownerId: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "The username of the user Posting",
    example: "Zukaborg",
  })
  username: string;
  @IsNotEmpty()
  @ApiProperty({
    type: [String],
    description: "The url of the images posted",
    example: ["www.random-url.com/img1", "www.random-url.com/img2"],
  })
  imageUrlsList: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "Post description",
    example: "Our workspace at FaceNoteBook",
  })
  description: string;
}
