/* eslint-disable arrow-body-style */
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
    const activityResponse = await axios.get(`/activity?player_id=${id}`);

    // eslint-disable-next-line arrow-parens
    const activity = activityResponse.data.activity.map(match => {
      const split = match.split(' ');
      const winner = split[0];

      return {
        won: winner === playerResponse.data.player.name,
        activity: match,
      };
    });

    return {
      player: playerResponse.data.player,
      activity,
    };
  },

  async fetchMatches() {
    const response = await axios.get('/matches');
    return response.data;
  },
};
