// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private users = new Map();
  handleConnection(client: Socket) {
    // Handle a new connection
    const userId = client.id;
    this.users.set(client.id, userId);
    console.log('connection', client.id);
  }

  handleDisconnect(client: Socket) {
    // Handle a disconnected client
    const userId = this.users.get(client.id);
    if (userId) {
      this.users.delete(client.id);
    }
    console.log('disconnect', this.users);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    // Handle received messages and broadcast to other clients
    const userId = this.users.get(client.id);
    console.log('wjhat is payload', payload, userId);
    // if (userId) {
    this.server.emit('messageReceived', { user: userId, text: payload.text });
    // if (client.rooms.has(payload.room)) {

    // } else {
    //   client.emit('error', {
    //     message: 'you can only send if u join the room',
    //   });
    // }
    // }
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client.emit('my-id', { userId: client.id });
    console.log('joined room', room);
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
  }
}
