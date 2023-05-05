import { createRouter, createWebHistory } from "vue-router";
import MovieList from "../components/MovieList.vue";
import UserLogin from "../components/UserLogin.vue";

const routes = [
  {
    path: "/list",
    name: "MovieList",
    component: MovieList,
  },
  {
    path: "/login",
    name: "UserLogin",
    component: UserLogin,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
