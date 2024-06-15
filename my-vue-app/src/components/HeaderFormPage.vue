<template>
    <div class="desktop-header">
        <div class="back-button" @click="navigateFunction">
            <img :src="IconBack" alt="Back" class="back-icon" />
            <span class="back-text">{{ backText }}</span>
        </div>
        <h1> {{ formHeaderText }}</h1>
    </div>

    <div class="mobile-header">
        <div class="back-button" @click="navigateFunction">
            <img :src="IconBack" alt="Back" class="back-icon" />
        </div>
        <h1> {{ formHeaderText }}</h1>
    </div>
</template>

<script setup>
import IconBack from '../components/icons/ic_back_grey@3x.png';

const props = defineProps({
    formHeaderText: {
        type: String,
        default: null
    },
    backText: {
        type: String,
        default: null
    },
    navigateFunction: {
        type: Function,
        required: true
    },
});
</script>

<style scoped>
.mobile-header {
    display: none;
}

.desktop-header {
    margin-top: 100px;
}

.back-button {
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
  cursor: pointer;
}

.back-icon {
  margin-right: 20px;
  width: 20px;
}

.back-text {
  font-weight: 600;
}

@media only screen and (max-width: 768px) {
    h1 {
        font-size: 18px;
    }

    .mobile-header {
        display: flex;
        align-items: center;
        width: 350px;
    }

    .desktop-header {
        display: none;
    }
}
</style>