<template>
  <div class="w-10/12 gap-10 flex justify-center">
    <img src="src/assets/images/bard-class-selected.svg" />
    <img src="src/assets/images/bard-class-selected.svg" />
    <img src="src/assets/images/bard-class-selected.svg" />
    <img src="src/assets/images/bard-class-selected.svg" />
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
