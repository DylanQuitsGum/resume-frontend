<template>
  <v-carousel height="400" progress="primary" hide-delimiters>
    <v-carousel-item v-for="(slide, i) in slides" :key="i">
      <v-sheet height="100%">
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">{{ slide }} Slide</div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      }
    },
  }
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0;
}
</style>
