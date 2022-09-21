import { ChatService } from "../services/chat.service.js";

export class ChatController {
  chatService = new ChatService();

  async redirect(route, client, msg) {
    const routes = {
      sendMessage: () => this.chatService.sendMessage(client, msg),
    };

    if (!routes.hasOwnProperty(route)) {
      client.send(
        JSON.stringify({ error: true, message: "Invalid Message route" })
      );
      return;
    }

    routes[route]();
  }
}
