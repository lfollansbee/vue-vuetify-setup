<template>
  <v-container fluid>
    <v-row align="start" justify="center">
      <h2>Leaderboard</h2>
    </v-row>
    <v-row align="start" justify="center">
      <div v-if="loading">
        <img src="../assets/ping-pong.gif" />
      </div>

      <v-data-table :headers="headers" :items="players" :items-per-page="25"></v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import pingPongApi from '../services/PingPongApi';

export default {
  name: 'Leaderboard',
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Matches Won',
          align: 'center',
          value: 'matches_won',
        },
        {
          text: 'Matches Lost',
          align: 'center',
          value: 'matches_lost',
        },
        {
          text: 'Last Played',
          align: 'center',
          value: null,
        },
      ],
      players: [],
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    pingPongApi.fetchPlayerInfo().then(
      (response) => {
        this.loading = false;
        this.players = response;
      },
      (error) => {
        this.loading = false;
      }
    );
  },
};
</script>

<style lang="scss">
img {
  border-radius: 50%;
  width: 15%;
}

table {
  background-color: olive;
}
</style>
