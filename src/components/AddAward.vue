<template>
    <div class="submit-form mt-3 mx-auto">
      <h2 class="headline">Add Award</h2>
  
      <div v-if="!submitted">
        <v-form ref="form" lazy-validation>
          <v-text-field
            variant="outlined"
            v-model="award.awardName"
            :rules="[(v) => !!v || 'Award Name is required']"
            label="Award Name"
            required
          ></v-text-field>
  
          <v-text-field
            variant="outlined"
            v-model="award.dateAwarded"
            :rules="[(v) => !!v || 'Award date is required']"
            label="Award Date"
            required
          ></v-text-field>
        </v-form>
  
        <v-btn color="primary" class="mt-3" @click="saveAward">Submit</v-btn>
      </div>
  
      <div v-else>
        <v-card class="mx-auto">
          <v-card-title> Submitted successfully! </v-card-title>
  
          <v-card-subtitle>
            Click the button to add new Award.
          </v-card-subtitle>
  
          <v-card-actions>
            <v-btn color="success" @click="newAward">Add</v-btn>
            <v-btn color="success" @click="listAwards">Return</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </template>
  
  <script>
  import AwardService from "../services/award.service";
  import router from '../router';
  
  export default {
    name: "add-award",
    data() {
      return {
        award: {
          id: null,
          awardName: "Award Name",
          dateAwarded: "2001-01-01",
          userId: 1,
        },
        submitted: false,
      };
    },
    methods: {
      saveAward() {
        const user = JSON.parse(localStorage.getItem("user"));
        var data = {
          awardName: this.award.awardName,
          dateAwarded: this.award.dateAwarded,
          userId: user.id,
        };
  
        AwardService.create(user.id, data)
          .then((response) => {
            this.award.id = response.data.id;
            this.submitted = true;
          })
          .catch((e) => {
            console.log(e);
          });
      },
      newAward() {
        this.submitted = false;
        this.award = {};
      },
      listAwards() {
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
  
  