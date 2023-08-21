import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MyGateWay implements OnModuleInit {
  @WebSocketServer()
  server: Server;
  online = {};

  allUsers = [];
  onlineIds(myId) {
    const filter = this.allUsers.filter((user) => user !== myId);
    // this.online.push(filter);
  }

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('connected', socket.id);
      this.allUsers.push(socket.id);
      this.online[`${socket.id}_USER`] = socket.id;

      socket.on('disconnect', () => {
        console.log('disconnected user', socket.id);
        const index = this.allUsers.indexOf(socket.id);
        delete this.online[`${socket.id}_USER`];
        if (index !== -1) {
          this.allUsers.splice(index, 1);
        }
        console.log('users', this.allUsers, this.online);
      });
      // this.onlineIds(socket.id);

      // this.server.emit('online', {
      //   online: this.allUsers,
      // });
      console.log('users', this.allUsers, this.online);
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    console.log('!!!!!!!!!!', body);

    this.server.emit('onMessage', {
      online: this.online,
    });
  }
}
