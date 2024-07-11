<template>
  <div v-if="currentLink" class="edit-form py-3">
    <p class="headline">Edit Link</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        variant="outlined"
        v-model="currentLink.linkType"
        :rules="[(v) => !!v || 'Link type is required']"
        label="Link Type"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentLink.linkURL"
        :rules="[(v) => !!v || 'Link URL is required']"
        label="Link URL"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>
      <div class="d-flex flex-wrap ga-3">
        <v-btn color="success" small @click="updateLink"> Update </v-btn>
        <v-btn color="success" small @click="cancelEdit"> Cancel </v-btn>
      </div>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a link...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import LinkService from "@/services/link.service";
import router from "../router";

const route = useRoute();
const user = JSON.parse(localStorage.getItem("user"));
const currentLink = ref();
const message = ref("");

const fetchUserLink = async () => {
  var linkId = route.params.id;
  LinkService.get(user.id, linkId)
    .then((response) => {
      currentLink.value = response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const updateLink = async () => {
  LinkService.update(user.id, currentLink.value.id, currentLink.value)
    .then((response) => {
      message.value = "The link was updated successfully!";
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
  fetchUserLink();
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
