<template>
  <v-card outlined align="center">
    <v-card-title class="justify-center">Activity</v-card-title>
    <v-divider></v-divider>

    <v-expansion-panels :accordion="true" multiple focusable>
      <v-expansion-panel v-for="(match, index) in activity" v-bind:key="index">
        <v-expansion-panel-header
          v-bind:class="{ 'success--text': match.winner_id === playerId }"
        >{{match.result}} ({{match.date | moment("from", "now")}})</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col
              v-for="(game, index) in match.game_scores"
              v-bind:key="index"
              cols="12"
              sm="6"
              md="4"
              lg="4"
            >
              <v-card>
                <v-card-subtitle>Game {{index + 1}}</v-card-subtitle>
                <v-card-text>{{game.match_winner}}-{{game.match_loser}}</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import ActivityService from '../services/ActivityService';

export default {
  name: 'Activity',
  props: {
    playerActivity: Array,
    playerId: String,
  },
  data() {
    return {
      allActivity: [],
      loading: false,
    };
  },
  computed: {
    activity() {
      return this.playerActivity ? this.playerActivity : this.allActivity;
    },
  },
  mounted() {
    this.loading = true;
    if (!this.playerActivity && !this.playerId) {
      ActivityService.fetchActivity().then(
        response => {
          this.allActivity = response;
          this.loading = false;
        },
        error => {
          console.error(error);
          this.loading = false;
        }
      );
    }
  },
};
</script>

<style lang="scss">
</style>
