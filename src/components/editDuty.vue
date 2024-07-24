<template>
    <div v-if="currentDuty" class="edit-form py-3">
      <p class="headline">Edit Duty</p>
  
      <v-form ref="form" lazy-validation>
        <v-text-field
          variant="outlined"
          v-model="currentDuty.dutyText"
          :rules="[(v) => !!v || 'Duty text is required']"
          label="Duty Text"
          required
        ></v-text-field>
  
        <v-divider class="my-5"></v-divider>
        <div class="d-flex flex-wrap ga-3">
          <v-btn color="success" small @click="updateDuty"> Update </v-btn>
          <v-btn color="success" small @click="cancelEdit"> Cancel </v-btn>
        </div>
      </v-form>
  
      <p class="mt-3">{{ message }}</p>
    </div>
  
    <div v-else>
      <p>Please click on a duty...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import DutyService from "@/services/duty.service";
  import router from "../router";

  const route = useRoute();
  const user = JSON.parse(localStorage.getItem("user"));
  const currentDuty = ref();
  const message = ref("");
  
  const fetchData = async () => {
    var dutyId = route.params.id;
    DutyService.get(user.id, dutyId)
      .then((response) => {
        currentDuty.value = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const updateDuty = async () => {
    DutyService.update(user.id, currentDuty.value.id, currentDuty.value)
      .then((response) => {
        message.value = "The course was updated successfully!";
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
    fetchData();
  });
  </script>
  
  <style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>
  