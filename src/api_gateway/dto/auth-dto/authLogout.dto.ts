import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class LogoutDto {
    @IsNotEmpty()
    @ApiProperty({ type: String })
    username: string;
}