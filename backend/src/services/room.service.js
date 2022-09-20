const rooms = [
  {
    id: "1",
    roomName: "OS BRABOS 1",
    creatorName: "juao",
    currentView: "classSelection",
    players: [
      {
        id: "1",
        username: "juao",
        class: "warrior",
      },
      {
        id: "2",
        username: "maria",
        class: "warrior",
      },
    ],
  },
  {
    id: "2",
    roomName: "OS BRABOS 2",
    creatorName: "juao",
    players: [
      {
        id: "1",
        username: "juao",
        class: "warrior",
      },
      {
        id: "2",
        username: "maria",
        class: "warrior",
      },
    ],
  },
  {
    id: "3",
    roomName: "OS BRABOS 3",
    creatorName: "juao",
    players: [
      {
        id: "1",
        username: "juao",
        class: "warrior",
      },
      {
        id: "2",
        username: "maria",
        class: "warrior",
      },
    ],
  },
  {
    id: "4",
    roomName: "OS BRABOS 4",
    creatorName: "juao",
    players: [
      {
        id: "1",
        username: "juao",
        class: "warrior",
      },
      {
        id: "2",
        username: "maria",
        class: "warrior",
      },
    ],
  },
  {
    id: "5",
    roomName: "OS BRABOS 5",
    creatorName: "juao",
    players: [
      {
        id: "1",
        username: "juao",
        class: "warrior",
      },
      {
        id: "2",
        username: "maria",
        class: "warrior",
      },
    ],
  },
  {
    id: "6",
    roomName: "OS BRABOS 6",
    creatorName: "juao",
    players: [
      {
        id: "1",
        username: "juao",
        class: "warrior",
      },
      {
        id: "2",
        username: "maria",
        class: "warrior",
      },
    ],
  },
  {
    id: "7",
    roomName: "OS BRABOS 7",
    creatorName: "juao",
    players: [
      {
        id: "1",
        username: "juao",
        class: "warrior",
      },
      {
        id: "2",
        username: "maria",
        class: "warrior",
      },
    ],
  },
  {
    id: "8",
    roomName: "OS BRABOS 8",
    creatorName: "juao",
    players: [
      {
        id: "1",
        username: "juao",
        class: "warrior",
      },
      {
        id: "2",
        username: "maria",
        class: "warrior",
      },
    ],
  },
  {
    id: "9",
    roomName: "OS BRABOS 9",
    creatorName: "juao",
    players: [
      {
        id: "1",
        username: "juao",
        class: "warrior",
      },
      {
        id: "2",
        username: "maria",
        class: "warrior",
      },
    ],
  },
  {
    id: "10",
    roomName: "OS BRABOS 10",
    creatorName: "juao",
    players: [
      {
        id: "1",
        username: "juao",
        class: "warrior",
      },
      {
        id: "2",
        username: "maria",
        class: "warrior",
      },
    ],
  },
]; // TODO: colocar pro redis

import { v4 as uuidv4 } from "uuid";

export class RoomService {
  async getRooms(client, msg) {
    const response = {
      type: "getRooms",
      data: rooms,
    };
    client.send(JSON.stringify(response));
  }

  async createRoom(client, msg) {
    const newRoom = {
      id: uuidv4(),
      roomName: msg.data.roomName,
      creatorName: client.username,
      players: [
        {
          id: client.id,
          username: client.username,
          class: null,
        },
      ],
    };
    rooms.push(newRoom);
    const response = {
      type: "roomCreated",
      data: newRoom,
    };
    client.send(JSON.stringify(response));
  }

  async deleteRoom(client, msg) {}

  async enterRoom(client, msg) {}
}
