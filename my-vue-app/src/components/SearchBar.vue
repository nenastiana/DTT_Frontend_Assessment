<template>
  <div class="search-bar">
    <img :src="IconSearch" class="search-icon" alt="Search Icon" />
    <input type="text" v-model="searchQuery" placeholder="Search for a house" />
    <img v-if="searchQuery" :src="IconClear" class="clear-icon" alt="Clear Icon" @click="clearSearch" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import IconClear from './icons/ic_clear@3x.png';
import IconSearch from './icons/ic_search@3x.png';

const store = useStore();

const searchQuery = computed({
  get: () => store.getters['searchQuery'],
  set: (query) => store.dispatch('setSearchQuery', query)
});

const clearSearch = () => {
  searchQuery.value = '';
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  width: 400px;
  height: 20px;
  background-color: #e8e8e8;
  border-radius: 10px;
  padding: 10px 0;
  margin: 20px 0;
}

.search-bar input {
  border: none;
  background: none;
  outline: none;
  width: 100%;
  margin-left: 10px;
  font-size: 16px;
  color: #4a4b4c;
  font-family: 'Open Sans', sans-serif;
}

.search-icon {
  width: 15px;
  margin-left: 25px;
}

.clear-icon {
  width: 20px;
  height: 20px;
  margin-top: 20px;
  margin-right: 25px;
  position: relative;
}

@media only screen and (max-width: 768px) {
  .search-bar {
    width: 100%;
  }
}
</style>
