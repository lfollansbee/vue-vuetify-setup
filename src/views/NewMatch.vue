<template>
  <v-container class="newMatch">
    <v-row align="start" justify="center">
      <h2>Start a New Match</h2>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4">
        <CurrentPlayer v-bind:players="players"/>
      </v-col>

      <v-col cols="12" lg="4">
        <CurrentPlayer />
      </v-col>

      <v-col cols="12" lg="4">
        <CurrentPlayer v-bind:players="players"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CurrentPlayer from '@/components/CurrentPlayer.vue';
import pingPongApi from '../services/PingPongApi';

export default {
  name: 'newMatch',
  components: {
    CurrentPlayer,
  },
  data() {
    return {
      players: [],
    };
  },
  mounted() {
    this.loading = true;
    pingPongApi.fetchAllPlayers('name').then(
      (response) => {
        this.loading = false;
        this.players = response;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  },
};
</script>

<style>
</style>
