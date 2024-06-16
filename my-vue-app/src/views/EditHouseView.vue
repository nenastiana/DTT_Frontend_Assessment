<template>
  <div class="background-container">
    <div class="content-container">
      <HeaderFormPage :navigateFunction="navigateToHouseDetail" :formHeaderText="'Edit listing'"
        :backText="'Back to detail page'" />
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
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import FormHouse from '../components/FormHouse.vue';
import HeaderFormPage from '../components/HeaderFormPage.vue';

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

// Selected house is not in use anymore
onUnmounted(() => {
  store.dispatch('unsetSelectedHouse');
});
</script>

<style scoped>
@import '../styles/form.css';
</style>
