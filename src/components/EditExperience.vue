<template>
  <div v-if="currentExperience" class="edit-form py-3">
    <p class="headline">Edit Experience</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        variant="outlined"
        v-model="currentExperience.experienceText"
        :rules="[(v) => !!v || 'Experience text is required']"
        label="Experience Text"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>
      <div class="d-flex flex-wrap ga-3">
        <v-btn color="success" small @click="updateExperience"> Update </v-btn>
        <v-btn color="success" small @click="cancelEdit"> Cancel </v-btn>
      </div>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Experience...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ExperienceService from "@/services/experience.service";
import router from "../router";

const route = useRoute();
const user = JSON.parse(localStorage.getItem("user"));
const currentExperience = ref();
const message = ref("");

const fetchUserExperience = async () => {
  var experienceId = route.params.id;
  ExperienceService.get(user.id, experienceId)
    .then((response) => {
      console.log(response);
      currentExperience.value = response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const updateExperience = async () => {
  ExperienceService.update(
    user.id,
    currentExperience.value.id,
    currentExperience.value
  )
    .then((response) => {
      message.value = "The experience was updated successfully!";
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
  fetchUserExperience();
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
