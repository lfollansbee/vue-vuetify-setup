<template>
  <v-card outlined align="center">
    <v-card-title class="justify-center">Leaderboard</v-card-title>
    <v-divider></v-divider>

    <div v-if="loading">
      <img src="../assets/ping-pong.gif" />
    </div>

    <v-data-table :headers="headers" :items="players" :items-per-page="25" :fixed-header="true">
      <template v-slot:body="{ items }">
        <tbody>
          <tr v-for="player in items" :key="player._id">
            <td>
              <router-link :to="{ name: 'player', params: {playerId: player._id}}">
                {{player.name}}
                <span v-bind:class="{ 'warning--text': !player.active }" v-if="!player.active"> (INACTIVE)</span>
              </router-link>
            </td>
            <td align="center">{{player.matches_won}}</td>
            <td align="center">{{Math.max(0, player.matches.length - player.matches_won)}}</td>
            <td>{{player.last_played | moment("from", "now")}}</td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import PlayerService from '../services/PlayerService';

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
    PlayerService.fetchAllPlayers().then(
      (response) => {
        this.loading = false;
        this.players = response;
      },
      (error) => {
        console.error(error);
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
  td:nth-child(1) {
    color: #82B1ff;
  }
  td:nth-child(2) {
    color: #8bc34a;
  }
  td:nth-child(3) {
    color: #f44336;
  }
}
</style>
