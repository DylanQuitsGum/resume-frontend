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
import router from "../router";

const user = JSON.parse(localStorage.getItem("user"));
const currentUser = ref();
const message = ref("");

const fetchData = async () => {
  fetchUserProfile();
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

const updateProfile = async () => {
  UserService.update(currentUser.value.id, currentUser.value)
    .then((response) => {
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

<!-- <script>
import UserService from "../services/user.service";
import router from "../router";

export default {
  name: "profile",
  data() {
    return {
      currentUser: null,
      message: "",
    };
  },
  async mounted() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      const user = JSON.parse(localStorage.getItem("user"));
      UserService.get(user.id)
        .then((response) => {
          console.log(response);
          this.currentUser = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateProfile() {
      const user = JSON.parse(localStorage.getItem("user"));
      UserService.update(
        this.currentUser.id,
        this.currentUser
      )
        .then((response) => {
          this.message = "The profile was updated successfully!";
          router.push({ path: "/user"});
        })
        .catch((e) => {
          console.log(e);
        });
    },

    cancelEdit(){
      router.push({ path: "/user"});
    }
  },
};
</script> -->

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
