<template>
    <div v-if="currentCourse" class="edit-form py-3">
      <p class="headline">Edit Course</p>
  
      <v-form ref="form" lazy-validation>
        <v-text-field
          variant="outlined"
          v-model="currentCourse.courseTitle"
          :rules="[(v) => !!v || 'Course title is required']"
          label="Course Title"
          required
        ></v-text-field>
  
        <v-divider class="my-5"></v-divider>
        <div class="d-flex flex-wrap ga-3">
          <v-btn color="success" small @click="updateCourse"> Update </v-btn>
          <v-btn color="success" small @click="cancelEdit"> Cancel </v-btn>
        </div>
      </v-form>
  
      <p class="mt-3">{{ message }}</p>
    </div>
  
    <div v-else>
      <p>Please click on a course...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import CourseService from "@/services/course.service";
  import router from "../router";

  const route = useRoute();
  const user = JSON.parse(localStorage.getItem("user"));
  const currentCourse = ref();
  const message = ref("");
  
  const fetchData = async () => {
    var courseId = route.params.id;
    CourseService.get(user.id, courseId)
      .then((response) => {
        currentCourse.value = response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const updateCourse = async () => {
    CourseService.update(user.id, currentCourse.value.id, currentCourse.value)
      .then((response) => {
        message.value = "The course was updated successfully!";
        router.push({ path: "/user" });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const cancelEdit = async () => {
    router.push({ path: "/user" });
  };
  
  onMounted(() => {
    fetchData();
  });
  </script>
  
  <style>
  .edit-form {
    max-width: 300px;
    margin: auto;
  }
  </style>
  