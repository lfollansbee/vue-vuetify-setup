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
          <v-card-title class='justify-center'>Games</v-card-title>
          <v-card-text v-if="games.length" class='game-score text-center'>
            <p v-for="(game, index) in games" v-bind:key="index">{{game.player1}} - {{game.player2}}</p>
          </v-card-text>
        </v-card>
        <div>
          <v-btn
            large
            class="accent submit-game"
            @click="submitGame()"
          >Submit Game {{match ? match.games.length + 1 : 1}}</v-btn>
        </div>
        <!-- <div>
          <v-btn
            large
            class="success submit-match"
            @click="submitMatch()"
          >Submit Match</v-btn>
        </div> -->
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

export default {
  name: 'match',
  components: {
    CurrentPlayer,
  },
  data() {
    return {
      games: [
        {
          player1: 20,
          player2: 22,
        },
      ],
      match: undefined,
      matchId: this.$route.params.matchId,
      player1: undefined,
      player2: undefined,
      player1_games_won: 0,
      player2_games_won: 0,
      player1_score: 12,
      player2_score: 10,
    };
  },
  async mounted() {
    try {
      const response = await MatchService.fetchMatch(this.matchId);
      this.match = response;

      this.player1 = await PlayerService.fetchPlayer(response.player1_id);
      this.player2 = await PlayerService.fetchPlayer(response.player2_id);
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
