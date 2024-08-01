<template>
  <div class="submit-form mt-3 mx-auto">
    <h2 class="headline">Add Award</h2>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          variant="outlined"
          v-model="award.awardName"
          :rules="[(v) => !!v || 'Award Name is required']"
          label="Award Name"
          required
        ></v-text-field>

        <v-text-field
          variant="outlined"
          v-model="award.dateAwarded"
          :rules="[(v) => !!v || 'Award date is required']"
          label="Award Date"
          required
        ></v-text-field>
      </v-form>

      <v-btn color="primary" class="mt-3" @click="saveAward">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title> Submitted successfully! </v-card-title>

        <v-card-subtitle> Click the button to add new Award. </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newAward">Add</v-btn>
          <v-btn color="success" @click="listAwards">Return</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AwardService from "@/services/award.service";
import { useRouter } from "vue-router";

const router = useRouter();

const user = ref(JSON.parse(localStorage.getItem("user")));
const submitted = ref(false);

const award = ref({
  awardId: null,
  awardName: "",
  dateAwarded: "",
});

const saveAward = async () => {
  var data = {
    awardName: award.value.awardName,
    dateAwarded: award.value.dateAwarded,
    userId: user.value.id,
  };
  AwardService.create(user.value.id, data)
    .then((response) => {
      award.value.id = response.data.id;
      submitted.value = true;
    })
    .catch((e) => {
      console.log(e);
    });
};

const newAward = async () => {
  submitted.value = false;
  award.value = {};
};

const listAwards = async () => {
  router.push({ path: "/user" });
};

onMounted(() => {});
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>
