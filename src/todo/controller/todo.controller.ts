import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { Todo } from '@prisma/client';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('all')
  async getAllTodo(): Promise<Todo[]> {
    return this.todoService.getAllTodo();
  }

  @Post()
  async createTodo(@Body() todoData: Todo): Promise<Todo> {
    return this.todoService.createTodo(todoData);
  }

  @Get('search')
  async getTodo(@Query('query') query: string): Promise<Todo[]> {
    return this.todoService.getTodo(query);
  }

  @Put(':id')
  async Update(@Param('id') id: number, @Body() body: Todo): Promise<Todo> {
    return this.todoService.updateTodo(id, body);
  }

  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<Todo> {
    return this.todoService.deleteTodo(id);
  }
}
