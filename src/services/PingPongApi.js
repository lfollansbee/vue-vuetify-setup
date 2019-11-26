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

  async createNewMatch(player1, player2) {
    const response = await axios.post('/matches', {
      player1_id: player1._id,
      player2_id: player2._id,
    });
    return response.data.match;
  },

  async fetchMatch(id) {
    const response = await axios.get(`/match/${id}`);
    return response.data.match;
  },

  async registerNewPlayer(newPlayerName) {
    const response = await axios.post('/players', {
      name: newPlayerName,
    });
    return response.data.player;
  },
};
