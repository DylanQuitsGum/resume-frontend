<template>
  <div v-if="currentEducation" class="edit-form py-3">
    <p class="headline">Edit Education</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        variant="outlined"
        v-model="currentEducation.institutionName"
        :rules="[(v) => !!v || 'Institution Name is required']"
        label="Institution Name"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentEducation.street"
        :rules="[(v) => !!v || 'Street is required']"
        label="Street"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentEducation.city"
        :rules="[(v) => !!v || 'City is required']"
        label="City"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentEducation.state"
        :rules="[(v) => !!v || 'State is required']"
        label="State"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentEducation.zipCode"
        :rules="[(v) => !!v || 'Zip is required']"
        label="Zip"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentEducation.beginDate"
        :rules="[(v) => !!v || 'Begin Date is required']"
        label="Begin Date"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentEducation.degreeAwardDate"
        label="Award Date"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentEducation.fieldOfStudy"
        :rules="[(v) => !!v || 'Field of Study is required']"
        label="Field of Study"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>
      <div class="d-flex flex-wrap ga-3">
        <v-btn color="success" small @click="updateEducation"> Update </v-btn>
        <v-btn color="success" small @click="cancelEdit"> Cancel </v-btn>
      </div>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on an education... {{ id }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import EducationService from "@/services/education.service";
import router from "../router";

const route = useRoute();
const user = JSON.parse(localStorage.getItem("user"));
const currentEducation = ref();
const message = ref("");

const fetchUserEducation = async () => {
  var educationId = route.params.id;
  EducationService.get(user.id, educationId)
    .then((response) => {
      currentEducation.value = response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const updateEducation = async () => {
  EducationService.update(
    user.id,
    currentEducation.value.id,
    currentEducation.value
  )
    .then((response) => {
      message.value = "The education was updated successfully!";
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
  fetchUserEducation();
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
