import { wss } from "../server.js";
import { rooms } from "../services/room.service.js";

export default function sendMessageToRoom(roomId, msg) {
  const room = rooms.find((room) => (room.id = roomId));
  const roomPlayersIds = room.players.map((player) => player.id);

  [...wss.clients]
    .filter((connection) => {
      return roomPlayersIds.includes(connection.id);
    })
    .forEach((connection) => {
      connection.send(JSON.stringify(msg));
    });
}
