<template>
  <div v-if="currentSkill" class="edit-form py-3">
    <p class="headline">Edit Skill</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        variant="outlined"
        v-model="currentSkill.skillName"
        :rules="[(v) => !!v || 'Skill name is required']"
        label="Skill Name"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentSkill.skillLevel"
        :rules="[(v) => !!v || 'Skill level is required']"
        label="Skill Level"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>
      <div class="d-flex flex-wrap ga-3">
        <v-btn color="success" small @click="updateSkill"> Update </v-btn>
        <v-btn color="success" small @click="cancelEdit"> Cancel </v-btn>
      </div>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Skill...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from 'vue-router';
import SkillService from "@/services/skill.service";
import router from "../router";

const route = useRoute();
const user = JSON.parse(localStorage.getItem("user"));
const currentSkill = ref();
const message = ref("");

const fetchUserSkill = async () => {
  var skillId = route.params.id;
  SkillService.get(user.id, skillId)
    .then((response) => {
      currentSkill.value = response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const updateSkill = async () => {
  SkillService.update(
    user.id,
    currentSkill.value.id,
    currentSkill.value
  )
    .then((response) => {
      message.value = "The skill was updated successfully!";
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
  fetchUserSkill();
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
