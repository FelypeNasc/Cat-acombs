import { rooms } from "./room.service.js";
import sendMessageToRoom from "../utils/sendMessageToRoom.js";
import { wss } from "../server.js";

export class ChatService {
  async sendMessage(client, msg) {
    const response = {
      type: "chatMessage",
      data: { username: client.username, message: msg.data.message },
    };
    sendMessageToRoom(msg.data.roomId, response);
  }
}
