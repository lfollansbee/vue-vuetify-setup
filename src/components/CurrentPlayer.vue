<template>
  <v-card outlined>
    <!-- <v-card-title>{{player.name}}</v-card-title> -->
    <v-card-subtitle>Player {{playerNumber}}</v-card-subtitle>
    <v-divider></v-divider>
    <v-spacer></v-spacer>
    <v-card-text>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'CurrentPlayer',
  props: {
    playerNumber: Number,
  },
};
</script>

<style lang='scss'>
</style>
