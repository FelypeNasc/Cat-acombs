export const enemies = {
  1: {
    id: 1,
    name: "Fra-cão",
    stats: {
      baseHp: 200,
      baseAttack: 20,
    },
    actions: {
      attack: { type: "attack" },
      skills: [
        {
          id: 5,
          name: "Granada canina",
          cooldown: 3,
          type: "attack",
          multiTarget: false,
          multiplyer: 1.5,
        },
      ],
    },
  },
  2: {
    id: 2,
    name: "Puguerreiro",
    stats: {
      baseHp: 220,
      baseAttack: 25,
    },
    actions: {
      attack: { type: "attack" },
      skills: [
        {
          id: 6,
          name: "Golpe esmagador",
          cooldown: 2,
          type: "attack",
          multiTarget: false,
          multiplyer: 1.3,
        },
      ],
    },
  },
  3: {
    id: 3,
    name: "Cãoshin",
    stats: {
      baseHp: 220,
      baseAttack: 35,
    },
    actions: {
      attack: { type: "attack" },
      skills: [
        {
          id: 7,
          name: "Corte mortal",
          cooldown: 3,
          type: "attack",
          multiTarget: false,
          multiplyer: 1.2,
          critRate: 50,
          critMultiplayer: 1.5,
        },
      ],
    },
  },
  4: {
    id: 4,
    name: "Chow-tchau",
    stats: {
      baseHp: 300,
      baseAttack: 25,
    },
    actions: {
      attack: { type: "attack" },
      skills: [
        {
          id: 8,
          name: "Tiroteio animal",
          cooldown: 4,
          type: "attack",
          multiTarget: true,
          multiplyer: 1.5,
        },
      ],
    },
  },
  5: {
    id: 5,
    name: "Pastor Sinistrão",
    stats: {
      baseHp: 300,
      baseAttack: 30,
    },
    actions: {
      attack: { type: "attack" },
      skills: [
        {
          id: 9,
          name: "Latido revigorante",
          cooldown: 2,
          type: "cure",
          multiTarget: false,
          multiplyer: 1.5,
        },
      ],
    },
  },
  6: {
    id: 6,
    name: "Akitacalor",
    stats: {
      baseHp: 350,
      baseAttack: 30,
    },
    actions: {
      attack: { type: "attack" },
      skills: [
        {
          id: 10,
          name: "Fogarel",
          cooldown: 4,
          type: "attack",
          multiTarget: true,
          multiplyer: 1.5,
        },
      ],
    },
  },
  7: {
    id: 7,
    name: "Doberserker",
    stats: {
      baseHp: 400,
      baseAttack: 35,
    },
    actions: {
      attack: { type: "attack" },
      skills: [
        {
          id: 11,
          name: "Espadada forte",
          cooldown: 2,
          type: "attack",
          multiTarget: false,
          multiplyer: 1.5,
        },
      ],
    },
  },
  8: {
    id: 8,
    name: "Pit Bruto",
    stats: {
      baseHp: 450,
      baseAttack: 40,
    },
    actions: {
      attack: { type: "attack" },
      skills: [
        {
          id: 12,
          name: "Porradão",
          cooldown: 2,
          type: "attack",
          multiTarget: false,
          multiplyer: 1.5,
        },
      ],
    },
  },
  9: {
    id: 9,
    name: "Loboss",
    stats: {
      baseHp: 500,
      baseAttack: 45,
    },
    actions: {
      attack: { type: "attack" },
      skills: [
        {
          id: 13,
          name: "Garra do lobo",
          cooldown: 3,
          type: "attack",
          multiTarget: false,
          multiplyer: 2,
        },
      ],
    },
  },
};
