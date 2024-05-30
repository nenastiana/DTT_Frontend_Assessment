<template>
  <div class="sort-container">
    <button @click="setSortOrder('price')" class="sort-button sort-button-price" :class="sortButtonClasses('price')">
      Price
    </button>
    <button @click="setSortOrder('size')" class="sort-button sort-button-size" :class="sortButtonClasses('size')">
      Size
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const sortOrder = computed({
  get: () => store.getters['sortOrder'],
  set: (order) => {
    store.dispatch('setSortOrder', order);
  }
});

const setSortOrder = (order) => {
  if (sortOrder.value === order) {
    sortOrder.value = null;
  } else {
    sortOrder.value = order;
  }
};

const sortButtonClasses = (order) => ({
  'sort-button-active': sortOrder.value === order,
  'sort-button-disabled': sortOrder.value !== order,
  'sort-button-disabled-all': !sortOrder.value
});
</script>

<style scoped>
button {
  height: 40px;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  width: 175px;
}

.sort-button-active {
  background-color: #eb5440;
}

.sort-button-disabled {
  background-color: #c3c3c3;
}

.sort-button-price {
  border-radius: 8px 0 0 8px;
}

.sort-button-size {
  border-radius: 0 8px 8px 0;
}

.sort-button-disabled-all {
  border-right: 2px solid #f6f6f6;
}

@media only screen and (max-width: 768px) {
  button {
    width: 50%;
  }

  .sort-container {
    width: 100%;
  }
}
</style>
