<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="4">
      <v-btn small @click="addEducation"> Add Education </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Education</v-card-title>
        <v-data-table
          :headers="headers"
          :items="educations"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editEducation(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small class="mr-2" @click="deleteEducation(item.id)"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>

        <v-card-actions v-if="educations.length > 0">
          <v-btn small color="error" @click="removeAllEducation">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import EducationServices from "../services/education.service";
import router from "../router";
import { onMounted } from "vue";

export default {
  data() {
    return {
      educations: [],
      title: "",
      headers: [
        {
          text: "Institution",
          align: "start",
          sortable: false,
          value: "institutionName",
        },
        { text: "City", value: "city", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  async mounted() {
    console.log("onMounted");
    this.retrieveEducations();
  },
  methods: {
    refreshEducations() {
      this.retrieveEducations();
    },
    addEducation() {
      router.push({ path: "addEducation" });
    },
    retrieveEducations() {
      console.log("retrieving education");
      const user = JSON.parse(localStorage.getItem("user"));
      EducationServices.getAll(user.id)
        .then((response) => {
          console.log(response);
          this.educations = response.data.map(this.getDisplayEducation);
        })
        .catch((e) => {
          
        });
    },
    removeAllEducations() {
      const user = JSON.parse(localStorage.getItem("user"));
      EducationServices.deleteAll(user.id)
        .then((response) => {
          this.refreshEducations();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editEducation(id) {
      this.$router.push({ name: "education-details", params: { id: id } });
    },

    deleteCharacter(id) {
      const user = JSON.parse(localStorage.getItem("user"));
      EducationServices.delete({ userId: user.id, educationId: id })
        .then(() => {
          this.refreshEducations();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayEducation(education) {
      console.log(education);
      return {
        id: education.id,
        institutionName: education.institutionName,
        city: education.city,
      };
    }
  },
};
</script>
