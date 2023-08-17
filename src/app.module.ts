import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActressController } from './actress/actress.controller';

@Module({
  imports: [],
  controllers: [AppController, ActressController],
  providers: [AppService],
})
export class AppModule {}
