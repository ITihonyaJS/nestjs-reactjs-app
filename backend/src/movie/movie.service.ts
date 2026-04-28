import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Movie } from '@prisma/client';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.movie.findMany({
      select: {
        id: true,
        title: true,
        actors: {
          select: { name: true, id: true },
        },
        reviews: {
          select: { id: true, text: true },
        },
        poster: {
          select: { id: true, url: true },
        },
      },
    });
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id },
      include: { actors: true, poster: true },
    });
    if (!movie) {
      throw new NotFoundException(`Фильм с id ${id} не найден`);
    }
    return movie;
  }
  async create(dto: CreateMovieDto): Promise<Movie> {
    const { actorsIds, releaseYear, posterUrl, title } = dto;
    const actors = await this.prismaService.actor.findMany({
      where: { id: { in: actorsIds } },
    });
    if (!actors || !actors.length) {
      throw new NotFoundException('Один или несколько актёров не найдены');
    }
    const movie = await this.prismaService.movie.create({
      data: {
        title: title,
        releaseYear: releaseYear,
        actors: {
          connect: actors.map((actor) => ({ id: actor.id })),
        },
        poster: posterUrl
          ? {
              create: {
                url: posterUrl,
              },
            }
          : undefined,
      },
    });
    return movie;
  }

  async put(id: string, dto: CreateMovieDto): Promise<Movie> {
    const { title, releaseYear, posterUrl, actorsIds } = dto;

    return this.prismaService.movie.update({
      where: { id },
      data: {
        title,
        releaseYear,

        actors: {
          set: actorsIds.map((id) => ({ id })),
        },

        poster: posterUrl
          ? {
              upsert: {
                create: { url: posterUrl },
                update: { url: posterUrl },
              },
            }
          : {
              delete: true,
            },
      },
    });
  }

  async patch(id: string, dto: UpdateMovieDto): Promise<Movie> {
    return this.prismaService.movie.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.releaseYear !== undefined && {
          releaseYear: dto.releaseYear,
        }),

        ...(dto.actorsIds && {
          actors: {
            set: dto.actorsIds.map((id) => ({ id })),
          },
        }),

        ...(dto.posterUrl !== undefined && {
          poster: dto.posterUrl
            ? {
                upsert: {
                  create: { url: dto.posterUrl },
                  update: { url: dto.posterUrl },
                },
              }
            : {
                delete: true,
              },
        }),
      },
    });
  }

  async delete(id: string): Promise<string> {
    await this.prismaService.movie.delete({
      where: { id },
    });

    return id;
  }
}
