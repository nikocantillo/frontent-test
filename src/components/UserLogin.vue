<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 5px;
  background-color: #f0f0f0;
}

h2 {
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
}

input {
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 3px;
  border: 1px solid #ccc;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #0056b3;
}
</style>
<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="submitForm">
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="email" />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import apiService from "@/services/apiService";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async submitForm() {
      try {
        const credentials = {
          email: this.email,
          password: this.password,
        };
        const response = await apiService.login(credentials);
        const token = response.data.access;
        localStorage.setItem("authToken", token);
        apiService.setAuthToken(token);
        console.log("Login successful:", response.data);
        this.$router.push({ name: "MovieList" });
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  },
};
</script>
