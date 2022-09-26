import { ClientService } from "../services/client.service.js";

export class ClientController {
  clientService = new ClientService();

  async redirect(route, client, msg) {

    const routes = {
      setUsername: () => this.clientService.setUsername(client, msg),
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
