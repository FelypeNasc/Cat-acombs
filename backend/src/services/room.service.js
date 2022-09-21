export const rooms = [];

import { v4 as uuidv4 } from "uuid";
import sendMessageToRoom from "../utils/sendMessageToRoom.js";
import bcrypt from "bcrypt";

export class RoomService {
  async getRooms(client, msg) {
    const responseRooms = rooms;

    responseRooms.forEach((room) => delete room.password);

    const response = {
      type: "getRooms",
      data: responseRooms,
    };
    console.log(rooms);
    console.log(responseRooms);

    client.send(JSON.stringify(response));
  }

  async createRoom(client, msg) {
    const { roomName, roomPassword } = msg.data;

    const newRoom = {
      id: uuidv4(),
      roomName: roomName,
      creatorName: client.username,
      password: null,
      hasPassword: false,
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
    console.log(roomIndex);
    console.log(msg.data);

    console.log("enter room: ", rooms[roomIndex]);

    if (rooms[roomIndex].hasPassword) {
      const passwordMatch = bcrypt.compareSync(
        msg.roomPassword,
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

    client.send(JSON.stringify(response));
  }

  async deleteRoom(client, msg) {}
}
