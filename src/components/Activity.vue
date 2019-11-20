<template>
  <v-card outlined align="center">
    <v-card-title class="justify-center">Activity</v-card-title>
    <v-divider></v-divider>

    <div v-if="this.playerActivity !== undefined">
      <div v-for="(item, index) in playerActivity" v-bind:key="index">
        <p
          v-if="item.won"
          class="success--text"
        >{{item.result}} ({{item.date | moment("from", "now")}})</p>
        <p v-else>{{item.result}} ({{item.date | moment("from", "now")}})</p>
      </div>
    </div>

    <div v-else>
      <div v-for="(item, index) in activity" v-bind:key="index">
        <p>{{item.result}} ({{item.date | moment("from", "now")}})</p>
      </div>
    </div>

  </v-card>
</template>

<script>
import pingPongApi from '../services/PingPongApi';

export default {
  name: 'Player',
  props: {
    playerActivity: Array,
    playerId: String,
  },
  data() {
    return {
      loading: false,
      activity: [],
    };
  },
  mounted() {
    this.loading = true;
    if (!this.playerActivity && !this.playerId) {
      pingPongApi.fetchActivity().then(
        (response) => {
          this.activity = response;
          this.loading = false;
        },
        (error) => {
          console.error(error);
          this.loading = false;
        }
      );
    }
  },
};
</script>

<style lang="scss">
</style>
