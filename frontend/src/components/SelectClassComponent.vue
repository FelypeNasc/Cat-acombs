<template>
  <div class="container p-8">
    <h1 class="font-squirk text-7xl text-center">Select Your Class</h1>
    <div class="flex flex-row justify-around mt-24 px-28">
      <div class="flex flex-col">
        <img class="warrior" src="src/assets/images/warrior-class.svg" />
        <label class="font-squirk text-center text-white text-2xl" ref="warrior"
          >WARRIOR</label
        >
      </div>
      <div class="flex flex-col">
        <img class="ranger" src="src/assets/images/ranger-class.svg" />
        <label class="font-squirk text-center text-white text-2xl" ref="ranger"
          >RANGER</label
        >
      </div>
      <div class="flex flex-col">
        <img class="mage" src="src/assets/images/mage-class.svg" />
        <label class="font-squirk text-center text-white text-2xl" ref="mage"
          >MAGE</label
        >
      </div>
      <div class="flex flex-col">
        <img class="bard" src="src/assets/images/bard-class.svg" />
        <label class="font-squirk text-center text-white text-2xl" ref="bard"
          >BARD</label
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h1 {
  color: #2c3c8c;
}
.container {
  box-sizing: border-box;
  width: 967.97px;
  height: 571.02px;
  background: #7171714d;
  border: 6px solid #2c3c8c;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}
</style>
