import { IsEmail, IsNotEmpty } from "class-validator";


export class LogoutDto {
    @IsNotEmpty()
    username: string;
}