<template>
  <v-container class="player">
    <v-row align="start" justify="center">
      <h2 v-bind:class="{ 'warning--text': !player.active }">
        {{player.name}}
        <span v-if="!player.active" class="warning--text">(INACTIVE)</span>
      </h2>
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
      <PlayerTrend v-bind:player="this.player" v-bind:playerActivity="this.activity" />
    </v-row>
  </v-container>
</template>

<script>
import PlayerStats from '@/components/PlayerStats.vue';
import PlayerTrend from '@/components/PlayerTrend.vue';
import Activity from '@/components/Activity.vue';
import ActivityService from '../services/ActivityService';
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
  mounted() {
    this.loading = true;
    try {
      Promise.all([
        PlayerService.fetchPlayer(this.playerId),
        ActivityService.fetchActivity(this.playerId),
      ]).then(([playerRes, activityRes]) => {
        this.player = playerRes;
        this.activity = activityRes;
      });
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
};
</script>
