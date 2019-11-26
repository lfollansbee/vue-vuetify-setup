<template>
  <v-container class='newMatch'>
    <v-row align='start' justify='center'>
      <h2>Match</h2>
    </v-row>
    <v-row>
      <v-col cols='12' lg='4'>

      </v-col>

      <v-col cols='12' lg='4'>
      </v-col>

      <v-col cols="12" lg="4">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import pingPongApi from '../services/PingPongApi';

export default {
  name: 'match',
  components: {},
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
  mounted() {},
};
</script>

<style>
</style>
