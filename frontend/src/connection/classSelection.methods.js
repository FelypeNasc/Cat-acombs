import { sendMessage } from "./connections";

export const selectClass = () => {
  const msg = {
    type: "class/selectClass",
    data: "selectClass",
  };
  sendMessage(msg);
};
