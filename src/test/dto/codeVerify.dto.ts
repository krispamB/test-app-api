import { IsNotEmpty, IsString } from 'class-validator';

export class CodeVerifyDto {
  @IsNotEmpty()
  @IsString()
  code: string;
}
