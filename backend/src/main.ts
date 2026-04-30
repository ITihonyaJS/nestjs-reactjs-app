import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthGuard } from './common/guards/auth.guard';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  //Подключаем middleware как функцию
  // app.use(LoggerMiddleware);
  //Подключаем Gurd глобально
  // app.useGlobalGuards(new AuthGuard());
  //подключаем Interceptor глобально
  // app.useGlobalInterceptors(new ResponseInterceptor());
  //подключаем Filters глобльно
  // app.useGlobalFilters(new AllExceptionsFilter());
  app.enableCors();
  await app.listen(4200);
  console.log('App listening on port 4200');
}
bootstrap();
