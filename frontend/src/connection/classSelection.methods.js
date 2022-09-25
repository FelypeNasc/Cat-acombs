import { sendMessage } from "./connections";

export const selectClass = (roomData) => {
  console.log(roomData);
  const msg = {
    type: "class/selectClass",
    data: roomData,
  };
  sendMessage(msg);
};
