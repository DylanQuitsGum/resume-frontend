<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" sm="4">
        <v-sheet class="ma-2 pa-2">
          <v-btn @click="viewProfile">
            <font-awesome-icon icon="user" /> Profile
          </v-btn>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="4">
        <v-sheet class="ma-2 pa-2">
          <v-btn @click="buildResume">
            <font-awesome-icon icon="user" /> Build Resume
          </v-btn>
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="4">
        <v-sheet class="ma-2 pa-2">
          <v-btn @click="viewResumes">
            <font-awesome-icon icon="user" /> View Resumes
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
    <v-expansion-panels multiple>
      <v-expansion-panel>
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4"> Employment </v-col>
            <v-col class="text--secondary" cols="8">
              <v-fade-transition leave-absolute>
                <span v-if="expanded" key="0">
                  Enter your employment history
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-col class="d-flex justify-start" cols="12" md="4">
              <v-btn small @click="addEmployer"> Add Employer </v-btn>
            </v-col>
            <v-col cols="12" sm="12">
              <v-card class="mx-auto" tile>
                <v-data-table
                  :headers="employerHeaders"
                  :items="userEmployers"
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
                    <v-icon small class="mr-2" @click="addDuty(item.id)"
                      >mdi-plus</v-icon
                    >
                  </template>
                </v-data-table>

                <v-card-actions v-if="userEmployers.length > 0">
                  <v-btn small color="error" @click="removeAllEmployers">
                    Remove All
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4"> Education </v-col>
            <v-col class="text--secondary" cols="8">
              <v-fade-transition leave-absolute>
                <span v-if="expanded" key="0">
                  Enter your education history
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-col class="d-flex justify-start" cols="12" md="4">
              <v-btn small @click="addEducation"> Add Education </v-btn>
            </v-col>
            <v-col cols="12" sm="12">
              <v-card class="mx-auto" tile>
                <v-data-table
                  :headers="educationHeaders"
                  :items="userEducations"
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

                <v-card-actions v-if="userEducations.length > 0">
                  <v-btn small color="error" @click="removeAllEducations">
                    Remove All
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4"> Awards </v-col>
            <v-col class="text--secondary" cols="8">
              <v-fade-transition leave-absolute>
                <span v-if="expanded" key="0"> Enter your awards </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-col class="d-flex justify-start" cols="12" md="4">
              <v-btn small @click="addAward"> Add Award </v-btn>
            </v-col>
            <v-col cols="12" sm="12">
              <v-card class="mx-auto" tile>
                <v-data-table
                  :headers="awardHeaders"
                  :items="userAwards"
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

                <v-card-actions v-if="userAwards.length > 0">
                  <v-btn small color="error" @click="removeAllAwards">
                    Remove All
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4"> Skills </v-col>
            <v-col class="text--secondary" cols="8">
              <v-fade-transition leave-absolute>
                <span v-if="expanded" key="0"> Enter your skills </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-col class="d-flex justify-start" cols="12" md="4">
              <v-btn small @click="addSkill"> Add Skill </v-btn>
            </v-col>
            <v-col cols="12" sm="12">
              <v-card class="mx-auto" tile>
                <v-data-table
                  :headers="skillHeaders"
                  :items="userSkills"
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

                <v-card-actions v-if="userSkills.length > 0">
                  <v-btn small color="error" @click="removeAllSkills">
                    Remove All
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4"> Experiences </v-col>
            <v-col class="text--secondary" cols="8">
              <v-fade-transition leave-absolute>
                <span v-if="expanded" key="0"> Enter your experiences </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-col class="d-flex justify-start" cols="12" md="4">
              <v-btn small @click="addExperience"> Add Experience </v-btn>
            </v-col>
            <v-col cols="12" sm="12">
              <v-card class="mx-auto" tile>
                <v-data-table
                  :headers="experienceHeaders"
                  :items="userExperiences"
                  disable-pagination
                  :hide-default-footer="true"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editExperience(item.id)"
                      >mdi-pencil</v-icon
                    >
                    <v-icon
                      small
                      class="mr-2"
                      @click="deleteExperience(item.id)"
                      >mdi-delete</v-icon
                    >
                  </template>
                </v-data-table>

                <v-card-actions v-if="userExperiences.length > 0">
                  <v-btn small color="error" @click="removeAllExperiences">
                    Remove All
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4"> Links </v-col>
            <v-col class="text--secondary" cols="8">
              <v-fade-transition leave-absolute>
                <span v-if="expanded" key="0"> Enter your links </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters>
            <v-spacer></v-spacer>
            <v-col class="d-flex justify-start" cols="12" md="4">
              <v-btn small @click="addLink"> Add Link </v-btn>
            </v-col>
            <v-col cols="12" sm="12">
              <v-card class="mx-auto" tile>
                <v-data-table
                  :headers="linkHeaders"
                  :items="userLinks"
                  disable-pagination
                  :hide-default-footer="true"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editLink(item.id)"
                      >mdi-pencil</v-icon
                    >
                    <v-icon small class="mr-2" @click="deleteLink(item.id)"
                      >mdi-delete</v-icon
                    >
                  </template>
                </v-data-table>

                <v-card-actions v-if="userLinks.length > 0">
                  <v-btn small color="error" @click="removeAllLinks">
                    Remove All
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

import EducationService from "@/services/education.service";
import EmployerService from "@/services/employer.service";
import SkillService from "@/services/skill.service";
import AwardService from "@/services/award.service";
import ExperienceService from "@/services/experience.service";
import LinkService from "@/services/link.service";

const router = useRouter();
const instance = getCurrentInstance();

const user = JSON.parse(localStorage.getItem("user"));

const userEducations = ref([]);
const userEmployers = ref([]);
const userSkills = ref([]);
const userAwards = ref([]);
const userExperiences = ref([]);
const userLinks = ref([]);

const employerHeaders = ref([
  {
    text: "Employer",
    align: "start",
    sortable: false,
    value: "employerName",
  },
  { text: "Position", value: "position", sortable: false },
  { text: "Actions", value: "actions", sortable: false },
]);
const educationHeaders = ref([
  {
    text: "Institution",
    align: "start",
    sortable: false,
    value: "institutionName",
  },
  { text: "Field", value: "fieldOfStudy", sortable: false },
  { text: "Actions", value: "actions", sortable: false },
]);
const awardHeaders = ref([
  {
    text: "Name",
    align: "start",
    sortable: false,
    value: "awardName",
  },
  { text: "Award Date", value: "dateAwarded", sortable: false },
  { text: "Actions", value: "actions", sortable: false },
]);
const skillHeaders = ref([
  {
    text: "Name",
    align: "start",
    sortable: false,
    value: "skillName",
  },
  { text: "Skill Level", value: "skillLevel", sortable: false },
  { text: "Actions", value: "actions", sortable: false },
]);
const experienceHeaders = ref([
  {
    text: "Experience",
    align: "start",
    sortable: false,
    value: "experienceText",
  },
  { text: "Actions", value: "actions", sortable: false },
]);
const linkHeaders = ref([
  {
    text: "Type",
    align: "start",
    sortable: false,
    value: "linkType",
  },
  { text: "Link URL", value: "linkURL", sortable: false },
  { text: "Actions", value: "actions", sortable: false },
]);

const fetchData = async () => {
  fetchUserEducations();
  fetchUserEmployers();
  fetchUserSkills();
  fetchUserAwards();
  fetchUserExperiences();
  fetchUserLinks();
};

const fetchUserEducations = async () => {
  try {
    const res = await EducationService.getAll(user.id);
    const { status, data } = res;

    if (status == 200) {
      userEducations.value = data.map((c) => ({
        ...c,
        institutionName: c.institutionName,
        enabled: false,
      }));
    }
  } catch (err) {
    console.error(err);
  }
};
const addEducation = async () => {
  router.push({ path: "addEducation" });
};
const removeAllEducations = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  EducationService.deleteAll(user.id)
    .then((response) => {
      this.fetchUserEducations();
    })
    .catch((e) => {
      console.log(e);
    });
};
const editEducation = async (id) => {
  router.push({ path: `editEducation/${id}` });
};
const deleteEducation = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  EducationService.delete(user.id, id)
    .then(() => {
      fetchUserEducations();
    })
    .catch((e) => {
      console.log(e);
    });
};

const fetchUserEmployers = async () => {
  try {
    const res = await EmployerService.getAll(user.id);
    const { status, data } = res;

    if (status == 200) {
      userEmployers.value = data.map((c) => ({
        ...c,
        employerName: c.employerName,
        enabled: false,
      }));
    }
  } catch (err) {
    console.error(err);
  }
};
const addEmployer = async () => {
  router.push({ path: "addEmployer" });
};
const addDuty = async (id) => {
  router.push({ path: `addDuty/${id}` });
};
const removeAllEmployers = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  EmployerService.deleteAll(user.id)
    .then((response) => {
      this.fetchUserEmployers();
    })
    .catch((e) => {
      console.log(e);
    });
};
const editEmployer = async (id) => {
  router.push({ path: `editEmployer/${id}` });
};
const deleteEmployer = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  EmployerService.delete(user.id, id)
    .then(() => {
      fetchUserEmployers();
    })
    .catch((e) => {
      console.log(e);
    });
};

const fetchUserSkills = async () => {
  try {
    const res = await SkillService.getAll(user.id);
    const { status, data } = res;

    if (status == 200) {
      userSkills.value = data.map((c) => ({
        ...c,
        skillName: c.skillName,
        enabled: false,
      }));
    }
  } catch (err) {
    console.error(err);
  }
};
const addSkill = async () => {
  router.push({ path: "addSkill" });
};
const removeAllSkills = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  SkillService.deleteAll(user.id)
    .then((response) => {
      this.fetchUserSkills();
    })
    .catch((e) => {
      console.log(e);
    });
};
const editSkill = async (id) => {
  router.push({ path: `editSkill/${id}` });
};
const deleteSkill = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  SkillService.delete(user.id, id)
    .then(() => {
      fetchUserSkills();
    })
    .catch((e) => {
      console.log(e);
    });
};

const fetchUserAwards = async () => {
  try {
    const res = await AwardService.getAll(user.id);
    const { status, data } = res;

    if (status == 200) {
      userAwards.value = data.map((c) => ({
        ...c,
        awardName: c.awardName,
        enabled: false,
      }));
    }
  } catch (err) {
    console.error(err);
  }
};
const addAward = async () => {
  router.push({ path: "addAward" });
};
const removeAllAwards = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  AwardService.deleteAll(user.id)
    .then((response) => {
      this.fetchUserAwards();
    })
    .catch((e) => {
      console.log(e);
    });
};
const editAward = async (id) => {
  router.push({ path: `editAward/${id}` });
};
const deleteAward = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  AwardService.delete(user.id, id)
    .then(() => {
      fetchUserAwards();
    })
    .catch((e) => {
      console.log(e);
    });
};

const fetchUserExperiences = async () => {
  try {
    const res = await ExperienceService.getAll(user.id);
    const { status, data } = res;

    if (status == 200) {
      userExperiences.value = data.map((c) => ({
        ...c,
        experienceText: c.experienceText,
        enabled: false,
      }));
    }
  } catch (err) {
    console.error(err);
  }
};
const addExperience = async () => {
  router.push({ path: "addExperience" });
};
const removeAllExperiences = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  ExperienceService.deleteAll(user.id)
    .then((response) => {
      this.fetchUserExperiences();
    })
    .catch((e) => {
      console.log(e);
    });
};
const editExperience = async (id) => {
  router.push({ path: `editExperience/${id}` });
};
const deleteExperience = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  ExperienceService.delete(user.id, id)
    .then(() => {
      fetchUserExperiences();
    })
    .catch((e) => {
      console.log(e);
    });
};

const fetchUserLinks = async () => {
  try {
    const res = await LinkService.getAll(user.id);
    const { status, data } = res;

    if (status == 200) {
      userLinks.value = data.map((c) => ({
        ...c,
        linkType: c.linkType,
        enabled: false,
      }));
    }
  } catch (err) {
    console.error(err);
  }
};
const addLink = async () => {
  router.push({ path: "addLink" });
};
const removeAllLinks = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  LinkService.deleteAll(user.id)
    .then((response) => {
      this.fetchUserLinks();
    })
    .catch((e) => {
      console.log(e);
    });
};
const editLink = async (id) => {
  router.push({ path: `editLink/${id}` });
};
const deleteLink = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  LinkService.delete(user.id, id)
    .then(() => {
      fetchUserLinks();
    })
    .catch((e) => {
      console.log(e);
    });
};

const viewProfile = async() => {
  router.push({ path: '/profile' })
};

const buildResume = async() => {
  router.push({ path: '/resumeBuilder' })
};

const viewResumes = async() => {
  router.push({ path: '/viewResumes' })
};

onMounted(() => {
  console.log(instance?.proxy);
  instance?.proxy?.$forceUpdate();
  fetchData();
});
</script>

<style scoped>
v-container {
  height: 100vh;
}
</style>
