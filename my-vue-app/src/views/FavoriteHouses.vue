<template>
  <div class="card-container">
    <h2 class="text"> List of favorites</h2>
    <HouseCard :favoriteHouses="true" />
  </div>
  <Modal />
</template>

<script setup>
import HouseCard from '../components/HouseCard.vue';
import Modal from '../components/ModalPopUp.vue';
</script>

<style scope>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 20px 50px;
}

.text {
  margin: 50px;
}
</style>
