import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as http from 'http';
import * as socketio from 'socket.io';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  // for class validator
  app.useGlobalPipes(new ValidationPipe());

  //swagger setup
  const config = new DocumentBuilder()
    .setTitle('Api Documentation')
    .setDescription('all the apis ui')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const apiPort = 4001;
  const socketIOPort = 4002; // Choose a different port for Socket.IO

  const allowedOrigins = [
    'http://localhost:3000',
    'https://cloudinary.com',
    'http://localhost:3000/todo',
    'http://localhost:3000/home',
    'https://backend-4sah.onrender.com',
    'https://client-tau-sand.vercel.app',
  ];
  app.enableCors({
    allowedHeaders: ['content-type'],
    credentials: true,
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
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
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
