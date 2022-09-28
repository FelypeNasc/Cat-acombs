<template>
  <div class="container p-4 min-w-min h-min">
    <h1
      class="selectText font-squirk lg:text-7xl md:text-5xl sm:text-3xl text-center"
    >
      Select Your Class
    </h1>
    <div
      v-for="(row, index) in classList"
      :key="index"
      class="flex flex-row lg:gap-12 md:gap-8 sm:gap-4 justify-center mt-10 px-14"
    >
      <div
        v-for="item in classList[index]"
        :key="item.class"
        class="flex flex-col min-w-[50px] pointer"
        @click="selectclass(item)"
      >
        <img
          v-if="item.class === 'warrior'"
          class="class"
          src="../assets/images/warrior-class.png"
        />
        <img
          v-if="item.class === 'bard'"
          class="class"
          src="../assets/images/bard-class.png"
        />
        <img
          v-if="item.class === 'mage'"
          class="class"
          src="../assets/images/mage-class.png"
        />
        <img
          v-if="item.class === 'ranger'"
          class="class"
          src="../assets/images/ranger-class.png"
        />

        <label
          class="font-squirk text-center pointer text-white lg:text-xl md:text-base sm:text-sm"
          ref="warrior"
          >{{ item.class }}</label
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    classList: {
      type: Array,
      default: () => [],
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
    selectclass(item) {
      this.$emit("selectClass", item);
    },
  },
};
</script>

<style scoped>
.selectText {
  color: #2c3c8c;
  -webkit-text-stroke: 3px white;
}
.container {
  box-sizing: border-box;
  background: #7171714d;
  border: 6px solid #2c3c8c;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
.pointer {
  cursor: pointer;
}
.class:hover {
  box-shadow: 0 0 1em gold;
}
</style>
