import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsNotEmpty()
  options: Option[];
}

export class Option {
  @IsString()
  @IsNotEmpty()
  option: string;

  @IsOptional()
  isCorrect?: boolean;
}
