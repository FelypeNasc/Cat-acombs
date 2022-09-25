export const rooms = [];
export const playersOnRooms = [];

// const roomExample = [
//   {
//     id: uuidv4(),
//     roomName: "abacaxi",
//     creatorName: "junin",
//     password: null,
//     hasPassword: false,
//     currentView: "classSelection",
//     players: [
//       {
//         id: client.id,
//         username: client.username,
//         character: {
//           class: null,
//           level: 1,
//           hp: 100,
//           maxHp: 100,
//           attack: 10,
//           actions: {},
//         },
//       },
//     ],
//   },
// ];

import { v4 as uuidv4 } from "uuid";
import sendMessageToRoom from "../utils/sendMessageToRoom.js";
import bcrypt from "bcrypt";
import { ChatService } from "./chat.service.js";

export class RoomService {
  constructor() {
    this.chatService = new ChatService();
  }

  async getRooms(client, msg) {
    const responseRooms = rooms;

    responseRooms.forEach((room) => delete room.password);

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

    const player = {
      id: client.id,
      username: client.username,
      roomId: newRoom.id,
    };

    rooms.push(newRoom);
    playersOnRooms.push(player);

    const response = {
      type: "roomCreated",
      data: newRoom,
    };
    client.send(JSON.stringify(response));
  }

  async enterRoom(client, msg) {
    const newPlayer = {
      id: client.id,
      username: client.username,
      class: null,
    };

    const roomIndex = rooms.map((e) => e.id).indexOf(msg.data.roomId);

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

    const player = {
      id: client.id,
      username: client.username,
      roomId: msg.data.roomId,
    };

    rooms[roomIndex].players.push(newPlayer);
    playersOnRooms.push(player);

    const response = {
      type: "enterRoom",
      data: rooms[roomIndex],
    };

    client.send(JSON.stringify(response));

    const messageToRoom = `${client.username} entrou na sala`;

    this.chatService.systemMessage(rooms[roomIndex].id, messageToRoom);
  }

  async userOnLobby(client, msg) {
    await this.deletePlayerFromRooms(client.id);

    const response = {
      type: "disconnectedFromRoom",
    };

    client.send(JSON.stringify(response));
  }

  async leaveRoom(client, msg) {
    deletePlayerFromRooms(client.id);
  }

  async deleteRoom(client, msg) {}

  async deletePlayerFromRooms(playerId) {
    const userFound = playersOnRooms.find((player) => player.id === playerId);

    if (!userFound) return;

    const roomIndex = rooms.map((e) => e.id).indexOf(userFound.roomId);

    playersOnRooms.forEach((el, index) => {
      if (el.id === playerId) {
        playersOnRooms.splice(index, 1);
      }
    });
    rooms[roomIndex].players = rooms[roomIndex].players.filter(
      (player) => player.id !== playerId
    );

    playersOnRooms.forEach((el, index) => {
      if (el.id === playerId) {
        playersOnRooms.splice(index, 1);
      }
    });

    const systemMessage = `${userFound.username} saiu na sala`;

    this.chatService.systemMessage(userFound.roomId, systemMessage);

    const messageToRoom = {
      type: "roomUpdated",
      data: rooms[roomIndex],
    };

    sendMessageToRoom(userFound.roomId, messageToRoom);

    return rooms[roomIndex];
  }
}
