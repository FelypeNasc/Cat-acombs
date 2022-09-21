import { rooms } from "./room.service.js";
import sendMessageToRoom from "../utils/sendMessageToRoom.js";
import { wss } from "../server.js";

export class ClassService {
  async selectClass(client, msg) {
    const roomIndex = rooms.map((e) => e.id).indexOf(msg.data.roomId);
    const playerIndex = rooms[roomIndex].map((e) => e.id).indexOf(client.id);

    rooms[roomIndex].players[playerIndex].class = msg.data.class;

    const response = {
      type: "classSelected",
      data: { username: client.username, selectClass: msg.data.class },
    };
    sendMessageToRoom(msg.data.roomId, response);
  }
}
