import { rooms } from "./room.service.js";
import sendMessageToRoom from "../utils/sendMessageToRoom.js";
import { RoomService } from "../services/room.service.js";
import { wss } from "../server.js";

export class ClassService {
  constructor() {
    this.roomService = new RoomService();
  }
  async selectClass(client, msg) {
    console.log(msg.data);
    const roomIndex = rooms.map((e) => e.id).indexOf(msg.data.roomId);
    const playerIndex = rooms[roomIndex].players
      .map((e) => e.id)
      .indexOf(client.id);

    if (
      rooms[roomIndex].players[playerIndex].class !== msg.data.class &&
      rooms[roomIndex].players[playerIndex].checked
    ) {
      rooms[roomIndex].players[playerIndex].checked = false;
    }
    rooms[roomIndex].players[playerIndex].class = msg.data.class;
    console.log("rooms ", rooms[roomIndex].players[playerIndex].class);
    const response = {
      type: "classSelected",
      data: {
        player1: {
          username: rooms[roomIndex]?.players[0]?.username ?? null,
          class: rooms[roomIndex]?.players[0]?.class ?? null,
          checked: rooms[roomIndex]?.players[0]?.checked ?? null,
        },
        player2: {
          username: rooms[roomIndex]?.players[1]?.username ?? null,
          class: rooms[roomIndex]?.players[1]?.class ?? null,
          checked: rooms[roomIndex]?.players[1]?.checked ?? null,
        },
        player3: {
          username: rooms[roomIndex]?.players[2]?.username ?? null,
          class: rooms[roomIndex]?.players[2]?.class ?? null,
          checked: rooms[roomIndex]?.players[2]?.checked ?? null,
        },
        player4: {
          username: rooms[roomIndex]?.players[3]?.username ?? null,
          class: rooms[roomIndex]?.players[3]?.class ?? null,
          checked: rooms[roomIndex]?.players[3]?.checked ?? null,
        },
      },
    };
    console.log(response);
    sendMessageToRoom(msg.data.roomId, response);
  }

  async ready(client, msg) {
    console.log(msg.data);
    const roomIndex = rooms.map((e) => e.id).indexOf(msg.data.roomId);
    const playerIndex = rooms[roomIndex].players
      .map((e) => e.id)
      .indexOf(client.id);

    rooms[roomIndex].players[playerIndex].checked = true;

    const response = {
      type: "ready",
      data: {
        player1: {
          username: rooms[roomIndex]?.players[0]?.username ?? null,
          class: rooms[roomIndex]?.players[0]?.class ?? null,
          checked: rooms[roomIndex]?.players[0]?.checked ?? null,
        },
        player2: {
          username: rooms[roomIndex]?.players[1]?.username ?? null,
          class: rooms[roomIndex]?.players[1]?.class ?? null,
          checked: rooms[roomIndex]?.players[1]?.checked ?? null,
        },
        player3: {
          username: rooms[roomIndex]?.players[2]?.username ?? null,
          class: rooms[roomIndex]?.players[2]?.class ?? null,
          checked: rooms[roomIndex]?.players[2]?.checked ?? null,
        },
        player4: {
          username: rooms[roomIndex]?.players[3]?.username ?? null,
          class: rooms[roomIndex]?.players[3]?.class ?? null,
          checked: rooms[roomIndex]?.players[3]?.checked ?? null,
        },
      },
    };
    const verifyAllChecked =
      response.data.player1.checked &&
      response.data.player2.checked &&
      response.data.player3.checked &&
      response.data.player4.checked;
    7;

    if (verifyAllChecked) {
      rooms[roomIndex].currentView = "doors";
      this.roomService.roomUpdated(msg.data.roomId);
    } else {
      sendMessageToRoom(msg.data.roomId, response);
    }
  }
}
