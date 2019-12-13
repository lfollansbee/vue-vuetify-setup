<template>
  <v-card outlined v-if="player">
    <v-card-title>{{player.name}}</v-card-title>
    <v-card-subtitle>Player {{playerNumber}}</v-card-subtitle>
    <v-divider></v-divider>
    <v-spacer></v-spacer>
    <v-card-text class="score text-center">{{score}}</v-card-text>
    <v-card-actions>
      <v-btn med fab class="error" :disabled="score <= 0" @click="$emit('decrement-score')">-1</v-btn>
      <v-spacer></v-spacer>
      <v-btn med fab class="success" @click="$emit('increment-score')">+1</v-btn>
    </v-card-actions>
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
  font-family: 'Kelly Slab', cursive;
  line-height: 120%;
  font-size: 15vw;
}
</style>
