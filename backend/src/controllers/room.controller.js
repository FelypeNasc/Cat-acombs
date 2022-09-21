import { RoomService } from "../services/room.service.js";

export class RoomController {
  constructor() {
    this.roomService = new RoomService();
  }

  async redirect(route, client, msg) {
    const routes = {
      getRooms: () => this.roomService.getRooms(client, msg),
      createRoom: () => this.roomService.createRoom(client, msg),
      enterRoom: () => this.roomService.enterRoom(client, msg),
      leaveRoom: () => this.roomService.leaveRoom(client, msg)
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
