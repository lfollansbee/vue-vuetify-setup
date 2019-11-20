<template>
  <v-container fluid>
    <v-row align="start" justify="center">
      <h2>{{player.name}}</h2>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-card outlined tile>
          <v-card-title class="justify-center">Statistics</v-card-title>
          <v-divider></v-divider>
          <v-row no-gutters>
            <v-col class="text-center">
              <div>Match Wins</div>
              <div>{{player.matches_won}}</div>
            </v-col>
            <v-col class="text-center">
              <div>Match Losses</div>
              <div>{{matches_lost}}</div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card outlined align="center" tile>
          <v-card-title class="justify-center">Activity</v-card-title>
          <v-divider></v-divider>

          <div v-for="(item, index) in activity" v-bind:key="index">
            <p
              v-if="item.won"
              class="success--text">
            {{item.result}} ({{item.date | moment("from", "now")}})</p>
            <p v-else>{{item.result}} ({{item.date | moment("from", "now")}})</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import pingPongApi from '../services/PingPongApi';

export default {
  name: 'Player',
  data() {
    return {
      loading: false,
      player: {},
      activity: [],
      markedActivity: [],
      matches_lost: null,
    };
  },
  mounted() {
    this.loading = true;
    pingPongApi.fetchPlayer(this.$route.params.playerId).then(
      (response) => {
        console.log(response);
        this.loading = false;
        this.player = response.player;
        this.activity = response.activity;
        this.matches_lost = response.player.matches.length - response.player.matches_won;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  },
};
</script>

<style lang="scss">
.date {
  margin: 20px 0 0 10px;
}
</style>
