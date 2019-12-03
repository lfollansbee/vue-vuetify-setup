<template>
  <v-card outlined width="100%">
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
    rates() {
      const games = this.playerActivity.map(game => game.won).reverse();
      let victories = 0;
      return games.map((game, index) => {
        if (game) {
          victories++;
        }
        return victories / (index + 1);
      });
    },
    streak() {
      const games = this.playerActivity.map(game => game.won).reverse();
      let rate = 0;

      return games.map((game, index) => {
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
