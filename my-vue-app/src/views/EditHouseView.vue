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

      <form @submit.prevent="updateHouse">
        <div v-if="house">
          <div class="form-container">
            <div>
              <label for="streetName">Street name*</label>
              <input type="text" v-model="house.location.street" id="streetName" placeholder="Enter street name"
                :class="{ 'error-input': !house.location.street && showError }" />
              <span v-if="!house.location.street && showError" class="error-message">Required field missing</span>
            </div>

            <div class="form-row">
              <div class="form-field">
                <label for="houseNumber">House number*</label>
                <input type="text" v-model="house.location.houseNumber" id="houseNumber"
                  placeholder="Enter house number"
                  :class="{ 'error-input': !house.location.houseNumber && showError }" />
                <span v-if="!house.location.houseNumber && showError" class="error-message">Required field
                  missing</span>
              </div>
              <div class="form-field">
                <label for="houseNumberAddition">Addition (optional)</label>
                <input type="text" v-model="house.location.houseNumberAddition" id="houseNumberAddition"
                  placeholder="eg.A" />
              </div>
            </div>

            <div>
              <label for="zip">Postal code*</label>
              <input type="text" v-model="house.location.zip" id="zip" placeholder="eg. 1000 AA"
                :class="{ 'error-input': !house.location.zip && showError }" />
              <span v-if="!house.location.zip && showError" class="error-message">Required field missing</span>
            </div>

            <div>
              <label for="city">City*</label>
              <input type="text" v-model="house.location.city" id="city" placeholder="eg. Utrecht"
                :class="{ 'error-input': !house.location.city && showError }" />
              <span v-if="!house.location.city && showError" class="error-message">Required field missing</span>
            </div>
            <UploadImage :initialImageUrl="house.image" />
            <div>
              <label for="price">Price*</label>
              <input type="text" v-model="house.price" id="price" placeholder="eg. €150.000"
                :class="{ 'error-input': !house.price && showError }" />
              <span v-if="!house.price && showError" class="error-message">Required field missing</span>
            </div>

            <div class="form-row">
              <div class="form-field">
                <label for="size">Size*</label>
                <input type="text" v-model="house.size" id="size" placeholder="eg. 60m2"
                  :class="{ 'error-input': !house.size && showError }" />
                <span v-if="!house.size && showError" class="error-message">Required field missing</span>
              </div>

              <div class="form-field">
                <label for="hasGarage">Garage*</label>
                <select id="hasGarage" v-model="house.hasGarage">
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-field">
                <label for="bedrooms">Bedrooms*</label>
                <input type="text" v-model="house.rooms.bedrooms" id="bedrooms" placeholder="Enter amount"
                  :class="{ 'error-input': !house.rooms.bedrooms && showError }" />
                <span v-if="!house.rooms.bedrooms && showError" class="error-message">Required field missing</span>
              </div>

              <div class="form-field">
                <label for="bathrooms">Bathrooms*</label>
                <input type="text" v-model="house.rooms.bathrooms" id="bathrooms" placeholder="Enter amount"
                  :class="{ 'error-input': !house.rooms.bathrooms && showError }" />
                <span v-if="!house.rooms.bathrooms && showError" class="error-message">Required field missing</span>
              </div>
            </div>

            <div>
              <label for="constructionYear">Construction date*</label>
              <input type="text" v-model="house.constructionYear" id="constructionYear" placeholder="e.g. 1990"
                :class="{ 'error-input': !house.constructionYear && showError }" />
              <span v-if="!house.constructionYear || parseInt(house.constructionYear) < 1901 && showError"
                class="error-message">
                Invalid year, must be more than 1901
              </span>
            </div>

            <div>
              <label for="description">Description*</label>
              <input type="text" v-model="house.description" id="description" placeholder="Enter description"
                :class="{ 'error-input': !house.description && showError }" />
              <span v-if="!house.description && showError" class="error-message">Required field missing</span>
            </div>
            <div class="button-container">
              <button type="submit">Save</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { createHouseForm, isValidHouse } from '../helpers/house.js';
import UploadImage from '../components/UploadImage.vue';

import IconBack from '../components/icons/ic_back_grey@3x.png';

const store = useStore();
const route = useRoute();
const router = useRouter();

const houseId = computed(() => route.params.id);
const house = computed(() => store.getters.selectedHouse);
const imageFile = computed(() => store.getters.imageFile);
const showError = ref(false);

const navigateToHouseDetail = () => {
  router.push(`/house/${houseId.value}`);
};

const clearImage = () => {
  store.dispatch('clearImageFile');
};

const updateHouse = async () => {
  showError.value = true;
  if (isValidHouse(house)) {
    try {
      await store.dispatch('updateHouse', {
        houseForm: createHouseForm(house),
        id: houseId.value,
        imageFile: imageFile.value
      });
      clearImage();
      navigateToHouseDetail();
    } catch (error) {
      console.error('Failed to update house:', error);
    }
  }
};

onMounted(() => {
  store.dispatch('fetchHouseById', houseId.value);
});
</script>

<style scoped>
@import '../styles/form.css';
</style>
