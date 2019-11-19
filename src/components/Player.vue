<template>
  <v-container fluid>
    <v-row align="start" justify="center">
      <h2>{{player.name}}</h2>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6">
        <v-card outlined align="center" tile>
          <h4>Statistics</h4>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <v-card outlined align="center" tile>
          <h4>Activity</h4>
          <div v-for="(item, index) in activity" v-bind:key="index">
            <p v-if="item.won" class="success">{{item.activity}}</p>
            <p v-else>{{item.activity}}</p>
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
    };
  },
  mounted() {
    this.loading = true;
    pingPongApi.fetchPlayer(this.$route.params.playerId).then(
      (response) => {
        this.loading = false;
        this.player = response.player;
        this.activity = response.activity;
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
</style>
