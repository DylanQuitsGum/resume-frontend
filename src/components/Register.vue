<template>
  <v-container class="container d-flex align-center justify-center" fluid>
    <v-form @submit.prevent="signup">
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
            v-model="user.lastName"
            label="Last Name"
            variant="outlined"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.street"
            label="Street"
            variant="outlined"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.city"
            label="City"
            variant="outlined"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.state"
            label="State"
            variant="outlined"
            required
          ></v-text-field>

          <v-text-field
            v-model="user.zipCode"
            label="Zip Code"
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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'
  import authService from '@/services/auth.service';

  const router = useRouter();
  const errorMessage = ref("");

  const user = ref({
    firstName: "Greg",
    lastName: "Satterlee",
    email: "greg.satterlee@gmail.com",
    street: "13801 S Independence Ave",
    city: "Oklahoma City",
    state: "OK",
    zipCode: "73170",
    password: "P#ssw0rd"
  });

  async function signup(){
    try{
      const data = await authService.register(user.value);
      errorMessage.value = "";

      const { status }  = data;
      console.log(data);
      if(status == 200){
        router.push({
          path: "/login"
        });
      }
    }catch(err){
      console.log('in catch')
      const { status, data } = err.response;
      errorMessage.value = data.message;
    }
  }

</script>


<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.v-card-text{
  width: 350px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.error-feedback {
  color: red;
}
</style>
