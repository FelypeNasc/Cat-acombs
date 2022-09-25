export const rooms = [];

import { v4 as uuidv4 } from "uuid";
import sendMessageToRoom from "../utils/sendMessageToRoom.js";
import bcrypt from "bcrypt";

export class RoomService {
  async getRooms(client, msg) {
    const responseRooms = Array.from(rooms);
    responseRooms.forEach((room) => {
      return {
        id: room.id,
        roomName: room.roomName,
        creatorName: room.creatorName,
        inGame: room.inGame,
        players: [...room.players],
      };
    });

    const response = {
      type: "getRooms",
      data: responseRooms,
    };

    client.send(JSON.stringify(response));
  }

  async createRoom(client, msg) {
    const { roomName, roomPassword } = msg.data;

    const newRoom = {
      id: uuidv4(),
      roomName: roomName,
      creatorName: client.username,
      password: null,
      inGame: false,
      players: [
        {
          id: client.id,
          username: client.username,
          class: null,
        },
      ],
    };

    if (roomPassword) {
      const salt = bcrypt.genSaltSync(8);
      const encriptedPassword = bcrypt.hashSync(roomPassword, salt);
      newRoom.password = encriptedPassword;
      newRoom.hasPassword = true;
    }

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

    if (rooms[roomIndex].hasPassword) {
      const passwordMatch = bcrypt.compareSync(
        msg.data.roomPassword,
        rooms[roomIndex].password
      );

      if (!passwordMatch) {
        const response = {
          type: "wrongPassword",
        };
        client.send(JSON.stringify(response));
        return;
      }
    }

    if (rooms[roomIndex].players.length >= 4) {
      const response = {
        type: "roomFull",
      };
      client.send(JSON.stringify(response));
      return;
    }

    rooms[roomIndex].players.push(player);

    const response = {
      type: "enterRoom",
      data: rooms[roomIndex],
    };
    sendMessageToRoom(rooms[roomIndex].id, response);
  }
  async exitRoom() {}
  async deleteRoom(client, msg) {}
}
