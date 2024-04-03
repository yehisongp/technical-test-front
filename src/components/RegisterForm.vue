<script setup lang="ts">
import { ref } from "vue";
import { URL_API, UserDataRegister } from "../lib/definitions";
import { useAppStore, useAuthStore } from "../stores/app";
import axios from "axios";

const userForm = ref<UserDataRegister>({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const store = useAuthStore();
const storeApp = useAppStore();
const errorForm = ref(false);

const handleSubmitRegister = async () => {
  storeApp.setLoading();
  errorForm.value = false;
  try {
    await axios
      .post(`${URL_API}/api/register`, userForm.value)
      .then((response) => {
        if (response.status === 200) {
          const { data } = response.data;
          store.setAuth(data);
        }
      })
      .catch((error) => {
        const { status } = error.response;
        if (status === 400) {
          errorForm.value = true;
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
    text="Form validation error, please try again"
    type="error"
    v-show="errorForm"
  ></v-alert>
  <v-form @submit.prevent="handleSubmitRegister" class="mt-3">
    <v-text-field
      label="Name"
      type="text"
      required
      v-model="userForm.name"
      :disabled="storeApp.isLoading"
    />
    <v-text-field
      label="Email"
      required
      v-model="userForm.email"
      :disabled="storeApp.isLoading"
    />
    <v-text-field
      label="Password"
      type="password"
      required
      v-model="userForm.password"
      :disabled="storeApp.isLoading"
    />
    <v-text-field
      label="Confirm Password"
      type="password"
      required
      v-model="userForm.password_confirmation"
      :disabled="storeApp.isLoading"
    />
    <v-btn type="submit" color="primary" block :loading="storeApp.isLoading"
      >Sign Up</v-btn
    >
  </v-form>
</template>