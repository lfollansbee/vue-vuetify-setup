<template>
  <v-container>
    <div class="player">
      <Player msg="DGC Ping Pong"/>
    </div>
  </v-container>
</template>

<script>
import Player from '@/components/Player.vue';

export default {
  name: 'player',
  components: {
    Player,
  },
};
</script>
