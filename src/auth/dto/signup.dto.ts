import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator"

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

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
  password: string

  @IsString()
  name: string

  @IsString()
  surname: string
  
  @IsString()
  faculty: string

  @IsString()
  department: string
}