<template>
  <div class="background-container">
    <div class="content-container">

      <div class="desktop-header">
        <div class="back-button" @click="navigateToHouseDetail">
          <img :src="IconBack" alt="Back" class="back-icon" />
          <span class="back-text">Back to detail page</span>
        </div>
        <h1>Edit listing</h1>
      </div>

      <div class="mobile-header">
        <div class="back-button" @click="navigateToHouseDetail">
          <img :src="IconBack" alt="Back" class="back-icon" />
        </div>
        <h1>Edit listing</h1>
      </div>

      <div v-if="isLoading">
        <p>Loading...</p>
      </div>

      <div v-else>
        <FormHouse buttonText="Save" :submitForm="updateHouse" :house="house" />
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import FormHouse from '../components/FormHouse.vue';
import IconBack from '../components/icons/ic_back_grey@3x.png';

const isLoading = ref(true);

const store = useStore();
const route = useRoute();
const router = useRouter();

const houseId = computed(() => route.params.id);
const house = computed(() => store.getters.selectedHouse);
const imageFile = computed(() => store.getters.imageFile);

const navigateToHouseDetail = () => {
  router.push(`/house/${houseId.value}`);
};

const clearImage = () => {
  store.dispatch('clearImageFile');
};

const updateHouse = async (houseForm) => {
  try {
    await store.dispatch('updateHouse', {
      houseForm: houseForm.value,
      id: houseId.value,
      imageFile: imageFile.value
    });
    clearImage();
    navigateToHouseDetail();
  } catch (error) {
    console.error('Failed to update house:', error);
  }
};

onMounted(async () => {
  await store.dispatch('fetchHouseById', houseId.value);
  isLoading.value = false;
});
</script>

<style scoped>
@import '../styles/form.css';
</style>
