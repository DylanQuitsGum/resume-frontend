<template>
  <v-container>
    <v-row no-gutters>
      <v-spacer></v-spacer>
      <v-col class="d-flex justify-start" cols="12" md="4">
        <v-btn small @click="addDuty"> Add Duty </v-btn>
      </v-col>
      <v-col cols="12" sm="12">
        <v-card class="mx-auto" tile>
          <v-data-table :headers="headers" 
                        :items="jobDuties" disable-pagination 
                        :hide-default-footer="true">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="editDuty(item.id)">mdi-pencil</v-icon>
              <v-icon small class="mr-2" @click="deleteDuty(item.id)">mdi-delete</v-icon>
            </template>
          </v-data-table>

          <v-card-actions v-if="jobDuties.length > 0">
            <v-btn small color="error" @click="removeAllDuties">
              Remove All
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DutyService from "@/services/duty.service";

const route = useRoute();
const router = useRouter();

const headers = ref([
  {
    title: "Job Duty",
    align: "start",
    sortable: false,
    value: "dutyText",
  },
  { text: "Actions", value: "actions", sortable: false },
]);

const user = JSON.parse(localStorage.getItem("user"));

const jobDuties = ref([]);
const employerId = ref();

const fetchData = async () => {
  try {
    console.log(`Getting duties for employerId:${employerId.value}`);
    const res = await DutyService.getAll(employerId.value);
    const { status, data } = res;

    if (status == 200) {
      jobDuties.value = data.map((c) => ({
        ...c,
        enabled: false,
      }));
    }
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  employerId.value = route.params.id;
  fetchData();
});
</script>