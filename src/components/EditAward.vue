<template>
    <div v-if="currentAward" class="edit-form py-3">
      <p class="headline">Edit Award</p>
  
      <v-form ref="form" lazy-validation>
        <v-text-field
          variant="outlined"
          v-model="currentAward.awardName"
          :rules="[(v) => !!v || 'Award Name is required']"
          label="Award Name"
          required
        ></v-text-field>
  
        <v-text-field
          variant="outlined"
          v-model="currentAward.dateAwarded"
          :rules="[(v) => !!v || 'Award date is required']"
          label="Award Date"
          required
        ></v-text-field>
          
        <v-divider class="my-5"></v-divider>
        <div class="d-flex flex-wrap ga-3">
          <v-btn color="success" small @click="updateAward"> Update </v-btn>
          <v-btn color="success" small @click="cancelEdit"> Cancel </v-btn>
        </div>
      </v-form>
  
      <p class="mt-3">{{ message }}</p>
    </div>
  
    <div v-else>
      <p>Please click on a Award...</p>
    </div>
  </template>
  
  <script>
  import AwardService from "../services/award.service";
  import router from "../router";
  
  export default {
    name: "award",
    data() {
      return {
        currentAward: null,
        message: "",
      };
    },
    async mounted() {
      this.getAward(this.$route.params.id);
    },
    methods: {
      getAward(id) {
        const user = JSON.parse(localStorage.getItem("user"));
        AwardService.get(user.id, id)
          .then((response) => {
            console.log(response);
            this.currentAward = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      },
  
      updateAward() {
        const user = JSON.parse(localStorage.getItem("user"));
        AwardService.update(
          user.id,
          this.currentAward.id,
          this.currentAward
        )
          .then((response) => {
            console.log(response.data);
            this.message = "The award was updated successfully!";
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
  