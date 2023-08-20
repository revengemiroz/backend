import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as http from 'http';
import * as socketio from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  const apiPort = 4001;
  const socketIOPort = 4002; // Choose a different port for Socket.IO

  const allowedOrigins = [
    'http://localhost:3000',
    'https://cloudinary.com',
    '*',
    'http://localhost:3000/home',
    'https://client-tau-sand.vercel.app',
    'https://client-tau-sand.vercel.app/home',
  ];
  app.enableCors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Start the NestJS API server
  await app.listen(apiPort, () => {
    console.log(`NestJS API server is running on port ${apiPort}`);
  });

  // Create a separate HTTP server for Socket.IO
  const httpServer = http.createServer();
  const io = new socketio.Server(httpServer, {
    cors: {
      origin: allowedOrigins,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected via Socket.IO');
    // Add your Socket.IO event listeners and logic here
  });

  httpServer.listen(socketIOPort, () => {
    console.log(`Socket.IO server is running on port ${socketIOPort}`);
  });
}
bootstrap();
