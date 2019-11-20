<template>
  <v-card outlined>
    <v-card-title class="justify-center">Statistics</v-card-title>
    <v-divider></v-divider>
    <v-spacer></v-spacer>
    <v-row no-gutters>
      <v-col class="text-center">
        <div>Match Wins</div>
        <div>{{this.player.matches_won}}</div>
      </v-col>
      <v-col class="text-center">
        <div>Match Losses</div>
        <div>{{this.matches_lost}}</div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'PlayerStats',
  props: { player: Object },
  computed: {
    matches_lost() {
      if (this.player && this.player.matches) {
        return this.player.matches.length - this.player.matches_won;
      }
      return null;
    },
  },
};
</script>

<style lang="scss">
</style>
