// import { v4 as uuidv4 } from "uuid";
export let wsConnection = null;

export function createWS(username) {
  return new Promise(function (resolve, reject) {
    wsConnection = new WebSocket("ws://localhost:8080");

    wsConnection.onopen = function () {
      const msg = {
        type: "setUsername",
        data: { username },
      };
      sendMessage(msg);
      console.log("conexão aberta");
      resolve(wsConnection);
    };

    wsConnection.addEventListener("message", (msg) => {
      msg = JSON.parse(msg);
      if (msg.type === "userConnected") {
        sessionStorage.setItem("userData", msg.data);
      }
    });

    wsConnection.onerror = function (err) {
      console.log(err);
      reject(err);
    };
  });
}

export const getRoomList = () => {
  const msg = {
    type: "room/getRooms",
  };
  sendMessage(msg);
};

export const createRoom = (roomName, roomPassword) => {
  const msg = {
    type: "room/createRoom",
    data: { roomName, roomPassword },
  };
  sendMessage(msg);
};

export const setUsername = (username) => {
  const msg = {
    type: "client/setUsername",
    message: { username },
  };
  sendMessage(msg);
};

const sendMessage = (msg) => {
  wsConnection.send(JSON.stringify(msg));
};