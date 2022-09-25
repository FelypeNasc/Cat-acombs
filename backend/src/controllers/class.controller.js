import { ClassService } from "../services/class.service.js";

export class ClassController {
  classService = new ClassService();

  async redirect(route, client, msg) {
    const routes = {
      selectClass: () => this.classService.selectClass(client, msg),
      ready: () => this.classService.ready(client, msg),
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
