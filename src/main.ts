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
    'https://client-gizwe4cdh-revengemiroz.vercel.app',
    'https://client-gizwe4cdh-revengemiroz.vercel.app/home',
  ];
  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
    console.log('A user connected via Socket.IO', socket.id);
    // Add your Socket.IO event listeners and logic here
  });

  // httpServer.listen(socketIOPort, () => {
  //   console.log(`Socket.IO server is running on port ${socketIOPort}`);
  // });
}
bootstrap();
