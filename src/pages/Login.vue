<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import { UserDataLogin, URL_API } from "../lib/definitions";
import { useAuthStore, useAppStore } from "../stores/app";

const storeAuth = useAuthStore();
const storeApp = useAppStore();

const userForm = ref<UserDataLogin>({
  email: "",
  password: "",
});
const errorAuth = ref(false);

const handleSubmitLogin = async () => {
  errorAuth.value = false;
  storeApp.setLoading();
  try {
    await axios
      .post(`${URL_API}/api/login`, userForm.value)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          storeAuth.setAuth(data.data)
        }
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 401) {
          errorAuth.value = true;
        }
      })
      .finally(() => {
        storeApp.setLoading();
      });
  } catch (error) {
    console.log(error);
  }
};
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
            <v-alert
              text="You entered an invalid email or password"
              title="Unauthorized user"
              type="error"
              v-if="errorAuth"
            ></v-alert>
            <v-form @submit.prevent="handleSubmitLogin" class="mt-3">
              <v-text-field
                label="Email"
                v-model="userForm.email"
                required
                :disabled="storeApp.isLoading"
              ></v-text-field>
              <v-text-field
                label="Password"
                type="password"
                v-model="userForm.password"
                required
                :disabled="storeApp.isLoading"
              ></v-text-field>
              <v-btn
                type="submit"
                color="primary"
                :loading="storeApp.isLoading"
                block
                >Log In</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
