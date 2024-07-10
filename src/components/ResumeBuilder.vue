<template>
  <v-app>
    <v-container>
      <v-stepper :items="['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']">
        <template v-slot:item.1>
          <v-card title="Select Education History" elevation="10">
            <v-data-table-virtual
                :loading="educationLoading"
                :headers="educationHeaders"
                :items="educations"
                disable-pagination
                :hide-default-footer="true"    
            >
                <template v-slot:['item.actions']="{ item }">
                    <v-checkbox @click="selectedEducations(item.id)"></v-checkbox>
                </template>
            </v-data-table-virtual>

            <v-card-actions>
                <v-btn v-if="educations.length > 0" 
                       small color="error"
                       @click="toggleSelectAllEducation"
                       >
                       Select All
                </v-btn>
            </v-card-actions>

          </v-card>
        </template>

        <template v-slot:item.2>
          <v-card title="Select Employment History" flat>...</v-card>
        </template>

        <template v-slot:item.3>
          <v-card title="Select Relevant Skills" flat>...</v-card>
        </template>

        <template v-slot:item.4>
          <v-card title="Select Awards" flat>...</v-card>
        </template>

        <template v-slot:item.5>
          <v-card title="Select Template" flat>...</v-card>
        </template>
      </v-stepper>
    </v-container>
  </v-app>
</template>

<script>
    import EducationService from "@/services/education.service";
    import { onMounted, ref, watch } from "vue";
    import router from "../router";

    export default{
        setup(){
            const user = JSON.parse(localStorage.getItem("user"));
            const selectedEducations = ref([]);
            const userEducations = ref([]);

            watch(userEducations, (newValue, oldValue) => {
                userEducations.value = newValue;
            });

            const fetchData = async () => {
                fetchUserEducations();
            };

            const fetchUserEducations = async () => {
                try {
                    const res = await EducationService.getAll(user.userId);
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

            onMounted(async () => {
                fetchData();
            });
        }, 


    }
</script>