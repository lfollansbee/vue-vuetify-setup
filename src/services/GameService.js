import axios from 'axios';

export default {
  async submitGame(matchId, play1Score, play2Score) {
    const res = await axios.post(`/game/${matchId}`, {
      player1_score: play1Score,
      player2_score: play2Score,
    });
    return res.data.data;
  },
};
