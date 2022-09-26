export const enemies = {
  1: {
    id: 1,
    name: "Fra-cão",
    stats: {
      currentHp: 200,
      maxHp: 200,
      baseAttack: 20,
    },
    actions: {
      attack: { type: "attack", multiplier: 1, accuracy: 100 },
      skills: [
        {
          id: 5,
          name: "Granada canina",
          cooldown: 3,
          type: "attack",
          multiTarget: false,
          multiplier: 1.5,
        },
      ],
    },
  },
  2: {
    id: 2,
    name: "Puguerreiro",
    stats: {
      currentHp: 220,
      maxHp: 220,
      baseAttack: 25,
    },
    actions: {
      attack: { type: "attack", multiplier: 1, accuracy: 100 },
      skills: [
        {
          id: 6,
          name: "Golpe esmagador",
          cooldown: 2,
          type: "attack",
          multiTarget: false,
          multiplier: 1.3,
        },
      ],
    },
  },
  3: {
    id: 3,
    name: "Cãoshin",
    stats: {
      currentHp: 220,
      maxHp: 220,
      baseAttack: 35,
    },
    actions: {
      attack: { type: "attack", multiplier: 1, accuracy: 100 },
      skills: [
        {
          id: 7,
          name: "Corte mortal",
          cooldown: 3,
          type: "attack",
          multiTarget: false,
          multiplier: 1.2,
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
      currentHp: 300,
      maxHp: 300,
      baseAttack: 25,
    },
    actions: {
      attack: { type: "attack", multiplier: 1, accuracy: 100 },
      skills: [
        {
          id: 8,
          name: "Tiroteio animal",
          cooldown: 4,
          type: "attack",
          multiTarget: true,
          multiplier: 1.5,
        },
      ],
    },
  },
  5: {
    id: 5,
    name: "Pastor Sinistrão",
    stats: {
      currentHp: 300,
      maxHp: 300,
      baseAttack: 30,
    },
    actions: {
      attack: { type: "attack", multiplier: 1, accuracy: 100 },
      skills: [
        {
          id: 9,
          name: "Latido revigorante",
          cooldown: 3,
          type: "cure",
          multiTarget: false,
          multiplier: 1.5,
        },
      ],
    },
  },
  6: {
    id: 6,
    name: "Akitacalor",
    stats: {
      currentHp: 350,
      maxHp: 350,
      baseAttack: 30,
    },
    actions: {
      attack: { type: "attack", multiplier: 1, accuracy: 100 },
      skills: [
        {
          id: 10,
          name: "Fogarel",
          cooldown: 4,
          type: "attack",
          multiTarget: true,
          multiplier: 1.5,
        },
      ],
    },
  },
  7: {
    id: 7,
    name: "Doberserker",
    stats: {
      currentHp: 400,
      maxHp: 400,
      baseAttack: 35,
    },
    actions: {
      attack: { type: "attack", multiplier: 1, accuracy: 100 },
      skills: [
        {
          id: 11,
          name: "Espadada forte",
          cooldown: 2,
          type: "attack",
          multiTarget: false,
          multiplier: 1.5,
        },
      ],
    },
  },
  8: {
    id: 8,
    name: "Pit Bruto",
    stats: {
      currentHp: 450,
      maxHp: 450,
      baseAttack: 40,
    },
    actions: {
      attack: { type: "attack", multiplier: 1, accuracy: 100 },
      skills: [
        {
          id: 12,
          name: "Porradão",
          cooldown: 2,
          type: "attack",
          multiTarget: false,
          multiplier: 1.5,
        },
      ],
    },
  },
  9: {
    id: 9,
    name: "Loboss",
    stats: {
      currentHp: 500,
      maxHp: 500,
      baseAttack: 45,
    },
    actions: {
      attack: { type: "attack", multiplier: 1, accuracy: 100 },
      skills: [
        {
          id: 13,
          name: "Garra do lobo",
          cooldown: 3,
          type: "attack",
          multiTarget: false,
          multiplier: 2,
        },
      ],
    },
  },
};
