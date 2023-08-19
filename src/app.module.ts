import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  imports: [TodoModule, UserModule, CloudinaryModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, ConfigService, CloudinaryProvider],
})
export class AppModule {}
