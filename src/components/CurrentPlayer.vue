<template>
  <v-card outlined>
    <v-card-title>{{this.selectedName}}</v-card-title>
    <v-card-subtitle>Player 1</v-card-subtitle>
    <v-divider></v-divider>
    <v-spacer></v-spacer>
    <v-card-text>
      <p>Select a player:</p>
      <span v-for="(player, _id) in players" v-bind:key="_id">
        <v-chip
          :input-value="activePlayer === _id"
          color="success"
          filter
          @click="selectPlayer(_id, player.name)"
        >{{player.name}}</v-chip>
      </span>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn text @click="openNewPlayerForm()">
        Register New Player
      </v-btn>
    </v-card-actions>
    <v-divider></v-divider>
    <v-card-text v-if="this.toggleForm">
      <v-form
        v-on:submit.prevent="onSubmit"
        ref="form"
        v-model="valid"
        lazy-validation>
        <v-text-field
            v-model.trim="formName"
            label="Name"
            required>
        </v-text-field>
        <p class="error--text">{{errMsg}}</p>
        <v-btn @click="onSubmit">Go</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import pingPongApi from '../services/PingPongApi';

export default {
  name: 'CurrentPlayer',
  props: { players: Array },
  data: () => ({
    activePlayer: '',
    errMsg: '',
    formName: '',
    nameIsTaken: false,
    selectedName: '',
    toggleForm: false,
    valid: true,
  }),
  methods: {
    selectPlayer(playerId, name) {
      this.activePlayer = playerId;
      this.selectedName = name;
    },
    openNewPlayerForm() {
      this.toggleForm = !this.toggleForm;
    },
    isNameUnique(name) {
      const { length } = this.players.filter(player => player.name === name.toUpperCase());
      return length === 0;
    },
    async onSubmit() {
      if (!this.isNameUnique(this.formName) || !this.formName.length) {
        this.valid = false;
        this.errMsg = !this.formName.length ? 'Please enter a name' : 'This name is already registered. Please register with a unique name.';
      } else {
        this.valid = true;
        const newPlayer = await pingPongApi.registerNewPlayer(this.formName);
        this.players.push(newPlayer);
        this.activePlayer = newPlayer._id;
        this.selectedName = newPlayer.name;
        this.toggleForm = !this.toggleForm;
      }
    },
  },
};
</script>

<style lang="scss">
.v-chip {
  margin: 8px;
}
</style>
