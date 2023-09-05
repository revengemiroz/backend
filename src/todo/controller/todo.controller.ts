import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { TodoService } from '../service/todo.service';
import { Todo } from '@prisma/client';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodo(
    @Query('cursor') cursor: number,
    @Query('search') search: string,
  ): Promise<Todo[]> {
    console.log('what is cursor', cursor, search);

    if (search) {
      return this.todoService.getTodo(search, cursor);
    } else {
      return this.todoService.getAllTodo(cursor);
    }
  }

  //todo?search=asdad
  @Post()
  async createTodo(@Body() todoData: Todo): Promise<Todo> {
    return this.todoService.createTodo(todoData);
  }

  @Patch(':id')
  async Update(@Param('id') id: number, @Body() body: Todo): Promise<Todo> {
    return this.todoService.updateTodo(id, body);
  }

  @Delete(':id')
  async Delete(@Param('id') id: number): Promise<Todo> {
    return this.todoService.deleteTodo(id);
  }
}
