<script setup></script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
const ws = new WebSocket("ws://localhost:8080");
ws.onopen = function () {
  console.log("conexão aberta");
  // if (localStorage.getItem('browserSession')) {
  //   logged()
  // }
};
ws.onmessage = (msg) => {
  msg = JSON.parse(msg.data);
  if (msg.browserSession !== localStorage.getItem("browserSession")) {
    return;
  }
  switch (msg.type) {
    case "login":
      localStorage.setItem("userId", msg.data.userId);
      logged();
      break;
    case "getRoomList":
      console.log(msg.data);
      msg.data.forEach((item) => {
        document.getElementById("rooms").innerHTML += `
          <div>
            <p>${item.roomName}</p>
            <p>${item.creatorName}</p>
            <p>${item.players.length}</p>
          </div>
          `;
      });
      break;
  }
};
const getRoomList = () => {
  const msg = {
    type: "getRoomList",
    browserSession: localStorage.getItem("browserSession"),
  };
  ws.send(JSON.stringify(msg));
};
const logged = () => {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("rooms").style.display = "block";
  getRoomList();
};
const login = () => {
  const username = document.getElementById("username-input").value;
  const browserSession = uuidv4();
  if (username.length < 4) {
    alert("Username need to be at least 4 characters");
    return;
  }
  document.getElementById("sendUsername").disabled = true;
  const msg = {
    type: "login",
    data: {
      name: username,
      browserSession,
    },
  };
  localStorage.setItem("browserSession", browserSession);
  ws.send(JSON.stringify(msg));
};
</script>
<style scoped>
#app {
  display: flex;
  flex-direction: column;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
nav a:first-of-type {
  border: 0;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .logo {
    margin: 0 2rem 0 0;
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
