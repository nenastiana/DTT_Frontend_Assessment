<template>
  <div class="recommended-houses">
    <h2>Recommended for you:</h2>
    <div v-for="recommendedHouse in recommendedHouses" :key="recommendedHouse.id" class="card"
      @click="goToHouse(recommendedHouse.id)">
      <img class="recommended-house-image" :src="recommendedHouse.image" alt="House Image" />
      <div class="house-info">
        <h3>{{ recommendedHouse.location.street }} {{ recommendedHouse.location.houseNumber }}</h3>
        <div class="house-details">€ {{ recommendedHouse.price }}</div>
        <div class="house-zip">
          {{ recommendedHouse.location.zip }} {{ recommendedHouse.location.city }}
        </div>
        <div class="house-details">
          <div class="house-details">
            <img :src="IconBed" alt="Bed Icon" /> {{ recommendedHouse.rooms.bedrooms }}
          </div>
          <div class="house-details">
            <img :src="IconBath" alt="Bath Icon" /> {{ recommendedHouse.rooms.bathrooms }}
          </div>
          <div class="house-details">
            <img :src="IconSize" alt="Size Icon" /> {{ recommendedHouse.size }} m2
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

import IconBed from './icons/ic_bed@3x.png';
import IconBath from './icons/ic_bath@3x.png';
import IconSize from './icons/ic_size@3x.png';

const store = useStore();
const router = useRouter();
const housesData = computed(() => store.getters.housesData);

const getRecommendedHouses = () => {
  if (!housesData.value) {
    return [];
  }
  const houses = housesData.value.filter(house => !house.madeByMe).slice();
  const recommendedHouses = [];

  while (recommendedHouses.length < 3 && houses.length > 0) {
    const randomIndex = Math.floor(Math.random() * houses.length);
    recommendedHouses.push(houses.splice(randomIndex, 1)[0]);
  }

  return recommendedHouses;
};

const recommendedHouses = computed(() => getRecommendedHouses());

onMounted(async () => {
  await store.dispatch('fetchHousesData');
});

const goToHouse = (id) => {
  router.push(`/house/${id}`);
};

</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  border: none;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 20px;
  text-decoration: none;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  padding: 15px;
}

h2 {
  margin-top: 0;
  margin-bottom: 15px;
}

h3 {
  margin: 0;
}

.house-info {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  width: 80%;
  gap: 10px;
}

.house-info img {
  width: 20px;
  margin-right: 5px;
}

.house-details {
  display: flex;
  color: #4a4b4c;
  margin-right: 20px;
}

.house-zip {
  color: #a4a4a4;
}

.recommended-house-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
}
</style>
