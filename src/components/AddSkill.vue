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
  
          <v-card-subtitle>
            Click the button to add new Skill.
          </v-card-subtitle>
  
          <v-card-actions>
            <v-btn color="success" @click="newSkill">Add</v-btn>
            <v-btn color="success" @click="listSkills">Return</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </template>
  
  <script>
  import SkillService from "../services/skill.service";
  import router from '../router';
  
  export default {
    name: "add-skill",
    data() {
      return {
        skill: {
          id: null,
          skillName: "Skill Name",
          skillLevel: "5",
          userId: 1,
        },
        submitted: false,
      };
    },
    methods: {
      saveSkill() {
        const user = JSON.parse(localStorage.getItem("user"));
        var data = {
          skillName: this.skill.skillName,
          skillLevel: this.skill.skillLevel,
          userId: user.id,
        };
  
        SkillService.create(user.id, data)
          .then((response) => {
            this.skill.id = response.data.id;
            this.submitted = true;
          })
          .catch((e) => {
            console.log(e);
          });
      },
      newSkill() {
        this.submitted = false;
        this.award = {};
      },
      listSkills() {
        router.push({ path: "/user" });
      },
    },
  };
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
  }
  </style>
  
  