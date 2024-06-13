<template>
  <div class="page-container">
    <div v-if="isLoading">
      <p>Loading...</p>
    </div>

    <div v-else>
      <div class="desktop-header">
        <div class="back-button" @click="navigateToOverview">
          <img :src="IconBack" alt="Back" class="back-icon" />
          <span class="back-text">Back to overview</span>
        </div>
      </div>

      <div class="mobile-header">
        <div class="back-button" @click="navigateToOverview">
          <img :src="IconBackWhite" alt="Back" class="back-icon" />
        </div>
      </div>

      <div class="content-container">
        <div class="detail-card" v-if="house">
          <img :src="house.image" alt="House Image" class="house-image" />

          <div class="actions-container">
            <h1>{{ house.streetName }} {{ house.houseNumber }}</h1>
            <div v-if="house.madeByMe">
              <router-link :to="'/house/edit/' + house.id">
                <img :src="IconEdit" alt="Edit" class="action-icon" />
              </router-link>
              <img :src="IconDelete" alt="Delete" @click="openModal(house.id)" class="action-icon" />
              <Modal />
            </div>
          </div>

          <div class="info">
            <div class="house-details">
              <img :src="IconLocation" alt="Location Icon" class="info-icon" />
              {{ house.zip }} {{ house.city }}
            </div>
            <div class="house-details">
              <div class="house-details">
                <img :src="IconPrice" alt="Price Icon" class="info-icon" />{{ house.price }}
              </div>
              <div class="house-details">
                <img :src="IconSize" alt="Size Icon" class="info-icon" /> {{ house.size }} m2
              </div>
              <div class="house-details">
                <img :src="IconConstructionDate" alt="ConstructionDate Icon" class="info-icon" />
                Built in {{ house.constructionYear }}
              </div>
            </div>

            <div class="house-details">
              <div class="house-details">
                <img :src="IconBed" alt="Bed Icon" class="info-icon" /> {{ house.bedrooms }}
              </div>
              <div class="house-details">
                <img :src="IconBath" alt="Bath Icon" class="info-icon" />
                {{ house.bathrooms }}
              </div>
              <div class="house-details">
                <img :src="IconBath" alt="Bath Icon" class="info-icon" />
                {{ house.bathrooms }}
              </div>
              <div class="house-details">
                <img :src="IconGarage" alt="Garage Icon" class="info-icon" />{{
                  house.hasGarage ? 'Yes' : 'No'
                }}
              </div>
            </div>

            <div>{{ house.description }}</div>
          </div>
        </div>
        <p v-else>House is not available</p>
        <RecommendedHouses class="recommended-houses" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

import IconBed from '../components/icons/ic_bed@3x.png';
import IconBack from '../components/icons/ic_back_grey@3x.png';
import IconBackWhite from '../components/icons/ic_back_white@3x.png';
import IconBath from '../components/icons/ic_bath@3x.png';
import IconConstructionDate from '../components/icons/ic_construction_date@3x.png';
import IconDelete from '../components/icons/ic_delete@3x.png';
import IconEdit from '../components/icons/ic_edit@3x.png';
import IconGarage from '../components/icons/ic_garage@3x.png';
import IconLocation from '../components/icons/ic_location@3x.png';
import IconPrice from '../components/icons/ic_price@3x.png';
import IconSize from '../components/icons/ic_size@3x.png';

import RecommendedHouses from '../components/RecommendedHouses.vue';
import Modal from '../components/ModalPopUp.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();
const isLoading = ref(true);

const houseId = computed(() => route.params.id);
const house = computed(() => store.getters.selectedHouse);

const openModal = (id) => {
  store.dispatch('openModal', id);
};

const navigateToOverview = () => {
  router.push('/');
};

const fetchHouseData = async () => {
  await store.dispatch('fetchHouseById', houseId.value);
  isLoading.value = false;
};

onMounted(async () => {
  await fetchHouseData();
});

watch(houseId, async () => {
  await fetchHouseData();
});


</script>

<style scoped>
.actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  color: #000000;
}

.action-icon {
  margin-left: 20px;
  width: 20px;
}

.content-container {
  display: flex;
  flex-direction: row;
  gap: 50px;
  justify-content: space-between;
  width: 1100px;
}

.detail-card {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  border: none;
  background-color: #ffffff;
  text-decoration: none;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  width: 600px;
  padding-bottom: 50px;
  color: #4a4b4c;
  line-height: 1.6;
}

.house-details {
  display: flex;
  align-items: center;
  color: #4a4b4c;
  margin-right: 20px;
}

.house-image {
  width: 600px;
}

.info-icon {
  width: 20px;
  margin-right: 5px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 30px;
  padding-right: 30px;
}

.mobile-header {
  display: none;
}

.page-container {
  display: flex;
  justify-content: center;
}

.desktop-header {
    margin-top: 120px;
  }

@media only screen and (max-width: 768px) {
  .actions-container {
    background-color: #ffffff;
    border-radius: 20px 20px 0 0;
    margin-top: -50px;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

  .desktop-header {
    display: none;
  }

  .detail-card {
    font-size: 14px;
    padding-bottom: 20px;
    width: 100%;
  }

  .house-image {
    width: 100%;
  }

  .mobile-header {
    height: 70px;
    display: flex;
    align-items: center;
    margin-bottom: -70px;
    margin-left: 20px;
    position: relative;
    z-index: 10;
  }

  .page-container {
    margin-top: 0;
    width: 100%;
  }
}
</style>
