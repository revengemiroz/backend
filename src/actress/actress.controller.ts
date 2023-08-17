import { Controller, Get } from '@nestjs/common';

@Controller('actress')
export class ActressController {
  @Get()
  findAll(): string {
    return 'this is a list of all the actress';
  }
}
