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

      <form @submit.prevent="createHouse">
        <div class="form-container">
          <div>
            <label for="street">Street name*</label>
            <input id="street" v-model="houseForm.streetName" placeholder="Enter street name"
              :class="{ 'error-input': !houseForm.streetName && showError }" />
            <span v-if="!houseForm.streetName && showError" class="error-message">Required field missing</span>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label for="houseNumber">House number*</label>
              <input id="houseNumber" v-model="houseForm.houseNumber"
                :class="{ 'error-input': !houseForm.houseNumber && showError }" placeholder="Enter house number" />
              <span v-if="!houseForm.houseNumber && showError" class="error-message">Required field missing</span>
            </div>
            <div class="form-field">
              <label for="houseNumberAddition">Addition (optional)</label>
              <input id="houseNumberAddition" v-model="houseForm.numberAddition" placeholder="eg.A" />
            </div>
          </div>

          <div>
            <label for="zip">Postal code*</label>
            <input id="zip" v-model="houseForm.zip" :class="{ 'error-input': !houseForm.zip && showError }"
              placeholder="eg. 1000 AA" />
            <span v-if="!houseForm.zip && showError" class="error-message">Required field missing</span>
          </div>

          <div>
            <label for="city">City*</label>
            <input id="city" v-model="houseForm.city" :class="{ 'error-input': !houseForm.city && showError }"
              placeholder="eg. Utrecht" />
            <span v-if="!houseForm.city && showError" class="error-message">Required field missing</span>
          </div>

          <div class="image-upload-input" v-if="!imageUrl">
            <label for="imageUpload">Upload picture (PNG or JPG)*</label>

            <label for="imageUpload" class="customUpload">
              <img :src="IconUpload" alt="Upload Icon" class="upload-icon" />
            </label>
            <input type="file" id="imageUpload" style="display: none" @change="handleImageUploadFromComputer" />
          </div>
          <div v-if="imageUrl" class="image-preview-container">
            <img :src="imageUrl" alt="Image Preview" class="image-preview" />
            <img :src="IconClear" alt="Clear" class="clear-icon" @click="clearImage" />
          </div>

          <div>
            <label for="price">Price*</label>
            <input id="price" v-model="houseForm.price" :class="{ 'error-input': !houseForm.price && showError }"
              placeholder="eg. €150.000" />
            <span v-if="!houseForm.price && showError" class="error-message">Required field missing</span>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label for="size">Size*</label>
              <input id="size" v-model="houseForm.size" :class="{ 'error-input': !houseForm.size && showError }"
                placeholder="eg. 60m2" />
              <span v-if="!houseForm.size && showError" class="error-message">Required field missing</span>
            </div>

            <div class="form-field">
              <label for="hasGarage">Garage*</label>
              <select id="hasGarage" v-model="houseForm.hasGarage"
                :class="{ 'error-input': !houseForm.hasGarage && showError }">
                <option disabled value="">Select</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
              <span v-if="!houseForm.hasGarage && showError" class="error-message">Required field missing</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label for="bedrooms">Bedrooms*</label>
              <input id="bedrooms" v-model="houseForm.bedrooms"
                :class="{ 'error-input': !houseForm.bedrooms && showError }" placeholder="Enter amount" />
              <span v-if="!houseForm.bedrooms && showError" class="error-message">Required field missing</span>
            </div>
            <div class="form-field">
              <label for="bathrooms">Bathrooms*</label>
              <input id="bathrooms" v-model="houseForm.bathrooms"
                :class="{ 'error-input': !houseForm.bathrooms && showError }" placeholder="Enter amount" />
              <span v-if="!houseForm.bathrooms && showError" class="error-message">Required field missing</span>
            </div>
          </div>

          <div>
            <label for="constructionYear">Construction date*</label>
            <input id="constructionYear" v-model="houseForm.constructionYear"
              :class="{ 'error-input': (!houseForm.constructionYear && showError) }" placeholder="e.g. 1990" />
            <span v-if="(!houseForm.constructionYear || parseInt(houseForm.constructionYear) < 1901) && showError"
              class="error-message"> Invalid year, must be more than 1901 </span>
          </div>

          <div>
            <label for="description">Description:</label>
            <input id="description" v-model="houseForm.description"
              :class="{ 'error-input': !houseForm.description && showError }" placeholder="Enter description" />
            <span v-if="!houseForm.description && showError" class="error-message">Required field missing</span>
          </div>
          <div class="button-container">
            <button type="submit" :class="{ 'valid-form': isValidHouseForm(houseForm) }">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { createHouseForm, isValidHouseForm } from '../helpers/house.js';
import { handleImageUploadFromComputer, imageUrl, imageFile } from '../helpers/utils.js';

import IconBack from '../components/icons/ic_back_grey@3x.png';
import IconClear from '../components/icons/ic_clear_white@3x.png';
import IconUpload from '../components/icons/ic_upload@3x.png';

const store = useStore();
const houseForm = ref(createHouseForm());
const router = useRouter();

const showError = ref(false);

const navigateToOverview = () => {
  router.push('/');
};

const createHouse = async () => {

  showError.value = true;

  if (isValidHouseForm(houseForm)) {
    try {
      const newListingId = await store.dispatch('createHouse', {
        houseForm: houseForm.value,
        imageFile: imageFile
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
  }
};

const clearImage = () => {
  imageUrl.value = null;
};

</script>

<style scoped>
@import '../styles/form.css';
</style>
