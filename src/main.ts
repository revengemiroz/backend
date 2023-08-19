import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as http from 'http';
import * as socketio from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  const httpServer = http.createServer(app.getHttpAdapter().getInstance());
  const ioServer = new socketio.Server(httpServer);
  const allowedOrigins = ['http://localhost:3000', 'https://cloudinary.com'];
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useWebSocketAdapter(new IoAdapter(ioServer));

  await app.listen(4000);
}
bootstrap();
