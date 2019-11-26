<template>
  <v-card outlined v-if="player">
    <v-card-title>{{player.name}}</v-card-title>
    <v-card-subtitle>Player {{playerNumber}}</v-card-subtitle>
    <v-divider></v-divider>
    <v-spacer></v-spacer>
    <v-card-text class="score text-center">{{score}}</v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CurrentPlayer',
  props: {
    player: Object,
    playerNumber: Number,
    score: Number,
  },
};
</script>

<style lang='scss'>
.score {
  // font-family: 'Do Hyeon', sans-serif;
  // font-family: 'Press Start 2P', cursive;
  font-family: 'Kelly Slab', cursive;
  line-height: 120%;
  font-size: 15vw;
}
</style>
