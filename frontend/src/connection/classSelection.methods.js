import { sendMessage } from "./connections";

export const selectClass = (roomData) => {
  console.log(roomData);
  const msg = {
    type: "class/selectClass",
    data: roomData,
  };
  sendMessage(msg);
};

export const ready = (roomData) => {
  console.log(roomData);
  const msg = {
    type: "class/ready",
    data: roomData,
  };
  console.log("READY:", msg);
  sendMessage(msg);
};
