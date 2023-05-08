<template>
  <div class="pagination">
    <button
      :disabled="currentPage === 1"
      @click="goToPage(currentPage - 1)"
    >
      Anterior
    </button>
    <button
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      :class="{ active: pageNumber === currentPage }"
      @click="goToPage(pageNumber)"
    >
      {{ pageNumber }}
    </button>
    <button
      :disabled="currentPage === totalPages"
      @click="goToPage(currentPage + 1)"
    >
      Siguiente
    </button>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
  },
  methods: {
    goToPage(pageNumber) {
      this.$emit("updatePage", pageNumber);
    },
  },
};
</script>


<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border: none;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2a9d8f;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button.active {
  background-color: #2a9d8f;
}
</style>
