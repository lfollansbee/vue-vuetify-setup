<template>
  <v-container fluid>
    <v-row align="start" justify="center">
      <h2>{{player.name}}</h2>
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
    };
  },
  mounted() {
    this.loading = true;
    pingPongApi.fetchPlayer(this.$route.params.playerId).then(
      (response) => {
        this.loading = false;
        this.player = response;
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
img {
  border-radius: 50%;
  width: 15%;
}
table > tbody > tr {
  td:nth-child(2) {
    color: #8bc34a;
  }
  td:nth-child(3) {
    color: #f44336;
  }
}
</style>
