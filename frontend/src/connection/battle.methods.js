import { sendMessage } from "./connections";

export const attack = (roomId, attackType) => {
  // attacktype = normalAttack/strongAttack
  const msg = {
    type: "battle/attack",
    data: { roomId, attackType },
  };
  sendMessage(msg);
};

export const skill = (roomId, skillId) => {
  const msg = {
    type: "battle/skill",
    data: { roomId, skillId },
  };
  sendMessage(msg);
};
