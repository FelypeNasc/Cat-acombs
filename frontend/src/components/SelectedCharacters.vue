<template>
  <div class="gap-5 flex justify-center">
    <img
      src="src/assets/images/bard-class-selected.svg"
      class="w-2/4 min-w-[80px]"
    />
    <img
      src="src/assets/images/bard-class-selected.svg"
      class="w-2/4 min-w-[80px]"
    />
    <img
      src="src/assets/images/bard-class-selected.svg"
      class="w-2/4 min-w-[80px]"
    />
    <img
      src="src/assets/images/bard-class-selected.svg"
      class="w-2/4 min-w-[80px]"
    />
  </div>
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
<style></style>
