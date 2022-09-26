import { sendMessage } from "./connections";

export const getRoomList = () => {
  const msg = {
    type: "room/getRooms",
  };
  sendMessage(msg);
};

export const createRoom = (roomData) => {
  const { name, password } = roomData;
  console.log(roomData);
  const msg = {
    type: "room/createRoom",
    data: { roomName: name, roomPassword: password },
  };
  sendMessage(msg);
};

export const enterRoom = (roomData) => {
  const msg = {
    type: "room/enterRoom",
    data: { roomId: roomData.id, roomPassword: roomData.password },
  };
  console.log(roomData);
  console.log("ENTER ROOM", msg);
  sendMessage(msg);
};

export const userOnLobby = () => {
  const msg = {
    type: "room/userOnLobby",
  };

  sendMessage(msg);
};

export const leaveRoom = (roomData) => {
  const msg = {
    type: "room/leaveRoom",
    data: { roomId: roomData.id },
  };
  sendMessage(msg);
};
