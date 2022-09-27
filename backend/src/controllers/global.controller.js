import { RoomController } from "./room.controller.js";
import { ClientController } from "./client.controller.js";
import { ChatController } from "./chat.controller.js";
import { ClassController } from "./class.controller.js";
import { DoorController } from "./door.controller.js";
import { BattleController } from "./battle.controller.js";

export class GlobalController {
  constructor() {
    this.battleController = new BattleController();
    this.roomController = new RoomController();
    this.clientController = new ClientController();
    this.chatController = new ChatController();
    this.classController = new ClassController();
    this.doorController = new DoorController();
  }

  async redirect(client, msg) {
    // ("room/getRooms");
    const msgSplit = msg.type.split("/");
    console.log("MSG SPLIT:", msgSplit);
    const primaryRoute = msgSplit[0];
    const secondaryRoute = msgSplit[1];

    const routes = {
      client: () => this.clientController.redirect(secondaryRoute, client, msg),
      battle: () => this.battleController.redirect(secondaryRoute, client, msg),
      door: () => this.doorController.redirect(secondaryRoute, client, msg),
      class: () => this.classController.redirect(secondaryRoute, client, msg),
      chat: () => this.chatController.redirect(secondaryRoute, client, msg),
      room: () => this.roomController.redirect(secondaryRoute, client, msg),
    };

    if (!routes.hasOwnProperty(primaryRoute)) {
      client.send(
        JSON.stringify({ error: true, message: "Invalid Message Route" })
      );
      return;
    }

    routes[primaryRoute]();
  }
}
