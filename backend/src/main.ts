import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { AuthGuard } from './common/guards/auth.guard';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  //Подключаем middleware как функцию
  // app.use(LoggerMiddleware);
  //Подключаем Gurd глобально
  // app.useGlobalGuards(new AuthGuard());
  //подключаем Interceptor глобально
  app.useGlobalInterceptors(new ResponseInterceptor());
  //подключаем Filters глобльно
  app.useGlobalFilters(new AllExceptionsFilter());
  const config = new DocumentBuilder()
    .setTitle('Api nestjs + reactjs')
    .setDescription('Api documentation for backend')
    .setVersion('1.0.0')
    .setContact(
      'ITihonya',
      'https://github.com/ITihonyaJS',
      'support@itihonya.com',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  app.enableCors();
  await app.listen(4200);
  console.log('App listening on port 4200');
}
bootstrap();
