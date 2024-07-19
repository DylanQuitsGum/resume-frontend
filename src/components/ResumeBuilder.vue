<template>
  <v-app v-if="!showEditResume">
    <v-container>
      <v-stepper :items="['Questions', 'Education', 'Employment', 'Skills', 'Awards', 'Select Template', 'Build']">

        <template v-slot:item.1>
          <v-card title="Tell us about your new career!" elevation="10">
            <v-form ref="form" lazy-validation>
              <v-text-field variant="outlined" v-model="jobDescription"
                :rules="[(v) => !!v || 'Job description is required']" label="Job Description" required>
              </v-text-field>

              <div>
                <v-text-field variant="outlined" v-model="objectiveStatement" label="Objective Statement" required>
                </v-text-field>
              </div>

            </v-form>
            <v-card-actions>

            </v-card-actions>

          </v-card>
        </template>

        <template v-slot:item.2>
          <v-card title="Select Education History" elevation="10">
            <v-data-table-virtual :items="userEducations" disable-pagination :hide-default-footer="true">
              <template v-slot:['item.actions']="{ item }">

              </template>
            </v-data-table-virtual>

            <v-card-actions>

            </v-card-actions>

          </v-card>
        </template>

        <template v-slot:item.3>
          <v-card title="Select Employment History" elevation="10">
            <v-data-table-virtual :items="userEmployments" disable-pagination :hide-default-footer="true">
              <template v-slot:['item.actions']="{ item }">

              </template>
            </v-data-table-virtual>

            <v-card-actions>

            </v-card-actions>

          </v-card>
        </template>

        <template v-slot:item.4>
          <v-card title="Select Skills" elevation="10">
            <v-data-table-virtual :items="userSkills" disable-pagination :hide-default-footer="true">
              <template v-slot:['item.actions']="{ item }">

              </template>
            </v-data-table-virtual>

            <v-card-actions>

            </v-card-actions>

          </v-card>
        </template>

        <template v-slot:item.5>
          <v-card title="Select Awards" elevation="10">
            <v-data-table-virtual :items="userAwards" disable-pagination :hide-default-footer="true">
              <template v-slot:['item.actions']="{ item }">

              </template>
            </v-data-table-virtual>

            <v-card-actions>

            </v-card-actions>

          </v-card>
        </template>

        <template v-slot:item.6>
          <v-sheet class="mx-auto" elevation="8" max-width="800">
            <v-slide-group v-model="templateModel" class="pa-4" selected-class="bg-success" show-arrows>
              <v-slide-group-item v-for="n in 4" :key="n" v-slot="{ isSelected, toggle, selectedClass }">
                <v-card :class="['ma-4', selectedClass]" color="grey-lighten-1" height="200" width="100"
                  @click="toggle">
                  <div class="d-flex fill-height align-center justify-center">
                    <v-scale-transition>
                      <v-icon v-if="isSelected" color="white" icon="mdi-close-circle-outline" size="48"></v-icon>
                    </v-scale-transition>
                  </div>
                </v-card>
              </v-slide-group-item>
            </v-slide-group>
          </v-sheet>
        </template>

        <template v-slot:item.7>
          <v-card title="Build Resume" flat>
            <v-card-actions>
              <VBtn @click="buildResume">Build it</VBtn>
            </v-card-actions>
          </v-card>
        </template>
      </v-stepper>
    </v-container>
  </v-app>

  <v-app v-if="showEditResume">
    <VBtn @click="cancelBuildResume">Edit Input</VBtn>
    <VBtn @click="saveResume">Save Resume</VBtn>
    <template>
      <div v-if="editor">
        <bubble-menu class="bubble-menu" :tippy-options="{ duration: 100 }" :editor="editor">
          <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
            Bold
          </button>
          <button @click="editor.chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }">
            Italic
          </button>
          <button @click="editor.chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }">
            Strike
          </button>
        </bubble-menu>
        <floating-menu class="floating-menu" :tippy-options="{ duration: 100 }" :editor="editor">
          <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
            H1
          </button>
          <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
            H2
          </button>
          <button @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }">
            Bullet list
          </button>
        </floating-menu>
      </div>
    </template>
    <editor-content :editor="editor" />
  </v-app>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

import { useRouter } from "vue-router";

import EducationService from "@/services/education.service";
import EmploymentService from '@/services/employer.service';
import SkillService from '@/services/skill.service';
import AwardService from '@/services/award.service';
import UserService from '@/services/user.service';
import AIService from '@/services/ai.service';
import ResumeService from '@/services/resume.service';
import jsPDF from 'jspdf';

import {
  BubbleMenu,
  Editor,
  EditorContent,
  FloatingMenu,
} from '@tiptap/vue-3'
import StarterKit from "@tiptap/starter-kit";
import aiService from "@/services/ai.service";

const editor = ref(new Editor({
  extensions: [
    StarterKit,
  ],
  content: '',
}));

const router = useRouter();

const professionalSummary = ref();
const professionalSummaryLoaded = ref(false);
const resumeText = ref('');

const user = JSON.parse(localStorage.getItem("user"));
const userInformation = ref({
  firstName: '',
  lastName: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  email: ''
});
const userEducations = ref([]);
const userEmployments = ref([]);
const userSkills = ref([]);
const userAwards = ref([]);
const templateModel = ref('');


const showEditResume = ref(false);

const jobDescription = ref('Computer Scientist');
const objectiveStatement = ref('');

watch(templateModel, async (newValue, oldValue) => {
  console.log(templateModel.value);
});

const buildEditor = async () => {

};

// #region Fetch Data

const fetchData = async () => {
  fetchUserEducations();
  fetchUserEmployment();
  fetchUserSkills();
  fetchUserAwards();
  fetchUserInformation();
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

const fetchUserEmployment = async () => {
  try {
    const res = await EmploymentService.getAll(user.id);
    const { status, data } = res;

    if (status == 200) {
      userEmployments.value = data.map((c) => ({
        ...c,
        employerName: c.employerName,
        enabled: false,
      }));
    }
  } catch (err) {
    console.error(err);
  }
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

const fetchUserInformation = async () => {
  try {
    const res = await UserService.get(user.id);
    const { status, data } = res;
    if (status == 200) {
      userInformation.value = {
        firstName: data.firstName,
        lastName: data.lastName,
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        email: data.email,
        phoneNumber: data.phoneNumber
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// #endregion

const buildResume = async () => {
  console.log(templateModel.value);
  switch (templateModel.value) {
    case 0:
      buildTemplate1();
      break;
    case 1:
      buildTemplate2();
      break;
    case 2:
      buildTemplate3();
      break;
    case 3:
      buildTemplate4();
      break;
  }
  showEditResume.value = true;
};

const cancelBuildResume = async () => {
  showEditResume.value = false;
};

const saveResume = async () => {
  var data = {
    resumeTitle: 'Resume Title',
    resumeText: editor.value.getHTML(),
    userId: user.id
  };
  const res = await ResumeService.create(user.id, data);

  createPDF();
};

const createPDF = async () => {
  var doc = new jsPDF();
  doc.html(resumeText.value, {
    callback: function (doc) {
      doc.save('Resume.pdf');
    },
    x: 15,
    y: 15,
    width: 170,
    windowWidth: 670
  })
}

function UserName() {
  return `${userInformation.value.firstName} ${userInformation.value.lastName}`;
}

function UserInfo() {
  return `${userInformation.value.city}, ${userInformation.value.state} | ${userInformation.value.phoneNumber} | ${userInformation.value.email} |`;
}

function ProfessionalSummary() {
  var request = {
    preamble: 'You are a resume writer',
    prompt: 'Write me an objective statement for an senior developer position.  Only give me the objective statement.'
  };

  AIService.getObjective(request)
    .then((response) => {
      console.log(response.data);
      objectiveStatement.value = response.data;
    });

  return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ' +
    'et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ' +
    'ut aliquip ex ea commodo consequat.';
}

//#region Education History
function EducationHistoryTemplate1() {
  var educationHistory = '';

  for (let i = 0; i < userEducations.value.length; i++) {
    var item = userEducations.value[i];
    educationHistory += `<bold>${item.institutionName},${item.city},${item.state}</bold>     ${item.beginDate} - ${item.degreeAwardedDate ? item.degreeAwardedDate : 'Projected'}<br>`;
    educationHistory += `${item.fieldOfStudy}<br>`;
    educationHistory += `<em>Need to add GPA</em><br>`;
    educationHistory += "<em>Need to add Awards</em><br>";
    educationHistory += "<em>Need to add Coursework</em><br>";
    educationHistory += "<br>";
  }

  return educationHistory;
}

function EducationHistoryTemplate2() {
  var educationHistory = '';

  for (let i = 0; i < userEducations.value.length; i++) {
    var item = userEducations.value[i];
    educationHistory += `<bold>${item.institutionName},${item.city},${item.state}</bold>     ${item.beginDate} - ${item.degreeAwardedDate ? item.degreeAwardedDate : 'Projected'}<br>`;
    educationHistory += `${item.fieldOfStudy}<br>`;
    educationHistory += `<em>Need to add GPA</em><br>`;
    educationHistory += "<em>Need to add Awards</em><br>";
    educationHistory += "<em>Need to add Coursework</em><br>";
    educationHistory += "<br>";
  }

  return educationHistory;
}

function EducationHistoryTemplate3() {
  var educationHistory = '';

  for (let i = 0; i < userEducations.value.length; i++) {
    var item = userEducations.value[i];
    educationHistory += `<bold>${item.institutionName},${item.city},${item.state}</bold>     ${item.beginDate} - ${item.degreeAwardedDate ? item.degreeAwardedDate : 'Projected'}<br>`;
    educationHistory += `${item.fieldOfStudy}<br>`;
    educationHistory += `<em>Need to add GPA</em><br>`;
    educationHistory += "<em>Need to add Awards</em><br>";
    educationHistory += "<em>Need to add Coursework</em><br>";
    educationHistory += "<br>";
  }

  return educationHistory;
}

function EducationHistoryTemplate4() {
  var educationHistory = '';

  for (let i = 0; i < userEducations.value.length; i++) {
    var item = userEducations.value[i];
    educationHistory += `<bold>${item.institutionName},${item.city},${item.state}</bold>     ${item.beginDate} - ${item.degreeAwardedDate ? item.degreeAwardedDate : 'Projected'}<br>`;
    educationHistory += `${item.fieldOfStudy}<br>`;
    educationHistory += `<em>Need to add GPA</em><br>`;
    educationHistory += "<em>Need to add Awards</em><br>";
    educationHistory += "<em>Need to add Coursework</em><br>";
    educationHistory += "<br>";
  }

  return educationHistory;
}
//#endregion

//#region ProfessionalHistory
function ProfessionalHistory1() {
  var professionalHistory = '';

  for (let i = 0; i < userEmployments.value.length; i++) {
    var item = userEmployments.value[i];
    professionalHistory += `${item.employerName}, ${item.position}, ${item.city}, ${item.state}`;
    professionalHistory += "<ul>";
    for (let ii = 0; ii < 3; ii++) {
      professionalHistory += `<li>Accomplished X, as measured by Y, by doing Z`;
    }
    professionalHistory += "</ul>";
  }

  return professionalHistory;
}

function ProfessionalHistory2() {
  var professionalHistory = '';

  for (let i = 0; i < userEmployments.value.length; i++) {
    var item = userEmployments.value[i];
    professionalHistory += `${item.employerName}, ${item.position}, ${item.city}, ${item.state}`;
    professionalHistory += "<ul>";
    for (let ii = 0; ii < 3; ii++) {
      professionalHistory += `<li>Accomplished X, as measured by Y, by doing Z`;
    }
    professionalHistory += "</ul>";
  }

  return professionalHistory;
}

function ProfessionalHistory3() {
  var professionalHistory = '';

  for (let i = 0; i < userEmployments.value.length; i++) {
    var item = userEmployments.value[i];
    professionalHistory += `${item.employerName}, ${item.position}, ${item.city}, ${item.state}`;
    professionalHistory += "<ul>";
    for (let ii = 0; ii < 3; ii++) {
      professionalHistory += `<li>Accomplished X, as measured by Y, by doing Z`;
    }
    professionalHistory += "</ul>";
  }

  return professionalHistory;
}

function ProfessionalHistory4() {
  var professionalHistory = '';

  for (let i = 0; i < userEmployments.value.length; i++) {
    var item = userEmployments.value[i];
    professionalHistory += `${item.employerName}, ${item.position}, ${item.city}, ${item.state}`;
    professionalHistory += "<ul>";
    for (let ii = 0; ii < 3; ii++) {
      professionalHistory += `<li>Accomplished X, as measured by Y, by doing Z`;
    }
    professionalHistory += "</ul>";
  }

  return professionalHistory;
}
//#endregion

// #region Skills
function Skills1() {
  var skills = '';

  skills += "<ul>";
  for (let i = 0; i < userSkills.value.length; i++) {
    var item = userSkills.value[i];
    skills += `<li>${item.skillName}: ${item.skillLevel}`;
  }
  skills += "</ul>";

  return skills;
}

function Skills2() {
  var skills = '';

  skills += "<ul>";
  for (let i = 0; i < userSkills.value.length; i++) {
    var item = userSkills.value[i];
    skills += `<li>${item.skillName}: ${item.skillLevel}`;
  }
  skills += "</ul>";

  return skills;
}

function Skills3() {
  var skills = '';

  skills += "<ul>";
  for (let i = 0; i < userSkills.value.length; i++) {
    var item = userSkills.value[i];
    skills += `<li>${item.skillName}: ${item.skillLevel}`;
  }
  skills += "</ul>";

  return skills;
}

function Skills4() {
  var skills = '';

  skills += "<ul>";
  for (let i = 0; i < userSkills.value.length; i++) {
    var item = userSkills.value[i];
    skills += `<li>${item.skillName}: ${item.skillLevel}`;
  }
  skills += "</ul>";

  return skills;
}

// #endregion

// #region Build Templates
const buildTemplate1 = async () => {
  var html = '';
  html += `<span{align=center}><bold>${UserName()}</bold></span><br>`;
  html += `${UserInfo()}<br><br>`;
  html += "Professional Summary";
  html += "<hr>";
  html += `${ProfessionalSummary()}<br><br>`;
  html += "Education";
  html += "<hr>";
  html += `${EducationHistoryTemplate1()}`;
  html += "Professional Experience";
  html += "<hr>";
  html += `${ProfessionalHistory1()}`;
  html += "Skills | Leadership Skills | Activities | Extracurricular Activies";
  html += "<hr>";
  html += `${Skills1()}`;
  resumeText.value = html;
  editor.value.commands.setContent(html);
};

const buildTemplate2 = async () => {
  var html = '';
  html += `<span{align=center}><bold>${UserName()}</bold></span><br>`;
  html += `${UserInfo()}<br><br>`;
  html += "Professional Summary";
  html += "<hr>";
  html += `${ProfessionalSummary()}<br><br>`;
  html += "Education";
  html += "<hr>";
  html += `${EducationHistoryTemplate2()}`;
  html += "Professional Experience";
  html += "<hr>";
  html += `${ProfessionalHistory2()}`;
  html += "Skills | Leadership Skills | Activities | Extracurricular Activies";
  html += "<hr>";
  html += `${Skills2()}`;
  resumeText.value = html;
  editor.value.commands.setContent(html);
};

const buildTemplate3 = async () => {
  var html = '';
  html += `<span{align=center}><bold>${UserName()}</bold></span><br>`;
  html += `${UserInfo()}<br><br>`;
  html += "Professional Summary";
  html += "<hr>";
  html += `${ProfessionalSummary()}<br><br>`;
  html += "Education";
  html += "<hr>";
  html += `${EducationHistoryTemplate3()}`;
  html += "Professional Experience";
  html += "<hr>";
  html += `${ProfessionalHistory3()}`;
  html += "Skills | Leadership Skills | Activities | Extracurricular Activies";
  html += "<hr>";
  html += `${Skills3()}`;
  resumeText.value = html;
  editor.value.commands.setContent(html);
};

const buildTemplate4 = async () => {
  var html = '';
  html += `<span{align=center}><bold>${UserName()}</bold></span><br>`;
  html += `${UserInfo()}<br><br>`;
  html += "Professional Summary";
  html += "<hr>";
  html += `${ProfessionalSummary()}<br><br>`;
  html += "Education";
  html += "<hr>";
  html += `${EducationHistoryTemplate4()}`;
  html += "Professional Experience";
  html += "<hr>";
  html += `${ProfessionalHistory4()}`;
  html += "Skills | Leadership Skills | Activities | Extracurricular Activies";
  html += "<hr>";
  html += `${Skills4()}`;
  resumeText.value = html;
  editor.value.commands.setContent(html);
};

// #endregion

onMounted(() => {
  fetchData();
  buildEditor();
});

</script>
