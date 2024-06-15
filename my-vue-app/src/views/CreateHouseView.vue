<template>
  <div class="background-container">
    <div class="content-container">
      <HeaderFormPage :navigateFunction="navigateToOverview" :formHeaderText="'Create new listing'"
        :backText="'Back to overview'" />

      <FormHouse buttonText="Post" :submitForm="createHouse" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import FormHouse from '../components/FormHouse.vue';
import HeaderFormPage from '../components/HeaderFormPage.vue';


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
