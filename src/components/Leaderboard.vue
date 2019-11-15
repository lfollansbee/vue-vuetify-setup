<template>
  <v-container fluid>
    <v-row align="start" justify="center">
      <h2>Leaderboard</h2>
    </v-row>

    <v-row align="start" justify="center">
      <div v-if="loading">
        <img src="../assets/ping-pong.gif" />
      </div>

      <v-data-table :headers="headers" :items="players" :items-per-page="25" :fixed-header="true">
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item._id">
              <td>{{item.name}}</td>
              <td align="center">{{item.matches_won}}</td>
              <td align="center">{{item.matches.length - item.matches_won}}</td>
              <td>Today</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import pingPongApi from '../services/PingPongApi';

export default {
  name: 'Leaderboard',
  data() {
    return {
      headers: [
        {
          text: 'Name',
          align: 'start',
          sortable: false,
        },
        {
          text: 'Matches Won',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Matches Lost',
          align: 'center',
          sortable: false,
        },
        {
          text: 'Last Played',
          align: 'start',
          sortable: false,
        },
      ],
      players: [],
      loading: false,
    };
  },
  mounted() {
    this.loading = true;
    pingPongApi.fetchPlayerInfo().then(
      (response) => {
        this.loading = false;
        this.players = response;
      },
      (error) => {
        this.loading = false;
      }
    );
  },
};
</script>

<style lang="scss">
img {
  border-radius: 50%;
  width: 15%;
}
table > tbody > tr {
  td:nth-child(2) {
    color: #8bc34a;
  }
  td:nth-child(3) {
    color: #F44336;
  }
}
</style>
