<script setup>
import { ref } from "vue";
import axios from "axios";
import { URL_API } from "../lib/definitions";
import { useAuthStore } from "../stores/app";
const { user } = defineProps({
  user: {
    required: true,
    type: Number,
  },
});
const emit = defineEmits(["fallback"]);
const auth = useAuthStore();

const dialog = ref(false);

const deleteUser = async () => {
  await axios
    .delete(`${URL_API}/api/users/${user}`, {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
      },
    })
    .then((response) => {
      const { status } = response;
      if (status === 200) {
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
      <v-btn v-bind="activatorProps" elevated> Delete </v-btn>
    </template>

    <v-card
      text="Are you sure you want to delete the record?"
      title="Confirm delete"
    >
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="dialog = false"> Cancel </v-btn>
        <v-btn @click="deleteUser()"> Delete </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>