import { sendMessage } from "./connections";

export const attack = (roomId, action) => {
  // attacktype = normalAttack/strongAttack
  const msg = {
    type: "battle/attack",
    data: { roomId, attackType: action.keyName },
  };
  console.log("ATACAARRR", msg);
  sendMessage(msg);
};

export const skill = (roomId, action) => {
  const msg = {
    type: "battle/skill",
    data: { roomId, skillId: action.id },
  };
  console.log("HABILIDADE", msg);

  sendMessage(msg);
};
