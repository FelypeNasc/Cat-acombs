import { BattleService } from "../services/battle.service.js";

export class BattleController {
  battleService = new BattleService();

  async redirect(route, client, msg) {
    const routes = {
      attack: () => this.battleService.attack(client, msg),
      skill: () => this.battleService.skill(client, msg),
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
