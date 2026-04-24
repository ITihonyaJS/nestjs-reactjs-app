import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private readonly initialTasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'This is task 1',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'This is task 2',
      isCompleted: true,
    },
  ];

  private tasks = [...this.initialTasks];

  findAll() {
    if (this.tasks.length === 0) {
      this.tasks = [...this.initialTasks];
    }
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  create(dto: CreateTaskDTO) {
    const { title, description, isCompleted, priority } = dto;
    const newTask = {
      id: this.tasks.length + 1,
      title: title,
      description: description,
      isCompleted: isCompleted,
      priority: priority,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: number, dto: UpdateTaskDTO) {
    const { title, description, isCompleted } = dto;
    const task = this.findOne(id);
    task.title = title;
    task.description = description;
    task.isCompleted = isCompleted;

    return task;
  }

  updatePartial(id: number, dto: Partial<UpdateTaskDTO>) {
    const task = this.findOne(id);
    Object.assign(task, dto);
    return task;
  }

  delete(id: number) {
    const task = this.findOne(id);
    this.tasks = this.tasks.filter((t) => t.id !== id);

    return task;
  }
}
