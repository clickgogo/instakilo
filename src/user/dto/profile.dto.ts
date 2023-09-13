import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl } from "class-validator";


export class ProfileDto {
    @IsString()
    @ApiProperty({
        type: String,
        description: "Profile Bio",
      })
    bio: string;
    @IsString()
    @IsUrl()
    @ApiProperty({
        type: String,
        description: "Profile picture URL",
      })
    photo_url: string;
}