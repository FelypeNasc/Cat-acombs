import { sendMessage } from "./connections";

export const enterDoor = (data) => {
  const { floor, door, roomId } = data;

  const msg = {
    type: "door/enterDoor",
    data: { floor, door, roomId },
  };
  sendMessage(msg);
};
