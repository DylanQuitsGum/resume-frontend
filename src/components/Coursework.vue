<template>
    <v-container>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-start" cols="12" md="4">
          <v-btn small @click="addCourse"> Add Course </v-btn>
        </v-col>
        <v-col cols="12" sm="12">
          <v-card class="mx-auto" tile>
            <v-data-table :headers="headers" 
                          :items="courses" disable-pagination 
                          :hide-default-footer="true">
              <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editCourse(item.id)">mdi-pencil</v-icon>
                <v-icon small class="mr-2" @click="deleteCourse(item.id)">mdi-delete</v-icon>
              </template>
            </v-data-table>
  
            <v-card-actions v-if="courses.length > 0">
              <v-btn small color="error" @click="removeAllCourses">
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
  import CourseService from "@/services/course.service";
  
  const route = useRoute();
  const router = useRouter();
  
  const headers = ref([
    {
      title: "Course Title",
      align: "start",
      sortable: false,
      value: "courseTitle",
    },
    { text: "Actions", value: "actions", sortable: false },
  ]);
  
  const user = JSON.parse(localStorage.getItem("user"));
  
  const courses = ref([]);
  const educationId = ref();
  
  const fetchData = async () => {
    try {
      const res = await CourseService.getAll(educationId.value);
      const { status, data } = res;
  
      if (status == 200) {
        courses.value = data.map((c) => ({
          ...c,
          enabled: false,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };
  
  const addCourse = async() => {
    router.push({ path: `/addCourse/${educationId.value}` });
  };
  
  const deleteCourse = async (id) => {
    CourseService.delete(educationId.value, id)
      .then(() => {
        fetchData();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const editCourse = async (id) => {
  router.push({ path: `/editCourse/${id}` });
};
  
  const removeAllCourses = async() => {
    CourseService.deleteAll(educationId.value)
      .then((response) => {
        fetchData();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  onMounted(() => {
    educationId.value = route.params.id;
    fetchData();
  });
  </script>