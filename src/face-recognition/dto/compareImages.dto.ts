import { IsArray, IsBase64, IsNotEmpty, IsString } from 'class-validator';

export class CompareImagesDto {
  @IsArray()
  @IsBase64({
    each: true,
  })
  gallery: string[];

  @IsArray()
  @IsBase64({
    each: true,
  })
  probe: string[];

  @IsNotEmpty()
  @IsString()
  search_mode: string;
}
