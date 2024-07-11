<template>
    <div class="submit-form mt-3 mx-auto">
      <h2 class="headline">Add Link</h2>
  
      <div v-if="!submitted">
        <v-form ref="form" lazy-validation>
          <v-text-field
            variant="outlined"
            v-model="link.linkType"
            :rules="[(v) => !!v || 'Link type is required']"
            label="Link Type"
            required
          ></v-text-field>
  
          <v-text-field
            variant="outlined"
            v-model="link.linkURL"
            :rules="[(v) => !!v || 'Link URL is required']"
            label="Link URL"
            required
          ></v-text-field>
        </v-form>
  
        <v-btn color="primary" class="mt-3" @click="saveLink">Submit</v-btn>
      </div>
  
      <div v-else>
        <v-card class="mx-auto">
          <v-card-title> Submitted successfully! </v-card-title>
  
          <v-card-subtitle> Click the button to add new link. </v-card-subtitle>
  
          <v-card-actions>
            <v-btn color="success" @click="newLink">Add</v-btn>
            <v-btn color="success" @click="listLinks">Return</v-btn>
          </v-card-actions>
        </v-card>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import LinkService from "@/services/link.service";
  import router from "../router";
  
  const user = ref(JSON.parse(localStorage.getItem("user")));
  const submitted = ref(false);
  
  const link = ref({
    linkId: null,
    linkType: "GitHub",
    linkURL: "https://github.com/DylanQuitsGum",
  });
  
  const saveLink = async () => {
    var data = {
      linkType: link.value.linkType,
      linkURL: link.value.linkURL,
      userId: user.value.id,
    };
    LinkService.create(user.value.id, data)
      .then((response) => {
        link.value.id = response.data.id;
        submitted.value = true;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  const newLink = async () => {
    submitted.value = false;
    link.value = {};
  };
  
  const listLinks = async () => {
    router.push({ path: "/user" });
  };
  
  onMounted(() => {});
  </script>
  
  <style>
  .submit-form {
    max-width: 300px;
  }
  </style>
  