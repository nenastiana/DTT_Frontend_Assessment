<!-- This component manages image uploading and previewing. Image file is saved in store to be used in other components. -->

<template>
    <div class="image-upload-input" v-if="!imageUrl">
        <label for="imageUpload">Upload picture (PNG or JPG)*</label>

        <label for="imageUpload">
            <img :src="IconUpload" alt="Upload Icon" class="upload-icon" />
        </label>
        <input type="file" id="imageUpload" style="display: none" @change="handleImageUploadFromComputer" />
    </div>
    <div v-if="imageUrl" class="image-preview-container">
        <img :src="imageUrl" alt="Image Preview" class="image-preview" />
        <img :src="IconClear" alt="Clear" class="clear-icon" @click="clearImage" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const props = defineProps({
    initialImageUrl: {
        type: String,
        default: null
    },
});

const imageUrl = ref(props.initialImageUrl);

const handleImageUploadFromComputer = (event) => {
    const file = event.target.files[0];
    store.dispatch('setImageFile', file);
    const reader = new FileReader();
    reader.onload = (e) => {
        imageUrl.value = e.target.result;
    };
    reader.readAsDataURL(file);
};

import IconClear from '../components/icons/ic_clear_white@3x.png';
import IconUpload from '../components/icons/ic_upload@3x.png';

const clearImage = () => {
    imageUrl.value = null;
    store.dispatch('clearImageFile');
};
</script>

<style>
@import '../styles/form.css';
</style>