import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class UpdateTaskDTO {
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
}
