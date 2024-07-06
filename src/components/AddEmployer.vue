<template>
    <div class="submit-form mt-3 mx-auto">
      <h2 class="headline">Add EMployer</h2>
  
      <div v-if="!submitted">
        <v-form ref="form" lazy-validation>
          <v-text-field
            variant="outlined"
            v-model="employer.employerName"
            :rules="[(v) => !!v || 'Employer name is required']"
            label="Employer Name"
            required
          ></v-text-field>

          <v-text-field
            variant="outlined"
            v-model="employer.position"
            :rules="[(v) => !!v || 'Position is required']"
            label="Position"
            required
          ></v-text-field>
  
          <v-text-field
            variant="outlined"
            v-model="employer.street"
            :rules="[(v) => !!v || 'Street is required']"
            label="Street"
            required
          ></v-text-field>
  
          <v-text-field
            variant="outlined"
            v-model="employer.city"
            :rules="[(v) => !!v || 'City is required']"
            label="City"
            required
          ></v-text-field>
  
          <v-text-field
            variant="outlined"
            v-model="employer.state"
            :rules="[(v) => !!v || 'State is required']"
            label="State"
            required
          ></v-text-field>
  
          <v-text-field
            variant="outlined"
            v-model="employer.zipCode"
            :rules="[(v) => !!v || 'Zip is required']"
            label="Zip"
            required
          ></v-text-field>
  
          <v-text-field
            variant="outlined"
            v-model="employer.beginDate"
            :rules="[(v) => !!v || 'Begin date is required']"
            label="Begin Date"
            required
          ></v-text-field>
  
          <v-text-field
            variant="outlined"
            v-model="employer.endDate"
            :rules="[(v) => !!v || 'End date is required']"
            label="End Date"
            required
          ></v-text-field>
  
          <v-text-field
            variant="outlined"
            v-model="employer.salary"
            :rules="[(v) => !!v || 'Salary is required']"
            label="Salary"
            required
          ></v-text-field>
        </v-form>
  
        <v-btn color="primary" class="mt-3" @click="saveEmployer">Submit</v-btn>
      </div>
  
      <div v-else>
        <v-card class="mx-auto">
          <v-card-title> Submitted successfully! </v-card-title>
  
          <v-card-subtitle>
            Click the button to add new Employer.
          </v-card-subtitle>
  
          <v-card-actions>
            <v-btn color="success" @click="newEmployer">Add</v-btn>
            <v-btn color="success" @click="listEmployers">Return</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </template>
  
  <script>
  import EmployerServices from "../services/employer.service";
  import router from '../router';
  
  export default {
    name: "add-employer",
    data() {
      return {
        employer: {
          id: null,
          employerName: "Tinker AFB",
          position: "Technical Lead",
          street: "7447 Joint Star Dr.",
          city: "Tinker AFB",
          state: "OK",
          zipCode: "73170",
          beginDate: "2001-12-31",
          endDate: "",
          salary: 135000,
          userId: 1,
        },
        submitted: false,
      };
    },
    methods: {
      saveEmployer() {
        const user = JSON.parse(localStorage.getItem("user"));
        
        var data = {
          employerName: this.employer.employerName,
          position: this.employer.position,
          street: this.employer.street,
          city: this.employer.city,
          state: this.employer.state,
          zipCode: this.employer.zipCode,
          beginDate: this.employer.beginDate,
          endDate: this.employer.endDate,
          salary: this.employer.salary,
          userId: user.id,
        };
  
        EmployerServices.create(user.id, data)
          .then((response) => {
            this.employer.id = response.data.id;
            this.submitted = true;
          })
          .catch((e) => {
            console.log(e);
          });
      },
      newEducation() {
        this.submitted = false;
        this.employer = {};
      },
      listEmployers() {
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
  
  