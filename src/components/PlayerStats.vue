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
    <v-card-actions class="justify-center">
      <v-btn large class="warning" @click="deactivateDialog = true">Deactivate Player</v-btn>
      <DialogBox
        dialogText="Are you sure you want to deactivate this player? Once inactive, a player's status cannot change."
        v-bind:confirmCallback="() => deactivatePlayer()"
        v-bind:enableDeny="false"
        v-model="deactivateDialog"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import PlayerService from '../services/PlayerService';
import DialogBox from '@/components/DialogBox.vue';

export default {
  name: 'PlayerStats',
  props: { player: Object },
  components: {
    DialogBox,
  },
  data() {
    return {
      deactivateDialog: false,
    };
  },
  computed: {
    matches_lost() {
      if (this.player && this.player.matches) {
        // if matches lost < 0, returns 0
        return Math.max(0, this.player.matches.length - this.player.matches_won);
      }
      return null;
    },
  },
  methods: {
    async deactivatePlayer() {
      this.deactivateDialog = false;
      try {
        await PlayerService.deactivatePlayer(this.player._id);
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style lang="scss">
</style>
