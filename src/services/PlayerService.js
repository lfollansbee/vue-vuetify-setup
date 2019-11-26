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

  async registerNewPlayer(newPlayerName) {
    const response = await axios.post('/players', {
      name: newPlayerName,
    });
    return response.data.player;
  },
};
