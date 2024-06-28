<template>
  <v-container class="container d-flex align-center justify-center" fluid>
    <v-form @submit.prevent="login">
      <v-card class="card rounded-md elevation-1">
        <v-card-title class="headline mb-2">Login </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="loginInfo.email"
            label="Email"
            variant="outlined"
            required
          ></v-text-field>

          <v-text-field
            v-model="loginInfo.password"
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
            @click="login()"
            >Login</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-container>
</template>

<script setup>
import authServices from "@/services/authServices.js";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const errorMessage = ref("");

const loginInfo = ref({
    email: "greg.satterlee@gmail.com",
    password: "P#ssw0rd"
});

onMounted(async () => {
  localStorage.removeItem("user");
});

async function login() {
  try {
    const loginStatus = await authServices.signin(loginInfo);

    errorMessage.value = "";
    const { status, data } = loginStatus || {};
    console.log(data);
    console.log(status);
    if (status == 200) {
      localStorage.setItem("user", JSON.stringify(data));
      router.push({ name: "dashboard" });
    }
  } catch (err) {
    const { status, data } = err.response || {};
    console.log(data.message);
    if (status == 401) {
      errorMessage.value = data.message;
    } else {
      errorMessage.value = "";
    }
  }
}
</script>

<style scoped>
.container {
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

.card {
  width: 400px;
  padding: 32px 16px;
}

.login-btn {
  width: 100%;
  background-color: #0093e9;
  background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
}
</style>
