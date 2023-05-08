<style scoped>
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
</style>
<template>
  <div class="random-movie" v-if="randomMovie">
    <h2>Random Movie:</h2>
    <h3>{{ randomMovie.name }}</h3>
    <p>Genre: {{ randomMovie.genre }}</p>
    <p>Type: {{ randomMovie.type }}</p>
    <p>Viewed By: {{ randomMovie.viewed_by.join(", ") }}</p>
    <p>Average Rating: {{ randomMovie.average_rating }}</p>
    <button @click="markMovieAsWatched(randomMovie.id)" class="watched-button">
      Mark as Watched
    </button>
    <div class="rating-container">
      <label for="rating">Rate:</label>
      <select
        :value="randomMovie.rating"
        @change="rateMovie(randomMovie.id, $event.target.value)"
        >
        <option value="">Choose rating</option>
        <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import apiService from "@/services/apiService";

export default {
  props: {
    randomMovie: Object,
  },
  methods: {
    async markMovieAsWatched(movieId) {
      try {
        await apiService.markAsWatched(movieId);
        this.$emit("movieWatched");
        console.log(`Movie with ID ${movieId} marked as watched.`);
      } catch (error) {
        console.error("Error marking movie as watched:", error);
      }
    },
    async rateMovie(movieId) {
      try {
        const rating = this.randomMovie.rating;
        await apiService.rateMovie(rating, movieId);
        this.$emit("movieRated");
        console.log("Movie rated successfully");
      } catch (error) {
        console.error("Error rating movie:", error);
      }
    },
  },
};
</script>