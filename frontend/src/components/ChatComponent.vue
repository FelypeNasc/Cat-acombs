<template>
  <div
    class="chat-background rounded-lg w-32 size relative flex flex-col items-center text-white squirk text-xl"
  >
    <input
      type="text"
      v-model="chatMessage"
      class="blue-color absolute bottom-0 rounded-b input-size opacity-40"
    />
    <div
      v-on:click="sendMessage()"
      class="absolute bottom-4 right-4 button-size blue-color rounded-full cursor-pointer flex items-center justify-center"
    >
      <img src="../assets/icons/send-icon.svg" class="w-5" />
    </div>
    <div
      id="chat-messages"
      class="w-full h-5/6 mt-5 flex flex-col justify-end px-2"
    >
      <div v-for="item in message" :key="item" class="flex gap-x-2">
        <h3 class="name-color">{{ item.name }}:</h3>
        <p>{{ item.message }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    messages: { type: Array, default: () => [] },
  },

  data() {
    return {
      message: [
        { name: "maria", message: "ESCOLHE LOGO!" },
        { name: "joão", message: "calma!" },
      ],
      chatMessage: "",
    };
  },
  methods: {
    sendMessage() {
      if (this.chatMessage) {
        this.message.push({ name: "joão", message: this.chatMessage });
        this.chatMessage = "";
      }
    },
  },
};
</script>
<style>
.size {
  width: 338px;
  height: 604px;
}

.chat-background {
  background: rgb(182, 182, 182);
  background: linear-gradient(
    0deg,
    rgba(182, 182, 182, 1) 0%,
    rgba(182, 182, 182, 0) 100%
  );
}

.name-color {
  color: #4047ff;
}

.blue-color {
  background-color: var(--dark-blue);
}

.input-size {
  width: 338px;
  height: 70px;
  padding: 0 10px;
}

.squirk {
  font-family: "Squirk";
}

.button-size {
  width: 38px;
  height: 39px;
}
</style>
