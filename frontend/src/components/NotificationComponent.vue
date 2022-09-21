<template>
  <div class="static rigth-5 top-5 bg-green">
    <p>{{ message }}</p>
  </div>
</template>
<script>
export default {
  props: {
    message: { type: String, default: () => "" },
  },
  data() {
    return {
      password: "",
    };
  },
  methods: {
    confirm() {
      const password = this.password;
      const roomId = this.roomData.id;
      this.$emit("confirm", { password, roomId });
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style scoped></style>
