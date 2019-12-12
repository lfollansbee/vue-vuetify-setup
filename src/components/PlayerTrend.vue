<template>
  <v-card v-if="streak.length" outlined width="100%">
    <v-card-title class="justify-center">Win/Loss Trend</v-card-title>
    <v-divider></v-divider>
    <v-sparkline
      :value="streak ? [0, ...streak] : []"
      :gradient="gradient"
      :smooth="radius || false"
      :padding="padding"
      line-width="2"
      stroke-linecap="round"
      gradient-direction="top"
      auto-draw
    ></v-sparkline>
  </v-card>
</template>

<script>
export default {
  name: 'PlayerTrend',
  props: {
    player: Object,
    playerActivity: Array,
  },
  data: () => ({
    radius: 10,
    padding: 8,
    gradient: ['#4CAF50', '#FFC107', '#FF5252'],
  }),
  computed: {
    streak() {
      const games = this.playerActivity.map(game => this.player._id === game.winner_id).reverse();
      let rate = 0;

      return games.map(game => {
        if (game) {
          rate++;
        } else {
          rate--;
        }
        return rate;
      });
    },
  },
};
</script>

<style lang="scss">
</style>
