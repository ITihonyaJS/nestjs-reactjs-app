import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/review.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const { movieId, rating, text } = dto;

    const newReview = await this.prismaService.review.create({
      data: {
        text,
        rating,
        movie: {
          connect: { id: movieId },
        },
      },
    });
    return newReview;
  }
}
