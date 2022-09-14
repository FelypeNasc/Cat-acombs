<template>
  <button
    v-bind:class="[buttonColor, buttonShape]"
    class="font-squirk h-11 w-11 rounded-md p-0.5 text-2xl flex justify-center items-center"
  >
    <div class="w-10/12 h-10/12 flex justify-center align-center">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: "light",
    },
    shape: {
      type: String,
      default: "square",
    },
  },
  computed: {
    buttonColor() {
      return this.mode;
    },
    buttonShape() {
      return this.shape;
    },
  },
  methods: {
    onclick() {
      this.$emit("onclick");
    },
  },
};
</script>

<style scoped>
.square {
  height: 2.75rem;
  width: 2.75rem;
  border-radius: 0.375rem;
}

.circle {
  height: 2.75rem;
  width: 2.75rem;
  border-radius: 2rem;
}

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
</style>
