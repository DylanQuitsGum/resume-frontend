<template>
  <div class="submit-form mt-3 mx-auto">
    <h2 class="headline">Add Education</h2>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          variant="outlined"
          v-model="education.institutionName"
          :rules="[(v) => !!v || 'Institution Name is required']"
          label="Institution Name"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="education.street"
          :rules="[(v) => !!v || 'Street is required']"
          label="Street"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="education.city"
          :rules="[(v) => !!v || 'City is required']"
          label="City"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="education.state"
          :rules="[(v) => !!v || 'State is required']"
          label="State"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="education.zipCode"
          :rules="[(v) => !!v || 'Zip is required']"
          label="Zip"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="education.beginDate"
          :rules="[(v) => !!v || 'Begin Date is required']"
          label="Begin Date"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="education.degreeAwardDate"
          label="Award Date"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="education.fieldOfStudy"
          :rules="[(v) => !!v || 'Field of Study is required']"
          label="Field of Study"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveEducation">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Submitted successfully! </v-card-title>

        <v-card-subtitle>
          Click the button to add new Education.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newEducation">Add</v-btn>
          <v-btn color="success" @click="listEducations">Return</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import EducationServices from "../services/education.service";
import router from '../router';

export default {
  name: "add-education",
  data() {
    return {
      education: {
        id: null,
        institutionName: "UCO",
        street: "123 I Can Dr.",
        city: "Edmond",
        state: "OK",
        zipCode: "90210",
        beginDate: "2001-01-01",
        degreeAwardDate: "2004-12-13",
        fieldOfStudy: "CS",
        userId: 1,
      },
      submitted: false,
    };
  },
  methods: {
    saveEducation() {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(`UserId: ${user.id}`);
      var data = {
        institutionName: this.education.institutionName,
        street: this.education.street,
        city: this.education.city,
        state: this.education.state,
        zipCode: this.education.zipCode,
        beginDate: this.education.beginDate,
        degreeAwardDate: this.education.degreeAwardDate,
        fieldOfStudy: this.education.fieldOfStudy,
        userId: user.id,
      };

      EducationServices.create(user.id, data)
        .then((response) => {
          this.education.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newEducation() {
      this.submitted = false;
      this.education = {};
    },
    listEducations() {
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

