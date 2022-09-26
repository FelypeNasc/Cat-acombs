import { v4 as uuidv4 } from "uuid";
import { floorsAndDoors } from "../data/floorsAndDoors.js";
import sendMessageToRoom from "../utils/sendMessageToRoom.js";
import { BattleService } from "./battle.service.js";
import { rooms, RoomService } from "./room.service.js";
import { ChatService } from "./chat.service.js";

export class DoorService {
  constructor() {
    this.roomService = new RoomService();
    this.battleService = new BattleService();
    this.chatService = new ChatService();
  }

  async enterDoor(client, msg) {
    const { floor, door, roomId } = msg.data;
    const roomIndex = rooms.map((e) => e.id).indexOf(roomId);
    const playerAdmin = rooms[roomIndex].adminId;
    const adminUsername = rooms[roomIndex].adminUsername;

    if (client.id === playerAdmin) {
      const doorData = floorsAndDoors[floor][door];

      switch (doorData.type) {
        case "rest":
          this.restRoom(roomId);
          break;
        case "battle":
          this.battleRoom(doorData, roomId, floor, door);
          break;
      }
    } else {
      const messageToRoom = `Apenas o jogador ${adminUsername}, Admin da sala pode selecionar a porta`;
      this.chatService.systemMessage(rooms[roomIndex].id, messageToRoom);
      sendMessageToRoom(rooms[roomIndex].id, response);
    }
  }

  async restRoom(roomId) {
    const roomIndex = rooms.map((e) => e.id).indexOf(roomId);

    rooms[roomIndex].players.forEach((player) => {
      player.character.currentHp = player.character.maxHp;
    });

    const response = {
      type: "restRoom",
    };

    sendMessageToRoom(rooms[roomIndex].id, response);
    this.roomService.roomUpdated();
  }

  async battleRoom(doorData, roomId, floor, door) {
    const battleData = this.battleService.newBattle(
      doorData,
      roomId,
      floor,
      door
    );
    const roomIndex = rooms.map((e) => e.id).indexOf(roomId);

    rooms[roomIndex].currentView = "story";
    this.roomService.roomUpdated(roomId, true, doorData.storyText);

    rooms[roomIndex].currentView = "combat";

    const response = {
      type: "startBattle",
      data: battleData,
    };

    setTimeout(() => {
      sendMessageToRoom(roomId, response);
      this.roomService.roomUpdated(roomId);
    }, 5000);

    setTimeout(() => {
      this.battleService.battleUpdated(roomId);
    }, 500);
  }
}
