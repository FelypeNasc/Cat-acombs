import { v4 as uuidv4 } from "uuid";

export class ClientService {
  async setUsername(client, msg) {
    // client.username = msg.data.username;
  }
}

const login = (msgData) => {
  const userId = uuidv4();

  players.push({
    id: userId,
    username: msgData.username,
    browserSession: msgData.browserSession,
  });
  return sendUserSession(msgData.browserSession, userId);
};
