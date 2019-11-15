import Vue from 'vue';
import VueRouter from 'vue-router';
import Leaderboard from '../views/Leaderboard.vue';
import NewMatch from '../views/NewMatch.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/leaderboard',
    name: 'LeaderBoard',
    component: Leaderboard,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/new-match',
    name: 'NewMatch',
    component: NewMatch,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
