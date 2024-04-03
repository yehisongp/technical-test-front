<script lang="ts" setup>
import AvatarAuth from "../components/AvatarAuth.vue";
import UsersTable from "../components/UsersTable.vue";

</script>
<template>
  <v-app id="inspire">
    <v-app-bar extended>
      <v-app-bar-title>Users list</v-app-bar-title>
      <v-spacer></v-spacer>
      <AvatarAuth />
    </v-app-bar>

    <v-main>
      <v-container>
        <UsersTable />
      </v-container>
    </v-main>
  </v-app>
</template>
