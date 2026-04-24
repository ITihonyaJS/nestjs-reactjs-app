import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  text: string;

  @IsNumber()
  rating: number;

  @IsUUID('4')
  movieId: string;
}
