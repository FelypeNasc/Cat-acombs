import { DoorService } from "../services/door.service.js";

export class DoorController {
  constructor() {
    this.doorService = new DoorService();
  }

  async redirect(route, client, msg) {
    const routes = {
      enterDoor: () => this.doorService.enterDoor(client, msg),
    };

    if (!routes.hasOwnProperty(route)) {
      client.send(
        JSON.stringify({ error: true, message: "Invalid Message route" })
      );
      return;
    }

    routes[route]();
  }
}
