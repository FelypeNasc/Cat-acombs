import { RoomController } from "./room.controller.js";
import { ClientController } from "./client.controller.js";

export class GlobalController {
  roomController = new RoomController();
  clientController = new ClientController();

  async redirect(client, msg) {
    type = "room/getRooms";
    msg = JSON.parse(msg);
    console.log(msg);
    const msgSplit = msg.type.split("/");
    const primaryRoute = msgSplit[0];
    const secondaryRoute = msgSplit[1];

    const routes = {
      room: this.roomController.redirect(secondaryRoute, client, msg),
      client: this.clientController.redirect(secondaryRoute, client, msg),
    };

    if (!routes[primaryRoute]) {
      client.send(
        JSON.stringify({ error: true, message: "Invalid Message Route" })
      );
    }

    routes[primaryRoute];
  }
}
