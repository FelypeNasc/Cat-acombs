export const rooms = [];

import { v4 as uuidv4 } from "uuid";
import sendMessageToRoom from "../utils/sendMessageToRoom.js";

export class RoomService {
  async getRooms(client, msg) {
    const response = {
      type: "getRooms",
      data: rooms,
    };
    client.send(JSON.stringify(response));
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

    const response = {
      type: "roomCreated",
      data: newRoom,
    };
    client.send(JSON.stringify(response));
  }

  async enterRoom(client, msg) {
    const player = {
      id: client.id,
      username: client.username,
      class: null,
    };

    const roomIndex = rooms.map((e) => e.id).indexOf(msg.data.roomId);
    rooms[roomIndex].players.push(player);

    const response = {
      type: "enterRoom",
      data: rooms[roomIndex],
    };

    client.send(JSON.stringify(response));
  }

  async deleteRoom(client, msg) {}
}
