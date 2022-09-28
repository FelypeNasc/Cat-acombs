import { sendMessage } from "./connections";

export const attack = (roomId, action) => {
  // attacktype = normalAttack/strongAttack
  const msg = {
    type: "battle/attack",
    data: { roomId, attackType: action.keyName },
  };
  sendMessage(msg);
};

export const skill = (roomId, action) => {
  const msg = {
    type: "battle/skill",
    data: { roomId, skillId: action.id },
  };

  sendMessage(msg);
};
