<template>
  <button
    v-bind:class="buttonColor"
    class="font-squirk w-6/12 rounded-md p-0.5 text-2xl max-w-max px-4"
    @click="buttonFunction"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "Confirmar",
    },
    mode: {
      type: String,
      default: "light",
    },
    buttonFunction: {
      type: Function,
    },
  },
  computed: {
    buttonColor() {
      return this.mode;
    },
  },
};
</script>

<style scoped>
.light {
  background-color: white;
  color: var(--blue);
  box-shadow: 0 4px var(--blue);
  transition: 0.1s;
}

.light:hover {
  background-color: var(--light-blue);
  color: var(--blue);
}

.light:active {
  background-color: var(--blue);
  color: white;
  box-shadow: 0 2px var(--dark-blue);
}

.dark {
  background-color: var(--blue);
  color: white;
  box-shadow: 0 4px var(--dark-blue);
  transition: 0.1s;
}

.dark:hover {
  background-color: var(--light-blue);
  color: var(--blue);
}

.dark:active {
  background-color: var(--light-blue);
  color: white;
  box-shadow: 0 2px var(--dark-blue);
}

.red {
  background-color: var(--red);
  color: white;
  box-shadow: 0 4px var(--dark-red);
  transition: 0.1s;
}

.red:hover {
  background-color: var(--light-red);
  color: white;
}

.red:active {
  background-color: var(--red);
  color: var(--light-red);
  box-shadow: 0 2px var(--dark-red);
}
</style>
