import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Todo } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getAllTodo(cursor): Promise<Todo[]> {
    if (!cursor) {
      return this.prisma.todo.findMany({
        take: 5,
        orderBy: {
          id: 'desc',
        },
      });
    }
    return this.prisma.todo.findMany({
      take: 5,
      skip: 1,
      cursor: { id: cursor },
      orderBy: {
        id: 'desc',
      },
    });
  }

  async getTodo(search: string, cursor: number): Promise<Todo[]> {
    if (!cursor) {
      return this.prisma.todo.findMany({
        where: { task: { contains: search } },
        take: 5,
        orderBy: { id: 'desc' },
      });
    } else {
      return this.prisma.todo.findMany({
        where: { task: { contains: search } },
        take: 5,
        skip: 1,
        cursor: { id: cursor },
        orderBy: { id: 'desc' },
      });
    }
  }

  async createTodo(data: Todo): Promise<Todo> {
    const createdTodo = await this.prisma.todo.create({
      data,
    });
    return createdTodo;
  }

  async updateTodo(id: number, body: Todo): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id: Number(id) },
      data: body,
    });
  }

  async deleteTodo(id: number): Promise<Todo | undefined> {
    return this.prisma.todo.delete({
      where: { id: Number(id) },
    });
  }
}

// npx prisma generate
// npx prisma db push
