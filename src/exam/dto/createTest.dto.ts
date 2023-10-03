import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTestDto {
  @ApiProperty({
    description: 'Course name of the test your creating',
    example: 'Computer Programming II',
  })
  @IsNotEmpty()
  @IsString()
  courseName: string;

  @ApiProperty({
    description: 'Course code of the test your creating',
    example: 'CSC 201',
  })
  @IsNotEmpty()
  @IsString()
  courseCode: string;

  @ApiProperty({
    description: 'Instructions you want to be displayed while taking test',
    example: 'Do not cheat',
  })
  @IsNotEmpty()
  @IsString()
  instructions: string;

  @ApiProperty({
    description: 'Duration of the test',
    example: 30,
  })
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
