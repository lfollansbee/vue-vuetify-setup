<template>
  <v-card outlined width="100%">
    <v-card-title class="justify-center">Win:Loss Ratio Trend</v-card-title>
    <v-divider></v-divider>
    <v-sparkline
      :value="myValues ? myValues : []"
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
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['#4CAF50', '#FFC107', '#FF5252'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
];

export default {
  name: 'PlayerTrend',
  props: { playerActivity: Array },
  data: () => ({
    radius: 10,
    padding: 8,
    gradient: gradients[3],
    gradients,
  }),
  computed: {
    myValues() {
      const games = this.playerActivity.map(game => game.won).reverse();

      let victories = 0;
      let losses = 0;
      return games.map((game) => {
        game ? victories++ : losses++;
        return victories / losses;
      });
    },
  },
};
</script>

<style lang="scss">
</style>
