import { IsString } from 'class-validator';

export class CreateCandidateDto {
  @IsString()
  matric_number: string;

  @IsString()
  fullname: string;
}
