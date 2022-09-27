import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

import { GlobalController } from "./controllers/global.controller.js";
import { disconnectPlayer } from "./utils/disconnectPlayer.js";
import { RoomService } from "./services/room.service.js";

const port = 8080;
export const wss = new WebSocketServer({ port });

const globalController = new GlobalController();

wss.on("connection", (c) => {
  Object.assign(c, { id: uuidv4(), username: "Anonymous" });

  c.send(
    JSON.stringify({
      type: "connected",
    })
  );

  c.on("message", (msg) => {
    msg = JSON.parse(msg);

    if (msg.type === "setUsername") {
      Object.assign(c, { username: msg.data.username });
      c.send(
        JSON.stringify({
          type: "userConnected",
          data: { username: c.username, id: c.id },
        })
      );
      return;
    }

    globalController.redirect(c, msg);
  });

  c.on("close", async () => {
    const roomService = new RoomService();
    await roomService.deletePlayerFromRooms(c.id);
    console.log(`${c.username} DISCONNECTED`);
  });
});
