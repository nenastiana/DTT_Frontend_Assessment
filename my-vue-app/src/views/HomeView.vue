<template>
  <div class="allcontent">
    <div class="create-new-house">
      <h1>Houses</h1>
      <button @click="navigateToCreateNew" class="create-button">
        <img :src="IconPlus" class="icon" alt="IconPlus" />CREATE NEW
      </button>
      <img @click="navigateToCreateNew" :src="IconPlusGrey" class="icon-mobile" alt="IconPlus" />
    </div>
    <div class="search-sort-container">
      <SearchBar />
      <SortButtons />
    </div>
    <SearchResults />
    <HouseCard />
    <Modal />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import IconPlus from '../components/icons/ic_plus_white@3x.png';
import IconPlusGrey from '../components/icons/ic_plus_grey@3x.png';

import HouseCard from '../components/HouseCard.vue';
import Modal from '../components/ModalPopUp.vue';
import SearchBar from '../components/SearchBar.vue';
import SearchResults from '../components/SearchResults.vue';
import SortButtons from '../components/SortButtons.vue';

const router = useRouter();

const navigateToCreateNew = () => {
  router.push('/house/create');
};
</script>

<style scoped>
.allcontent {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
}

.create-new-house {
  display: flex;
  align-items: center;
  width: 1100px;
  justify-content: space-between;
  margin-top: 100px;
}

.create-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 220px;
  height: 45px;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  background-color: #eb5440;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
}

.icon {
  width: 17px;
  margin-right: 10px;
}

.icon-mobile {
  display: none;
  width: 20px;
  cursor: pointer;
}

.search-sort-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1100px;
}

@media only screen and (max-width: 768px) {
  .allcontent {
    padding: 20px 50px;
  }

  .card-container {
    margin-bottom: 50px;
  }

  .create-new-house {
    width: 100%;
    margin-top: 20px;
  }

  .create-new-house h1 {
    flex-grow: 1;
    text-align: center;
    font-size: 24px;
  }

  .create-button {
    display: none;
  }

  .icon-mobile {
    display: block;
  }

  .search-sort-container {
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
