import axios from 'axios';

export default {
  async submitGame(matchId, play1Score, play2Score) {
    const res = await axios.post(`/game/${matchId}`, {
      player1_score: play1Score,
      player2_score: play2Score,
    });
    return res.data.data;
  },

  async fetchGamesByMatch(matchId) {
    const res = await axios.get(`/games/${matchId}`);
    return res.data;
  },

  async editGame(body, gameId) {
    const res = await axios.patch(`/game/${gameId}`, body);
    return res.data;
  },
};
