<template>
  <v-card class="mx-auto"
          elevation="16">
    <v-layout>
      <v-app-bar color="primary" density="compact">
        <template v-slot:prepend>
          <v-btn>
            <router-link to="/" class="nav-link">
              <font-awesome-icon icon="home" />
            </router-link>
          </v-btn>
        </template>
        <v-app-bar-title>Resume Application</v-app-bar-title>

        <template v-slot:append>
          <div v-if="!currentUser">
            <v-btn>
              <router-link to="/register" class="nav-link">
                <font-awesome-icon icon="user-plus" /> Sign Up
              </router-link>
            </v-btn>
          </div>
          <div  v-if="!currentUser">
            <v-btn>
              <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="sign-in-alt" /> Sign In
              </router-link>
            </v-btn>
          </div>
          <div  v-if="currentUser">
            <v-btn>
              <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="sign-out-alt" /> Sign Out
              </router-link>
            </v-btn>
          </div>
        </template>
      </v-app-bar>

      <v-main >
        <div class="container">
          <router-view />
        </div>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script>

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_ADMIN");
      }

      return true;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser["roles"]) {
        return this.currentUser["roles"].includes("ROLE_MODERATOR");
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>
