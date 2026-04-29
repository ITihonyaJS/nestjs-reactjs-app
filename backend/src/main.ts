import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthGuard } from './common/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  //Подключаем middleware как функцию
  // app.use(LoggerMiddleware);
  //Подключаем Gurd глобально
  // app.useGlobalGuards(new AuthGuard());
  app.enableCors();
  await app.listen(4200);
  console.log('App listening on port 4200');
}
bootstrap();
