import axios from 'axios';

export default {
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
};
