<template>
  <v-container class="player">
    <v-row align="start" justify="center">
      <h2>{{player.name}}</h2>
    </v-row>
    <v-row align="start" justify="center">
      <v-col cols="12" sm="6">
        <PlayerStats v-bind:player="player" />
      </v-col>
      <v-col cols="12" sm="6">
        <Activity v-bind:playerActivity="this.activity" v-bind:playerId="this.playerId" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <PlayerTrend v-bind:playerActivity="this.activity"/>
    </v-row>
  </v-container>
</template>

<script>
import PlayerStats from '@/components/PlayerStats.vue';
import PlayerTrend from '@/components/PlayerTrend.vue';
import Activity from '@/components/Activity.vue';
import PingPongApi from '../services/PingPongApi';
import PlayerService from '../services/PlayerService';

export default {
  name: 'player',
  components: {
    Activity,
    PlayerStats,
    PlayerTrend,
  },
  data() {
    return {
      activity: [],
      loading: false,
      player: {},
      playerId: this.$route.params.playerId,
    };
  },
  async mounted() {
    this.loading = true;
    try {
      const response = await PlayerService.fetchPlayer(this.playerId);
      this.player = response;

      const activity = await PingPongApi.fetchActivity(
        this.playerId,
        this.player.name
      );
      this.activity = activity;
      this.loading = false;
    } catch (err) {
      console.error(err);
      this.loading = false;
    }
  },
};
</script>
