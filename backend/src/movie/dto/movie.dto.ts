import { IsNotFutureYear } from '@/common/validators/is-not-future-year.validator';
import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNotFutureYear()
  releaseYear: number;

  @IsString()
  posterUrl: string;

  @IsArray()
  @IsUUID('4', { each: true })
  actorsIds: string[];
}
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
