<script setup>
import axios from "axios";
import { ref } from "vue";
import { useAuthStore } from "../stores/app";
import { URL_API } from "../lib/definitions";
import DeleteAction from "./DeleteAction.vue";
import EditAction from "./EditAction.vue";

const auth = useAuthStore();

const itemsPerPage = ref(10);
const headers = [
  {
    title: "Name",
    key: "name",
    sortable: false,
  },
  {
    title: "Email",
    key: "email",
    sortable: false,
  },
  {
    title: "Created at",
    key: "created_at",
    sortable: false,
  },
  {
    title: "",
    key: "action",
    sortable: false,
  },
];
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);

const loadItems = async ({ page, itemsPerPage }) => {
  if (itemsPerPage < 0) {
    itemsPerPage = totalItems.value;
  }
  loading.value = true;
  await axios
    .get(`${URL_API}/api/users`, {
      params: { page, itemsPerPage },
      headers: {
        Authorization: `Bearer ${auth.getToken()}`,
      },
    })
    .then((response) => {
      if (response.status == 200) {
        const { data } = response;
        serverItems.value = data.data;
        totalItems.value = data.meta.total;
      }
    })
    .catch((error) => {
      console.log(error.response);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>
<template>
  <v-app id="inspire">
    <v-main>
      <v-container>
        <v-data-table-server
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="serverItems"
          :items-length="totalItems"
          :loading="loading"
          item-value="name"
          @update:options="loadItems"
        >
          <template v-slot:item.action="{ item }">
            <EditAction :user="item.id" @fallback="loadItems({page: 1, itemsPerPage})"/>
            <DeleteAction :user="item.id" @fallback="loadItems({page: 1, itemsPerPage})"/>
          </template>
        </v-data-table-server>
      </v-container>
    </v-main>
  </v-app>
</template>