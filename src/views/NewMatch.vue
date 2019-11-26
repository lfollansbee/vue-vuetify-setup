<template>
  <v-container class='newMatch'>
    <v-row align='start' justify='center'>
      <h2>Start a New Match</h2>
    </v-row>
    <v-row>
      <v-col cols='12' lg='4'>
        <CurrentPlayer
          v-bind:players="players"
          v-bind:playerNumber="1"
          v-bind:selectedPlayer="player1"
          v-on:player-selected="togglePlayerSelection($event, 'player1')"
          v-on:reset-selection="player1 = undefined"
        />
      </v-col>

      <v-col cols='12' lg='4' class='text-center'>
        <div>
          <v-btn
          x-large
          class='success'
          :disabled="!readyToPlay">
            START
          </v-btn>
        </div>
        <div>
          <v-btn large class='accent register' @click="openNewPlayerForm()">Register New Player</v-btn>
          <v-card outlined v-if="toggleForm">
            <v-card-text v-if="this.toggleForm">
              <v-form
                v-on:submit.prevent="onSubmit"
                ref='form'
                v-model="valid"
                lazy-validation>
                <v-text-field
                  v-model.trim="formName"
                  label='Name'
                  required>
                </v-text-field>
                <p class='error--text'>{{errMsg}}</p>
                <v-btn @click="submitName">Submit</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </div>
      </v-col>

      <v-col cols="12" lg="4">
        <CurrentPlayer
          v-bind:players="players"
          v-bind:playerNumber="2"
          v-bind:selectedPlayer="player2"
          v-on:player-selected="togglePlayerSelection($event, 'player2')"
          v-on:reset-selection="player2 = undefined"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CurrentPlayer from '@/components/CurrentPlayer.vue';
import pingPongApi from '../services/PingPongApi';

export default {
  name: 'newMatch',
  components: {
    CurrentPlayer,
  },
  data() {
    return {
      errMsg: '',
      formName: '',
      player1: undefined,
      player2: undefined,
      players: [],
      toggleForm: false,
      valid: true,
    };
  },
  computed: {
    readyToPlay() {
      return this.player1 && this.player2;
    },
  },
  mounted() {
    this.loading = true;
    pingPongApi.fetchAllPlayers('name').then(
      (response) => {
        this.loading = false;
        this.players = response;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  },
  methods: {
    togglePlayerSelection(player, whichPlayer) {
      if (this[whichPlayer] && player._id === this[whichPlayer]._id) {
        this[whichPlayer] = undefined;
      } else {
        this[whichPlayer] = player;
      }
    },
    openNewPlayerForm() {
      this.toggleForm = !this.toggleForm;
    },
    isNameUnique(name) {
      const { length } = this.players.filter(
        player => player.name === name.toUpperCase()
      );
      return length === 0;
    },
    async submitName() {
      if (!this.isNameUnique(this.formName) || !this.formName.length) {
        this.valid = false;
        this.errMsg = !this.formName.length
          ? 'Please enter a name'
          : 'This name is already registered. Please register with a unique name.';
      } else {
        this.valid = true;
        const newPlayer = await pingPongApi.registerNewPlayer(this.formName);
        this.players.push(newPlayer);
        this.activePlayer = newPlayer._id;
        this.selectedName = newPlayer.name;
        this.toggleForm = !this.toggleForm;
        this.formName = '';
      }
    },
  },
};
</script>

<style>
.register {
  margin: 5vh;
}
</style>
