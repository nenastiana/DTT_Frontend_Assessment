<template>
  <div class="card-container">
    <div v-for="house in filteredHouses" :key="house.id" class="card" @click="navigateToHouse(house.id)">
      <img class="house-image" :src="house.image" alt="House Image" />
      <div class="house-info">
        <div class="actions-container">
          <h2 class="house-location">{{ house.location.street }} {{ house.location.houseNumber }}</h2>
          <div class="actions-icon">
            <img :src="isFavorite(house.id) ? IconLike : IconUnlike" alt="Favorite Icon" class="like-icon"
              @click.stop="toggleFavorite(house.id)" />
              <img :src="IconEdit" alt="Edit" class="edit-icon" @click.stop="navigateToEdit(house.id)" v-if="house.madeByMe"/>
              <img :src="IconDelete" alt="Delete" class="delete-icon" @click.stop="openModal(house.id)" v-if="house.madeByMe"/>
          </div>
        </div>
        <div class="house-details">€ {{ house.price }}</div>
        <div class="house-zip">{{ house.location.zip }} {{ house.location.city }}</div>
        <div class="house-details">
          <div class="house-details">
            <img :src="IconBed" alt="Bed Icon" /> {{ house.rooms.bedrooms }}
          </div>
          <div class="house-details">
            <img :src="IconBath" alt="Bath Icon" /> {{ house.rooms.bathrooms }}
          </div>
          <div class="house-details">
            <img :src="IconSize" alt="Size Icon" /> {{ house.size }} m2
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

import IconBath from './icons/ic_bath@3x.png';
import IconBed from './icons/ic_bed@3x.png';
import IconDelete from './icons/ic_delete@3x.png';
import IconEdit from './icons/ic_edit@3x.png';
import IconLike from './icons/ic_like.png';
import IconSize from './icons/ic_size@3x.png';
import IconUnlike from './icons/ic_unlike.png';

const store = useStore();
const router = useRouter();

const props = defineProps({
  madeByMeOnly: {
    type: Boolean,
    default: false
  },
  favoriteHouses: {
    type: Boolean,
    default: false
  },
  viewedHouses: {
    type: Boolean,
    default: false
  }
});

const filteredHouses = computed(() => {
  let houses = store.getters.filteredHouses;
  if (props.madeByMeOnly) {
    return houses.filter((house) => house.madeByMe);
  }
  if (props.favoriteHouses) {
    houses = houses.filter((house) => store.state.favoriteHouses.has(house.id));
  }
  if (props.viewedHouses) {
    houses = houses.filter((house) => store.state.viewedHouses.has(house.id));
  }
  return houses;
});

const openModal = (id) => {
  store.commit('OPEN_MODAL', id);
};

onMounted(() => {
  store.dispatch('fetchHousesData');
});

const isFavorite = (id) => {
  return store.state.favoriteHouses.has(id);
};

const toggleFavorite = (id) => {
  if (isFavorite(id)) {
    store.dispatch('removeFromFavorites', id);
  } else {
    store.dispatch('addToFavorites', id);
  }
};

const navigateToHouse = (id) => {
  store.dispatch('addToViewed', id);
  router.push(`/house/${id}`);
};

const navigateToEdit = (id) => {
  router.push(`/house/edit/${id}`);
};
</script>

<style scoped>
.actions-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
}

.actions-icon {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.card {
  display: flex;
  align-items: center;
  border: none;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 20px;
  width: 1100px;
  height: 220px;
  text-decoration: none;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
}

.card-container {
  width: 100%;
}

.house-details {
  display: flex;
  color: #4a4b4c;
  margin-right: 20px;
}

.house-image {
  width: 200px;
  height: 170px;
  border-radius: 8px;
  margin-left: 20px;
  cursor: pointer;
  object-fit: cover;
}

.house-info {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  width: 80%;
  gap: 20px;
}

.house-info img {
  width: 20px;
  height: min-content;
  margin-right: 5px;
}

.actions-icon img {
  margin-right: 20px;
  cursor: pointer;
}

.house-zip {
  color: #a4a4a4;
}

.house-location {
  width: 60%; 
  word-wrap: break-word; 
  white-space: normal; 
}

@media only screen and (max-width: 768px) {
  .actions-icon img {
    margin-right: 20px;
  }

  .actions-icon img {
    margin-right: 15px;
    width: 15px;
    height: auto;
    cursor: pointer;
  }

  .card {
    width: 100%;
    height: auto;
    margin-bottom: 15px;
    font-size: 14px;
    padding: 15px 0;
  }

  .house-info {
    margin-left: 20px;
    gap: 5px;
  }

  .house-info img {
    width: 15px;
    height: 15px;
  }

  .house-image {
    width: 140px;
    height: 110px;
    border-radius: 8px;
    margin-left: 15px;
    object-fit: cover;
  }

  .house-location {
  width: 60%; 
  word-wrap: break-word; 
  white-space: normal; 
}

  h2 {
    font-size: 16px;
  }
}
</style>