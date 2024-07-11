<template>
  <div class="submit-form mt-3 mx-auto">
    <h2 class="headline">Add Skill</h2>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          variant="outlined"
          v-model="skill.skillName"
          :rules="[(v) => !!v || 'Skill name is required']"
          label="Skill Name"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="skill.skillLevel"
          :rules="[(v) => !!v || 'Skill level is required']"
          label="Skill Level"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveSkill">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Submitted successfully! </v-card-title>

        <v-card-subtitle> Click the button to add new skill. </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newSkill">Add</v-btn>
          <v-btn color="success" @click="listSkills">Return</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import SkillService from "@/services/skill.service";
import router from "../router";

const user = ref(JSON.parse(localStorage.getItem("user")));
const submitted = ref(false);

const skill = ref({
  skillId: null,
  skillName: "Skill Name",
  skillLevel: 5,
});

const saveSkill = async () => {
  var data = {
    skillName: skill.value.skillName,
    skillLevel: skill.value.skillLevel,
    userId: user.value.id,
  };
  SkillService.create(user.value.id, data)
    .then((response) => {
      skill.value.id = response.data.id;
      submitted.value = true;
    })
    .catch((e) => {
      console.log(e);
    });
};

const newSkill = async () => {
  submitted.value = false;
  skill.value = {};
};

const listSkills = async () => {
  router.push({ path: "/user" });
};

onMounted(() => {});
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
