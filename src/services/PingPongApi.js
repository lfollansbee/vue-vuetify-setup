import axios from 'axios';

export default {

  async fetchPlayerInfo() {
    const response = await axios.get('/players');
    return response.data.players;
  },

  async fetchPlayer(id) {
    const playerResponse = await axios.get(`/player/${id}`);
    const activityResponse = await axios.get(`/activity?player_id=${id}`);

    const activity = activityResponse.data.activity.map((match) => {
      const split = match.result.split(' ');
      const winner = split[0];
      return {
        date: match.date,
        result: match.result,
        won: winner === playerResponse.data.player.name,
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
