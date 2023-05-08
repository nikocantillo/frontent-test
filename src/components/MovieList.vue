<style scoped>
.search-container select {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #fff;
  appearance: none;
  cursor: pointer;
}

.search-container select:focus {
  outline: none;
  border-color: #42b983;
}
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.search-container input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-right: 10px;
}

.search-container button {
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-container button:hover {
  background-color: #2a9d8f;
}
.movies-container {
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
}
.watched-button {
  background-color: #2a9d8f;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
  transition-duration: 0.4s;
}

.watched-button:hover {
  background-color: #45a049;
  color: white;
}

.rating-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-size: 16px;
}

.rating-container label {
  margin-right: 10px;
}

.rating-container select {
  width: 100px;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  padding: 2px 4px;
  outline: none;
}

.rating-container select:focus {
  border-color: #007bff;
  box-shadow: 0 0 4px rgba(0, 123, 255, 0.25);
}

.movie-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.movie-card {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
}

h1 {
  margin-bottom: 2rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
}

li:last-child {
  border-bottom: none;
}

h3 {
  margin-bottom: 0.5rem;
}

p {
  margin: 0.5rem 0;
}

p:last-child {
  margin-bottom: 0;
}
</style>
<template>
  <div class="movies-container">
    <h1>Movies and Series</h1>
    <div class="search-container">
      <input type="text" v-model="searchQuery" placeholder="Search movies" />
      <button @click="()=>searchMovies()">Search</button>
      <select v-model="orderBy" @change="()=>searchMovies()">
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="genre">Genre</option>
        <option value="type">Type</option>
      </select>
      <button @click="getRandomMovie">Random Movie</button>
    </div>
    <show-random-movie
      v-if="showRandomMovie"
      :random-movie="randomMovie"
      @movieWatched="()=>searchMovies()"
      @movieRated="()=>searchMovies()"
    ></show-random-movie>
    <div class="movie-grid" v-else>
      <div class="movie-card" v-for="movie in movies" :key="movie.id">
        <h3>{{ movie.name }}</h3>
        <p>Genre: {{ movie.genre }}</p>
        <p>Type: {{ movie.type }}</p>
        <p>Viewed By: {{ movie.viewed_by.join(", ") }}</p>
        <p>Average Rating: {{ movie.average_rating }}</p>
        <button @click="markMovieAsWatched(movie.id)" class="watched-button">
          Mark as Watched
        </button>
        <div class="rating-container">
          <label for="rating">Rate:</label>
          <select
            v-model="movie.rating"
            @change="rateMovie(movie.id, movie.rating)"
          >
            <option value="">Choose rating</option>
            <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
      </div>
    </div>
    <PagiNation
      :total-pages="totalPages"
      :current-page="currentPage"
      @updatePage="(v)=>searchMovies(v)"
    ></PagiNation>
  </div>
</template>

<script>
import ShowRandomMovie from "./ShowRandomMovie.vue";
import PagiNation from "./PagiNation.vue";
import apiService from "@/services/apiService";

export default {
  components: {
    ShowRandomMovie,
    PagiNation,
  },
  data() {
    return {
      searchQuery: "",
      orderBy: "",
      showRandomMovie: false,
      randomMovie: null,
      movies: [],
      currentPage: 1,
      totalPages: 1,
      pageSize: 3,
    };
  },
  methods: {
    async searchMovies(page = 1) {
      this.showRandomMovie = false;
      this.currentPage = page;
      try {
        const response = await apiService.getMovies(
          this.searchQuery,
          this.orderBy,
          this.currentPage
        );
        this.movies = response.data.results;
        this.totalPages = response.data.total_pages;
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    },
    async getRandomMovie() {
      try {
        const response = await apiService.getRandomMovie();
        this.randomMovie = response.data;
        this.showRandomMovie = true;
      } catch (error) {
        console.error("Error fetching random movie:", error);
      }
    },
    async markMovieAsWatched(movieId) {
      try {
        await apiService.markAsWatched(movieId);
        this.searchMovies();
        console.log(`Movie with ID ${movieId} marked as watched.`);
      } catch (error) {
        console.error("Error marking movie as watched:", error);
      }
    },
    async rateMovie(movieId, rating) {
      try {
        await apiService.rateMovie(rating, movieId);
        this.searchMovies();
        console.log("Movie rated successfully");
      } catch (error) {
        console.error("Error rating movie:", error);
      }
    },
    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      this.searchMovies(this.currentPage);
    },
  },
};
</script>
