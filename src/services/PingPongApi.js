import axios from 'axios';

export default {

  async fetchAllPlayers(sortField) {
    const urlParams = sortField ? `?sortField=${sortField}` : '';
    const response = await axios.get(`/players${urlParams}`);
    return response.data.players;
  },

  async fetchPlayer(id) {
    const playerResponse = await axios.get(`/player/${id}`);
    return playerResponse.data.player;
  },

  async fetchActivity(id, playerName) {
    const urlParams = id ? `?player_id=${id}` : '';
    const res = await axios.get(`/activity${urlParams}`);
    if (id) {
      return res.data.activity.map((match) => {
        const split = match.result.split(' ');
        const winner = split[0];
        return {
          date: match.date,
          result: match.result,
          won: winner === playerName,
        };
      });
    }
    return res.data.activity;
  },

  async createNewMatch() {
    const response = await axios.get('/matches');
    return response.data;
  },

  async registerNewPlayer(newPlayerName) {
    const response = await axios.post('/players', {
      name: newPlayerName,
    });
    return response.data.player;
  },
};
