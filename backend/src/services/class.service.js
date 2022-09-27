import { rooms } from "./room.service.js";
import sendMessageToRoom from "../utils/sendMessageToRoom.js";
import { RoomService } from "../services/room.service.js";
import { wss } from "../server.js";
import { BattleService } from "./battle.service.js";
import { RoomClient } from "../clients/room.clients.js";

export class ClassService {
  constructor() {
    this.roomService = new RoomService();
    this.battleService = new BattleService();
    this.roomClient = new RoomClient();
  }
  async selectClass(client, msg) {
    // const roomIndex = rooms.map((e) => e.id).indexOf(msg.data.roomId);
    const room = await this.roomClient.getRoom(msg.data.roomId);
    const playerIndex = room.players.map((e) => e.id).indexOf(client.id);

    if (
      room.players[playerIndex].character.class !== msg.data.class &&
      room.players[playerIndex].checked
    ) {
      room.players[playerIndex].checked = false;
    }
    room.players[playerIndex].character.class = msg.data.class;

    const updatedRoom = await this.roomClient.updateRoom(msg.data.roomId, room);

    const response = {
      type: "classSelected",
      data: {
        player1: {
          username: updatedRoom?.players[0]?.username ?? null,
          class: updatedRoom?.players[0]?.character.class ?? null,
          checked: updatedRoom?.players[0]?.checked ?? null,
        },
        player2: {
          username: updatedRoom?.players[1]?.username ?? null,
          class: updatedRoom?.players[1]?.character.class ?? null,
          checked: updatedRoom?.players[1]?.checked ?? null,
        },
        player3: {
          username: updatedRoom?.players[2]?.username ?? null,
          class: updatedRoom?.players[2]?.character.class ?? null,
          checked: updatedRoom?.players[2]?.checked ?? null,
        },
        player4: {
          username: updatedRoom?.players[3]?.username ?? null,
          class: updatedRoom?.players[3]?.character.class ?? null,
          checked: updatedRoom?.players[3]?.checked ?? null,
        },
      },
    };
    sendMessageToRoom(msg.data.roomId, response);
  }

  async ready(client, msg) {
    const room = await this.roomClient.getRoom(msg.data.roomId);
    // const roomIndex = rooms.map((e) => e.id).indexOf(msg.data.roomId);
    const playerIndex = room.players.map((e) => e.id).indexOf(client.id);

    room.players[playerIndex].checked = true;
    const updatedRoom = await this.roomClient.updateRoom(msg.data.roomId, room);

    const response = {
      type: "ready",
      data: {
        player1: {
          username: updatedRoom?.players[0]?.username ?? null,
          class: updatedRoom?.players[0]?.character.class ?? null,
          checked: updatedRoom?.players[0]?.checked ?? null,
        },
        player2: {
          username: updatedRoom?.players[1]?.username ?? null,
          class: updatedRoom?.players[1]?.character.class ?? null,
          checked: updatedRoom?.players[1]?.checked ?? null,
        },
        player3: {
          username: updatedRoom?.players[2]?.username ?? null,
          class: updatedRoom?.players[2]?.character.class ?? null,
          checked: updatedRoom?.players[2]?.checked ?? null,
        },
        player4: {
          username: updatedRoom?.players[3]?.username ?? null,
          class: updatedRoom?.players[3]?.character.class ?? null,
          checked: updatedRoom?.players[3]?.checked ?? null,
        },
      },
    };
    const verifyAllChecked =
      response.data.player1.checked &&
      response.data.player2.checked &&
      response.data.player3.checked &&
      response.data.player4.checked;

    if (verifyAllChecked) {
      updatedRoom.currentView = "doors";
      updatedRoom.inGame = true;
      const updatedRoom2 = await this.roomClient.updateRoom(
        msg.data.roomId,
        updatedRoom
      );
      this.roomService.roomUpdated(msg.data.roomId);
      this.battleService.setInitialStats(msg.data.roomId);
    } else {
      sendMessageToRoom(msg.data.roomId, response);
    }
  }
}
