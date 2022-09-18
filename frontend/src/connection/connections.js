// import { v4 as uuidv4 } from "uuid";
export let wsConnection = null;

export function createWS() {
  return new Promise(function (resolve, reject) {
    wsConnection = new WebSocket("ws://localhost:8080");

    wsConnection.onopen = function () {
      console.log("conexão aberta");
      resolve(wsConnection);
    };

    wsConnection.onerror = function (err) {
      console.log(err);
      reject(err);
    };
  });

  // wsConnection.onmessage = (msg) => {
  //   console.log(msg);
  //   msg = JSON.parse(msg.data);
  //   // if (msg.browserSession !== localStorage.getItem("browserSession")) {
  //   //   return;
  //   // }
  //   console.log(msg);

  //   // switch (msg.type) {
  //   //   case "login":
  //   //     localStorage.setItem("userId", msg.data.userId);
  //   //     break;
  //   // }
  // };
}

export const getRoomList = () => {
  const msg = {
    type: "room/getRooms",
  };
  sendMessage(msg);
};

export const setUsername = (username) => {
  const msg = {
    type: "client/setUsername",
    message: { username },
  };
  console.log(msg);
  sendMessage(msg);
};

const sendMessage = (msg) => {
  wsConnection.send(JSON.stringify(msg));
};

// const logged = () => {
//   document.getElementById("loginForm").style.display = "none";
//   document.getElementById("rooms").style.display = "block";
//   getRoomList();
// };
// const login = () => {
//   const username = document.getElementById("username-input").value;
//   const browserSession = uuidv4();
//   if (username.length < 4) {
//     alert("Username need to be at least 4 characters");
//     return;
//   }
//   document.getElementById("sendUsername").disabled = true;
//   const msg = {
//     type: "login",
//     data: {
//       name: username,
//       browserSession,
//     },
//   };
//   localStorage.setItem("browserSession", browserSession);
//   ws.send(JSON.stringify(msg));
// };
