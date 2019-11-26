<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <router-link to="/">
        <v-toolbar-title>DGC Ping Pong</v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <router-link to="/new-match">
        <v-btn large color="success">New Match</v-btn>
      </router-link>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data: () => ({}),
};
</script>

<style lang="scss">
.v-toolbar__title {
  color: white;
  font-weight: bold;
}
.router-link-exact-active button {
  display: none;
}
</style>
