<template>
  <div class="submit-form mt-3 mx-auto">
    <h2 class="headline">Add Experience</h2>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          variant="outlined"
          v-model="experience.experienceText"
          :rules="[(v) => !!v || 'Experience text is required']"
          label="Experience"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveExperience">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Submitted successfully! </v-card-title>

        <v-card-subtitle>
          Click the button to add new experience.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newExperience">Add</v-btn>
          <v-btn color="success" @click="listExperiences">Return</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ExperienceService from "@/services/experience.service";
import router from "../router";

const user = ref(JSON.parse(localStorage.getItem("user")));
const submitted = ref(false);

const experience = ref({
  experienceId: null,
  experienceText: "Experience Text",
});

const saveExperience = async () => {
  var data = {
    experienceText: experience.value.experienceText,
    userId: user.value.id,
  };
  ExperienceService.create(user.value.id, data)
          .then((response) => {
            experience.value.id = response.data.id;
            submitted.value = true;
          })
          .catch((e) => {
            console.log(e);
          });
};

const newExperience = async() => {
  submitted.value = false;
  experience.value = {};
};

const listExperiences = async() => {
  router.push({ path: "/user" });
};

onMounted(() => {});
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
