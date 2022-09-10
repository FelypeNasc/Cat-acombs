import { RoomService } from "../services/room.service.js";

export class RoomController {
  roomService = new RoomService();

  async redirect(route, client, msg) {
    const routes = {
      getRooms: this.roomService.getRooms(client, msg),
      createRoom: this.roomService.createRoom(client, msg),
      enterRoom: this.roomService.enterRoom(client, msg),
    };

    if (!routes[route]) {
      client.send(
        JSON.stringify({ error: true, message: "Invalid Message route" })
      );
    }

    routes[route];
  }
}
