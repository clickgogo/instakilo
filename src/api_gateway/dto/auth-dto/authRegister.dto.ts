import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegistrationDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  username: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;
  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}
