import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '@prisma/client';

import { Logger } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async creatUser(@Body() postUser: User): Promise<User> {
    Logger.log('Getting users...', postUser);
    return this.userService.createUser(postUser);
  }

  @Get()
  async getUser(): Promise<User[]> {
    Logger.log('Getting users...');
    return this.userService.getUser();
  }
}

//use npm run start:dev
