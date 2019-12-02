<template>
  <v-container class="newMatch">
    <v-row>
      <v-col cols="12" lg="4">
        <CurrentPlayer
          v-bind:playerNumber="1"
          v-bind:player="player1"
          v-bind:score="player1_score"
        />
      </v-col>

      <v-col cols="12" lg="4" class="text-center">
        <v-card outlined>
          <v-card-title class="justify-center">Match Score</v-card-title>
          <v-card-subtitle v-if="match">Best of {{match.best_of}}</v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text class="match-score text-center">{{player1_games_won}} - {{player2_games_won}}</v-card-text>
          <v-divider></v-divider>

          <v-card-title v-if="games.length" class="justify-center">Games</v-card-title>
          <v-card-text v-if="games.length" class="game-score text-center">
            <p v-for="(game, index) in games" v-bind:key="index">{{game.player1}} - {{game.player2}}</p>
          </v-card-text>
        </v-card>
        <div>
          <v-btn
            large
            :disabled="matchCompleted || (player1_score === 0 && player2_score === 0)"
            class="accent submit-game"
            @click="submitGame()"
          >Submit Game {{match ? games.length + 1 : 1}}</v-btn>
        </div>

        <div>
          <!-- If there is a current game that has not been submitted, show dialog box, else just submit match -->
          <DialogBox
            v-if="this.player1_score !== 0 || this.player2_score !== 0"
            buttonText="Submit Match"
            dialogText="Do you want to submit the current game as part of this match?"
            v-bind:disableButton="matchCompleted"
            v-bind:denyCallback="() => submitMatch(false)"
            v-bind:confirmCallback="() => submitMatch(true)"
            v-bind:dialog="submitMatchDialog"
          />

          <v-btn
            v-if="this.player1_score === 0 && this.player2_score === 0"
            large
            :disabled="matchCompleted"
            class="success submit-match"
            @click="submitMatch()"
          >Submit Match</v-btn>
        </div>

        <v-dialog v-model="matchSubmittedDialog" persistent light width="40%">
          <v-card>
            <v-card-title class="justify-center">Match Submitted Successfully!</v-card-title>
            <v-card-text class="text-center">{{matchMessage}}</v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="justify-center">
              <router-link to="/">
                <v-btn large color="success" >View Leaderboard</v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>

      <v-col cols="12" lg="4">
        <CurrentPlayer
          v-bind:playerNumber="2"
          v-bind:player="player2"
          v-bind:score="player2_score"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GameService from '../services/GameService';
import MatchService from '../services/MatchService';
import PlayerService from '../services/PlayerService';
import CurrentPlayer from '@/components/CurrentPlayer.vue';
import DialogBox from '@/components/DialogBox.vue';

export default {
  name: 'match',
  components: {
    CurrentPlayer,
    DialogBox,
  },
  data() {
    return {
      games: [],
      match: undefined,
      matchCompleted: false,
      matchId: this.$route.params.matchId,
      matchMessage: undefined,
      player1: undefined,
      player2: undefined,
      player1_games_won: 0,
      player1_score: 21,
      player2_score: 15,
      player2_games_won: 0,
      matchSubmittedDialog: false,
      submitMatchDialog: false,
    };
  },
  async mounted() {
    try {
      const res = await MatchService.fetchMatch(this.matchId);
      this.match = res;

      this.player1_games_won = this.match.player1_games_won;
      this.player2_games_won = this.match.player2_games_won;

      this.player1 = await PlayerService.fetchPlayer(res.player1_id);
      this.player2 = await PlayerService.fetchPlayer(res.player2_id);
    } catch (err) {
      console.error(err);
    }
  },
  methods: {
    async submitGame() {
      try {
        const res = await GameService.submitGame(
          this.matchId,
          this.player1_score,
          this.player2_score
        );

        this.games.push({
          player1: this.player1_score,
          player2: this.player2_score,
        });
        this.player1_games_won = res.player1_games_won;
        this.player2_games_won = res.player2_games_won;
        this.player1_score = 0;
        this.player2_score = 0;
      } catch (err) {
        console.error(err);
      }
    },
    async submitMatch(submitGame = false) {
      this.submitMatchDialog = false;
      // if game hasn't been submitted, then submit game first
      if (submitGame) {
        await this.submitGame();
      }
      try {
        const res = await MatchService.endMatch(this.matchId);

        this.player1_games_won = res.match.player1_games_won;
        this.player2_games_won = res.match.player2_games_won;

        this.matchCompleted = true;
        this.matchMessage = res.match.activity;
        this.matchSubmittedDialog = true;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>

<style lang="scss">
.submit-game {
  margin: 2vh 0 2vh 0;
}
.match-score {
  font-family: 'Kelly Slab', cursive;
  line-height: 75%;
  font-size: 5vw;
}
.game-score {
  font-family: 'Kelly Slab', cursive;
  line-height: 110%;
  font-size: 1.5vw;
  p {
    margin: 0;
  }
}
</style>
