<script setup>
import { ref } from "vue";
import axios from "axios";
import { URL_API } from "../lib/definitions";
import { useAuthStore } from "../stores/app";
const { user } = defineProps({
  user: {
    required: true,
  },
});
const emit = defineEmits(["fallback"]);
const auth = useAuthStore();

const userForm = ref({
  name: "",
  email: "",
});

const dialog = ref(false);

const getUserInfo = async () => {
  await axios
    .get(`${URL_API}/api/users/${user}/edit`, {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
      },
    })
    .then((response) => {
      const { status, data } = response;
      if (status === 200) {
        userForm.value = data;
      }
    })
    .catch((error) => {
      console.log(error.response);
    });
};

const updateUser = async () => {
  await axios
    .put(`${URL_API}/api/users/${user}`, userForm.value, {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
      },
    })
    .then((response) => {
      const { status } = response;
      if (status === 200) {
        dialog.value = false;
        emit("fallback");
      }
    })
    .catch((error) => {
      console.log(error.response);
    });
};

</script>
<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn v-bind="activatorProps" elevated @click="getUserInfo">
        Edit
      </v-btn>
    </template>

    <v-card title="Edit user">
      <template v-slot:text>
        <v-form @submit.prevent="updateUser" class="mt-3">
          <v-text-field
            label="Name"
            type="text"
            required
            v-model="userForm.name"
          />
          <v-text-field label="Email" required v-model="userForm.email" />
        </v-form>
      </template>
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="dialog = false"> Cancel </v-btn>
        <v-btn @click="updateUser()"> Update </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>