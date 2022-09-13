<template>
  <div class="main bg-cover">
    <div class="header flex flex-row text-white text-xl justify-between">
      <img class="logo w-48" src="src/assets/images/logo.svg" />
      <div class="level flex flex-row text-center align-middle text-7xl">
        <img class="arrows w-10 mr-6" src="src/assets/images/arrowLeft.svg" />
        Level 1
        <img class="arrows w-10 ml-6" src="src/assets/images/arrowRight.svg" />
      </div>
      <img class="config w-10" src="src/assets/icons/settings-icon.svg" />
    </div>
    <div class="doors flex flex-row justify-around my-20">
      <div class="flex flex-col">
        <img class="door1" src="src/assets/images/1-floor-door-enabled.svg" />

        <label ref="door1" class="text-xl text-white text-center">Door 1</label>
      </div>
      <div class="flex flex-col">
        <img class="door2" src="src/assets/images/1-floor-door-locked.svg" />
        <label ref="door2" class="text-xl text-center">Door 2</label>
      </div>
      <div class="flex flex-col">
        <img class="door3" src="src/assets/images/1-floor-door-locked.svg" />
        <label ref="door3" class="text-xl text-center">Door 3</label>
      </div>
      <div class="flex flex-col">
        <img class="door4" src="src/assets/images/1-floor-door-locked.svg" />
        <label ref="door4" class="text-xl text-center">Door 4</label>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
label {
  font-family: "Squirk";
}
.main {
  background-image: url("src/assets/images/backgroundblue.png");
}
.level {
  font-family: "Squirk";
}
.header {
  font-family: "Chainwhacks";
}
</style>
