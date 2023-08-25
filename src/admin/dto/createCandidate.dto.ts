import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  matric_number: string;

  @IsString()
  fullname: string;

  @IsArray()
  images: string[];

  @IsOptional()
  dateOfBirth: string;

  @IsOptional()
  nationality: string;

  @IsOptional()
  gender: string;
}
