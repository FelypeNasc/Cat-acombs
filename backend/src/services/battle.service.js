const battles = {
  Abuble: {
    id: "uuidv4()",
    turnIndex: 0,
    turnList: ["junin", "diego", "maria", "gabriela", "enemy"],
    players: [
      {
        username: "junin",
        name: "Warrior",
        description:
          "Resistente e robusto, um guerreiro que faria de tudo por um sachê",
        stats: {
          baseHp: 100,
          baseAttack: 10,
          hpPerLevel: 10,
          attackPerLevel: 2,
        },
        actions: {
          attacks: {
            normalAttack: { type: "attack", multiplier: 1, accuracy: 100 },
            strongAttack: { type: "attack", multiplier: 1.5, accuracy: 80 },
          },
          skills: [
            {
              id: 1,
              name: "Ataque Furioso",
              description:
                "Um ataque rápido e muito forte com sua espada, machuca",
              cooldown: 2,
              type: "attack",
              value: 20,
            },
          ],
        },
      },
      {
        username: "junin",
        stats: {
          currentHp: 20,
          maxHp: 100,
        },
      },
    ],
    enemy: {},
  },
};

import { rooms } from "./room.service.js";
import { classes } from "../data/classes.js";
import { enemies } from "../data/enemies.js";

export class BattleService {
  async newBattle(doorData, roomId, floor, door) {
    const roomIndex = rooms.map((e) => e.id).indexOf(roomId);
    const room = rooms[roomIndex];

    const playersCharacters = room.players.map((player) => {
      return this.buildCharacter(player);
    });

    const roomEnemy = enemies[doorData.boss.id];

    const newBattle = {
      id: room.id,
      turnIndex: 0,
      turnList: room.players.map((player) => player.id),
      players: playersCharacters,
      enemy: roomEnemy,
    };

    newBattle.turnList.push("enemy");
  }

  async attack(client, msg) {}
  async skill(client, msg) {}

  async buildCharacter(playerData) {
    const classRawData = classes[playerData.character.class];
    const { name, description, stats, actions } = classRawData;
    const newCharacter = {
      playerId: playerData.id,
      username: playerData.username,
      level: playerData.character.level,
      class: name,
      description,
      stats: {
        currentHp: playerData.character.currentHp,
        maxHp: stats.baseHp + stats.hpPerLevel * level - stats.hpPerLevel,
        attack:
          stats.attack + stats.attackPerLevel * level - stats.attackPerLevel,
      },
      actions,
    };

    return newCharacter;
  }

  async buildEnemy(id) {}
}
