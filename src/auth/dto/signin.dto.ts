import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Email for user',
    example: 'example@swagger.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for user',
    example: 'bl4ckA$s',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
