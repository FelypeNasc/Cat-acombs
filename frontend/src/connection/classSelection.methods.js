import { sendMessage } from "./connections";

export const selectClass = (roomData) => {
  const msg = {
    type: "class/selectClass",
    data: roomData,
  };
  sendMessage(msg);
};

export const ready = (roomData) => {
  const msg = {
    type: "class/ready",
    data: roomData,
  };
  sendMessage(msg);
};
