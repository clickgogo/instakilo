import { IsNotEmpty, IsString, IsUrl } from "class-validator";


export class ProfileDto {
    @IsString()
    bio: string;
    @IsString()
    @IsUrl()
    photo_url: string;
}