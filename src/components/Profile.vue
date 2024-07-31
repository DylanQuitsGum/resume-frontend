<template>
  <div v-if="currentUser" class="edit-form py-3">
    <p class="headline">Edit Profile</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        variant="outlined"
        v-model="currentUser.firstName"
        :rules="[(v) => !!v || 'First Name is required']"
        label="First Name"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentUser.lastName"
        :rules="[(v) => !!v || 'Last Name is required']"
        label="Last Name"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentUser.street"
        :rules="[(v) => !!v || 'Street is required']"
        label="Street"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentUser.city"
        :rules="[(v) => !!v || 'City is required']"
        label="City"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentUser.state"
        :rules="[(v) => !!v || 'State is required']"
        label="State"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentUser.zipCode"
        :rules="[(v) => !!v || 'Zip Date is required']"
        label="Zip"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="currentUser.email"
        :rules="[(v) => !!v || 'Email is required']"
        label="Email"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="userLink.linkType"
        :rules="[(v) => !!v || 'Link type is required']"
        label="Link Type"
        required
      ></v-text-field>

      <v-text-field
        variant="outlined"
        v-model="userLink.linkURL"
        :rules="[(v) => !!v || 'Link URL is required']"
        label="Link URL"
        required
      ></v-text-field>

      <v-divider class="my-5"></v-divider>
      <div class="d-flex flex-wrap ga-3">
        <v-btn color="success" small @click="updateProfile"> Update </v-btn>
        <v-btn color="success" small @click="cancelEdit"> Cancel </v-btn>
      </div>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Cannot load profile...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import UserService from "../services/user.service";
import LinkService from "../services/link.service";
import router from "../router";

const user = JSON.parse(localStorage.getItem("user"));
const currentUser = ref();
const message = ref("");
const userLinks = ref([]);
const userLink = ref({
  id: null,
  linkType: "",
  linkURL: ""
});

const fetchData = async () => {
  fetchUserProfile();
  fetchUserLinks();
};

const fetchUserProfile = async () => {
  UserService.get(user.id)
    .then((response) => {
      console.log(response);
      currentUser.value = response.data;
    })
    .catch((e) => {
      console.log(e);
    });
};

const fetchUserLinks = async() => {
  try {
      const res = await LinkService.getAll(user.id);
      const { status, data } = res;
  
      if (status == 200) {
        userLinks.value = data.map((c) => ({
          ...c,
          enabled: false,
        }));
        if(userLinks.value.length > 0){
          userLink.value = userLinks.value[0];
        }
      }
    } catch (err) {
      console.error(err);
    }
}

const updateProfile = async () => {
  UserService.update(currentUser.value.id, currentUser.value)
    .then((response) => {
      if(userLink.value.id == null){
        if(userLink.value.linkType != undefined && userLink.value.linkURL != undefined ){
          LinkService.create(user.id,userLink.value)
        }
      }else{
        LinkService.update(user.id,userLink.value.id,userLink.value);
      }
      message.value = "The profile was updated successfully!";
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
