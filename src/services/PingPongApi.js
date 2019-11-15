/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import axios from 'axios';

export default {

  async fetchPlayerInfo() {
    const response = await axios.get('http://localhost:8080/ping-pong/players');

    return response.data.players.map((player) => {
      player.matches_lost = player.matches.length - player.matches_won;
      return player;
    });
  },

  async fetchPlayer(id) {
    const response = await axios.get(`player/${id}`);
    return response.data;
  },

  async fetchMatches() {
    const response = await axios.get('matches');
    return response.data;
  },
};
