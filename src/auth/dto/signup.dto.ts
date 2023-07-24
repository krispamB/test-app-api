import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({
    description: 'The an email for the user',
    example: 'example@swagger.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password for user',
    example: 'bl4ckA$s',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).{8,64}$/gm,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, a number, and a special character',
    },
  )
  password: string;

  @ApiProperty({
    description: 'The users name',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The users surname',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  surname: string;

  @ApiProperty({
    description: 'The faculty user belongs to',
    example: 'Swagger Faculty',
  })
  @IsNotEmpty()
  @IsString()
  faculty: string;

  @ApiProperty({
    description: 'The department user belongs to',
    example: 'Swagger Department',
  })
  @IsNotEmpty()
  @IsString()
  department: string;
}
