import { IsNotFutureYear } from '@/common/validators/is-not-future-year.validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Название фильма',
    example: '1+1',
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Год фильма',
    example: 2016,
    type: 'number',
  })
  @IsNotEmpty()
  @IsNotFutureYear()
  releaseYear: number;

  @ApiPropertyOptional({
    description: 'Ссылка на постер',
    example: 'https://storage.xyz/1+1/poster/image/123456',
    type: String,
  })
  @IsString()
  posterUrl?: string;

  @ApiProperty({
    description: 'ID актёров',
    example: ['123456789', '987654321'],
    type: [String],
  })
  @IsArray()
  @IsUUID('4', { each: true })
  actorsIds: string[];
}
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
