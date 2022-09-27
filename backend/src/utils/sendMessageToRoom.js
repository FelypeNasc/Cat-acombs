import { wss } from "../server.js";
import { rooms } from "../services/room.service.js";
import { RoomClient } from "../clients/room.clients.js";

export default async function sendMessageToRoom(roomId, msg) {
  const roomClient = new RoomClient();

  const room = await roomClient.getRoom(roomId);
  const roomPlayersIds = room.players.map((player) => player.id);

  [...wss.clients]
    .filter((connection) => {
      return roomPlayersIds.includes(connection.id);
    })
    .forEach((connection) => {
      connection.send(JSON.stringify(msg));
    });
}
