import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export enum ETaskType {
  WORK = 'work',
  STUDY = 'study',
  HOME = 'home',
}

export class CreateTaskDTO {
  @IsString({
    message: 'Не строка',
  })
  @IsNotEmpty({
    message: 'Поле не может быть пустым',
  })
  @MinLength(2, {
    message: 'Длина строки должна быть не менее 2 символов',
  })
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  isCompleted: boolean;

  @IsNumber()
  @IsOptional()
  priority: number;

  @IsArray({ message: 'Должен быть массив' })
  @IsEnum(ETaskType, { each: true, message: 'Недопустимый тип задач  и' })
  @IsOptional()
  tags: ETaskType[];
}
