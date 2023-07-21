import { IsNotEmpty, IsString } from 'class-validator';

export class FaceVerifyDto {
  @IsNotEmpty()
  @IsString()
  matric_number: string;
}
