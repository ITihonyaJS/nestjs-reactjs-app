import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movie.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Получить список фильмов',
    description: 'Возвращает полный список всех фильмов',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Фильмы с ${id} найдены',
  })
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @ApiOperation({
    summary: 'Получить фильм по id',
    description: 'Возвращает информацию о фильме',
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID фильма',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Фильм найден',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Фильм НЕ найден',
  })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.movieService.findById(id);
  }

  @ApiOperation({
    summary: 'Создание фильма',
    description: 'Возвращает информацию по созданному фильму',
  })
  @ApiOkResponse({
    description: 'Фильм найден',
    type: CreateMovieDto,
  })
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
