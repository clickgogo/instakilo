import { IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class NewPostDto {
    @IsNotEmpty()
    @IsUUID("all")
    ownerId: string;
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    imageUrlsList: string;
    @IsNotEmpty()
    @IsString()
    description: string;

}