import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class FollowerUserDto {

    @IsNotEmpty()
    @IsString()
    userId: string;
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsNotEmpty()
    @IsEmail()
    email: string;
}