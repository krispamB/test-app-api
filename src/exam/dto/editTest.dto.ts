import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class editTestDto {
  @ApiProperty({
    description: 'Course name of the test your creating',
    example: 'Computer Programming II',
  })
  @IsOptional()
  @IsString()
  courseName?: string;

  @ApiProperty({
    description: 'Course code of the test your creating',
    example: 'CSC 201',
  })
  @IsOptional()
  @IsString()
  courseCode?: string;

  @ApiProperty({
    description: 'Instructions you want to be displayed while taking test',
    example: 'Do not cheat',
  })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiProperty({
    description: 'Duration of the test',
    example: 30,
  })
  @IsOptional()
  @IsNumber()
  duration?: number;
}
