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
          <v-card-text v-if="games.length" class="text-center">
            <div v-if="!editingGames">
              <p
                v-for="(game, index) in games"
                v-bind:key="index"
                class="game-score"
              >{{game.player1_score}} - {{game.player2_score}}</p>

              <v-btn class="mx-2" fab small color="accent" @click="editingGames=true">
                <v-icon dark>mdi-pencil</v-icon>
              </v-btn>
            </div>

            <div v-else class="editGames">
              <v-row v-for="game in games" v-bind:key="game._id" justify="center">
                <v-text-field
                  v-model="formFields[game._id].player1_score"
                  single-line
                  outlined
                  dense
                  hide-details
                ></v-text-field>

                <span>-</span>

                <v-text-field
                  v-model="formFields[game._id].player2_score"
                  single-line
                  outlined
                  dense
                  hide-details
                ></v-text-field>
              </v-row>
              <p v-if="errors.updateGameErr" class="error--text">{{errors.updateGameErr}}</p>

              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" class="mx-2" fab small @click="editingGames=false">
                    <v-icon dark>mdi-cancel</v-icon>
                  </v-btn>
                </template>
                <span>Cancel</span>
              </v-tooltip>

              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" class="mx-2" fab small color="error" @click="updateGame()">
                    <v-icon dark>mdi-content-save</v-icon>
                  </v-btn>
                </template>
                <span>Save</span>
              </v-tooltip>
            </div>
          </v-card-text>
        </v-card>
        <div>
          <p v-if="errors.submitGameErr" class="error--text">{{errors.submitGameErr}}</p>
          <v-btn
            large
            :disabled="matchCompleted || (player1_score === 0 && player2_score === 0)"
            class="accent submit-game"
            @click="submitGame()"
          >Submit Game {{match ? games.length + 1 : 1}}</v-btn>
        </div>

        <div>
          <DialogBox
            dialogText="Do you want to submit the current game as part of this match?"
            v-bind:confirmCallback="() => submitMatch(true)"
            v-bind:denyCallback="() => submitMatch(false)"
            v-bind:enableDeny="true"
            v-bind:errorText="errors.submitMatchErr"
            v-model="submitMatchDialog"
          />
          <!-- If there is a current game that has not been submitted, show dialog box, else just submit match -->
          <v-btn
            v-if="player1_score !== 0 || player2_score !== 0"
            large
            :disabled="matchCompleted"
            class="success"
            @click="submitMatchDialog = true"
          >Submit Match</v-btn>

          <v-btn
            v-else
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
                <v-btn large color="success">View Leaderboard</v-btn>
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
      errors: {
        submitGameErr: '',
        submitMatchErr: '',
        updateGameErr: '',
      },
      formFields: {},
      games: [],
      editingGames: false,
      loading: false,
      match: undefined,
      matchCompleted: false,
      matchId: this.$route.params.matchId,
      matchMessage: undefined,
      player1: undefined,
      player2: undefined,
      player1_score: 21,
      player2_score: 15,
      player1_games_won: 0,
      player2_games_won: 0,
      matchSubmittedDialog: false,
      submitMatchDialog: false,
    };
  },
  watch: {
    submitMatchDialog() {
      this.errors.submitMatchErr = '';
    },
  },
  mounted() {
    this.loading = true;
    try {
      Promise.all([
        MatchService.fetchMatch(this.matchId),
        GameService.fetchGamesByMatch(this.matchId),
      ]).then(responses => {
        this.match = responses[0];

        this.setGamesWon(
          this.match.player1_games_won,
          this.match.player2_games_won
        );
        this.setFormFields(responses[1]);

        Promise.all([
          PlayerService.fetchPlayer(responses[0].player1_id),
          PlayerService.fetchPlayer(responses[0].player2_id),
        ]).then(players => {
          this.player1 = players[0];
          this.player2 = players[1];
        });
      });
    } catch (err) {
      console.error(err);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    setFormFields(response) {
      if (response) this.games = response.games;

      for (let i = 0; i < this.games.length; i++) {
        const game = this.games[i];

        this.formFields[game._id] = {
          player1_score: undefined,
          player2_score: undefined,
        };
        this.formFields[game._id].player1_score = game.player1_score;
        this.formFields[game._id].player2_score = game.player2_score;
      }
    },
    setGamesWon(player1, player2) {
      this.player1_games_won = player1;
      this.player2_games_won = player2;
    },
    updateGame() {
      let updateGamePromises = [];
      const formFieldIds = Object.keys(this.formFields);

      updateGamePromises = formFieldIds
        .filter(
          id => this.formFields[id].player1_score !== this.player1_score
            || this.formFields[id].player2_score !== this.player2_score
        )
        .map(changedGameId => {
          const body = {
            player1_id: this.player1._id,
            player2_id: this.player2._id,
            player1_score: Number(this.formFields[changedGameId].player1_score),
            player2_score: Number(this.formFields[changedGameId].player2_score),
          };
          return GameService.editGame(body, changedGameId);
        });

      try {
        Promise.all(updateGamePromises).then(responses => {
          responses.forEach(res => {
            this.setGamesWon(res.player1_games_won, res.player2_games_won);
          });
          GameService.fetchGamesByMatch(this.matchId).then(allGames => {
            this.setFormFields(allGames);
            this.editingGames = false;
          });
        });
      } catch (err) {
        console.error(err);
        this.errors.updateGameErr = 'Encountered an error when updating game scores.';
      }
    },
    async submitGame() {
      try {
        const res = await GameService.submitGame(
          this.matchId,
          this.player1_score,
          this.player2_score
        );

        this.games.push({
          player1_score: res.game.player1_score,
          player2_score: res.game.player2_score,
          _id: res.game._id,
        });

        this.setFormFields();
        this.setGamesWon(res.player1_games_won, res.player2_games_won);

        this.player1_score = 0;
        this.player2_score = 0;
      } catch (err) {
        this.errors.submitGameErr = err;
      }
    },
    async submitMatch(submitGame = false) {
      // if game hasn't been submitted, then submit game first
      if (submitGame) {
        await this.submitGame();
      }
      try {
        const res = await MatchService.endMatch(this.matchId);
        this.submitMatchDialog = false;

        this.setGamesWon(
          res.match.player1_games_won,
          res.match.player2_games_won
        );

        this.matchCompleted = true;
        this.matchMessage = res.match.activity;
        this.matchSubmittedDialog = true;
      } catch (err) {
        this.submitMatchDialog = true;
        if (err.response.status === 405) {
          this.errors.submitMatchErr = err.response.data.message;
        } else {
          this.errors.submitMatchErr = 'Error submitting match';
        }
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
.editGames {
  .row {
    font-family: 'Kelly Slab', cursive;
    line-height: 110%;
    font-size: 1.5vw;
    > span {
      margin: 8px;
    }
    .v-input {
      max-width: 20%;
      input {
        text-align: center;
      }
    }
  }
  .error--text {
    font-size: medium;
  }
}
</style>
