<template>
    <div class="submit-form mt-3 mx-auto">
      <h2 class="headline">Add Duty</h2>
  
      <div v-if="!submitted">
        <v-form ref="form" lazy-validation>
          <v-text-field
            variant="outlined"
            v-model="duty.dutyText"
            :rules="[(v) => !!v || 'Duty is required']"
            label="Job Duty"
            required
          ></v-text-field>
        </v-form>
  
        <v-btn color="primary" class="mt-3" @click="saveDuty">Submit</v-btn>
      </div>
  
      <div v-else>
        <v-card class="mx-auto">
          <v-card-title> Submitted successfully! </v-card-title>
  
          <v-card-subtitle> Click the button to add new duty. </v-card-subtitle>
  
          <v-card-actions>
            <v-btn color="success" @click="newDuty">Add</v-btn>
            <v-btn color="success" @click="listDuties">Return</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from 'vue-router';
  import DutyService from "@/services/duty.service";

  const route = useRoute();
  const router = useRouter();
  
  const user = ref(JSON.parse(localStorage.getItem("user")));
  const submitted = ref(false);
  const employerId = ref();

  const duty = ref({
    dutyId: null,
    dutyText: "",
  });
  
  const saveDuty = async () => {
    var data = {
      dutyText: duty.value.dutyText,
      employerId: employerId.value,
    };
    DutyService.create(employerId.value, data)
      .then((response) => {
        duty.value.id = response.data.id;
        submitted.value = true;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const newDuty = async () => {
    submitted.value = false;
    duty.value = {};
  };
  
  const listDuties = async () => {
    router.push({ path: `/jobDuties/${employerId.value}` });
  };
  
  onMounted(() => {
    employerId.value = route.params.id;
  });
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
  }
  </style>
  