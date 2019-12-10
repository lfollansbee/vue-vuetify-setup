import axios from 'axios';

export default {
  //  argument is optional
  async fetchActivity(id) {
    const urlParams = id ? `?player_id=${id}` : '';
    const res = await axios.get(`/activity${urlParams}`);

    return res.data.activity;
  },
};
