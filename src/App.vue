<template>
  <v-app>
    <MenuBar :key="$route.fullPath" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import MenuBar from "./components/MenuBar.vue";
</script>
