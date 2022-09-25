export default classes = {
  warrior: {
    id: 1,
    name: "Warrior",
    description:
      "Resistente e robusto, um guerreiro que faria de tudo por um sachê",
    stats: {
      hp: 100,
      attack: 10,
      hpPerLevel: 10,
      attackPerLevel: 2,
    },
    skills: [
      {
        id: 1,
        name: "Ataque Furioso",
        description: "Um ataque rápido e muito forte, machuca",
        cooldown: 2,
        type: "attack",
        value: 20,
      },
    ],
  },
  ranger: {
    id: 2,
    name: "Ranger",
    description:
      "Sorrateiro e mortal, tem o andar mais leve dentre todos os gatos",
    stats: {
      hp: 50,
      attack: 16,
      hpPerLevel: 10,
      attackPerLevel: 2,
    },
    skills: [
      {
        id: 2,
        name: "Chuva de flechas",
        description: "Um ataque rápido",
        cooldown: 4,
        type: "attack",
        value: 15,
      },
    ],
  },
  mage: {
    id: 3,
    name: "Mage",
    description:
      "Poderoso e implacável, capaz de lançar feitiços devastadores em quem encostar em sua bola de lã",
    stats: {
      hp: 60,
      attack: 12,
      hpPerLevel: 10,
      attackPerLevel: 2,
    },
    skills: [
      {
        id: 3,
        name: "Bola de Fogo",
        description: "Uma bola de fogo que queima, cuidado viu",
        cooldown: 3,
        type: "attack",
        value: 40,
      },
    ],
  },
  bard: {
    id: 4,
    name: "Bard",
    description:
      "Gracioso, um gato gentil e amigável que faria amizade até com um cachorro",
    stats: {
      hp: 80,
      attack: 6,
      hpPerLevel: 10,
      attackPerLevel: 2,
    },
    actions: {
      attacks: {
        normalAttack: { type: "attack", value: attack, accuracy: 100 },
        strongAttack: { type: "attack", value: attack * 1.5, accuracy: 80 },
      },
      skills: [1],
    },
  },
};
