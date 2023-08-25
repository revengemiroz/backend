import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getAllTodo(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async getTodo(query: string): Promise<Todo[]> {
    return this.prisma.todo.findMany({ where: { task: { contains: query } } });
  }

  async createTodo(data: Todo): Promise<Todo> {
    return this.prisma.todo.create({
      data,
    });
  }

  async updateTodo(id: number, body: Todo): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id: Number(id) },
      data: { task: body.task, completed: body.completed },
    });
  }

  async deleteTodo(id: number): Promise<Todo | undefined> {
    return this.prisma.todo.delete({
      where: { id: Number(id) },
    });
  }
}
