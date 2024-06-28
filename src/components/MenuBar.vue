<template>
  <v-app-bar color="primary"
             density="compact">

    <template v-slot:image>
        <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
    </template>

    <template v-slot:prepend>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>Resume Builder</v-app-bar-title>

    <v-btn class="mx-2" :to="{ name: 'register' }"> Register </v-btn>
    <v-btn class="mx-2" :to="{ name: 'login' }"> Login </v-btn>
  </v-app-bar>
</template>

<script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

</script>
