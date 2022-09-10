import { Server } from "../../server";
import { v4 as uuid } from "uuid";
import { WebSocketServer } from "ws";

export class Connection {
  id;
  #socket;
  #events;

  constructor(wsocket) {
    this.id = uuid();
    this.#socket = wsocket;
    this.#events = new Map();
    this.send("connected", this.id);
    this.#socket.on("message", (resp) => this.message(resp));
    this.add("moveTo", (data) => {
      console.log("Movendo para", data);
      this.send("movedTo", data);
    });
  }

  send(type, data) {
    const msg = {
      type,
      data,
      date: Date.now(),
    };
    console.log(type, data);
    this.#socket.send(JSON.stringify(msg));
  }

  message(resp) {
    const msg = JSON.parse(resp);
    //console.log(this.events);
    if (!this.#events.has(msg.type)) return;
    const event = this.#events.get(msg.type)!;
    event(msg.data);
  }

  add(type, event) {
    this.#events.set(type, event);
  }

  remove(type) {
    if (this.#events.has(type)) {
      return this.#events.delete(type);
    }
    return false;
  }
}

export class Connections {
  instance;
  connections;

  constructor(server) {
    this.connections = new Map();
    this.instance = new WebSocketServer({ server: server.instance });
    this.instance.on("connection", (wsocket) => {
      const connection = new Connection(wsocket);
      this.connections.set(connection.id, connection);
      //socket.send(connection.id);
    });
  }
}
