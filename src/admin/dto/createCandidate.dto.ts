import { IsArray, IsString } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  matric_number: string;

  @IsString()
  fullname: string;

  @IsArray()
  images: string[];
}
