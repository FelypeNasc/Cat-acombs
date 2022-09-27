import { v4 as uuidv4 } from "uuid";
import { floorsAndDoors } from "../data/floorsAndDoors.js";
import sendMessageToRoom from "../utils/sendMessageToRoom.js";
import { BattleService } from "./battle.service.js";
import { rooms, RoomService } from "./room.service.js";
import { RoomClient } from "../clients/room.clients.js";
import { ChatService } from "./chat.service.js";
import structuredClone from "../utils/structuredClone.js";

export class DoorService {
  constructor() {
    this.roomService = new RoomService();
    this.battleService = new BattleService();
    this.chatService = new ChatService();
    this.roomClient = new RoomClient();
  }

  async enterDoor(client, msg) {
    const { floor, door, roomId } = msg.data;
    const room = await this.roomClient.getRoom(roomId);

    const playerAdmin = room.adminId;

    if (client.id !== playerAdmin) return;

    const doorData = structuredClone(floorsAndDoors[floor][door]);

    switch (doorData.type) {
      case "rest":
        this.restRoom(roomId);
        break;
      case "battle":
        this.battleRoom(doorData, roomId, floor, door);
        break;
    }
  }

  async restRoom(roomId) {
    const room = await this.roomClient.getRoom(roomId);

    room.players.forEach((player) => {
      player.character.currentHp = player.character.maxHp;
    });

    const response = {
      type: "restRoom",
    };

    await this.roomClient.updateRoom(roomId, room);
    sendMessageToRoom(roomId, response);
    this.roomService.unlockNextRoom(roomId);
    this.roomService.roomUpdated(roomId);
  }

  async battleRoom(doorData, roomId, floor, door) {
    const battleData = this.battleService.newBattle(
      doorData,
      roomId,
      floor,
      door
    );

    const room = await this.roomClient.getRoom(roomId);

    this.roomService.roomUpdated(roomId, true, doorData.storyText);

    room.currentView = "combat";

    await this.roomClient.updateRoom(roomId, room);

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
