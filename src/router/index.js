import Vue from 'vue';
import VueRouter from 'vue-router';
import Leaderboard from '../views/Leaderboard.vue';
import Player from '../views/Player.vue';

Vue.use(VueRouter);

const routes = [
  {
    component: Leaderboard,
    name: 'leaderBoard',
    path: '/',
  },
  {
    component: Player,
    name: 'player',
    path: '/player/:playerId',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
