<script setup lang="ts">
import { computed } from "vue";
import { useAuthStore } from "../stores/app";

const auth = useAuthStore();

const getAuth = computed(() => {
  return auth.getUserData();
});
</script>
<template>
  <v-menu min-width="200px" rounded>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar color="brown" size="large">
          <span class="text-h5">{{ getAuth.name.substring(0, 1) }}</span>
        </v-avatar>
      </v-btn>
    </template>
    <v-card>
      <v-card-text>
        <div class="mx-auto text-center">
          <v-avatar color="brown">
            <span class="text-h5">{{ getAuth.name.substring(0, 1) }}</span>
          </v-avatar>
          <h3>{{ getAuth.name }}</h3>
          <p class="text-caption mt-1">{{ getAuth.email }}</p>
          <v-divider class="my-3"></v-divider>
          <v-btn variant="text" rounded @click="auth.$resetAuth()"> Disconnect </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-menu>
</template>