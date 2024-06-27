<template>
  <v-container class="container d-flex align-center justify-center" fluid>
    <v-form @submit.prevent="createAccount">
      <v-card class="card rounded-md elevation-1">
        <v-card-title class="headline mb-2">Register </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="user.firstName"
            label="First Name"
            variant="outlined"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.lastName"
            label="Last Name"
            variant="outlined"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.email"
            label="Email"
            variant="outlined"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.password"
            label="Password"
            variant="outlined"
            required
            type="password"
          ></v-text-field>
        </v-card-text>
        <v-card-text class="error">
          {{ errorMessage }}
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="login-btn rounded-xl"
            variant="flat"
            color="primary"
            type="submit"
            >Register</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const errorMessage = ref("");

const user = ref({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
});

async function createAccount() {

}
</script>

<style scoped>
.container {
  background: url("./../assets/bg4.jpeg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

.card {
  width: 400px;
  padding: 32px 16px;
}

.text-field {
  background-color: white;
}

.login-btn {
  width: 100%;
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
}
</style>
