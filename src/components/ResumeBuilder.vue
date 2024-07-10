<template>
  <v-app>
    <v-container>
      <v-stepper :items="['Education', 'Employment', 'Skills', 'Awards', 'Select Template', 'Build']">
        <template v-slot:item.1>
          <v-card title="Select Education History" elevation="10">
            <v-data-table-virtual :items="userEducations"
              disable-pagination :hide-default-footer="true">
              <template v-slot:['item.actions']="{ item }">
                
              </template>
            </v-data-table-virtual>

            <v-card-actions>

            </v-card-actions>

          </v-card>
        </template>

        <template v-slot:item.2>
          <v-card title="Select Employment History" elevation="10">
            <v-data-table-virtual :items="userEmployments"
              disable-pagination :hide-default-footer="true">
              <template v-slot:['item.actions']="{ item }">
                
              </template>
            </v-data-table-virtual>

            <v-card-actions>

            </v-card-actions>

          </v-card>
        </template>

        <template v-slot:item.3>
          <v-card title="Select Skills" elevation="10">
            <v-data-table-virtual :items="userSkills"
              disable-pagination :hide-default-footer="true">
              <template v-slot:['item.actions']="{ item }">
                
              </template>
            </v-data-table-virtual>

            <v-card-actions>

            </v-card-actions>

          </v-card>
        </template>

        <template v-slot:item.4>
          <v-card title="Select Awards" elevation="10">
            <v-data-table-virtual :items="userAwards"
              disable-pagination :hide-default-footer="true">
              <template v-slot:['item.actions']="{ item }">
                
              </template>
            </v-data-table-virtual>

            <v-card-actions>

            </v-card-actions>

          </v-card>
        </template>

        <template v-slot:item.5>
          <v-sheet class="mx-auto" elevation="8" max-width="800" >
            <v-slide-group v-model="templateModel"
                           class="pa-4"
                           selected-class="bg-success"
                           show-arrows
                           >
      <v-slide-group-item
        v-for="n in 4"
        :key="n"
        v-slot="{ isSelected, toggle, selectedClass }">
        <v-card :class="['ma-4', selectedClass]"
                color="grey-lighten-1"
                height="200"
                width="100"
                @click="toggle" >
          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
              <v-icon
                v-if="isSelected"
                color="white"
                icon="mdi-close-circle-outline"
                size="48"
              ></v-icon>
            </v-scale-transition>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
        </template>

        <template v-slot:item.6>
          <v-card title="Build Resume" flat>...</v-card>
        </template>
      </v-stepper>
    </v-container>
  </v-app>
</template>

<script setup>
import EducationService from "@/services/education.service";
import EmploymentService from '@/services/employer.service';
import SkillService from '@/services/skill.service';
import AwardService from '@/services/award.service';

import { onMounted, ref } from "vue";

const user = JSON.parse(localStorage.getItem("user"));
const userEducations = ref([]);
const userEmployments = ref([]);
const userSkills = ref([]);
const userAwards = ref([]);
const templateModel = ref();

const fetchData = async () => {
  fetchUserEducations();
  fetchUserEmployment();
  fetchUserSkills();
  fetchUserAwards();
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


onMounted(() => {
  fetchData();
});
</script>
