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
  
  <script>
  import SkillService from "../services/skill.service";
  import router from "../router";
  
  export default {
    name: "skill",
    data() {
      return {
        currentSkill: null,
        message: "",
      };
    },
    async mounted() {
      this.getSkill(this.$route.params.id);
    },
    methods: {
      getSkill(id) {
        const user = JSON.parse(localStorage.getItem("user"));
        SkillService.get(user.id, id)
          .then((response) => {
            console.log(response);
            this.currentAward = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      },
  
      updateSkill() {
        const user = JSON.parse(localStorage.getItem("user"));
        SkillService.update(
          user.id,
          this.currentSkill.id,
          this.currentSkill
        )
          .then((response) => {
            console.log(response.data);
            this.message = "The skill was updated successfully!";
            router.push({ path: "/user"});
          })
          .catch((e) => {
            console.log(e);
          });
      },
  
      cancelEdit(){
        router.push({ path: "/user"});
      }
    },
  };
  </script>
  
  <style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>
  