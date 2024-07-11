<template>
  <v-app>
        <v-layout>
      <v-app-bar color="primary" density="compact">
        <template v-slot:prepend>
          <v-btn>
            <router-link to="/" class="nav-link">
              <font-awesome-icon icon="home" />
            </router-link>
          </v-btn>
        </template>
        <v-app-bar-title>{{ title }}</v-app-bar-title>

        <template v-slot:append>
          <div v-if="!user">
            <v-btn>
              <router-link to="/register" class="nav-link">
                <font-awesome-icon icon="user-plus" /> Sign Up
              </router-link>
            </v-btn>
          </div>
          <div v-if="user">
            <v-btn>
              <router-link to="/resumeBuilder" class="nav-link">
                <font-awesome-icon icon="user" /> Build Resume
              </router-link>
            </v-btn>
          </div>
          <div v-if="user">
            <v-btn>
              <router-link to="/profile" class="nav-link">
                <font-awesome-icon icon="user" /> Profile
              </router-link>
            </v-btn>
          </div>
          <div v-if="!user">
            <v-btn v-on:click="signin">
              <font-awesome-icon icon="sign-in-alt" /> Sign In 
            </v-btn>
          </div>
          <div v-if="user">
            <v-btn v-on:click="signout">
              <font-awesome-icon icon="sign-out-alt" /> Sign Out
            </v-btn>
          </div>
        </template>
      </v-app-bar>

      <v-main>
        <div class="container">
          <router-view />
        </div>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { onUnmounted, ref, onMounted, watch } from "vue";
import authService from "./services/auth.service";
import router from "./router";

const user = ref();
const title = ref("Resume Application");

watch(user, async (newValue, oldValue) => {
  console.log("watch user");
  if (newValue) {
    title.value = `Resume Application: ${user.value.email}`;
  }
});

const signin = async () => {
  console.log('before signin');
  router.push({ path: "login" });
  console.log('after signin');
};

const signout = async () => {
  authService.signout();
  router.push({ name: "home" });
};

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem("user"));
});

onUnmounted(() => {
  localStorage.removeItem("user");
});
</script>

<style scoped>
v-main{
  height: 100vh;
}

router-view{
  height: 100vh;
}
</style>