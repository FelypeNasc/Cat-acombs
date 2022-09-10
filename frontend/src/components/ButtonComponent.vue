<template>
  <button class="ButtonComponent">{{ text }}</button>
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>

<style>
.ButtonComponent {
  width: 200px;
  height: 60px;
  border: none;
  border-radius: 10px;
  background-color: white;
  color: var(--blue);
  font-family: "Squirk";
  font-size: 24px;
  box-shadow: 0px 8px var(--blue);
  transition: 0.2s;
  cursor: pointer;
}

.ButtonComponent:hover {
  background-color: var(--light-blue);
}

.ButtonComponent:active {
  background-color: var(--blue);
  color: white;
}
</style>
