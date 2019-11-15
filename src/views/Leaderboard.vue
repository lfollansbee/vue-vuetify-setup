<template>
  <v-container>
    <div class="leaderboard">
      <Leaderboard msg="DGC Ping Pong" />
    </div>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Leaderboard from '@/components/Leaderboard.vue';

export default {
  name: 'leaderboard',
  components: {
    Leaderboard,
  },
};
</script>
