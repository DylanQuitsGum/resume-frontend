<template>
  <v-card class="mx-auto" elevation="16">
    <v-layout>
      <v-app-bar color="primary" density="compact">
        <template v-slot:prepend>
          <v-btn>
            <router-link to="/" class="nav-link">
              <font-awesome-icon icon="home" />
            </router-link>
          </v-btn>
        </template>
        <v-app-bar-title>{{ applicationTitle }}</v-app-bar-title>

        <template v-slot:append>
          <div v-if="!currentUser">
            <v-btn>
              <router-link to="/register" class="nav-link">
                <font-awesome-icon icon="user-plus" /> Sign Up
              </router-link>
            </v-btn>
          </div>
          <div v-if="currentUser">
            <v-btn>
              <router-link to="/resumeBuilder" class="nav-link">
                <font-awesome-icon icon="user" /> Build Resume
              </router-link>
            </v-btn>
          </div>
          <div v-if="currentUser">
            <v-btn>
              <router-link to="/profile" class="nav-link">
                <font-awesome-icon icon="user" /> Profile
              </router-link>
            </v-btn>
          </div>
          <div v-if="!currentUser">
            <v-btn>
              <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="sign-in-alt" /> Sign In
              </router-link>
            </v-btn>
          </div>
          <div v-if="currentUser">
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
  </v-card>
</template>

<script>
import authService from "./services/auth.service";
import router from './router'

export default {
  computed: {
    currentUser() {
      const user = this.$store.state.auth.user;
      return user;
    },
    applicationTitle() {
      const user = this.$store.state.auth.user;
      if (user) {
        return "Resume Application: " + user.email;
      } else {
        return "Resume Application";
      }
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }

      return true;
    },
  },
  methods: {
    signout() {
      authService.signout();
      router.push({ name: "home" });
      this.$forceUpdate();
    },
  },
};
</script>
