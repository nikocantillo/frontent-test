import axios from "axios";

const API_URL = "http://localhost:8000/";

function getAuthToken() {
  return localStorage.getItem("authToken");
}

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: getAuthToken() ? `Bearer ${getAuthToken()}` : "",
  },
});

function setAuthToken(token) {
  apiClient.defaults.headers.Authorization = `Bearer ${token}`;
}

export default {
  setAuthToken,
  login(credentials) {
    return apiClient.post("auth/login/", credentials);
  },
  getMovies(query = "", orderBy = "", page = 1, pageSize = 3) {
    const params = new URLSearchParams();
    let url = "movies_series/list/list_filtered/";
    if (query) {
      params.append("search", query);
    }
    if (orderBy) {
      params.append("order_by", orderBy);
    }
    params.append("page", page);
    params.append("page_size", pageSize);
    if (params.toString()) {
      url += "?" + params.toString();
    }
    return apiClient.get(url);
  },
  getRandomMovie() {
    return apiClient.get("movies_series/random/random_movie/");
  },
  markAsWatched(movieId) {
    return apiClient.put(`movies_series/movies_watched/${movieId}/`);
  },
  rateMovie(rating, movieId) {
    const payload = {
      rating: rating,
      movie_id: movieId,
    };
    return apiClient.post("movies_series/movies_rate/", payload);
  },
};





