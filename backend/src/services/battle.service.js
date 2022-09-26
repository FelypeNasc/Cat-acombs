const battles = {};

import { rooms, RoomService } from "./room.service.js";
import { classes } from "../data/classes.js";
import { enemies } from "../data/enemies.js";
import { randomNumber } from "../utils/randomNumber.js";
import { ChatService } from "./chat.service.js";
import sendMessageToRoom from "../utils/sendMessageToRoom.js";

export class BattleService {
  constructor() {
    this.chatService = new ChatService();
    this.roomService = new RoomService();
  }

  async attack(client, msg) {
    const { roomId, attackType } = msg.data;
    const battleData = battles[roomId];
    const { turnIndex, turnList, players, enemy } = battleData;

    if (!battleData) return;

    if (turnList[turnIndex] !== client.id) return;

    const playerIndex = players.map((e) => e.id).indexOf(client.id);
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

      return;
    }

    const attackDmg =
      playerData.actions.attacks[attackType].multiplier *
      playerData.stats.attack;

    attackDmg > enemy.currentHp
      ? (enemy.currentHp = 0)
      : (enemy.currentHp -= attackDmg);

    const systemMessage = `${client.username} atacou ${enemy.name} causando ${attackDmg} de dano!`;
    this.chatService.systemMessage(roomId, systemMessage);

    this.verifyHps(roomId);
    this.verifyTurn(roomId);
    this.battleUpdated(roomId)
  }

  async skill(client, msg) {
    const { roomId, attackType } = msg.data;
    const battleData = battles[roomId];
    const { id, turnIndex, turnList, players, enemy } = battleData;

    if (!battleData) return;

    if (turnList[turnIndex] !== client.id) return;

    const playerIndex = players.map((e) => e.id).indexOf(client.id);
    const playerData = players[playerIndex];

    const skillIndex = playerData.skills.map((e) => e.id).indexOf(client.id);
    const skillData = playerData.skills[skillIndex];

    if (skillData.onCooldown) {
      const response = {
        type: "skillOnCooldown",
      };
      client.send(JSON.stringify(response));
      return;
    }
    const critical = randomNumber(0, 100, skillData.critRate);

    let skillValue = playerData.stats.attack * skillData.multiplier;
    critical ? (skillDmg *= skillData.critMultiplier) : "";

    let systemMessage = ``;

    switch (skillData.type) {
      case "attack":
        skillValue > enemy.currentHp
          ? (enemy.currentHp = 0)
          : (enemy.currentHp -= skillValue);

        const criticalText = "Dano crítico! ";
        systemMessage = `${critical ? criticalText : ""}${
          client.username
        } usou ${skillData.name} em ${
          enemy.name
        } causando ${skillValue} de dano!`;

        break;
      case "cure":
        players.forEach((p) => {
          const { currentHp, maxHp } = p.stats;
          skillValue > currentHp
            ? (currentHp = maxHp)
            : (currentHp += skillValue);
        });

        systemMessage = `${client.username} curou toda a equipe em ${skillValue} pontos!`;

        break;
    }

    skillData.onCooldown = true;
    skillData.cooldownCount = skillData.cooldown;

    this.chatService.systemMessage(roomId, systemMessage);
    this.verifyHps(roomId);
    this.verifyTurn(roomId);
    this.battleUpdated(roomId)
  }

  async enemyTurn(roomId) {
    const battleData = battles[roomId];
    const { players, enemy } = battleData;

    const sortAttack = Math.round(randomNumber(0, 1));
    const attackOrSkill = sortAttack === 0 ? "attack" : "skill";

    const attackSucceded = randomNumber(0, 100, enemy.actions.attack.accuracy);

    if (!attackSucceded) {
      const systemMessage = `${enemy.name} errou o ataque!`;
      this.chatService.systemMessage(roomId, systemMessage);
      this.verifyTurn(roomId);
      return;
    }

    if (attackOrSkill === "attack") {
      const attackDmg = enemy.actions.attack.multiplier * enemy.stats.attack;

      const targetIndex = Math.round(randomNumber(0, 3));
      const target = players[targetIndex];

      attackDmg > target.stats.currentHp
        ? (target.stats.currentHp = 0)
        : (target.stats.currentHp -= attackDmg);

      const systemMessage = `${enemy.username} atacou ${target.name} causando ${attackDmg} de dano!`;
      this.chatService.systemMessage(roomId, systemMessage);
    }

    if (attackOrSkill === "skill") {
      const skillSorted =
        enemy.actions.skills[
          Math.round(randomNumber(0, enemy.actions.skills.length))
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
    this.battleUpdated(roomId)
  }

  async newBattle(doorData, roomId, floor, door) {
    const roomIndex = rooms.map((e) => e.id).indexOf(roomId);
    const room = rooms[roomIndex];

    const playersCharacters = room.players.map((player) => {
      return this.buildCharacter(player);
    });

    const roomEnemy = enemies[doorData.enemyId];

    const newBattle = {
      id: room.id,
      doorData: { floor, door },
      turnIndex: 0,
      turnList: room.players.map((player) => player.id),
      players: playersCharacters,
      enemy: roomEnemy,
    };

    newBattle.turnList.push("enemy");

    battles[roomId] = newBattle;
  }

  async cooldownDecrease(roomId) {
    const battleData = battles[roomId];
    const { players, enemy } = battleData;

    players.actions.skills.forEach((s) => {
      s.onCooldown ? s.cooldownCount-- : "";
      s.cooldownCount <= 0 ? (s.onCooldown = false) : "";
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
      if (p.currentHp <= 0) {
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
    const { id, turnIndex, turnList, players, enemy } = battleData;

    turnIndex === 4
      ? ((turnIndex = 0), this.cooldownDecrease(roomId))
      : turnIndex++;

    if (turnList[turnIndex] === "enemy") {
      this.enemyTurn(roomId);
    }
  }

  async battleEnd(dead, roomId) {
    const roomIndex = rooms.map((e) => e.id).indexOf(roomId);
    const room = rooms[roomIndex];

    if (dead === "players") {
      const response = {
        type: "playersDied",
      };
      sendMessageToRoom(roomId, response);

      delete battles[roomId];

      setTimeout(() => {
        room.currentView = "doors";
        this.roomService.roomUpdated(roomId);
      }, 5000);
    }
    if (dead === "enemy") {
      const response = {
        type: "enemyDied",
      };
      sendMessageToRoom(roomId, response);

      const isLastRoomUnlocked =
        battles[roomId].floorData === room.doors.lastUnlocked;

      // TODO: fazer final de jogo
      // const isEndgame = () => {}

      if (isLastRoomUnlocked) {
        this.roomService.unlockNextRoom(roomId);
      }

      this.levelUpPlayers(roomId);
      this.saveHps(roomId);

      delete battles[roomId];

      setTimeout(() => {
        room.currentView = "doors";
        this.roomService.roomUpdated(roomId);
      }, 5000);
    }
  }

  async levelUpPlayers(roomId) {
    const roomIndex = rooms.map((e) => e.id).indexOf(roomId);
    const room = rooms[roomIndex];

    room.players.forEach((p) => {
      const classRawData = classes[player.character.class];
      const { stats } = classRawData;

      p.level++;
      player.character.currentHp = stats.baseHp + p.level * stats.hpPerLevel;
    });
  }

  async saveHps(roomId) {
    const roomIndex = rooms.map((e) => e.id).indexOf(roomId);
    const room = rooms[roomIndex];

    room.players.forEach((p) => {
      const playerOnRoom = battles[roomId].players.find(
        (roomP) => roomP.playerId === p.id
      );

      const defeatHealMultiplier = 1.5;
      const newHp = p.stats.currentHp * defeatHealMultiplier;

      newHp <= playerOnRoom.stats.maxHp
        ? (playerOnRoom.stats.currentHp = playerOnRoom.stats.maxHp)
        : (playerOnRoom.stats.currentHp = newHp);
    });
  }

  async buildCharacter(playerData) {
    const classRawData = classes[playerData.character.class];
    console.log("classRawData", classRawData);
    const { name, description, stats, actions } = classRawData;
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
    const roomIndex = rooms.map((e) => e.id).indexOf(roomId);

    rooms[roomIndex].players.forEach((player) => {
      const classRawData = classes[player.character.class];
      const { stats } = classRawData;

      player.character.currentHp = stats.baseHp;
      player.character.maxHp = stats.baseHp;
    });
  }
}
