<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="4">
      <v-btn small @click="addEmployer"> Add Employer </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Employer</v-card-title>
        <v-data-table
          :headers="employerHeaders"
          :items="employers"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editEmployer(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small class="mr-2" @click="deleteEmployer(item.id)"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>

        <v-card-actions v-if="employers.length > 0">
          <v-btn small color="error" @click="removeAllEmployers">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>



  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="4">
      <v-btn small @click="addEducation"> Add Education </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Education</v-card-title>
        <v-data-table
          :headers="educationHeaders"
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
          <v-btn small color="error" @click="removeAllEducations">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>



  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="4">
      <v-btn small @click="addAward"> Add Award </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Award</v-card-title>
        <v-data-table
          :headers="awardHeaders"
          :items="awards"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editAward(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small class="mr-2" @click="deleteAward(item.id)"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>

        <v-card-actions v-if="awards.length > 0">
          <v-btn small color="error" @click="removeAllAwards">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>



  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="4">
      <v-btn small @click="addSkill"> Add Skill </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Skill</v-card-title>
        <v-data-table
          :headers="skillHeaders"
          :items="skills"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editSkill(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small class="mr-2" @click="deleteSkill(item.id)"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>

        <v-card-actions v-if="skills.length > 0">
          <v-btn small color="error" @click="removeAllSkills">
            Remove All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import EmployerServices from "../services/employer.service";
import EducationServices from "../services/education.service";
import AwardServices from "../services/award.service";
import SkillServices from "../services/skill.service";

import router from "../router";

export default {
  data() {
    return {
      employers: [],
      educations: [],
      awards: [],
      skills: [],
      title: "",
      employerHeaders: [
        {
          text: "Employer",
          align: "start",
          sortable: false,
          value: "employerName",
        },
        { text: "City", value: "city", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      educationHeaders: [
        {
          text: "Institution",
          align: "start",
          sortable: false,
          value: "institutionName",
        },
        { text: "City", value: "city", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      awardHeaders: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "awardName",
        },
        { text: "Award Date", value: "dateAwarded", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
      skillHeaders: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "skillName",
        },
        { text: "Skill Level", value: "skillLevel", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  async mounted() {
    this.retrieveEmployers();
    this.retrieveEducations();
    this.retrieveAwards();
    this.retrieveSkills();
  },
  methods: {
    refreshEmployers() {
      this.retrieveEmployers();
    },
    addEmployer() {
      router.push({ path: "addEmployer" });
    },
    retrieveEmployers() {
      const user = JSON.parse(localStorage.getItem("user"));
      EmployerServices.getAll(user.id)
        .then((response) => {
          this.employers = response.data.map(this.getDisplayEmployer);
        })
        .catch((e) => {});
    },
    removeAllEmployers() {
      const user = JSON.parse(localStorage.getItem("user"));
      EmployerServices.deleteAll(user.id)
        .then((response) => {
          this.refreshEmployers();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editEmployer(id) {
      router.push({ path: `editEmployer/${id}` });
    },

    deleteEmployer(id) {
      const user = JSON.parse(localStorage.getItem("user"));
      EmployerServices.delete(user.id, id)
        .then(() => {
          this.refreshEmployers();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayEmployer(employer) {
      return {
        id: employer.id,
        employerName: employer.employerName,
        city: employer.city,
      };
    },

    refreshEducations() {
      this.retrieveEducations();
    },
    addEducation() {
      router.push({ path: "addEducation" });
    },
    retrieveEducations() {
      const user = JSON.parse(localStorage.getItem("user"));
      EducationServices.getAll(user.id)
        .then((response) => {
          this.educations = response.data.map(this.getDisplayEducation);
        })
        .catch((e) => {});
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
      router.push({ path: `editEducation/${id}` });
    },

    deleteEducation(id) {
      const user = JSON.parse(localStorage.getItem("user"));
      EducationServices.delete(user.id, id)
        .then(() => {
          this.refreshEducations();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayEducation(education) {
      return {
        id: education.id,
        institutionName: education.institutionName,
        city: education.city,
      };
    },


    refreshAwards() {
      this.retrieveAwards();
    },
    addAward() {
      router.push({ path: "addAward" });
    },
    retrieveAwards() {
      const user = JSON.parse(localStorage.getItem("user"));
      AwardServices.getAll(user.id)
        .then((response) => {
          this.awards = response.data.map(this.getDisplayAward);
        })
        .catch((e) => {});
    },
    removeAllAwards() {
      const user = JSON.parse(localStorage.getItem("user"));
      AwardServices.deleteAll(user.id)
        .then((response) => {
          this.refreshAwards();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editAward(id) {
      router.push({ path: `editAward/${id}` });
    },

    deleteAward(id) {
      const user = JSON.parse(localStorage.getItem("user"));
      AwardServices.delete(user.id, id)
        .then(() => {
          this.refreshAwards();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplayAward(award) {
      return {
        id: award.id,
        awardName: award.awardName,
        dateAwarded: award.dateAwarded,
      };
    },


    refreshSkills() {
      this.retrieveSkills();
    },
    addSkill() {
      router.push({ path: "addSkill" });
    },
    retrieveSkills() {
      const user = JSON.parse(localStorage.getItem("user"));
      SkillServices.getAll(user.id)
        .then((response) => {
          this.skills = response.data.map(this.getDisplaySkill);
        })
        .catch((e) => {});
    },
    removeAllSkills() {
      const user = JSON.parse(localStorage.getItem("user"));
      SkillServices.deleteAll(user.id)
        .then((response) => {
          this.refreshSkills();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editSkill(id) {
      router.push({ path: `editSkill/${id}` });
    },

    deleteSkill(id) {
      const user = JSON.parse(localStorage.getItem("user"));
      SkillServices.delete(user.id, id)
        .then(() => {
          this.refreshSkills();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getDisplaySkill(skill) {
      return {
        id: skill.id,
        skillName: skill.skillName,
        skillLevel: skill.skillLevel,
      };
    },

  },
};
</script>
