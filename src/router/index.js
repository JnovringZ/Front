import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: {
      name: 'home'
    }
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/nfts",
    name: "bond",
    component: () => import("../views/Bond.vue"),
  },
  {
    path: "/stake",
    name: "stake",
    component: () => import("../views/Stake.vue"),
  },

  {
    path: '*',
    redirect: {
      name: 'home'
    }
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default router;
