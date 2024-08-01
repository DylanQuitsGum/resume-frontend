<template>
  <div class="submit-form mt-3 mx-auto">
    <h2 class="headline">Add Employer</h2>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          variant="outlined"
          v-model="employer.employerName"
          :rules="[(v) => !!v || 'Employer name is required']"
          label="Employer Name"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="employer.position"
          :rules="[(v) => !!v || 'Position is required']"
          label="Position"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="employer.street"
          :rules="[(v) => !!v || 'Street is required']"
          label="Street"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="employer.city"
          :rules="[(v) => !!v || 'City is required']"
          label="City"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="employer.state"
          :rules="[(v) => !!v || 'State is required']"
          label="State"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="employer.zipCode"
          :rules="[(v) => !!v || 'Zip is required']"
          label="Zip"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="employer.beginDate"
          :rules="[(v) => !!v || 'Begin date is required']"
          label="Begin Date"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="employer.endDate"
          label="End Date"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="employer.salary"
          :rules="[(v) => !!v || 'Salary is required']"
          label="Salary"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveEmployer">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Submitted successfully! </v-card-title>

        <v-card-subtitle>
          Click the button to add new Employer.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newEmployer">Add</v-btn>
          <v-btn color="success" @click="listEmployers">Return</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import EmployerService from "@/services/employer.service";
import router from "../router";

const user = ref(JSON.parse(localStorage.getItem("user")));
const submitted = ref(false);

const employer = ref({
  employerId: null,
  employerName: "",
  position: "",
  street: "",
  city: "",
  state: "",
  zipCode: "",
  beginDate: "",
  endDate: "",
  salary: 135000,
});

const saveEmployer = async () => {
  var data = {
    employerName: employer.value.employerName,
    position: employer.value.position,
    street: employer.value.street,
    city: employer.value.city,
    state: employer.value.state,
    zipCode: employer.value.zipCode,
    beginDate: employer.value.beginDate,
    endDate: employer.value.endDate,
    salary: employer.value.salary,
    userId: user.value.id,
  };
  EmployerService.create(user.value.id, data)
    .then((response) => {
      employer.value.id = response.data.id;
      submitted.value = true;
    })
    .catch((e) => {
      console.log(e);
    });
};

const newEmployer = async () => {
  submitted.value = false;
  employer.value = {};
};

const listEmployers = async () => {
  router.push({ path: "/user" });
};

onMounted(() => {});
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
