import Vue from "vue";
import Vuex from "vuex";
import apiService from "@/services/apiService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [],
  },
  mutations: {
    SET_MOVIES(state, movies) {
      state.movies = movies;
    },
  },
  actions: {
    async fetchMovies({ commit }) {
      try {
        const response = await apiService.getMovies();
        commit("SET_MOVIES", response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    },
  },
});
