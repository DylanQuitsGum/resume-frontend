<template>
  <div class="darth-vader">
    <div class="chat">
      <img src="../assets/darth-vader.jpg" alt="darth vader" />
    </div>
  </div>
  <Child @custom-event="showMessage" />
  <div v-if="isMessage" class="message">
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { isMemoSame } from "vue";
import Child from "../components/Child.vue";

export default {
  components: {
    Child,
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {
    isMessage() {
      return this.message.length;
    },
  },
  methods: {
    showMessage(msg) {
      this.message = msg;
    },
  },
};
</script>
