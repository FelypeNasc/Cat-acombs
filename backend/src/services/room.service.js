export const rooms = [];
export const playersOnRooms = [];

// const roomExample = [
//   {
//     id: uuidv4(),
//     roomName: "abacaxi",
//     adminName: "junin",
//     adminId: 123,
//     password: null,
//     hasPassword: false,
//     currentView: "classSelection",
//     players: [
//       {
//         id: 'abuble',
//         username: client.username,
//         character: {
//           class: null,
//           level: 1,
//           currentHp: 100,
//           maxHp: 100
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
    const responseRooms = Array.from(rooms);
    responseRooms.forEach((room) => {
      return {
        id: room.id,
        roomName: room.roomName,
        adminId: room.adminId,
        adminUsername: room.adminUsername,
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
      adminId: client.id,
      adminUsername: client.username,
      password: null,
      inGame: false,
      players: [
        {
          id: client.id,
          username: client.username,
          class: null,
          level: 1,
          checked: false,
        },
      ],
      doors: {
        1: [
          { name: "Porta 1", floor: 1, door: 1, access: "enabled" },
          { name: "Porta 2", floor: 1, door: 2, access: "locked" },
          { name: "Porta 3", floor: 1, door: 3, access: "locked" },
          { name: "Porta 4", floor: 1, door: 4, access: "locked" },
        ],
        2: [
          { name: "Porta 1", floor: 2, door: 1, access: "locked" },
          { name: "Porta 2", floor: 2, door: 2, access: "locked" },
          { name: "Porta 3", floor: 2, door: 3, access: "locked" },
          { name: "Porta 4", floor: 2, door: 4, access: "locked" },
        ],
        3: [
          { name: "Porta 1", floor: 3, door: 1, access: "locked" },
          { name: "Porta 2", floor: 3, door: 2, access: "locked" },
          { name: "Porta 3", floor: 3, door: 3, access: "locked" },
          { name: "Porta 4", floor: 3, door: 4, access: "locked" },
        ],
      },
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

    if (rooms[roomIndex].inGame) {
      const response = {
        type: "inGame",
      };
      client.send(JSON.stringify(response));
      return;
    }

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

  async deleteRoom(client, msg) {} // TO DO

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
    this.roomUpdated(userFound.roomId);

    return rooms[roomIndex];
  }

  async getRoomUpdated(client, msg) {
    const roomIndex = rooms.map((e) => e.id).indexOf(msg.data.roomId);
    console.log(msg);
    const response = {
      type: "roomUpdated",
      data: rooms[roomIndex],
    };

    client.send(JSON.stringify(response));
  }

  async roomUpdated(roomId) {
    const roomIndex = rooms.map((e) => e.id).indexOf(roomId);

    const messageToRoom = {
      type: "roomUpdated",
      data: rooms[roomIndex],
    };

    sendMessageToRoom(roomId, messageToRoom);
  }
}
