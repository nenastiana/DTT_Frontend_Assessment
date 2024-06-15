<!-- This component displays search results based on a search query. 
It shows the number of results or a message with an empty search. -->

<template>
  <h3 class="results-count" v-if="searchQuery && resultsCount > 0">
    {{ resultsCount }} results found
  </h3>
  <div v-else-if="searchQuery && resultsCount === 0" class="empty-search-container">
    <img :src="ImageEmptySearch" alt="Empty Search" />
    <p>No results found.</p>
    <p>Please try another keyword.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import ImageEmptySearch from '../assets/img_empty_houses@3x.png';

const store = useStore();

const searchQuery = computed(() => store.getters.searchQuery);
const resultsCount = computed(() => store.getters.resultsCount);
</script>

<style scoped>
.empty-search-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.empty-search-container p {
  margin-top: 0;
}

.empty-search-container img {
  width: 400px;
  margin: 50px;
}

.results-count {
  display: flex;
  justify-content: left;
  width: 1100px;
}

@media only screen and (max-width: 768px) {

  .empty-search-container img {
    width: 300px;
    margin: 50px;
  }

  .empty-search-container p {
    font-size: 14px;
  }

}
</style>
