import { WebSocketServer } from "ws";
import { v4 as uuidv4 } from "uuid";

import { GlobalController } from "./controllers/global.controller.js";

const port = 8080;
const wss = new WebSocketServer({ port });

const globalController = new GlobalController();

wss.on("connection", (c) => {
  Object.assign(c, { id: uuidv4(), username: "Anonymous" });

  c.send(
    JSON.stringify({
      type: "connected",
    })
  );

  c.on("message", (msg) => {
    globalController.redirect(c, msg);
  });
});

// const sendUserSession = (browserSession, userId) => {
//   const msg = {
//     type: "login",
//     data: {
//       userId,
//     },
//     browserSession,
//   };
//   return JSON.stringify(msg);
// };
