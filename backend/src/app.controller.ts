import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { StringToLowercasePipe } from './common/pipes/string-to-lowercase.pipe';
import { AuthGuard } from './common/guards/auth.guard';
import { UserAgent } from './common/decorators/user-agent.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //подключаем Pipe на запрос, который будет преобразовывать строку в нижний регистр
  // @UsePipes(StringToLowercasePipe)
  // @Post()
  // createHello(@Body('title') title: string) {
  //   console.log(title, 'title');

  //   return `Movie: ${title} created`;
  // }

  //подключеваем Guard на запрос, который будет проверять наличие токена в заголовке Authorization
  // @UseGuards(AuthGuard)
  // @Get('@me')
  // getProfile() {
  //   return {
  //     id: 111,
  //     name: 'ITihonya',
  //     email: 'itihonya_js@mail.ru',
  //   };
  // }

  //Использование кастомных декораторов например таких как UserAgent
  // @Get('@me')
  // getProfile(@UserAgent() userAgent: string) {
  //   return {
  //     id: 111,
  //     name: 'ITihonya',
  //     email: 'itihonya_js@mail.ru',
  //     userAgent,
  //   };
  // }

  //проверка работоспособности Interceptor
  // @Get('@me')
  // getProfile() {
  //   return {
  //     id: 111,
  //     name: 'ITihonya',
  //     email: 'itihonya_js@mail.ru',
  //   };
  // }
}
