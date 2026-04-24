import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { In, Repository } from 'typeorm';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import { ActorEntity } from '@/actor/entities/actor.entity';
import { PosterEntity } from './entities/poster.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @InjectRepository(PosterEntity)
    private readonly posterRepository: Repository<PosterEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      relations: {
        actors: true,
        reviews: true,
        poster: true,
      },
    });
  }

  async findById(id: string): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['actors'],
    });
    if (!movie) {
      throw new NotFoundException(`Фильм с id ${id} не найден`);
    }
    return movie;
  }

  async create(dto: CreateMovieDto): Promise<MovieEntity> {
    const { actorsIds, releaseYear, posterUrl, title } = dto;
    const actors = await this.actorRepository.find({
      where: { id: In(actorsIds) },
    });

    if (!actors || !actors.length) {
      throw new NotFoundException('Один или несколько актёров не найдены');
    }

    const movie = this.movieRepository.create({
      title: title,
      releaseYear: releaseYear,
      actors,
      poster: posterUrl ? { url: posterUrl } : null,
    });

    return this.movieRepository.save(movie);
  }

  async put(id: string, dto: CreateMovieDto) {
    await this.movieRepository.update(id, dto);

    return this.findById(id);
  }

  async patch(id: string, dto: UpdateMovieDto) {
    await this.movieRepository.update(id, dto);

    return this.findById(id);
  }

  async delete(id: string): Promise<string> {
    const result = await this.movieRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Movie #${id} not found`);
    }

    return id;
  }
}
