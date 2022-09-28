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
import { RoomClient } from "../clients/room.clients.js";

export class RoomService {
  constructor() {
    this.chatService = new ChatService();
    this.roomClient = new RoomClient();
  }

  async getRooms(client, msg) {
    const allRooms = await this.roomClient.getAllRooms();

    allRooms.forEach((room) => {
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
      data: allRooms.filter((room) => !room.inGame),
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
          character: {
            class: null,
            level: 1,
          },
          checked: false,
        },
      ],
      doors: {
        1: [
          { name: "Porta 1", floor: 1, door: 1, access: "enabled" },
          { name: "Porta 2", floor: 1, door: 2, access: "locked" },
          { name: "Porta 3", floor: 1, door: 3, access: "locked", used: false },
          { name: "Porta 4", floor: 1, door: 4, access: "locked" },
        ],
        2: [
          { name: "Porta 1", floor: 2, door: 1, access: "locked" },
          { name: "Porta 2", floor: 2, door: 2, access: "locked" },
          { name: "Porta 3", floor: 2, door: 3, access: "locked", used: false },
          { name: "Porta 4", floor: 2, door: 4, access: "locked" },
        ],
        3: [
          { name: "Porta 1", floor: 3, door: 1, access: "locked" },
          { name: "Porta 2", floor: 3, door: 2, access: "locked" },
          { name: "Porta 3", floor: 3, door: 3, access: "locked", used: false },
          { name: "Porta 4", floor: 3, door: 4, access: "locked" },
        ],
      },
      lastUnlocked: { floor: 1, door: 1 },
      currentView: "class",
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

    await this.roomClient.createRoom(newRoom);

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
      character: {
        class: null,
        level: 1,
      },
    };
    const room = await this.roomClient.getRoom(msg.data.roomId);
    /*  if (rooms[roomIndex].inGame) {
      const response = {
        type: "inGame",
      };
      client.send(JSON.stringify(response));
      return;
    }
 */
    if (room.hasPassword) {
      const passwordMatch = bcrypt.compareSync(
        msg.data.roomPassword,
        room.password
      );

      if (!passwordMatch) {
        const response = {
          type: "wrongPassword",
        };
        client.send(JSON.stringify(response));
        return;
      }
    }

    if (room.players.length >= 4) {
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

    room.players.push(newPlayer);
    const updatedRoom = await this.roomClient.updateRoom(msg.data.roomId, room);

    playersOnRooms.push(player);

    const response = {
      type: "enterRoom",
      data: updatedRoom,
    };

    client.send(JSON.stringify(response));

    const messageToRoom = `O jogador ${client.username} entrou na sala`;

    this.chatService.systemMessage(room.id, messageToRoom);
  }

  async userOnLobby(client, msg) {
    await this.deletePlayerFromRooms(client.id);

    const response = {
      type: "disconnectedFromRoom",
    };

    client.send(JSON.stringify(response));
    return;
  }

  async leaveRoom(client, msg) {
    deletePlayerFromRooms(client.id);
  }

  async deletePlayerFromRooms(playerId) {
    const userFound = playersOnRooms.find((player) => player.id === playerId);

    if (!userFound) return;

    const room = await this.roomClient.getRoom(userFound.roomId);

    playersOnRooms.forEach((el, index) => {
      if (el.id === playerId) {
        playersOnRooms.splice(index, 1);
      }
    });

    if (!room) return;

    room.players = room.players.filter((player) => player.id !== playerId);

    if (room.players.length === 0) {
      await this.roomClient.deleteRoom(userFound.roomId);
      return;
    }

    const updatedRoom = await this.roomClient.updateRoom(
      userFound.roomId,
      room
    );

    const systemMessage = `${userFound.username} saiu da sala`;

    this.chatService.systemMessage(userFound.roomId, systemMessage);
    this.roomUpdated(userFound.roomId);

    if (updatedRoom.adminId !== updatedRoom.players[0].id) {
      updatedRoom.adminId = updatedRoom.players[0].id;
      updatedRoom.adminUsername = updatedRoom.players[0].username;
      const updatedAdminRoom = await this.roomClient.updateRoom(
        userFound.roomId,
        updatedRoom
      );
      const message = `${updatedAdminRoom.adminUsername} agora é admin da sala`;
      this.chatService.systemMessage(userFound.roomId, message);
    }
    const newDataRoom = await this.roomClient.getRoom(userFound.roomId);
    return newDataRoom;
  }

  async unlockNextRoom(roomId, currentDoor) {
    const room = await this.roomClient.getRoom(roomId);

    const nextDoor = this.checkNextDoor(currentDoor);

    room.doors[nextDoor.floor][nextDoor.door - 1].access = "enabled";

    const updated = await this.roomClient.updateRoom(roomId, room);
  }

  async getRoomUpdated(client, msg) {
    const room = await this.roomClient.getRoom(msg.data.roomId);
    const response = {
      type: "roomUpdated",
      data: room,
    };

    client.send(JSON.stringify(response));
  }

  async roomUpdated(roomId, isStory = false, storyText = null) {
    const room = await this.roomClient.getRoom(roomId);

    if (isStory) {
      room.currentView = "story";
      room.storyText = storyText;
    }

    const messageToRoom = {
      type: "roomUpdated",
      data: room,
    };

    sendMessageToRoom(roomId, messageToRoom);
  }

  checkNextDoor(currentDoor) {
    return {
      floor: currentDoor.door === 4 ? currentDoor.floor + 1 : currentDoor.floor,
      door: currentDoor.door === 4 ? 1 : currentDoor.door + 1,
    };
  }
}
