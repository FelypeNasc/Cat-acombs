const rooms = []; // provisorio
import { v4 as uuidv4 } from "uuid";

export class RoomService {
  async getRooms(client, msg) {
    const reponse = {
      type: "getRoomList",
      data: rooms,
      browserSession: msg.browserSession,
    };

    client.send(JSON.stringify(reponse));
  }

  async createRoom(client, msg) {
    const newRoom = {
      id: uuidv4(),
      roomName: msg.data.roomName,
      creatorName: client.username,
      players: [
        {
          id: client.id,
          username: client.username,
          class: null,
        },
      ],
    };
    rooms.push(newRoom);
    client.send(JSON.stringify(rooms));
  }

  async deleteRoom(client, msg) {}

  async enterRoom(client, msg) {}
}
