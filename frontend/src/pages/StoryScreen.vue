<template>
  <div class="history text-center">{{ text }}</div>
</template>
<script>
export default {
  props: {
    text: { type: String, default: () => "texto da história" },
  },
};
</script>
<style>
.history {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  justify-content: center;
  font-family: "Squirk";
  color: white;
  font-size: 40px;
}
</style>
