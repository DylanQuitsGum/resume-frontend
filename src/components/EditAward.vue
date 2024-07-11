<template>
  <div v-if="currentAward" class="edit-form py-3">
    <p class="headline">Edit Award</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        variant="outlined"
        v-model="currentAward.awardName"
        :rules="[(v) => !!v || 'Skill name is required']"
        label="Award Name"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentAward.dateAwarded"
        :rules="[(v) => !!v || 'Date awarded is required']"
        label="Date Awarded"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>
      <div class="d-flex flex-wrap ga-3">
        <v-btn color="success" small @click="updateAward"> Update </v-btn>
        <v-btn color="success" small @click="cancelEdit"> Cancel </v-btn>
      </div>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a award...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import AwardService from "@/services/award.service";
import router from "../router";

const route = useRoute();
const user = JSON.parse(localStorage.getItem("user"));
const currentAward = ref();
const message = ref("");

const fetchUserAward = async () => {
  var awardId = route.params.id;
  AwardService.get(user.id, awardId)
    .then((response) => {
      currentAward.value = response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const updateAward = async () => {
  AwardService.update(user.id, currentAward.value.id, currentAward.value)
    .then((response) => {
      message.value = "The award was updated successfully!";
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
  fetchUserAward();
});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
