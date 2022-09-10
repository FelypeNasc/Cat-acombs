import { v4 as uuidv4 } from "uuid";

export class ClientService {
  async login(client, msg) {
    client.username = msg.data.username;
  }
}

const login = (msgData) => {
  const userId = uuidv4();

  players.push({
    id: userId,
    username: msgData.username,
    browserSession: msgData.browserSession,
  });
  console.log("antes de return");
  return sendUserSession(msgData.browserSession, userId);
};
