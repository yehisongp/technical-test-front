<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";
import { useAuthStore, useAppStore } from "../stores/app";
import { URL_API, UserDataLogin } from "../lib/definitions";
const storeAuth = useAuthStore();
const storeApp = useAppStore();

const userForm = ref<UserDataLogin>({
  email: "",
  password: "",
});
const errorAuth = ref<Boolean>(false);

const handleSubmitLogin = async () => {
  errorAuth.value = false;
  storeApp.setLoading();
  try {
    await axios
      .post(`${URL_API}/api/login`, userForm.value)
      .then((response) => {
        const { status, data } = response;
        if (status === 200) {
          storeAuth.setAuth(data.data);
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
    <v-btn type="submit" color="primary" :loading="storeApp.isLoading" block
      >Log In</v-btn
    >
  </v-form>
</template>