<template>
    <div class="submit-form mt-3 mx-auto">
      <h2 class="headline">Add Course</h2>
  
      <div v-if="!submitted">
        <v-form ref="form" lazy-validation>
          <v-text-field
            variant="outlined"
            v-model="course.courseTitle"
            :rules="[(v) => !!v || 'Course title is required']"
            label="Course Title"
            required
          ></v-text-field>
        </v-form>
  
        <v-btn color="primary" class="mt-3" @click="saveCourse">Submit</v-btn>
      </div>
  
      <div v-else>
        <v-card class="mx-auto">
          <v-card-title> Submitted successfully! </v-card-title>
  
          <v-card-subtitle> Click the button to add new course. </v-card-subtitle>
  
          <v-card-actions>
            <v-btn color="success" @click="newCourse">Add</v-btn>
            <v-btn color="success" @click="listCourses">Return</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from 'vue-router';
  import CourseService from "@/services/course.service";

  const route = useRoute();
  const router = useRouter();
  
  const submitted = ref(false);
  const educationId = ref();

  const course = ref({
    courseId: null,
    courseTitle: "GitHub",
  });
  
  const saveCourse = async () => {
    var data = {
      courseTitle: course.value.courseTitle,
      educationId: educationId.value,
    };
    console.log(data);
    CourseService.create(educationId.value, data)
      .then((response) => {
        course.value.id = response.data.id;
        submitted.value = true;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const newCourse = async () => {
    submitted.value = false;
    course.value = {};
  };
  
  const listCourses = async () => {
    router.push({ path: `/educationCourses/${educationId.value}` });
  };
  
  onMounted(() => {
    educationId.value = route.params.id;
  });
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
  }
  </style>
  