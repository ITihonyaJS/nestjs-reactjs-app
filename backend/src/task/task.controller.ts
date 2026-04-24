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
import { TaskService } from './task.service';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('all')
  findAll() {
    return this.taskService.findAll();
  }

  @Get('by-id/:id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(Number(id));
  }

  @Post('create')
  create(@Body() dto: CreateTaskDTO) {
    return this.taskService.create(dto);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() dto: UpdateTaskDTO) {
    return this.taskService.update(Number(id), dto);
  }

  @Patch('partial/:id')
  updatePartial(@Param('id') id: string, @Body() dto: Partial<UpdateTaskDTO>) {
    return this.taskService.updatePartial(Number(id), dto);
  }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(Number(id));
  }
}
