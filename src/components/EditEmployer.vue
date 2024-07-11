<template>
  <div v-if="currentEmployer" class="edit-form py-3">
    <p class="headline">Edit Employer</p>

    <v-form ref="form" lazy-validation>
      <v-text-field variant="outlined" v-model="currentEmployer.employerName"
        :rules="[(v) => !!v || 'Employer name is required']" label="Employer Name" required></v-text-field>

      <v-text-field variant="outlined" v-model="currentEmployer.position"
        :rules="[(v) => !!v || 'Position is required']" label="Position" required></v-text-field>

      <v-text-field variant="outlined" v-model="currentEmployer.street" :rules="[(v) => !!v || 'Street is required']"
        label="Street" required></v-text-field>

      <v-text-field variant="outlined" v-model="currentEmployer.city" :rules="[(v) => !!v || 'City is required']"
        label="City" required></v-text-field>

      <v-text-field variant="outlined" v-model="currentEmployer.state" :rules="[(v) => !!v || 'State is required']"
        label="State" required></v-text-field>

      <v-text-field variant="outlined" v-model="currentEmployer.zipCode" :rules="[(v) => !!v || 'Zip is required']"
        label="Zip" required></v-text-field>

      <v-text-field variant="outlined" v-model="currentEmployer.beginDate"
        :rules="[(v) => !!v || 'Begin Date is required']" label="Begin Date" required></v-text-field>

      <v-text-field variant="outlined" v-model="currentEmployer.endDate" label="End Date" required></v-text-field>

      <v-text-field variant="outlined" v-model="currentEmployer.salary" :rules="[(v) => !!v || 'Salary is required']"
        label="Salary" required></v-text-field>

      <v-divider class="my-5"></v-divider>
      <div class="d-flex flex-wrap ga-3">
        <v-btn color="success" small @click="updateEmployer"> Update </v-btn>
        <v-btn color="success" small @click="cancelEdit"> Cancel </v-btn>
      </div>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Employer... {{ id }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import EmployerService from "@/services/employer.service";
import router from "../router";

const route = useRoute();
const user = JSON.parse(localStorage.getItem("user"));
const currentEmployer = ref();
const message = ref("");

const fetchUserEmployer = async () => {
  var employerId = route.params.id;
  EmployerService.get(user.id, employerId)
    .then((response) => {
      currentEmployer.value = response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const updateEmployer = async () => {
  EmployerService.update(
    user.id,
    currentEmployer.value.id,
    currentEmployer.value
  )
    .then((response) => {
      message.value = "The employer was updated successfully!";
      router.push({ path: "/user" });
    })
    .catch((e) => {
      console.log(e);
    });
};

const cancelEdit = async () => {
  router.push({ path: "/user" });
};

onMounted(() => {
  fetchUserEmployer();
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>