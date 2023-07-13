import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @IsString()
  @IsNotEmpty()
  question: string;
}
