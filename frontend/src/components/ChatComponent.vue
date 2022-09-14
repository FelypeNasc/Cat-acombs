<template>
  <div class="bg-gradient-to-t from-white rounded-lg w-32 size relative">
    <input
      type="text"
      class="blue-color absolute bottom-0 rounded-b input-size squirk opacity-40 text-white"
    />
    <button
      class="absolute bottom-4 right-4 button-size blue-color rounded-full"
    ></button>
  </div>
</template>
<style>
.size {
  width: 338px;
  height: 604px;
}

.blue-color {
  background-color: var(--dark-blue);
}

.input-size {
  width: 338px;
  height: 70px;
}

.squirk {
  font-family: "Squirk";
}

.button-size {
  width: 38px;
  height: 39px;
}
</style>
