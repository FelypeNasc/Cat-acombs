import { RoomController } from "./room.controller.js";
import { ClientController } from "./client.controller.js";

export class GlobalController {
  constructor() {
    this.roomController = new RoomController();
    this.clientController = new ClientController();
  }

  async redirect(client, msg) {
    msg = JSON.parse(msg);
    console.log(msg);
    ("room/getRooms");
    const msgSplit = msg.type.split("/");
    console.log("MSG SPLIT:", msgSplit);
    const primaryRoute = msgSplit[0];
    const secondaryRoute = msgSplit[1];
    console.log(primaryRoute, secondaryRoute);

    const routes = {
      client: () => this.clientController.redirect(secondaryRoute, client, msg),
      // battle: () => battleController.redirect(secondaryRoute, client, msg),
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
