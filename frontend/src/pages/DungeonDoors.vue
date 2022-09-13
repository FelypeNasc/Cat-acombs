<template>
  <div class="main">
    <div class="header">
      <img class="logo" src="src/assets/images/logo.svg" />
      <div class="level">
        <img class="arrows" src="src/assets/images/arrowLeft.svg" />
        Level 1
        <img class="arrows" src="src/assets/images/arrowRight.svg" />
      </div>
      <img class="config" src="src/assets/icons/config-icon.svg" />
    </div>
    <div class="doors">
        <button> sala 1</button>
        
        <button> sala 2</button>
        
        <button> sala 3</button>
        
        <button> sala 4</button>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style>
.main {
  background-image: url("src/assets/images/backgroundblue.png");
  height: 100vh;
}
.level {
  font-family: "Squirk";
  text-align: center;
  font-size: 50px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.header {
  display: flex;
  flex-direction: row;
  font-family: "Chainwhacks";
  font-size: 30px;
  color: white;
  justify-content: space-between;
}
.logo {
  width: 18%;
}
.config {
  width: 5%;
}
.arrows {
  width: 10%;
}
</style>