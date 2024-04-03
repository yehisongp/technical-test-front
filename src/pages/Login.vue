<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore, useAppStore } from "../stores/app";
import LoginForm from "../components/LoginForm.vue";

const storeApp = useAppStore();
</script>
<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12" :loading="storeApp.isLoading">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text to="/register">Sign Up</v-btn>
          </v-toolbar>
          <v-card-text>
            <LoginForm />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
