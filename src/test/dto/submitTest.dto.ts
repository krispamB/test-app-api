import { IsArray, IsString } from 'class-validator';

export class SubmitTestDto {
  @IsArray()
  @IsString({
    each: true,
  })
  selectedOptions: string[];
}
