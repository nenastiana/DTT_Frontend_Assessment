<template>
  <div class="background-container">
    <div class="content-container">

      <div class="desktop-header">
        <div class="back-button" @click="navigateToOverview">
          <img :src="IconBack" alt="Back" class="back-icon" />
          <span class="back-text">Back to overview</span>
        </div>
        <h1>Create new listing</h1>
      </div>

      <div class="mobile-header">
        <div class="back-button" @click="navigateToOverview">
          <img :src="IconBack" alt="Back" class="back-icon" />
        </div>
        <h1>Create new listing</h1>
      </div>
      <FormHouse buttonText="Post" :submitForm="createHouse" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FormHouse from '../components/FormHouse.vue';
import IconBack from '../components/icons/ic_back_grey@3x.png';

const router = useRouter();
const store = useStore();

const imageFile = computed(() => store.getters.imageFile);

const navigateToOverview = () => {
  router.push('/');
};

const createHouse = async (houseForm) => {
  try {
    const newListingId = await store.dispatch('createHouse', {
      houseForm: houseForm.value,
      imageFile: imageFile.value,
    });
    if (newListingId) {
      clearImage();
      router.push(`/house/${newListingId}`);
    } else {
      console.error('Failed to get new listing ID');
    }
  } catch (error) {
    console.error('Failed to submit form:', error);
  }
};

const clearImage = () => {
  store.dispatch('clearImageFile');
};
</script>

<style scoped>
@import '../styles/form.css';
</style>
