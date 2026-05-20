import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from "socket.io"
import { ChatbotService } from './chatbot.service';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatbotGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatbotService: ChatbotService) { }

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client Connected: ${client.id}`);
    client.emit('message', {
      user: 'ChatBot',
      text: 'Hi! How can i help you?'
    });
  }
  handleDisconnect(client: Socket) {
    console.log(`Client Disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  async handleMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: string) {
    try {
      const response = await this.chatbotService.getUserPromptAndResponse(payload);
      client.emit('message', {
        user: 'ChatBot',
        text: response?.content
      })
    } catch (error) {
      client.emit('message', {
        user: 'ChatBot',
        text: 'Sorry, I am not able to process your request. Please try again later.'
      })

    }
  }
}
