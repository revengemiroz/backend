import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async creatUser(@Body() postUser: User): Promise<User> {
    return this.userService.createUser(postUser);
  }

  @Get()
  async getUser(): Promise<User[]> {
    return this.userService.getUser();
  }
}
