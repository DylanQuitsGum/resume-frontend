<template>
  <v-app>
    <v-container>
      <v-stepper :items="['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5']">
        <template v-slot:item.1>
          <v-card title="Select Employment History" flat>...</v-card>
        </template>
      
        <template v-slot:item.2>
          <v-card title="Select Education History" flat>...</v-card>
        </template>
      
        <template v-slot:item.3>
          <v-card title="Select Relevant Skills" flat>...</v-card>
        </template>

        <template v-slot:item.4>
          <v-card title="Select Awards" flat>...</v-card>
        </template>

        <template v-slot:item.5>
          <v-card title="Select Template" flat>...</v-card>
        </template>
      </v-stepper>
    </v-container>
  </v-app>
</template>