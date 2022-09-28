const battles = {};

import { rooms, RoomService } from "./room.service.js";
import { classes } from "../data/classes.js";
import { enemies } from "../data/enemies.js";
import { randomNumber } from "../utils/randomNumber.js";
import { ChatService } from "./chat.service.js";
import { RoomClient } from "../clients/room.clients.js";
import sendMessageToRoom from "../utils/sendMessageToRoom.js";
import structuredClone from "../utils/structuredClone.js";

export class BattleService {
  constructor() {
    this.chatService = new ChatService();
    this.roomService = new RoomService();
    this.roomClient = new RoomClient();
  }

  async attack(client, msg) {
    const { roomId, attackType } = msg.data;
    const battleData = battles[roomId];
    const { turnIndex, turnList, players, enemy } = battleData;

    if (!battleData) return;

    if (turnList[turnIndex].id !== client.id) return;

    const playerIndex = players.map((e) => e.playerId).indexOf(client.id);
    const playerData = players[playerIndex];

    const attackSucceded = randomNumber(
      0,
      100,
      playerData.actions.attacks[attackType].accuracy
    );

    if (!attackSucceded) {
      const systemMessage = `${client.username} errou o ataque!`;
      this.chatService.systemMessage(roomId, systemMessage);
      this.verifyTurn(roomId);
      this.battleUpdated(roomId);

      return;
    }

    const attackDmg =
      playerData.actions.attacks[attackType].multiplier *
      playerData.stats.attack;

    attackDmg > enemy.stats.currentHp
      ? (enemy.stats.currentHp = 0)
      : (enemy.stats.currentHp -= attackDmg);

    const systemMessage = `${client.username} atacou ${enemy.name} causando ${attackDmg} de dano!`;
    this.chatService.systemMessage(roomId, systemMessage);

    this.verifyHps(roomId);
    this.verifyTurn(roomId);
    this.battleUpdated(roomId);
  }

  async skill(client, msg) {
    const { roomId, skillId } = msg.data;
    const battleData = battles[roomId];
    const { turnIndex, turnList, players, enemy } = battleData;

    if (!battleData) return;

    if (turnList[turnIndex].id !== client.id) return;

    const playerIndex = players.map((e) => e.playerId).indexOf(client.id);
    const playerData = players[playerIndex];

    const skillIndex = playerData.actions.skills
      .map((e) => e.id)
      .indexOf(skillId);
    const skillData = playerData.actions.skills[skillIndex];

    if (skillData.onCooldown) {
      const response = {
        type: "skillOnCooldown",
      };
      client.send(JSON.stringify(response));
      return;
    }
    const critical = randomNumber(0, 100, skillData.critRate);

    let skillValue = playerData.stats.attack * skillData.multiplier;

    if (critical) skillValue *= skillData.critMultiplier;

    let systemMessage = ``;

    switch (skillData.type) {
      case "attack":
        skillValue > enemy.stats.currentHp
          ? (enemy.stats.currentHp = 0)
          : (enemy.stats.currentHp -= skillValue);

        const criticalText = "Dano crítico! ";
        systemMessage = `${critical ? criticalText : ""}${
          client.username
        } usou ${skillData.name} em ${
          enemy.name
        } causando ${skillValue} de dano!`;

        break;
      case "cure":
        players.forEach((p) => {
          const { maxHp } = p.stats;
          skillValue + p.stats.currentHp > maxHp
            ? (p.stats.currentHp = maxHp)
            : (p.stats.currentHp += skillValue);
        });

        systemMessage = `${client.username} curou toda a equipe em ${skillValue} pontos!`;

        break;
    }

    skillData.onCooldown = true;
    skillData.cooldownCount = skillData.cooldown;

    this.chatService.systemMessage(roomId, systemMessage);
    this.verifyHps(roomId);
    this.verifyTurn(roomId);
    this.battleUpdated(roomId);
  }

  async enemyTurn(roomId) {
    const battleData = battles[roomId];
    const { players, enemy } = battleData;

    const sortAttack = Math.round(randomNumber(0, 1));
    let attackOrSkill = sortAttack === 0 ? "attack" : "skill";
    attackOrSkill = "attack";

    const allSkillsOnCooldown = enemy.actions.skills.every((e) => e.onCooldown);

    if (allSkillsOnCooldown) attackOrSkill = "attack";

    const attackSucceded = randomNumber(0, 100, enemy.actions.attack.accuracy);

    if (!attackSucceded) {
      const systemMessage = `${enemy.name} errou o ataque!`;
      this.chatService.systemMessage(roomId, systemMessage);
      this.verifyTurn(roomId);
      this.battleUpdated(roomId);

      return;
    }

    if (attackOrSkill === "attack") {
      const attackDmg =
        enemy.actions.attack.multiplier * enemy.stats.baseAttack;

      const targetIndex = Math.round(randomNumber(0, 3));
      const target = players[targetIndex];

      attackDmg > target.stats.currentHp
        ? (target.stats.currentHp = 0)
        : (target.stats.currentHp -= attackDmg);

      const systemMessage = `${enemy.name} atacou ${target.username} causando ${attackDmg} de dano!`;
      this.chatService.systemMessage(roomId, systemMessage);
    }

    if (attackOrSkill === "skill") {
      const skillSorted =
        enemy.actions.skills[
          Math.round(randomNumber(0, enemy.actions.skills.length - 1))
        ];

      const skillDmg = skillSorted.multiplier * enemy.stats.attack;

      let target = {};

      if (skillSorted.multiTarget) {
        target = { name: "todos" };
        players.forEach((p) => {
          skillDmg > p.stats.currentHp
            ? (p.stats.currentHp = 0)
            : (p.stats.currentHp -= skillDmg);
        });
      } else {
        const targetIndex = Math.round(randomNumber(0, 3));
        target = players[targetIndex];

        skillSorted.onCooldown = true;
        skillSorted.cooldownCount = skillSorted.cooldown;

        skillDmg > target.stats.currentHp
          ? (target.stats.currentHp = 0)
          : (target.stats.currentHp -= skillDmg);
      }

      const systemMessage = `${enemy.username} atacou ${target.name} causando ${skillDmg} de dano!`;
      this.chatService.systemMessage(roomId, systemMessage);
    }

    this.verifyHps(roomId);
    this.verifyTurn(roomId);
    this.battleUpdated(roomId);
  }

  async newBattle(doorData, roomId, floor, door) {
    /*  const roomIndex = rooms.map((e) => e.id).indexOf(roomId);
    const room = rooms[roomIndex]; */
    const room = await this.roomClient.getRoom(roomId);
    const playersCharacters = room.players.map((player) => {
      return this.buildCharacter(player);
    });

    const roomEnemy = structuredClone(enemies[doorData.enemyId]);

    const newBattle = {
      id: room.id,
      doorData: { floor, door },
      turnIndex: 0,
      turnList: room.players.map((player) => {
        return { id: player.id, name: player.username };
      }),
      players: playersCharacters,
      enemy: roomEnemy,
    };

    newBattle.turnList.push({ id: "enemy", name: roomEnemy.name });

    battles[roomId] = newBattle;
    return newBattle;
  }

  async cooldownDecrease(roomId) {
    const battleData = battles[roomId];
    const { players, enemy } = battleData;

    players.forEach((p) => {
      p.actions.skills.forEach((s) => {
        s.onCooldown ? s.cooldownCount-- : "";
        s.cooldownCount <= 0 ? (s.onCooldown = false) : "";
      });
    });

    enemy.actions.skills.forEach((s) => {
      s.onCooldown ? s.cooldownCount-- : "";
      s.cooldownCount <= 0 ? (s.onCooldown = false) : "";
    });
  }

  async verifyHps(roomId) {
    const battleData = battles[roomId];
    const { players, enemy } = battleData;

    players.forEach((p) => {
      if (p.stats.currentHp <= 0) {
        p.dead = true;
        const systemMessage = `${p.username} morreu!`;
        this.chatService.systemMessage(roomId, systemMessage);
      }
    });

    const playersDied = players.every((p) => p.dead);

    if (playersDied) {
      this.battleEnd("players", roomId);
      return;
    }

    const enemyDied = enemy.stats.currentHp <= 0;

    if (enemyDied) {
      this.battleEnd("enemy", roomId);
      return;
    }
  }

  async verifyTurn(roomId) {
    const battleData = battles[roomId];

    if (!battleData) return;

    const { id, turnList, players, enemy } = battleData;

    battleData.turnIndex === 4
      ? ((battleData.turnIndex = 0), this.cooldownDecrease(roomId))
      : battleData.turnIndex++;

    if (turnList[battleData.turnIndex].id === "enemy") {
      this.enemyTurn(roomId);
    }
  }

  async battleEnd(dead, roomId) {
    /* const roomIndex = rooms.map((e) => e.id).indexOf(roomId);
    const room = rooms[roomIndex]; */
    const room = await this.roomClient.getRoom(roomId);

    if (dead === "players") {
      const response = {
        type: "playersDied",
      };
      this.battleUpdated(roomId);
      sendMessageToRoom(roomId, response);

      delete battles[roomId];

      setTimeout(async () => {
        room.currentView = "doors";
        await this.roomClient.updateRoom(roomId, room);
        this.roomService.roomUpdated(roomId);
      }, 10000);
    }

    if (dead === "enemy") {
      const response = {
        type: "enemyDied",
      };
      this.battleUpdated(roomId);
      sendMessageToRoom(roomId, response);

      const battleDoor = battles[roomId].doorData;
      await this.roomService.unlockNextRoom(roomId, battleDoor);

      const isEndgame = battleDoor.floor === 4 && battleDoor.door === 4;

      if (isEndgame) {
        return;
      }

      await this.levelUpPlayers(roomId);
      await this.saveHps(roomId);

      delete battles[roomId];

      setTimeout(async () => {
        const room = await this.roomClient.getRoom(roomId);
        room.currentView = "doors";
        await this.roomClient.updateRoom(roomId, room);
        await this.roomService.roomUpdated(roomId);
      }, 10000);
    }
  }

  async levelUpPlayers(roomId) {
    const room = await this.roomClient.getRoom(roomId);

    room.players.forEach((p) => {
      const classRawData = classes[p.character.class];
      const { stats } = structuredClone(classRawData);

      p.character.level++;
      p.character.maxHp =
        stats.baseHp + (p.character.level - 1) * stats.hpPerLevel;
      p.character.currentHp += stats.hpPerLevel;
    });

    await this.roomClient.updateRoom(roomId, room);
  }

  async saveHps(roomId) {
    const room = await this.roomClient.getRoom(roomId);

    room.players.forEach((p) => {
      const playerOnRoom = battles[roomId].players.find(
        (roomP) => roomP.playerId === p.id
      );

      const defeatHealMultiplier = 1.5;
      const newHp = p.character.currentHp * defeatHealMultiplier;

      newHp <= playerOnRoom.stats.maxHp
        ? (playerOnRoom.stats.currentHp = playerOnRoom.stats.maxHp)
        : (playerOnRoom.stats.currentHp = newHp);
    });

    await this.roomClient.updateRoom(roomId, room);
  }

  buildCharacter(playerData) {
    const classRawData = classes[playerData.character.class];
    const { name, description, stats, actions } = structuredClone(classRawData);
    const newCharacter = {
      playerId: playerData.id,
      username: playerData.username,
      level: playerData.character.level,
      class: name,
      description,
      dead: false,
      stats: {
        currentHp: playerData.character.currentHp,
        maxHp:
          stats.baseHp +
          stats.hpPerLevel * playerData.character.level -
          stats.hpPerLevel,
        attack:
          stats.baseAttack +
          stats.attackPerLevel * playerData.character.level -
          stats.attackPerLevel,
      },
      actions,
    };

    return newCharacter;
  }

  async battleUpdated(roomId) {
    const battle = battles[roomId];

    const messageToRoom = {
      type: "battleUpdated",
      data: battle,
    };

    sendMessageToRoom(roomId, messageToRoom);
  }

  async setInitialStats(roomId) {
    const room = await this.roomClient.getRoom(roomId);

    room.players.forEach((player) => {
      const classRawData = classes[player.character.class];
      const { stats } = structuredClone(classRawData);

      player.character.currentHp = stats.baseHp;
      player.character.maxHp = stats.baseHp;
    });

    await this.roomClient.updateRoom(roomId, room);
  }
}
