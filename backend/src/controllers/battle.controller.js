import { BattleService } from "../services/battle.service.js";

export class BattleController {
  battleService = new BattleService();

  async redirect(route, client, msg) {
    console.log("BATTLE CONTROLLER");
    console.log("ROUTE: ", route);
    console.log("MESSAGE: ", msg);

    const routes = {
      setUsername: () => this.battleService.test(client, msg),
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
