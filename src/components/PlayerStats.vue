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

      <v-dialog v-model="deactivateDialog" width="50%" light>
        <template v-slot:activator="{ on }">
          <v-btn large class="warning" v-on="on">Deactivate Player</v-btn>
        </template>

        <v-card>
          <v-card-title>Are you sure you want to deactivate this player? Once inactive, a player's status cannot change.</v-card-title>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="error" @click="deactivateDialog = false">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="deactivatePlayer()">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-card-actions>
  </v-card>
</template>

<script>
import PlayerService from '../services/PlayerService';

export default {
  name: 'PlayerStats',
  props: { player: Object },
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
