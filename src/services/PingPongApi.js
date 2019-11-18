/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import axios from 'axios';

export default {

  async fetchPlayerInfo() {
    const response = await axios.get('/players');
    return response.data.players;
  },

  async fetchPlayer(id) {
    const playerResponse = await axios.get(`/player/${id}`);
    return playerResponse.data.player;
  },

  async fetchMatches() {
    const response = await axios.get('/matches');
    return response.data;
  },
};
