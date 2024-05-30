<template>
  <div class="modal" v-if="showModal">
    <div class="modal-content">
      <h3>Delete listing</h3>
      <p>Are you sure you want to delete this listing?</p>
      <p>This action cannot be undone.</p>
      <div>
        <button @click="confirmDelete" class="modal-button-delete">YES, DELETE</button>
        <button @click="closeModal" class="modal-button-cancel">GO BACK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const showModal = computed(() => store.state.showModal);
const currentHouseId = computed(() => store.state.currentHouseId);

const closeModal = () => {
  store.commit('CLOSE_MODAL');
};

const confirmDelete = () => {
  store.dispatch('deleteHouse', currentHouseId.value);
  closeModal();
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 50px 120px;
  border-radius: 8px;
}

.modal-content p {
  margin: 5px 0;
}

.modal-content button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 300px;
  height: 35px;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.modal-button-delete {
  background-color: #eb5440;
}

.modal-button-cancel {
  background-color: #4a4b4c;
}

@media only screen and (max-width: 768px) {
  h3 {
    font-size: 16px;
  }

  .modal-content {
    width: 300px;
    padding: 15px 45px;
    font-size: 12px;
  }

  .modal-content button {
    margin-top: 20px;
    width: 200px;
    font-size: 14px;
    margin-top: 15px;
  }
}
</style>
