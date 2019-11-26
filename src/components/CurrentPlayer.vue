<template>
  <v-card outlined>
    <v-card-title v-if="selectedPlayer">{{selectedPlayer.name}}</v-card-title>
    <v-card-title v-else></v-card-title>
    <v-card-subtitle>Player {{playerNumber}}</v-card-subtitle>
    <v-divider></v-divider>
    <v-spacer></v-spacer>
    <v-card-text>
      <p>Select a player:</p>
      <span v-for="(player, index) in players" v-bind:key="index">
        <v-chip
          :input-value="selectedPlayer && selectedPlayer._id === player._id"
          color='success'
          filter
          @click="$emit('player-selected', player)"
          :disabled='opposingPlayer && opposingPlayer._id === player._id'
        >{{player.name}}</v-chip>
      </span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CurrentPlayer',
  props: {
    opposingPlayer: Object,
    players: Array,
    playerNumber: Number,
    selectedPlayer: Object,
  },
};
</script>

<style lang='scss'>
.v-chip {
  margin: 8px;
}
.v-card__title {
  height: 64px;
}
</style>
