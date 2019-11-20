<template>
  <v-container class="home">
    <v-row align="start" justify="center">
      <v-col cols="12" sm="6">
        <Leaderboard msg="DGC Ping Pong" />
      </v-col>
      <v-col cols="12" sm="6">
        <Activity v-bind:playerLoading="false"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import Leaderboard from '@/components/Leaderboard.vue';
import Activity from '@/components/Activity.vue';

export default {
  name: 'home',
  components: {
    Leaderboard,
    Activity,
  },
};
</script>
