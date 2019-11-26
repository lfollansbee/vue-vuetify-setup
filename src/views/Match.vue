<template>
  <v-container class="newMatch">
    <v-row align="start" justify="center">
      <h2>Match</h2>
    </v-row>
    <v-row>
      <v-col cols="12" lg="4">
        <CurrentPlayer
        v-bind:playerNumber="1"
        />
      </v-col>

      <v-col cols="12" lg="4"></v-col>

      <v-col cols="12" lg="4">
        <CurrentPlayer
        v-bind:playerNumber="2"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import pingPongApi from '../services/PingPongApi';
import CurrentPlayer from '@/components/CurrentPlayer.vue';

export default {
  name: 'match',
  components: {
    CurrentPlayer,
  },
  data() {
    return {
      player1: undefined,
      player2: undefined,
      match: undefined,
      matchId: this.$route.params.matchId,
    };
  },
  async mounted() {
    try {
      const response = await pingPongApi.fetchMatch(this.matchId);
      this.match = response;

      this.player1 = await pingPongApi.fetchPlayer(response.player1_id);
      this.player2 = await pingPongApi.fetchPlayer(response.player2_id);
    } catch (err) {
      console.error(err);
    }
  },
};
</script>

<style>
</style>
