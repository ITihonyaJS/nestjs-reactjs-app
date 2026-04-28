import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Get()
  findAll() {
    return this.movieService.findAll();
  }
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id);
  }
  @Post()
  create(@Body() dto: CreateMovieDto) {
    return this.movieService.create(dto);
  }
  @Put(':id')
  put(@Param('id') id: string, @Body() dto: CreateMovieDto) {
    return this.movieService.put(id, dto);
  }
  @Patch(':id')
  patch(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    return this.movieService.patch(id, dto);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.movieService.delete(id);
  }
}
