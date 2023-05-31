import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTestDto {
  @IsNotEmpty()
  @IsString()
  courseName: string;

  @IsNotEmpty()
  @IsString()
  courseCode: string;

  @IsNotEmpty()
  @IsString()
  instructions: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
