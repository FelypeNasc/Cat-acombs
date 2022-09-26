<template>
  <div class="dense noselect">
    <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 items-center">
      <div class="11">
        <HPComponent
          class="w-[60%] big-screen"
          :playerStatus="players[0]"
        ></HPComponent>
      </div>
      <div class="12">
        <HPComponent
          class="w-[60%] big-screen"
          :playerStatus="players[1]"
        ></HPComponent>
      </div>
      <div class="13 row-span-2 w-32">
        <BossHPComponent :bossStatus="enemy"></BossHPComponent>
      </div>
      <div class="21">
        <HPComponent
          class="w-[60%] big-screen"
          :playerStatus="players[2]"
        ></HPComponent>
      </div>
      <div class="22">
        <HPComponent
          class="w-[60%] big-screen"
          :playerStatus="players[3]"
        ></HPComponent>
      </div>
      <div class="31 col-span-2 ml-10">
        <joystick-component
          :playerStatus="players[0]"
          @emitAction="playerAction"
        ></joystick-component>
      </div>
      <div class="33">
        <div class="showTurn mt-10 bg-blend-darken font-squirk text-xl">
          <h1 v-for="n in 5" :key="n">
            <div v-if="turnIndex === n">
              <h1 class="opacity-100">{{ turnList[n - 1].name }}</h1>
            </div>
            <div v-else>
              <h1 class="opacity-30">{{ turnList[n - 1].name }}</h1>
            </div>
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HPComponent from "../components/PlayerHPComponent.vue";
import BossHPComponent from "../components/BossHPComponent.vue";
import JoystickComponent from "../components/JoystickComponent.vue";

export default {
  components: {
    HPComponent,
    BossHPComponent,
    JoystickComponent,
  },
  props: {
    battleData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      // turn: 3,
      // numberFloor: "1",
      // playerStatus: {
      //   4: {
      //     playerName: "Eu",
      //     playerClass: "mage",
      //     hpMax: 100,
      //     hpCurrent: 20,
      //   },
      //   1: {
      //     playerName: "Tu",
      //     playerClass: "bard",
      //     hpMax: 80,
      //     hpCurrent: 50,
      //   },
      //   2: {
      //     playerName: "Eles",
      //     playerClass: "warrior",
      //     hpMax: 70,
      //     hpCurrent: 40,
      //   },
      //   3: {
      //     playerName: "Nós",
      //     playerClass: "ranger",
      //     hpMax: 100,
      //     hpCurrent: 10,
      //   },
      // },
      // bossStatus: {
      //   bossName: "Grande Chefão",
      //   hpCurrent: 50,
      //   id: 9,
      // },

      id: "uuidv4()",
      turnIndex: 1,
      turnList: [
        { id: 123, name: "felype" },
        { id: 124, name: "Augusto" },
        { id: 125, name: "João" },
        { id: 126, name: "Gislene" },
        { name: "Fra-cão" },
      ],
      players: [
        {
          playerId: 123,
          username: "felype",
          level: 1,
          class: "warrior",
          description: "bonito",
          dead: false,
          stats: {
            currentHp: 60,
            maxHp: 100,
            attack: 10,
          },
          actions: {
            attacks: {
              normalAttack: {
                name: "Ataque Normal",
                type: "attack",
                multiplier: 1,
                accuracy: 100,
              },
              strongAttack: {
                name: "Ataque Forte",
                type: "attack",
                multiplier: 1.5,
                accuracy: 80,
              },
            },
            skills: [
              {
                id: 1,
                name: "Ataque Furioso",
                description:
                  "Um ataque rápido e muito forte com sua espada, machuca",
                cooldown: 2,
                type: "attack",
                multiplier: 2,
                critRate: 50,
                critMultiplier: 1.5,
                cooldownCount: 0,
                onCooldown: false,
              },
            ],
          },
        },
        {
          playerId: 124,
          username: "Augusto",
          level: 1,
          class: "bard",
          description: "bonito",
          dead: false,
          stats: {
            currentHp: 100,
            maxHp: 80,
            attack: 6,
          },
          actions: {
            attacks: {
              normalAttack: {
                name: "Ataque Normal",
                type: "attack",
                multiplier: 1,
                accuracy: 100,
              },
              strongAttack: {
                name: "Ataque Forte",
                type: "attack",
                multiplier: 1.5,
                accuracy: 80,
              },
            },
            skills: [
              {
                id: 4,
                name: "Música Curativa",
                description: "Uma música aliviante que cura os aliados",
                cooldown: 2,
                type: "cure",
                multiplier: 3,
                critRate: 0,
                critMultiplier: 1,
                cooldownCount: 0,
                onCooldown: false,
              },
            ],
          },
        },
        {
          playerId: 125,
          username: "João",
          level: 1,
          class: "ranger",
          description: "bonito",
          dead: false,
          stats: {
            currentHp: 100,
            maxHp: 50,
            attack: 16,
          },
          actions: {
            attacks: {
              normalAttack: {
                name: "Ataque Normal",
                type: "attack",
                multiplier: 1,
                accuracy: 100,
              },
              strongAttack: {
                name: "Ataque Forte",
                type: "attack",
                multiplier: 1.5,
                accuracy: 80,
              },
            },
            skills: [
              {
                id: 2,
                name: "Chuva de flechas",
                description:
                  "Múltiplas flechas pro céu que caem sobre o inimigo consecutivamente",
                cooldown: 4,
                type: "attack",
                multiplier: 1.2,
                critRate: 50,
                critMultiplier: 1.5,
                cooldownCount: 0,
                onCooldown: false,
              },
            ],
          },
        },
        {
          playerId: 126,
          username: "Gislene",
          level: 1,
          class: "mage",
          description: "bonita",
          dead: false,
          stats: {
            currentHp: 60,
            maxHp: 60,
            attack: 12,
          },
          actions: {
            attacks: {
              normalAttack: {
                name: "Ataque Normal",
                type: "attack",
                multiplier: 1,
                accuracy: 100,
              },
              strongAttack: {
                name: "Ataque Forte",
                type: "attack",
                multiplier: 1.5,
                accuracy: 80,
              },
            },
            skills: [
              {
                id: 3,
                name: "Bola de Fogo",
                description: "Uma bola de fogo que queima, cuidado viu",
                cooldown: 3,
                type: "attack",
                multiplier: 3,
                critRate: 50,
                critMultiplier: 2,
                cooldownCount: 0,
                onCooldown: false,
              },
            ],
          },
        },
      ],
      enemy: {
        id: 1,
        name: "Fra-cão",
        stats: {
          currentHp: 90,
          maxHp: 200,
          baseAttack: 20,
        },
        actions: {
          attack: { type: "attack", multiplier: 1 },
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
    };
  },
  created() {
    this.setBackground();
  },
  methods: {
    playerAction(action) {
      console.log(action);
    },
    setBackground() {
      if (this.enemy.id === 1 || this.enemy.id === 2 || this.enemy.id === 3) {
        document.querySelector("body").style.backgroundImage =
          "url(../src/assets/images/1-floor-background.svg)";
      } else if (
        this.enemy.id === 4 ||
        this.enemy.id === 5 ||
        this.enemy.id === 6
      ) {
        document.querySelector("body").style.backgroundImage =
          "url(../src/assets/images/2-floor-background.svg)";
      } else if (
        this.enemy.id === 7 ||
        this.enemy.id === 8 ||
        this.enemy.id === 9
      ) {
        document.querySelector("body").style.backgroundImage =
          "url(../src/assets/images/3-floor-background.svg)";
      }
    },
  },
};
</script>
<style scoped>
@media only screen and (min-height: 853px) {
  .big-screen {
    margin-top: 15%;
  }
}
</style>
