import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Player from '../views/Player.vue';
import NewMatch from '../views/NewMatch.vue';

Vue.use(VueRouter);

const routes = [
  {
    component: Home,
    name: 'home',
    path: '/',
  },
  {
    component: Player,
    name: 'player',
    path: '/player/:playerId',
    props: true,
  },
  {
    component: NewMatch,
    name: 'newMatch',
    path: '/new-match',
    props: true,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
