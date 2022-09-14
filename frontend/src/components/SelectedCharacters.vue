<template>
  <div></div>
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
