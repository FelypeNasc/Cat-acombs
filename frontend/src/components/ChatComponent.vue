<template>
  <div
    class="chat-background rounded-lg w-32 size flex flex-col items-center justify-end text-white squirk text-xl"
  >
    <div
      id="messages-container"
      class="w-full mt-5 px-2 overflow-y-auto scroll-smooth"
    >
      <div
        v-for="(item, index) in message"
        :key="index"
        class="flex gap-x-2 text-base"
      >
        <p class="name-color">{{ item.name }}:</p>
        <p class="break-all">{{ item.message }}</p>
      </div>
    </div>
    <div class="flex w-full items-center justify-end relative">
      <input
        type="text"
        v-model="chatMessage"
        class="bg-blue rounded-b pr-20 w-full input-size opacity-80"
        v-on:keyup.enter="sendMessage"
      />
      <div
        v-on:click="sendMessage()"
        class="absolute button-size mr-2 blue-color rounded-full cursor-pointer flex items-center justify-center"
      >
        <img src="../assets/icons/send-icon.svg" class="w-5" />
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
        this.handleScroll();
      }
    },
    handleScroll() {
      const el = document.getElementById("messages-container");
      el.scrollTo({
        botton: 0,
        top: el.scrollHeight,
        behavior: "smooth",
      });
    },
  },
};
</script>
<style scoped>
.size {
  width: 300px;
  height: 500px;
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
.bg-blue {
  background-color: var(--blue);
}

.input-size {
  width: 100%;
  height: 50px;
  padding: 0 10px;
}

.squirk {
  font-family: "Squirk";
}

.button-size {
  width: 38px;
  height: 39px;
}
.scroll-auto {
  overflow-scrolling: auto; /* Stops scrolling immediately */
}
</style>
